---
layout: post
title: "Merry Christmas and Phalcon v4.0.0-alpha1 released"
date: 2018-12-25T16:23:19.160Z
tags: 
  - php
  - phalcon
  - release
  - phalcon4
image: '/assets/files/2017-12-24-christmas.jpg'
---
The Phalcon Team wishes all of our friends, contributors, developers and users of the framework a Merry Christmas!. We hope that the new year will bring health and happiness to you and your loved ones!

After months of work on v4 (most of them long nights), we are happy to announce the release of Phalcon **v4.0.0 Alpha 1** as a small gift to our friends and community for this joyous day.
<!--more-->
First and foremost:

<h5 class="alert alert-warning">
<strong>A huge thank you to all of our contributors and the community!!</strong>
</h5>

Second and equally important:

<h5 class="alert alert-danger">
<strong>This release IS NOT BACKWARDS COMPATIBLE - YOU WILL NEED TO REFACTOR YOUR EXISTING APPLICATIONS</strong>
</h5>

<h5 class="alert alert-danger">
    <strong>YOU NEED TO LOAD THE PSR EXTENSION BEFORE THE PHALCON ONE [<a href="https://github.com/jbboehr/php-psr.git">REPO</a></strong>]
</h5>


The release tag can be found here: [v4.0.0-alpha1](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha1). 

We still have a lot of work ahead of us until v4 is marked as stable. The project page that we keep the status of the work we have done and need to do can be found [here](https://github.com/phalcon/cphalcon/projects/3). As you can see there are a few bugs that we need to address but also a couple of big items that require significant refactoring. 

Some highlights of this version include:
- Minimum supported version for PHP is 7.2
- Much tighter interfaces and typed parameters/return types
- Corrected a lot of inconsistencies in interfaces and implementation classes
- PSR-3 : Logger has been rewritten from the ground up
- PSR-11 : Container implementation (will be rewritten in a future version)
- PSR-16 : Todo for now. It will be available in the next version
- More code coverage, setup local testing environment and more.

#### Changelog
## THIS RELEASE IS NOT BACKWARDS COMPATIBLE ##

## Added
- Added [CODE_OF_CONDUCT](https://github.com/phalcon/cphalcon/blob/master/CODE_OF_CONDUCT.md) for the project
- Added `Phalcon\Db\Adapter\Pdo\Postgresql::describeReferences` to implement custom Postgresql rules [438](https://github.com/phalcon/phalcon-devtools/issues/438)
- Added `Phalcon\Mvc\Router\RouteInterface::convert` so that calling `Phalcon\Mvc\Router\Group::add` will return an instance that has `convert` method [#13380](https://github.com/phalcon/cphalcon/issues/13380)
- Added `Phalcon\Mvc\ModelInterface::getModelsMetaData` [#13070](https://github.com/phalcon/cphalcon/issues/13402)
- Added `Phalcon\Validation\Validator\Ip`, class used to validate ip address fields. It allows to validate a field selecting IPv4 or IPv6, allowing private or reserved ranges and empty values if necessary. [#13574](https://github.com/phalcon/cphalcon/pull/13574)
- Added `Phalcon\Messages\MessageInterface`, `Phalcon\Messages\Message`, `Phalcon\Messages\Exception` and `Phalcon\Messages\Messages` to handle all messages for the application (model/validation) [#13114](https://github.com/phalcon/cphalcon/issues/13114)
- Added `getHandlerSuffix()`, `setHandlerSuffix()` in Dispatcher, `getTaskSuffix()`, `setTaskSuffix()` in the CLI Dispatcher [#13468](https://github.com/phalcon/cphalcon/issues/13468)
- Added ability to set a custom template for the Flash Messenger. [#13445](https://github.com/phalcon/cphalcon/issues/13445)
- Added `forUpdate` in the Sqlite dialect to override the method from the base dialect. [#13539](https://github.com/phalcon/cphalcon/issues/13539)
- Added `TYPE_ENUM` in the Mysql adapter. [#11368](https://github.com/phalcon/cphalcon/issues/11368)
- Added more column types for the Mysql adapter. The adapter supports `TYPE_BIGINTEGER`, `TYPE_BIT`, `TYPE_BLOB`, `TYPE_BOOLEAN`, `TYPE_CHAR`, `TYPE_DATE`, `TYPE_DATETIME`, `TYPE_DECIMAL`, `TYPE_DOUBLE`, `TYPE_ENUM`, `TYPE_FLOAT`, `TYPE_INTEGER`, `TYPE_JSON`, `TYPE_JSONB`, `TYPE_LONGBLOB`, `TYPE_LONGTEXT`, `TYPE_MEDIUMBLOB`, `TYPE_MEDIUMINTEGER`, `TYPE_MEDIUMTEXT`, `TYPE_SMALLINTEGER`, `TYPE_TEXT`, `TYPE_TIME`, `TYPE_TIMESTAMP`, `TYPE_TINYBLOB`, `TYPE_TINYINTEGER`, `TYPE_TINYTEXT`, `TYPE_VARCHAR`  [#13151](https://github.com/phalcon/cphalcon/issues/13151), [#12223](https://github.com/phalcon/cphalcon/issues/12223), [#524](https://github.com/phalcon/cphalcon/issues/524), [#13225](https://github.com/phalcon/cphalcon/pull/13225) [@zGaron](https://github.com/zGaron), [#12523](https://github.com/phalcon/cphalcon/pull/12523) [@Studentsov](https://github.com/Studentsov), [#12471](https://github.com/phalcon/cphalcon/pull/12471) [@ruudboon](https://github.com/ruudboon)
- Added `Phalcon\Acl\Adapter\Memory::addRole` support multiple inherited [#13557](https://github.com/phalcon/cphalcon/pull/13557)
- Added `Phalcon\Tag::renderTitle()` that renders the title enclosed in `<title>` tags. [#13547](https://github.com/phalcon/cphalcon/issues/13547)
- Added `hasHeader()` method to `Phalcon\Http\Response` to provide the ability to check if a header exists. [#12189](https://github.com/phalcon/cphalcon/pull/12189)
- Added global setting `orm.case_insensitive_column_map` to attempt to find value in the column map case-insensitively. Can be also enabled by setting `caseInsensitiveColumnMap` key in `\Phalcon\Mvc\Model::setup()`. [#11802](https://github.com/phalcon/cphalcon/pull/11802)
- Added the ability to use FrontendInterface to serialize Model and ResultSet - Inject a `serializer` object which implements `FrontendInterface` in DI to use it. [#12808](https://github.com/phalcon/cphalcon/pull/12888)
- Added `Phalcon\Mvc\Model\Query\BuilderInterface::offset` [#13599](https://github.com/phalcon/cphalcon/pull/13599)
- Added `Phalcon\Http\Response\Cookies::getCookies` [#13591](https://github.com/phalcon/cphalcon/pull/13591)
- Added `Phalcon\Mvc\Model::isRelationshipLoaded` to check if relationship is loaded [#12772](https://github.com/phalcon/cphalcon/pull/12772)
- Added an easy way to work with Phalcon and run the tests locally, using [nanobox.io](https://nanobox.io) [#13578](https://github.com/phalcon/cphalcon/issues/13578)
- Added response handler to `Phalcon\Mvc\Micro`, `Phalcon\Mvc\Micro::setResponseHandler`, to allow use of a custom response handler. [#12452](https://github.com/phalcon/cphalcon/pull/12452)
- Added two new events `response::beforeSendHeaders` and `response::afterSendHeaders` to `Phalcon\Http\Response` [#10689](https://github.com/phalcon/cphalcon/issues/10689)
- Added a retainer for the current token to be used during the checkings, so when `Phalcon\Security::getToken` is called the token used for checkings don't change. [#12392](https://github.com/phalcon/cphalcon/issues/12392)
- Added `Phalcon\Html\Tag`, a component that creates HTML elements. It will replace `Phalcon\Tag` in a future version. This component does not use static method calls. [#12392](https://github.com/phalcon/cphalcon/issues/12392)
- Added `Phalcon\Paginator\RepositoryInterface` for repository the current state of `paginator` and also optional sets the aliases for properties repository [#10985](https://github.com/phalcon/cphalcon/pull/10985), [#10957](https://github.com/phalcon/cphalcon/issues/10957)
- Added bind support to `Phalcon\Mvc\Model\Query\Builder`. The Query Builder has the same methods as `Phalcon\Mvc\Model\Query`; `getBindParams`, `setBindParams`, `getBindTypes` and `setBindTypes`. [#13368](https://github.com/phalcon/cphalcon/issues/13368)
- Added `Phalcon\Html\Breadcrumbs`, a component that creates HTML code for breadcrumbs. [#13680](https://github.com/phalcon/cphalcon/issues/13680)
- Added more methods to interfaces. 
    - `Phalcon\Cli\Router\RouteInterface` - `delimiter`, `getDelimiter`                        
    - `Phalcon\Cli\DispatcherInterface` - `setOptions`, `getOptions`
    - `Phalcon\Db\AdapterInterface` - `fetchColumn`, `insertAsDict`, `updateAsDict`                              
    - `Phalcon\Db\DialectInterface` - `registerCustomFunction`, `getCustomFunctions`, `getSqlExpression`                              
    - `Phalcon\Di\ServiceInterface` - `getParameter`, `isResolved`
    - `Phalcon\Events\ManagerInterface` - `hasListeners`                          
    - `Phalcon\Mvc\Model\Query\BuilderInterface` - `distinct`, `getDistinct`, `forUpdate`, `offset`, `getOffset`                 
    - `Phalcon\Mvc\Model\Transaction\ManagerInterface` - `setDbService`, `getDbService`, `setRollbackPendent`, `getRollbackPendent`           
    - `Phalcon\Mvc\Model\CriteriaInterface` - `distinct`, `leftJoin`, `innerJoin`, `rightJoin`, `groupBy`, `having`, `cache`, `getColumns`, `getGroupBy`, `getHaving`, 
    - `Phalcon\Mvc\Model\ManagerInterface` - `isVisibleModelProperty`, `keepSnapshots`, `isKeepingSnapshots`, `useDynamicUpdate`, `isUsingDynamicUpdate`, `addHasManyToMany`, `existsHasManyToMany`, `getRelationRecords`, `getHasManyToMany`, `registerNamespaceAlias`, `getNamespaceAlias`                       
    - `Phalcon\Mvc\Model\MessageInterface` - `setModel`, `getModel`, `setCode`, `getCode`                       
    - `Phalcon\Mvc\Model\QueryInterface` - `getSingleResult`, `setBindParams`, `getBindParams`, `setBindTypes`, `setSharedLock`, `getBindTypes`, `getSql`                         
    - `Phalcon\Mvc\Model\RelationInterface` - `getParams`
    - `Phalcon\Mvc\Model\ResultsetInterface` - `setHydrateMode`, `getHydrateMode`, `getMessages`, `update`, `delete`, `filter`
    - `Phalcon\Mvc\ModelInterface` - `getModelsMetaData`
    - `Phalcon\Session\AdapterInterface` - `setId`, `status`
    - `Phalcon\Validation\MessageInteraface` - `getCode`, `setCode`                     
    - `Phalcon\CryptInterface` - `setPadding`
    - `Phalcon\Mvc\RouterInterface` - `attach` [#12676](https://github.com/phalcon/cphalcon/issues/12676)
- Added `Phalcon\Container`, a proxy container class to the `Phalcon\DI` implementing PSR-11 [#12295](https://github.com/phalcon/cphalcon/issues/12295)
- Added `Phalcon\Acl\Adapter\Memory::getActiveKey`, `Phalcon\Acl\Adapter\Memory::activeFunctionCustomArgumentsCount` and `Phalcon\Acl\Adapter\Memory::getActiveFunction` to get latest key, number of custom arguments, and function used to acquire access [#12547](https://github.com/phalcon/cphalcon/pull/12547)

## Changed
- Now Phalcon requires the [PSR PHP extension](https://github.com/jbboehr/php-psr) to be installed and enabled
- By configuring `prefix` and `statsKey` the `Phalcon\Cache\Backend\Redis::queryKeys` no longer returns prefixed keys, now it returns original keys without prefix. [#13656](https://github.com/phalcon/cphalcon/pull/13656)
- The `Phalcon\Mvc\Application`, `Phalcon\Mvc\Micro` and `Phalcon\Mvc\Router` now must have a URI to process [#12380](https://github.com/phalcon/cphalcon/pull/12380)
- Response headers and cookies are no longer prematurely sent [#12378](https://github.com/phalcon/cphalcon/pull/12378)
- You can no longer assign data to models whilst saving them [#12317](https://github.com/phalcon/cphalcon/issues/12317)
- The `Phalcon\Mvc\Model\Manager::load` no longer reuses already initialized models [#12317](https://github.com/phalcon/cphalcon/issues/12317)
- Changed `Phalcon\Db\Dialect\Postgresql::describeReferences` to generate correct SQL, added "on update" and "on delete" constraints [438](https://github.com/phalcon/phalcon-devtools/issues/438)
- Changed catch `Exception` to `Throwable` [#12288](https://github.com/phalcon/cphalcon/issues/12288)
- Changed `Phalcon\Mvc\Model\Query\Builder::addFrom` to remove third parameter `$with` [#13109](https://github.com/phalcon/cphalcon/pull/13109)
- `Phalcon\Forms\Form::clear` will no longer call `Phalcon\Forms\Element::clear`, instead it will clear/set default value itself, and `Phalcon\Forms\Element::clear` will now call `Phalcon\Forms\Form::clear` if it's assigned to the form, otherwise it will just clear itself. [#13500](https://github.com/phalcon/cphalcon/pull/13500)
- `Phalcon\Forms\Form::getValue` will now also try to get the value by calling `Tag::getValue` or element's `getDefault` method before returning `null`, and `Phalcon\Forms\Element::getValue` calls `Tag::getDefault` only if it's not added to the form. [#13500](https://github.com/phalcon/cphalcon/pull/13500)
- Changed `Phalcon\Mvc\Model` to use the `Phalcon\Messages\Message` object for its messages [#13114](https://github.com/phalcon/cphalcon/issues/13114)
- Changed `Phalcon\Validation\*` to use the `Phalcon\Messages\Message` object for its messages [#13114](https://github.com/phalcon/cphalcon/issues/13114)
- Collections now use the Validation component [#12376](https://github.com/phalcon/cphalcon/pull/12376)
- Made the `specialKey` (`_PHCR`) optional for the `Phalcon\Cache\Backend\Redis` adapter [#10905](https://github.com/phalcon/cphalcon/issues/10905), [#11608](https://github.com/phalcon/cphalcon/pull/11608)
- Refactored `Phalcon\Db\Adapter\Pdo::query` to use PDO's prepare and execute. `Phalcon\Db\Adapter::fetchAll` to use PDO's fetchAll [#13515](https://github.com/phalcon/cphalcon/pull/13515)
- Fixed  `\Phalcon\Http\Response::setFileToSend` filename last much _ [#13496](https://github.com/phalcon/cphalcon/pull/13496)
- Changed `Phalcon\Tag::getTitle`. It returns only the text. It accepts `prepend`, `append` booleans to prepend or append the relevant text to the title. [#13547](https://github.com/phalcon/cphalcon/issues/13547) 
- Changed `Phalcon\Di\Service` constructor to no longer takes the name of the service. [#13590](https://github.com/phalcon/cphalcon/pull/13590)
- Changed `Phalon\Tag::textArea` to use `htmlspecialchars` to prevent XSS injection. [#12428](https://github.com/phalcon/cphalcon/issues/12428)
- Changed `Phalon\Cache\Backend\*::get` to use only positive numbers for `lifetime` [11759](https://github.com/phalcon/cphalcon/issues/11759)
- Changed `Phalcon\Logger` to comply with PSR-3. The component has been rewritten to use adapters that allow logging to different areas. The [#13438](https://github.com/phalcon/cphalcon/issues/13438)
- Renamed `Phalcon\Assets\Resource` namespace to `Phalcon\Assets\Asset` [#12082](https://github.com/phalcon/cphalcon/issues/12082)
- Renamed `Phalcon\Assets\Resource` to `Phalcon\Assets\Asset` [#12082](https://github.com/phalcon/cphalcon/issues/12082)
- Renamed `Phalcon\Assets\ResourceInterface` to `Phalcon\Assets\AssetInterface` [#12082](https://github.com/phalcon/cphalcon/issues/12082)
- Renamed `Phalcon\Assets\Manager::addResource` to `Phalcon\Assets\Manager::addAsset` [#12082](https://github.com/phalcon/cphalcon/issues/12082)
- Renamed `Phalcon\Assets\Manager::addResourceByType` to `Phalcon\Assets\Manager::addAssetByType` [#12082](https://github.com/phalcon/cphalcon/issues/12082)
- Renamed `Phalcon\Assets\Manager::collectionResourcesByType` to `Phalcon\Assets\Manager::collectionAssetsByType` [#12082](https://github.com/phalcon/cphalcon/issues/12082)
- Changed `paginate` in the place of `getPaginate`. Added `previous` in the place of `before`. [#13492](https://github.com/phalcon/cphalcon/issues/13492)
- Scope SQL Column Aliases (on nesting level), in `Phalcon\Mvc\Model\Query`, to prevent overwrite _root_ query's `_sqlColumnAliases` by sub-queries. [#13006](https://github.com/phalcon/cphalcon/issues/13006), [#12548](https://github.com/phalcon/cphalcon/issues/12548) and [#1731](https://github.com/phalcon/cphalcon/issues/1731)
- CLI parameters now work like MVC parameters [#12375](https://github.com/phalcon/cphalcon/pull/12375)
- Changed `Phalcon\Db\Dialect\Postgresql::addPrimaryKey` to make primary key constraints names unique by prefixing them with the table name. [#12629](https://github.com/phalcon/cphalcon/pull/12629)
- Fixed `Phalcon\Mvc\Model\Query::_prepareSelect` overwriting columns with the same alias [#13552](https://github.com/phalcon/cphalcon/issues/13552)
- Changed `Phalcon\Http\RequestInterface` to align with `Phalcon\Http\Request` [#13061](https://github.com/phalcon/cphalcon/pull/13061)
- Renamed `Phalcon\Acl\Resource` to `Phalcon\Acl\Subject` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\ResourceInterface` to `Phalcon\Acl\SubjectInterface` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\ResourceAware` to `Phalcon\Acl\SubjectAware` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\Role` to `Phalcon\Acl\Operation` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\RoleInterface` to `Phalcon\Acl\OperationInterface` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\RoleAware` to `Phalcon\Acl\OperationAware` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::addRole` to `Phalcon\Acl\AdapterInterface::addOperation` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::isRole` to `Phalcon\Acl\AdapterInterface::isOperation` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::isResource` to `Phalcon\Acl\AdapterInterface::isSubject` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::addResource` to `Phalcon\Acl\AdapterInterface::addSubject` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::addResourceAccess` to `Phalcon\Acl\AdapterInterface::addSubjectAccess` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::dropResourceAccess` to `Phalcon\Acl\AdapterInterface::dropSubjectAccess` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::getActiveRole` to `Phalcon\Acl\AdapterInterface::getActiveOperation` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::getActiveResource` to `Phalcon\Acl\AdapterInterface::getActiveSubject` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::getRoless` to `Phalcon\Acl\AdapterInterface::getOperations` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\AdapterInterface::getResources` to `Phalcon\Acl\AdapterInterface::getSubjects` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\Adapter::getActiveRole` to `Phalcon\Acl\AdapterInterface::getActiveOperation` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\Adapter::getActiveResource` to `Phalcon\Acl\AdapterInterface::getActiveSubject` [#13639](https://github.com/phalcon/cphalcon/issues/13639)
- Renamed `Phalcon\Acl\Adapter\Memory::addRole` to `Phalcon\Acl\Adapter\Memory::addOperation` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Renamed `Phalcon\Acl\Adapter\Memory::isRole` to `Phalcon\Acl\Adapter\Memory::isOperation` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Renamed `Phalcon\Acl\Adapter\Memory::isResource` to `Phalcon\Acl\Adapter\Memory::isSubject` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Renamed `Phalcon\Acl\Adapter\Memory::addResource` to `Phalcon\Acl\Adapter\Memory::addSubject` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Renamed `Phalcon\Acl\Adapter\Memory::addResourceAccess` to `Phalcon\Acl\Adapter\Memory::addSubjectAccess` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Renamed `Phalcon\Acl\Adapter\Memory::dropResourceAccess` to `Phalcon\Acl\Adapter\Memory::dropSubjectAccess` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Renamed `Phalcon\Acl\Adapter\Memory::getRoless` to `Phalcon\Acl\Adapter\Memory::getOperations` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Renamed `Phalcon\Acl\Adapter\Memory::getResources` to `Phalcon\Acl\Adapter\Memory::getSubjects` [#13639](https://github.com/phalcon/cphalcon/issues/13639) 
- Changed `Phalcon\Http\Response::setHeaders` now merges the headers with any pre-existing ones in the internal collection [#12836](https://github.com/phalcon/cphalcon/issues/12836)
- Changed `Phalcon\DI\FactoryDefault` to not load by default
    - the `Phalcon\Session\Adapter\Files` using the name `session` 
    - the `Phalcon\Session\Bag` using the name `sessionBag` [#12921](https://github.com/phalcon/cphalcon/issues/12921)
  [#12921](https://github.com/phalcon/cphalcon/issues/12921)
- Changed the `Phalcon\Session` namespace by refactoring the component. `Phalcon\Session\Manager` is now the single component offering session manipulation by using adapters. Each adapter implements PHP's `SessionHandlerInterface`. Available adapters are `Phalcon\Session\Files`, `Phalcon\Session\Libmemcached`, `Phalcon\Session\Noop` and `Phalcon\Session\Redis`.  [#12921](https://github.com/phalcon/cphalcon/issues/12833), [#11341](https://github.com/phalcon/cphalcon/issues/11341), [#13535](https://github.com/phalcon/cphalcon/issues/13535)
- Fixed `Phalcon\Mvc\Models` magic method (setter) is fixed for arrays  [#13661](https://github.com/phalcon/cphalcon/issues/13661)
- Fixed `Phalcon\Mvc\Model::skipAttributes` and `Phalcon\Mvc\Model::allowEmptyColumns` allowEmptyStrings & skipAttributes repsect the column mapping. [#12975](https://github.com/phalcon/cphalcon/issues/12975), [#13477](https://github.com/phalcon/cphalcon/issues/13477) 

## Removed
- PHP < 7.2 no longer supported
- Removed `xcache` support from adapters [#13628](https://github.com/phalcon/cphalcon/pull/13628)
- Removed `apc` support from adapters (use `apcu`) [#13628](https://github.com/phalcon/cphalcon/pull/13628)
- Removed `memcache` support from adapters (use `libmemcached`) [#13628](https://github.com/phalcon/cphalcon/pull/13628)
- Removed deprecated `Phalcon\Annotations\Adapter\Apc`
- Removed deprecated `Phalcon\Annotations\Adapter\Xcache`
- Removed deprecated `Phalcon\Cache\Backend\Apc`
- Removed deprecated `Phalcon\Cache\Backend\Memcache`
- Removed deprecated `Phalcon\Cache\Backend\Xcache`
- Removed deprecated `Phalcon\Cli\Console::addModules`
- Removed deprecated `Phalcon\Debug::getMajorVersion`
- Removed deprecated `Phalcon\Mvc\Model\Criteria::addWhere`
- Removed deprecated `Phalcon\Mvc\Model\Criteria::order`
- Removed deprecated `Phalcon\Mvc\Model\Metadata\Apc`
- Removed deprecated `Phalcon\Mvc\Model\Metadata\Memcache`
- Removed deprecated `Phalcon\Mvc\Model\Metadata\Xcache`
- Removed deprecated `Phalcon\Mvc\View::getParams`
- Removed deprecated `Phalcon\Mvc\ViewInterface::getParams`
- Removed deprecated `Phalcon\Paginator\Adapter\Model::getPaginate`
- Removed deprecated `Phalcon\Paginator\Adapter\Model - $before`
- Removed deprecated `Phalcon\Paginator\Adapter\Model - $total_pages`
- Removed deprecated `Phalcon\Paginator\Adapter\NativeArray::getPaginate`
- Removed deprecated `Phalcon\Paginator\Adapter\NativeArray - $before`
- Removed deprecated `Phalcon\Paginator\Adapter\NativeArray - $total_pages`
- Removed deprecated `Phalcon\Paginator\Adapter\QueryBuilder::getPaginate`
- Removed deprecated `Phalcon\Paginator\Adapter\QueryBuilder - $before`
- Removed deprecated `Phalcon\Paginator\Adapter\QueryBuilder - $total_pages`
- Removed deprecated `Phalcon\Security::hasLibreSsl`
- Removed deprecated `Phalcon\Security::getSslVersionNumber`
- Removed deprecated `Phalcon\Validation\Validator::isSetOption`
- Removed `Phalcon\Cli\Console::addModules` in favor of `Phalcon\Cli\Console::registerModules`
- Removed `Phalcon\Debug::getMajorVersion` due to the fact that we never use this method
- Removed `Phalcon\Dispatcher::setModelBinding` in favor of `Phalcon\Dispatcher::setModelBinder`
- Removed `Phalcon\Http\RequestInterface::isSecureRequest` in favor of `Phalcon\Http\RequestInterface::isSecure`
- Removed `Phalcon\Http\RequestInterface::isSoapRequested` in favor of `Phalcon\Http\Request::isSoap`
- Removed `Phalcon\Logger\Multiple`
- Removed `Phalcon\Mvc\Collection::validationHasFailed`
- Removed `Phalcon\Mvc\Model\Criteria::order` in favor of `Phalcon\Mvc\Model\Criteria::orderBy`
- Removed `Phalcon\Mvc\Model\Validator\*` in favor of `Phalcon\Validation\Validator\*`
- Removed `Phalcon\Mvc\Micro\Lazyloader::__call` in favor of `Phalcon\Mvc\Micro\Lazyloader::callMethod`
- Removed `Phalcon\Model::reset` [#12317](https://github.com/phalcon/cphalcon/issues/12317)
- Removed `Phalcon\Validation\Message` and `Phalcon\Mvc\Model\Message` in favor of `Phalcon\Messages\Message`
- Removed `Phalcon\Validation\MessageInterface` and `Phalcon\Mvc\Model\MessageInterface` in favor of `Phalcon\Messages\MessageInterface`
- Removed `Phalcon\Validation\Message` and `Phalcon\Mvc\Model\Message` in favor of `Phalcon\Messages\Message`
- Removed `Phalcon\Validation\Message\Group` in favor of `Phalcon\Messages\Messages`
- Removed calling `Phalcon\Mvc\Collection::validate` with object of type `Phalcon\Mvc\Model\ValidatorInterface`

#### Installation/Upgrade
The packages in [packagecloud.io](https://packagecloud.io/phalcon) are being updated (at the time of this post) and will be ready soon. You can also download the zip file from our release page [here](https://github.com/phalcon/cphalcon/releases/tag/v4.0.0-alpha1).

You can also clone the repository and checkout the tag, and then run 

```bash
zephir fullclean
zephir build
```
to install the new extension. For more information you can check the [installation guide)(https://docs.phalcon.io/en/3.4/installation).

## Thank you
Once again **a huge thank you to all of our contributors!** You guys have helped us a lot. You can help us even more by installing this version and testing it. If you find bugs, please report them in our [Github Issues] (https://github.com/phalcon/cphalcon/issues) page. Alternatively you can always join us in our [Discord](https://phalcon.io/discord) server or our [Forum](https://forum.phalcon.io).
