---
layout: post
title: Phalcon 5.0.0beta3 Released
image: /assets/files/2022-02-08-phalcon-5.0.0-beta.3.png
date: 2022-02-08T14:50:35.077Z
tags:
  - phalcon
  - phalcon5
  - beta
  - release
---
Phalcon v5.0.0beta3 has been released, featuring mostly bug fixes!
<!--more-->

This release fixes several bugs that the community has identified.

> A huge thank you to all of our contributors and the community!!
{: .alert .alert-warning }

The release tag can be found here: [v5.0.0beta3](https://github.com/phalcon/cphalcon/releases/tag/5.0.0beta3). 

This should be our last beta version. We have one feature request to address (from the list of tasks we have) and PHP 8.1 support. Both are underway. The project page that we keep the status of the work we have done and need to do can be found [here](https://github.com/phalcon/cphalcon/projects/3). 

Finally, we are also working on the upgrade guide and documentation, and the community has been helping with upgrading incubator packages to v5

#### Changelog

## Changed
- Renamed `Phalcon\Db\Result\Pdo` to `Phalcon\Db\Result\PdoResult` to avoid collisions with `\PDO` [#15874](https://github.com/phalcon/cphalcon/issues/15854)

## Fixed
- Fixed `Phalcon\Logger\AbstractAdapter::getFormattedItem()` to not add `PHP_EOL` at the end of the message and added it to the `Phalcon\Logger\Adapter\Stream` [#14547](https://github.com/phalcon/cphalcon/issues/14547)
- Fixed `Phalcon\Html\Helper\Title:__invoke()` to not use the `$separator` as parameter - no need to redefine it in a view [#15866](https://github.com/phalcon/cphalcon/issues/15866)
- Fixed the delimiters for `Phalcon\Support\Helper\SnakeCase` and `Phalcon\Support\Helper\KamelCase` [#15850](https://github.com/phalcon/cphalcon/issues/15850)
- Fixed `Phalcon\Mvc\Router\Route::getName()` and `Phalcon\Mvc\Router\Route::getHostname()` to also return `null` [#15880](https://github.com/phalcon/cphalcon/issues/15880)
- Fixed `Phalcon\Mvc\Router\RouteInterface::getName()` and `Phalcon\Mvc\Router\RouteInterface::getHostname()` to also return `null` [#15880](https://github.com/phalcon/cphalcon/issues/15880)
- Fixed `Phalcon\Mvc\Model::findFirst()` to return `mixed` or `null` [#15883](https://github.com/phalcon/cphalcon/issues/15883)

## Added
- Added `Phalcon\Html\Helper\Title:setSeparator` to allow setting the separator independently [#15866](https://github.com/phalcon/cphalcon/issues/15866)
