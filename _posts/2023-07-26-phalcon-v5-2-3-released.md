---
layout: post
title: Phalcon v5.2.3 Released
image: /assets/files/2023-07-26-phalcon-5.2.3-release.png
date: 2023-07-26T20:04:21.614Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.2.3 has been released!

<!--more-->

This release fixes a few bugs and also adds a bit more functionality to the framework. Thanks to [@rudiservo](https://github.com/rudiservo), the `Phalcon\Storage` and subsequently the `Phalcon\Cache` namespaces offer now a `Weak` adapter, which utilizes the `WeakReference` object.

WeakReference was implemented in PHP 7.4. The objects stored in the adapter have references as expected, but those references do not prevent the object to be destroyed by the Garbage Collector. [More Information](https://www.php.net/manual/en/class.weakreference.php)

Additionally a huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Fixed
- Tried to reproduce the behavior described in #16244 but had no success. [#16244](https://github.com/phalcon/cphalcon/issues/16244)
- Extended `Phalcon\Di\Injectable` from `stdClass` to remove the deprecation warning (dynamic properties) for PHP 8.2 [#16308](https://github.com/phalcon/cphalcon/issues/16308)
- Corrected the return type of `Phalcon\Mvc\View::getVar()` so that stubs can be accurate. [#16276](https://github.com/phalcon/cphalcon/issues/16276)
- Changed all the `encode`/`decode` methods for JSON to use the `Phalcon\Support\Helper\Json\*` classes. [#15608](https://github.com/phalcon/cphalcon/issues/15608)
- Changed the `Phalcon\Support\Helper\Json\*` classes to clear up `json_last_error()` before doing any conversions. [#15608](https://github.com/phalcon/cphalcon/issues/15608)
- Fixed `Phalcon\Http\Request::getJsonRawBody` to protect from empty body [#16373](https://github.com/phalcon/cphalcon/issues/16373)

### Added
- Added `getAdapter()` in `Phalcon\Mvc\Model\Metadata` to retrieve the internal cache adapter if necessary. [#16244](https://github.com/phalcon/cphalcon/issues/16244)
- Added `Phalcon\Storage\Adapter\Weak` implemented with WeakReference has a cache/retrieval solution for objects not yet collected by the Garbage Collection. [#16372](https://github.com/phalcon/cphalcon/issues/16372)


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.2.3
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.0/en/installation)
