---
layout: post
title: Phalcon v5.0.2 Released
image: /assets/files/2022-09-27-phalcon-5.0.2-release.png
date: 2022-09-27T21:58:28.921Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.0.2 has been released!

<!--more-->

Taking advantage of our now quick release cycle and reports from the community, a couple of bugs have been identified and resolved in this minor release.

Thank you as always to our community!

## Changelog

### Fixed
- Fixed `Phalcon\Html\Escaper::attributes()` to accept any value and transform it to string [#16123](https://github.com/phalcon/cphalcon/issues/16123)
- Fixed `Phalcon\Logger\AbstractLogger::getLevelNumber()` to better check for string levels [#16123](https://github.com/phalcon/cphalcon/issues/16123)

## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.0.2
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.0/en/installation)
