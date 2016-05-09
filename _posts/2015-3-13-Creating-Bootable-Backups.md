---
layout: post
permalink: short-urls-jekyll
title: Creating Bootable Backups in Linux
---

They said it couldn't be done, but it has been. After searching for "Create bootable backup CentOS 6", digging through forums and getting trolled in IRC, I finally got my backup to boot.
<!--more-->
On freenode, the people of #centos laughed at me, saying that Backups weren't meant to be bootable. You can't get redundancy and backups from the same disk. On the CentOS forums, they were saying the same thing:
>Centos Backup help
>
>Postby pschaff » 2011/11/22 22:26:38
>You can't get there from here.

>There is no reliable method to do an on-line full image backup suitable for a bootable system recovery. Open files will not be properly backed up. If you "clone" the system to disks that are still on-line then you are likely to encounter problems with disk labels, duplicate LVM volume labels, and/or UUIDs. Your best bet is probably to use the additional disks for backing up your valuable data.

However, I wasn't using [LVM](http://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux)) and I don't intend to for a while. Although, this same process could work with LVMs using some additional steps, but I won't go over that in this post.

No matter what they said, no matter how bad of an idea it seemed, I trudged on and with the help of my favorite co-worker [AJ](https://twitter.com/ationgilliam), we got it working.

We were able to successfully clone one disk to another, on a live system, without doing a block-level copy (like with `dd`).

## The Process

First, you're going to need this set of little perl scripts I like to call [nsync](https://github.com/internaught/nsync).

This is what we'll use instead of the traditional rsync command. Hats off to Carl Flippin for writing the original version of this script.

So, let's clone the current partition layout from `/dev/sda` to the backup drive `/dev/sdb`:

{% highlight bash %}
sfdisk -d /dev/sda > part_table
sfdisk /dev/sdb < part_table --force
{% endhighlight %}
Run `partprobe` to make the OS recognize the new partitions.

Then, make sure the disks have matching partitions by running `lsblk` or `fdisk -l`. You should see something like this:

{% highlight bash %}
[root@testbox ~]# lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sr0     11:0    1  1024M  0 rom
sda      8:0    0 931.5G  0 disk
├─sda1   8:1    0   500M  0 part /boot
├─sda2   8:2    0  48.8G  0 part /
├─sda3   8:3    0     2G  0 part [SWAP]
├─sda4   8:4    0     1K  0 part
└─sda5   8:5    0 880.2G  0 part /home
sdb      8:16   0 931.5G  0 disk
├─sdb1   8:17   0   500M  0 part
├─sdb2   8:18   0  48.8G  0 part
├─sdb3   8:19   0     2G  0 part
├─sdb4   8:20   0     1K  0 part
└─sdb5   8:21   0 880.2G  0 part
{% endhighlight %}

Now we need to create mount points for the new drive before we copy everything over.

Since we have three partitions, `/`, `/boot` and `/home`, we'll mount them all under `/backup`:
{% highlight bash %}
mkdir -p /backup/{boot,home}
{% endhighlight %}

Then, mount the partitions:
{% highlight bash %}
mount -t ext4 /dev/sdb2 /backup
mount -t ext4 /dev/sdb1 /backup/boot
mount -t ext4 /dev/sdb5 /backup/home
{% endhighlight %}

Now that the drives are mounted, we may as well make the pseudo-filesytem directories that we won't be copying anything to:

{% highlight bash %}
mkdir /backup/{dev,proc,sys}
{% endhighlight %}

Now, we're ready to use `nsync.pl` to sync the disks. Create the file `/etc/nsyncexcludes.conf` and put in it all the directories you do not want sync'd. We definitely don't want to sync `/proc`, `/dev` or `/sys` of our live system, so make sure you at least add those three directories there.

Once nsync completes, you can actually mount the live system's `/dev`, `/sys` and `/proc` folders and `chroot` into your backup disk to test that everything is working:

{% highlight bash %}
mount -o bind -t proc /proc /backup/proc/
mount -o bind -t dev /dev /backup/dev/
mount -o bind -t sysfs /sys /backup/sys/
chroot /backup
{% endhighlight %}

You should be able to run `yum update` or `yum install [package_name]` or whatever else you can do on your live system.

## Booting off the Backup Disk

You will need to install grub to `/dev/sdb` in order to boot off the backup disk, and you're going to need to edit `/etc/fstab` and make sure the UUID of the main drive is not listed. Instead, you need to use `/dev/sda` to specify your partitions.

{% highlight bash %}
grub-install --recheck --root-directory=/backup /dev/sdb
{% endhighlight %}

You'll then need to edit `/boot/grub/grub.conf` and `/boot/grub/menu.lst`, for the same reasons. The part you're looking for is `root=` which is usually where you'll find the UUID of your root partition. Change that to `/dev/sdaX` where 'X' is the number of your root partition.

Once that's all done, you should do one last thing to ensure SELinux doesn't freak out on you.

`touch /backup/.autorelabel`

Now you should be able to swap the disk `/dev/sdb` in place of `/dev/sda` and boot from your "backup" drive.
