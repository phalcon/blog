---
layout: post
title: Phalcon v5.2.2 Released
image: /assets/files/2023-06-18-phalcon-5.2.2-release.png
date: 2023-06-18T20:04:21.614Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon v5.2.2 has been released!

<!--more-->

Life, summer and other factors prevented us from releasing earlier, but better late than never :)

This release fixes a few bugs.

Thank you as always to our community!

## Changelog

### Fixed

- Fixed `Encryption\Crypt::checkCipherHashIsAvailable` to allow proper setting of the hash [#16314](https://github.com/phalcon/cphalcon/issues/16314) 
- Removed `unlikely` from `if` statements from the Stream storage adapter and Json serializer [#16339](https://github.com/phalcon/cphalcon/issues/16339)
- Fixed `Storage\Adapter\Stream::get()/set()` to correctly calculate the path if the prefix is present in the key [#16348](https://github.com/phalcon/cphalcon/issues/16348)
- Fixed `Html\Helper\Input\Checkbox` to correctly process empty values [#15959](https://github.com/phalcon/cphalcon/issues/15959)


## Upgrade
Developers can upgrade using PECL

```bash
pecl install phalcon-5.2.2
```

To compile from source, follow our [installation document](https://docs.phalcon.io/5.0/en/installation)
