---
layout: post
title: Zephir 0.12.0 Released
date: 2019-06-20T15:51:06.316Z
tags:
  - zephir
  - phalcon
  - release
---
Cross posted from the [Zephir Blog](https://blog.zephir-lang.com/post/zephir-0-12-0-released)

We are happy to announce the release of Zephir 0.12.0! 
<!--more-->
This release fixes a good number of bugs and offers more optimizations as well as cleanup. The highlights are:
- Added initial support for `use` in closures
- Removed PHP 5.x code (not supported)
- Corrected `ArrayAccess` implementation
- Fixed segfaults

## Changelog
### Added
- Added initial support of "use" keyword in closures [#888](https://github.com/phalcon/zephir/issues/888), [#1848](https://github.com/phalcon/zephir/issues/1848)

### Removed
- PHP 5.x is no longer supported

### Changed
- The minimal Zephir Parser version is 1.3.0

### Fixed
- Fixed CLI runner for Windows [#1857](https://github.com/phalcon/zephir/pull/1857)
- Fixed segfault with fetching and opcache [#1855](https://github.com/phalcon/zephir/issues/1855)
- Extended classes can't access their private variables [#1851](https://github.com/phalcon/zephir/issues/1851)
- Incorrect usage of `zend_declare_class_constant_ex` [phalcon/cphalcon#14160](https://github.com/phalcon/cphalcon/issues/14160), [https://bugs.php.net/bug.php?id=78121](https://bugs.php.net/bug.php?id=78121)
- Incorrect implementation of ArrayAccess methods [#1871](https://github.com/phalcon/zephir/pull/1871)

Big thank you to all of our contributors
