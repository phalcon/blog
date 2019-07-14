---
layout: post
title: Phalcon v4.0.0-beta1 released
date: 2019-07-14T20:04:10.114Z
tags:
  - phalcon
  - phalcon4
  - release
  - beta
---
The Phalcon Team is happy to announce the release of **v4.0.0 Beta 1**! [Github Tag](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-beta.1). 

As always, we cannot thank your community enough! We said this before but it is worth repeating: our community rocks! For this release alone we had **369 commits** and **2,787,950** additions and **2,690,303** deletions! A lot of the changes were formatting, tests as well as refactoring.
<!--more-->

Phalcon v4 Beta 1 is one step closer to our stable release. As mentioned in our previous blog post, we have a handful of cards left for this release and we are focusing on documentation as well as the sample applications now.

You can see the remaining cards for v4 in our [project](https://github.com/phalcon/cphalcon/projects/3) page. 

Also rewriting and reviewing the documentation can be tracked in this issue. 

[https://github.com/phalcon/docs/issues/2322](https://github.com/phalcon/docs/issues/2322)

Some highlights:
- Prefixed (almost all) abstract classes with `Abstract`
- Introduced many more factory classes for components
- Aligned interfaces
- Moved classes to their natural namespaces (i.e. `Adapter*` classes are now in the `Adapter\*` namespace
- Fixed 20 bugs
- Removed `__set_state()` from classes that implemented it.

Thank you again to everyone that has engaged us through social media, as well as our [Discord](https://phalcon.link/discord) server. Our community is the drive that makes Phalcon better with every release.

### Changelog
## Added
- Added `Phalcon\Factory\Exception` for factory exceptions. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Added `Phalcon\Filter\FilterInterface` for custom filter implementations. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Added `Phalcon\Db\Adapter\PdoFactory`: Factory to create PDO adapters. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Added `Phalcon\Image\ImageFactory`: Factory to create image adapters. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Added `Phalcon\Logger\LoggerFactory`: Factory to create logger objects. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Added `Phalcon\Translate\InterpolatorFactory`: Factory to create interpolator objects. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Added `Phalcon\Translate\TranslateFactory`: Factory to create translate objects. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Added `Phalcon\Domain\Payload` to help in transferring messages between layers of the application. [#14123](https://github.com/phalcon/cphalcon/issues/14123)
- Added `Phalcon\Domain\PayloadFactory`: Factory to create payload objects. [#14123](https://github.com/phalcon/cphalcon/issues/14123)
- Added `Phalcon\Http\Message\ServerRequestFactory::load`: Method to create a `ServerRequest` object from globals. [#14154](https://github.com/phalcon/cphalcon/pull/14154)
- Added `saslAuthData` as option to `Phalcon\Storage\Adapter\Libmemcached` to authenticate using SASL [#13394](https://github.com/phalcon/cphalcon/issues/13394)
- Added `Phalcon\Collection\ReadOnly`: Read only collection. [#14154](https://github.com/phalcon/cphalcon/pull/14154)
- Added `whiteList()` to `Phalcon\Helper\Arr` [#13954](https://github.com/phalcon/cphalcon/pull/13954)
- Added `Phalcon\Config\ConfigFactory::newInstance()`: Factory to create config objects. [#13201](https://github.com/phalcon/cphalcon/issues/13201), [#13768](https://github.com/phalcon/cphalcon/issues/13768)
- Added `Phalcon\Db\Enum` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Added `Phalcon\Dispatcher\Exception` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 

## Changed
- Renamed `Phalcon\Annotations\Adapter\Files` to `Phalcon\Annotations\Adapter\Stream`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Annotations\Adapter` to `Phalcon\Annotations\Adapter\AbstractAdapter`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Annotations\AdapterInterface` to `Phalcon\Annotations\Adapter\AdapterInterface`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Annotations\Factory` to `Phalcon\Annotations\AnnotationsFactory`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Config\Factory` to `Phalcon\Config\ConfigFactory`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Filter\FilterLocator` to `Phalcon\Filter`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Filter\FilterLocatorFactory` to `Phalcon\Filter\FilterFactory`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Image\Adapter` to `Phalcon\Image\Adapter\AbstractAdapter`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Image\AdapterInterface` to `Phalcon\Image\Adapter\AdapterInterface`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Paginator\Adapter` to `Phalcon\Paginator\Adapter\AbstractAdapter`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Paginator\AdapterInterface` to `Phalcon\Paginator\Adapter\AdapterInterface`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Paginator\Factory` to `Phalcon\Paginator\PaginatorFactory`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Translate\Adapter` to `Phalcon\Translate\Adapter\AbstractAdapter`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Renamed `Phalcon\Translate\AdapterInterface` to `Phalcon\Translate\Adapter\AdapterInterface`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- `Phalcon\Plugin` is now abstract.
- Moved `method` parameter in `Phalcon\Mvc\Model\Manager::getRelationRecords()` to the last position. [#14115](https://github.com/phalcon/cphalcon/issues/14115)
- Moved `method` parameter in `Phalcon\Mvc\Model\Manager::getBelongsToRecords()` to the last position. [#14115](https://github.com/phalcon/cphalcon/issues/14115)
- Moved `method` parameter in `Phalcon\Mvc\Model\Manager::getHasOneRecords()` to the last position. [#14115](https://github.com/phalcon/cphalcon/issues/14115)
- Moved `method` parameter in `Phalcon\Mvc\Model\Manager::getHasManyRecords()` to the last position. [#14115](https://github.com/phalcon/cphalcon/issues/14115)  
- Validator messages were moved into each validator. [#13208](https://github.com/phalcon/cphalcon/issues/13208)  
- `Phalcon\Paginator\Repository::getProperty()` now uses `Phalcon\Helper\Arr::get()`.
- Refactored `Phalcon\Collection` to allow conditional key case sensitivity. [#14154](https://github.com/phalcon/cphalcon/pull/14154)
- Refactored `Phalcon\Registry` to align with the `Phalcon\Collection` interface. [#14154](https://github.com/phalcon/cphalcon/pull/14154)
- `Phalcon\Mvc\Micro::setModelBinder()` now uses the Factory Default DI if none is set. [#14171](https://github.com/phalcon/cphalcon/pull/14171)
- `Phalcon\Mvc\Model\ValidationFailed` now works with `ModelInterface`.
- Refactored `Phalcon\Config` to extend `Phalcon\Collection` [#13201](https://github.com/phalcon/cphalcon/issues/13201), [#13768](https://github.com/phalcon/cphalcon/issues/13768)
- Renamed `Phalcon\Config` to extend `Phalcon\Config\Config` [#13201](https://github.com/phalcon/cphalcon/issues/13201), [#13768](https://github.com/phalcon/cphalcon/issues/13768) 
- Renamed `Phalcon\Acl` to  `Phalcon\Acl\Enum` [#14213](https://github.com/phalcon/cphalcon/issues/14213)  
- Renamed `Phalcon\Acl\Adapter` to `Phalcon\Acl\Adapter\AbstractAdapter` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Acl\AdapterInterface` to `Phalcon\Acl\Adapter\AdapterInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Application` to `Phalcon\Application\AbstractApplication` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\CryptInterface` to `Phalcon\Crypt\CryptInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Db\Adapter` to `Phalcon\Db\Adapter\AbstractAdapter` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Db\AdapterInterface` to `Phalcon\Db\Adapter\AdapterInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Db` to `Phalcon\Db\AdapterDb` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Db\Adapter\Pdo` to `Phalcon\Db\Adapter\Pdo\AbstractPdo` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Dispatcher` to `Phalcon\Dispatcher\AbstractDispatcher` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\DispatcherInterface` to `Phalcon\Dispatcher\DispatcherInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\EscaperInterface` to `Phalcon\Escaper\EscaperInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Firewall\Adapter` to `Phalcon\Firewall\Adapter\AbstractAdapter` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Firewall\AdapterInterface` to `Phalcon\Firewall\Adapter\AdapterInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Flash` to `Phalcon\Flash\AbstractFlash` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\FlashInterface` to `Phalcon\Flash\FlashInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Forms\Element` to `Phalcon\Forms\Element\AbstractElement` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Forms\ElementInterface` to `Phalcon\Forms\Element\ElementInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Image` to `Phalcon\Image\Enum` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Mvc\View\Engine` to `Phalcon\Mvc\View\Engine\AbstractEngine` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Mvc\View\EngineInterface` to `Phalcon\Mvc\View\Engine\EngineInterface` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\UrlInterface` to `Phalcon\Url\UrlInterface` 
- Renamed `Phalcon\Validator` to `Phalcon\Validator\Validator` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Validator\Validator` to `Phalcon\Validator\AbstractValidator` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Validator\ValidatorComposite` to `Phalcon\Validator\AbstractValidatorComposite` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Validator\CombinedFieldsValidator` to `Phalcon\Validator\AbstractCombinedFields` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 
- Renamed `Phalcon\Validator\Validator\File\FileAbstract` to `Phalcon\Validator\Validator\File\AbstractFile` [#14213](https://github.com/phalcon/cphalcon/issues/14213) 

## Fixed
- Fixed `Phalcon\Mvc\View::getRender()` to call `view->finish()` instead of `ob_end_clean()`. [#14095](https://github.com/phalcon/cphalcon/issues/14095)
- Fixed `Phalcon\Cache\Adapter\Libmemcached` failing to set values when `Phalcon\Mvc\Model\MetaData\Libmemcached` was in use. [#14100](https://github.com/phalcon/cphalcon/issues/14100)
- Fixed `Phalcon\Db\Column` to recognize `tinyint`, `smallint`, `mediumint`, `integer` as valid autoIncrement columns. [#14102](https://github.com/phalcon/cphalcon/issues/14102)
- Fixed `method` parameter in `Phalcon\Mvc\Model\Manager::getRelationRecords()`, it's not always a string, null by default. [#14115](https://github.com/phalcon/cphalcon/issues/14115)
- Fixed `method` parameter in `Phalcon\Mvc\Model\Manager::getBelongsToRecords()`, it's not always a string, null by default. [#14115](https://github.com/phalcon/cphalcon/issues/14115)
- Fixed `method` parameter in `Phalcon\Mvc\Model\Manager::getHasOneRecords()`, it's not always a string, null by default. [#14115](https://github.com/phalcon/cphalcon/issues/14115)
- Fixed `method` parameter in `Phalcon\Mvc\Model\Manager::getHasManyRecords()`, it's not always a string, null by default. [#14115](https://github.com/phalcon/cphalcon/issues/14115)
- Fixed `handlers` property in `Phalcon\Mvc\Micro\Collection` to now always an array.
- Fixed crash in `Phalcon\Mvc\Model::save()` when saving a circular model relation. [#13354](https://github.com/phalcon/cphalcon/pull/13354)
- Fixed `Phalcon\Db\Dialect\Postgresql::truncateTable()` to now escape table names. [#14125](https://github.com/phalcon/cphalcon/pull/14125)
- Fixed `Phalcon\Mvc\Model\MetaData::write()` to throw an exception if `orm.exception_on_failed_metadata_save` is set to true. [#13433](https://github.com/phalcon/cphalcon/issues/13433)
- Fixed `Phalcon\Image\Adapter\Gd` to throw an error with `imagecolorat`. [#14139](https://github.com/phalcon/cphalcon/issues/14139)
- `Phalcon\Mvc\Model\Criteria::limit()` now corrects negative offsets.
- `Phalcon\Di\FactoryDefault\Cli` can now use the new Filter system.
- Fixed `Phalcon\Mvc\Router` now parses and uses path. [#14087](https://github.com/phalcon/cphalcon/issues/14087)
- Fixed various areas in `Phalcon\Acl\Adapter` and `Phalcon\Acl\Adapter\Memory` including comments, logic, `denyComponentAccess` and `AdapterInterface`. Added tests. [#13870](https://github.com/phalcon/cphalcon/issues/13870)
- Fixed `Phalcon\Config::merge()` not merging numeric values properly [#13201](https://github.com/phalcon/cphalcon/issues/13201), [#13768](https://github.com/phalcon/cphalcon/issues/13768)
- Fixed `Phalcon\Validation\Validator\File\AbstractFile` missing the resolution of the `value` property [#14198](https://github.com/phalcon/cphalcon/issues/14198)
- Fixed `Phalcon\Storage\Adapter\Stream` [#14190](https://github.com/phalcon/cphalcon/issues/14190)
- `Phalcon\Form\Form::clear()` now correctly clears single fields. [#14217](https://github.com/phalcon/cphalcon/issues/14217)
- Fixed `Phalcon\Form\Form::getValue()` not to call `getAttributes()` when an element is named "attributes" [#14226](https://github.com/phalcon/cphalcon/issues/14226)
- Fixed `Phalcon\Model::delete()` array to string conversion [#14080](https://github.com/phalcon/cphalcon/issues/14080)
- Fixed segfault in `Phalcon\Mvc\Micro\LazyLoader::callMethod()` when handler contains syntax error.

## Removed
- Removed `Phalcon\Session\Factory`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Removed `Phalcon\Factory` and `Phalcon\FactoryInterface`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Removed `Phalcon\Translate`. [#13672](https://github.com/phalcon/cphalcon/issues/13672)
- Removed `Phalcon\Db\Column::getSchemaName()` as its not relevant or settable.
- Removed `Phalcon\Config::__set_state()` as it does not serve any purpose and skipped the constructor. [#13201](https://github.com/phalcon/cphalcon/issues/13201), [#13768](https://github.com/phalcon/cphalcon/issues/13768)
- Removed `Phalcon\Annotations\Reflection::__set_state()`, `Phalcon\Db\ColumnInterface::__set_state()`, `Phalcon\Db\Column::__set_state()`, `Phalcon\Db\IndexInterface::__set_state()`, `Phalcon\Db\Index::__set_state()`, `Phalcon\Db\ReferenceInterface::__set_state()`, `Phalcon\Db\Reference::__set_state()`, `Phalcon\Di\ServiceInterface::__set_state()`, `Phalcon\Di\Service::__set_state()`, `Phalcon\Http\Response\HeadersInterface::__set_state()`, `Phalcon\Http\Response\Headers::__set_state()`, `Phalcon\Http\Request::__set_state()`, `Phalcon\Messages\Message::__set_state()` [#14212](https://github.com/phalcon/cphalcon/issues/14212)

> Did you know that you can now add comments to our documentation as well as our blog posts?
{: .alert .alert-warning }

### Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You will need to use the `mainline` repository to install v4.0.0-beta1. You can also download the zip file, as well as DLLs for Windows, from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-beta.1).

You can also clone the repository and checkout the tag, and then run

```bash
zephir fullclean
zephir build
```

to install the new extension. Detailed installation instructions can be found in our [documentation page](https://docs.phalconphp.com/4.0/en/installation).

> Note: It might take a bit of time for the DEB and RPM packages to be built from when this blog post is published.
{: .alert .alert-info }

### Thank you
Once again a huge thank you to all of our contributors! You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues](https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord server](https://phalcon.link/discord) or our [Forum](https://phalcon.link/forum).


<3 Phalcon Team
