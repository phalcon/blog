---
layout: post
title: Phalcon v5.0.0RC2 Released!
image: /assets/files/2022-06-10-phalcon-5.0.0-rc.2.png
date: 2022-06-10T12:40:59.457Z
tags:
  - phalcon5
  - release
  - rc
---
Phalcon v5.0.0RC2 has been released!!

<!--more-->

This release addresses a few bugs identified.

As always, a huge thank you to our community for testing, reporting bugs, enhancing the framework in any way possible!

The changelog for this release ([v5.0.0RC2](https://github.com/phalcon/cphalcon/releases/tag/v5.0.0RC2)) is as follows:

### Changed
- Changed the `StringVal` filter to now use `htmlspecialchars()` [#15978](https://github.com/phalcon/cphalcon/issues/15978) 

### Fixed
- Fixed `Phalcon\Http\Response::getQualityHeader()` to check if the server variable is `null` before performing `preg_split` [#15984](https://github.com/phalcon/cphalcon/issues/15984) 

### Added
- Added `StringValLegacy` filter using `filter_var()` for PHP < 8.1 [#15978](https://github.com/phalcon/cphalcon/issues/15978) 