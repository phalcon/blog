---
layout: post
title: "Phalcon 3.3.2 released"
date: 2018-04-17T16:23:19.160Z
tags:
  - php
  - phalcon
  - phalcon3
  - "3.3.x"
  - release
  - rfc
  - lts
  - php7
---
We are happy to announce that we have released Phalcon [3.3.2](https://github.com/phalcon/cphalcon/releases/tag/v3.3.2). 

This release contained some bug fixes.
<!--more-->
#### Changelog
- Fixed `Phalcon\Db\Dialect\Mysql::modifyColumn` to produce valid SQL for renaming the column [#13012](https://github.com/phalcon/cphalcon/issues/13012)
- Fixed `Phalcon\Forms\Form::getMessages` to return back previous behaviour: return array of messages with element name as key [#13294](https://github.com/phalcon/cphalcon/issues/13294)
- Fixed `Phalcon\Mvc\Model\Behavior\SoftDelete::notify` to solve the exception that soft deletion renamed model [#13302](https://github.com/phalcon/cphalcon/issues/13302), [#13306](https://github.com/phalcon/cphalcon/issues/13306)
- Fixed `E_DEPRECATED` error for `each()` in `Phalcon\Debug\Dump` [#13253](https://github.com/phalcon/cphalcon/issues/13253)


### Update/Upgrade
Phalcon 3.3.2 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

> **NOTE**: Our packaging system not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly recommend you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code.
{: .alert .alert-danger }

> **NOTE**: Windows DLLs are now available in our <a href="https://github.com/phalcon/cphalcon/releases/tag/v3.3.2">Github Release</a> page.
{: .alert .alert-danger }

We encourage existing Phalcon 3 users to update to this version and as always a big thank you to our contributors!
