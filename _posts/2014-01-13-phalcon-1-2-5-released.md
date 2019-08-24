---
layout: post
title: "Phalcon 1.2.5 released"
tags: [php, phalcon, "1.2", release, "1.x"]
---

We are pleased to announce the release of Phalcon 1.2.5, the latest stable version of framework.

1.2.5 includes mostly bug fixes:

<!--more-->
- `Http\Cookie::__toString()` will not throw exceptions ([1427](https://github.com/phalcon/cphalcon/issues/1427))
- `Phalcon\Http\Cookie::__toString() will return a string value ([1428](https://github.com/phalcon/cphalcon/issues/1428))
- Camelize does not ignore the last character of a string anymore ([1436](https://github.com/phalcon/cphalcon/issues/1436))
- APC tests do not run under CLI when `apc.enable_cli` is 0 
- `Phalcon\Debug::uri` now supports both http and https ([987](https://github.com/phalcon/cphalcon/issues/987))
- Fixed inconsistency in `Tag::stylesheetLink/javascriptInclude` w.r.t. local URLs ([1486](https://github.com/phalcon/cphalcon/issues/1486))
- Fixed bug in `Phalcon\Queue\Beanstalk::read()` ([1348](https://github.com/phalcon/cphalcon/issues/1348), [1612](https://github.com/phalcon/cphalcon/issues/1612))
- `Phalcon\Flash\Session::getMessages()` incorrectly removed all messages ([1575](https://github.com/phalcon/cphalcon/issues/1575))
- Fixed bug in `phalcon_fix_path()` ([1601](https://github.com/phalcon/cphalcon/issues/1601))
- Added `Phalcon\Mvc\Model\Row::toArray()` method ([1506](https://github.com/phalcon/cphalcon/issues/1506))
- Added support for `POINT` type in MySQL ([1536](https://github.com/phalcon/cphalcon/issues/1536))
- `Phalcon\Mvc\Model\Validator::getOption()` returns `NULL` if the option does not exist ([1530](https://github.com/phalcon/cphalcon/issues/1530))
- Fixed parsing of annotations containing `/` ([1480](https://github.com/phalcon/cphalcon/issues/1480))
- Make sure that ‘persistent' is resolved only when accessed for the first time ([1637](https://github.com/phalcon/cphalcon/issues/1637))
- Fix `Phalcon\Session\Bag::remove()` ([1637](https://github.com/phalcon/cphalcon/issues/1637))
- Bug fixes in beanstalkd protocol implementation
- `Phalcon\Paginator\Adapter\Model` returns correct results even when page number is incorrect ([1654](https://github.com/phalcon/cphalcon/issues/1654))
- Bug fix: no arguments were passed to beforeMatch handler in `Phalcon\Mvc\Router` ([1556](https://github.com/phalcon/cphalcon/issues/1556))
- `Phalcon\Logger\Adapter::setLogLevel()` is honored by transactions ([1716](https://github.com/phalcon/cphalcon/issues/1716))
- Bug fixes in `Phalcon\Db\Adapter\Pdo::describeColumns()` ([1562](https://github.com/phalcon/cphalcon/issues/1562))
- `Phalcon\Session\Adapter::__destruct()` now calls `session_write_close()` ([1624](https://github.com/phalcon/cphalcon/issues/1624))
- Volt: fixed bug in `email_filed()` ([1723](https://github.com/phalcon/cphalcon/issues/1723))
- Fixed PHP Notices in `Phalcon\Debug::onUncaughtException()` ([1683](https://github.com/phalcon/cphalcon/issues/1683))
- `Phalcon\Logger\Adapter::commit()` clears the queue ([1748](https://github.com/phalcon/cphalcon/issues/1748))
- Constant-time string comparison in `Phalcon\Security::checkHash()` ([1755](https://github.com/phalcon/cphalcon/issues/1755))
- Fix `phalcon_escape_multi()` to generate valid UTF-8 ([1681](https://github.com/phalcon/cphalcon/issues/1681))

Phalcon 1.2.5 is now available on the 
[master branch](https://github.com/phalcon/cphalcon) and DLLs are available for download in our [download area](https://phalcon.io/download). You can also access the latest [documentation](https://docs.phalcon.io) here.

Enjoy!


<3 The Phalcon Team
