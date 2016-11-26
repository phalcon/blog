Phalcon 3.0.1 released
======================

We are excited to announce the immediate availability of Phalcon 3.0.1 [LTS].

This maintenance release fixes bugs and improve the stability of Phalcon:

- Fixed memory leaks in PHP7 when setting undeclared properties in models
- Fixed `Phalcon\Cache\Backend\Redis::flush` in order to flush cache correctly
- Fixed `Phalcon\Mvc\Model\Manager::getRelationRecords` to correct using multi relation column [GI:12035]
- Fixed `Phalcon\Acl\Resource`. Now it implements `Phalcon\Acl\ResourceInterface` [GI:11959]
- Fixed `save` method for all cache backends. Now it updates the `_lastKey` property correctly [GI:12050]
- Fixed virtual foreign key check when having multiple keys [GI:12071]
- `Phalcon\Config\Adapter\Ini` constructor can now specify `parse_ini_file()` scanner mode [GI:12079]
- Fixed `Phalcon\Cache\Backend\Apc::save` due to which the `Apc::increment`/`Apc::decrement` could not be used properly [GI:12109]
- Fixed `Phalcon\Mvc\Model\Criteria::inWhere` so that now the second parameter can be an empty array [GI:10676]
- Fixed ORM related memory leak [GI:12115], [GI:11995], [GI:12116]
- Fixed incorrect `Phalcon\Mvc\View::getActiveRenderPath` behavior [GI:12139]
- Fixed `Phalcon\Security\Random::base64Safe` so that now the method returns correct safe string [GI:12141]
- Fixed the `Phalcon\Translate\Adapter\Gettext::getOptionsDefault` visibility [GI:12157]
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
