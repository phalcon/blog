---
layout: post
title: Phalcon 3.4.5 released
date: 2019-10-30T15:00:36.802Z
tags:
  - php
  - phalcon
  - phalcon3
  - 3.4.x
  - release
  - rfc
  - lts
  - php7
---
We are happy to announce that we have released Phalcon [3.4.5](https://github.com/phalcon/cphalcon/releases/tag/v3.4.5). 

This is a maintenance release, addressing several issues in particular with PHP 7.

<!--more-->
We did state in the past that we will no longer support v3 since v4 is just around the corner. However we decided on this maintenance release so as to help users with v3 and some of their critical bugs.

## Changelog

### Fixed
- Fixed segfault in `Phalcon\Mvc\Micro\LazyLoader::__call()` when the handler has a syntax error. [#12396](https://github.com/phalcon/cphalcon/issues/12396)
- Fixed RuntimeException in `Phalcon\Db\Adapter\Pdo` Trying to call method upper on a non-object. [#14330](https://github.com/phalcon/cphalcon/issues/14330)
- Fixed `Phalcon\Storage\Adapter\Redis::delete()` deprecated warning from php-redis [#14281](https://github.com/phalcon/cphalcon/issues/14281)

As always, a huge thank you to our community!!

## Update/Upgrade
Windows DLLs are available from the Github [3.4.5](https://github.com/phalcon/cphalcon/releases/tag/v3.4.5) tag page. 

Phalcon 3.4.5 can be installed from the [v3.4.5](https://github.com/phalcon/cphalcon/tree/v3.4.5) tag, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

> **NOTE**: The RPMs and DEBs will take a bit of time to be rebuilt, so they might not be immediately available.
{: .alert .alert-info }

> **NOTE**: Windows DLLs are now available in our <a href="https://github.com/phalcon/cphalcon/releases/tag/v3.4.5">Github Release</a> page.
{: .alert .alert-info }

Users of v3 that need/want to port your code to PHP 7.3 you will need to use this version and as always a big thank you to our contributors!


<3 Phalcon Team
