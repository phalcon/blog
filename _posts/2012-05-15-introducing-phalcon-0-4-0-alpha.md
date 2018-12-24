---
layout: post
title: "Introducing: Phalcon 0.4.0 alpha"
tags: [php, phalcon, frameworks, performance, "0.4", release, "0.x"]
---

We're happy to announce that after weeks of refactoring and polishing, 0.4.x are now ready to be tested. Although, it's an alpha release, it has many improvements, specially focused on a more maintainable code base and get running applications even faster.

[![image](/assets/files/2012-05-15-real-phalcon.png)](http://browse.deviantart.com/#/d15brzb)

At this time, we are not adding new features different than 0.3.x, but we hope to add some new components in less time than before and help contributors to understand better the framework structure.

We want to present some new experimental features we've been working on. It will not be released as part of the standard Phalcon extension until they work properly. Moreover, you can try it and tell us the good/bad results. Those experimental features can easily enable by activating macros at compile time.

**Function Calls**
PHP is a very dynamic language, for example you may call out functions in many ways giving you lots of flexibility to develop applications. Phalcon relies on the Zend engine API to call functions on the PHP userland. That API makes lots of validations to ensure the correct invocation of functions at every request, at every call.

Using analysis tools like [Valgrind](http://www.valgrind.org/), we identified scenarios to reduce the possible traces making those processes faster. Together with the implementation of a Zend Function Cache, we are getting better performance results when a single function is called many times in the same request. This feature is very useful if you are using Phalcon to execute long-time run processes.

**Class Entry Caching**
Another common action that PHP makes is looking up classes in the internal class table. We are also avoiding this look up by pointing object constructors directly to class entry pointers that are created when Phalcon module is initialized.

**Speed Improvement**
Version 0.4.x is 60% faster than its 0.3.x counterpart. Digging up into Travis CI historic builds you can check out the speed running unit-tests. From 1 min 29 secs on the build [54](http://travis-ci.org/#!/phalcon/cphalcon/builds/1286939) to 51 seconds with 0.4.0 on the [last build](http://travis-ci.org/#!/phalcon/cphalcon/builds/1332575).

Although, speed improvement is relative, not all components will run faster than before. If we would make Apache benchmarks again, the difference will not be noticeable.

As always, versions in progress are subject to change, yet require prototype implementation and unit-testing. This is a high technical bar, but we are in the process of meeting it in the latest Phalcon.

**TL;DR**
The new version has many nice improvements offering higher performance. Also it provides experimental features to get even more performance in the future. We are always keen to get your feedback and would love to hear your thoughts and suggestions regarding new features. 

Feel free to send your comments to Phalcon team any time.


<3 Phalcon Team
