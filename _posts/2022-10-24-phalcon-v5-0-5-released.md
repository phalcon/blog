---
layout: post
title: Phalcon v5.0.5 Released
image: /assets/files/2022-10-24-phalcon-5.0.5-release.png
date: 2022-10-24T19:32:19.873Z
tags:
  - phalcon
  - phalcon5
  - release
---
Phalcon v5.0.5 has been released!

<!--more-->

This release contains bug fixes

A big thank you to our community for identifying these issues and helping fixing them.

## Changelog
### Fixed
- Fixed `Phalcon\Config\Config::setData` to pass the `insensitive` flag to child objects [#16171](https://github.com/phalcon/cphalcon/issues/16171)
- Fixed `Phalcon\Config\Adapter\Groupped::__construct` to pass the `insensitive` flag to child objects [#16171](https://github.com/phalcon/cphalcon/issues/16171)
- Fixed `Phalcon\Session\Manager::setName`, removing the regex check for the name for custom adapters to work with `create_sid()` [#16170](https://github.com/phalcon/cphalcon/issues/16170)
- Fixed `PdoResult::fetchAll` when passed class name in 2nd argument [#16177](https://github.com/phalcon/cphalcon/issues/16177)
- Fixed `Forms\Form::label` to accept an array as a default variable [#16180](https://github.com/phalcon/cphalcon/issues/16180)
