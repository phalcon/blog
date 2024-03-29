---
layout: post
title: Phalcon v5.3.1 Released
image: /assets/files/2023-09-12-phalcon-5.3.1-release.png
date: 2023-09-12T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.3.1 has been released!

<!--more-->

This release fixes a couple of nemory leaks found in the framework, in particular when using it alongside Swoole.

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!

## Changelog

### Fixed

- Fixed infinite save loop in `Phalcon\Mvc\Model::save()` [#16395](https://github.com/phalcon/cphalcon/issues/16395)
- Fixed undefined column with columnMap and model caching [#16420](https://github.com/phalcon/cphalcon/issues/16420)
- Fixed memory leak in `Phalcon\Mvc\Router::handle()` [#16431](https://github.com/phalcon/cphalcon/pull/16431)

## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.3.1
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.0/en/installation)
