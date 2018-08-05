Hello everyone!

We are happy to announce that we have released Phalcon [3.4.1](https://github.com/phalcon/cphalcon/releases/tag/v3.4.1). 

This a minor release, focused on bugs and performance.

#### Changelog
- Changed `Phalcon\Cache\Backend\Redis` to support connection timeout parameter
- Fixed `Phalcon\Validaiton\Validator\Uniqueness::isUniquenessModel` to properly get value of primary key when it has different name in column map [#13398](https://github.com/phalcon/cphalcon/issues/13398)
- Fixed bad performance for repeated `Phalcon\Mvc\Router::getRouteByName` and `Phalcon\Mvc\Router::getRouteById` calls for applications with many routes
- Fixed incorrect tinyblob bind type in `Phalcon\Db\Adapter\Pdo\Mysql::describeColumns` [#13423](https://github.com/phalcon/cphalcon/issues/13423)
- Fixed `Phalcon\Http\Request::getPut` to provide json content-type support [#12892](https://github.com/phalcon/cphalcon/issues/12892), [#13418](https://github.com/phalcon/cphalcon/issues/13418)


### Update/Upgrade
Phalcon 3.4.1 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

##### NOTE: Our packaging system not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly recommend you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code. {.alert .alert-danger}

##### NOTE: Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.4.1) page. {.alert .alert-danger}

We encourage existing Phalcon 3 users to update to this version and as always a big thank you to our contributors!


<3 Phalcon Team
