---
layout: post
title: Phalcon v4.0.0-rc3 released
date: 2019-11-16T17:21:51.582Z
tags:
  - phalcon
  - phalcon4
  - release
  - rc
---
We are very happy to announce the release of **v4.0.0 Release Candidate (RC) 3**!. 

<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-rc.3)

> We streamed this release live! <https://youtu.be/iAGWIW9A4Mc>
> {: .alert .alert-info }

This release fixed quite a few bugs (thanks community!). We have also introduced support for [PSR-13](https://www.php-fig.org/psr/psr-13), ability to build Hypermedia Links

We are nearly there. 5 documents left to rewrite, a bit of work on DevTools and fixing a few bugs that were found in the previous iteration.

You can see the remaining cards for v4 in our [project](https://github.com/phalcon/cphalcon/projects/3) page. 

Regarding the documents, you can check our progress in this issue:

<https://github.com/phalcon/docs/issues/2322>

## Changelog

### Added

* Added support for [PSR-13](https://www.php-fig.org/psr/psr-13/) links and evolvable links [\#14507](https://github.com/phalcon/cphalcon/issues/14507)
  * Added `Phalcon\Html\Link\Link`
  * Added `Phalcon\Html\Link\LinkProvider`
  * Added `Phalcon\Html\Link\EvolvableLink`
  * Added `Phalcon\Html\Link\EvolvableLinkProvider`
  * Added `Phalcon\Html\Link\Serializer\Header`
  * Added `Phalcon\Html\Link\Serializer\SerializerInterface`
* Added `Phalcon\Collection:getKeys` and `Phalcon\Collection\getValues` for getting data from the collection [\#14507](https://github.com/phalcon/cphalcon/issues/14507)
* Added has-one-through relations to `Phalcon\Mvc\Model` and `Phalcon\Mvc\Model\Manager` [\#14511](https://github.com/phalcon/cphalcon/pull/14511)
* Added `Phalcon\Mvc\Model::hasOneThrough()`
* Added `Phalcon\Mvc\Model\Manager::addHasOneThrough()`
* Added `Phalcon\Mvc\Model\Manager::existsHasOneThrough()`
* Added `Phalcon\Mvc\Model\Manager::getHasOneThrough()`
* Added `Phalcon\Mvc\Model\ManagerInterface::addHasOneThrough()`
* Added `Phalcon\Mvc\Model\ManagerInterface::existsHasOneThrough()`
* Added `Phalcon\Mvc\Model\ManagerInterface::getHasOneThrough()`
* Added `Phalcon\Http\Request::numFiles` to return the number of files in the request [\#14519](https://github.com/phalcon/cphalcon/issues/14519)

### Changed

* Changed `Phalcon\Paginator\Adapter\Model`
  * Removed the `data` parameter
  * Added `model` parameter to pass model class
  * Added optional parameter `parameters` which is used as the parameter `Model::find()`

### Fixed

* Fixed `Phalcon\Annotations\AnnotationsFactory:newInstance` to return the correct object back [\#14494](https://github.com/phalcon/cphalcon/pull/14494)
* Fixed return types:
  * `Phalcon\Db\Adapter\PdoFactory::load()` now returns `Phalcon\Db\Adapter\AdapterInterface`
  * `Phalcon\Db\Adapter\PdoFactory::newInstance()` now returns `Phalcon\Db\Adapter\AdapterInterface`
  * `Phalcon\Logger\LoggerFactory::load()` now returns `Phalcon\Logger`
  * `Phalcon\Validation\ValidatorFactory::newInstance` now returns `Phalcon\Factory\ValidatorInterface`
* Fixed `Phalcon\Container:get` to use `getShared` transparently [\#14502](https://github.com/phalcon/cphalcon/pull/14502)
* Fixed `Phalcon\Mvc\Model` to include correct model instances in messages metadata [\#14510](https://github.com/phalcon/cphalcon/pull/14502)
* Fixed `Phalcon\Di\Injectable::__get()` to return shared instance by default [\#14491](https://github.com/phalcon/cphalcon/issues/14491)
* Fixed `Phalcon\Mvc\View::loadTemplateEngines()` to not share engine with other views by default [\#14491](https://github.com/phalcon/cphalcon/issues/14491)
* Fixed `Phalcon\Mvc\Model\Manager::getRelations()` and `getRelationsBetween()` to return many-to-many relations correctly [\#14509](https://github.com/phalcon/cphalcon/pull/14509)
* Fixed `Phalcon\Logger` to correctly allow transactional logging [\#14514](https://github.com/phalcon/cphalcon/issues/14514)
* Fixed `Phalcon\Annotations\Adapter\Stream::read` and `Phalcon\Annotations\Adapter\Stream::write` to use `serialize`/`unserialize` vs. `var_export` [\#14515](https://github.com/phalcon/cphalcon/issues/14515)
* Fixed `Phalcon\Http\Request::hasFiles` to return boolean and `true` if files are present [\#14519](https://github.com/phalcon/cphalcon/issues/14519)
* Fixed `Phalcon\Logger\Adapter\Syslog` to correctly log Syslog messages [\#14522](https://github.com/phalcon/cphalcon/issues/14522)
* Fixed `Phalcon\Mvc\Model\MetaDataInterface::getIdentityField` and `Phalcon\Mvc\Model\MetaData::getIdentityField` to also return `null` if the identity field is not present [\#14523](https://github.com/phalcon/cphalcon/issues/14523) 
* Fixed `Phalcon\Storage\Serializer\Json` to serialize objects that implement the `JsonSerializable` interface [\#14528](https://github.com/phalcon/cphalcon/issues/14528) 
* Fixed `Phalcon\Collection` to correctly return one level nested objects that implement `JsonSerializable` [\#14528](https://github.com/phalcon/cphalcon/issues/14528)
* Fixed `Phalcon\Mvc\View` to only include first found instance of view when using multiple view directories [\#12977](https://github.com/phalcon/cphalcon/issues/12977)

### Removed

* Removed `Phalcon\Logger\Formatter\Syslog` - really did not do much [\#14523](https://github.com/phalcon/cphalcon/issues/14523)

## Installation/Upgrade

The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-rc2. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-rc.2).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published.
> {: .alert .alert-info }

### Thank you

Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.io/discord) or our [Forum](https://phalcon.io/forum).

<hr>

Chat - Q&A

* [Discord Chat](https://phalcon.io/discord)
* [Forum](https://phalcon.link/forum)

Support

* [OpenCollective - Support Us](https://phalcon.io/fund)
* [Store - Merchandise](https://phalcon.io/store)

Social Media

* [Telegram](https://phalcon.io/telegram)
* [Gab](https://phalcon.io/gab)
* [MeWe](https://phalcon.io/mewe)
* [Parler](https://phalcon.io/parler)
* [Reddit](https://phalcon.io/reddit)
* [Facebook](https://phalcon.io/fb)
* [Twitter](https://phalcon.io/t)

Videos

* [BitChute](https://phalcon.io/bitchute)
* [Brighteon](https://brighteon.com/bitchute)
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

<3 Phalcon Team
