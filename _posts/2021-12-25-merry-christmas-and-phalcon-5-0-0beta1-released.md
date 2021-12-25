---
layout: post
title: Merry Christmas and Phalcon 5.0.0beta1 Released
image: /assets/files/2017-12-24-christmas.jpg
date: 2021-12-25T17:15:40.548Z
tags:
  - phalcon5
  - release
  - christmas
---
The Phalcon Team wishes all of our friends, contributors, developers and users of the framework a Merry Christmas!. We hope that the new year will bring health and happiness to you and your loved ones!

Very close to the "finish line" we are happy to announce the release of Phalcon **v5.0.0 Beta 1** as a small gift to our friends and community for this joyous day.
<!--more-->

> A huge thank you to all of our contributors and the community!!
{: .alert .alert-warning }

This release brings us ever closer to v5 stable, which should be coming in the next month. We really wanted to be in the position to release the stable version today, but unfortunately we run out of time. We had additional things we needed to address so it was better to release the beta today and release a stable version in the weeks to come.

The release tag can be found here: [v5.0.0beta1](https://github.com/phalcon/cphalcon/releases/tag/5.0.0beta1). 

There are a couple of issues that need to be addressed before the stable version. The project page that we keep the status of the work we have done and need to do can be found [here](https://github.com/phalcon/cphalcon/projects/3). 

This version has a lot of the classes refactored throughout the framework (a lot of moves so to speak), and some added functionality with helpers and factories. Added to that we have fixed a number of bugs that the community reported.

We still have some issues to address with PHP 8.1 support which will be available when we release the stable version. We had some external dependencies that have not been yet upgraded so as to handle PHP 8.1, therefore we had to adjust our code to address this. 

We also started work on the 5.0 documentation, concentrating for now on the upgrade guide, so as to provide a very detailed page on what needs to change when you upgrade to v5. The documentation will be completed before the stable release.

If we do have time, we will upgrade the sample applications (invo, vokuro etc.) before the release, alternatively right after that. Of course, if the community wants to contribute to this upgrade process we will not say no :)

> The PECL version as well as Packagist packages will be available later on today or tomorrow.
{: .alert .alert-notice }


#### Changelog

## Changed
- Marked as deprecated:
  - `Phalcon\Mvc\Model::existsBelongsTo()`
  - `Phalcon\Mvc\Model::existsHasMany()`
  - `Phalcon\Mvc\Model::existsHasOne()`
  - `Phalcon\Mvc\Model::existsHasOneThrough()`
  - `Phalcon\Mvc\Model::existsHasManyToMany()`
  - `Phalcon\Translate\Adapter\Csv::exists()`
  - `Phalcon\Translate\Adapter\Gettext::exists()`
  - `Phalcon\Translate\Adapter\NativeArray::exists()` [#15785](https://github.com/phalcon/cphalcon/issues/15785)
- Moved `Phalcon\Container` to `Phalcon\Container\Container` [#15796](https://github.com/phalcon/cphalcon/issues/15796)
- Changed the `Phalcon\Support\Collection::get()` to return the default value if the key does not exist or the value is `null` to mirror the behavior of v3. [#15370](https://github.com/phalcon/cphalcon/issues/15370)
- Moved `Phalcon\Registry` to `Phalcon\Support\Registry` [#15802](https://github.com/phalcon/cphalcon/issues/15802)
- Moved `Phalcon\Url` to `Phalcon\Mvc\Url` [#15798](https://github.com/phalcon/cphalcon/issues/15798)
- Moved `Phalcon\Loader` to `Phalcon\Autoload\Loader` [#15797](https://github.com/phalcon/cphalcon/issues/15797)
- Changes to `Phalcon\Autoload\Loader`:
  - Renamed `registerClasses()` to `setClasses()`
  - Renamed `registerDirectories()` to `setDirectories()`
  - Renamed `registertExtensions()` to `setExtensions()`
  - Renamed `registertFiles()` to `setFiles()`
  - Renamed `registertNamespaces()` to `setNamespaces()` [#15797](https://github.com/phalcon/cphalcon/issues/15797)
- Moved `Phalcon\Di` to `Phalcon\Di\Di` [#15799](https://github.com/phalcon/cphalcon/issues/15799)
- Removed references to `Phalcon\Tag` from the framework in favor of `Phalcon\Html\TagFactory` [#15801](https://github.com/phalcon/cphalcon/issues/15801)
- `Phalcon\Forms\Form` requires a `Phalcon\Html\TagFactory` to be set before it can render elements [#15801](https://github.com/phalcon/cphalcon/issues/15801)
- `Phalcon\Di\FactoryDefault` will now return a `Phalcon\Html\TagFactory` for the `tag` service [#15801](https://github.com/phalcon/cphalcon/issues/15801)

## Fixed
- `Phalcon\Logger\LoggerFactory::load()` to correctly use the key of the adapters array as the name of the adapter [#15831](https://github.com/phalcon/cphalcon/issues/15831)

## Added
- Added:
    - `Phalcon\Mvc\Model::hasBelongsTo()`
    - `Phalcon\Mvc\Model::hasHasMany()`
    - `Phalcon\Mvc\Model::hasHasOne()`
    - `Phalcon\Mvc\Model::hasHasOneThrough()`
    - `Phalcon\Mvc\Model::hasHasManyToMany()`
    - `Phalcon\Translate\Adapter\Csv::has()`
    - `Phalcon\Translate\Adapter\Gettext::has()`
    - `Phalcon\Translate\Adapter\NativeArray::has()` [#15785](https://github.com/phalcon/cphalcon/issues/15785)
- Added `filter`, `camelize`, `dynamic` and `uncamelize` in `Phalcon\Support\HelperFactory` [#15805](https://github.com/phalcon/cphalcon/issues/15805)
- Added `Phalcon\Autoload\Loader::getDebug()` to collect debugging information from the loader (enabled from the constructor) [#15797](https://github.com/phalcon/cphalcon/issues/15797)

## Fixed
- Fixed `Phalcon\Dispatcher\Dispatcher::setParams()` not updating local params during `dispatch()` loop [#15603](https://github.com/phalcon/cphalcon/issues/15603)
- Fixed related records auto-save with `belongsTo()` relation [#15148](https://github.com/phalcon/cphalcon/issues/15148)

## Removed
- Removed `Phalcon\Exception`; replaced by `\Exception` [#15800](https://github.com/phalcon/cphalcon/issues/15800)

## Thank you
Once again **a huge thank you to all of our contributors!** You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues] (https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord](https://phalcon.io/discord) server or our [Discussions](https://github.com/phalcon/cphalcon/discussions) page on GitHub.
