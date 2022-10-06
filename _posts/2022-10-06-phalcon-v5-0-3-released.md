---
layout: post
title: Phalcon v5.0.3 Released
image: /assets/files/2022-10-06-phalcon-5.0.3-release.png
date: 2022-10-06T22:43:45.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.0.3 has been released!

<!--more-->

This release contains a few bug fixes.

Thank you to our wonderful community for the help in identifying these issues.

## Changelog
### Changed
- Fixed `Phalcon\Filter\Sanitize\StringVal` to accept flags for `htmlspecialchars()` [#16135](https://github.com/phalcon/cphalcon/issues/16135)

### Fixed
- Fixed `Phalcon\Html\Escaper::attributes()` to honor the `$flags` set for `htmlspecialchars()` [#16134](https://github.com/phalcon/cphalcon/issues/16134)
