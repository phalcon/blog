Phalcon 1.2.5 released
======================

We are pleased to announce the release of Phalcon 1.2.5, the latest stable version of framework.

1.2.5 includes mostly bug fixes:

- `Http\Cookie::__toString()` will not throw exceptions ([GI:1427])
- `Phalcon\Http\Cookie::__toString() will return a string value ([GI:1428])
- Camelize does not ignore the last character of a string anymore ([GI:1436])
- APC tests do not run under CLI when `apc.enable_cli` is 0 ([GI:1449])
- `Phalcon\Debug::uri` now supports both http and https ([GI:987])
- Fixed inconsistency in `Tag::stylesheetLink/javascriptInclude` w.r.t. local URLs ([GI:1486])
- Fixed bug in `Phalcon\Queue\Beanstalk::read()` ([GI:1348], [GI:1612])
- `Phalcon\Flash\Session::getMessages()` incorrectly removed all messages ([GI:1575])
- Fixed bug in `phalcon_fix_path()` ([GI:1601])
- Added `Phalcon\Mvc\Model\Row::toArray()` method ([GI:1506])
- Added support for `POINT` type in MySQL ([GI:1536])
- `Phalcon\Mvc\Model\Validator::getOption()` returns `NULL` if the option does not exist ([GI:1530])
- Fixed parsing of annotations containing `/` ([GI:1480])
- Make sure that ‘persistent' is resolved only when accessed for the first time ([GI:1637])
- Fix `Phalcon\Session\Bag::remove()` ([GI:1637])
- Bug fixes in beanstalkd protocol implementation
- `Phalcon\Paginator\Adapter\Model` returns correct results even when page number is incorrect ([GI:1654])
- Bug fix: no arguments were passed to beforeMatch handler in `Phalcon\Mvc\Router` ([GI:1556])
- `Phalcon\Logger\Adapter::setLogLevel()` is honored by transactions ([GI:1716])
- Bug fixes in `Phalcon\Db\Adapter\Pdo::describeColumns()` ([GI:1562])
- `Phalcon\Session\Adapter::__destruct()` now calls `session_write_close()` ([GI:1624])
- Volt: fixed bug in `email_filed()` ([GI:1723])
- Fixed PHP Notices in `Phalcon\Debug::onUncaughtException()` ([GI:1683])
- `Phalcon\Logger\Adapter::commit()` clears the queue ([GI:1748])
- Constant-time string comparison in `Phalcon\Security::checkHash()` ([GI:1755])
- Fix `phalcon_escape_multi()` to generate valid UTF-8 ([GI:1681])

Phalcon 1.2.5 is now available on the 
[master branch](https://github.com/phalcon/cphalcon) and DLLs are available for download in our [download area](https://phalconphp.com/download). You can also access the latest [documentation](https://docs.phalconphp.com) here.

Enjoy!


<3 The Phalcon Team
