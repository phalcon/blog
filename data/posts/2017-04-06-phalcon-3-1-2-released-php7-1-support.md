Hello everyone!!

We are extremely happy today to announce the release of our newest Phalcon version: 3.1.2.

This release fixes a few bugs, but one of them has been one of the most sought after by the community: PHP 7.1 support.

The release tag can be found here: [3.1.2](https://github.com/phalcon/cphalcon/releases/tag/v3.1.2)

#### `Imagick::getVersion()`
Fixed `Imagick::getVersion()` error in some systems [#12729](https://github.com/phalcon/cphalcon/pull/12729). In certain systems, extending `Imagick::getVersion()` cannot be called and is correctly called now using `Imagick->getVersion()`.

#### Object of class `Phalcon\Db\RawValue` could not be converted to float
Fixed `Phalcon\Mvc\Model::_doLowInsert` to properly set snapshot when having default values and public properties [#12766](https://github.com/phalcon/cphalcon/issues/12766)

#### PHP 7.1 Support

##### Fixed PHP 7.1 issues [#12055](https://github.com/phalcon/cphalcon/issues/12055). ##### {.alert .alert-info}

This issue took us a lot longer to address than we would have liked. We had to tackle issues with Zephir as well as our code generation scripts along with this one. 
 
The wait is over though! Phalcon can be installed with PHP 7.1 installations, so enjoy it!

### Q1 update
Regarding our goals, we are a bit behind on our [Zephir Milestone](https://github.com/phalcon/zephir/milestone/1) with 50% done. We are working however hard to fix all the issues remaining. The [documentation revamp](https://github.com/phalcon/docs/tree/Refactor) also is moving along nicely.

### Community 
A huge thank you and kudos to our community for the patience and support all this time. Also huge thank you to our contributors for making this release possible!

### Update/Upgrade
Phalcon 3.1.2 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

##### Note that the Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.1.2) page ##### {.alert .alert-danger}

We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team

