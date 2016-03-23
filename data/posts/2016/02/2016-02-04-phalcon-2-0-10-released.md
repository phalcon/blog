Phalcon 2.0.10 released
======================

We are excited to announce the immediate availability of Phalcon 2.0.10!

This is the tenth maintenance release in the 2.0.x series, adding more fixes
and improvements to make the most of Phalcon.

### Changes in 2.0.10

- ORM: Added support for DATE columns in Oracle
- Fixed wrong `total_items` and `total_pages` in `Paginator` when the query builder has set `groupBy()`
- Fixed `Phalcon\Acl\Memory::allow` [GI:11210] related to the inconsistent behavior with access specified as string and array
- Added quoting column in `Phalcon\Db\Dialect\MySQL::addColumn` when define position of the column
- Added support to define position of the column in `Phalcon\Db\Dialect\MySQL::modifyColumn`
- Fixed `Phalcon\Mvc\Model\Query\Builder` [GI:11298] related to resetting limit to null
- Fixed `Phalcon\Tag::getTitle` [GI:11185]. Now a title will be automatically escaped.
- Fixed `Phalcon\Translate\Adapter\Gettext::exists` [GI:11310] related to the wrong returned value (always true)
- Fixed `Phalcon\Translate\Adapter\Gettext::setLocale` [GI:11311] related to the incorrect setting locale
- Added ability to persistent connection in `Phalcon\Queue\Beanstalk::connect`
- Fixed `Phalcon\Http\Response::redirect` [GI:11324]. Incorrect initialization local array of status codes
- Fixed cache backends [GI:11322] related to saving number 0
- Fixed `Phalcon\Db\Dialect::escape` [GI:11359]. Added ability to use the database name with dots.

### Update/Upgrade

This version can be installed from the master branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

* [Documentation](https://docs.phalconphp.com)
* [API](https://api.phalconphp.com/)

Thanks to everyone involved in this release and thanks for choosing Phalcon!

<3 Phalcon Team
