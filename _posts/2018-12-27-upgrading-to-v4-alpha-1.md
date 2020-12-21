---
layout: post
title: Upgrading to Phalcon v4.0.0-alpha1
date: 2018-12-27T16:41:03.192Z
tags:
  - php
  - phalcon
  - release
  - phalcon4
  - upgrade
  - v4
---
This blog post will help you upgrade your existing Phalcon application to v4-alpha1. We will outline the areas that you need to pay attention to and make necessary alterations so that your code can run as smooth as it has been with v3. Although the changes are significant, it is more of a methodical task than a daunting one.
<!--more-->

### PHP 7.2
Phalcon v4-alpha1 supports only PHP 7.2 and above. PHP 7.1 has been released 2 years ago and its active support will end in roughly a month from the time of this blog post, so we decided to only support active PHP versions.


### PSR
Phalcon requires the PSR extension. The extension can be downloaded and compiled from [this](https://github.com/jbboehr/php-psr.git) GitHub repository. Installation instructions are available on the README of the repository. Once the extension has been compiled and is available in your system, you will need to load it to your `php.ini`. In order to load this extension before phalcon you can either add 

```bash
extension=psr.so
```

before 

```bash
extension=phalcon.so
```

Alternatively some distributions number prefix their `ini` files. If that is the case, choose a high number for Phalcon (e.g. `50-phalcon.ini`).

### Installation
Download `zephir.phar` from [here](https://github.com/phalcon/zephir/releases/tag/0.11.8). Add it to a folder that can be accessed by your system.

Clone the repository

```bash
git clone https://github.com/phalcon/cphalcon
``` 

Compile Phalcon
```bash
cd cphalcon/
git checkout tags/v4.0.0-alpha1 ./
zephir fullclean
zephir build
```
Check the module
```bash
php -m | grep phalcon
```

### Changes
Now that you have the v4-alpha1 installed, you can start using it with your application. Unless your application is extremely simple and uses only components that somehow were not changed (highly unlikely), your application will work out of the box.

#### Interfaces
For those that have not worked with PHP 7+, there is support for typed parameters. For instance this code works both on PHP 5 and 7

```php
function hello($name)
{
    echo $name;
} 
```

However with PHP 7+ you can do this:
```php
function hello(string $name)
{
    echo $name;
} 
```

If `$name` is not a string, you will get an error from PHP. Phalcon utilizes this functionality to ensure that whatever you pass in the methods of components is of the correct type. As a result we have removed a lot of code that was only checking passed parameters, thus making the framework much faster with this change alone. You will definitely need to check the parameters that you pass to relevant methods and perhaps do some sanitization before calling methods in your application. 

This particular step could very well be taxing depending on how your input is processed and passed to the relevant Phalcon components.

We went through pretty much all interfaces and classes that implement them and corrected inconsistencies. There have been times where an interface would define a method with a `string` variable, only to see in the actual class that implements it using a `var` (any type) as the parameter for the same method. We have aligned all these interfaces and also enriched the interfaces with additional methods for several components. More on that below.

### Applications
- The `Phalcon\Mvc\Application`, `Phalcon\Mvc\Micro` and `Phalcon\Mvc\Router` now must have a URI to process

#### Cache
`xcache`, `apc` and `memcache` adapters have been deprecated and removed. The first two are not supported for PHP 7.2+. `apc` has been replaced with `apcu` and `memcache` can be replaced with the `libmemcached` one.
- Removed `Phalcon\Annotations\Adapter\Apc`
- Removed `Phalcon\Annotations\Adapter\Xcache`
- Removed `Phalcon\Cache\Backend\Apc`
- Removed `Phalcon\Cache\Backend\Memcache`
- Removed `Phalcon\Cache\Backend\Xcache`
- Removed `Phalcon\Mvc\Model\Metadata\Apc`
- Removed `Phalcon\Mvc\Model\Metadata\Memcache`
- Removed `Phalcon\Mvc\Model\Metadata\Xcache`

### CLI
- CLI parameters now work like MVC parameters

### Exceptions
- Changed catch `Exception` to `Throwable`

### Models
- You can no longer assign data to models while saving them

#### Components
#### Acl
Since `resource` is a reserved word in PHP, it has been causing serious issues with Phalcon. As a result we had to rename components that use the word `resource` as their class name or method name. We have renamed the `Acl` sub classes as follows:
- `Resource` is now `Subject`. This is the focus of your ACL. What are you allowing, what is the subject of your application? : `/users/`, `/login` etc.
	- Renamed `Phalcon\Acl\Resource` to `Phalcon\Acl\Subject`
	- Renamed `Phalcon\Acl\ResourceInterface` to `Phalcon\Acl\SubjectInterface`
	- Renamed `Phalcon\Acl\ResourceAware` to `Phalcon\Acl\SubjectAware`
	- Renamed `Phalcon\Acl\AdapterInterface::isResource` to `Phalcon\Acl\AdapterInterface::isSubject`
	- Renamed `Phalcon\Acl\AdapterInterface::addResource` to `Phalcon\Acl\AdapterInterface::addSubject`
	- Renamed `Phalcon\Acl\AdapterInterface::addResourceAccess` to `Phalcon\Acl\AdapterInterface::addSubjectAccess`
	- Renamed `Phalcon\Acl\AdapterInterface::dropResourceAccess` to `Phalcon\Acl\AdapterInterface::dropSubjectAccess`
	- Renamed `Phalcon\Acl\AdapterInterface::getActiveResource` to `Phalcon\Acl\AdapterInterface::getActiveSubject`
	- Renamed `Phalcon\Acl\AdapterInterface::getResources` to `Phalcon\Acl\AdapterInterface::getSubjects`
	- Renamed `Phalcon\Acl\Adapter::getActiveResource` to `Phalcon\Acl\AdapterInterface::getActiveSubject`
	- Renamed `Phalcon\Acl\Adapter\Memory::isResource` to `Phalcon\Acl\Adapter\Memory::isSubject` 
	- Renamed `Phalcon\Acl\Adapter\Memory::addResource` to `Phalcon\Acl\Adapter\Memory::addSubject` 
	- Renamed `Phalcon\Acl\Adapter\Memory::addResourceAccess` to `Phalcon\Acl\Adapter\Memory::addSubjectAccess`
	- Renamed `Phalcon\Acl\Adapter\Memory::dropResourceAccess` to `Phalcon\Acl\Adapter\Memory::dropSubjectAccess`
	- Renamed `Phalcon\Acl\Adapter\Memory::getResources` to `Phalcon\Acl\Adapter\Memory::getSubjects` 
- `Role` is now called `Operation`. This is the group that you wish to bind to `subjects`. `Subjects` perform one or more `Operations`
	- Renamed `Phalcon\Acl\Role` to `Phalcon\Acl\Operation`
	- Renamed `Phalcon\Acl\RoleInterface` to `Phalcon\Acl\OperationInterface`
	- Renamed `Phalcon\Acl\RoleAware` to `Phalcon\Acl\OperationAware`
	- Renamed `Phalcon\Acl\AdapterInterface::getRoless` to `Phalcon\Acl\AdapterInterface::getOperations`
	- Renamed `Phalcon\Acl\AdapterInterface::addRole` to `Phalcon\Acl\AdapterInterface::addOperation`
	- Renamed `Phalcon\Acl\AdapterInterface::isRole` to `Phalcon\Acl\AdapterInterface::isOperation`
	- Renamed `Phalcon\Acl\AdapterInterface::getActiveRole` to `Phalcon\Acl\AdapterInterface::getActiveOperation`
	- Renamed `Phalcon\Acl\Adapter::getActiveRole` to `Phalcon\Acl\AdapterInterface::getActiveOperation`
	- Renamed `Phalcon\Acl\Adapter\Memory::addRole` to `Phalcon\Acl\Adapter\Memory::addOperation` 
	- Renamed `Phalcon\Acl\Adapter\Memory::isRole` to `Phalcon\Acl\Adapter\Memory::isOperation` 
	- Renamed `Phalcon\Acl\Adapter\Memory::getRoless` to `Phalcon\Acl\Adapter\Memory::getOperations` 

#### Acl\Adapter\Memory
- Added `getActiveKey`, `activeFunctionCustomArgumentsCount` and `getActiveFunction` to get latest key, number of custom arguments, and function used to acquire access
- Added `addOpertion` support multiple inherited

#### Assets
Similar to the `Acl` component `Resource` has been renamed to `Asset`. Specifically:
- `Assets\Resource` is now `Assets\Asset`
	- Renamed `Phalcon\Assets\Resource` to `Phalcon\Assets\Asset`
	- Renamed `Phalcon\Assets\ResourceInterface` to `Phalcon\Assets\AssetInterface`
	- Renamed `Phalcon\Assets\Manager::addResource` to `Phalcon\Assets\Manager::addAsset`
	- Renamed `Phalcon\Assets\Manager::addResourceByType` to `Phalcon\Assets\Manager::addAssetByType`
	- Renamed `Phalcon\Assets\Manager::collectionResourcesByType` to `Phalcon\Assets\Manager::collectionAssetsByType`

#### Cache\Backend\*
- Changed `get` to use only positive numbers for `lifetime`

#### Cache\Backend\Redis
- Made the `specialKey` (`_PHCR`) optional
- By configuring `prefix` and `statsKey` the `queryKeys` no longer returns prefixed keys, now it returns original keys without prefix.

#### Db
- Added global setting `orm.case_insensitive_column_map` to attempt to find value in the column map case-insensitively. Can be also enabled by setting `caseInsensitiveColumnMap` key in `\Phalcon\Mvc\Model::setup()`.

#### Cli\Console
- Removed `Phalcon\Cli\Console::addModules` in favor of `Phalcon\Cli\Console::registerModules`

#### Cli\Router\RouteInterface                      
- Added `delimiter`, `getDelimiter`                        

#### Cli\Dispatcher
- Added `getTaskSuffix()`, `setTaskSuffix()`

#### Cli\DispatcherInterface
- Added `setOptions`, `getOptions`

#### Container
- Added `Phalcon\Container`, a proxy container class to the `Phalcon\DI` implementing PSR-11

#### Debug
- Removed `Phalcon\Debug::getMajorVersion`

#### Db\AdapterInterface                              
- Added `fetchColumn`, `insertAsDict`, `updateAsDict`                              

#### Db\Adapter\Pdo
- Added more column types for the Mysql adapter. The adapters support 
    - `TYPE_BIGINTEGER`
    - `TYPE_BIT`
    - `TYPE_BLOB`
    - `TYPE_BOOLEAN`
    - `TYPE_CHAR`
    - `TYPE_DATE`
    - `TYPE_DATETIME`
    - `TYPE_DECIMAL`
    - `TYPE_DOUBLE`
    - `TYPE_ENUM`
    - `TYPE_FLOAT`
    - `TYPE_INTEGER`
    - `TYPE_JSON`
    - `TYPE_JSONB`
    - `TYPE_LONGBLOB`
    - `TYPE_LONGTEXT`
    - `TYPE_MEDIUMBLOB`
    - `TYPE_MEDIUMINTEGER`
    - `TYPE_MEDIUMTEXT`
    - `TYPE_SMALLINTEGER`
    - `TYPE_TEXT`
    - `TYPE_TIME`
    - `TYPE_TIMESTAMP`
    - `TYPE_TINYBLOB`
    - `TYPE_TINYINTEGER`
    - `TYPE_TINYTEXT`
    - `TYPE_VARCHAR`
Some adapters do not support certain types. For instance `JSON` is not supported for `Sqlite`. It will be automatically changed to `VARCHAR.

#### Db\DialectInterface                              
- Added `registerCustomFunction`, `getCustomFunctions`, `getSqlExpression`                              

#### Db\Dialect\Postgresql
- Changed `addPrimaryKey` to make primary key constraints names unique by prefixing them with the table name.

#### Di\ServiceInterface
- Added `getParameter`, `isResolved`

#### Di\Service
- Changed `Phalcon\Di\Service` constructor to no longer takes the name of the service.

#### Dispatcher
- Removed `Phalcon\Dispatcher::setModelBinding` in favor of `Phalcon\Dispatcher::setModelBinder`

#### Dispatcher
- Added `getHandlerSuffix()`, `setHandlerSuffix()`

#### Events\ManagerInterface                          
- Added `hasListeners`                          

#### Flash
- Added ability to set a custom template for the Flash Messenger.

#### Forms\Form
- `Phalcon\Forms\Form::clear` will no longer call `Phalcon\Forms\Element::clear`, instead it will clear/set default value itself, and `Phalcon\Forms\Element::clear` will now call `Phalcon\Forms\Form::clear` if it's assigned to the form, otherwise it will just clear itself.
- `Phalcon\Forms\Form::getValue` will now also try to get the value by calling `Tag::getValue` or element's `getDefault` method before returning `null`, and `Phalcon\Forms\Element::getValue` calls `Tag::getDefault` only if it's not added to the form. 

#### Html\Breadcrumbs
- Added `Phalcon\Html\Breadcrumbs`, a component that creates HTML code for breadcrumbs.

#### Html\Tag
- Added `Phalcon\Html\Tag`, a component that creates HTML elements. It will replace `Phalcon\Tag` in a future version. This component does not use static method calls.

#### Http\RequestInterface
- Removed `isSecureRequest` in favor of `isSecure`
- Removed `isSoapRequested` in favor of `isSoap`

#### Http\Response
- Added `hasHeader()` method to `Phalcon\Http\Response` to provide the ability to check if a header exists.
- Added `Phalcon\Http\Response\Cookies::getCookies` 
- Changed `setHeaders` now merges the headers with any pre-existing ones in the internal collection
- Added two new events `response::beforeSendHeaders` and `response::afterSendHeaders`

#### Logger
- Removed `Phalcon\Logger\Multiple`
- Changed `Phalcon\Logger` to comply with PSR-3. The component has been rewritten to use adapters that allow logging to different areas. The logger now is a single component that is instantiated and can be used with different adapters. The `File` adapter has been renamed to `Stream`. By adding multiple adapters to your logger you can log to multiple places. This is why the `Multiple` adapter has been removed. If you set up multiple adapters to your logger but want to log a specific message only to one or two, you can use the `excludeAdapters([])` method.

```php
use Phalcon\Logger;
use Phalcon\Logger\Adapter\Stream;

$adapter1 = new Stream('/logs/first-log.log');
$adapter2 = new Stream('/remote/second-log.log');
$adapter3 = new Stream('/manager/third-log.log');

$logger = new Logger(
    'messages',
    [
        'local'   => $adapter1,
        'remote'  => $adapter2,
        'manager' => $adapter3,
    ]
);

// Log to all adapters
$logger->error('Something went wrong');

// Log to specific adapters
$logger
    ->excludeAdapters(['manager'])
    ->info('This does not go to the "manager" logger);
```

#### Messages
- `Phalcon\Messages\Message` and its collection `Phalcon\Messages\Messages` are new components that handle messages for models and validation. In the past we had two components, one for validation and one for models. We have merged these two, so you should be getting back a `MessageInterface[]` back when calling `save` on a model or when retrieving validation messages.
	- Changed `Phalcon\Mvc\Model` to use the `Phalcon\Messages\Message` object for its messages
	- Changed `Phalcon\Validation\*` to use the `Phalcon\Messages\Message` object for its messages

#### Mvc\Collection
- Removed `Phalcon\Mvc\Collection::validationHasFailed`
- Removed calling `Phalcon\Mvc\Collection::validate` with object of type `Phalcon\Mvc\Model\ValidatorInterface`

#### Mvc\Micro\Lazyloader
- Removed `__call` in favor of `callMethod`

#### Mvc\Model
- Removed `Phalcon\Model::reset`
- Added `isRelationshipLoaded` to check if relationship is loaded 

#### Mvc\Model\Criteria
- Removed `addWhere`
- Removed `order`
- Removed `order` in favor of `orderBy`

#### Mvc\Model\CriteriaInterface
- Added `distinct`, `leftJoin`, `innerJoin`, `rightJoin`, `groupBy`, `having`, `cache`, `getColumns`, `getGroupBy`, `getHaving`, 

#### `Mvc\Model\Manager`
- `load` no longer reuses already initialized models

#### Mvc\Model\ManagerInterface                       
- Added `isVisibleModelProperty`, `keepSnapshots`, `isKeepingSnapshots`, `useDynamicUpdate`, `isUsingDynamicUpdate`, `addHasManyToMany`, `existsHasManyToMany`, `getRelationRecords`, `getHasManyToMany`, `registerNamespaceAlias`, `getNamespaceAlias`                       

#### Mvc\Model\MessageInterface                       
- Added `setModel`, `getModel`, `setCode`, `getCode`                       

#### Mvc\Model\QueryInterface
- Added `getSingleResult`, `setBindParams`, `getBindParams`, `setBindTypes`, `setSharedLock`, `getBindTypes`, `getSql`                         

#### `Mvc\Model\Query\BuilderInterface`
- Added `offset`

#### Mvc\Model\Query\Builder
- Added bind support. The Query Builder has the same methods as `Phalcon\Mvc\Model\Query`; `getBindParams`, `setBindParams`, `getBindTypes` and `setBindTypes`.
- Changed `addFrom` to remove third parameter `$with`

#### Mvc\Model\Query\BuilderInterface                
- Added `distinct`, `getDistinct`, `forUpdate`, `offset`, `getOffset`                 

#### Mvc\Model\RelationInterface
- Added `getParams`

#### Mvc\Model\ResultsetInterface
- Added `setHydrateMode`, `getHydrateMode`, `getMessages`, `update`, `delete`, `filter`

#### Mvc\Model\Transaction\ManagerInterface           
- Added `setDbService`, `getDbService`, `setRollbackPendent`, `getRollbackPendent`           

#### Mvc\Model\Validator\*
- Removed `Phalcon\Mvc\Model\Validator\*` in favor of `Phalcon\Validation\Validator\*`

#### Mvc\ModelInterface
- Added `getModelsMetaData`

#### Mvc\RouterInterface
- Added `attach`

#### Mvc\Router\RouteInterface
- Added `convert` so that calling `add` will return an instance that has `convert` method

#### Mvc\Router\RouteInterface
- Added response handler to `Phalcon\Mvc\Micro`, `Phalcon\Mvc\Micro::setResponseHandler`, to allow use of a custom response handler.

#### Mvc\View
- Removed `getParams`

#### Paginator
- `getPaginate` not becomes `paginate`
- `$before` is removed and replaced with `$previous`
- `$total_pages` is removed since it contained the same information as `$last`
- Added `Phalcon\Paginator\RepositoryInterface` for repository the current state of `paginator` and also optional sets the aliases for properties repository

#### Security
- Removed `hasLibreSsl`
- Removed `getSslVersionNumber`
- Added `setPadding`

#### Session
- `Phalcon\Session` and `Phalcon\Session\Bag` no longer get loaded by default in `Phalcon\DI\FactoryDefault`
- Refactored `Phalcon\Session`
- `Phalcon\Session\Manager` is now the single component offering session manipulation by using adapters.
- Each adapter implements PHP's `SessionHandlerInterface`.
- Available adapters are `Phalcon\Session\Adapter\Files`, `Phalcon\Session\Adapter\Libmemcached`, `Phalcon\Session\Adapter\Noop` and `Phalcon\Session\Adapter\Redis`.
- Developers can now add any adapter that implements the `SessionHandlerInterface` in the `Phalcon\Session\Manager`

#### Security
- Added a retainer for the current token to be used during the checks, so when `getToken` is called the token used for checks does not change

#### Tag
- Added `renderTitle()` that renders the title enclosed in `<title>` tags.
- Changed `getTitle`. It returns only the text. It accepts `prepend`, `append` booleans to prepend or append the relevant text to the title. 
- Changed `textArea` to use `htmlspecialchars` to prevent XSS injection.

#### Validation\Message
- Removed `Phalcon\Validation\Message` and `Phalcon\Mvc\Model\Message` in favor of `Phalcon\Messages\Message`
- Removed `Phalcon\Validation\MessageInterface` and `Phalcon\Mvc\Model\MessageInterface` in favor of `Phalcon\Messages\MessageInterface`
- Removed `Phalcon\Validation\Message` and `Phalcon\Mvc\Model\Message` in favor of `Phalcon\Messages\Message`
- Removed `Phalcon\Validation\Message\Group` in favor of `Phalcon\Messages\Messages`

#### Validation\Validator
- Removed `isSetOption`

#### Validation\Validator\Ip
- Added `Phalcon\Validation\Validator\Ip`, class used to validate ip address fields. It allows to validate a field selecting IPv4 or IPv6, allowing private or reserved ranges and empty values if necessary.

### Help
If you need help with the above, feel free to reach out in our [forum](https://phalcon.io/forum) or our [Discord](https://phalcon.io/discord) server 
