---
layout: post
title: Phalcon v4.0.0-rc1 released
date: 2019-09-22T17:58:09.887Z
tags:
  - phalcon
  - phalcon4
  - release
  - rc
---
We are very happy to announce the release of **v4.0.0 Release Candidate (RC) 1**! [Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-rc.1). 

We cannot thank your community enough! We said this before but it is worth repeating: our community is what drives this project forward and makes it better with every release! 
<!--more-->

As we are getting closer to the stable version of v4, this release has addressed a good number of outstanding issues, but also bugs found during testing. We only have one actual issue to resolve for v4 and 33 documents to revise.

You can see the remaining cards for v4 in our [project](https://github.com/phalcon/cphalcon/projects/3) page. 

Regarding the documents, you can check our progress in this issue:

[https://github.com/phalcon/docs/issues/2322](https://github.com/phalcon/docs/issues/2322)

## Changelog
### Added
- Added optional boolean parameter to `Phalcon\Http\Request::getURI()` (as well as its interface) which indicates whether or not the method should return only the path without the query string

### Changed
- Changed `Phalcon\Url::get` to use implementation behind `Phalcon\Helper\Str::reduceSlashes` to reduce slashes [#14331](https://github.com/phalcon/cphalcon/issues/14331)
- Changed `Phalcon\Http\Headers\set()` to return self for a more fluent interface
- Changed `Phalcon\Assets\Manager`, `Phalcon\Cli\Router`, `Phalcon\Dispatcher\AbstractDispatcher`, `Phalcon\Html\Tag`,  `Phalcon\Http\Cookie`, `Phalcon\Http\Request`, `Phalcon\Http\Response\Cookies`, `Phalcon\Mvc\Model`, `Phalcon\Mvc\Router`, `Phalcon\Security`, `Phalcon\Session\Manager` to use `Phalcon\Di\AbstractDiAware` for container functionality [#14351](https://github.com/phalcon/cphalcon/pull/14351)
- Changed `Phalcon\Security` to allow `session` and `request` in the constructor [#14351](https://github.com/phalcon/cphalcon/pull/14351)
- Changed `Phalcon\Session\Manager` to allow `router` in the constructor [#14351](https://github.com/phalcon/cphalcon/pull/14351)
- Changed `Phalcon\Flash\Direct` to allow `escaper` in the constructor [#14349](https://github.com/phalcon/cphalcon/issues/14349)
- Changed `Phalcon\Flash\Session` to allow `escaper` in the constructor [#14349](https://github.com/phalcon/cphalcon/issues/14349)
- Changed `Phalcon\Di\AbstractDIAware` to `Phalcon\Di\AbstractInjectionAware` [#14359](https://github.com/phalcon/cphalcon/issues/14359)
- Changed `Phalcon\Di\Service` to use DI to initialize `string` based services when possible [#14342](https://github.com/phalcon/cphalcon/pull/14342)
- Changed `Phalcon\Mvc\Router\Annotations` to be able to handle patterns az prefixes [#14259](https://github.com/phalcon/cphalcon/pull/14259)
- Changed `Phalcon\Mvc\Router\Group::routes` to an array as default [#14259](https://github.com/phalcon/cphalcon/pull/14259)
- Changed `Phalcon\Mvc\Model::assign` changed order of parameters to $data, $whiteList, $dataColumnMap [#14386](https://github.com/phalcon/cphalcon/pull/14386)
- Changed `Phalcon\Helper\Arr::arrayToObject` to `toObject` [#14389](https://github.com/phalcon/cphalcon/pull/14389)
- Changed `Phalcon\Events\EventsAwareInterface::getEventsManager` and `Phalcon\Di\Injectable::getEventsManager` to return also `null` [#14404](https://github.com/phalcon/cphalcon/pull/14404)
- Changed `Phalcon\Logger\Adapter\AbstractAdapter::add` to now return `this` [#14404](https://github.com/phalcon/cphalcon/pull/14404)
- Changed `Phalcon\Mvc\RouterInterface` methods signature to return `RouteInterface` instead of `void`:
  - `Phalcon\Mvc\RouterInterface::setDefaultAction`
  - `Phalcon\Mvc\RouterInterface::setDefaultAction`
  - `Phalcon\Mvc\RouterInterface::setDefaultController`
  - `Phalcon\Mvc\RouterInterface::setDefaultModule`
  - `Phalcon\Mvc\RouterInterface::setDefaults`
- Changed return types for following interfaces:
  - `Phalcon\Mvc\Router\RouteInterface::setName` from `void` to `RouteInterface`
  - `Phalcon\Mvc\Router\RouteInterface::via` from `void` to `RouteInterface`
  - `Phalcon\Session\ManagerInterface::__get` from `void` to `var`

### Fixed
- Fixed `Phalcon\Helper\Str::includes` to return correct result [#14301](https://github.com/phalcon/cphalcon/issues/14301)
- Fixed `Phalcon\Logger` moved to correct namespace [#14263](https://github.com/phalcon/cphalcon/issues/14263)
- Fixed `Phalcon\Session\Adapter\AbstractAdapter::read()` to return ""(empty string) when `Session/Adapter/*::get()` returns null [#14314](https://github.com/phalcon/cphalcon/issues/14314)
- Fixed `Phalcon\Cache\Exception` to extend Phalcon\Exception
- Fixed `Phalcon\Cache\InvalidArgumentException` to extend Phalcon\Exception
- Fixed `Phalcon\Collection\Exception` to extend Phalcon\Exception
- Fixed `Phalcon\Storage\Adapter\AbstractAdapter::initSerializer` to throw exception if `null === $this->serializerFactory && null === $this->serializer` [#14324](https://github.com/phalcon/cphalcon/issues/14324)
- Fixed `Phalcon\Storage\Adapter\Redis::getAdapter()` to provide a persistent id for redis persistent connection [#14334](https://github.com/phalcon/cphalcon/issues/14334)
- Fixed `Phalcon\Session\Adapter\Stream` to not override configured save path [#14265](https://github.com/phalcon/cphalcon/issues/14265)
- Fixed `Phalcon\Http\Response::setFileToSend` to properly handle non-ASCII filenames [#13919](https://github.com/phalcon/cphalcon/issues/13919)
- Fixed `Phalcon\Security::getSessionToken` return value [#14346](https://github.com/phalcon/cphalcon/issues/14346)
- Fixed `Phalcon\Flash\*` interfaces for `message()` to return `string/null` [#14349](https://github.com/phalcon/cphalcon/issues/14349)
- Fixed `Phalcon\Paginator\Adapter\AbstractAdapter` throw exception if `limit <= 0` [#14303](https://github.com/phalcon/cphalcon/issues/14303)
- Fixed `Phalcon\Mvc\Model\Query\Builder` Empty table alias in query [#14366](https://github.com/phalcon/cphalcon/issues/14366)
- Fixed `Phalcon\Db\Adapter\PdoFactory` to reference the correct interface [#14381](https://github.com/phalcon/cphalcon/pull/14381)
- Fixed `Phalcon\Db\Dialect\Mysql` Fixed missing schema in constraint for create table [#14378](https://github.com/phalcon/cphalcon/issues/14378)
- Fixed `Phalcon\Mvc\Model::hasChanged()` and `getChangedFields()` returning false values when `castOnHydrate` option is on. [#14376](https://github.com/phalcon/cphalcon/issues/14376)
- Fixed `Phalcon\Mvc\Model::create()` Using write connection to prevent replica lag [#14256](https://github.com/phalcon/cphalcon/issues/14256)
- Fixed return types for following methods to satisfy interface declaration:
  - `Phalcon\Acl\Adapter\AbstractAdapter::setDefaultAction`
  - `Phalcon\Application\AbstractApplication::setEventsManager`
  - `Phalcon\Firewall\Adapter\AbstractAdapter::setAlwaysResolvingRole`
  - `Phalcon\Firewall\Adapter\AbstractAdapter::setEventsManager`
  - `Phalcon\Mvc\Router::handle`
  - `Phalcon\Storage\Serializer\AbstractSerializer::getData`
  - `Phalcon\Storage\Serializer\AbstractSerializer::setData`
  - `Phalcon\Mvc\Dispatcher::forward`
  - `Phalcon\Mvc\Model::setConnectionService`
  - `Phalcon\Mvc\Model::setReadConnectionService`
  - `Phalcon\Mvc\Model::setWriteConnectionService`
  - `Phalcon\Mvc\Model\Query\Builder::setDI`
  - `Phalcon\Mvc\Router\Annotations::handle`
  - `Phalcon\Session\Bag::set`
  - `Phalcon\Session\Manager::remove`
- Fixed `Phalcon\Di::remove()` to remove service. [#14396](https://github.com/phalcon/cphalcon/issues/14396)

### Removed
- Removed `Phalcon\Plugin` - duplicate of `Phalcon\DI\Injectable` [#14359](https://github.com/phalcon/cphalcon/issues/14359)
- Removed `Phalcon\Mvc\Collection` and all related references. 4.0 will not support mongo as it is being re-implemented to take advantage of the latest Mongo driver (see [#13697](https://github.com/phalcon/cphalcon/issues/13697)) [#14361](https://github.com/phalcon/cphalcon/pull/14361)
- Removed `Phalcon\Session\Manager::registerHandler` - duplicate functionality [#14381](https://github.com/phalcon/cphalcon/pull/14381)
- Removed `Phalcon\Html\Tag` - duplicate functionality [#14381](https://github.com/phalcon/cphalcon/pull/14381)
- Removed `void` return type for all constructors [#14401](https://github.com/phalcon/cphalcon/pull/14401)

## Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-rc1. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-rc.1).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published.
{: .alert .alert-info }

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.link/discord) or our [Forum](https://phalcon.link/forum).

Finally, don't forget to star our project on [GitHub](https://phalcon.link/github) and follow us on our social media:

Chat - Q&A
* [Discord Chat](https://phalcon.link/discord)
* [Forum](https://phalcon.link/forum)

Support
* [OpenCollective - Support Us](https://phalcon.link/fund)
* [Store - Merchandise](https://phalcon.link/store)

Social Media
* [Telegram](https://phalcon.link/telegram)
* [Gab](https://phalcon.link/gab)
* [MeWe](https://phalcon.link/mewe)
* [Parler](https://phalcon.link/parler)
* [Facebook](https://phalcon.link/fb)
* [Twitter](https://phalcon.link/t)

Videos
* [BitChute](https://phalcon.link/bitchute)
* [YouTube](https://phalcon.link/youtube)



<3 Phalcon Team
