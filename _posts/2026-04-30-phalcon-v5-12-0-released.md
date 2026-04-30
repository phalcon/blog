---
layout: post
title: Phalcon v5.12.0 Released
image: /assets/files/2026-04-30-phalcon-5.12.0-release.png
date: 2026-04-30T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon [v5.12.0][5_12_0] has been released!

<!--more-->

... and so was [5.11.0][5_11_0] and [5.11.1][5_11_1]. All we can do is apologize for the lack of blog posts. 

This is going to be a long blog post

> TLDR: We fixed a lot of stuff, v6 alpha coming out in the next week or so
{: .alert .alert-info }

It has been a year since 5.9.2 has been released and a lot has happened since then especially in our personal lives. In most cases, those events were the primary reason that the project has not been moving as fast as it should. Hopefully we will have a lot more time in the future to move the project forward.

So what has happened since our last blog post, which was our 5.10.0 Christmas release. We released 5.11.0 which addressed 17 issues and 5.11.1 which addressed another 4. This release (5.12.0) addresses 65 issues, one of our biggest releases ever. I do believe though that there was one release back in v1.3 that had over 100, so that record still remains! You can check the changelog entries at the bottom of this post.

## v5

A lot has happened in v5.

### Zephir

Significant work in Zephir allowed us to produce a much cleaner compilation process. The dreaded warnings about incompatible pointers are nearly gone - we just need a small cleanup, and the extension compiles fine in PHP 8.5.
 
### ORM / Model Layer / Database

The most heavily worked area across all three releases. Numerous long-standing issues were resolved, such as relation caching, snapshots, `COUNT`, CRUD operations, PHQL, Hydration, `RawValue` and a lot of Postgres fixes.

### Pagination

Fixed the `paginate()` to understand `DISTINCT` and return proper counts, as well as `GROUP BY` for multi columns.

### Forms & Validation

Fixes in the `Alpha` validator to work better with `allowEmpty`, filters with validators, whitelist for entity binding, mutli field messages and a new `Validation::fails()` convenience method for standalone validation checks.

### HTML, Assets & Image

`Breadcrumbs` now honor sub directories (URL or set), `Assets\Manager` also uses the URL when available, PNG transparency, GD crop, new helpers `FriendlyTitle` and `Preload` for `TagFactory` and new `Select::fromData()` added to populate select options from a `SelectDataInterface` provider, with optgroup support. This mimics the `Tag::Select` with `using`

### Cache & Storage

New `RedisCluster` adapter, new `deleteMultiple`, corrected key prefix calculation, additional corrections with the serializers and options

### Security & Encryption

Added `Encryption\Security\Uuid` factory with versioned adapters (v1–v7), JWT: `Validator::validateClaim()` for custom JWT claim validation, JWT: `Builder::setPassphrase()` is more strict now, `computeHmac` now catches exceptions better, `Random: base()` now defaults to 16 bits.

### Dependency Injection

Introduced named aliases for registered services, minor correction to exception text

### Logger

Log levels are now reported in lowercasem, improved performance for `Stream`

### Dispatcher / MVC

Corrected `Dispatcher::dispatch()` to refresh the events manager where needed, made `Mvc\Controller` and `View\Engine\AbstractEngine` events-aware.

### HTTP Request

Fixes to `getPostData()` when type is missing from the headers, `getPost()` correctly returns JSON, `getClientAddress()` fixed for trusted forwarded proxy header handling.

### Infrastructure

- PIE support: Added PHP Installer for Extensions (PIE) support and removed PECL references (since it is deprecated)
- Added `Phalcon\Support\Settings` New centralized class replacing `globals_get`/`globals_set` throughout the framework for managing INI-style settings.
- PHQL parser memory leak: Fixed a memory leak in `phql_internal_parse_phql()` during repeated query execution.
- Checked compatibility with PHP 8.1-8.5 for types and warnings.
- We changed the testing suite to use phpunit. This allows us to do a direct comparison of the code between v5 and v6, after all the same test has to pass both versions, ensuring that we have alignment. That was a huge task with a lot of hiccups.
- Introduced a nore verbose and faster CI runs, testing the extension installation as well as tests. Also enabled all the database tests including Sqlite and Postgresql. The latter was a bit tough, because there were a lot of issues with the tests. However, doing so, helped us identify a few key bugs with the Posgresql adapter and those have been fixed.

## v6

The code is fully aligned with v5 and the testing suites are (nearly) identical. Tests pass on both projects.

We have ported the PHQL and Volt parsers in its own PHP implenentations. Those are separate library repositories and are dependencies for v6. A bit more work in terms of propagating changes from v5 to these two repositories, when a change is needed to the parsers, but so far so good.

Migrated one of our sample applications to v6 and thus far no issues. More testing required of course.

An alpha version will be released in the next week or so.

## AI

We have been leveraging AI to identify bugs in the framework. Thus far, the results have been promising, because bugs lingering for years have now been addressed. We are planning on using it for complex tasks and deep analysis in the future. Our approach is trust but verify, so AI will never produce code that has not been vetted by us (and tested).

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting! We also thank you for your patience since some of these bugs and pull requests have been open for a few years (yes, years :/).

## Changelog

## [5.12.1](https://github.com/phalcon/cphalcon/releases/tag/v5.12.1) (xxxx-xx-xx)

### Added

- Added `Phalcon\Db\Column::TYPE_UUID` constant (value `29`) and added support for PostgreSQL native `uuid` column type in `Phalcon\Db\Adapter\Pdo\Postgresql` and `Phalcon\Db\Dialect\Postgresql` [#16840](https://github.com/phalcon/cphalcon/issues/16840)
- Added support for `Phalcon\Mvc\Url` static base URI in `Phalcon\Assets\Manager`; when a DI container is set and a `url` service is available, local asset paths are now resolved via `getStatic()` instead of a bare `/` prefix [#16570](https://github.com/phalcon/cphalcon/issues/16570)

### Fixed

- Fixed `Phalcon\Mvc\Model\Manager` retaining a model instance in `lastInitialized` after initialization and `Phalcon\Mvc\Model` not clearing the reusable-records cache after `save()`, causing memory to grow unboundedly in long-running processes [#16566](https://github.com/phalcon/cphalcon/issues/16566)
- Fixed `Phalcon\Paginator\Adapter\QueryBuilder::paginate()` returning wrong total item count when the query uses `DISTINCT` columns; the count now uses `COUNT(DISTINCT ...)` for a single column and a subquery for multiple columns [#16581](https://github.com/phalcon/cphalcon/issues/16581)
- Fixed `Phalcon\Mvc\Model\Query\Builder::autoescape()` incorrectly wrapping function expressions (e.g. `DATE_PART(...)`) in brackets when used in `groupBy()`, causing a `"Column does not belong to any of the selected models"` exception [#16599](https://github.com/phalcon/cphalcon/issues/16599)
- Fixed `Phalcon\Mvc\Model` - saving a model with multiple fields relations threw `"Not implemented"` [#16029](https://github.com/phalcon/cphalcon/issues/16029)

## 5.12.0 (2026-04-29)

### Changed

- Changed `Phalcon\Assets\Manager` filter type check from `is_object()` to `typeof` and updated the error message to `"The filter is not valid"` [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Changed `Phalcon\Cache\AbstractCache::doDeleteMultiple()` to delegate to the storage adapter's `deleteMultiple()` instead of looping over individual `delete()` calls [#16859](https://github.com/phalcon/cphalcon/issues/16859)
- Changed `Phalcon\Di\Exception` message for missing services from `"was not found in the dependency injection container"` to `"is not registered in the container"` [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Changed `Phalcon\Di\Service\Builder` error messages for service parameters to use double quotes instead of single quotes [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Changed `Phalcon\Forms\Element\AbstractElement::getLocalTagFactory()` to throw `Phalcon\Forms\Exception` instead of silently creating a new `TagFactory` when neither `setTagFactory()` nor a parent `Form` provides one [#16894](https://github.com/phalcon/cphalcon/issues/16894)
- Changed `Phalcon\Forms\Element\Select::render()` to use `TagFactory`-based `Html\Helper\Input\Select` instead of the deprecated `Phalcon\Tag\Select` [#16894](https://github.com/phalcon/cphalcon/issues/16894)
- Changed `Phalcon\Html\TagFactory` to accept an optional `ResponseInterface` in the constructor (useful for `preload`) [#16892](https://github.com/phalcon/cphalcon/issues/16892)
- Changed `Phalcon\Mvc\Controller` and `Phalcon\Mvc\View\Engine\AbstractEngine` to be events aware [#16890](https://github.com/phalcon/cphalcon/pull/16890)
- Changed `Phalcon\Mvc\View\Engine\Volt\Compiler::setOptions` to return `$this` now [#16891](https://github.com/phalcon/cphalcon/pull/16891)
- Changed calls to `globals_get` and `globals_set` in the code with `Phalcon\Support\Settings::get()/set()` [#16884](https://github.com/phalcon/cphalcon/issues/16884)
- Changed exception messages across multiple components to use `"does not"` instead of `"doesn't"` for consistency [#16889](https://github.com/phalcon/cphalcon/issues/16889)

### Added

- Added `Phalcon\Encryption\Security\Uuid` factory and versioned adapters (`Version1`–`Version7`) with a `UuidInterface` carrying standard RFC 4122 namespace constants; each version is a singleton cached by the factory, invoked via `v1()`–`v7()` [#16326](https://github.com/phalcon/cphalcon/issues/16326)
- Added `Phalcon\Html\Helper\FriendlyTitle` - available via `TagFactory` as `friendlyTitle` [#16892(https://github.com/phalcon/cphalcon/issues/16892)
- Added `Phalcon\Html\Helper\Input\Select::fromData()` to populate select options from a `SelectDataInterface` provider, with optgroup support [#16894](https://github.com/phalcon/cphalcon/issues/16894)
- Added `Phalcon\Html\Helper\Input\Select\SelectDataInterface`, `Phalcon\Html\Helper\Input\Select\ArrayData`, and `Phalcon\Html\Helper\Input\Select\ResultsetData` as data providers for the `Select` helper [#16894](https://github.com/phalcon/cphalcon/issues/16894)
- Added `Phalcon\Html\Helper\Preload` - available via `TagFactory` as `preload`; `TagFactory` now accepts an optional `ResponseInterface` as its third constructor parameter [#16892(https://github.com/phalcon/cphalcon/issues/16892)
- Added `Phalcon\Mvc\Model\Resultset::refresh()` to re-execute the underlying query and update the resultset with fresh data from the database [#16409](https://github.com/phalcon/cphalcon/issues/16409)
- Added `deleteMultiple()` to `Phalcon\Storage\Adapter\*` to delete multiple keys in a single operation using native batch capabilities per adapter [#16859](https://github.com/phalcon/cphalcon/issues/16859)
- Added key validation per entry in `Phalcon\Cache\AbstractCache::doDeleteMultiple()` throwing `InvalidArgumentException` for keys containing invalid characters [#16859](https://github.com/phalcon/cphalcon/issues/16859)
- Added named static factory methods `Phalcon\Forms\Exception::tagFactoryNotFound()` and `Phalcon\Forms\Exception::usingParameterRequired()` [#16894](https://github.com/phalcon/cphalcon/issues/16894)

### Fixed

- Fixed `Phalcon\Db\Dialect\Postgresql::modifyColumn()` to generate correct SQL when changing a boolean column's default value: replaced `empty` check with `hasDefault()` to avoid treating `false` as "no default", removed the boolean-only branch that omitted the `ALTER TABLE` prefix, and fixed `castDefault()` to return PostgreSQL literals `true`/`false` instead of raw PHP booleans [#15829](https://github.com/phalcon/cphalcon/issues/15829)
- Fixed `Phalcon\Db\Result\PdoResult::$rowCount` to use `null` as the uninitialised sentinel instead of `false`, preventing a count of `0` rows being confused with "not yet counted" [#16409](https://github.com/phalcon/cphalcon/issues/16409)
- Fixed `Phalcon\Dispatcher\AbstractDispatcher::dispatch()` to refresh the local `eventsManager` and `hasEventsManager` variables after `initialize()` returns, so that an events manager attached to the dispatcher inside `initialize()` is honoured for all subsequent dispatch events (`afterInitialize`, `afterExecuteRoute`, `afterDispatch`, `afterDispatchLoop`, etc.) [#16440](https://github.com/phalcon/cphalcon/issues/16440)
- Fixed `Phalcon\Filter\Validation::bind()` to skip the dependency injection container lookup when `data` is empty, preventing unnecessary `Di\Exception` errors [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed `Phalcon\Filter\Validation\AbstractValidator::allowEmpty()` to support a value-list array (e.g. `[null, '']`) in addition to the per-field map syntax, using strict `===` comparison so that `'0'` is never silently treated as empty [#15491](https://github.com/phalcon/cphalcon/issues/15491)
- Fixed `Phalcon\Filter\Validation\AbstractValidator::messageFactory()` to pass the joined field string to `Phalcon\Messages\Message` instead of the raw array when multiple fields are provided [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed `Phalcon\Filter\Validation\Validator\Alpha::validate()` to return `false` when `allowEmpty` is explicitly set to `false` and the submitted value is `null` or an empty string [#16200](https://github.com/phalcon/cphalcon/issues/16200)
- Fixed `Phalcon\Forms\Form::isValid()` to apply field filters even when no validators are specified (again) [#16830](https://github.com/phalcon/cphalcon/issues/16830)
- Fixed `Phalcon\Html\Escaper::css()` and `Phalcon\Html\Escaper::js()` to return an empty string instead of `false` when the input is empty or contains only a null codepoint [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed `Phalcon\Html\Helper\AbstractHelper::renderAttributes()` to emit boolean HTML5 attributes (e.g. `async`, `defer`) as standalone attribute names instead of `async="1"` when the attribute value is `true` [#16304](https://github.com/phalcon/cphalcon/issues/16304)
- Fixed `Phalcon\Html\Helper\Breadcrumbs` to support subdirectory installs: added `getPrefix()`/`setPrefix()` for a manual string prefix, and an optional `UrlInterface` constructor parameter that resolves links through `url->get()` (including base URI prepending and double-slash normalisation); `TagFactory` accepts an optional fourth `UrlInterface` argument and passes it to `Breadcrumbs` automatically [#14957](https://github.com/phalcon/cphalcon/issues/14957)
- Fixed `Phalcon\Http\Response::setStatusCode()` exception message from `"Non-standard statuscode given without a message"` to `"Non-standard status-code given without a message"` [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed `Phalcon\Image\Adapter\AbstractAdapter::crop()` to correctly handle `offsetX = 0` and `offsetY = 0` by changing the parameter types from `int` to `var`; the previous `int` typing caused Zephir to compile the `null` check as `0 == offset` in C, making explicit zero offsets indistinguishable from omitted (center) offsets [#16156](https://github.com/phalcon/cphalcon/issues/16156)
- Fixed `Phalcon\Image\Adapter\Gd::processResize()` to preserve PNG alpha channel transparency by replacing `imagescale()` with `imagecreatetruecolor()` + `imagealphablending(false)` + `imagesavealpha(true)` + `imagecopyresampled()` [#16316](https://github.com/phalcon/cphalcon/issues/16316)
- Fixed `Phalcon\Image\Adapter\Imagick::processPixelate()` to explicitly cast division result to `int` to prevent implicit float-to-int deprecation [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed `Phalcon\Mvc\Model::__get()` to return the already-loaded related record instead of re-fetching from the database, preventing modifications to relation properties from being discarded [#15554](https://github.com/phalcon/cphalcon/issues/15554)
- Fixed `Phalcon\Mvc\Model::__unserialize()` and `Phalcon\Mvc\Model::unserialize()` to call `onConstruct()` after deserialization, so typed properties initialized in `onConstruct` are correctly set when a model is restored from cache [#15906](https://github.com/phalcon/cphalcon/issues/15906)
- Fixed `Phalcon\Mvc\Model::__unserialize()` and `Phalcon\Mvc\Model::unserialize()` to restore snapshot as the current attributes (instead of null) when a model is deserialized with no pending changes, preventing `getChangedFields()` from throwing after cache retrieval [#15837](https://github.com/phalcon/cphalcon/issues/15837)
- Fixed `Phalcon\Mvc\Model::cloneResultMap()` to call model setter methods (e.g. `setName()`) during ORM hydration when `orm.disable_assign_setters` is `false`, making hydration behaviour consistent with `assign()`; setters in `localMethods` (Phalcon internals) are excluded [#14810](https://github.com/phalcon/cphalcon/issues/14810)
- Fixed `Phalcon\Mvc\Model::collectRelatedToSave()` to skip unmodified `hasOne`/`hasMany` related records that have snapshot data, preventing spurious `INSERT`/`UPDATE` statements when a relation is read but not changed [#16000](https://github.com/phalcon/cphalcon/issues/16000)
- Fixed `Phalcon\Mvc\Model::doLowInsert()` to also reset `uniqueKey` (in addition to `uniqueParams`) after an auto-increment INSERT so that a subsequent `has()` call on the same record rebuilds the primary-key condition from current attribute values; previously, `uniqueParams` was cleared but `uniqueKey` was kept, causing `has()` to query with a `null` parameter and return `false`, which made `SoftDelete` attempt to INSERT an already-existing `belongsTo` related record instead of updating it [#16453](https://github.com/phalcon/cphalcon/issues/16453)
- Fixed `Phalcon\Mvc\Model::doLowUpdate()` to skip columns whose string value matches the column's function-call DB default (e.g. `gen_random_uuid()`) in the non-dynamic update path, preventing the function name from being passed as a bound string parameter and causing a DB type error [#15828](https://github.com/phalcon/cphalcon/issues/15828)
- Fixed `Phalcon\Mvc\Model::doSave()` to capture the model snapshot before the INSERT/UPDATE and restore it when `postSaveRelatedRecords` fails and rolls back the transaction; previously, with `orm.update_snapshot_on_save` enabled, the snapshot was permanently updated inside `doLowInsert`/`doLowUpdate` even when the transaction was rolled back, causing Dynamic Update to silently skip the write on the next save attempt [#16410](https://github.com/phalcon/cphalcon/issues/16410)
- Fixed `Phalcon\Mvc\Model::getRelated()` to return already-fetched relations from the internal cache (`dirtyRelated` first, then `related`) instead of always querying the database; cache is cleared after `save()` and `delete()` to prevent stale results [#16409](https://github.com/phalcon/cphalcon/issues/16409)
- Fixed `Phalcon\Mvc\Model::toArray()` to catch `Error` thrown by a getter that accesses an uninitialized typed PHP property (can occur when `cloneResultMap()` skips a null value for a `NOT NULL` column, e.g. via a `LEFT JOIN`), returning `null` instead of propagating the error [#15711](https://github.com/phalcon/cphalcon/issues/15711)
- Fixed `Phalcon\Mvc\Model::unserialize()` to catch `TypeError` when assigning a serialised `null` back to a typed non-nullable PHP property, preventing a crash on the second request when the model is loaded from a cache like APCu [#15711](https://github.com/phalcon/cphalcon/issues/15711)
- Fixed `Phalcon\Mvc\Model\Manager::getRelationRecords()` to apply reusable caching for `hasManyToMany` and `hasOneThrough` relations; `reusable: true` was previously ignored for through-relations [#15934](https://github.com/phalcon/cphalcon/issues/15934)
- Fixed `Phalcon\Mvc\Model\Query::executeSelect()` to embed `Phalcon\Db\RawValue` bind parameters directly in the SQL string instead of passing them to PDO [#16350](https://github.com/phalcon/cphalcon/issues/16350)
- Fixed `Phalcon\Mvc\Model\Query::executeSelect()` to use the write connection when the query contains a `FOR UPDATE` clause, instead of always using the read connection [#16032](https://github.com/phalcon/cphalcon/issues/16032)
- Fixed `Phalcon\Mvc\Model\Query::getExpression()` to emit `NOT BETWEEN` instead of `BETWEEN NOT` for the `PHQL_T_BETWEEN_NOT` token, producing valid SQL [#16812](https://github.com/phalcon/cphalcon/issues/16812)
- Fixed `Phalcon\Mvc\Model\Query::getSelectColumn()` to use the full model class name as the `balias` key in a complex resultset when the model is namespaced (e.g. `App\Models\Users`), instead of incorrectly applying `lcfirst()` to the fully-qualified name; non-namespaced models (e.g. `Robots`) retain the existing `lcfirst()` behaviour (`robots`) [#16052](https://github.com/phalcon/cphalcon/issues/16052)
- Fixed `Phalcon\Mvc\Model\Query\Builder::getPhql()` to use a named bind parameter (`:APK0:`) instead of embedding the raw primary-key value in the PHQL string when `findFirst()` is called with a numeric or numeric-string argument; this prevents unbounded growth of the internal PHQL AST cache (`Query::$internalPhqlCache`) in long-running CLI processes [#14656](https://github.com/phalcon/cphalcon/issues/14656)
- Fixed `Phalcon\Mvc\Model\Resultset\Complex::current()` to return `null` instead of an empty model instance when a `LEFT JOIN` produces no matching row (all column values are `null`) [#16239](https://github.com/phalcon/cphalcon/issues/16239)
- Fixed `Phalcon\Mvc\Model\Transaction\Manager::collectTransaction()` to keep the correct transactions when rebuilding the list after removal [#16522](https://github.com/phalcon/cphalcon/issues/16522)
- Fixed `Phalcon\Mvc\Model\Transaction\Manager::commit()` to remove each transaction from the pool after committing so that subsequent `get()` calls return a fresh transaction [#16522](https://github.com/phalcon/cphalcon/issues/16522)
- Fixed `Phalcon\Mvc\Model` to handle the `lastInsertId correctly under Postgres [#16920](https://github.com/phalcon/cphalcon/pull/16920) [#16436](https://github.com/phalcon/cphalcon/pull/16436) [#15775](https://github.com/phalcon/cphalcon/pull/15775)
- Fixed `Phalcon\Mvc\Router\Annotations::handle()` to strip the `controllerSuffix` from the class name when a fully-qualified class name already includes it (e.g. `App\Controllers\InvoicesController`), preventing the doubled suffix `InvoicesControllerController` [#16238](https://github.com/phalcon/cphalcon/issues/16238)
- Fixed `Phalcon\Paginator\Adapter\QueryBuilder::paginate()` to correctly count groups when `groupBy()` receives a multi-column array, using a `SELECT DISTINCT` subquery instead of the PostgreSQL-incompatible `COUNT(DISTINCT col1, col2)` form [#15912](https://github.com/phalcon/cphalcon/issues/15912)
- Fixed `Phalcon\Paginator\Adapter\QueryBuilder::paginate()` to use the `columns` option as the `COUNT(DISTINCT ...)` argument when a `GROUP BY` is present, allowing NULL-safe expressions to be supplied [#15266](https://github.com/phalcon/cphalcon/issues/15266)
- Fixed `Phalcon\Storage\Adapter\Libmemcached`, `Phalcon\Storage\Adapter\Redis` and `Phalcon\Storage\Adapter\Weak` to call `initSerializer()` during construction [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed `Phalcon\Storage\Adapter\Redis` to initialize `lifetime` from options during construction [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed `Phalcon\Support\Helper\Json\Encode` to prefix the `InvalidArgumentException` message with `"json_encode error: "` for consistency [#16889](https://github.com/phalcon/cphalcon/issues/16889)
- Fixed the CI run to correctly use updated changes, and reuse artifacts [#16920](https://github.com/phalcon/cphalcon/pull/16920)
- Fixed the CI run to now run Postgresql tests [#16920](https://github.com/phalcon/cphalcon/pull/16920)
- Fixed the CI run to now run Sqlite tests [#16920](https://github.com/phalcon/cphalcon/pull/16920)

### Removed

# Changelog
## 5.11.1 (2026-04-04)

### Changed

### Added

- Added `Phalcon\Storage\Adapter\RedisCluster` adapter to support Redis Cluster connections [#16867](https://github.com/phalcon/cphalcon/issues/16867)
- Added `Phalcon\Support\Settings` to be used for ini settings throughout the framework [#16873](https://github.com/phalcon/cphalcon/issues/16873)

### Fixed

- Fixed `Phalcon\Encryption\Security::computeHmac()` to catch `\ValueError` thrown by PHP 8.1+ when an unknown hashing algorithm is passed [#16893](https://github.com/phalcon/cphalcon/issues/16893)
- Fixed `Phalcon\Translate\Adapter\Gettext::setLocale()` to call `setlocale` when it is available, removing warnings in PHP 8.5 [#16886](https://github.com/phalcon/cphalcon/issues/16886)

### Removed

## Upgrade
Developers can upgrade using PIE

```bash
pie install phalcon/cphalcon-5.12.0
```

To compile from source, follow our [installation document][installation_document]

[installation_document]: https://docs.phalcon.io/5.12/installation
[5_10_0]: https://github.com/phalcon/cphalcon/releases/tag/5.10.0
[5_11_0]: https://github.com/phalcon/cphalcon/releases/tag/5.11.0
[5_11_1]: https://github.com/phalcon/cphalcon/releases/tag/5.11.1
[5_12_0]: https://github.com/phalcon/cphalcon/releases/tag/5.12.0