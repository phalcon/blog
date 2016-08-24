Phalcon 3.0.1 released
======================

We are excited to announce the immediate availability of Phalcon 3.0.1 [LTS].

This maintenance release fixes bugs and improve the stability of Phalcon:

- Fixed memory leaks in PHP7 when setting undeclared properties in models
- Fixed `Phalcon\Cache\Backend\Redis::flush` in order to flush cache correctly
- Fixed `Phalcon\Mvc\Model\Manager::getRelationRecords` to correct using multi relation column [#12035](https://github.com/phalcon/cphalcon/issues/12035)
- Fixed `Phalcon\Acl\Resource`. Now it implements `Phalcon\Acl\ResourceInterface` [#11959](https://github.com/phalcon/cphalcon/issues/11959)
- Fixed `save` method for all cache backends. Now it updates the `_lastKey` property correctly [#12050](https://github.com/phalcon/cphalcon/issues/12050)
- Fixed virtual foreign key check when having multiple keys [#12071](https://github.com/phalcon/cphalcon/issues/12071)
- `Phalcon\Config\Adapter\Ini` constructor can now specify `parse_ini_file()` scanner mode [#12079](https://github.com/phalcon/cphalcon/pull/12079)
- Fixed `Phalcon\Cache\Backend\Apc::save` due to which the `Apc::increment`/`Apc::decrement` could not be used properly [#12109](https://github.com/phalcon/cphalcon/issues/12109)
- Fixed `Phalcon\Mvc\Model\Criteria::inWhere` so that now the second parameter can be an empty array [#10676](https://github.com/phalcon/cphalcon/issues/10676)
- Fixed ORM related memory leak [#12115](https://github.com/phalcon/cphalcon/issues/12115), [#11995](https://github.com/phalcon/cphalcon/issues/11995), [#12116](https://github.com/phalcon/cphalcon/issues/12116)
- Fixed incorrect `Phalcon\Mvc\View::getActiveRenderPath` behavior [#12139](https://github.com/phalcon/cphalcon/issues/12139)
- Fixed `Phalcon\Security\Random::base64Safe` so that now the method returns correct safe string [#12141](https://github.com/phalcon/cphalcon/issues/12141)
- Fixed the `Phalcon\Translate\Adapter\Gettext::getOptionsDefault` visibility [#12157](https://github.com/phalcon/cphalcon/issues/12157)
- Enabled PHQL cache for PHP7 to improve performance and reuse plannings

### Update/Upgrade

Phalcon 3.0.1 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

We encourage existing Phalcon 3 users to update to this maintenance version.

<3 Phalcon Team
