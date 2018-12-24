---
layout: post
title: "Phalcon 3.2.2 released"
tags: [php, phalcon, phalcon3, "3.2.x", release, rfc, lts, php7]
---

We are releasing Phalcon 3.2.2 today, addressing several bugs. 

<!--more-->
### Release
The release tag can be found here: [3.2.2](https://github.com/phalcon/cphalcon/releases/tag/v3.2.2). The Windows DLLs are in the [releases](https://github.com/phalcon/cphalcon/releases/) Github page.

#### Changelog
- Fixed `Phalcon\Db\Adapter\Pdo\Postgresql::describeColumns` to work properly with `DOUBLE PRECISION` and `REAL` data types [#12842](https://github.com/phalcon/cphalcon/issues/12842)
- Fixed `Phalcon\Paginator\Adapter\QueryBuilder::getPaginate` to use the db connection service of the model [#12957](https://github.com/phalcon/cphalcon/issues/12957)
- Fixed `Phalcon\Paginator\Adapter\QueryBuilder::getPaginate` to escape reserved words [#12950](https://github.com/phalcon/cphalcon/issues/12950)
- Fixed `Phalcon\Dispatcher::dispatch` to correct forward with the modified action suffix [#12988](https://github.com/phalcon/cphalcon/pull/12988)
- Fixed `Phalcon\Forms\Element::_construct` to prevent create form element with empty name [#12954](https://github.com/phalcon/cphalcon/pull/12954)

### Update/Upgrade
Phalcon 3.2.2 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

<h5 class="alert alert-danger">
<strong>NOTE</strong>: Windows DLLs are now available in our <a href="https://github.com/phalcon/cphalcon/releases/tag/v3.2.2">Github Release</a> page.
</h5>

<h5 class="alert alert-info">
<strong>NOTE</strong>: PackageCloud (linux distributions) will be updated tomorrow 2017-08-14.
</h5>

We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team

