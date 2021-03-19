---
layout: post
title: "Community Hangout - Status Update: 2021-February"
image: /assets/files/2021-03-21-status-update.png
date: 2021-03-18T15:07:28.690Z
tags:
  - phalcon
  - phalcon4
  - phalcon5
  - phalcon6
  - php8
---
This is going to be a rather long-ish post with our latest update. We will have a community hangout this weekend to discuss all these in detail.
<!--more-->
First and foremost, we are going to have a community hangout this week coming, to discuss our latest progress with Phalcon and several changes that are required.

What we will discuss is as follows:

### Method types - Interfaces
Zephir and subsequently Phalcon do not enjoy the ease of use and early detection of errors that pure PHP applications do, by using tools such as Psalm, PhpStan etc. 

As a result, and especially for version 3, we had a lot of interface mis-alignments. Sadly, Zephir could not pick that up, and unless a developer wrote a custom component using the interface, these bugs remained undetected and of course not fixed.

Example:

`Db/Adapter/AdapterInterface`
```php
public function fetchOne(
    string $sqlQuery, 
    int $fetchMode = 2, 
    placeholders = null
): array;
```

`Db/Adapter/AbstractAdapter`
```php
public function fetchOne(
    string $sqlQuery, 
    $fetchMode = Enum::FETCH_ASSOC, 
    $bindParams = null, 
    $bindTypes = null
): array
```

The above still exists in the codebase, even with v4. Unfortunately, we missed that and a few others. 

Because of the fact that Phalcon follows [SemVer](https://semver.org), we cannot change these interfaces in a minor version. It has to be a major one, and ample time given to developers to adjust their applications. More on the upcoming versions below.

Luckily, with the latest Zephir changes by Jeckerson and Alexndr, these misalignments are now detectable and will no longer be an issue in the future.

### Phalcon versions
Because of the misalgined interfaces mentioned above, we cannot release a minor version, it has to be a major one ([SemVer](https://semver.org)].

Our next version will be v5, which will be Phalcon v4 (as it is now), with corrected interfaces, supporting PHP 7.4 and PHP 8.0.

The PHP based version, the rewrite that we have been working on, translating Zephir code to PHP, will become v6.

### PHP 8
Work has been continuous with Phalcon v4 and PHP 8. A new version of Zephir has been released - 0.13. This version will support only PHP 7.4 and PHP 8.0.

At the moment, for PHP 8.0, all tests are passing. What is left to do is check the Windows DLL builds. Sadly, we are still using AppVeyor for these builds which is a bit time consuming - we never had the chance to move that process to GitHub Actions, which we will do at some point in the future. One more thing in the _todo_ list

### Incubator work
We have commissioned two members of the community to help with fully _translating_ all the incubator code to v4. [BeMySlaveDarlin](https://github.com/BeMySlaveDarlin) and 
[Arrim](https://github.com/Arrim) have been working on the relevant incubator repositories and we have seen significant progress in those repositories. The goal is to have everything ready very soon.

### Benchmarks
Since v4 has been a big leap forward for Phalcon with numerous changes, PHP version changes and additional corrections - mostly bugs that lingered in the framework for years - we have to figure out whether what we did made the framework faster or slower. 

We mentioned in the past that our goal with Phalcon is to have full benchmark tests for every part of the code - similar to our goal to have full code coverage with our testing suite.

Our initial benchmarks revealled that Phalcon v4 with PHP 7.4 is twice as fast as for instance Symfony. The only _slow_ area is a mass update. This will be investigated and adjusted as much as possible.

**Symfony**
```
Running 15s test @ http://tfb-server:8080/updates?queries=20
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   177.55ms  153.24ms   1.40s    83.53%
    Req/Sec   102.93     30.65   212.00     67.85%
  Latency Distribution
     50%  134.50ms
     75%  244.08ms
     90%  377.61ms
     99%  716.98ms
  49393 requests in 15.07s, 39.45MB read
Requests/sec:   3277.69
Transfer/sec:      2.62MB
```

**Phalcon**
```
Running 15s test @ http://tfb-server:8080/update?queries=20
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   356.63ms  120.51ms 708.25ms   65.01%
    Req/Sec    45.97     25.02   141.00     63.28%
  Latency Distribution
     50%  326.07ms
     75%  448.23ms
     90%  541.84ms
     99%  628.60ms
  21393 requests in 15.08s, 17.21MB read
Requests/sec:   1418.42
Transfer/sec:      1.14MB
```

Source: [https://github.com/TechEmpower/FrameworkBenchmarks/pull/6443]([https://github.com/TechEmpower/FrameworkBenchmarks/pull/6443])

Also the Fortunes benchmark (]ick row from DB, transform to array, add +1 array to row, pass to view, render from view)

**Phalcon**
```
Running 15s test @ http://tfb-server:8080/fortunes
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    21.12ms   17.57ms 230.93ms   81.42%
    Req/Sec     0.86k   350.68     3.57k    69.59%
  Latency Distribution
     50%   16.95ms
     75%   28.84ms
     90%   43.69ms
     99%   82.11ms
  411551 requests in 15.09s, 550.26MB read
Requests/sec:  27266.51
Transfer/sec:     36.46MB
```

**Phalcon Micro**
```
Running 15s test @ http://tfb-server:8080/fortunes
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    13.78ms   13.81ms 177.09ms   89.30%
    Req/Sec     1.41k   540.11     4.38k    68.62%
  Latency Distribution
     50%    9.14ms
     75%   17.22ms
     90%   28.44ms
     99%   71.15ms
  675343 requests in 15.10s, 0.88GB read
Requests/sec:  44724.82
Transfer/sec:     59.80MB
```

**Symfony**
```
Running 15s test @ http://tfb-server:8080/fortunes
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    60.57ms   66.00ms 333.89ms   79.91%
    Req/Sec   419.39    131.83     1.61k    70.61%
  Latency Distribution
     50%   21.00ms
     75%  110.08ms
     90%  163.33ms
     99%  229.28ms
  201303 requests in 15.10s, 277.41MB read
Requests/sec:  13330.72
Transfer/sec:     18.37MB
```

And also (pick random row from DB)

**Phalcon (7.4)**
```
Running 15s test @ http://tfb-server:8080/db
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    20.75ms   18.37ms 178.53ms   83.05%
    Req/Sec     0.90k   399.20     2.96k    63.66%
  Latency Distribution
     50%   15.80ms
     75%   28.02ms
     90%   44.33ms
     99%   87.83ms
  433506 requests in 15.10s, 83.01MB read
Requests/sec:  28708.22
Transfer/sec:      5.50MB
```

**Phalcon Micro (7.4)**
```
Running 15s test @ http://tfb-server:8080/db
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    11.03ms   12.62ms 366.82ms   90.57%
    Req/Sec     1.83k   573.82     8.97k    68.32%
  Latency Distribution
     50%    7.04ms
     75%   13.09ms
     90%   22.95ms
     99%   59.35ms
  876569 requests in 15.08s, 167.85MB read
Requests/sec:  58129.93
Transfer/sec:     11.13MB
```

**Symfony (8.0)**
```
Running 15s test @ http://tfb-server:8080/db
  32 threads and 512 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    56.51ms   62.23ms 305.70ms   79.86%
    Req/Sec   463.98    147.24     1.62k    70.71%
  Latency Distribution
     50%   18.16ms
     75%  103.25ms
     90%  154.10ms
     99%  215.93ms
  222923 requests in 15.10s, 49.06MB read
Requests/sec:  14762.27
Transfer/sec:      3.25MB
```

Finally, from initial tests, we have not seen a boost - as we expected - between Phalcon with PHP 7.4 vs Phalcon with PHP 8.0. The only thing that we saw was a decrease in latency. More benchmarks will be required to see the actual difference between versions.

### Conclusion
A lot of work, a lot of things to do. Thanks especially to [Jeckerson](https://github.com/Jeckerson) who has been working on PHP 8 and managing the incubator projects along with other tasks.

Finally, a huge thanks as always to our community for helping out with finding bugs, reporting issues, and sharing ideas for Phalcon.