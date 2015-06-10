Phalcon 2.0.1 released
======================

Today we’re releasing Phalcon 2.0.1, this version fixes bugs and adds
new features in the 2.0 series, the following is the CHANGELOG:

- Fixed random segfaults in installations using PHP <= 5.5 caused by inline caches
- Added missing `Phalcon\Debug::listenLowSeverity`
- Added new theme in `Phalcon\Debug`
- Allow to count and iterate `Phalcon\Session\Bag` as in 1.3.x
- Renamed `getEventsManager` to `getInternalEventsManager` in `Phalcon\Di` to 
  avoid collision with existing services
- Added constants `FILTER_*` to `Phalcon\Filter` for filters names
- Fixed multibyte characters in cssmin/jsmin filters
- Added `Phalcon\Security::destroyToken()` to remove current token key and 
  value from session
- Restored alternative hash algorithms in `Phalcon\Security` that were 
  available in 1.3.x
- Fixed bug that makes instances returned in `Model::findFirst` to be not 
  completely initialized
- Added support for general `SELECT ALL/SELECT DISTINCT` in PHQL
- Added support for “not in” test in Volt 
- `Phalcon\Debug\Dump`
-- Renamed method `var()` to `variable()` 
-- Renamed method `vars()` to `variables()`
- `Phalcon\Mvc\Model::findFirst()` now allows hydration 
  [#10259](https://github.com/phalcon/cphalcon/issues/10259).
- Fixed high memory consumption when serializing `Cache\Backend\Memory`.

### Update/Upgrade

This version can be installed from the master branch. If you don’t have Zephir 
installed follow these instructions:

```sh
    git clone http://github.com/phalcon/cphalcon
    git checkout master
    cd ext
    sudo ./install
```

The standard installation method also works:

```sh
    git clone http://github.com/phalcon/cphalcon
    git checkout master
    cd build
    sudo ./install
```

If you have Zephir installed:

```sh
    git clone http://github.com/phalcon/cphalcon
    git checkout master
    zephir fullclean
    zephir build
```

Note that running the installation script will replace any version of
Phalcon installed before.

Windows DLLs are available in the 
[download page](http://phalconphp.com/en/download/windows).

See the [upgrading guide](https://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2)
for more information about upgrading to Phalcon 2.0.x from 1.3.x.

Thanks to all the collaborators and the community!

