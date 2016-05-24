Phalcon 2.0.13 Maintenance Release
==================================

We are excited to announce the immediate availability of Phalcon 2.0.13!

This maintenance release number of bug fixes (outlined below). We had 2 more minor releases since our last blog post, and the changelog for those is listed below.

### [2.0.11](https://github.com/phalcon/cphalcon/releases/tag/phalcon-v2.0.11) (2016-05-04)
- Fixed Model magic `set` functionality to maintain variable visibility and utilize setter methods.[GI:11286]
- Added a `prepareSave` event to model saving
- Added support for OnUpdate and OnDelete foreign key events to the MySQL adapter
- Added ability to `setLogLevel` on multiple logs [GPR:10429]
- Fixed regression changes for `Phalcon\Translate\Adapter\Gettext::prepareOptions` [GI:11429]
- Fixed `Phalcon\Mvc\View\Engine\Volt::callMacro` bug. Now it's correctly calling `call_user_func_array` instead of `call_user_func`
- Fixed undefined method call `Phalcon\Mvc\Collection\Manager::getConnectionService`. Now `Phalcon\Mvc\Collection::getConnectionService` works correctly in according to documentation

### [2.0.12](https://github.com/phalcon/cphalcon/releases/tag/phalcon-v2.0.12) (2016-05-16)
- Fixed regression changes for `Phalcon\Mvc\View\Engine\Volt::callMacro` [GI:11745]
- Fixed the argument type of `Phalcon\Flash::success` [GPR:11764]

### [2.0.13](https://github.com/phalcon/cphalcon/releases/tag/phalcon-v2.0.13) (2016-05-19)
- Restored `Phalcon\Text::camelize` behavior [GI:11767]
- Used Zephir v0.9.2

### Update/Upgrade

Phalcon 2.0.10 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
git checkout master
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
git checkout master
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

As always, many thanks to everyone involved in this release and thanks for choosing Phalcon!

<3 Phalcon Team
