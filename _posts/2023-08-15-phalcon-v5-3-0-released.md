---
layout: post
title: Phalcon v5.3.0 Released
image: /assets/files/2023-08-15-phalcon-5.3.0-release.png
date: 2023-08-15T18:03:15.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.3.0 has been released!

<!--more-->

This release fixes form-data handling for PUT requests, changes the dynamic update by default in the ORM, and fixes a memory leak in the Micro application, especially when one is using Swoole. 

> The biggest change comes in the `Phalcon\Mvc\Micro`, where the class is no longer automatically registered in the `Phalcon\Di\Di` container with the name `application`. This registration was responsible for numerous memory leaks, when using Swoole with Micro.
{: .alert .alert-warning }

Along with those, some optimizations have been introduced as well as new methods in the Model, Metdata and Loader. 

Once again, a huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Added

- Added `Phalcon\Mvc\Model::appendMessagedFrom` for code consistency and to add messages from another model [#16391](https://github.com/phalcon/cphalcon/issues/16391)
- Added `Phalcon\Autoload\Loader::isRegistered` for debugging purposes [#16391](https://github.com/phalcon/cphalcon/issues/16391)
- Added `Phalcon\Mvc\Model\Metadata::initializeMetadata` [#16393](https://github.com/phalcon/cphalcon/issues/16393)
- Added `Phalcon\Mvc\Model\Metadata::getMetaDataUniqueKey` [#16393](https://github.com/phalcon/cphalcon/issues/16393)
- Added `Phalcon\Mvc\Model\Metadata::getColumnMapUniqueKey` [#16393](https://github.com/phalcon/cphalcon/issues/16393)
- Added `Phalcon\Encryption\Security\JWT\Builder::addHeader()` to allow adding custom headers [#16396](https://github.com/phalcon/cphalcon/issues/16396)

### Changed

- Refactored `Phalcon\Mvc\Model::doLowUpdate` and `Phalcon\Mvc\Model::postSaveRelatedRecords` for better code logic and a clearer separation of behaviour, although it lead to partially repeated code. [#16391](https://github.com/phalcon/cphalcon/issues/16391)
- Cleaned `Phalcon\Mvc\Model\Metadata::initialize` [#16393](https://github.com/phalcon/cphalcon/issues/16393)

### Fixed

- Parse multipart/form-data from PUT request [#16271](https://github.com/phalcon/cphalcon/issues/16271)
- Set Dynamic Update by default system-wide [#16343](https://github.com/phalcon/cphalcon/issues/16343)
- Fixed memory leak in Micro application [#16404](https://github.com/phalcon/cphalcon/pull/16404)

## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.3.0
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.0/en/installation)
