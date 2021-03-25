---
layout: post
title: Zephir 0.13.0 Released
image: /assets/files/2021-03-25-zephir-release.png
date: 2021-03-25T15:20:11.764Z
tags:
  - phalcon5
  - zephir
  - release
---
We are happy to announce the immediate release of Zephir 0.13.0.
<!--more-->

Along with several enhancements, interface checks and bug fixes, Zephir 0.13.0 offers support for PHP 7.4 and PHP 8.0, which is a big milestone!

This release aligns with our goals for Phalcon and the upcoming v5 release which will support only PHP 7.4 and PHP 8.0

### Changelog
### Added
- Added support of PHP `8.0` [#2111](https://github.com/zephir-lang/zephir/pull/2111), [#2165](https://github.com/zephir-lang/zephir/pull/2165)

### Changed
- Dropped support of PHP `<= 7.4` versions [#2111](https://github.com/zephir-lang/zephir/pull/2111)
- Removed call of `generate` command inside `compile` call [#2150](https://github.com/zephir-lang/zephir/pull/2150)
- Removed call of `compile` command inside `install` call [#2150](https://github.com/zephir-lang/zephir/pull/2150)

### Fixed
- Fixed parameters type detection in methods/functions (PHP `>= 8.0` only)
- Fixed not adding all build directories [#2144](https://github.com/zephir-lang/zephir/pull/2144)

Also in versions 0.12.21 and 0.12.20, the following issues were resolved:

### Fixed
- Fixed path separators in generated `config.m4` file on Windows [#2153](https://github.com/zephir-lang/zephir/issues/2153)
- Fixed missing kernel directory at build time [ice/framework#271](https://github.com/ice/framework/issues/271)
- Fixed stubs generation for case with array declaration with square brackets in params
- Fixed parameters positioning for `implode()` php function [#2120](https://github.com/zephir-lang/zephir/issues/2120)

### Added
- Added supports void type return value for stubs
  [phalcon/ide-stubs#50](https://github.com/phalcon/ide-stubs/pull/50)
  [#1977](https://github.com/zephir-lang/zephir/issues/1977)

A huge thank you to the community and contributors!

_Cross posted from the [Zephir Blog](https://blog.zephir-lang.com/post/zephir-0-13-0)_