---
layout: post
title: "Phalcon 2.0 progress + benchmarks"
tags: [php, phalcon, 2.0, progress, benchmarks, 2.x]
---

After some weeks of hard work, long nights, burning the midnight oil (as all programmers do), we have reached a very important milestone in our roadmap for [Phalcon 2.0](https://github.com/phalcon/cphalcon/tree/2.0.0).

Phalcon 2.0 will be a major upgrade as far as the internal code is concerned and the way it operates. We managed to do this without making big changes to the API that would break compatibility. Some minor changes might be introduced, and if they do we will inform everyone well in advance.

<!--more-->
Phalcon 2.0 is currently being rewritten in [Zephir](http://zephir-lang.com/), a brand new high-level programming language that is used to help us code that is much easier maintainable than C itself and which translates its code to C instructions.

We still have a long way to go before we release Phalcon 2.0. There are many components and functionality that we need to migrate, address bugs, improve functionality etc. However we are extremely excited with the results so far.

The Zephir compiler itself still needs more work, to be able to produce better and more efficient C directives. Much of the base code that we have in Phalcon 1.x is also used as the base for Phalcon 2.x so the performance of two versions is very similar. To give you an idea of the performance of both versions, we performed some simple benchmarks comparing these two versions, and the results are encouraging:

The basic "hello world":

![2.0 Benchmarks](assets/files/2013-09-17-benchmarks.png)

This simple ["hello world"](https://github.com/phalcon/framework-bench/tree/master/helloworld/phalcon) application, shows an important milestone reached in Phalcon, the MVC core functionality of Phalcon 2.0. It also demonstrates the unnoticeable performance impact between 1.x and 2.0 due to the migration. Note that Phalcon 2.0 is in average faster than 1.x due to the lack of functionality implemented.

You can check the progress of migration in the [Wiki](https://github.com/phalcon/cphalcon/wiki/Progress-2.0).

We're working hard to ensure that the Phalcon 2.0 launch will go smoothly and without any problems

Can't wait to share more soon!


<3 Phalcon Team
