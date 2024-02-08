---
layout: post
title: Phalcon v5.6.1 Released
image: /assets/files/2024-02-08-phalcon-5.6.1-release.png
date: 2024-02-08T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.6.1 has been released!

<!--more-->

This release fixes a few bugs and the oh so dreaded deprecation warning for "self" in callables!.

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Changed
 
- Changed `Phalcon\Cli\Router::setDefaultAction` and `Phalcon\Cli\Router::setDefaultModule` to return the object back for a fluent interface [#16328](https://github.com/phalcon/cphalcon/issues/16328)

### Fixed

- Fixed `Phalcon\Db\Adapter\Pdo\Postgresql::describeColumns()` to return the correct string back [#16371](https://github.com/phalcon/cphalcon/issues/16371)
- Fixed `Phalcon/Filter/Validation::validate()` and `Phalcon/Filter/Validation/ValidationInterface::validate()` to return also `bool` [#16337](https://github.com/phalcon/cphalcon/issues/16337)
- Fixed `Phalcon\Mvc\Model::toArray` to ignore getters when the field name is `source`. [#16514](https://github.com/phalcon/cphalcon/issues/16514)
- Fixed `Phalcon\Http\Request::getPut` to correctly get form encoded data [#16519](https://github.com/phalcon/cphalcon/issues/16519)
- Fixed deprecation warning in callables `Use of "static" in callables is deprecated` for PHP 8.2+ [#16263](https://github.com/phalcon/cphalcon/issues/16263)


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.6.1
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.6/installation)
