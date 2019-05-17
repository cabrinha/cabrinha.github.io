---
layout: post
title: Puppeteering
---

Over the years I've grown very fond of the Puppet ecosystem. Puppet has been a pleasure to work with, wether creating internal roles and profiles or contributing to open source modules found on [the forge](https://forge.puppet.com/). Recently, I had the opportunity to design a brand new Puppet deployment from the ground up, running in AWS and using the latest version, Puppet 6. Here's how I did it and why I eventually decided to throw it all away...
<!--more-->
# Requirements

Firstly, let's define the target environment for this deployment. The entire stack would need to run in AWS. Although Puppet 6 introduced the ability to containerize every component of the stack and run it on Kubernetes, this approach seemed to be somewhat of a community driven pet project and it's still in a largely experimental phase. It's called [Pupperware](https://github.com/puppetlabs/pupperware) and I decided to avoid it entirely in favor of the more well known approach running the stack on EC2 instances, leveraging auto scaling groups.

The entire stack needed to be highly available, fault tolerant, ephemeral and easily scalable. Once the stack was up, it should require little to no manual intervention during scaling operations. Any instance should be able to fail or be destroyed at any time without affecting the overall service and the entire design needed to aim to be as low maintenance as possible.

# Design

![cloudcraft](https://i.imgur.com/89pKjMn.png)

In order to ensure the requirements above were met, I decided to break out each component of the stack into it's own auto-scaling group. This would help isolate the failure domains of each service and also give each component the ability to scale independently from the others. Puppetlabs provides some good documentation on designing a Puppet deployment with multiple compile masters, but it's only geared toward Puppet Enterprise. Even though I wasn't using Puppet Enterprise, I was still able to lean on [their design](https://puppet.com/docs/pe/2019.1/installing_compile_masters.html).

I broke out the main components into the three major services of Puppet:

* Puppet CA
* Puppetserver
* PuppetDB

Each of these components essentially consists of an auto-scaling group behind a load balancer. 

In the case of Puppet CA, that group is meant to have only one active node at any time. Puppetserver and PuppetDB can be scaled out to any number of nodes required to meet the demand of puppet agent nodes.

## Puppet CA

The Puppet CA server holds all of the SSL certs. It receives cert signing requests, handles the signing and revoking of certs and also stores the certs. It handles none of the catalog compilation and does none of the "work" you'd expect from a puppetserver. By handing off the certificate management responsibilities to a single node, we can free our other puppetservers from the pain of syncing certs back and forth or sharing a disk volume between all of them. Backups and general cert management becomes easier when you only have a single point of contact to operate from.

### SSL Cert Challenges

These SSL certs are kind of a big deal. [Regenerating Certs](https://puppet.com/docs/puppet/6.3/ssl_regenerate_certificates.html#concept-4386) can be a nightmare in a large deployment. I'm no expert in every technicality of the SSL song and dance in Puppet but I'll do my best to explain what I understand. 

The CA server has a root cert it generates the first time the `puppetserver` service is started on the node. It uses that root cert to generate, sign and validate all other certs going forward. If any of these certs get out of sync, or if the CA server or an agent loses track of either the public or private SSL cert, puppet runs will fail and you'll have to perform some manual steps to get that agent back on track with the CA server. On the agent, certs are generated at the time of the first puppet run. When the agent checks in with the CA server, a public and private cert is generated on the agent node, then a certificate request is made to the CA server and if granted, the CA server signs the cert and basically grants access to that agent so a Puppetserver can start serving it catalogs.

These certs are tied to the fully qualified domain name of the node. If you've got puppet up and running, spawn a new node, run puppet on it once, then do something like change the hostname of that node, the next puppet run will fail because the certs on the node were generated using the previous hostname of that node. This opens up an interesting challenge: Name collisions. If you have two nodes with the same exact hostname, which ever one registers to the CA server first will be the only one serviced because the second node will be presenting a certificate signing request thats already been signed and is in use by the other agent.

Because the environment relied heavily on auto-scaling groups and all nodes should be treated as ephemeral, hostnames needed to be unique. So, a neat little trick was to insert the instance ID into the hostname during bootstrap. That way, no two nodes would ever have the same hostname. With that worked out, nodes could come and go without worry of one trying to assert another host's name.

That solves the agent nodes but what about the CA server itself? We still needed a way to safeguard against that instance being blown away at any time without losing all those precious SSL certs. There are a few different options here with S3 and all, but I decided to just use an EFS volume, mounted at bootstrap time to keep all the certs safe and sound. Any time the CA server is terminated, the auto-scaling group spawns another and the EFS volume holding all the certs gets mounted to Puppet's SSL directory at `/etc/puppetlabs/puppet/ssl`. When the `puppetserver` service is started on the new CA node, it checks for the existence of the root cert in that directory, sees it there and skips generating a new one.

Now puppet agent nodes and the CA server instance itself can just come and go without the need for manual intervention.

## Puppetserver

Puppetservers are the workhorses of the stack. They compile catalogs and serve them up, decrypt secrets and perform lookups from hiera, run r10k to download and install modules from the forge, sync the most recent code changes from the control repo and manage [dynamic environments](https://puppet.com/blog/git-workflow-and-puppet-environments) actively being developed to make them available to all agents.

### Code Sync Challenges

The main issue with syncing the code base between every active Puppetserver is that these instances could be created and terminated at any time. The auto-scaling group would be scaling in and out based on factors of load so, the group size would never be a consistent or predictable number. The hostnames would be randomized using the instance ID and the private IP addresses would never be reused either.

In order to keep the puppet control repo in sync with each active Puppetserver, a natural and well supported utility comes in the form of [r10k](https://github.com/puppetlabs/r10k). But, instead of blindly running r10k on a cron, which would pull down every branch known to the repo each run, I opted to use GitHub's webhooks to trigger a Jenkins job that would run r10k. Why Jenkins? Well, as much as we all love to hate it, we're kind of stuck with it for lack of a better solution. Once a feature branch is pushed remotely, the webhook would trigger Jenkins to perform the following commands:

```bash
# Find the IPv4 address of all active Puppetservers
aws ec2 describe-instances --filters Name=tag:Name,Values=Puppetserver --query 'Reservations[].Instances[].PrivateIpAddress[*]'

# Login and run r10k on each server simultaneously
pssh -i some-ssh-key.pem -l ubuntu ${list_of_ips} -- r10k deploy environment ${GIT_BRANCH} -pv
```

With this simple two-step job being run automatically on each push of a feature branch and each merge into the master branch, I was able to automate the deployment of the control repo to each active Puppetserver at the same pace of development. This way, when an operator is developing puppet code on their laptop, their changes are readily available to be tested in any deployment tier, against any puppet agent node using the typical `puppet agent` commands you'd expect.

### Dynamic Puppetservers

Since all the Puppetservers are in an auto-scaling group, the next challenge was to automate their registration to the Puppet CA server. In order to ensure that these servers could come up and down on their own, I needed to submit their certificate requests in a special way, enabling DNS alt names with the `puppet ssl` command:

```bash
# Ask the CA for a cert and then download it
# Use dns_alt_names to point to the DNS name of the ELB
/opt/puppetlabs/bin/puppet ssl submit_request --certname $(hostname -f) --dns_alt_names puppet.${my_cool_domain_name}.com
```

This command is run, of course, after we've populated `/etc/puppetlabs/puppet/puppet.conf` with the bare minimum configuration needed to perform a puppet run against itself, configured Hiera, r10k, PuppetDB and disabled the CA service, by editing the file below like so:

```bash
# Disable the CA service on puppetserver compile master
cat << EOF > /etc/puppetlabs/puppetserver/services.d/ca.cfg
# To enable the CA service, leave the following line uncommented
#puppetlabs.services.ca.certificate-authority-service/certificate-authority-service
# To disable the CA service, comment out the above line and uncomment the line below
puppetlabs.services.ca.certificate-authority-disabled-service/certificate-authority-disabled-service
puppetlabs.trapperkeeper.services.watcher.filesystem-watch-service/filesystem-watch-service
EOF
```

## PuppetDB

PuppetDB is much easier to solve for than the CA server and compile masters. All we need for that is an RDS instance running Postgresql and another auto-scaling group with servers running the `puppetdb` service. Since the database is offloaded to the RDS instance, PuppetDB instances can come and go as they please, without any manual intervention from a human operator.

# Deployment

To deploy all this infrastructure to AWS, I was happy to use Terraform. I found a lot of useful Terraform modules ready for use on the [Terraform Module Registry](https://registry.terraform.io). 

## Terraform Modules

Some easy choices were:

* [Security Group](https://registry.terraform.io/modules/terraform-aws-modules/security-group/aws/2.17.0)
* [ELB](https://registry.terraform.io/modules/terraform-aws-modules/elb/aws/1.4.1)
* [EFS](https://registry.terraform.io/modules/cloudposse/efs/aws/0.9.0)
* [RDS](https://registry.terraform.io/modules/terraform-aws-modules/rds/aws/1.28.0)

Between the Terraform code and some simple bash scripts run at boot time via [user-data](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html), this entire stack could be created and destroyed easily or stamped out in multiple AWS regions or accounts, using all the same code.

I won't cover the actual Puppet code that I used to configure the Puppet 6 stack, but I will give a much appreciated shout out to some of my most frequently used Puppet modules.

## Puppet Modules

Some puppet modules that I've worked with extensively and consider a staple in any puppet deployment.

### puppet

To configure Puppetserver, PuppetDB and Puppet agent across all my nodes, I used [foreman's](https://theforeman.org/) [puppet module](https://forge.puppet.com/theforeman/puppet). I never used [foreman](https://theforeman.org/introduction.html) itself because I didn't really have a need for it, but I found their open source puppet module the most feature rich option when it came to installing and configuring puppet packages and services.

### datadog-agent

For monitoring, I love using [DataDog](https://www.datadoghq.com/). If you're not familiar with DataDog, it's an awesome monitoring and logging service. They do it all with style and class and all within a single pane of glass. Even though their module has it's quirks, I've found the documentation to be so helpful, it's a pleasure to work with compared to other modules found on the forge. All their classes can be configured using Hiera and they keep the documentation for their classes [right inside the source code](https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/init.pp#L3).

### sudo

With nearly 65 million downloads, it'd just be bad form not to mention [saz's sudo module](https://forge.puppet.com/saz/sudo). This makes it super easy to manage sudo access on your instances with minimal effort.

# Retirement

After all was said and done, the design had been implemented and tested, it scaled well and handled load without breaking a sweat. I looked around and decided to ask the question I should have asked before starting this project. Do I want or need to be managing instances?

## Containers

In a world of Docker and Kubernetes, configuration management has started to go the way of the dinosaur. Why manage a complicated concoction of configuration files, services and packages on top of an operating system when all you really need these days is for your binary to be run in a container on some orchestrator?

With this question being asked openly and honestly, it made much more sense to just avoid the whole thing. Amazon already offers [ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html) and [EKS](https://docs.aws.amazon.com/eks/latest/userguide/eks-optimized-ami.html) optimized AMIs. If you really need to configure the OS running on an instance there are tools like HashiCorp's [packer](https://www.packer.io/), which requires none of this complicated infrastructure to run and any additional sprinkle of glue you need can be applied using Launch Configs or User Data.

Of course, containers do have challenges of their own, but instead of managing two target environments in the OS layer and in containers, maybe we can settle on just managing one.

# Thanks for all the fish

A huge "Thank You" goes out to the entire puppet community at large, especially the very active [Puppet Slack](https://slack.puppet.com/), which is full of helpful individuals who always seem eager to listen to a wide range of end user issues both common and foreign. These individuals were always willing to lend a helping hand, walk through configurations and syntax errors, and overally just provide anyone who is curious a better understanding of Puppet.