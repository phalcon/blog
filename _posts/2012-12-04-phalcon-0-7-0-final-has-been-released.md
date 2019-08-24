---
layout: post
title: "Phalcon 0.7.0 final has been released!"
tags: [php, phalcon, release, "0.7", "0.x"]
---

![image](/assets/files/2012-12-04-falcon.png)

We are very pleased to announce the immediate availability of Phalcon Framework 0.7.0 stable.

It's only been a month since we released 0.6.x, but we're already back with more updates. And they're pretty good!

<!--more-->
After some weeks of development and testing we are taking yet another step forward in our roadmap. We would like to thank the community for investing their time and enthusiasm in getting Phalcon better.

Some of the [key features](/post/phalcon-0-7-0-beta-released) introduced are:

- Interfaces
- Independent Column Map
- ORM queries through PHQL
- Object/Oriented Builder for PHQL
- Full escaping system for generated SQL
- Events Propagation/Cancelation
- Registering services as "always shared"
- Compile "always" mode in Volt
- Performance improvements calling internal functions/methods

Another important addition to the framework, is a brand new test suite which will allow us to further test the code in various configurations, specifically when targeting model related tests. Thanks to this we're completing more than [600 tests](https://travis-ci.org/phalcon/cphalcon/builds/3499298) with more than 4500 assertions!

Additionally, in this version the [incubator](https://github.com/phalcon/incubator) has been born, a repository where the community has shared snippets and new adapters for existing components ([Redis](http://redis.io/), [HandlerSocket](http://yoshinorimatsunobu.blogspot.com/search/label/handlersocket), Memcached, Database, etc).

0.7.0 includes other minor changes and bug fixes. You can see the complete CHANGELOG [here](https://github.com/phalcon/cphalcon/blob/phalcon-v0.7.0/CHANGELOG). Applications created with 0.5.x/0.6.x are compatible with this new version.

- [Documentation](https://docs.phalcon.io/latest/en/)
- [Download](https://phalcon.io/download)

A big thank you to the community and contributors!


<3 The Phalcon Team
