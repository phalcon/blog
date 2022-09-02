---
layout: post
title: Phalcon v4.0.6 released
image: /assets/files/2020-05-16-phalcon-4.0.6.png
date: 2020-05-16T18:24:26.868Z
tags:
  - phalcon
  - phalcon4
  - release
---
We are very happy to announce the release of Phalcon **v4.0.6**, a maintenance release. 

<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.6)

This release focused mostly on bug fixes reported by the community, as our testing suite and release tasks.

This will be the last version we release from the v4.0.x series. Our next version will be in the v4.1.x.

Finally, we worked a bit more on [v4.1](https://github.com/phalcon/cphalcon/blob/4.1.x/CHANGELOG-4.1.md), adding more components as per our roadmap. The work was mostly focused on the Data Mapper implementation coming in later versions of v4. The bulk of the work being done in v4.1 comes from the [NFR list](https://docs.phalcon.io/4.0/en/new-feature-request-list) that the community has voted on.

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

> **NOTE**: You can always check our roadmap and the status of our active sprint in our project page: <https://github.com/orgs/phalcon/projects/4>  
{: .alert .alert-info }

<iframe src='https://www.brighteon.com/embed/90c9b9fa-83f1-491c-8f95-c17a7313707a' width='560' height='315' frameborder='0' allowfullscreen></iframe>

## Changed
- Changed `Volt::convertEncoding` to no longer using `iconv` for a fallback since it causes issues with macOS [#14912](https://github.com/phalcon/cphalcon/issues/14912)
- Changed schema manipulation in `Phalcon\Db\Dialect\Mysql` - unquote numerical defaults [#14888](https://github.com/phalcon/cphalcon/pull/14888), [#14974](https://github.com/phalcon/cphalcon/pull/14974)
- Changed the default ACL access level from boolean `FALSE` to `Enum::DENY` [#14974](https://github.com/phalcon/cphalcon/pull/14974)
- Changed the way `Phalcon\Http\Response::__construct` checks `content` data type. Now a `TypeError` will be thrown if incompatible data type was passed [#14983](https://github.com/phalcon/cphalcon/issues/14983)
- Changed return type hints of the following `Phalcon\Flash\FlashInterface`'s methods: `error`, `message`, `notice`, `success` and `warning` [#14994](https://github.com/phalcon/cphalcon/issues/14994)
- Changed return type hint for `Phalcon\Mvc\ModelInterface::sum` [#15000](https://github.com/phalcon/cphalcon/issues/15000)
- Changed return type for `Phalcon\Mvc\Model\Criteria::getLimit` so that integer, NULL or array will be returned [#15004](https://github.com/phalcon/cphalcon/issues/15004)
- Changed return type hint for `Phalcon\Mvc\Model\Manager::getCustomEventsManager` to return NULL instead of boolean FALSE if there is no special events manager [#15008](https://github.com/phalcon/cphalcon/issues/15008)
- Changed `Phalcon\Mvc\Model\MetaData::getDI` so that now it will throw a `Phalcon\Mvc\Model\Exception` if there is no `DiInterface` instance  [#15011](https://github.com/phalcon/cphalcon/issues/15011)
- Changed `Phalcon\Http\Request::getJsonRawBody` to use `json_decode` instead of `Phalcon\Json::decode` [#14936](https://github.com/phalcon/cphalcon/issues/14936)
- Changed `Phalcon\Factory\AbstractFactory` to expose `getService` which will throw an exception if it does not exist. Removed `checkService` and adjusted all references in `newInstance()` calls. [#15038](https://github.com/phalcon/cphalcon/issues/15038)
- Changed the visibility of methods and properties in `Phalcon\Http\Message\Response`, `Phalcon\Http\Message\ServerRequest` and `Phalcon\Http\Message\Uri` to work with `clone`. [#15040](https://github.com/phalcon/cphalcon/issues/15040)

## Fixed
- Fixed `Phalcon\Mvc\Model\Query\Builder::getPhql` to add single quote between string value on a simple condition [#14874](https://github.com/phalcon/cphalcon/issues/14874)
- Fixed recognizing language operators inside Volt's echo mode (`{{ }}`) [#14476](https://github.com/phalcon/cphalcon/issues/14476)
- Fixed `Tag::friendlyTitle` to correctly convert titles under MacOS and Windows [#14866](https://github.com/phalcon/cphalcon/issues/14866)
- Fixed the Volt compiler to no longer parse `cache` fragments and thus searching for the `viewCache` service (deprecated for v4) [#14907](https://github.com/phalcon/cphalcon/issues/14907)
- Fixed `IN` operator precedence in Volt [#14816](https://github.com/phalcon/cphalcon/issues/14816)
- Fixed testing suite to work with PHPUnit 9 when we upgrade [#14837](https://github.com/phalcon/cphalcon/issues/14837)
- Fixed return type hints of the following `Phalcon\Acl\AbstractAdapter`'s methods: `getActiveAccess`, `getActiveRole` and `getActiveComponent` [#14974](https://github.com/phalcon/cphalcon/pull/14974)
- Fixed default value of the following `Phalcon\Annotations\Annotation`'s properties: `$arguments` and `$exprArguments` [#14977](https://github.com/phalcon/cphalcon/issues/14977)
- Fixed return type hints of the following `Phalcon\Annotations\Annotation`'s methods: `getArgument`, `getName` and `getNamedArgument` [#14977](https://github.com/phalcon/cphalcon/issues/14977)
- Fixed incorrect return type hint for `Phalcon\Http\Response\Cookies::setSignKey` [#14982](https://github.com/phalcon/cphalcon/issues/14982)
- Fixed return type hints for `Phalcon\Config\ConfigFactory::load` and `Phalcon\Config\ConfigFactory::newInstance` to explicitly indicate the return type as `Phalcon\Config` instance [#14978](https://github.com/phalcon/cphalcon/issues/14978)
- Fixed return type hints for the following methods [#14987](https://github.com/phalcon/cphalcon/issues/14987):
  - `Phalcon\Dispatcher\AbstractDispatcher::dispatch`
  - `Phalcon\Dispatcher\DispatcherInterface::dispatch`
  - `Phalcon\Filter::get`
  - `Phalcon\Http\Message\AbstractCommon::cloneInstance`
  - `Phalcon\Http\Message\AbstractCommon::processWith`
  - `Phalcon\Http\Message\AbstractMessage::withAddedHeader`
  - `Phalcon\Http\Message\AbstractMessage::withBody`
  - `Phalcon\Http\Message\AbstractMessage::withHeader`
  - `Phalcon\Http\Message\AbstractMessage::withProtocolVersion`
  - `Phalcon\Http\Message\AbstractMessage::withoutHeader`
  - `Phalcon\Http\Message\AbstractRequest::withMethod`
  - `Phalcon\Http\Message\AbstractRequest::withRequestTarget`
  - `Phalcon\Http\Message\AbstractRequest::withUri`
  - `Phalcon\Mvc\Model\Binder::findBoundModel`
  - `Phalcon\Validation::getEntity`
  - `Phalcon\Validation\ValidationInterface::getEntity`
- Fixed default value of `Phalcon\Crypt::$key` to satisfy the interface [#14989](https://github.com/phalcon/cphalcon/issues/14989)
- Fixed return type hint for `Phalcon\Di::getInternalEventsManager` [#14992](https://github.com/phalcon/cphalcon/issues/14992)
- Fixed return type hints of the following `Phalcon\Flash\AbstractFlash`'s methods: `error`, `notice`, `success` and `warning` [#14994](https://github.com/phalcon/cphalcon/issues/14994)
- Fixed return type hint for `Phalcon\Translate\InterpolatorFactory::newInstance` [#14996](https://github.com/phalcon/cphalcon/issues/14996)
- Fixed return type hint for `Phalcon\Mvc\Model::sum` [#15000](https://github.com/phalcon/cphalcon/issues/15000)
- Fixed return type hint for `Phalcon\Mvc\Model\CriteriaInterface::getLimit` and `Phalcon\Mvc\Model\Criteria::getLimit` to follow documentation and original purpose [#15004](https://github.com/phalcon/cphalcon/issues/15004)
- Fixed return type hint for `Phalcon\Mvc\Model::count` and `Phalcon\Mvc\ModelInterface::count` to reflect original behavior [#15006](https://github.com/phalcon/cphalcon/issues/15006)
- Fixed return type hint for `Phalcon\Mvc\Model::getEventsManager` to reflect original behavior [#15008](https://github.com/phalcon/cphalcon/issues/15008)
- Fixed return type hint for `Phalcon\Mvc\Model::average` and `Phalcon\Mvc\ModelInterface::average` to reflect original behavior [#15013](https://github.com/phalcon/cphalcon/issues/15013)
- Fixed return type hint for `Phalcon\Mvc\Model\MetaData::getColumnMap` and `Phalcon\Mvc\Model\MetaData::getReverseColumnMap` to reflect original behavior [#15015](https://github.com/phalcon/cphalcon/issues/15015)
- Fixed return type hint for `Phalcon\Mvc\Model\MetaDataInterface::getColumnMap` and `Phalcon\Mvc\Model\MetaDataInterface::getReverseColumnMap` to reflect original behavior [#15015](https://github.com/phalcon/cphalcon/issues/15015)
- Fixed return type hint for `Phalcon\Mvc\Model\CriteriaInterface::getColumns` and `Phalcon\Mvc\Model\Criteria::getColumns` to reflect original behavior [#15017](https://github.com/phalcon/cphalcon/issues/15017)
- Fixed return type hint for `Phalcon\Db\Column::getSize` and `Phalcon\Db\ColumnInterface::getSize` to reflect original behavior [#15019](https://github.com/phalcon/cphalcon/issues/15019)
- Fixed return type hint for `Phalcon\Db\Column::getAfterPosition` and `Phalcon\Db\ColumnInterface::getAfterPosition` to reflect original behavior [#15021](https://github.com/phalcon/cphalcon/issues/15021)
- Fixed return type hint for `Phalcon\Mvc\Model\Manager::executeQuery` and `Phalcon\Mvc\Model\Manager::ManagerInterface` to reflect original behavior [#15024](https://github.com/phalcon/cphalcon/issues/15024)
- Fixed return type hint for `Phalcon\Mvc\Model\Resultset::getFirst` and `Phalcon\Mvc\Model\ResultsetInterface::getFirst` to reflect original behavior [#15027](https://github.com/phalcon/cphalcon/issues/15027)
- Rollback the regression changes for `Phalcon\Mvc\Model\Query::_prepareSelect` to properly prepare a SQL `SELECT` statement from a PHQL one [#14657](https://github.com/phalcon/cphalcon/issues/14657)
- Fixed `SerializerInterface` usage for `Phalcon\Mvc\Model\Resultset\Complex::unserialize` as well as `Phalcon\Mvc\Model\Resultset\Complex::unserialize` [#14942](https://github.com/phalcon/cphalcon/issues/14942)

## Removed
- Removed `Phalcon\Translate\InterpolatorFactory::$mapper` as well as `Phalcon\Translate\InterpolatorFactory::$services` in favor of `Phalcon\Factory\AbstractFactory` ones [#15036](https://github.com/phalcon/cphalcon/issues/15036)

## Installation/Upgrade

The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.6. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.6).

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

