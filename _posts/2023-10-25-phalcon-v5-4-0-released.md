---
layout: post
title: Phalcon v5.4.0 Released
image: /assets/files/2023-10-25-phalcon-5.4.0-release.png
date: 2023-10-25T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.4.0 has been released!

<!--more-->

This release fixes a few bugs and introduces the ability to reset HTML `meta` tags on demand.

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Changed

- Changed `Phalcon\Mvc\Model::getMessages()` to also filter with an array of fields [#16265](https://github.com/phalcon/cphalcon/issues/16265)
- Changed `Phalcon\DataMapper\Query\Select::columns()` to accept an array of columns (keys as aliases) instead of `func_get_args` [#16451](https://github.com/phalcon/cphalcon/issues/16451)
- Changed `Phalcon\Html\Helper\AbstractSeries::__invoke()` to no longer clear the internal store when called [#16441](https://github.com/phalcon/cphalcon/issues/16441)

### Added

- Added the ability to define interpolator characters for the `Phalcon\Logger\Formatter\Line` [#16430](https://github.com/phalcon/cphalcon/issues/16430)
- Added `Phalcon\Html\Helper\AbstractSeries::reset()` to clear the internal store when needed [#16441](https://github.com/phalcon/cphalcon/issues/16441)

### Fixed

- Model Annotation strategy did not work with empty_string [#16426](https://github.com/phalcon/cphalcon/issues/16426)
- View::reset() sets content to null instead of default empty string [#16437](https://github.com/phalcon/cphalcon/issues/16437)
- Fixed `Phalcon\Filter\Validation\Validator\Size\*` validators to correctly detect the size of uploaded files [#16390](https://github.com/phalcon/cphalcon/issues/16390)

## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.4.0
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.0/en/installation)
