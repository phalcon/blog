Hello everyone!!!

We are releasing Phalcon 3.2.3 today, addressing several bugs. 

### Release
The release tag can be found here: [3.2.3](https://github.com/phalcon/cphalcon/releases/tag/v3.2.3). The Windows DLLs are in the [releases](https://github.com/phalcon/cphalcon/releases/) Github page.

#### Changelog
- Fixed `Phalcon\Mvc\Model\Query::_executeSelect` threw RuntimeException, if `db:beforeQuery()` returned `false`
- Internal cookies property is now always an array [#12978](https://github.com/phalcon/cphalcon/issues/12978)
- Fixed `Phalcon\Validation\Validator\File::validate` to work properly with parameter `message` [#12947](https://github.com/phalcon/cphalcon/issues/12947)
- Fixed `Phalcon\Mvc\View::render` to render a view with params [#13046](https://github.com/phalcon/cphalcon/issues/13046)
- Fixed `Phalcon\Mvc\Model\Manager::getRelationRecords` to work properly with provided columns [#12972](https://github.com/phalcon/cphalcon/issues/12972)
- Mark as deprecated no longer used `Phalcon\Mvc\Model\Query\Builder::$_with` parameter [#13023](https://github.com/phalcon/cphalcon/issues/13023)
- Fixed `Phalcon\Dispatcher::dispatch` to ensure proper flow for all forward/exception/dispatch event hooks [#12931](https://github.com/phalcon/cphalcon/issues/12931)

### Update/Upgrade
Phalcon 3.2.3 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) will be updated today or tomorrow to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

##### NOTE: PackageCloud.io not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly suggest you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code. {.alert .alert-danger}

##### NOTE: Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.2.3) page. {.alert .alert-danger}

##### NOTE: PackageCloud (linux distributions) will be updated no later than tomorrow 2017-10-14. {.alert .alert-info}

We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team

