## Phalcon 2.0.13 released

We are excited to announce the immediate availability of Phalcon 2.0.13!

This maintenance release number of bug fixes (outlined below). We had 2 more minor releases providing minor fixes since our last blog post, and the CHANGELOG for those is listed below:

### [2.0.11](https://github.com/phalcon/cphalcon/releases/tag/phalcon-v2.0.11) (2016-05-04)
- Fixed Model magic `set` functionality to maintain variable visibility and utilize setter methods.[11286](https://github.com/phalcon/cphalcon/issues/11286)
- Added a `prepareSave` event to model saving
- Added support for OnUpdate and OnDelete foreign key events to the MySQL adapter
- Added ability to `setLogLevel` on multiple logs [10429](https://github.com/phalcon/cphalcon/pull/10429)
- Fixed regression changes for `Phalcon\Translate\Adapter\Gettext::prepareOptions` [11429](https://github.com/phalcon/cphalcon/issues/11429)
- Fixed `Phalcon\Mvc\View\Engine\Volt::callMacro` bug. Now it's correctly calling `call_user_func_array` instead of `call_user_func`
- Fixed undefined method call `Phalcon\Mvc\Collection\Manager::getConnectionService`. Now `Phalcon\Mvc\Collection::getConnectionService` works correctly in according to documentation

### [2.0.12](https://github.com/phalcon/cphalcon/releases/tag/phalcon-v2.0.12) (2016-05-16)
- Fixed regression changes for `Phalcon\Mvc\View\Engine\Volt::callMacro` [11745](https://github.com/phalcon/cphalcon/issues/11745)
- Fixed the argument type of `Phalcon\Flash::success` [11764](https://github.com/phalcon/cphalcon/pull/11764)

### [2.0.13](https://github.com/phalcon/cphalcon/releases/tag/phalcon-v2.0.13) (2016-05-19)
- Restored `Phalcon\Text::camelize` behavior [11767](https://github.com/phalcon/cphalcon/issues/11767)
- Used Zephir v0.9.2 to maintain backwards compatibility

### Update/Upgrade

Phalcon 2.0.13 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

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

### Phalcon 2.1.x

As you know, we had plans to release 2.1.0 some weeks ago but we faced some blocking bugs running Phalcon in PHP7 that delayed the launch. Most of these bugs have been fixed and the tests are passing in Travis. We have a few more bugs to address, so we expect to release it soon. If you want to try it out install it from the 2.1.x branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
git checkout 2.1.x
zephir build --backend=ZendEngine3
```

As always, many thanks to everyone involved in this release and thanks for choosing Phalcon!

<3 Phalcon Team
