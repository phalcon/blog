---
layout: post
title: Phalcon v4.0.4 released
date: 2020-02-15T20:25:11.947Z
tags:
  - phalcon
  - phalcon4
  - release
image: /assets/files/2020-02-15-phalcon-4.0.4.png
---
We are very happy to announce the release of Phalcon **v4.0.4**, a maintenance release. 

<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.4)

This release focused mostly on bug fixes reported by the community, as our testing suite and release tasks.

We have started utilizing more [GitHub Actions](https://github.com/phalcon/cphalcon/actions) in order to streamline our release process. At the moment, every release takes between 2-3 hours with a lot of manual checks from the team to ensure that everything is OK. 

With this release we have added the foundation to start running our tests with GitHub actions on Linux, MacOS and Windows, ensuring that the release will be problem free on all platforms.

We have also started refactoring all our database related tests, with a goal to run all of them on each RDBMs that we support. At the moment we only have MySQL and Sqlite enabled but Postgresql will be added soon. A new testing suite (`database`) was created just for that.

Finally, we worked a bit more on [v4.1](https://github.com/phalcon/cphalcon/blob/4.1.x/CHANGELOG-4.1.md), adding more components as per our roadmap. These components include more HTML helpers under `Phalcon\Html\Helper`, HTTP/2 preload support from Volt as well as a new `Connection` class which is the first step for our Data Mapper implementation coming in later versions of v4. The bulk of the work being done in v4.1 comes from the [NFR list](https://docs.phalcon.io/4.0/en/new-feature-request-list) that the community has voted on.

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

> **NOTE**: You can always check our roadmap and the status of our active sprint in our project page: <https://github.com/orgs/phalcon/projects/4>  
{: .alert .alert-info }

## Changelog

Supported PHP Versions: 7.2, 7.3, 7.4

### Added
- Added a way to utilize GitHub actions to run database tests against each RDBMS and reworked the testing suite. [#14779](https://github.com/phalcon/cphalcon/issues/14779)
- Added the latest version of Codeception (v4) and utilized the phalcon4 module. [#14779](https://github.com/phalcon/cphalcon/issues/14779)

### Changed
- Changed Column 'notNull' definition to make possible create nullable (NULL) columns [#14804](https://github.com/phalcon/cphalcon/pull/14804)

### Fixed
- Fixed `Phalcon\Db\Adapter\Pdo\Postgresql` to correctly identify `bool` fields instead of treating them as `tinyint` [#14722](https://github.com/phalcon/cphalcon/issues/14722) [@tidytrax](https://github.com/tidytrax)
- Fixed `Phalcon\Cli\Console` to pass current container to the `Phalcon\Mvc\ModuleDefinitionInterface::registerAutoloaders()` [#14787](https://github.com/phalcon/cphalcon/issues/14787) [@TimurFlush](https://github.com/TimurFlush)
- Fixed `Phalcon\Db\Dialect\Mysql::createTable()` to create default value with CURRENT_TIMESTAMP ON UPDATE/DELETE [#14797]
- Fixed `Phalcon\Storage\Adapter\*` to no longer accept the `serializer` option as it was clashing with the factory [#14828](https://github.com/phalcon/cphalcon/pull/14828)
- Fixed `Phalcon\Http\Request` to return the correct host on an `UnexpectedValueException` [#14763](https://github.com/phalcon/cphalcon/issues/14763)
- Fixed `Phalcon\Assets\Collection` to initialize `position` to 0 [#14848](https://github.com/phalcon/cphalcon/pull/14848)


## Installation/Upgrade

The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.4. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.4).

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
* [Brighteon](https://phalcon.io/brighteon)
* [LBRY](https://phalcon.io/lbry)
* [YouTube](https://phalcon.io/youtube)

<3 Phalcon Team
