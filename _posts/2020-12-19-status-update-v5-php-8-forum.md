---
layout: post
title: Status update - v5, PHP 8, Forum
image: /assets/files/news.jpg
date: 2020-12-19T21:33:37.332Z
tags:
  - news
  - update
  - phalcon4
  - phalcon5
  - zephir
---
A quick status update on v5, PHP 8 and our Forum.!

<!--more-->

It has been a while since we last communicated with the community using our blog, or via a hangout. This was not due to neglect, but more of a busy period before the holidays. Rest assured we have been working behind the scenes :)

### Forum
The [Phalcon Forum](https://forum.phalcon.io) is a Phalcon application that has been going strong since 2013!. It is hosted in one of our servers and utilizes a lot of techniques that one can find in business applications nowadays. At the moment, it is only compatible with v3 - we have not upgraded it to v4 due to lack of time.

Since Phalcon v4, we have tried to minimize all the side tasks that we need to handle in order to keep this project moving forward. In the past for instance, we had our [website](https://phalcon.io), [blog](https://blog.phalcon.io) running in a Phalcon application, our [documents](https://docs.phalcon.io), the [builtwith](https://builtwith.phalcon.io) site and many more. All these sites served as examples also for the community since they were all open sourced. However, we would find ourselves in a position where we needed to correct or migrate those applications to a newer version, which was a time consuming task. In addition, since we used one server for all sites, we had to upgrade all applications/sites in one go.

We changed direction, and started utilizing technologies that aid us and do not require a lot of time in maintenance. Moving our sites to [Netlify](https://netlify.com) and using Jekyll to generate our static sites reduced the maintenance of sites tremendously.

Recently, GitHub has introduced a new Discussions feature in repositories. We have decided to take advantage of that feature in two of our repositories:
- [cphalcon](https://github.com/phalcon/cphalcon/discussions) for v3/v4 and
- [phalcon](https://github.com/phalcon/phalcon/discussions) for v5

These two repositories will be used as forum replacements with questions/answers.

We will set the current forum application as read only at the beginning of 2021, and utilize Discussions solely. The current forum application will remain active to ensure that history is not lost as well as search engine results are not broken. We have also discussed importing the forum data into GitHub discussions, but for the moment there is no available API for repo discussions so we will have to revisit that when the ability to import data into Discussions is available.

Until the end of 2020, you can still use the current forum, or if you wish you can come and check out the two new discussion spaces and ask your questions there.

### Zephir - PHP 8
There has been some good movement in Zephir with regards to PHP 8. [Alexander](https://github.com/AlexNDRmac) has been driving the initiative to make Zephir PHP 8 compatible. The goal is to release a v4 version that works with PHP 8. 

Still early days for this effort but we are optimistic that it will work.

### Incubator
[Jeckerson](https://github.com/Jeckerson) has been working with the incubator repository. We have split it into smaller sub-repositories, that are easier to monitor and handle. The goal is to introduce all those to packagist so that the community can install them with composer. Work in progress still but we are getting there!

### v5
The translation of Zephir to PHP code continues. There are several components that we still need to "translate". The most difficult part is the class property types. Zephir was quite a bit forgiving with regards to types so you could in theory set a boolean to a seemingly string variable. That is no longer allowed in the PHP world, primarily because we are tightening the property/parameter types of each class, removing _mixed_ type parameters as much as possible. 

There are also some hurdles that will come up in the future. These are primarily Zephir methods that have been implemented in pure C (PHQL, Volt, Annotations and others). Those we will need to convert them also in PHP.

### Benchmarks
With v5 we know we will lose performance. We have slowly started adding benchmarks to the v5 code, in an effort to see how much we are losing when working with an extension vs. pure PHP. A small example is demonstrated below:

Right now we are just translating code from Zephir to PHP. Once v5 is released, we can start working to implement optimizations in the code, so that we can get the framework as fast as possible on the PHP side.

> **NOTE**: You can always check our roadmap and the status of our active sprint for v5 in our project page: <https://github.com/orgs/phalcon/projects/5>  
{: .alert .alert-info }

<hr>

Chat - Q&A

* [Discord Chat](https://phalcon.io/discord)
* [Forum](https://phalcon.io/forum)

Support

* [OpenCollective - Support Us](https://phalcon.io/fund)
* [Store - Merchandise](https://phalcon.io/store)

Social Media

* [Telegram](https://phalcon.io/telegram)
* [Gab](https://phalcon.io/gab)
* [MeWe](https://phalcon.io/mewe)
* [Parler](https://phalcon.io/parler)
* [Reddit](https://phalcon.io/reddit)
* [Facebook](https://phalcon.io/fb)
* [Twitter](https://phalcon.io/t)

Videos

* [BitChute](https://phalcon.io/bitchute)
* [Brighteon](https://phalcon.io/brighteon)
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

<3 Phalcon Team

_Image by [Markus Winkler](https://twitter.com/markuswinkler)_