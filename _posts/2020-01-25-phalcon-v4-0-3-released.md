---
layout: post
title: Phalcon v4.0.3 released
date: 2020-01-25T22:22:47.374Z
tags:
  - phalcon
  - phalcon4
  - release
  - rc
---
![](/assets/files/20200125-phalcon4.0.3-release.png)

We are very happy to announce the release of Phalcon **v4.0.3**, a maintenance release. 

<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.3)

This release focused mostly on bug fixes reported by the community, as well as some maintenance tasks. Some work has been put towards 4.1 although not merged into the relevant branch.

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

> **NOTE**: You can always check our roadmap and the status of our active sprint in our project page: <https://github.com/orgs/phalcon/projects/4>  
{: .alert .alert-info }

## Changelog

Supported PHP Versions: 7.2, 7.3, 7.4

## Fixed

* Fixed `Phalcon\Db\Adapter\Pdo\Mysql` Tinyint(1) is handled as `boolean` under MySql [\#14708](https://github.com/phalcon/cphalcon/issues/14708)
* Fixed `Phalcon\Mvc\View\Engine\Volt` to produce the correct order of variables for the `join` filter [\#14771](https://github.com/phalcon/cphalcon/issues/14771)
* Fixed `Phalcon\Storage\Adapter\Stream::getKeys()` bug in the absence of a directory with a prefix name [\#14725](https://github.com/phalcon/cphalcon/issues/14725), [\#14721](https://github.com/phalcon/cphalcon/pull/14721)
* Fixed `Phalcon\Debug::onUncaughtException` Should accept `\Throwable` instead of `\Exception` as an argument [\#14738](https://github.com/phalcon/cphalcon/pull/14738)
* Fixed `Phalcon\Validation\ValidatorFactory` Should return Phalcon\Validation\ValidatorInterface [14749](https://github.com/phalcon/cphalcon/pull/14749)
* Fixed `Phalcon\Mvc\Model\Binder` to now correctly call `has` and `set` on the cache object [\#14743](https://github.com/phalcon/cphalcon/pull/14743)
* Fixed `Phalcon\Session\Adapter\Stream` and `Phalcon\Storage\Adapter\Stream` to correctly handle simultaneous read/write [\#14694](https://github.com/phalcon/cphalcon/issues/14694)
* Fixed `Phalcon\Config\ConfigFactory` to always add the correct extension [\#14756](https://github.com/phalcon/cphalcon/issues/14756)

## Installation/Upgrade

The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.3. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.3).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published. 
{: .alert .alert-info }

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
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

![](https://assets.phalcon.io/phalcon/images/emoji/heart.png) Phalcon Team
