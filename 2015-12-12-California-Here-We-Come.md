---
layout: post
title: California Here We Come
---

After only six months of living in San Antonio, I'll be leaving to head back to California. I won't be returning to the
Southern Californian suburb from whence I came, but rather the San Fransisco Bay-Area Calfornia I've only visited for a week.

## Athena

My last blog post was about "The Octo Tripping Robot" and [Ricing](http://installgentoo.wikia.com/wiki/GNU/Linux_Ricing)
 Linux. After much time was spent fiddling the dials and knobs, flipping the switches and editing obscure configuration
 files on my Arch install, I decided I just didn't have the time or the patience to slave away on an underdeveloped
 desktop solution.

Arch Linux is great. It's bleeding edge, it's lean, it's ["Free"](http://www.gnu.org/philosophy/free-sw.en.html) and it's
 modular. However, there are a few things about the operating system that just fall short for doing every day work. The 
 email clients available don't play too nicely with Exchange accounts. There doesn't seem to be a suitable Calendar. No 
 way to text from the desktop (incredibly convenient). Configuring WiFi on a PEAP encrypted network (or any network) 
 was a pain. 

### Back to Mac

My first laptop was a Macbook Pro with Retina Display. I've spoiled myself. I tried to take on the task of building my
own spin on Arch. Frustration grew, time was lost, efficiency plummeted, rage grew. The struggle was real.

The Mac looks nicer from top to bottom, inside and out. The hardware, the software, the design. It's a complete package.
Truth is, I'm *faster* on a Mac. I couldn't continue fighting with Linux when I knew I'd be more productive on OS X.

Regardless, I could not accept the way it came, out of the box, plain jane, with the default settings. Rice all the things!

I forked this [gist](https://gist.github.com/internaught/fc60bfb98993e9874655) at the end of 2014 and started editing it.

This document is an organization of my preferred... preferences. Turn the key repeat up, show system folders in Finder,
set the hostname, etc. This gets the machine into an acceptable "working" state. Then, the fun begins.

### [Hammerspoon](http://www.hammerspoon.org/)

I discovered Hammerspoon not too long ago via our friends over at the [UNIXporn](https://reddit.com/r/unixporn)
subreddit. Hammerspoon exposes system level APIs to a programmable interface by way of [lua](http://www.lua.org/). This is
an incredible advantage that allows you to take control of an OS X system like never before.

For now, I'm only using it as a tiling window manager replacement that can organize my desktop using hotkeys. Keeping all of 
my lua scripts on GitHub, naming the repo [Hammered](https://github.com/internaught/hammered) seemed appropriate.

![dtop](https://u.teknik.io/jfJ59i.png)

There is more I can do that I just haven't got around to yet, but this utility has taught me a little lua and increased
my productivity by allowing me to navigate windows while keeping my hands on the keyboard. I should do more with it.

### [Übersicht](http://tracesof.net/uebersicht/)

Übersicht seems to be a viable replacement for [conky](https://github.com/brndnmtthws/conky)
aimed at OS X. Instead of a flat configuration file, you're forced to use [coffeescript](http://coffeescript.org/) to drive
the interface, which isn't too bad in my opinion. I'm currently working on designing the layout of some desktop widgets.

For now, I'm just using "pretty-weather" and "calendar".

## Charming

With the help of my friend and co-worker, Alex, I wrote a python library (over 1500 lines of code) for interacting with 
Nimbus, CA Technologies Infrastructure Manager, which is a monitoring software. I learned how to interact with an API over
HTTP, do GET, PUT, POST and DELETE requests in JSON, which was cool. Learned a lot about writing methods and classes in 
Python. I guess the language isn't so bad after all.

Alex also shared his [IntelliJ IDEA 15](https://www.jetbrains.com/idea/) software with me and we were able to plug [Floobits](https://floobits.com/) 
into it, enabling us to hack on the same code, at the same time, interactively. Pretty legit.

## VR OS

I came across a [video](https://www.youtube.com/watch?v=zxM4vN_4jJY&spfreload=10) the other day, that shows a guy wearing an 
Oculus and interacting with his surroundings in the same way you'd interact with an operating system.

Hopefully the world will be introduced to a true Virtual Reality Operating System in the near future.
