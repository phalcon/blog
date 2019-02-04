---
layout: post
title: "Sample Application: Album-O-Rama"
tags: [php, phalcon, sample, spotify, music, "0.8", "0.x"]
---

![image](/assets/files/2012-12-08-albumorama.jpg)

We are very excited to release our third Phalcon demo after [INVO](/post/invo-a-sample-application) and the [alternative PHP website](/post/sample-application-php-alternative-site) to the community, so as to showcase the power of Phalcon.

In this demo, we decided to go big! We created a music album library where one can get information about their favorite artists, discover new music and much more.

<!--more-->
We decided to add volume in this application to showcase how Phalcon behaves with a lot of data. In our database we have:

- > 5,000 Artists
- > 50,000 Albums
- > 30,000 Album tags
- > 20,000 Artists tags
- > 100,000 Tracks
- > 200,000 Photos

To make things even more interesting we introduced a custom layout generator which is invoked every time a new album is requested. This improves aesthetics and showcases the power of [Volt](https://docs.phalconphp.com/latest/en/volt), Phalcon's template engine:

![image](/assets/files/2012-12-08-album.jpg)

If you have [Spotify](http://spotify.com/) installed you may listen most popular songs.

In this demo you will find:

- Usage the [Volt](https://docs.phalconphp.com/latest/en/volt) template engine in a real application
- Generating queries using [PHQL](https://docs.phalconphp.com/latest/en/phql) (relations, joins, groupings, etc)
- Basic pagination
- Use of [view helpers](https://docs.phalconphp.com/latest/en/tag)
- Implementation of custom components
- Implementation of [custom routing](https://docs.phalconphp.com/latest/en/routing)
- Implementation of [views caching](https://docs.phalconphp.com/latest/en/views#caching-view-fragments)
- Implementation of a custom error handle

We hope that you enjoy it and looking forward to your comments as well as submissions of your implementations in our [Incubator](https://github.com/phalcon/incubator)!


<3 The Phalcon Team
