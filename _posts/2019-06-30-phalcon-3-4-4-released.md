---
layout: post
title: Phalcon 3.4.4 released
date: 2019-06-30T19:43:56.628Z
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
We are happy to announce that we have released Phalcon [3.4.4](https://github.com/phalcon/cphalcon/releases/tag/v3.4.4). 

This is a maintenance release, addressing several issues in particular with PHP 7.

<!--more-->
## Changelog

### Fixed
- Generated Dialect Class referring to a PHP class can't be found [#13867](https://github.com/phalcon/cphalcon/pull/13867)
- Changed default gcc's CFLAGS so that, the extension should be properly generated for most hosts, including Docker [#13143](https://github.com/phalcon/cphalcon/issues/13143)
- `Phalcon\Forms\Form::clear()` now correctly clears single fields. [#14217](https://github.com/phalcon/cphalcon/issues/14217)
- Used latest stable Zephir from 0.10.x branch to prevent segfaults with PHP 7.3.6 [#14160](https://github.com/phalcon/cphalcon/issues/14160)

As always, a huge thank you to our community!!

## Update/Upgrade
Windows DLLs are available from the Github [3.4.4](https://github.com/phalcon/cphalcon/releases/tag/v3.4.4) tag page. 

Phalcon 3.4.4 can be installed from the [v3.4.4](https://github.com/phalcon/cphalcon/tree/v3.4.4) tag, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

<h5 class="alert alert-danger">
<strong>NOTE</strong>: Our packaging system not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly recommend you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code.
</h5>

<h5 class="alert alert-info">
<strong>NOTE</strong>: The RPMs and DEBs will take a bit of time to be rebuilt, so they might not be immediately available.
</h5>

<h5 class="alert alert-danger">
<strong>NOTE</strong>: Windows DLLs are now available in our <a href="https://github.com/phalcon/cphalcon/releases/tag/v3.4.4">Github Release</a> page.
</h5>

Users of v3 that need/want to port your code to PHP 7.3 you will need to use this version and as always a big thank you to our contributors!


<3 Phalcon Team
