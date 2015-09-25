Phalcon 2.0.8 and 2.1 beta 2 released
======================

We are excited to announce the immediate availability of Phalcon 2.0.8 and Phalcon 2.1.0 beta 2!
This is the eighth maintenance release in the 2.0.x series. In regards to Phalcon 2.1,
the second beta introduces bug fixes and new features intended to stabilize our next
major release.

### Changes in 2.0.8

- Added `Phalcon\Security\Random::base58` - to generate a random base58 string
- Added `Phalcon\Logger\Adapter::isTransaction()` to check whether the logger is currently in transaction mode or not (Phalcon 1.3 behavior)
- `Phalcon\Session\Adapter` now closes the session when the adapter is destroyed (Phalcon 1.3 behavior)
- Fixed fetching of data in modes FETCH_CLASS, FETCH_INTO and FETCH_FUNC in `Phalcon\Db`
- Added missing code property in `Phalcon\Validation\Message` available in Phalcon 1.3.x
- Added `Phalcon\Db\Column::TYPE_TIMESTAMP` to allow migrations on these kind of columns
- Added `Phalcon\Db\ColumnInterface::hasDefault` to check if a column has a default value declared in its database column definition
- Fixed determining of default value for column in `Phalcon\Db\Dialect\MySQL`, `Phalcon\Db\Dialect\Sqlite` and `Phalcon\Db\Dialect\Postgresql` classes
- Now `Phalcon\Mvc\Model::__call` invokes finders as in `__callStatic`
- Fixed `Phalcon\Db\Dialect\Postgresql::getColumnDefinition` for `BIGINT` and `BOOLEAN` data types
- Fixed `BOOLEAN` default value in `Phalcon\Db\Dialect\Postgresql`
- Added `Phalcon\Validation\Validator\CreditCard` - validation credit card number using luhn algorithm

### Changes in 2.1.0 beta 2

- `Phalcon\Mvc\Model` now implements JsonSerializable making easy serialize model instances
- When destroying a `Mvc\Model\Manager` object the PHQL cache is clean
- Method `isSetOption` in `Phalcon\Validation\ValidatorInterface` marked as deprecated, please use `hasOption`
- Added internal check "allowEmpty" before calling a validator. If it option is true and the value of empty, the validator is skipped
- Added default header: `Content-Type: "application/json; charset=UTF-8"` in method `Phalcon\Http\Response::setJsonContent`
- Loop structure in Volt now can be passed to macros and functions as `loop.self`

Last month, important improvements to support PHP7 have been done by the [Zephir Team](https://github.com/phalcon/zephir), so we expect to have a usable version of Phalcon for PHP7 soon.

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
