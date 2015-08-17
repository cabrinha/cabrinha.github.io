---
layout: post
title: The Tripping Octo Robot
---

From Linux to OS X and back again! You'd think a title like that would
hold the promise of an exciting blog post. I'll let you be the judge of
that.

Fun Fact: Then creating a new Github repo, github will suggest a name
for your new repo. I started keeping track of my meticulously groomed
dotfiles on github and when I went to create the repository, a name was
suggested to me. Thus, [Octo-Tripping-Robot](https://github.com/internaught/tripping-octo-robot) was born.

## Linux

I started using Linux around 2010 when 
[Cyanogenmod](http://www.cyanogenmod.org/) was developing 
version 5.0.8. I got my first Android phone, the HTC Incredible, and 
realized that all the "cool" kids were rooting their devices. The next 
step after rooting your Android was to install a custom ROM. The best 
ROMs were few and far between. You were either on Bugless Beast or 
Cyanogenmod.

I chose to run Cyanogenmod because it looked better and seemed to be
more popular. It didn't take long for me to realize that I'd be waiting
for all the hot new features the developers were working on to be
pushed into the "stable" branches. The "nightly" branch was where the
magic happened, but lots of things were broken. I got into their IRC
channel and started asking about the nightly builds and how I could run
the latest builds.

Linux was the obvious answer for compiling and building the latest code
from source. Since I had never used Linux before, 
[Ubuntu](http://www.ubuntu.com/) was suggested to me and I was off and
running. Soon, I realized Linux was much more than I thought it was. 
I discovered [Conky](http://conky.sourceforge.net/) and thought it was
the coolest thing ever. Not too long after that, I was running 
[Arch Linux](https://www.archlinux.org/) and experimenting with tiling
window managers like [SubtleWM](http://subtle.subforge.org/) and
[Xmonad](http://xmonad.org/).

## Mac OS X

I switched to OS X when I got my first "real job" in IT at a broadcast
station where every machine was a Mac. At first I despised all the 
Apple Inc. gear around as I was still a devoted Androidian. As time
went on, my ultra-custom setups demanded my attention for staying
up to date. I just wanted to get work done and Macs were the out of the
box solution for exactly that.

I'd been using OS X as my daily driver since 2013. Easy to use, UNIX
under the hood, fast hardware. Yet, something was missing. Something
cool and edgy. There was no sense of personal touch or customization.
Some of the commands did not behave the same on Linux, since OS X is a
BSD based operating system.

Enter [/r/unixporn](https://www.reddit.com/r/unixporn): A place where
custom UNIX desktops run wild with imagination.

## Ricing

Meaning: Making improvements to a system that don't actually do anyone
any good, and can sometimes have negative ramifications.

I had been "ricing" my desktop without even knowing it, back in 2010.

Ricing can be a timesuck if you really go through and tweak every
little piece yourself. The Desktop Environment, the Window Manager, the
Applications, Utilities, Vim, Bash or Zsh (or Fish), Weechat or irssi,
the list never ends. 

It can either end up looking really good, like this:
![windelcato](https://camo.githubusercontent.com/8595e3f06d3aba3dc4455fdeb623cb1dd3811d8d/68747470733a2f2f7261772e6769746875622e636f6d2f77696e64656c696361746f2f646f7466696c65732f6d61737465722f73637265656e73686f742e706e67)

Or it can just end up being a huge waste of time where you waste hours
of your life editing configuration files with a less than desirable
outcome.

I still had "real" work to do and I didn't want to devote that much time to
learning the syntax of all the new hotness the good people of 
[#rice](https://rizon.net/) use to get their desktops looking so 
fresh and so clean.

## Neeasade

[neeasade](http://neeasade.net/) is [this guy](https://github.com/neeasade/)
I met in #rice that ended up having a very good looking [bspwm](https://github.com/baskerville/bspwm)
setup, complete with a theme changer and nice looking [panel](https://github.com/LemonBoy/bar).

He's got scripts that'll clone his repo and tie all the relevant files
to your homefolder using symlinks. Exceptionally simple to have a nice,
useable, somewhat custom setup within a few mintues. In fact, it's just
a simple one liner:

`git clone http://github.com/neeasade/dotfiles ~/.dotfiles_neeasade && ~/.dotfiles_neeasade/deploy.sh`

Using his dotfiles as the framework, I've only had to make a few small changes
to make the setup my own. Chaning the backgrounds and editing a few scripts
was all that I needed to make the setup good enough to be my daily driver.

Thanks neeasade!

You can see the desktop in action here:

[webm](https://sr.ht/61e69.webm)
