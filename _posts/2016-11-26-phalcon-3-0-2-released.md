---
layout: post
title: "Phalcon 3.0.2 released"
tags: [php, phalcon, "3.0.x", phalcon3, release, rfc, lts]
---

We are excited to announce the immediate availability of Phalcon 3.0.2 [LTS].

This release marks another small milestone in the evolution of Phalcon, addressing a number of bugs and making the framework better for all of us :)

**A big thank you to all of our contributors and the community!!**

The release tag can be found here: [3.0.2](https://github.com/phalcon/cphalcon/releases/tag/v3.0.2)

#### Highlights

- Fixed saving snapshot data while caching model [12170](https://github.com/phalcon/cphalcon/issues/12170), [12000](https://github.com/phalcon/cphalcon/issues/12000)
- Fixed `Phalcon\Http\Response\Headers::send` to send correct status header [12179](https://github.com/phalcon/cphalcon/issues/12179)
- Fixed `Phalcon\Mvc\Model::setSnapshotData`, `Phalcon\Mvc\Model\Resultset\Simple::toArray` by fixing an issue like `fetch a, a[key]` using Zephir [11205](https://github.com/phalcon/cphalcon/issues/11205), [12147](https://github.com/phalcon/cphalcon/issues/12147)
- Fixed `Phalcon\Cache\Backend\Memcache::flush` to remove all query keys after flush memcached [12182](https://github.com/phalcon/cphalcon/issues/12182)
- Fixed `Phalcon\Cache\Backend\Memory::delete` to correct remove items from  `Phalcon\Cache\Backend\Memory::$_data`
- Fixed `Phalcon\Cache\Frontend\Data::afterRetrieve`, `Phalcon\Cache\Frontend\Igbinary::afterRetrieve`, `Phalcon\Cache\Frontend\Msgpack::afterRetrieve` to unserialize only raw data [12186](https://github.com/phalcon/cphalcon/issues/12186)
- Fixed `Phalcon\Mvc\Model::cloneResultMapHydrate` to correct create array/objects from data by column map with types [12191](https://github.com/phalcon/cphalcon/issues/12191)
- Fixed `Phalcon\Validation\Validator\Confirmation::validate` to use `fieldWith` instead of `field` when looking up the value for labelWith.
- Fixed `Phalcon\Cache\Backend\Redis::_connect` to use `select` redis internal function only when the `index` is greater than zero.
- Fixed `Phalcon\Config\Adapter\Ini::_cast` to allow create extended config adapters [12230](https://github.com/phalcon/cphalcon/issues/12230)
- Fixed `Phalcon\Tag::appendTitle`, `Phalcon\Tag::prependTitle` to stack title prepending and appending [12233](https://github.com/phalcon/cphalcon/issues/12233)
- Fixed `Phalcon\Debug::getVersion` to provide valid link to the latest Phalcon major version [12215](https://github.com/phalcon/cphalcon/issues/12215)
- Fixed `Phalcon\Session\Adapter\Libmemcached::read`, `Phalcon\Session\Adapter\Libmemcached::destroy`, `Phalcon\Session\Adapter\Memcache::read`, `Phalcon\Session\Adapter\Memcache::destroy`, `Phalcon\Session\Adapter\Redis::read` and `Phalcon\Session\Adapter\Redis::destroy` in accordance with the `session_set_save_handler` API [12206](https://github.com/phalcon/cphalcon/issues/12206)
- Fixed `Phalcon\Validation::getValue()` to use filters when having entity
- Fixed `Phalcon\Db\Dialect\Mysql::describeReferences()` and `Phalcon\Db\Dialect\Postgresql::describeReferences()` to return proper sql
- Fixed `Phalcon\Db\Column::hasDefault` to return `false` for autoincrement columns [phalcon/phalcon-devtools#853](https://github.com/phalcon/phalcon-devtools/issues/853)
- Fixed `Phalcon\Db\Dialect\Postgresql::createTable`, `Phalcon\Db\Dialect\Postgresql::addColumn`, `Phalcon\Db\Dialect\Postgresql::modifyColumn` to correct escape default values [12267](https://github.com/phalcon/cphalcon/issues/), [phalcon/phalcon-devtools#859](https://github.com/phalcon/phalcon-devtools/issues/859)
- Fixed `Phalcon\Forms\Form::bind` to clean form elements [11978](https://github.com/phalcon/cphalcon/issues/11978), [12165](https://github.com/phalcon/cphalcon/issues/12165), [12099](https://github.com/phalcon/cphalcon/issues/12099), [10044](https://github.com/phalcon/cphalcon/issues/10044)
- Fixed `Phalcon\Tag::resetInput` for proper use without attempts to clear `$_POST` [12099](https://github.com/phalcon/cphalcon/issues/12099)
- Fixed `Phalcon\Db\Dialect\Mysql` and `Phalcon\Db\Dialect\Postresql` to correctly check schema in missing methods
- Fixed `Phalcon\Cache\Backend\Apc::flush` to remove only it's own keys by prefix [12153](https://github.com/phalcon/cphalcon/issues/12153)
- Fixed `Phalcon\Acl\Adapter\Memory::isAllowed` to call closures when using wildcard [12333](https://github.com/phalcon/cphalcon/issues/12333)
- Fixed `Phalcon\Validation\Validator\File` array to string conversion in `minResolution` and `maxResolution` [12349](https://github.com/phalcon/cphalcon/issues/12349)
- Fixed `Phalcon\Cache\Backend\File::queryKeys()` to compare the filename against parsed prefix
- Database identifiers are now properly escaped [12410](https://github.com/phalcon/cphalcon/issues/12410)


### Update/Upgrade

Phalcon 3.0.2 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

We encourage existing Phalcon 3 users to update to this maintenance version.

<3 Phalcon Team
