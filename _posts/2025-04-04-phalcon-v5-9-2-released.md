---
layout: post
title: Phalcon v5.9.1 Released
image: /assets/files/2025-04-04-phalcon-5.9.2-release.png
date: 2025-04-04T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.9.2 has been released!

<!--more-->

This is a maintenance release, primarily fixing a bug we introduced from a previous bug fix :/

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting!


## Changelog

### Fixed

- Fixed `Phalcon\Translate\Adapter\Csv` the `escape` argument is explicitly required in PHP 8.4  [#16733](https://github.com/phalcon/cphalcon/issues/16733)
- Fixed `Phalcon\Mvc\Model\Query` to use the cacheOptions lifetime over the "cache" service lifetime


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.9.2
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.9/installation)
