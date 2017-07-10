Hello community!!

We are releasing Phalcon 3.2.1 today, addressing several bugs. 

### Release
The release tag can be found here: [3.2.1](https://github.com/phalcon/cphalcon/releases/tag/v3.2.1). The Windows DLLs are in the [releases](https://github.com/phalcon/cphalcon/releases/) Github page.

#### Changelog
- Added `Phalcon\Db\Dialect\Mysql::getForeignKeyChecks` to generate a SQL to check the foreign key settings [#2604](https://github.com/phalcon/cphalcon/issues/2604), [phalcon/phalcon-devtools#556](https://github.com/phalcon/phalcon-devtools/issues/556)
- Fixed inconsistent behaviour of `Phalcon\Config::merge` across minor version of PHP7 [#12779](https://github.com/phalcon/cphalcon/issues/12779)
- Fixed visibility of `Phalcon\Mvc\Model\Query\Builder` methods: `_conditionNotIn`, `_conditionIn`, `_conditionNotBetween` and `_conditionBetween` to allow 3rd party libraries extend it
- Fixed `Phalcon\Assets\Manager::output`, implemented missing resource type filtering for mixed resource collections [#2408](https://github.com/phalcon/cphalcon/issues/2408)
- Fixed `Phalcon\Http\Response::getStatusCode` to return (int) HTTP code only, instead of full string [#12895](https://github.com/phalcon/cphalcon/issues/12895)
- Fixed `Phalcon\Db\Dialect\Postgresql::addForeignKey` for proper creating the foreign key without a name
- Fixed `Phalcon\Cache\Backend\Apcu::flush` to use APCu instead APC [#12934](https://github.com/phalcon/cphalcon/issues/12934)
- Fixed `Phalcon\Db\Adapter\Pdo\Mysql::addForeignKey` for proper creating the foreign key with a desired key name [#2604](https://github.com/phalcon/cphalcon/issues/2604), [phalcon/phalcon-devtools#556](https://github.com/phalcon/phalcon-devtools/issues/556)
- Fixed `Phalcon\Db\Dialect\Mysql::addForeignKey` to generate correct SQL [#2604](https://github.com/phalcon/cphalcon/issues/2604), [phalcon/phalcon-devtools#556](https://github.com/phalcon/phalcon-devtools/issues/556)

### Update/Upgrade
Phalcon 3.2.1 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

##### NOTE: Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.2.1) page. {.alert .alert-danger}

We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team

