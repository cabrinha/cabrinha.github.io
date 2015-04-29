---
layout: post
title: Days of Future Passed
---

I feel like I need to write about a few things that I've been up to recently. I haven't read a new book or created some new Linux workflow (yet). But I have discovered a new musical album and band. 

## The Album 

[The Moody Blues - Days of Future Passed](https://www.youtube.com/watch?v=2y_9hwW1eV0&feature=youtu.be&t=1s)

Click at your own risk. It's an extraordinary record. An amazing piece of music, and now, the story behind the discovery...

<strong>I open a terminal.</strong> As I usually do, when sitting down at my computer, when suddenly... a `fortune` catches my eye. 

{% highlight js %}
Breathe deep the gathering gloom.
Watch lights fade from every room.
Bed-sitter people look back and lament;
another day's useless energies spent.

Impassioned lovers wrestle as one.
Lonely man cries for love and has none.
New mother picks up and suckles her son.
Senior citizens wish they were young.

Cold-hearted orb that rules the night;
Removes the colors from our sight.
Red is grey and yellow white.
But we decide which is real, and which is an illusion."
                -- The Moody Blues, "Days of Future Passed"
{% endhighlight %}

The part in quotes is what piqued my interest. "Days of Future Passed", not to be confused with [Days of Future Past](https://itunes.apple.com/us/movie/x-men-days-of-future-past/id867914892), the X-Men movie. I looked up the title, found an HD recording on YouTube (linked above) and proceeded to listen to the whole thing, start to finish. Excellent choice on my part. Then, I looked up the title on Amazon, thinking it'd be the perfect vinyl to start off a record collection. That's where I found this review, which got me a little more sentimental about the album.

>"Days of Future Passed" has one of the stranger stories behind the birth of an album in rock history. In 1967 Deram Records, part of the Decca label, wanted to promote its new Deramic Stereo process and tapped the Moody Blues to do a rock version of Dvorak's "New World Symphony." However, instead of putting together something that would anticipate Emerson, Lake & Palmer's live performance of Mussorgsky's "Pictures at an Exhibition," the group persuaded the powers that be to abandon the Dvorak idea and let them do their own original compositions. Obviously inspired by the Beatle's "Sgt. Pepper," the result was a concept album presenting an archetypal day from "The Day Begins" to "Nights in White Satin" and essentially became the first major salvo in the Progressive Rock movement.

You can [read the whole review](http://www.amazon.com/gp/customer-reviews/RKBTOZTK6J9LV/ref=cm_cr_pr_rvw_ttl?ie=UTF8&ASIN=B000063J2D) if you like, I thought it was pretty interesting.

However, that's not the thing that inspired me to sit down and write. It was a movie, a film, a lecture that I watched this eventhing that really got me thinking and just ... Woke me up!

### Waking Up

I haven't read the book, I'd never heard of the guy before but I happened across the lecture and gave it a good watch and listen with a roomate of mine and we were both very interested in it and kind of inspired by it.

[Waking Up by Sam Harris](https://vimeo.com/ondemand/wakingup)

I encourage you to get your hands on a copy and watch it. Really compelling argument for "Spirituality" without religion. Touching upon Buddhism, Hinduism, Christianity and other religions, Sam Harris talks about meditation and mindfullness, A.I. and the nature of consciousness. These were once topics of the utmost importance to me and over time they've sort of faded away or taken a back seat in my day-to-day life, although they still mean a great deal to me.

It was nice to be reminded of a topic and to be exposed to a new set of ideas, that (still) influces my life to a huge degree, after a long time of not even thinking about stuff like this.

### Perl and the Pull Request Challenge 

As you may or may not know, I've accepted the [CPAN Pull Request Challenge](http://cpan-prc.org) and today, I completed my first assignment by getting my pull request merged! I'm proud of myself for following through with something, being listed as a contributor and just starting my involvement with the open-source community. Want to know what I did?

## Synopsis

I've been working (more or less) on writing an <abbr title="Internet Relay Chat">IRC</abbr> bot in [Perl](http://perl.org). Of course, I want my bot to take input and produce some kind of output based on it, like searching [google](http://lmgtfy.com/?q=google) or [wikipedia](http://wikipedia.org) or [Urban Dictionary](http://urbandictionary.com). Well, Perl has this great utility called the <abbr title="Comprehensive Perl Archive Network">CPAN</abbr> where people can share `modules` or globs of software that you can just install and run inside of your script. I looked and found one such module for querying UrbanDictionary.

[WebService::UrbanDictionary](https://metacpan.org/pod/WebService::UrbanDictionary)

However, I quickly found that the [synopsis](https://metacpan.org/pod/WebService::UrbanDictionary#SYNOPSIS) section didn't actually work and threw an error when you put it into a script and ran the code.

`Undefined subroutine &main::request called at webs.pl line 7.`

My pull request solved the issue and got the code working!

{% highlight perl %}
# By simply changing:
my $results = request('perl');

# to
my $results = $ud->request('perl');
# It works!
{% endhighlight %}

Better still, the author of the module merged my pull request within the hour I submitted it!

### Jobs and the hunt for the perfect one

I find it worth mentioning: I quit my job. You know, the one that I came up with the [bootable backup]({% post_url 2015-3-13-Creating-Bootable-Backups %}) at? Yeah, I quit that one because I got offered a better one. But, I find it worth adding: I'm currently in the process of interviewing at [Rackspace](http://rackspace.com). 

The whole thing started on Twitter, when I woke up one morning and expressed my first thought via tweet.

<blockquote class="twitter-tweet" lang="en"><p>I want to work on <a href="https://twitter.com/hashtag/Linux?src=hash">#Linux</a> at <a href="https://twitter.com/Rackspace">@Rackspace</a></p>&mdash; Scotta know me! (@ScottaBeTrue) <a href="https://twitter.com/ScottaBeTrue/status/587620046521774080">April 13, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Only a few minutes later, I was surprised to get a mention from [@Rackspace](https://twitter.com/Rackspace) itself.

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/ScottaBeTrue">@ScottaBeTrue</a> We also want you to work on <a href="https://twitter.com/hashtag/Linux?src=hash">#Linux</a> at Rackspace. If/when you&#39;re ready, let us know and we&#39;ll get you in touch with recruiting!</p>&mdash; Rackspace (@Rackspace) <a href="https://twitter.com/Rackspace/status/587621173367713792">April 13, 2015</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Pretty amazing the power of social media in this day and age! I looked up `proprioception` today for some unrelated reason and found Twitter mentioned in the result.

>proprioception is a sense of how our bodies are positioned. Twitter and other constant-contact media create social proprioception. We still see evidence of vestibular and proprioception problems, but they may diminish over time.

Pretty crazy stuff. Anyway, I'll be on my third interview later this week and I might end up writing about how it went. I've been excited about the whole thing ever since I got that mention.

## Outro

I've been doing some things of interest lately and there's more to come! 

Stay tuned.
