---
layout: post
title: Phalcon v4.0.0-rc2 released
date: 2019-10-26T17:41:00.000Z
tags:
  - phalcon
  - phalcon4
  - release
  - rc
---
We are very happy to announce the release of **v4.0.0 Release Candidate (RC) 2**!. 

We cannot thank your community enough! We said this before but it is worth repeating: our community is what drives this project forward and makes it better with every release! 
<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-rc.2)

> We streamed this release live! [https://www.youtube.com/watch?v=sIuXxCry_fc](https://www.youtube.com/watch?v=sIuXxCry_fc)
{: .alert .alert-info }

This release has not added any more functionality. We have discovered quite a few issues regarding interfaces and some bugs that our awesome community discovered. All of those have been fixed! 

We are now on the final stretch as they say, ready to fix anything that is found between this release and the stable one and 14 documents to revise.

You can see the remaining cards for v4 in our [project](https://github.com/phalcon/cphalcon/projects/3) page. 

Regarding the documents, you can check our progress in this issue:

[https://github.com/phalcon/docs/issues/2322](https://github.com/phalcon/docs/issues/2322)

> In this version we are using Zephir 0.12.10 which enjoys better memory management and stricter type checks.
{: .alert .alert-info}

As far as our sample applications, [Vokuro](https://github.com/phalcon/vokuro) has been upgraded to v4 as well as [REST-API](https://github.com/phalcon/rest-api) and the [basic tutorial](https://github.com/phalcon/tutorial). We will upgrade the forum and invo after v4 is released.

## Changelog
### Added
- Added `cast` parameter to `Phalcon\Collection::get` and `Phalcon\Helper\Arr::get` allowing developers to cast the result returned to the type they want to. [#14465](https://github.com/phalcon/cphalcon/pull/14465)
- Added `Phalcon\Paginator\Repository::jsonSerialize()` implementing `JsonSerializable` [#14475](https://github.com/phalcon/cphalcon/pull/14475)
- Added `Phalcon\Logger::getLogLevel()` and `Phalcon\Logger::setLogLevel()` setting the minimum log level for the logger [#14480](https://github.com/phalcon/cphalcon/issues/14480)

## Changed
- Changed all calls to `new <object>` to use the `create_instance` or `create_instance_params` for better performance. [#14419](https://github.com/phalcon/cphalcon/pull/14419)
- Changed the exception text for `Phalcon\Mvc\Model::getChangedFields` and `Phalcon\Mvc\Model::getUpdatedFields` when there is no snapshot setup [#14468](https://github.com/phalcon/cphalcon/pull/14468)
- Changed `Phalcon\Mvc\Model::__callStatic()` to throw an exception if the called method is unknown. [#14467](https://github.com/phalcon/cphalcon/pull/14467)
- Changed `Phalcon\Mvc\Model` to accept `0`, `null` and `""` as valid parameter for `findByField()`, `findFirstByField()` and `countByField()`. [#14467](https://github.com/phalcon/cphalcon/pull/14467)

## Fixed
- Fixed `Phalcon\Mvc\View\Engine\Volt\Compiler::parse()` Corrected syntax recognize for "set" keyword. [#14288](https://github.com/phalcon/cphalcon/issues/14288)
- Fixed `Phalcon\Mvc\View\Engine\Volt\Compiler::parse()` Corrected syntax recognize for "is" keyword. [#11683](https://github.com/phalcon/cphalcon/issues/11683)
- Fixed `Phalcon\Cache\Adapter\AbstractAdapter` use `AdapterInterface` instead of non existing `AbstractAdapter` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Cache\CacheFactory` use `Psr\SimpleCache\CacheInterface` instead of non existing `Phalcon\Cache\CacheInterface` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Cache\CacheFactory` use `Psr\SimpleCache\CacheInterface` instead of non existing `Phalcon\Cache\CacheInterface` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Cli\Router` add missing `Phalcon\Cli\Router\RouteInterface` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Dispatcher\AbstractDispatcher::setModelBinder()` to return DispatcherInterface instead of non existing Dispatcher: [#14414](https://github.com/phalcon/cphalcon/pull/14414)
 - `Phalcon\Firewall\Adapter\Acl`
 - `Phalcon\Firewall\Adapter\Annotations`
- Fixed `Phalcon\Filter\FilterFactory::newInstance()` to return `FilterInterface` instead of non existing `LocatorInterface` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Forms\Element\Select::addOption()` and `Phalcon\Forms\Element\Select::setOption()` to return `ElementInterface` instead of non existing Element [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Forms\Manager::set()` to return `Manager` instead of non existing `FormManager` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed 
 - `Phalcon\Paginator\Adapter\AbstractAdapter::setCurrentPage()` 
 - `Phalcon\Paginator\Adapter\AbstractAdapter::setLimit()` 
 - `Phalcon\Paginator\Adapter\AbstractAdapter::setRepository()` to return `AdapterInterface` instead of non existing `Adapter` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Translate\TranslateFactory::set()` to return `AdapterInterface` instead of non existing `AbstractAdapter` [#14414](https://github.com/phalcon/cphalcon/pull/14414)
- Fixed `Phalcon\Filter` to properly work with closures [#14417](https://github.com/phalcon/cphalcon/issues/14417)
- Fixed `Phalcon\Form::setAction()` throwing error when called in `Form::initialize()` [#14421](https://github.com/phalcon/cphalcon/pull/14421)
- Fixed `Phalcon\Mvc\Model\Query\Lang::parsePHQL` return type hint from `string` to `array`
- Fixed `NOT BETWEEN` support in PHQL [#14253](https://github.com/phalcon/cphalcon/issues/14253)
- Fixed `Phalcon\Storage\Adapter\Stream` to correctly serialize and unserialize data [#14408](https://github.com/phalcon/cphalcon/issues/14408)
- Fixed `Phalcon\Storage\Serializer\Json` to throw an exception if storing an object [#14408](https://github.com/phalcon/cphalcon/issues/14408)
- Fixed `Phalcon\Http\Message\ServerRequestFactory::load` to correctly handle superglobals that have not been defined [#14426](https://github.com/phalcon/cphalcon/issues/14426)
- Fixed `Phalcon\Forms\Form` to initialize attributes object if not initialized [#14430](https://github.com/phalcon/cphalcon/issues/14430)
- Fixed `Phalcon\Http\Message\ServerRequestFactory::load` to correctly detect the protocol passed from `$_SERVER` [#14432](https://github.com/phalcon/cphalcon/issues/14432)
- Fixed `Phalcon\Cli\Router\Route` added missing `Phalcon\Cli\Router\RouteInterface`
- Fixed incorrect return types on `Phalcon\Mvc\View\Engine\AbstractEngine::partial` and `Phalcon\Mvc\View\Engine\EngineInterface::partial` [#14429](https://github.com/phalcon/cphalcon/issues/14429)
- Fixed `Phalcon\Firewall\Adapter\AbstractAdapter::getRoleCallback` and `Phalcon\Firewall\Adapter\AbstractAdapter::setRoleCallback` to correctly accept and return a `Closure` [#14450](https://github.com/phalcon/cphalcon/issues/14450)
- Fixed `Phalcon\Firewall\Adapter\AdapterInterface::getRoleCallback` and `Phalcon\Firewall\Adapter\AbstractAdapter::setRoleCallback` to correctly accept and return a `Closure` [#14450](https://github.com/phalcon/cphalcon/issues/14450)
- Fixed `Phalcon\Events\Event::__constructor` to correctly accept an `object` as the `source` parameter [#14449](https://github.com/phalcon/cphalcon/issues/14449)
- Fixed `Phalcon\Cache::checkKey()` added `.` to key characters pattern [#14457](https://github.com/phalcon/cphalcon/pull/14457)
- Fixed `Phalcon\Mvc\Model\Manager` to store reusable related records correctly. [#14444](https://github.com/phalcon/cphalcon/pull/14444)
- Fixed `Phalcon\Mvc\Model::__call()` not to throw an exception when the return value is `null` for related records. [#14444](https://github.com/phalcon/cphalcon/pull/14444)
- Fixed `Phalcon\Logger\Adapter\Syslog::__construct()` incorrect receipt of the `option` from the `options` parameter. [#14470](https://github.com/phalcon/cphalcon/pull/14470)
- Fixed `Phalcon\Events\Manager::fire` and `Phalcon\Events\ManagerInterface::fire` correctly aligning parameters and types. [#14477](https://github.com/phalcon/cphalcon/pull/14477)
- Fixed `Phalcon\Translate\*` aligning `parameters` as `array` with the interpolator calls. [#14477](https://github.com/phalcon/cphalcon/pull/14477)
- Fixed `Phalcon\Storage\AdapterFactory:newInstance` to return the correct interface [#14481](https://github.com/phalcon/cphalcon/issues/14481)
- Fixed `Phalcon\Mvc\Dispatcher:forward` to accept an array vs a mixed variable  [#14481](https://github.com/phalcon/cphalcon/issues/14481)
- Fixed `Phalcon\Mvc\Model::_doLowUpdate` and `Phalcon\Mvc\Model::_doLowInsert` throwing errors about column mapping when `phalcon.orm.ignore_unknown_columns` is set `On` [#14485](https://github.com/phalcon/cphalcon/issues/14485)

## Removed
- Removed `Phalcon\Application\AbstractApplication::handle()` as it does not serve any purpose and causing issues with type hinting. [#14407](https://github.com/phalcon/cphalcon/pull/14407)
- Removed `getEventsManager` and `setEventsManager` from `Phalcon\Di\Injectable` to the classes that utilise the methods or `eventsManager` property. [#14269](https://github.com/phalcon/cphalcon/issues/14269)

## Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-rc2. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-rc.2).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published.
{: .alert .alert-info }

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.io/discord) or our [Forum](https://phalcon.io/forum).

Finally, don't forget to star our project on [GitHub](https://phalcon.io/github) and follow us on our social media:

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

