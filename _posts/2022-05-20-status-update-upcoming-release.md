---
layout: post
title: Status Update - Upcoming Release
image: /assets/files/2022-05-20-status-update.png
date: 2022-05-20T15:12:39.244Z
tags:
  - phalcon5
  - status
  - update
---
A quick update for the community, since it has been a while since we last posted our progress.
<!--more-->
### Team
Both [Jeckerson](https://github.com/Jeckerson) and [niden](https://github.com/niden) have had urgent issues that had to be addressed outside the project. Moving was the most time consuming task for both, leaving little to no time to work on the project. The weeks ahead seem much better though!

### PSR
As mentioned in our previous blog post, PSR needs to be removed as a dependency from Phalcon. As such, we have refactored our classes to allow for our own interfaces (which are much stricter with types). We also created `proxy-*` repositories for different PSR implementations, to be available in composer. The user that wishes to use a PSR standard (say Logger) will be able to install `proxy-psr3` and use that class, which implements the PSR interface but internally uses code from the extension.

Sadly PSR-7 proved to be way too complex to address. We have spent a few weeks trying to get it to work with both implementations but it proved to be too much. Since we will be rewriting our HTTP layer, we will make sure that it can accept and process both Phalcon and PSR related objects (Requests, Responses etc.). So in short, no PSR-7 in v5. There is however a full implementation of PSR-7 in our [v6](https://github.com/phalcon/phalcon) repository.

### v5
The showstopper for v5 was indeed PSR, offering a good amount of segfaults. Now that it has been removed as a requirement, we have progressed as fast as we could to make sure that all the builds are working and we have support for PHP 7.4, 8.0 **and** 8.1!

There are a few things to tidy up (such as the windows builds for instance in our GitHub actions). We are however getting ready to release v5.0.0RC1 very soon.

While that part of the code is being worked on, we have some new issues that have been reported, that we will try to address and fix before the stable release.

### Thank you
As always a huge thank you to the community that has been supporting us with thoughts, ideas, discussion etc.