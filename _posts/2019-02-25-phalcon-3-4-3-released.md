---
layout: post
title: Phalcon 3.4.3 released
date: 2019-02-25T14:20:04.691Z
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
We are happy to announce that we have released Phalcon [3.4.3](https://github.com/phalcon/cphalcon/releases/tag/v3.4.3). 

This release offers support for PHP 7.3 for the v3 series.

<!--more-->
#### Changelog

- Provided PHP 7.3 support [#13847](https://github.com/phalcon/cphalcon/issues/13847)

As always, a huge thank you to our community!! You guys rock!

### Update/Upgrade
Phalcon 3.4.3 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

> **NOTE**: Our packaging system not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly recommend you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code.
{: .alert .alert-danger }

> **NOTE**: The RPMs and DEBs will take a bit of time to be rebuilt, so they might not be immediately available.
{: .alert .alert-danger }

> **NOTE**: Windows DLLs are now available in our <a href="https://github.com/phalcon/cphalcon/releases/tag/v3.4.3">Github Release</a> page.
{: .alert .alert-danger }


Users of v3 that need/want to port your code to PHP 7.3 you will need to use this version and as always a big thank you to our contributors!
