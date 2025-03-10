---
layout: post
title: Phalcon v5.9.0 Released
image: /assets/files/2025-03-10-phalcon-5.9.0-release.png
date: 2025-03-10T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.9.0 has been released!

<!--more-->

This release contains a fair amount of changes and bug fixes

## PHP 8.4

Support for PHP 8.4 is finally here. After months of background work on Zephir, we are happy to announce that Phalcon can be compiled and run on PHP 8.4. 

Due to the nature of the changes, we had to increase the minimum version to PHP 8.1. Users that wish to install Phalcon on PHP 8.0 or earlier, will need to use earlier versions of Phalcon. Please note, that older medium versions are no longer supported for bug fixes.

## v6.0.0 update

We are finally seeing light at the end of the tunnel as they say. The only major item to fix for v6.0.0 is the PHQL parser. Work is already underway on this and we are hoping to complete this last task soon, so that we can release an alpha version.

You can always check our efforts in the [phalcon/phalcon](https://github.com/phalcon/phalcon) repository.

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!


## Changelog


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.9.0
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.9/installation)
