---
layout: post
title: Phalcon v4.0.1 released
date: 2020-01-11T16:36:24.538Z
tags:
  - phalcon
  - phalcon4
  - release
  - rc
image: /assets/files/20200111-phalcon4.0.1-release.png
---
We are very happy to announce the release of **v4.0.1**, our first release in 2020!. 

<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.1)

> We streamed this release live! <https://youtu.be/oRwVx4pwemI> 
{: .alert .alert-info }

We started getting a bit more organized :) We have split the work in sprints (usually two week long) and we only pick up work that we can complete within the current sprint. 

The work is a combination of bug fixes, enhancements as well as NFRs for both 4.0 and 4.1.

## Highlights

* Docs update / clarifications
* Build adjustments (PHP 7.4)
* `Request\Cookie` - `setcookie`
* Size parameter for `DATETIME`/`TIMESTAMP`
* Query Builder - virtual columns
* DevTools bugs
* **PECL work**
* **Codeception Phalcon 4 module**
* Binaries for macOS - HomeBrew
* Docs update / clarifications
* Tests - CLI (all done)
* Tests - `Request\Cookie`

also for v4.1

* JWT support (4.1)  (docs needed)
* `Html\Helpers` support (4.1)  (docs needed)

> **NOTE**: You can always check our roadmap and the status of our active sprint in our project page: <https://github.com/orgs/phalcon/projects/4> 
{: .alert .alert-info }

<iframe src='https://www.brighteon.com/embed/80efede3-54d4-47d8-9332-3494d56d2001' width='560' height='315' frameborder='0' allowfullscreen></iframe>

## Changelog

## Added

## Changed

* Changed the logic when logging times for `Phalcon\Logger` to use `DateTimeImmutable` so as to handle microseconds if necessary. [\#2893](https://github.com/phalcon/cphalcon/issues/2893)
* Changed `Phalcon\Http\Cookie::send` and `Phalcon\Http\Cookie::delete` to allow for `samesite` to be passed in the `options` when using PHP > 7.3 [\#14627](https://github.com/phalcon/cphalcon/issues/14627)

## Fixed

* Fixed `Phalcon\Mvc\Model\Criteria` Di isn't set when using `Criteria::fromInput()` [\#14538](https://github.com/phalcon/cphalcon/issues/14639)
* Fixed `Phalcon\Db\Dialect\Mysql` removing unnecessary parentheses for `double` and `float` [\#14645](https://github.com/phalcon/cphalcon/pull/14645) [@pfz](https://github.com/pfz)
* Fixed `Phalcon\Http\Cookie::delete` to parse the correct parameters - cannot use alternative syntax until PHP 7.3 [\#14643](https://github.com/phalcon/cphalcon/issues/14643)
* Fixed `Phalcon\Mvc\Model::__isset` to take into account non visible properties by checking the getter if it exists [\#13518](https://github.com/phalcon/cphalcon/issues/13518) [\#13900](https://github.com/phalcon/cphalcon/issues/13900)
* Fixed `Phalcon\Mvc\Model::__set` to return a more informative message if we are tying to access a non visible property [\#13518](https://github.com/phalcon/cphalcon/issues/13518) [\#13900](https://github.com/phalcon/cphalcon/issues/13900)
* Fixed `Phalcon\Mvc\Model\Resultset\Simple::toArray` to correctly process virtual fields [\#14669](https://github.com/phalcon/cphalcon/issues/14669)
* Fixed `Phalcon\Session\Manager::getUniqueKey` to prefix the key only if `uniqueId` is present [\#14688](https://github.com/phalcon/cphalcon/issues/14688)
* Fixed `Phalcon\Db\Adapter\Pdo::describeColumns` to correctly detect `ENUM` columns [\#14691](https://github.com/phalcon/cphalcon/issues/14691)

## Installation/Upgrade

The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.1. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.1).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published. {: .alert .alert-info }

### Thank you

Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.io/discord) or our [Forum](https://phalcon.io/forum).

<hr>

Chat - Q&A

* [Discord Chat](https://phalcon.io/discord)
* [Forum](https://phalcon.link/forum)

Support

* [OpenCollective - Support Us](https://phalcon.io/fund)
* [Store - Merchandise](https://phalcon.io/store)

Social Media

* [Telegram](https://phalcon.io/telegram)
* [Gab](https://phalcon.io/gab)
* [MeWe](https://phalcon.io/mewe)
* [Parler](https://phalcon.io/parler)
* [Reddit](https://phalcon.io/reddit)
* [Facebook](https://phalcon.io/fb)
* [Twitter](https://phalcon.io/t)

Videos

* [BitChute](https://phalcon.io/bitchute)
* [Brighteon](https://brighteon.com/bitchute)
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

<3 Phalcon Team
