---
layout: post
title: Phalcon v5.18.0 Released
image: /assets/files/2026-07-31-phalcon-5.18.0-release.svg
date: 2026-07-31T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - phalcon6
  - release
---

Phalcon [v5.18.0][5_18_0] is out, and it brings a second way to build an application. Alongside it, the ecosystem grew two new repositories and the v6 PHP implementation crossed from alpha into beta.

<!--more-->

## A different shape for an application

The headline of 5.18 is **`Phalcon\ADR`**, an [Action-Domain-Responder][adr] HTTP stack that sits next to MVC rather than replacing it. Where MVC hands a controller several actions and a view, ADR splits a request into three focused roles:

- an **Action** - one invokable class per route, found by convention instead of a route table
- a **Domain** - your business logic, which returns a `Phalcon\ADR\Payload\Payload` and never touches HTTP
- a **Responder** - which turns that payload into a response

The namespace ships complete: a `Container` wired for `Phalcon\Container\Container`, a `SapiEmitter`, an onion middleware stack, an `Input` bag, chainable responders (JSON, text, redirect, error, and the new `ViewResponder` that renders a `.phtml` through the new `Phalcon\Contracts\View\Renderer` contract - which `Phalcon\Mvc\View\Simple` now implements), granular exceptions, events wired to the Events Manager, and a one-command `Front` class that boots and runs the whole thing.

`Phalcon\ADR\Application` is a self-contained composition root: `bind()`, `define()`, `factory()`, `set()`, `extend()` and `getContainer()` are the whole registration surface, with `setBaseNamespace()` and `secureWith()` for the convention router and its namespace guard. `AbstractHttpFront::boot()` returns the built container without running the application, so a bootstrap file can be a single `return (new AppFront(dirname(__DIR__)))->boot();`.

The ADR (convention) router descends namespaces - a path segment becomes a namespace segment only when the matching directory exists - and derives **exactly one** Action class per path. The convention is also introspectable in both directions: `classFor()`, `pathFor()`, `methodFor()` and `candidatesFor()` are on the contract, so any tooling that asks the framework what a route resolves to is available. `setWordSeparator()` handles separators, and the new `Phalcon\ADR\Router\AttributeFilter` lets an Action declare a static `params()` method so route segments arrive validated against a regex, cast to `int`/`float`/`string` and optionally converted - before the Action runs. A regex miss is a 404, not a bad argument.

## Fewer queries in the ORM

Relations picked up **eager loading**. `Phalcon\Mvc\Model::find()` now accepts an `eager` parameter - an array of dot-delimited relation paths, optionally with per-path options - and pre-loads them with one query per relation instead of one per record. `Phalcon\Mvc\Model\Criteria::eager()` exposes the same on the criteria surface. In the same area, the relation cache is now probed with `array_key_exists()`, so a to-one relation that legitimately resolves to no record stops being re-queried on every access.

### A bug with a long service record

`Phalcon\Db\Result\PdoResult::numRows()` deserves its own paragraph. SQLite hands PDO a streaming cursor that does not know how many rows it holds until it has been stepped to the end, so the count costs a second statement. To build it, the old code matched the original SQL with `preg_match("/^SELECT\s+(.*)/i", ...)` and re-assembled it as a `SELECT COUNT(*)`. In PCRE, `.` does not cross a newline unless you ask it to - and nobody asked. So any statement carrying a line break matched only up to the first one and produced a truncated, invalid subquery; and a statement that already began with `SELECT COUNT(*) ` skipped the count entirely and returned a hard-coded `1`, which quietly reported the wrong number for a `GROUP BY`.

That code has been sitting there since **2013**. It now wraps the original statement verbatim - any `SELECT` is a valid subquery - so multi-line SQL, common table expressions and grouped counts all report correctly.

## Model persistence fixes worth calling out

Two long-standing bugs in the insert path are fixed, and both surfaced the same way - a MySQL generated column:

- Attributes registered with `skipAttributes()`, `skipAttributesOnCreate()` and `skipAttributesOnUpdate()` were being ignored.
- A column the database can fill itself was receiving a literal `null` instead of the `DEFAULT` keyword (or being omitted entirely on an adapter without `DEFAULT` support, such as SQLite).

## The framework now starts describing itself

A small set of additions exists so tooling can ask the framework questions instead of guessing: `Phalcon\Container\Container::getServiceNames()` with the `Phalcon\Contracts\Container\Service\Enumerable` contract, and `Phalcon\Events\Manager::getListenerMap()` returns each event type mapped to its listeners in a single call - with `Phalcon\Contracts\Events\Enumerable`. Crest (below) is the first consumer, and it types against those contracts rather than the concrete classes.

## HTTP and the database layer

`Phalcon\Http\Request::getAttributes()` returns a `Phalcon\Http\Request\Bag\AttributeBag`, a mutable string-keyed bag of application-defined values that routers, dispatchers and security components can attach to a request as it travels. Appending with `$bag[] = ...` throws `NullKeyException`, since bag elements are always string-keyed.

Cookie deletion was fixed twice over: `Phalcon\Http\Response\Cookies::delete()` now falls back to the `$_COOKIE` superglobal so it can delete a cookie that was not set in the same request, and `Phalcon\Http\Cookie::delete()` expires the cookie with its own stored `path` and `domain` instead of the defaults.

On MariaDB, `describeColumns()` was returning string, date and time defaults still wrapped in quotes (`'fi'` rather than `fi`), because MariaDB reports `COLUMN_DEFAULT` as DDL source rather than a resolved literal. **If you were stripping those quotes yourself, remove the workaround.** MySQL is unaffected.

## Housekeeping

5.18 builds on **Zephir 1.2.0**. The distribution tarball that Composer and PIE download now ships only what is needed to build the extension - tests, Zephir sources, tooling and the Docker development setup are excluded through `.gitattributes`. Internally, fully-qualified class-name strings were replaced with `::class` references across the factories, service providers and DI containers.

Everything above is mirrored in the v6 PHP implementation, released as **`v6.0.0beta5`** - the package moved out of alpha during this cycle.

## The ecosystem

- **[Crest](https://github.com/phalcon/crest)** - brand new this cycle (WIP). A command line application for Phalcon projects aimed to replace the phalcon-devtools which has not seen any traffic since v4. Crest offer for now: generators (`make:action`, `make:command`, `make:middleware`, `make:provider`, `make:responder`, `stub:publish`) and introspection (`route:list`, `container:list`, `event:list`, `config:show`, `about`). It reads the ADR routing convention from the framework rather than reimplementing it, and `container:list`/`event:list` are built on the new `Enumerable` contracts in 5.18. Stubs are overridable per project, and crest itself needs neither the C extension nor the PHP package to run - install it with `composer require --dev phalcon/crest`. It is still work in progress, but the plan is to extend its features to MVC, CLI and Micro component generation.
- **[Vökuró ADR](https://github.com/phalcon/vokuro-adr)** - also new. The full Vökuró sample application rebuilt as ports and adapters, with no `DiInterface` anywhere in the delivery ring: authentication, ACL permissions, user and profile management, forms, CSRF and mailing, all behind contracts with the technology-bound adapters kept in `Application` and `Infrastructure`. It carries a unit suite driven by in-memory fakes plus a MySQL integration suite with merged coverage, and a `docs/` folder covering architecture, payloads and testing. It was built against v6; with the ADR stack shipping in 5.18, the v5 build is now unblocked.
- **[Talon](https://github.com/phalcon/talon)** - reached `v0.9.0`. MariaDB joins the recognized drivers with its own suite, service container and CI job, configured independently of MySQL. A new `Database\Dialect` enum (and `DatabaseTrait::getDialect()`) resolves a connection to its SQL dialect and quotes identifiers accordingly, so reserved words such as `order` and `key` work. Two quiet correctness bugs are gone: `select()` now matches a `null` criterion with `IS NULL` (so `assertNotInDatabase()` was previously passing regardless of the data), and `DATA_POSTGRES_SCHEMA` is actually applied as `SET search_path`. Coverage is now merged across the unit, MariaDB, MySQL and PostgreSQL suites. Earlier in the cycle `v0.8.0` added the REST/JSON testing surface - `RestTrait`, `RestAssertionsTrait`, `AbstractRestTestCase`, `HttpCode`, `JsonType` and `JsonSubset`.
- **[Vökuró](https://github.com/phalcon/vokuro)** - shipped `v5.0.4` at the start of the cycle: the debug bar's logger adapter now feeds the bar directly, a `ControllerBase::flashForward()` helper replaces the repeated flash-and-forward blocks, and the controllers, forms, models, providers and plugins are fully typed with PHPStan sitting at level 7.
- **[INVO](https://github.com/phalcon/invo)** - now installable with `composer create-project`, with its suite driven by the Talon runner and shared forward/flash/not-found helpers pulled up into `ControllerBase` (plus an `IdAndNameFieldsTrait` shared by the Companies, Products and ProductTypes forms). 

## Thanks

As always, thank you to everyone who reported an issue, opened a pull request, or tested a build
before it shipped.

---

## Changelog 

## [5.18.0](https://github.com/phalcon/cphalcon/releases/tag/v5.18.0) (2026-07-31)

### Tools

- Zephir 1.2.0 (83d8f68)
 
### Changed

- Changed `Phalcon\ADR\Application` into a self-contained composition root: it owns (or accepts) a `Phalcon\Container\Container` and exposes a small registration surface - `bind()`, `define()`, `factory()`, `set()`, `extend()` and `getContainer()` - plus `setBaseNamespace()` and `secureWith()` for convention-router and namespace-prefix guard configuration. `Phalcon\ADR\Front\AbstractHttpFront` gained a protected `getApplication()` hook returning `Phalcon\Contracts\ADR\Application`, so a front controller can configure the application or wire a different implementation. [#17389](https://github.com/phalcon/cphalcon/issues/17389) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Replaced fully-qualified class-name strings with `::class` references (and `use` imports) across factories, service providers and DI containers [#17380](https://github.com/phalcon/cphalcon/issues/17380)
- Changed `Phalcon\Mvc\Model::getRelated()` and `Phalcon\Mvc\Model::isRelationshipLoaded()` to test the relation cache with `array_key_exists()` instead of `isset()`, so a to-one relation that resolves to no record is no longer re-queried on every access [#17331](https://github.com/phalcon/cphalcon/issues/17331) [[doc]](https://docs.phalcon.io/5.18/db-models-relationships/)
- Changed `Phalcon\Mvc\Model\Manager::mergeFindParameters()` from `final protected` to `final public static` [#17331](https://github.com/phalcon/cphalcon/issues/17331)
- Changed `Phalcon\ADR\Router\Router` from a candidate chain to a namespace descent: a path segment becomes a namespace segment only if the matching directory exists, after which at most two Action classes are probed instead of five. An Action can no longer be silently shadowed by an earlier candidate. Requires `setActionDirectory()`. [#17405](https://github.com/phalcon/cphalcon/issues/17405) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Changed `Phalcon\ADR\Router\Router` to derive exactly one Action class per path: the class name is the verb followed by every static segment concatenated. [#17410](https://github.com/phalcon/cphalcon/issues/17410) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Changed `Phalcon\Mvc\Model\Resultset::refresh()` to reset the cursor - position, current row, buffered rows and active row - after replaying the statement. [#17399](https://github.com/phalcon/cphalcon/issues/17399) [[doc]](https://docs.phalcon.io/5.18/db-models/)
- Changed `Phalcon\Events\Manager::getEventTypes()` to `getListenerMap()`, which now returns each event type mapped to its listeners. [#17416](https://github.com/phalcon/cphalcon/issues/17416) [[doc]](https://docs.phalcon.io/5.18/events/)
- Changed the distribution tarball that Composer and PIE download to ship only the files needed to build the extension; tests, Zephir sources, tooling and the Docker development setup are now excluded through `.gitattributes`. [#17419](https://github.com/phalcon/cphalcon/issues/17419)

### Added

- Added the Action-Domain-Responder (ADR) HTTP stack under `Phalcon\ADR`, an alternative to MVC that splits request handling into three focused roles: an _Action_ (one invokable class per route) drives a _Domain_ (your business logic, which returns a `Phalcon\ADR\Payload\Payload` and never touches HTTP) and hands the result to a _Responder_ that turns it into a response.
  - `Phalcon\ADR\Container`: registrations for the `Phalcon\Container\Container`
  - `Phalcon\ADR\Emitter` : `SapiEmitter` to emit response data
  - `Phalcon\ADR\Events` : events wired to the Events Manager
  - `Phalcon\ADR\Exceptions` : granular exceptions the namespace throws
  - `Phalcon\ADR\Front` : One-command class wiring the application and executing it
  - `Phalcon\ADR\Input` : Bag of request data to be passed to the domain
  - `Phalcon\ADR\Middleware` : Onion based middleware stack
  - `Phalcon\ADR\Payload` : VO for transferring data from the domain and the responder
  - `Phalcon\ADR\Responder` : Chainable responders, handling redirect, json, text, error etc.
  - `Phalcon\ADR\Router` : Router for the application. [#17341](https://github.com/phalcon/cphalcon/issues/17341) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Added `Phalcon\ADR\Responder\ViewResponder`, which renders a `.phtml` template and returns it as an HTML response. The action picks the template with `withTemplate()`, and the view receives `result`, `messages` and `status`. Any renderer implementing the new `Phalcon\Contracts\View\Renderer` can be used - `Phalcon\Mvc\View\Simple` now does. [#17379](https://github.com/phalcon/cphalcon/issues/17379) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Added request attributes support to `Phalcon\Http\Request`. `Phalcon\Http\Request::getAttributes()` returns a `Phalcon\Http\Request\Bag\AttributeBag`, a mutable, string-keyed bag of arbitrary application-defined values attached to the request during its lifecycle (router, dispatcher, security components etc.). Writing with a `null` key (the `$bag[] = ...` append form) throws the new `Phalcon\Http\Request\Exceptions\NullKeyException`, since bag elements are always string-keyed. [#17367](https://github.com/phalcon/cphalcon/issues/17367) [[doc]](https://docs.phalcon.io/5.18/http-request/)
- Added opt-in route-parameter pre-filtering to the ADR convention router via the new `Phalcon\ADR\Router\AttributeFilter`. An Action that declares a static `params()` method has its positional route segments validated against a regex, cast to a scalar type (`int`, `float`, `string`) and optionally passed through a converter closure, then written to the request as named attributes - all before the Action runs. A regex miss is treated as a route miss (404). [#17393](https://github.com/phalcon/cphalcon/issues/17393) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Added eager loading of model relations: `Phalcon\Mvc\Model::find()` accepts an `eager` parameter - an array of dot-delimited relation paths, optionally `path => options` - which pre-loads the named relations with one query per relation instead of one per record. `Phalcon\Mvc\Model\Criteria::eager()` exposes the same on the criteria surface. [#17331](https://github.com/phalcon/cphalcon/issues/17331) [[doc]](https://docs.phalcon.io/5.18/db-models-relationships/)
- Added `candidatesFor()` to the `Phalcon\Contracts\ADR\Router\Router` contract and to `Phalcon\ADR\Router\Router`. It returns every Action class the convention router would try for a given HTTP method and path, in the order it tries them. [#17403](https://github.com/phalcon/cphalcon/issues/17403) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Added `pathFor()`, `setActionDirectory()` and `setWordSeparator()` to the `Phalcon\Contracts\ADR\Router\Router` contract and to `Phalcon\ADR\Router\Router`; the two setters are also on `Phalcon\ADR\Application`. `pathFor()` is the inverse of the routing convention, returning the canonical path an Action answers or `null`. Added `Phalcon\ADR\Exceptions\ActionDirectoryNotSet`. [#17405](https://github.com/phalcon/cphalcon/issues/17405) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Added `Phalcon\Container\Container::getServiceNames()`, returning the names of every registered service definition. [#17406](https://github.com/phalcon/cphalcon/issues/17406) [[doc]](https://docs.phalcon.io/5.18/container/)
- ~~Added `Phalcon\Events\Manager::getEventTypes()`, returning the event types that currently have at least one listener attached, including those contributed by subscribers. [#17406](https://github.com/phalcon/cphalcon/issues/17406) [[doc]](https://docs.phalcon.io/5.18/events/)~~
- Added `classFor()` to the `Phalcon\Contracts\ADR\Router\Router` contract and to `Phalcon\ADR\Router\Router`. It names the Action class the convention would use for a static path. [#17410](https://github.com/phalcon/cphalcon/issues/17410) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Added `Phalcon\ADR\Front\AbstractHttpFront::boot()`, which builds the container, loads the environment and registers the providers, then returns the container - for consumers that need it before, or instead of, `run()`. The container is built once and cached, so `boot()` and `run()` share the same instance. A bootstrap file can now be `return (new AppFront(dirname(__DIR__)))->boot();`. [#17413](https://github.com/phalcon/cphalcon/issues/17413) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Added `Phalcon\Contracts\Container\Service\Enumerable` implemented in `Phalcon\Container\Container`. [#17416](https://github.com/phalcon/cphalcon/issues/17416) [[doc]](https://docs.phalcon.io/5.18/container/)
- Added `Phalcon\Contracts\Events\Enumerable`, implemented in `Phalcon\Events\Manager`. [#17416](https://github.com/phalcon/cphalcon/issues/17416) [[doc]](https://docs.phalcon.io/5.18/events/)
- Added `methodFor()` to the `Phalcon\Contracts\ADR\Router\Router` contract and to `Phalcon\ADR\Router\Router`. It names the HTTP method an Action class answers, the counterpart to `pathFor()`. [#17416](https://github.com/phalcon/cphalcon/issues/17416) [[doc]](https://docs.phalcon.io/5.18/adr/)

### Fixed

- Fixed `Phalcon\Container\Definition\ServiceDefinition::resolveArgs()` treating any constructor-argument object that merely exposes a `resolve()` method as a lazy value, using `method_exists()`. Because `Phalcon\Container\Container` defines a private `resolve()`, autowiring a service whose constructor receives the container - i.e. `__construct(?Container $container)` - mistook the injected container for a lazy resolvable. The lazy check is now guarded for non-object arguments. [#17391](https://github.com/phalcon/cphalcon/issues/17391)
- Fixed `Phalcon\Http\Response\Cookies::delete()` not deleting a cookie that was not set in the same request; it now falls back to the `$_COOKIE` superglobal. `Phalcon\Http\Cookie::delete()` expires the cookie with its stored `path` and `domain` instead of the defaults. [#17395](https://github.com/phalcon/cphalcon/issues/17395) [[doc]](https://docs.phalcon.io/5.18/http-response/)
- Fixed `Phalcon\Mvc\Model` ignoring attributes registered with `skipAttributes()`, `skipAttributesOnCreate()` and `skipAttributesOnUpdate()`, so a skipped column was emitted in the generated `INSERT`/`UPDATE` (breaking, for instance, inserts into a table with a MySQL generated column). The skip list is keyed with `null` values, and `isset()` on an array offset now follows PHP semantics (key present *and* value not `null`), which made every skipped attribute read as not registered; the checks in `doLowInsert()`, `doLowUpdate()` and the not-null validation now use `array_key_exists()`. [#17382](https://github.com/phalcon/cphalcon/issues/17382) [[doc]](https://docs.phalcon.io/5.18/db-models/)
- Fixed `Phalcon\Mvc\Model` inserting a literal `null` for a column the database can supply a value for, instead of the `DEFAULT` keyword (or omitting the column on an adapter without `DEFAULT` support, such as SQLite). This restores inserts against a MySQL `GENERATED ALWAYS AS (...) STORED` column, which rejects an explicit `null` with `SQLSTATE[HY000]: General error: 3105` but accepts `DEFAULT`. [#17382](https://github.com/phalcon/cphalcon/issues/17382) [[doc]](https://docs.phalcon.io/5.18/db-models/)
- Fixed `Phalcon\ADR\Router\Router` treating `-` and `_` as the same delimiter, so `/forgot-password` and `/forgot_password` resolved to the same Action and the path-to-class map had no inverse. A single separator now applies in both directions, default `-` and settable with `setWordSeparator()`; `_` is literal. [#17405](https://github.com/phalcon/cphalcon/issues/17405) [[doc]](https://docs.phalcon.io/5.18/adr/)
- Fixed `Phalcon\Mvc\Model::find()` and `Phalcon\Mvc\Model::findFirst()` raising an error `Call to undefined method static::getpreparedquery()`. Using `self` vs. 'static` for the internal calls. [#17409](https://github.com/phalcon/cphalcon/issues/17409) [[doc]](https://docs.phalcon.io/5.18/db-models/)
- Fixed `Phalcon\Mvc\Model\Resultset` costing two statements for every resultset on SQLite. [#17399](https://github.com/phalcon/cphalcon/issues/17399) [[doc]](https://docs.phalcon.io/5.18/db-models/)
- Fixed `Phalcon\Db\Result\PdoResult::numRows()` failing on multi-line statements. [#17399](https://github.com/phalcon/cphalcon/issues/17399)
- Fixed `Phalcon\Mvc\Model\Resultset::seek()` leaving the previous row in place as the current one when seeking past the end of a resultset held in memory. [#17399](https://github.com/phalcon/cphalcon/issues/17399) [[doc]](https://docs.phalcon.io/5.18/db-models/)
- Fixed `Phalcon\Db\Adapter\Pdo\Mysql::describeColumns()` returning string, date and time defaults still wrapped in quotes on MariaDB, e.g. `'fi'` instead of `fi`. MariaDB reports `COLUMN_DEFAULT` as the DDL source rather than the resolved literal. Expression defaults are unaffected. Note that on MariaDB this changes what `Phalcon\Db\Column::getDefault()` returns and what the model layer writes into an unset `NOT NULL` column on save; if you were stripping the quotes yourself, remove that workaround. MySQL is unaffected. [#17417](https://github.com/phalcon/cphalcon/issues/17417) [[doc]](https://docs.phalcon.io/5.18/db-layer/)

### Removed

- Removed `.php_cs.dist`, superseded by `resources/php-cs-fixer.php`. [#17419](https://github.com/phalcon/cphalcon/issues/17419)

## Upgrade
Developers can upgrade using PIE

```bash
pie install phalcon/cphalcon-5.18.0
```

To compile from source, follow our [installation document][installation_document]

[adr]: https://pmjones.io/adr/
[installation_document]: https://docs.phalcon.io/5.18/installation
[5_18_0]: https://github.com/phalcon/cphalcon/releases/tag/v5.18.0
