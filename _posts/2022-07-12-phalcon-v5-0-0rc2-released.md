---
layout: post
title: Phalcon v5.0.0RC3 Released!
image: /assets/files/2022-07-12-phalcon-5.0.0-rc.3.png
date: 2022-07-12T11:03:00.190Z
tags:
  - phalcon5
  - release
  - rc
---
Phalcon v5.0.0RC3 has been released!!

<!--more-->

This release addresses a few bugs identified and a few new features. The bugs were mostly focused on the PHP 8+ version.

We are working now full time on the documentation so as to get the stable release out! So far the upgrade guide is done and we are reviewing every document to ensure consistency and accuracy.

In parallel, we are working on the devtools/incubator repositories as well as sample applications.

As always, a huge thank you to our community for testing, reporting bugs, enhancing the framework in any way possible!

The changelog for this release ([v5.0.0RC3](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0RC3)) is as follows:

## Fixed
- Fixed `Phalcon\Tag::textArea()` to check if the value is `null` before calling `htmlspecialchars` [#15992](https://github.com/phalcon/cphalcon/issues/15992)
- Fixed
  - `Phalcon/Filter/Validation/Validator/Alnum`
  - `Phalcon/Filter/Validation/Validator/Alpha`
  - `Phalcon/Filter/Validation/Validator/Confirmation`
  - `Phalcon/Filter/Validation/Validator/CreditCard`
  - `Phalcon/Filter/Validation/Validator/StringLength/Max`
  - `Phalcon/Filter/Validation/Validator/StringLength/Min` to check if the value is `null` before calling internal PHP methods [#15992](https://github.com/phalcon/cphalcon/issues/15992)
- Fixed `Phalcon\Html\Helper\Title` to properly use indent and delimiter [#15984](https://github.com/phalcon/cphalcon/issues/15984)
- Fixed `Phalcon\Mvc\View\Engine\Volt::isIncluded()` and `Phalcon\Mvc\View\Engine\Volt::length()` to check for null values before calls to php methods [#15984](https://github.com/phalcon/cphalcon/issues/15984)
- Fixed `Phalcon\Mvc\View\Engine\Volt\Compiler::expression()` to use double quotes instead of single ones [#15984](https://github.com/phalcon/cphalcon/issues/15984)
- Fixed `Phalcon\Support\Version::getPart()` to always return string values [#15984](https://github.com/phalcon/cphalcon/issues/15984)
- Fixed `Phalcon\Dispatcher\DispatcherInterface::setModuleName()` to accept `null` [#15997](https://github.com/phalcon/cphalcon/issues/15997)
- Fixed `Phalcon\Dispatcher\AbstractDispatcher::setModuleName()` to accept `null` [#15997](https://github.com/phalcon/cphalcon/issues/15997)
- Fixed `Phalcon\Dispatcher\AbstractDispatcher::getModuleName()` to also return `null` [#15997](https://github.com/phalcon/cphalcon/issues/15997)


## Added
- Added support for `webp` images for `Phalcon\Image\Adapter\Gd` [#15977](https://github.com/phalcon/cphalcon/issues/15977)
- Added `Phalcon\Mvc\Model\ManagerInterface::getBuilder()` to return the existing builder (created by `createBuilder()`) [#15966](https://github.com/phalcon/cphalcon/issues/15966)
- Added `Phalcon\Mvc\Model\Manager::getBuilder()` to return the existing builder (created by `createBuilder()`) [#15966](https://github.com/phalcon/cphalcon/issues/15966)

