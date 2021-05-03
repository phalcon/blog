---
layout: post
title: Phalcon v4.1.2 Released
image: /assets/files/2021-05-01-phalcon-4.1.2.png
date: 2021-05-03T13:52:33.188Z
tags:
  - phalcon4
  - release
---
We are very happy to announce the release of Phalcon **v4.1.2**!

<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.1.2)

This is a small maintenance release for v4, and although it was supposed to be 4.1.1, we made a mistake for our PECL deployment so we had to increment the small version once more. v4.1.1 and v4.1.2 are identical.

## Changed
- Corrected max PHP version for PECL

## Fixed
- Fixed `Logger\Log::log()` `log` to recognize all log levels [#15214](https://github.com/phalcon/cphalcon/issues/15214)
- Changed `setClaims` to be protected so that the `Phalcon\Security\JWT\Builder` class can be properly extended. [#15322](https://github.com/phalcon/cphalcon/issues/15322)

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

## Installation/Upgrade

[Packagecloud.io](https://packagecloud.io/phalcon) and PECL have been updated. You can download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.1.2).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

### Thank you

Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.io/discord) or our [Forum](https://phalcon.io/forum).

