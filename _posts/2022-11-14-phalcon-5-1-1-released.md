---
layout: post
title: Phalcon 5.1.1 Released
image: /assets/files/2022-11-13-phalcon-5.1.1-release.png
date: 2022-11-14T00:24:32.190Z
tags:
  - phalcon
  - phalcon5
  - release
---
Phalcon 5.1.1 is now available.

<!--more-->

This release contains bug fixes.

As always, a huge thank you to our community for identifying these issues and suggesting the new features.

## Changelog

### Fixed
- Fixed `Phalcon\Filter::sanitize` to return correct data when `noRecursive` is `true` [#16199](https://github.com/phalcon/cphalcon/issues/16199)
- Fixed `Phalcon\Html\Escaper::html` to not return `null` when a zero string is passed [#16202](https://github.com/phalcon/cphalcon/issues/16202)
