---
layout: post
title: "Phalcon 2.0.9 released"
tags: [php, phalcon, phalcon2, release, "2.x"]
---

We are excited to announce the immediate availability of Phalcon 2.0.9!

This is the ninth maintenance release in the 2.0.x series, adding more fixes and improvements to make the most of Phalcon.

<!--more-->
### Changes in 2.0.9

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

Windows DLLs are available in the [download page](https://phalcon.io/en/download/windows).

* [Documentation](https://docs.phalcon.io)
* [API](https://phalcon.link/api)

Thanks to everyone involved in this release and thanks for choosing Phalcon!

<3 Phalcon Team
