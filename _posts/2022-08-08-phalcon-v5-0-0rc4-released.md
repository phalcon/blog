---
layout: post
title: Phalcon v5.0.0RC4 Released!
image: /assets/files/2022-08-18-phalcon-5.0.0-rc.4.png
date: 2022-08-08T17:20:22.667Z
tags:
  - phalcon5
  - release
  - rc
---
Phalcon v5.0.0RC4 has been released!!

<!--more-->

This release addresses mostly bugs that have been identified since our last RC version.

This will be the last RC version we release, the next one will be the stable version.

Currently our focus is to clean up the issues (verify and if need be fix bugs) and documentation updates.

As always, a huge thank you to our community for testing, reporting bugs, enhancing the framework in any way possible!

The changelog for this release ([v5.0.0RC4](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0RC4)) is as follows:

## Fixed 
- Reverted to single quotes when volt code generates PHP code.
- Any `tag` helpers only accept parameters with double quotes
- Renamed `Phalcon\Tag::form()` to `Phalcon\Tag::formLegacy` (helper `form_legacy`) [#16019](https://github.com/phalcon/cphalcon/issues/16019)
- Fixed
  - `Phalcon\Cli\Router::getMatchedRoute()`
  - `Phalcon\Cli\RouterInterface::getMatchedRoute()`
  - `Phalcon\Mvc\Router::getMatchedRoute()`
  - `Phalcon\Mvc\RouterInterface::getMatchedRoute()` to return `RouterInterface` or `null` [#16030](https://github.com/phalcon/cphalcon/issues/16030)
- Fixed 
  - `Phalcon/Storage/Serializer/Base64::unserialize()`
  - `Phalcon/Storage/Serializer/Igbinary::unserialize()`
  - `Phalcon/Storage/Serializer/Igbinary::serialize()`
  - `Phalcon/Storage/Serializer/Php::unserialize()` to reset isSuccess value [#16040](https://github.com/phalcon/cphalcon/issues/16040)
- Fixed `Phalcon\Paginator\Adapter\Model::paginate()` fix group parameter breaking total items [#16042](https://github.com/phalcon/cphalcon/issues/16042)
- Fixed `Phalcon\Mvc\Model::doLowUpdate()` prevent RawValue getting overwritten [#16037](https://github.com/phalcon/cphalcon/issues/16037)
- Refactored `Phalcon\Image\*`
  - Reorganized code in the image adapters
  - Simplified various areas, speeding up processing
  - Removed `getInternalImImage()` (same as `getImage()`) for `Phalcon\Image\Adapter\Imagick`
  - Added better support for webm images [#15977](https://github.com/phalcon/cphalcon/issues/15977)

