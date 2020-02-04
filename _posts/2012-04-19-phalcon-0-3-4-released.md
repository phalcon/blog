---
layout: post
title: "Phalcon 0.3.4 released"
tags: [php, phalcon, framework, "0.3", release, "0.x"]
---
We're part of the "speed up the web", therefore, we want to have a rapid release schedule releasing continuous improvements and bug fixes to Phalcon.

The C language has not been designed for rapid development; however, we are putting a lot of enthusiasm to get a better and faster framework.

<!--more-->
Unit-tests and the [continuous integration](http://travis-ci.org/#!/phalcon/cphalcon) server helped us a lot to discover bugs and maintain our repositories stable (during development).

As you know, Phalcon is the fastest framework for PHP out there, so but more importantly than that, we want to get a balance between functionality and performance.

Returning to the subject of this post, in this release, we're proud to announce the following changes:

0.3.4

- Fixed wrong implementation in Phalcon\Tag::javascriptInclude
- Added [Phalcon\Cache\Frontend\Output](https://docs.phalcon.io/latest/en/cache)
- Renamed `Phalcon\Db\Mysql` to `Phalcon\Db\Adapter\Mysql`
- Renamed `Phalcon\Cache\Adapter\File` to `Phalcon\Cache\Frontend\File`
- Added `Phalcon\Request::setRawHeader`
- Added [Phalcon\Paginator\Adapter\Array](https://docs.phalcon.io/latest/en/pagination)
- Fixed pagination bugs in `Phalcon\Paginator\Adapter\Model`
- Added [Phalcon\Tag::hiddenField](https://docs.phalcon.io/latest/en/volt#using-tag-helpers)
- Added [Phalcon\Tag::fileField](https://docs.phalcon.io/latest/en/volt#using-tag-helpers)
- Added [Phalcon\Loader](https://docs.phalcon.io/latest/en/loader) to autoload classes based on some conventions
- Added [Phalcon\Db\Profiler](https://docs.phalcon.io/latest/en/whats-next) to profile database operations and determine possible bottlenecks 
- Added methods to query table metadata: `Phalcon\Db::describeTable`, `Phalcon\Db::describeIndexes` and `Phalcon\Db::describeReferences` [More Info](https://docs.phalcon.io/latest/en/db#describing-tables-views)
- Fixed segmentation fault in `Phalcon\Db::tableExists`
- Fixed memory leak in `Phalcon\Paginator`
- Added [Phalcon\Logger](https://docs.phalcon.io/latest/en/logging) component
- Added Zend Thread Safety (ZTS) support to Phalcon Memory Manager. We are taking advantage of [thread safety](http://en.wikipedia.org/wiki/Thread_safety). Phalcon is now able to run under [single-process multithreaded web servers](http://httpd.apache.org/docs/2.0/en/mpm.html).

Framework documentation is also quite complete. [Check it out](https://docs.phalcon.io)

This time, we want to give very special thanks to:
[@jamurko](https://twitter.com/#!/jamurko), [@juliorabadan](https://twitter.com/#!/juliorabadan) and [@mailopl](https://twitter.com/#!/mailopl) for their constant feedback and help.

PS: Only about 3 months ago, we started with this project, many good things have happened. Thanks to all of you folks out there helping us to create something useful and different!


<3 Phalcon Team
