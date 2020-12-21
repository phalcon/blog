---
layout: post
title: "Phalcon 0.3.1 released!"
tags:
  - phalcon
  - "0.3"
  - release
  - "0.x"
---
Version 0.3.1 is part of the new 0.3.x branch on which we have been working. Last release improves many aspects of Phalcon. With this release we specifically work on aspects of memory by implementing a memory manager on top of [Zend MM](https://wiki.php.net/internals/zend_mm).

The version 0.2.x due to its more conservative memory model tends to produce [memory leaks](http://en.wikipedia.org/wiki/Memory_leak) or delay the release of allocated memory.

<!--more-->
Basically, the new behavior of the Phalcon collector is to incrementally release memory allocated after the end of a particular execution trace reducing [memory fragmentation](http://stackoverflow.com/a/3770572/1022921).

This version can be tested as a beta release on the download page or by cloning it from Github.

Before saying goodbye, we would like to thank again all the people who have contributed feedback or is following our project. 

Enjoy!
