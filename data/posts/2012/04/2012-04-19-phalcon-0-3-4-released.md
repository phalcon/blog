<!--
slug: phalcon-0-3-4-released
date: Thu Apr 19 2012 14:47:00 GMT-0400 (EDT)
tags: php, phalcon, framework
title: Phalcon 0.3.4 released
id: 21389804474
link: http://blog.phalconphp.com/post/21389804474/phalcon-0-3-4-released
publish: 2012-04-019
-->


Phalcon 0.3.4 released
======================

We’re part of the “speed of the web”, therefore, we want to have a rapid
release schedule releasing continuous improvements and bug fixes to
Phalcon.

The C language has not been designed for rapid development; however, we
are putting a lot of enthusiasm to get a better framework.

Unit-tests and the [continuous
integration](http://travis-ci.org/#!/phalcon/cphalcon) server helped us
a lot to discover bugs and maintain our repositories stable (even
development).

As you know, Phalcon is the fastest framework for PHP out there, so but
more importantly than that, we want to get a balance between
functionality and performance.

Returning to the subject of this post, in this release, we’re proud to
announce the following changes:

0.3.4

-   Fixed wrong implementation in Phalcon\_Tag::javascriptInclude
-   Added
    [Phalcon\_Cache\_Frontend\_Output](http://phalconphp.com/documentation/cache)
-   Renamed Phalcon\_Db\_Mysql to Phalcon\_Db\_Adapter\_Mysql
-   Renamed Phalcon\_Cache\_Adapter\_File to
    Phalcon\_Cache\_Frontend\_File
-   Added Phalcon\_Request::setRawHeader
-   Added
    [Phalcon\_Paginator\_Adapter\_Array](http://phalconphp.com/documentation/pagination)
-   Fixed pagination bugs in Phalcon\_Paginator\_Adapter\_Model
-   Added
    [Phalcon\_Tag::hiddenField](http://phalconphp.com/documentation/tags#form-elements)
-   Added
    [Phalcon\_Tag::fileField](http://phalconphp.com/documentation/tags#form-elements)
-   Added [Phalcon\_Loader](http://phalconphp.com/documentation/loader)
    to autoload classes based on some conventions
-   Added
    [Phalcon\_Db\_Profiler](http://phalconphp.com/documentation/db#profiling)
    to profile database operations and determine possible bottlenecks
-   Added methods to query table metadata: Phalcon\_Db::describeTable,
    Phalcon\_Db::describeIndexes and Phalcon\_Db::describeReferences
    [More Info](http://phalconphp.com/documentation/db#describing)
-   Fixed segmentation fault in Phalcon\_Db::tableExists
-   Fixed memory leak in Phalcon\_Paginator
-   Added [Phalcon\_Logger](http://phalconphp.com/documentation/logging)
    component
-   Added Zend Thread Safety (ZTS) support to Phalcon Memory Manager. We
    are taking advantage of [thread
    safety](http://en.wikipedia.org/wiki/Thread_safety). Phalcon is now
    able to run under [single-process multithreaded web
    servers](http://httpd.apache.org/docs/2.0/en/mpm.html).

The diagram below explains the life cycle of an extension in a
multi-threaded web server:

![image](http://static.phalconphp.com/blog/img/mpm.png)

Framework documentation is also quite
complete. [Check](http://phalconphp.com/documentation/toc)[it
out](http://phalconphp.com/documentation/toc)

This time, we want to give very special thanks to:
[@jamurko](https://twitter.com/#!/jamurko),
[@juliorabadan](https://twitter.com/#!/juliorabadan) and
[@mailopl](https://twitter.com/#!/mailopl) for their permanent feedback
and help.

PS: Only about 3 months ago, we started with this project, many good
things have happened. Thanks to all of you folks out there helping us to
create something useful and different!

