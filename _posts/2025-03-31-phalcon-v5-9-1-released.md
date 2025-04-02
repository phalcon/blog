---
layout: post
title: Phalcon v5.9.1 Released
image: /assets/files/2025-03-31-phalcon-5.9.1-release.png
date: 2025-03-31T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.9.1 has been released!

<!--more-->

This release fixes a few bugs and introduces an improved `Breadcrumbs` component in the Html `TagFactory`.

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!


## Changelog

### Changed

- Changed `Phalcon\Storage\Adapter\AbstractAdapter` and dropped `has()` check before receiving the value. [#16705](https://github.com/phalcon/cphalcon/issues/16705)

### Added

- Added `Phalcon\Html\Helper\Breadcrumbs` component to replace the old `Phalcon\Html\Breadcrumbs` component. [#16727](https://github.com/phalcon/cphalcon/issues/16727)

### Fixed

- Fixed `Phalcon\Mvc\Micro\LazyLoader::callMethod` to prevent `Unknown named parameter` error [#16724](https://github.com/phalcon/cphalcon/issues/16724)


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.9.1
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.9/installation)
