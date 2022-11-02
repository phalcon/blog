---
layout: post
title: Phalcon 5.1.0 Released
image: /assets/files/2022-11-02-phalcon-5.1.0-release.png
date: 2022-11-02T13:31:42.407Z
tags:
  - phalcon
  - phalcon5
  - release
---
P﻿halcon 5.1.0 is now available.

<﻿!-- more -->
T﻿his release contains some bug fixes and new functionality for request PATCH methods.

A﻿s always, a huge thank you to our community for identifying these issues and suggesting the new features.

## Changelog

### Fixed
- Fixed `Phalcon\Mvc\View\Engine\Volt\Compiler::isTagFactory` to correctly detect a `TagFactory` object without throwing an error [#16097](https://github.com/phalcon/cphalcon/issues/16097)
- Fixed default values for `Phalcon\Cli`, `Phalcon\Dispatcher` and `Phalcon\Application` components to ensure not `null` values are passed to methods [#16186](https://github.com/phalcon/cphalcon/issues/16186)
- Fixed `Phalcon\Form::clear` to correctly clear the elements and not recurse [#15956](https://github.com/phalcon/cphalcon/issues/15956)

### Added
- Added `Phalcon\Http\Request::getPatch()` to get a value from a PATCH request [#16188](https://github.com/phalcon/cphalcon/issues/16188)
- Added `Phalcon\Http\Request::getFilteredPatch()` to get a value filtered from a PATCH request [#16188](https://github.com/phalcon/cphalcon/issues/16188)
- Added `Phalcon\Http\Request::hasPatch()` to check if a value exist in a PATCH request [#16188](https://github.com/phalcon/cphalcon/issues/16188)
