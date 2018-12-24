---
layout: post
title: "Making Phalcon even faster. Is that possible? Yes!"
tags: [php, phalcon, optimization, performance, compilation, "1.x"]
---

![image](/assets/files/2013-06-23-phalcon-php-logo.png)

The Phalcon Team is constantly trying to find ways of making Phalcon even faster while keeping a good balance in terms of features offered and performance.

Today, we are happy to announce that **profile-guided optimizations are available in Phalcon**!

In a recent post, we have highlighted how implementing Phalcon as a DLL/Shared Object (so) helps with the optimization of the memory usage while running PHP applications on a web server. Phalcon's installation is structured in such a way that it takes advantage of specific optimizations available in the target machine. In most cases, this is more than enough to offer high performance.

**PGO**
A new feature as far as optimizations is concerned is now available, taking advantage of the compiled nature of Phalcon!

Profile-guided optimization ([PGO](http://en.wikipedia.org/wiki/Profile-guided_optimization)), is a compiler optimization technique in computer programming that is aimed to improve runtime performance of applications. In contrast to traditional optimization techniques that  solely use the source code, PGO uses the results of test runs of the application to optimize the final generated code.

**What does this mean?**
Every environment and application is different and every application requires certain components that other applications do not. This particular optimization *teaches* the compiler which functions are executed more frequently and which functions are not. 

Starting from 1.2, we are offering a new installation that compiles Phalcon with profiling enabled. 

The functioning works as follows:

- Compile Phalcon with profiling
- Execute your application extensively
- Compile Phalcon again taking advantage of the profiled data

You need at least GCC 4.5 to use PGO, the instruction to compile with profiling is:

```sh
cd cphalcon/build
./pgo-install
```

Restart your web server, test/execute the applications, Restart your web server again, compile using the data collected:

```sh
cd cphalcon/build
./use-pgo-install
```

Restart your web server and enjoy and even-more-optimized version of Phalcon for your specific needs!


<3 The Phalcon Team

