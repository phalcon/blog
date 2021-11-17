---
layout: post
title: Phalcon 5.0.0alpha7 Released!
image: /assets/files/2021-11-17-phalcon-5.0.0-alpha.7.png
date: 2021-11-17T13:59:06.635Z
tags:
  - phalcon5
  - release
  - alpha
---
We are very happy to announce the release of Phalcon v5.0.0 Alpha 7!
<!--more-->

[Github Tag](https://github.com/phalcon/cphalcon/releases/tag/5.0.0alpha7)

> This release requires PHP 7.4 or PHP 8.0
{: .alert .alert-info }

This release is packed with changes - a lot of them breaking backwards compatibility. A lot of classes were moved, some components were removed or replaced with others, and we have increased code coverage significantly. Additionally we resolved over 50 cards in our project (bugs, NFRs etc.)

> This will be the last alpha version
{: .alert .alert-info } 

We have less than 10 cards to address for this release and 8 classes to move from the top namespace to their future "homes". The next version will be a beta, at which point we will concentrate on any bugs reported, documentation as well as supporting applications (devtools, incubator, invo etc.).

We have also aligned all the tests between `cphalcon` (v5) and `phalcon` (v6), ensuring that we do not reinvent the wheel or lose functionality/code coverage.

Quite a bit of work left but we are getting there!

Huge thanks to our contributors that reported issues, offered input as well as submitted pull requests with additions and corrections!

NOTE: You can always check our roadmap and the status of our active sprint for v5 in our project page: [https://github.com/orgs/phalcon/projects/4](https://github.com/orgs/phalcon/projects/4)

# Changelog
# [5.0.0alpha7]

## Changed
- Changes to the `Phalcon\Acl`:
  - Renamed `Phalcon\Acl\ComponentAware` to `Phalcon\Acl\ComponentAwareInterface`
  - Renamed `Phalcon\Acl\RoleAware` to `Phalcon\Acl\RoleAwareInterface` [#15691](https://github.com/phalcon/cphalcon/issues/15691)
- Changed `require` to `require_once` in `Phalcon\Loader` to avoid conflicts with other loaders [#15489](https://github.com/phalcon/cphalcon/issues/15489)
- Changed `require` to `require_once` in `Phalcon\Cli\Console` and `Phalcon\Mvc\Application` for a bit of extra performance [#15489](https://github.com/phalcon/cphalcon/issues/15489)
- `Phalcon\Collection` has been moved under the `Support` namespace:
  - Renamed  `Phalcon\Collection` to `Phalcon\Support\Collection`
  - Renamed  `Phalcon\Collection\Exception` to `Phalcon\Support\Collection\Exception`
  - Renamed  `Phalcon\Collection\ReadOnly` to `Phalcon\Support\Collection\ReadOnly`
  - Renamed  `Phalcon\Collection` to `Phalcon\Support\Collection` [#15700](https://github.com/phalcon/cphalcon/issues/15700)
- Changes to `Phalcon\Session\Bag`:
  - Changed `Phalcon\Session\Bag::construct` to accept a container instead of internally calling the default
  - Changed `Phalcon\Session\Bag::construct` to throw an exception if the container is not specified
  - Changed `Phalcon\Session\Bag::init` to store the data in the session [#15494](https://github.com/phalcon/cphalcon/issues/15494)
- Changed `Phalcon\Events\Event::construct()` to allow `source` to be nullable [#15133](https://github.com/phalcon/cphalcon/issues/15133)
- Changes to `Phalcon\Crypt`
  - Moved `Phalcon\Crypt\Exception` to `Phalcon\Crypt\Exception\Exception`
  - Moved `Phalcon\Crypt\Mismatch` to `Phalcon\Crypt\Exception\Mismatch`
  - Changed the ccm/gcm modes to store the `authTag` with the encryption string and process it with the decryption string [#15717](https://github.com/phalcon/cphalcon/issues/15717)
- Created new namespace `Phalcon\Encryption`
  - Moved `Phalcon\Crypt` to `Phalcon\Encryption\Crypt`
  - Moved `Phalcon\Security` to `Phalcon\Encryption\Security`
  - Moved the whole `Security` namespace under `Encryption`
    - `Security\JWT\Exceptions\UnsupportedAlgorithmException` to `Encryption\Security\JWT\Exceptions\UnsupportedAlgorithmException`
    - `Security\JWT\Exceptions\ValidatorException` to `Encryption\Security\JWT\Exceptions\ValidatorException`
    - `Security\JWT\Signer\AbstractSigner` to `Encryption\Security\JWT\Signer\AbstractSigner`
    - `Security\JWT\Signer\Hmac` to `Encryption\Security\JWT\Signer\Hmac`
    - `Security\JWT\Signer\None` to `Encryption\Security\JWT\Signer\None`
    - `Security\JWT\Signer\SignerInterface` to `Encryption\Security\JWT\Signer\SignerInterface`
    - `Security\JWT\Token\AbstractItem` to `Encryption\Security\JWT\Token\AbstractItem`
    - `Security\JWT\Token\Enum` to `Encryption\Security\JWT\Token\Enum`
    - `Security\JWT\Token\Item` to `Encryption\Security\JWT\Token\Item`
    - `Security\JWT\Token\Parser` to `Encryption\Security\JWT\Token\Parser`
    - `Security\JWT\Token\Signature` to `Encryption\Security\JWT\Token\Signature`
    - `Security\JWT\Token\Token` to `Encryption\Security\JWT\Token\Token`
    - `Security\JWT\Builder` to `Encryption\Security\JWT\Builder`
    - `Security\JWT\Validator` to `Encryption\Security\JWT\Validator`
    - `Security\JWT\Validator` to `Encryption\Security\JWT\Validator`
    - `Security\Exception` to `Encryption\Security\Exception`
    - `Security\Random` to `Encryption\Security\Random` [#15729](https://github.com/phalcon/cphalcon/issues/15729)
- Renamed 
    - `Phalcon\Crypt\Crypt::getHashAlgo()` to `Phalcon\Crypt\Crypt::getHashAlgorithm()` 
    - `Phalcon\Crypt\Crypt::getAvailableHashAlgos()` to `Phalcon\Crypt\Crypt::getAvailableHashAlgorithms()` 
    - `Phalcon\Crypt\Crypt::setHashAlgo()` to `Phalcon\Crypt\Crypt::setHashAlgorithm()` [#15717](https://github.com/phalcon/cphalcon/issues/15717)
- Renamed `Phalcon\Factory\AdapterFactory::getAdapters()` to `Phalcon\Factory\AdapterFactory::getServices()` [#15717](https://github.com/phalcon/cphalcon/issues/15717)
- Changed `Phalcon\Crypt\Crypt::__construct()` to have `useSigning` set to `true` by default [#15717](https://github.com/phalcon/cphalcon/issues/15717)
- Changes to `Phalcon\Config`
    - Moved `Phalcon\Config` to `Phalcon\Config\Config`
    - Changed `Phalcon\Config\Config::path` by making the `delimiter` parameter a `string` 
    - Changed `Phalcon\Config\Adapter\Ini::__construct` to not accept `null` as the mode. The default is now `INI_SCANNER_NORMAL` (2)
    - Refactored the code for more efficiency and speed [#15720](https://github.com/phalcon/cphalcon/issues/15720)
- Changed `Phalcon\Db\Adapter\AdapterInterface::getInternalHandler()` and `Phalcon\Db\Adapter\Pdo\AbstractPdo::getInternalHandler()` to return `var` instead of `\PDO` for custom adapters with different engines [#15119](https://github.com/phalcon/cphalcon/issues/15119) 
- Moved `Phalcon\Filter` to `Phalcon\Filter\Filter`; added more tests [#15726](https://github.com/phalcon/cphalcon/issues/15726)
- Changed `Phalcon\Mvc\Model::getPreparedQuery()` to return `QueryInterface` instead of `Query` [#15562](https://github.com/phalcon/cphalcon/issues/15562)
- Moved `Phalcon\Cache` to `Phalcon\Cache\Cache` [#15728](https://github.com/phalcon/cphalcon/issues/15728)
- Changed `Phalcon\Factory\AdapterFactory` to define the factory exception in `getExceptionClass()` instead of a property. [#15728](https://github.com/phalcon/cphalcon/issues/15728)
- Renamed `Phalcon\Db\Adapter\AbstractAdapter::getSqlVariables()` to `Phalcon\Db\Adapter\AbstractAdapter::getSQLVariables()` to align with the rest of the `getSQL*` methods [#15637](https://github.com/phalcon/cphalcon/issues/15637)
- Moved `Phalcon\Logger` to `Phalcon\Logger\Logger` [#15727](https://github.com/phalcon/cphalcon/issues/15727)
- Changes to `Phalcon\Escaper`
  - Moved `Phalcon\Escaper` to `Phalcon\Html\Escaper`
  - Moved `Phalcon\Escaper\EscaperInterface` to `Phalcon\Html\Escaper\EscaperInterface`
  - Moved `Phalcon\Escaper\Exception` to `Phalcon\Html\Escaper\Exception`
  - Deprecated methods (to be removed at a future version)
    - `escapeCss()` becomes `css()`
    - `escapeJs()`, becomes `js()`
    - `escapeHtml()` becomes `html()`
    - `escapeHtmlAttr()` becomes `attributes()`
    - `escapeUrl()` becomes `url()`
    - `setHtmlQuoteType()` becomes `setFlags()` [#15757](https://github.com/phalcon/cphalcon/issues/15757)
- Changed `Phalcon\Encryption\Security::hash()` to also use `password_hash()` and accept `ARGON2*` algorithms [#15731](https://github.com/phalcon/cphalcon/issues/15731) 
- Removed uncamelize of `realClassName` in `Phalcon\Mvc\Router\Route::getRoutePaths()` if definition is string to make processing same as if array definition [#15067](https://github.com/phalcon/cphalcon/issues/15067) 
- Changed `Phalcon\Validation::getValue()` behavior to get value from `data` if not found in `entity`. [#14203](https://github.com/phalcon/cphalcon/issues/14203)
- Changed `Phalcon\Forms\Form::isValid()` signature: added `whitelist` argument. [#14203](https://github.com/phalcon/cphalcon/issues/14203)
- Changed `Phalcon\Support\Collection\ReadOnly` to `Phalcon\Support\Collection\ReadOnlyCollection` to avoid conflicts with the read-only feature in PHP 8.1 [#15767](https://github.com/phalcon/cphalcon/issues/15767)
- Removed `Phalcon\Text` - replaced by `Phalcon\Support\Helper\Str\*` [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Removed `Phalcon\Helper\Arr` - replaced by `Phalcon\Support\Helper\Arr\*` [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Removed `Phalcon\Helper\File` - replaced by `Phalcon\Support\Helper\File\*` [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Removed `Phalcon\Helper\Json` - replaced by `Phalcon\Support\Helper\Json\*` [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Removed `Phalcon\Helper\Number` - replaced by `Phalcon\Support\Helper\Number\*` [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Removed `Phalcon\Helper\Str` - replaced by `Phalcon\Support\Helper\Str\*` [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Removed references to `Phalcon\Text`, `Phacon\Helper\*` from the code replacing it with `Phalcon\Support\Helper\*` [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Synchronized tests with `phalcon/phalcon` thus increasing coverage [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Changed `Phalcon\Assets\Manager` to require a `Phalcon\Html\TagFactory` in its constructor [#15776](https://github.com/phalcon/cphalcon/issues/15776)

## Added
- Added more tests in the suite for additional code coverage [#15691](https://github.com/phalcon/cphalcon/issues/15691)
- Added `Phalcon\Events\AbstractEventsAware` class to handle the Events Manager when necessary [#15691](https://github.com/phalcon/cphalcon/issues/15691)
- Added `Phalcon\Acl\Adapter\AdapterInterface::getInheritedRoles()` and `Phalcon\Acl\Adapter\Memory::getInheritedRoles()` that returns the inherited roles based on a passed role name (or all if no parameter supplied) [#15154](https://github.com/phalcon/cphalcon/issues/15154)
- Changes to `Phalcon\Crypt`
    - Added `Phalcon\Crypt\Padding\PadInteface` and padding adapters
        - `Phalcon\Crypt\Padding\Ansi`
        - `Phalcon\Crypt\Padding\Iso10126`
        - `Phalcon\Crypt\Padding\IsoIek`
        - `Phalcon\Crypt\Padding\Noop`
        - `Phalcon\Crypt\Padding\PadInterface`
        - `Phalcon\Crypt\Padding\Pkcs7`
        - `Phalcon\Crypt\Padding\Space`
        - `Phalcon\Crypt\Padding\Zero`
    - Added `Phalcon\Crypt\PadFactory` to easily create padding adapters
    - Added more tests increasing coverage [#15717](https://github.com/phalcon/cphalcon/issues/15717)
- Added `Phalcon\Cache\Adapter\*::setForever()` and `Phalcon\Storage\Adapter\*::setForever()` to allow storing a key forever [#15485](https://github.com/phalcon/cphalcon/issues/15485)
- Added `Phalcon\Encryption\Security::getHashInformation()` to return information for a hash [#15731](https://github.com/phalcon/cphalcon/issues/15731)
- Added constants `Phalcon\Encryption\Security::CRYPT_ARGON2I` and `Phalcon\Encryption\Security::CRYPT_ARGON2ID` [#15731](https://github.com/phalcon/cphalcon/issues/15731)
- Added `allowEmpty` checks to common validators [#15515](https://github.com/phalcon/cphalcon/issues/15515)
- Added `Phalcon\Forms\Form::getFilteredValue()` to get filtered value without providing entity [#15438](https://github.com/phalcon/cphalcon/issues/15438)
- Added `Phalcon\Forms\Form::setWhitelist()` and `Phalcon\Forms\Form::getWhitelist()` [#14203](https://github.com/phalcon/cphalcon/issues/14203)
- Added `dirtyState` serialization in `Phalcon\Mvc\Model` [#15571](https://github.com/phalcon/cphalcon/issues/15571)
- Added short versions of helpers for `Phalcon\Html\TagFactory` (call service as a method) [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Added short versions of helpers for `Phalcon\Support\HelperFactory` (call service as a method) [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Added `Phalcon\Html\Helper\Doctype` helper for `doctype` generation [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Added `style` or `link` tag option for `Phalcon\Html\Helper\Style` [#15776](https://github.com/phalcon/cphalcon/issues/15776)

## Fixed
- Fixed `Query::getExpression()` return type [#15553](https://github.com/phalcon/cphalcon/issues/15553)
- Fixed `Phalcon\Mvc\Model::getRelated()` to correctly return relationships (cached or not) when the foreign key has changed [#15649](https://github.com/phalcon/cphalcon/issues/15649)
- Fixed `Phalcon\Db\Adapter\Pdo\*`, `Phalcon\Mvc\Model` and `Phalcon\Mvc\Model\MetaData\Strategy\Annotations` to treat `BIGINT` numbers as string [#15632](https://github.com/phalcon/cphalcon/issues/15632)
- Fixed `Phalcon\Crypt\Crypt::decrypt()` to correctly calculate the hash when using signed mode [#15717](https://github.com/phalcon/cphalcon/issues/15717)
- Fixed `Phalcon\Mvc\Model\Manager::isVisibleModelProperty()` to correctly check if setting property is visible [#15276](https://github.com/phalcon/cphalcon/issues/15276)
- Fixed `Phalcon\Config\Config::merge` to retain numeric indexes in deep merges [#14705](https://github.com/phalcon/cphalcon/issues/14705)
- Fixed globals (Zephir change) to correctly display string values for global settings in `phpinfo()` [#15269](https://github.com/phalcon/cphalcon/issues/15269)
- Fixed `Phalcon\Storage\Adapter\Redis::getAdapter()` and `Phalcon\Cache\Adapter\Redis::getAdapter()` to accept the connection timeout in the constructor `options` [#15744](https://github.com/phalcon/cphalcon/issues/15744) 
- Fixed `Phalcon\Db\Adapter\AbstractAdapter::getSQLVariables()` to return an empty array when initialized [#15637](https://github.com/phalcon/cphalcon/issues/15637)
- Fixed `Phalcon\Cache\Adapter\*` and `Phalcon\Storage\Adapter\*` to delete a key when `set()` is called with a zero or negative TTL [#15485](https://github.com/phalcon/cphalcon/issues/15485)
- Fixed `Phalcon\Db\Adapter\Pdo\Mysql` to not use `PDO::ATTR_EMULATE_PREPARES` and `PDO::ATTR_STRINGIFY_FETCHES` by default. This allows numbers to be returned with resultsets instead of strings for numeric fields [#15361](https://github.com/phalcon/cphalcon/issues/15361) 
- Fixed `Phalcon\Validation\Validator\File` to use `messageFileEmpty` [#14928](https://github.com/phalcon/cphalcon/issues/14928) 
- Fixed `Phalcon\Db\RawValue` usage bugs in `Phalcon\Mvc\Model::doLowUpdate()` [#15413](https://github.com/phalcon/cphalcon/issues/15413)
- Fixed `type` attribute for stylesheet links [#15776](https://github.com/phalcon/cphalcon/issues/15776)
- Fixed `Phalcon\Debug` to not throw an exception if a URL service is not present [#15381](https://github.com/phalcon/cphalcon/issues/15381)

## Removed
- Removed `Phalcon\Kernel` - obsolete [#15776](https://github.com/phalcon/cphalcon/issues/15776)
