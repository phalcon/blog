---
layout: post
title: Merry Christmas and Phalcon 5.10.0 Released
image: /assets/files/2017-12-24-christmas.jpg
date: 2025-12-25T00:00:00.799Z
tags:
  - phalcon5
  - release
  - christmas
---
The Phalcon Team wishes all of our friends, contributors, developers and users of the framework a Merry Christmas!. 
We hope that the new year will bring health and happiness to you and your loved ones!

<!--more-->

A Christmas present for the community, Phalcon 5.10.0 has been released. This release contains a few bug fixes.

> A huge thank you to all of our contributors and the community!!
{: .alert .alert-warning }

The release tag can be found here: [v5.10.0](https://github.com/phalcon/cphalcon/releases/tag/v5.10.0). 

## Changelog

### Changed

- Changed `bind()` and `validate()` method in `Phalcon\Filter\Validation` and `Phalcon\Filter\Validation\ValidationInterface` to accept `$whitelist` array of only allowed fields to be mutated when using entity [#16800](https://github.com/phalcon/cphalcon/issues/16800)
- Changed `Phalcon\Storage\Adapters\Libmemcached::getAdapter()` to use 50ms for `\Memcached::OPT_CONNECT_TIMEOUT` [#16818](https://github.com/phalcon/cphalcon/issues/16818)
- Changed `Phalcon\Html\Helper\Input\*` to honor `Docbloc` directives [#16778](https://github.com/phalcon/cphalcon/issues/16778)

### Added

- Added `fails()` method helper to `Phalcon\Filter\Validation` useful for standalone validation [#16798](https://github.com/phalcon/cphalcon/issues/16798)

### Fixed

- Fixed `Phalcon\Config\Adapter\Yaml` constructor to handle `null` return values from `yaml_parse_file()`, ensuring empty configuration files are treated as empty arrays instead of throwing errors.
- Fixed `Phalcon\Http\Request` method `getClientAddress(true)` to return correct IP address from trusted forwarded proxy. [#16777](https://github.com/phalcon/cphalcon/issues/16777)
- Fixed `Phalcon\Http\Request` method `getPost()` to correctly return json data as well and unified both `getPut()` and `getPatch()` to go through the same parsing method. [#16792](https://github.com/phalcon/cphalcon/issues/16792)
- Fixed `Phalcon\Filter\Validation` method `bind()` and `validate()` to correctly bind data when using entity as well as skip binding of fields not included in `$whitelist` [#16800](https://github.com/phalcon/cphalcon/issues/16800)
- Fixed `Phalcon\Http\Request` method `getPostData()` when `Content-Type` header is not set [#16804](https://github.com/phalcon/cphalcon/issues/16804)
- Fixed `Phalcon\Events\ManagerInterface` adding priority property [#16817](https://github.com/phalcon/cphalcon/issues/16817)
- Fixed `Phalcon\Storage\Adapters\Libmemcached::getAdapter()` to correctly merge adapter options [#16818](https://github.com/phalcon/cphalcon/issues/16818)
- Fixed `Phalcon\Encryption\Crypt` method `checkCipherHashIsAvailable(string $cipher, string $type)` to correctly check the `cipher` or `hash` type [#16822](https://github.com/phalcon/cphalcon/issues/16822)
- Fixed `Phalcon\Mvc\Model` docblocks [#16825](https://github.com/phalcon/cphalcon/issues/16825)


## Thank you
Once again **a huge thank you to our community**!
