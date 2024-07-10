---
layout: post
title: Phalcon v5.8.0 Released
image: /assets/files/2024-07-10-phalcon-5.8.0-release.png
date: 2024-07-10T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.8.0 has been released!

<!--more-->

This release fixes memory leaks, several bugs and introduces events in Storage and Cache.

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Changed

- Changed `Phalcon\Mvc\Model`, `Phalcon\Support\Collection` and `Phalcon\Support\Registry` to correctly implement `\Serializable` interface. [#16591](https://github.com/phalcon/cphalcon/issues/16591)
- Changed the `Phalcon\Mvc\Router\Group::getHostname()` to return `null` also. [#16601](https://github.com/phalcon/cphalcon/issues/16601)
- Changed `Phalcon\Mvc\View\Engine\Volt\Compiler::compileSource` to also return `array` [#16608](https://github.com/phalcon/cphalcon/issues/16608)

### Added

- Added events and `Phalcon\Events\Manager` for `Phalcon\Storage\Adapter\Apcu`,
  `Phalcon\Storage\Adapter\Redis`,
  `Phalcon\Storage\Adapter\Memory`,
  `Phalcon\Storage\Adapter\Libmemcached`,
  `Phalcon\Storage\Adapter\Stream`,
  `Phalcon\Storage\Adapter\Weak`,
  `Phalcon\Cache\Adapter\Apcu`,
  `Phalcon\Cache\Adapter\Redis`,
  `Phalcon\Cache\Adapter\Memory`,
  `Phalcon\Cache\Adapter\Libmemcached`,
  `Phalcon\Cache\Adapter\Stream`,
  `Phalcon\Cache\Adapter\Weak`
  `Phalcon\Cache\AbstractCache`. [#16606](https://github.com/phalcon/cphalcon/issues/16606)
 
### Fixed

- Fixed `Phalcon\Support\Helper\PascalCase` causing memory leak by anonymous function [#16593](https://github.com/phalcon/cphalcon/issues/16593)
- Fixed `Phalcon\Mvc\Model\Query` to rollback failed transactions and re-throw exception for data consistency [#16604](https://github.com/phalcon/cphalcon/issues/16604)


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.8.0
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.8/installation)
