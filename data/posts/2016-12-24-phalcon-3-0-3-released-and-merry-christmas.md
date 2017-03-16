## Phalcon 3.0.3 released and Merry Christmas

![image]({{ cdnUrl }}files/2016-12-24-xmas.jpg)

The Phalcon Team wishes all of our friends, contributors, developers and users of the framework a Merry Christmas!. We hope that the new year will bring health and happiness to you and your loved ones!

As a small gift for this holiday/celebration, we are releasing Phalcon 3.0.3 [LTS].

This release concentrated on addressing a number of bugs, making the framework a bit better than before for all of us :)

**A big thank you to all of our contributors and the community!!**

The release tag can be found here: [3.0.3](https://github.com/phalcon/cphalcon/releases/tag/v3.0.3)

#### Highlights

- Fixed implementation of `Iterator` interface in a `Phalcon\Forms\Form` that could cause a run-time warning
- Fixed `Phalcon\Cache\Backend\Redis::get`, `Phalcon\Cache\Frontend\Data::afterRetrieve` to allow get empty strings from the Redis database [12437](https://github.com/phalcon/cphalcon/issues/12437)
- Fixed `Phalcon\Cache\Backend\Redis::exists` to correct check if cache key exists for empty value in the Redis database [12434](https://github.com/phalcon/cphalcon/issues/12434)
- Fixed `Phalcon\Security::checkToken` to prevent possible timing attack [12418](https://github.com/phalcon/cphalcon/issues/12418)
- Fixed `Phalcon\Mvc\Model\Resultset\Simple` to save snapshot when caching
- Fixed `Phalcon\Http\Request::getHeaders` to handle auth headers correctly [12480](https://github.com/phalcon/cphalcon/issues/12480)
- Fixed `Phalcon\Http\Request::getMethod` to handle `X-HTTP-Method-Override` header correctly [12478](https://github.com/phalcon/cphalcon/issues/12478)
- Fixed `Phalcon\Mvc\Model\Criteria::limit` and `Phalcon\Mvc\Model\Query\Builder::limit` to work with limit and offset properly [12419](https://github.com/phalcon/cphalcon/issues/12419)
- Fixed `Phalcon\Forms\Form` to correct form validation and set messages for elements [12465](https://github.com/phalcon/cphalcon/issues/12465), [11500](https://github.com/phalcon/cphalcon/issues/11500), [11135]((https://github.com/phalcon/cphalcon/issues/11135)), [3167](https://github.com/phalcon/cphalcon/issues/3167), [12395](https://github.com/phalcon/cphalcon/issues/12395)
- Fixed `Phalcon\Cache\Backend\Libmemcached::queryKeys` to correct query the existing cached keys #11024
- Fixed building extension for ImageMagick 7 [mkoppanen/imagick#180](https://github.com/mkoppanen/imagick/issues/180)
- Fixed `Phalcon\Cache\Backend\Redis::save` to allow save data termlessly [12327](https://github.com/phalcon/cphalcon/issues/12327)

### Update/Upgrade

Phalcon 3.0.3 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

We encourage existing Phalcon 3 users to update to this maintenance version.

<3 Phalcon Team
