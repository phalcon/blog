---
layout: post
title: Phalcon v5.9.0 Released
image: /assets/files/2025-03-10-phalcon-5.9.0-release.png
date: 2025-03-10T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.9.0 has been released!

<!--more-->

This release contains a fair amount of changes and bug fixes

## PHP 8.4

Support for PHP 8.4 is finally here. After months of background work on Zephir, we are happy to announce that Phalcon can be compiled and run on PHP 8.4. 

Due to the nature of the changes, we had to increase the minimum version to PHP 8.1. Users that wish to install Phalcon on PHP 8.0 or earlier, will need to use earlier versions of Phalcon. Please note, that older medium versions are no longer supported for bug fixes.

## v6.0.0 update

We are finally seeing light at the end of the tunnel as they say. The only major item to fix for v6.0.0 is the PHQL parser. Work is already underway on this and we are hoping to complete this last task soon, so that we can release an alpha version.

You can always check our efforts in the [phalcon/phalcon](https://github.com/phalcon/phalcon) repository.

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!


## Changelog

### Changed

- Changed `Phalcon\Filter\Validation\Validator\Email` to allow UTF8 in local part. [#16637](https://github.com/phalcon/cphalcon/issues/16637)
- Changed `Phalcon\Cache\Cache::getMultiple()` to use `mget()` when the `Phalcon\Cache\Adapter\Redis` is used. [#16689](https://github.com/phalcon/cphalcon/issues/16689)
- Changed `Storage\Adapter\Redis` to accept `ssl` in the options for secure connections. [#16711](https://github.com/phalcon/cphalcon/issues/16711)

### Added
- Added `dispatch:beforeCallAction` and `dispatch:afterCallAction` to last-minute modifications to handler and method (mostly for debugging).

### Fixed

- Fixed `Phalcon\Forms\Form` and `Phalcon\Filter\Validation` to correctly handle the `validate()` response when using validation class `beforeValidate()` [#16702](https://github.com/phalcon/cphalcon/issues/16702)
- Fixed `Phalcon\Support\Debug` to use correct passed arguments in `set_error_handler` callback. PHP v7.2.0 deprecated `errcontext` and has been removed since php v8.0.0 [#16649](https://github.com/phalcon/cphalcon/issues/16686)
- Fixed `Phalcon\Http\Response\Cookies`, `Phalcon\Http\Response\CookiesInterface` and `Phalcon\Http\Cookie` to use correct cookie default arguments, avoid deprecated null assign warning when trying to assign the same cookie twice [#16649](https://github.com/phalcon/cphalcon/issues/16649)
- Fixed `Phalcon\Encryption\Crypt` to use `strlen` instead of `mb_strlen` for padding calculations [#16642](https://github.com/phalcon/cphalcon/issues/16642)
- Fixed `Phalcon\Filter\Validation\Validator\File\MimeType::validate` to close the handle when using `finfo` [#16647](https://github.com/phalcon/cphalcon/issues/16647)
- Fixed `Phalcon\Mvc\Model\Manager::getRelationRecords` to explicitly set the `referencedModel` in the conditions along with the `referencedFields` [#16655](https://github.com/phalcon/cphalcon/pull/16655)
- Fixed `Phalcon\Image\Adapters\AbstractAdapter::watermark` to correctly calculate the Y offset [#16658](https://github.com/phalcon/cphalcon/issues/16658)
- Fixed `Phalcon\Dispatcher\AbstractDispatcher` when calling action methods that do not define parameters to prevent `Unknown named parameter` error.
- Fixed `Phalcon\Di\Injectable` to reference the correct instance of `Phalcon\Di\Di` in the docblock property [#16634](https://github.com/phalcon/cphalcon/issues/16634)
- Fixed `Phalcon\Filter\Filter` to have the correct docblock for IDE completion
- Fixed `Phalcon\Mvc\Model\Query` to use the lifetime in the "cache" service if none has been supplied by the options [#16696](https://github.com/phalcon/cphalcon/issues/16696)
- Fixed `Phalcon\Session\Adapter\Stream::gc()` to throw an exception if something is wrong with `glob()` [#16713](https://github.com/phalcon/cphalcon/issues/16713)
- Fixed `Phalcon\Http\Request::getBasicAuth()` to return a `null` password if not defined on the server [#16668](https://github.com/phalcon/cphalcon/issues/16668)


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.9.0
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.9/installation)
