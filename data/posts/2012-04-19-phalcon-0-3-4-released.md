Phalcon 0.3.4 released
======================

We're part of the "speed up the web", therefore, we want to have a rapid release schedule releasing continuous improvements and bug fixes to Phalcon.

The C language has not been designed for rapid development; however, we are putting a lot of enthusiasm to get a better and faster framework.

Unit-tests and the [continuous integration](http://travis-ci.org/#!/phalcon/cphalcon) server helped us a lot to discover bugs and maintain our repositories stable (during development).

As you know, Phalcon is the fastest framework for PHP out there, so but more importantly than that, we want to get a balance between functionality and performance.

Returning to the subject of this post, in this release, we're proud to announce the following changes:

0.3.4

- Fixed wrong implementation in Phalcon\Tag::javascriptInclude
- Added [Phalcon\Cache\Frontend\Output](https://docs.phalconphp.com/en/latest/reference/cache.html)
- Renamed `Phalcon\Db\Mysql` to `Phalcon\Db\Adapter\Mysql`
- Renamed `Phalcon\Cache\Adapter\File` to `Phalcon\Cache\Frontend\File`
- Added `Phalcon\Request::setRawHeader`
- Added [Phalcon\Paginator\Adapter\Array](https://docs.phalconphp.com/en/latest/reference/pagination.html)
- Fixed pagination bugs in `Phalcon\Paginator\Adapter\Model`
- Added [Phalcon\Tag::hiddenField](https://docs.phalconphp.com/en/latest/reference/volt.html#using-tag-helpers)
- Added [Phalcon\Tag::fileField](https://docs.phalconphp.com/en/latest/reference/volt.html#using-tag-helpers)
- Added [Phalcon\Loader](https://docs.phalconphp.com/en/latest/reference/loader.html) to autoload classes based on some conventions
- Added [Phalcon\Db\Profiler](https://docs.phalconphp.com/en/latest/reference/whats-next.html) to profile database operations and determine possible bottlenecks 
- Added methods to query table metadata: `Phalcon\Db::describeTable`, `Phalcon\Db::describeIndexes` and `Phalcon\Db::describeReferences` [More Info](https://docs.phalconphp.com/en/latest/reference/db.html#describing-tables-views)
- Fixed segmentation fault in `Phalcon\Db::tableExists`
- Fixed memory leak in `Phalcon\Paginator`
- Added [Phalcon\Logger](https://docs.phalconphp.com/en/latest/reference/logging.html) component
- Added Zend Thread Safety (ZTS) support to Phalcon Memory Manager. We are taking advantage of [thread safety](http://en.wikipedia.org/wiki/Thread_safety). Phalcon is now able to run under [single-process multithreaded web servers](http://httpd.apache.org/docs/2.0/en/mpm.html).

The diagram below explains the life cycle of an extension in a multi-threaded web server:

![image]({{ cdnUrl }}files/mpm.png)

Framework documentation is also quite complete. [Check it out](https://docs.phalconphp.com)

This time, we want to give very special thanks to:
[@jamurko](https://twitter.com/#!/jamurko), [@juliorabadan](https://twitter.com/#!/juliorabadan) and [@mailopl](https://twitter.com/#!/mailopl) for their constant feedback and help.

PS: Only about 3 months ago, we started with this project, many good things have happened. Thanks to all of you folks out there helping us to create something useful and different!


<3 Phalcon Team
