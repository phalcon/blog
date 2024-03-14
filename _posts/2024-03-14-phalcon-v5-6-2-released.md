---
layout: post
title: Phalcon v5.6.2 Released
image: /assets/files/2024-03-14-phalcon-5.6.2-release.png
date: 2024-03-14T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.6.2 has been released!

<!--more-->

This release fixes a few bugs.

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Changed
 
- Changed `Phalcon\Mvc\View\Engine\Volt\Compiler::filter` to use the helper with `upper` and `lower` for UTF-8 characters [#16543](https://github.com/phalcon/cphalcon/issues/16543)
- Changed `Phalcon\Di\AbstractInjectionAware` to extend `stdClass` for PHP 8.2 deprecation warnings [#16543](https://github.com/phalcon/cphalcon/issues/16543)

## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.6.2
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.6/installation)
