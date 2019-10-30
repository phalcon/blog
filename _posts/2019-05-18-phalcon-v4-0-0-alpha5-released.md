---
layout: post
title: Phalcon v4.0.0-alpha5 released
date: 2019-05-18T18:50:48.789Z
tags:
  - phalcon
  - phalcon4
  - release
  - alpha
---
The Phalcon Team is happy to announce the release of **v4.0.0 Alpha 5**! [Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.5). 

As always, we cannot thank your community enough! We said this before but it is worth repeating: our community rocks! For this release alone we had **605 commits** and **6,244** files were changed! A lot of the changes were formatting but a great number of them was performance based.
<!--more-->

Phalcon v4 Alpha 5 is the last of our Alpha series. The next release will be a beta one! With the help of our community, we pushed through and are happy to report that with this release we only have 13 cards left in our [project](https://github.com/phalcon/cphalcon/projects/3) and will soon address all those remining issues.

The biggest addition in this release is the [PSR-16](https://www.php-fig.org/psr/psr-16/) Cache implementation. This was a full rewrite for our Cache classes. 

We first introduced `Phalcon\Storage\Serializer`, a set of classes designed to serialize and unserialize data. `Phalcon\Storage\Adapter` contains now a set of classes that connect to potential storages such as `Redis`, `Memcached` etc.

`Phalcon\Cache\Adapters` extends those classes and allows for the storage of any information that needs to be cached or is cached. The main component is `Phalcon\Cache\Cache` and accepts the relevant adapter for your cache.

We have also introduced factory classes to allow for an easier instantiation of the component.

Added more methods to `Phalcon\Helper\Arr` as well as `Phalcon\Helper\Str` for those quick checks we all have in our code and much more!

Thank you again to everyone that has engaged us through social media, as well as our [Discord](https://phalcon.link/discord) server. Our community is the drive that makes Phalcon better with every release.

### Changelog
#### Added
- Added `Phalcon\Cli\Router\Route::setDescription()` to sets the route's description [#13936](https://github.com/phalcon/cphalcon/pull/13936)
- Added `Phalcon\Cli\Router\Route::getDescription()` returns the route's description [#13936](https://github.com/phalcon/cphalcon/pull/13936)
- Added `Phalcon\Image\Adapter\Gd::getVersion()`.
- Added `chunk()`, `first()`, `firstKey()`, `flatten()`, `group()`, `isUnique()`, `last()`, `lastKey()`, `order()`, `pluck()`, `sliceLeft()`, `sliceRight()`, `split()`, `tail()`, `validateAll()`, `validateAny()` to `Phalcon\Helper\Arr` [#13954](https://github.com/phalcon/cphalcon/pull/13954)
- Added `camelize()`, `concat()`, `countVowels()`, `decapitalize()`, `dynamic()`, `endsWith()`, `firstStringBetween()`, `includes()`, `increment()`, `isAnagram()`, `isLower()`, `isPalindrome()`, `isUpper()`, `lower()`, `random()`, `reduceSlashes()`, `startsWith()`, `uncamelize()`, `underscore()`, `upper()` to `Phalcon\Helper\Str` [#13954](https://github.com/phalcon/cphalcon/pull/13954) 
- Added `Phalcon\Mvc\Model\Query\BuilderInterface::getModels()` returns the models involved in the query
- Added `addConnect()`, `addPurge()` and `addTrace()` to `Phalcon\Mvc\Router\Group` and its interface. [#14001](https://github.com/phalcon/cphalcon/pull/14001)
- Added `Phalcon\Mvc\Model\Transaction::throwRollbackException()` which allows a transaction to throw an exception or not on a rollback. [#13949](https://github.com/phalcon/cphalcon/issues/13949)
- Added `Phalcon\Cache\Cache` class implementing PSR-16. Introducing:
    - `Phalcon\Cache\Adapter`   
        - `Phalcon\Cache\Adapter\Apcu`
        - `Phalcon\Cache\Adapter\Libmemcached`
        - `Phalcon\Cache\Adapter\Memory`
        - `Phalcon\Cache\Adapter\Redis`
        - `Phalcon\Cache\Adapter\Stream`
    - `Phalcon\Cache\AdapterFactory`: Factory to create adapters
    - `Phalcon\Cache\CacheFactory`: Factory to create cache objects
 [#13439](https://github.com/phalcon/cphalcon/issues/13439)
- Added `Str::dirSeparator()` to ensure a path has a trailing slash [#13439](https://github.com/phalcon/cphalcon/issues/13439)
- Added assets versioning `Phalcon\Assets\Manager:addCss`, `Phalcon\Assets\Manager::addJs`, `Phalcon\Assets\Collection:addCss`,  `Phalcon\Assets\Collection:addJs` accepts two additional parameters - `version` and `autoVersion`  [#12591](https://github.com/phalcon/cphalcon/pull/12591)
- Added setting `orm.resultset_prefetch_records` instructing the ORM (resultset) to prefetch the rows if the rows returned are less or equal to the setting. [#13387](https://github.com/phalcon/cphalcon/issues/13387)
- Added `Phalcon\Mvc\View::toString()` to return the rendered view as a string [#13825](https://github.com/phalcon/cphalcon/issues/13825)
- Added `Phalcon\Helper\Arr::arrayToObject()` to convert arrays to objects.
- Added `Phalcon\Firewall` component  [#13648](https://github.com/phalcon/cphalcon/issues/13648)
- Added `orm.cast_last_insert_id_to_int` option for `Phalcon\Mvc\Model::setup()` (`castLastInsertIdToInt`) to cast the `lastInsertId` on `save()` to `int` [#13002](https://github.com/phalcon/cphalcon/issues/13002)
- Added `Attributes` collection class like a new Html component [#13646](https://github.com/phalcon/cphalcon/issues/13646)
- Added `Attributes` into `Phalcon\Forms\Form` [#13646](https://github.com/phalcon/cphalcon/issues/13646)

#### Changed
- Refactored `Phalcon\Events\Manager` to only use `SplPriorityQueue` to store events. [#13924](https://github.com/phalcon/cphalcon/pull/13924)
- `Phalcon\Translate\InterpolatorInterface` now only accepts placeholder arrays. [#13939](https://github.com/phalcon/cphalcon/pull/13939)
- `Phalcon\Dispatcher::forward()` and `Phalcon\Dispatcher::setParams()` now require an array as a parameter. [#13935](https://github.com/phalcon/cphalcon/pull/13935)
- CLI Routes with bad class names (eg. `MyApp\\Tasks\\`) now throw an exception instead of suppressing the error. [#13936](https://github.com/phalcon/cphalcon/pull/13936)
- Refactored `Phalcon\Mvc\Collection\Behavior\SoftDelete` and `Phalcon\Mvc\Model\Behavior\SoftDelete`. [#13930](https://github.com/phalcon/cphalcon/pull/13930)
- Model methods that extend Model Manager functionality are now `final`. [#13950](https://github.com/phalcon/cphalcon/pull/13950)
- Changed `Phalcon\Text` to call methods from `Phalcon\Helper\Str` [#13954](https://github.com/phalcon/cphalcon/pull/13954)
- Setting the views directory no longer requires a trailing slash when using Simple View.
- `Phalcon\Mvc\View\Simple::viewParams` is now always an array.
- `Phalcon\Mvc\View\Simple::render()` `params` property is now always an array.
- `Phalcon\Mvc\Model\CriteriaInterface::limit()` now takes `offset` as an integer. [#13977](https://github.com/phalcon/cphalcon/pull/13977)
- Changed `Phalcon\Mvc\Model\Manager::getModelSource()` to use `setModelSource()` internally instead of setting the source manually [#13987](https://github.com/phalcon/cphalcon/pull/13987)
- The property `options` is always an array in `Phalcon\Mvc\Model\Relation`. [#13989](https://github.com/phalcon/cphalcon/pull/13989)
- `Phalcon\Logger\Adapter\AbstractAdapter::process()` is now actually abstract. [#14012](https://github.com/phalcon/cphalcon/pull/14012)
- `Phalcon\Mvc\ModelInterface::getRelated()` return type declaration has changed (not always `ResultsetInterface`) [#14035](https://github.com/phalcon/cphalcon/pull/14035/)
- In `Phalcon\Mvc\Model`, relations fetched using magic methods are now handled by `Phalcon\Mvc\Model::getRelated()` internally.  [#14035](https://github.com/phalcon/cphalcon/pull/14035/)
- Changed `Phalcon\Mvc\Model\Transaction::rollback()` to not throw a transaction by default. [#13949](https://github.com/phalcon/cphalcon/issues/13949)
- Changed `Phalcon\Cache` namespace and relevant classes to handle storing data to different stores. Introducing:
    - `Phalcon\Storage\Serializer` offering classes that implement the `\Serializable` interface.  
        - `Phalcon\Storage\Serializer\Base64` 
        - `Phalcon\Storage\Serializer\Igbinary` 
        - `Phalcon\Storage\Serializer\Json` 
        - `Phalcon\Storage\Serializer\Msgpack` 
        - `Phalcon\Storage\Serializer\None` 
        - `Phalcon\Storage\Serializer\Php` 
        - `Phalcon\Storage\Serializer\SerializerInterface` 
    - `Phalcon\Storage\SerializerFactory`: Factory to create serializers   
    - `Phalcon\Storage\Adapter` offering classes that implement the `Phalcon\Storage\Adapter\AdapterInterface` interface.  
        - `Phalcon\Storage\Adapter\Apcu`
        - `Phalcon\Storage\Adapter\Libmemcached`
        - `Phalcon\Storage\Adapter\Memory`
        - `Phalcon\Storage\Adapter\Redis`
        - `Phalcon\Storage\Adapter\Stream`
    - `Phalcon\Storage\AdapterFactory`: Factory to create adapters
 [#13439](https://github.com/phalcon/cphalcon/issues/13439)
- Changed `Phalcon\Mvc\Model\Query` to not call `numRows` when selecting data  [#13387](https://github.com/phalcon/cphalcon/issues/13387)
- Bind parameters and bind types are now always arrays in `Phalcon\Mvc\Model\Query`.
- Changed `Phalcon\Validation\Validator\Url` to work with passed options. (`FILTER_FLAG_PATH_REQUIRED`, `FILTER_FLAG_QUERY_REQUIRED`) [#13548](https://github.com/phalcon/cphalcon/issues/13548)
- `Phalcon\Mvc\Model\Query\Builder` will now omit offsets if they are set as 0.
- `Phalcon\Mvc\Model\Transaction::__construct()` service parameter must be a string or omitted.
- `Phalcon\Logger\Formatter\Line::__construct()` service parameters must be a string or omitted.
- `Phalcon\Logger\Formatter\Json::__construct()` service parameters must be a string or omitted.
- Removed deprecated code from `Phalcon\Forms\Form::getMessages()`.
- Loading a Module (either MVC or CLI) now throws an exception if the path does not exists regardless of whether the class is already loaded.
- Changed `Phalcon\Crypt` to accept auth tag, tag length and data for "gcm" and "ccm" modes. Removed insecure algorithms with modes: `des*`, `rc2*`, `rc4*`, `des*`, `*ecb` [#13869](https://github.com/phalcon/cphalcon/issues/13869)
- Changed `Phalcon\Mvc\Model` to copy the unset default values from the `MetaData` to the `Model` after a successful insert. [#13781](https://github.com/phalcon/cphalcon/issues/13781)
- Changed `Phalcon\Mvc\Model::findFirst()` now returns `null`. `Phalcon\Mvc\Model::getRelated()` for one to one relationships returns `null` [#14044](https://github.com/phalcon/cphalcon/issues/14044)

#### Fixed
- Fixed `Mvc\Collection::isInitialized()` now works as intended. [#13931](https://github.com/phalcon/cphalcon/pull/13931)
- Update docblocks to show that we can no longer assign properties via `save()` in models (as per #12317). [#13945](https://github.com/phalcon/cphalcon/pull/13945)
- Fixed `Mvc\Model` and `Mvc\ModelInterface` `findFirst` to return `ModelInterface` or `bool` [#13947](https://github.com/phalcon/cphalcon/issues/13947)
- `Phalcon\Acl\Adapter\Memory::dropComponentAccess()` now properly unsets values.
- Volt options 'separator' and 'extension' now work again. [#13971](https://github.com/phalcon/cphalcon/issues/13971)
- Query Builder's `GROUP BY` field is now always an array. [#13962](https://github.com/phalcon/cphalcon/pull/13962)
- Renamed `Phalcon\Paginator\Adapter::getPaginate()` to `paginate()` in documentation/tests (originally renamed in 4.0.0-alpha.1). [#13973](https://github.com/phalcon/cphalcon/pull/13973)
- Fixed the exception message in `Phalcon\Security::computeHmac()` by removing `"%s"` from output.
- `Phalcon\Mvc\Model\Relation::isForeignKey()` now returns false if the `foreignKey` option is set to `false`.
- Fixed `Phalcon\Flash\Session::output()` not to throw an exception when there are no messages stored in session. [#14023](https://github.com/phalcon/cphalcon/issues/14023)
- Fixed `Phalcon\Config\Adapter\Ini()` to handle arrays correctly in .ini files. [#14025](https://github.com/phalcon/cphalcon/issues/14025)
- Fixed non-reusable relations in `Phalcon\Mvc\Model`, now returning fresh records. [#13531](https://github.com/phalcon/cphalcon/issues/13531)
- `Phalcon\Mvc\Model::isRelationshipLoaded()` is now working for every type of relations. [#14035](https://github.com/phalcon/cphalcon/pull/14035)
- Fixed `Phalcon\Mvc\Model::writeAttribute()` to handle associative arrays correctly. [#14021](https://github.com/phalcon/cphalcon/issues/14021)
- Fixed `Phalcon\Html\Tag::appendTitle()` and `Phalcon\Html\Tag::prependTitle()`to mirror `Phalcon\Tag`. [#14039](https://github.com/phalcon/cphalcon/issues/14039)
- Fixed `Phalcon\Validation::validate()` with `cancelOnFail`. The validator will validate all elements and will stop processing validators on a per element basis if `cancelOnFail` is present. [#13149](https://github.com/phalcon/cphalcon/issues/13149)
- Fixed `Phalcon\Mvc\Models\Manager::getRelations()` to return the many-to-many relationships also. [#10839](https://github.com/phalcon/cphalcon/issues/10839)
- Fixed `Phalcon\Validation\Validator\Numericality::validate()` to parse non `en` locale numbers. [#13843](https://github.com/phalcon/cphalcon/issues/13843)
- Fixed `Phalcon\Mvc\Model::save()` failing after a successful insert when default database fields are not updated. [#13781](https://github.com/phalcon/cphalcon/issues/13781)

#### Removed
- Removed `arrayHelpers` property from the Volt compiler. [#13925](https://github.com/phalcon/cphalcon/pull/13925)
- Removed legacy (PHP <5.5) code from GD image adapter.
- Removed support for HTTP_CONTENT_TYPE header (a bug in PHP 5). [#14013](https://github.com/phalcon/cphalcon/pull/14013)
- Removed `Mvc\Model\MetaData\Session` adapter (no longer supported) [#13439](https://github.com/phalcon/cphalcon/pull/13439)
- Removed `Phalcon\Cache`, `Phalcon\Cache\Backend`, `Phalcon\Cache\BackendInterface`, `Phalcon\Cache\Backend\Apcu`, `Phalcon\Cache\Backend\Factory`, `Phalcon\Cache\Backend\File`, `Phalcon\Cache\Backend\Libmemcached`, `Phalcon\Cache\Backend\Memory`, `Phalcon\Cache\Backend\Mongo`, `Phalcon\Cache\Backend\Redis`, `Phalcon\Cache\Frontend`, `Phalcon\Cache\Frontend\Base64`, `Phalcon\Cache\Frontend\Data`, `Phalcon\Cache\Frontend\Factory`, `Phalcon\Cache\Frontend\Igbinary`, `Phalcon\Cache\Frontend\Json`, `Phalcon\Cache\Frontend\Msgpack`, `Phalcon\Cache\Frontend\None`, `Phalcon\Cache\Frontend\Output`, `Phalcon\Cache\FrontendInterface`, `Phalcon\Cache\Multiple` [#13439](https://github.com/phalcon/cphalcon/issues/13439)
- Removed caching from the view (simple/view)
    - `Phalcon\Mvc\View::cache()`
    - `Phalcon\Mvc\View::getCache()`
    - `Phalcon\Mvc\View\Simple::cache()`
    - `Phalcon\Mvc\View\Simple::getCache()`
[#13439](https://github.com/phalcon/cphalcon/issues/13439)
- Removed multiple Cache Adapter `Phalcon\Cache\Multiple` [#13439](https://github.com/phalcon/cphalcon/issues/13439)
- Removed old cache classes
    - `Phalcon\Cache\Backend`
    - `Phalcon\Cache\BackendInterface`
    - `Phalcon\Cache\Backend\Apcu`
    - `Phalcon\Cache\Backend\Factory`
    - `Phalcon\Cache\Backend\File`
    - `Phalcon\Cache\Backend\Libmemcached`
    - `Phalcon\Cache\Backend\Memory`
    - `Phalcon\Cache\Backend\Mongo`
    - `Phalcon\Cache\Backend\Redis`
    - `Phalcon\Cache\Frontend`
    - `Phalcon\Cache\FrontendInterface`
    - `Phalcon\Cache\Frontend\Base64`
    - `Phalcon\Cache\Frontend\Data`
    - `Phalcon\Cache\Frontend\Factory`
    - `Phalcon\Cache\Frontend\Igbinary`
    - `Phalcon\Cache\Frontend\Json`
    - `Phalcon\Cache\Frontend\Msgpack`
    - `Phalcon\Cache\Frontend\None`
    - `Phalcon\Cache\Frontend\Output`
[#13439](https://github.com/phalcon/cphalcon/issues/13439)
- Removed model namespace aliases.

### Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-alpha5. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha.5).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalcon.io/4.0/en/installation).

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.link/discord) or our [Forum](https://phalcon.link/forum).


<3 Phalcon Team
