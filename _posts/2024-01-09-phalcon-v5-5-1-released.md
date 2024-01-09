---
layout: post
title: Phalcon v5.6.0 Released
image: /assets/files/2024-01-09-phalcon-5.6.0-release.png
date: 2024-01-09T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.5.1 has been released!

<!--more-->

This release fixes a few bugs.

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Changed
 
- Changed `Phalcon\Db\Adapter\Pdo\Mysql` to not use specific flags for `PDO` (`PDO::ATTR_EMULATE_PREPARES` or `PDO::ATTR_STRINGIFY_FETCHES`) for performance reasons [#16474](https://github.com/phalcon/cphalcon/issues/16474)
- Merged `Phalcon\Db\AbstractDb` with `Phalcon\Db\Adapter\AbstractAdapter` since the former was not used [#16474](https://github.com/phalcon/cphalcon/issues/16474)

### Added
 
- Added `resetColumns()`, `resetFrom()`, `resetWhere()`, `resetGroupBy()`, `resetHaving()`, `resetOrderBy()`, `resetLimit()`, `resetFlags()` to the `Phalcon\Datamapper\Query\AbstractQuery` to allow resetting query filters.

### Fixed

- Fixed `Phalcon\Mvc\Model::count` to ignore the `order` parameter (needed for Posgresql) [#16471](https://github.com/phalcon/cphalcon/issues/16471)
- Fixed `Phalcon\Mvc\Model::toArray` added parameter to ignore getters in order not to break serialize. [#16490](https://github.com/phalcon/cphalcon/issues/16490)
- Fixed `Phalcon\Mvc\Model::toArray` changing the conditionals for population to remove segfault. [#16498](https://github.com/phalcon/cphalcon/issues/16498)


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.6.0
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.5/installation)
