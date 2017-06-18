Hello everyone and Happy Father's day!

For our Father's day present, we are extremely happy to announce the release of our newest Phalcon version: 3.2.0.

Our Github issues page has well over 600 issues. However those are mostly New Feature Requests (NFRs), so we started clearing up more and more bugs as well as introducing suggested NFRs. Of course all this would not be feasible without the help of our amazing community: **Thank you**!

### Documentation
Also as part of our goals for Q2, we are releasing our new documentation. We have been working hard to convert all the `rst` files (reStructuredText) to `md` (Markdown) and also have a first pass on identifying inconsistencies and enhancing the documentation. Of course a lot more is needed on that, but it will come in future versions.

We are now using [Crowdin](https://crowdin.com/project/phalcon-documentation) to help contributors translate our documents. The docs website has been updated but still needs a little bit of love with the stylesheet (coming very soon). Also you will note that the site mentions version 3.1; we will fix that this week coming to ensure that every document is properly versioned in Crowdin.

Our new documentation needs admittedly a little bit of fine tuning in terms of the CSS and the menus. This will be done in the upcoming week. Also, we are going through all the documents and ensuring the content is correct and accurate throughout. Examples and new functionality of new releases will also be added from now on, before we release so that the documents are up to date always.

### Release
The release tag can be found here: [3.2.0](https://github.com/phalcon/cphalcon/releases/tag/v3.2.0). The Windows DLLs are in the [releases](https://github.com/phalcon/cphalcon/releases/) Github page.

#### Changelog
- Phalcon will now trigger `E_DEPREACATED` by using `Phalcon\Mvc\Model\Criteria::addWhere`, `Phalcon\Debug::getMajorVersion`, `Phalcon\Dispatcher::setModelBinding`, `Phalcon\Tag::resetInput`, `Phalcon\Mvc\Model\Validator::__construct`
- Added Factory Adapter loaders [#11001](https://github.com/phalcon/cphalcon/issues/11001)
- Added ability to sanitize URL to `Phalcon\Filter`
- Added missed `$type` argument to interface `Phalcon\Mvc\Model\Query\BuilderInterface::join()` to specify type join
- Added `Phalcon\Mvc\Model::hasUpdated` and `Phalcon\Mvc\Model:getUpdatedFields`, way to check if fields were updated after create/save/update
- Added support for having option in `Phalcon\Paginator\Adapter\QueryBuilder` [#12111](https://github.com/phalcon/cphalcon/issues/12111)
- Added `Phalcon\Config::path` to get a value using a dot separated path [#12221](https://github.com/phalcon/cphalcon/issues/12221)
- Added service provider interface to configure services by context [#12783](https://github.com/phalcon/cphalcon/pull/12783)
- Added the ability to load services from yaml (`Phalcon\Di::loadFromYaml`) and php array (`Phalcon\Di::loadFromPhp`) files, so we can keep the references cleanly separated from code [#12784](https://github.com/phalcon/cphalcon/pull/12784)
- Added `Phalcon\Cache\Backend\Apcu` to introduce pure support of APCu [#12098](https://github.com/phalcon/cphalcon/issues/12098), [#11934](https://github.com/phalcon/cphalcon/issues/11934)
- Added `Phalcon\Annotations\Adapter\Apcu` to introduce pure support of APCu [#12098](https://github.com/phalcon/cphalcon/issues/12098)
- Added option to disable snapshot update on create/save using `Phalcon\Mvc\Model::setup(['updateSnapshotOnSave' => false])` or `phalcon.orm.update_snapshot_on_save = 0` in `php.ini`
- Added `Phalcon\Mvc\Model\Manager::setModelPrefix` and `Phalcon\Mvc\Model\Manager::getModelPrefix` to introduce tables prefixes [#10328](https://github.com/phalcon/cphalcon/issues/10328)
- Added methods `Phalcon\Mvc\Model\Query\Builder::andHaving`, `Phalcon\Mvc\Model\Query\Builder::orHaving`, `Phalcon\Mvc\Model\Query\Builder::betweenHaving`, `Phalcon\Mvc\Model\Query\Builder::notBetweenHaving`, `Phalcon\Mvc\Model\Query\Builder::inHaving`, `Phalcon\Mvc\Model\Query\Builder::notInHaving`
- Added parameters `skip_on_insert`, `skip_on_update` and `allow_empty_string` and fixed a bug for renamed integer columns in `Phalcon\Mvc\Model\MetaData\Strategy\Annotations::getMetaData`
- Added way to disable setters in `Phalcon\Mvc\Model::assign` by using `Phalcon\Mvc\Model::setup` or ini option
- Added ability to sanitize special characters to `Phalcon\Filter`
- Added a new `Phalcon\Mvc\Model\Binder::findBoundModel` method. Params fetched from cache are being added to `internalCache`  class property in `Phalcon\Mvc\Model\Binder::getParamsFromCache`
- Added `Phalcon\Mvc\Model\Criteria::createBuilder` to create a query builder from criteria
- Added `dispatcher::beforeForward` event to allow forwarding request to the separated module [#121](https://github.com/phalcon/cphalcon/issues/121), [#12417](https://github.com/phalcon/cphalcon/issues/12417)
- Added `Phalcon\Security\Random:base62` to provide the largest value that can safely be used in URLs without needing to take extra characters into consideration [#12105](https://github.com/phalcon/cphalcon/issues/12105)
- Added `Phalcon\Assets\ResourceInterface`. So now `Phalcon\Assets\Inline` and `Phalcon\Assets\Resource` implements `ResourceInterface`
- Added `Phalcon\Assets\Collection::has` to checks whether the resource is added to the collection or not
- Added `Phalcon\Cli\Dispatcher::getOption`, `Phalcon\Cli\Dispatcher::hasOption` and the options as parameter to cli handlers
- Added `Phalcon\Config\Adapter\Grouped` to allow usage of multiple configuration files/adapters in a simple format [#12884](https://github.com/phalcon/cphalcon/pull/12884)
- Added `DISTINCT` type for `Phalcon\Text::random`
- Added autopadding feature for `Phalcon\Crypt::encryptBase64` and `Phalcon\Crypt::decryptBase64` [#12490](https://github.com/phalcon/cphalcon/issues/12490)
- Fixed Dispatcher forwarding when handling exception [#11819](https://github.com/phalcon/cphalcon/issues/11819), [#12154](https://github.com/phalcon/cphalcon/issues/12154)
- Fixed params view scope for PHP 7 [#12648](https://github.com/phalcon/cphalcon/issues/12648)
- Fixed `Phalcon\Mvc\Micro::handle` to prevent attemps to send response twice [#12668](https://github.com/phalcon/cphalcon/pull/12668)
- Fixed `Di::set`, `Di::setShared` to allow pass more than 10 arguments [#12299](https://github.com/phalcon/cphalcon/issues/12299)
- Fixed `Phalcon\Mvc\Model\MetaData\Strategy\Annotations::getColumnMaps` where only renamed columns where returned if there was one
- Fixed `Phalcon\Mvc\Micro:handle` to correctly handle `before` handlers [#10931](https://github.com/phalcon/cphalcon/pull/10931)
- Fixed `Phalcon\Mvc\Micro:handle` to correctly handle `afterBinding` handlers
- Fixed `Phalcon\Mvc\Model::hasChanged` to correctly use it with arrays [#12669](https://github.com/phalcon/cphalcon/issues/12669)
- Fixed `Phalcon\Mvc\Model\Resultset::delete` to return result depending on success [#11133](https://github.com/phalcon/cphalcon/issues/11133)
- Fixed `Phalcon\Session\Adapter::destroy` to  correctly clear the `$_SESSION` superglobal [#12326](https://github.com/phalcon/cphalcon/pull/12326), [#12835](https://github.com/phalcon/cphalcon/pull/12835)
- Fixed `Phalcon\Assets\Collection:add` to avoid duplication of resources [#10938](https://github.com/phalcon/cphalcon/issues/10938), [#2008](https://github.com/phalcon/cphalcon/issues/2008)
- Fixed `Phalcon\Mvc\View\Engine\Volt::compile` to not throw exception in case of absence the file and `stat` option is true [#12849](https://github.com/phalcon/cphalcon/pull/12849)
- Fixed `Phalcon\Mvc\Collection::getReservedAttributes` to workaround for PHP 7/7.1 bug with static null when extending class [phalcon/incubator#762](https://github.com/phalcon/incubator/issues/762), [phalcon/incubator#760](https://github.com/phalcon/incubator/issues/760)
- Fixed `Phalcon\Cache\Backend\Redis::__construct` and `Phalcon\Cache\Backend\Redis::_connect` to correctly handle the Redis auth option [#12736](https://github.com/phalcon/cphalcon/issues/12736)
- Fixed `Phalcon\Mvc\Collection::getReservedAttributes`, added missing properties to reserved attributes [phalcon/incubator#762](https://github.com/phalcon/incubator/issues/762), [phalcon/incubator#760](https://github.com/phalcon/incubator/issues/760)
- Fixed `Phalcon\Mvc\Router\Annotation::processActionAnnotation` to support PATCH request

### Update/Upgrade
Phalcon 3.2.0 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

##### NOTE: Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.2.0) page. ##### {.alert .alert-danger}

##### PackageCloud will be updated shortly.  ##### {.alert .alert-danger}

We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team

