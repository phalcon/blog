---
layout: post
title: "Phalcon 3.4.2 released"
tags: [php, phalcon, phalcon3, "3.4.x", release, rfc, lts, php7]
---

We are happy to announce that we have released Phalcon [3.4.2](https://github.com/phalcon/cphalcon/releases/tag/v3.4.2). 

This a minor release, focused on bugs mostly.

<h5 class="alert alert-danger">
<strong>NOTE</strong>: This is the last release for the v3.x series. Our next version will only support PHP version 7.2 or later. If you are using PHP &lt; 7.2 then you will need to use this version<
</h5>
<!--more-->
#### Changelog
- Added missing Volt tags to array helper in `Phalcon\Mvc\View\Engine\Volt\Compiler::functionCall` [#13447](https://github.com/phalcon/cphalcon/issues/13447)
- Added the ability to explicitly define nullable columns (especially timestamp ones) [#13099](https://github.com/phalcon/cphalcon/issues/13099)
- Refactored `Phalcon\Db\Adapter\Pdo::query` to use PDO's `prepare` and `execute` and `Phalcon\Db\Adapter::fetchAll` to use PDO's `fetchAll`
- Fixed `Phalcon\Validation\Validator\Numericality` to accept float numbers on locales with comma decimal point [#13450](https://github.com/phalcon/cphalcon/issues/13450)
- Fixed `Phalcon\Tag` so it unsets `parameters` before passing options array to `self::renderAttributes`
- Fixed `Phalcon\Http\Response::setFileToSend` filename; when file downloaded it had an extra `_`
- Fixed `Phalcon\Mvc\Model\Query::execute` to properly bind parameters to sub queries [#11605](https://github.com/phalcon/cphalcon/issues/11605)
- Fixed `Phalcon\Http\Request::getJsonRawBody` [#13501](https://github.com/phalcon/cphalcon/issues/13501). It will now return false when the body content is empty, as well as when it encounters an error whilst decoding the JSON content
- Fixed `Phalcon\Validation::preChecking` to allow use `Phalcon\Db\RawValue` as an empty container for `isAllowEmpty` option [#13549](https://github.com/phalcon/cphalcon/pull/13549), [#13573](https://github.com/phalcon/cphalcon/issues/13573), [#12519](https://github.com/phalcon/cphalcon/pull/12519)
- Fixed object binding and placeholder creation in `Phalcon\Db\Adapter::insert` and `Phalcon\Db\Adapter::update` [#13058](https://github.com/phalcon/cphalcon/issues/13058)
- Fixed `Phalcon\Config\Adapter\Ini` not building config objects properly for numerical keys [#12725](https://github.com/phalcon/cphalcon/issues/12725), [#13604](https://github.com/phalcon/cphalcon/issues/13604)
- Fixed incorrect scope of view variables [#12176](https://github.com/phalcon/cphalcon/issues/12176), [#12385](https://github.com/phalcon/cphalcon/issues/12385), [#12648](https://github.com/phalcon/cphalcon/issues/12648), [#12705](https://github.com/phalcon/cphalcon/issues/12705), [#13288](https://github.com/phalcon/cphalcon/pull/13288)
- Fixed `Phalcon\Config::_merge` not merging config with numeric properties properly [#13351](https://github.com/phalcon/cphalcon/issues/13351).

As always, a huge thank you to our community!! You guys rock!

### Update/Upgrade
Phalcon 3.4.2 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

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
<strong>NOTE</strong>: Windows DLLs are now available in our <a href="https://github.com/phalcon/cphalcon/releases/tag/v3.4.2">Github Release</a> page.
</h5>

We encourage existing Phalcon 3 users to update to this version and as always a big thank you to our contributors!


<3 Phalcon Team