---
layout: post
title: Merry Christmas and Phalcon 5.5.0 Released
image: /assets/files/2017-12-24-christmas.jpg
date: 2023-12-25T00:00:00.799Z
tags:
  - phalcon5
  - release
  - christmas
---
The Phalcon Team wishes all of our friends, contributors, developers and users of the framework a Merry Christmas!. 
We hope that the new year will bring health and happiness to you and your loved ones!

<!--more-->

A Christmas present for the community, Phalcon 5.5.0 has been released. This release contains a few bug fixes.

> A huge thank you to all of our contributors and the community!!
{: .alert .alert-warning }

The release tag can be found here: [v5.5.0](https://github.com/phalcon/cphalcon/releases/tag/v5.5.0). 

## Changelog

### Changed

- Shifted minimal support from PHP 7.4 to PHP 8.0 [#16477](https://github.com/phalcon/cphalcon/issues/16477)
- Changed `Phalcon\Mvc\Model::toArray` to use getters if present [#16320](https://github.com/phalcon/cphalcon/issues/16320)
- Adjusted return types identical to original interface `int|false` in `Phalcon\Session\Adapter\*::gc()` [#16477](https://github.com/phalcon/cphalcon/issues/16477)
- Changed return type of `Phalcon\Config\Adapter\Ini::cast()` to `mixed` [#16477](https://github.com/phalcon/cphalcon/issues/16477)

### Added

- Added support for PHP 8.3 [#16477](https://github.com/phalcon/cphalcon/issues/16477)

### Fixed

- Fixed `Phalcon\Filter\Validation\Validator\Numericality` to return false when input has spaces [#16461](https://github.com/phalcon/cphalcon/issues/16461)
- Fixed `Phalcon\Mvc\Model\ResultsetSimple::toArray` to ignore numeric indexes in case results come as not `fetch_assoc` [#16467](https://github.com/phalcon/cphalcon/issues/16467)


## Thank you
Once again **a huge thank you to our community**!
