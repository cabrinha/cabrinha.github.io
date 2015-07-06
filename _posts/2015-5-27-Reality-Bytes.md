---
layout: post
title: Reality Bytes
---

This ["Day and Age"](https://en.wikipedia.org/wiki/Information_Age) we live in is dominated by a digital world that none of us can escape... I like to think I thrive in it.

## Working @Rackspace

*I've been living in San Antonio for a month now* and every saturday I come to [Rise Bakery & Cafe](http://www.yelp.com/biz/rise-bakery-and-cafe-san-antonio) for a coffee and a panini. I'm still learning my way around but I can see myself as a regular at this place without a doubt.

I moved here from southern California after I accepted a position at [Rackspace](https://rackspace.com) as a Linux Operations Engineer in their Email and Apps organization. Rackspace Headquarters is a 1.2 million square foot shopping mall converted into an office. It holds The World's Largest [Word Search Puzzle](http://www.guinnessworldrecords.com/world-records/largest-word-search-puzzle), a [coffee shop](http://www.yelp.com/biz/ground-town-san-antonio) and around 3,500 employees all under one roof.

In my last post, I mentioned that I was in the interview process. After four interviews, a round-trip flight to Texas and a few tweets later, I got an offer I was happy to accept.

From start to finish, Twitter played a huge role in the process.

<blockquote class="twitter-tweet tw-align-center" lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/Rackspace">@Rackspace</a> thank you so much! Huge thanks so the entire Social Media team too! You guys do a great job. I can&#39;t wait to get started! 😁😎☁️💻</p>&mdash; Scotta know me! (@ScottaBeTrue) <a href="https://twitter.com/ScottaBeTrue/status/598567872613363712">May 13, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8" theme="dark"></script>

[Andy Pape](https://twitter.com/Racker_Andy), [Dale Bracey](https://twitter.com/IRTermite), [Drew Cox](https://twitter.com/DrewCoxSA), [Alan Bush](https://twitter.com/alanbush) and [Faisal Misle](https://twitter.com/fmisle) were in contact with me pretty regularly and these guys are just as cool in real life as they are on social media!

One thing about Rackspace that sets it apart from any other company I've worked at, apart from the sheer size, is the community. You're surrounded by honest, like-minded, cool people that most likely share a lot of the same interests as you do. *Everyone is very accessible*. The CEO sits at a desk like anyone else's, not some big office, hidden away from everyone. The CFO has a hula-girl cutout in front of his desk, so you can easily identify his love of Hawaii.

Next month I'll be in class at work. Rackspace has this thing called Rackspace University where employees go to get spun up on the latest and greatest technologies and even earn their certifications. I'll be attending the week-long [RHCSA](http://www.redhat.com/en/services/certification/rhcsa "RedHat Certified System Administrator") course and hopefully earn my certification at the end of the course. Next step after that would be [RHCE](http://www.redhat.com/en/services/certification/rhce "RedHat Certified Engineer"), of course but, I'll take things one step a time.

A book has been floating around my department entitled "[DevOps Troubleshooting](http://www.amazon.com/DevOps-Troubleshooting-Linux-Server-Practices/dp/0321832043): Linux Server Best Practices". I bought this book and have only sat down to read it for less than an hour, but I can already say that it's packed with practical linux troubleshooting methodology and a lot of not-so-common sense. I'm looking forward to soaking it up.

### Equality for All

<blockquote class="twitter-tweet tw-align-center" theme="dark" lang="en"><p lang="en" dir="ltr">The White House. Disney World. The Empire State Building. Niagara Falls. <a href="https://twitter.com/hashtag/LoveWins?src=hash">#LoveWins</a> <a href="http://t.co/f4VKl9sVas">pic.twitter.com/f4VKl9sVas</a></p>&mdash; Anil Dash (@anildash) <a href="https://twitter.com/anildash/status/614651280376602624">June 27, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Eventhough [horrible things](http://www.cnn.com/2015/06/26/us/charleston-church-shooting-main/) are going on all around us, the human race is making some solid gains as well. The Supreme Court of the U.S. has (finally) made [same-sex marraige legal](http://www.nytimes.com/2015/06/27/us/supreme-court-same-sex-marriage.html?_r=0), marking a huge step forward for the LGBT community. Hopefully this means we're getting closer to coming together to solve bigger issues (take your pick) that are threatening the U.S. and the rest of the world. History has been made.

### PvP or Perl vs. Python

I practiced writing [Perl](https://github.com/internaught/Perl) just about as much as I could. Joining the [CPAN Pull Request Challenge](http://blogs.perl.org/users/neilb/2014/12/take-the-2015-cpan-pull-request-challenge.html) was a great way for me to start contributing to open source projects while learning Perl. My dedication waxed and waned and eventually my interest just faded out. 

At my new job, everything is Python. Python [this](https://github.com/rackspace/pyrax) and Python [that](https://github.com/rackerlabs/python-clouddns) and so I must join or die. Python forces you to use correct indentation where Perl could give a damn about how much whitespace you do or don't use. I'm not sure which standard library is bigger or more powerful. All I know is, _Python is industry standard_. Which means, I've gotta start learning it and using it to make my tools or contribute to any one of the various projects in the company. I'm not convinced that this is entirely a bad thing, I just know I'll miss using Perl. 

I *do* plan on staying in the CPAN-PRC and tinkering with Perl on the side.

### Grep | Awk

Interesting little thing I learned last week:

Many people, including myself as of last week, tend to get some output, search out what we want to keep using `grep`, then cut that output down even further using `awk '{print $1}'`.

You don't need grep before awk. You can just `awk '/grep/ {print $1}'`, like so:

Show all process ID's owned by root.

{% highlight bash %}

#!/bin/bash

# You could grep root | awk {print $1}
ps aux | grep root | awk '{print $1]'

# Or you could do away with the grep entirely
ps aux | awk '/root/ {print $1}'

{% endhighlight %}

There is probably a lot of other stuff you could do using `awk` too.

### Outro

Reminding myself to:

- Read more books
- Slow down, take things one day at a time
- Stay humble
- Practice mindfullness
- Eat more fruits and vegetables

See you Space Cowboy.
