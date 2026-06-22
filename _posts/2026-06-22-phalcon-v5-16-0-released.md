---
layout: post
title: Phalcon v5.16.0 Released
image: /assets/files/2026-06-22-phalcon-5.16.0-release.svg
date: 2026-06-22T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
Queue suspenseful music: Phalcon [v5.16.0][5_16_0] has been released!

<!--more-->

## v5

### Phalcon\Queue

It is finally (back). Removed since the very early v4 days because we needed to redesign it, the `Phalcon\Queue` namespace is now available! It was one of the most requested features and we happy to finally tackle it. 

You can read the mechanics in the [queue documentation][queue_docs] but the highlights are:

- Adapters: Memory (in-process FIFO), Stream (file-per-queue with flock), Redis (LPUSH/BRPOP with sorted-set delay and blocking receive), and Beanstalk
  (dependency-free socket client, native delay/priority, touch() visibility).
- Contracts & exceptions: `Phalcon\Contracts\Queue\*` interfaces and granular exceptions in `Phalcon\Queue\Exceptions\*`.
- Factories & DI: `AdapterFactory`, `QueueFactory`, and a `queueFactory` service registered in `FactoryDefault` and `FactoryDefault\Cli`.
- Consumer runner: `QueueConsumer`, `Worker`, `WorkerOptions`, `BoundProcessor`, plus a CLI `ConsumerTask`.

### Phalcon\Support\Debug

Not as exciting as the `Queue` component, the `Phalcon\Support\Debug` got a nice face lift and a long needed refactoring. The previous implementation with hundreds of lines of code has now been split into smaller manageable components, where `Debug` acts as a coordinator, separating concerns nicely. The component now offers the ability to define your own template on how the output shows on screen, making it more flexible.


### Database auto-reconnect

The database layer now offers an opt-in connection liveness. With `ping()`, `ensureConnection()`, and `setAutoReconnect()`/`getAutoReconnect()` developers can set their database connection to auto reconnect if the RDBMS has "gone away"

### Fixes

A few fixes:
- ORM hydration setters can be called in `cloneResultsetMap()` with the new `orm.call_setters_on_hydration` setting
- Fixed a Router ReDoS issue with the parameters
- Fixed `Tag\Select::selectField()` to shield a bit more when using the `using` functionality


## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting! 

## Changelog

## [5.16.0](https://github.com/phalcon/cphalcon/releases/tag/v5.15.1) (2026-06-22)

### Tools

- Zephir Parser v2.0.4
- Zephir 0.23.0 (development - f87b27ba9)

### Changed

- Changed `Phalcon\Support\Debug::getVersion()` to return a compact version badge anchor (`v<version>`) instead of the previous "Phalcon Framework" version block. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)
- Changed `Phalcon\Support\Debug` and `Phalcon\Support\Debug\Dump` to render from named, overridable template strings (the new `Phalcon\Contracts\Support\Debug\TemplateAware` contract with `getTemplate()`/`setTemplate()`) filled by `strtr`, instead of inline string concatenation. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)
- Changed `Phalcon\Support\Debug` into a thin coordinator that delegates exception-data collection to the new `Phalcon\Support\Debug\ReportBuilder` and HTML rendering to a `Phalcon\Contracts\Support\Debug\Renderer` (default `Phalcon\Support\Debug\Renderer\HtmlRenderer`), and exposes `getRenderer()`/`setRenderer()` to swap the renderer. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)
- Changed the `Phalcon\Support\Debug` Memory panel to report both real and peak memory usage. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)
- Changed the `Phalcon\Support\Debug` exception page to a redesigned, asset-driven layout (masthead with the Phalcon logo, error card, tabbed Request/Server/Included Files/Memory/Variables context, and collapsible backtrace frames); `getCssSources()` and `getJsSources()` now reference a single `debug.css` and `debug.js` instead of the bundled jQuery, jQuery-UI and prettify assets. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)

### Added

- Added `Phalcon\Support\Debug::getRenderer()` and `Phalcon\Support\Debug::setRenderer()`. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)
- Added connection-liveness and opt-in auto-reconnect support to `Phalcon\Db\Adapter\Pdo\AbstractPdo`: `ping()` (a `SELECT 1` probe), `ensureConnection()` (reconnect in place when the probe fails), and `setAutoReconnect()`/`getAutoReconnect()` (also settable via the `autoReconnect` descriptor key). When auto-reconnect is enabled and a query fails on a lost ("gone away") connection outside a transaction, `execute()` and `query()` fire the new `db:connectionLost` event, reconnect, and retry the statement once; a loss inside a transaction is re-thrown without retry. "Gone away" detection is provided per driver by `Phalcon\Db\Adapter\Pdo\Mysql` (error codes 2006/2013) and `Phalcon\Db\Adapter\Pdo\Postgresql` (SQLSTATE 08003/08006/57P01-03), with a message fallback. [#17204](https://github.com/phalcon/cphalcon/issues/17204) [[doc]](https://docs.phalcon.io/5.16/db-layer/)
- Added the Beanstalk queue adapter (`Phalcon\Queue\Adapter\Beanstalk\*`) over a dependency-free socket client, with native delivery delay and priority and a `VisibilityAware` consumer (`touch()`). [#17051](https://github.com/phalcon/cphalcon/issues/17051) [[doc]](https://docs.phalcon.io/5.15/queue/)
- Added the Memory and Stream queue adapters (`Phalcon\Queue\Adapter\Memory\*`, in-process FIFO; `Phalcon\Queue\Adapter\Stream\*`, file-per-queue with `flock`). [#17051](https://github.com/phalcon/cphalcon/issues/17051) [[doc]](https://docs.phalcon.io/5.16/queue/)
- Added the Redis queue adapter (`Phalcon\Queue\Adapter\Redis\*`) with list-backed FIFO delivery (`LPUSH`/`BRPOP`), sorted-set delivery delay and native blocking receive. [#17051](https://github.com/phalcon/cphalcon/issues/17051) [[doc]](https://docs.phalcon.io/5.16/queue/)
- Added the `Phalcon\Contracts\Support\Debug\TemplateAware` and `Phalcon\Contracts\Support\Debug\Renderer` contracts, the `Phalcon\Support\Debug\ReportBuilder` and `Phalcon\Support\Debug\Renderer\HtmlRenderer` classes, and the value objects `Phalcon\Support\Debug\Report\ExceptionReport` and `Phalcon\Support\Debug\Report\BacktraceItem`. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)
- Added the `Phalcon\Queue\AdapterFactory` and `Phalcon\Queue\QueueFactory` factories, and registered the `queueFactory` service in `Phalcon\Di\FactoryDefault` and `Phalcon\Di\FactoryDefault\Cli`. [#17051](https://github.com/phalcon/cphalcon/issues/17051) [[doc]](https://docs.phalcon.io/5.16/queue/)
- Added the `Phalcon\Queue` component, a first-class queue/messaging layer modeled on the queue-interop contracts, with the `Phalcon\Contracts\Queue\*` interfaces (`ConnectionFactory`, `Context`, `Destination`, `Queue`, `Topic`, `Producer`, `Consumer`, `SubscriptionConsumer`, `Message`, `Processor`, `VisibilityAware`) and the `Phalcon\Queue\Exceptions\*` hierarchy (`QueueThrowable`, `Exception` and the typed `Invalid*` / `*NotSupportedException` exceptions). [#17051](https://github.com/phalcon/cphalcon/issues/17051) [[doc]](https://docs.phalcon.io/5.16/queue/)
- Added the queue consumer runner (`Phalcon\Queue\Consumer\QueueConsumer`, `Worker`, `WorkerOptions`, `BoundProcessor`, `Events`) and the CLI consumer task `Phalcon\Queue\Cli\ConsumerTask`. [#17051](https://github.com/phalcon/cphalcon/issues/17051) [[doc]](https://docs.phalcon.io/5.16/queue/)
- Added the same liveness and opt-in auto-reconnect support to `Phalcon\DataMapper\Pdo\Connection` (`ping()`, `ensureConnection()`, `setAutoReconnect()`/`getAutoReconnect()`), wrapping `exec()`, `perform()`, `prepare()`, and `query()` with the single-retry behavior. This connection has no events manager, so no `db:connectionLost` event is fired; "gone away" detection is driver-agnostic and the in-transaction guard uses a locally tracked transaction level. [#17204](https://github.com/phalcon/cphalcon/issues/17204) [[doc]](https://docs.phalcon.io/5.16/db-layer/)

### Fixed

- Fixed `Phalcon\Mvc\Model::cloneResultMap()` calling model setters during ORM hydration unconditionally (introduced in 5.12.0 via [#14810](https://github.com/phalcon/cphalcon/issues/14810)), which ran user setters on every record hydrated by `find()`/`findFirst()`; a setter that issued an ORM query (e.g. `self::findFirstByEmail()`) recursed infinitely, as `findFirst()` re-entered `cloneResultMap()`, which re-invoked the setter, which called `findFirst()` again. Hydration setters are now gated by a dedicated `orm.call_setters_on_hydration` setting (default `false`), decoupled from `orm.disable_assign_setters` (which still governs `assign()`); this restores the pre-5.12.0 hydration behaviour by default and makes setter execution during hydration opt-in. [#17214](https://github.com/phalcon/cphalcon/issues/17214) [[doc]](https://docs.phalcon.io/5.16/db-models/)
- Fixed `Phalcon\Mvc\Router\Route::compilePattern()` and `Phalcon\Cli\Router\Route::compilePattern()` expanding the `:params` placeholder - and the built-in `/:controller/:action/:params` and `/:task/:action/:params` default routes - to the nested quantifier `(/.*)*`. The group body overlaps itself, so an unmatchable trailing byte made the compiled pattern backtrack catastrophically: a short crafted URI (a run of `/` followed by a byte `.` cannot match) drove the `preg_match()` in `Phalcon\Mvc\Router::handle()` / `Phalcon\Cli\Router::handle()` into exponential time on every request. The trailing group is now compiled to the equivalent `(/.*)?`, which captures the same `params` value in linear time. [[doc]](https://docs.phalcon.io/5.15/routing/)
- Fixed `Phalcon\Support\Debug` ignoring the `request` entry of `setBlacklist()`: `$_REQUEST` is now filtered against the `request` blacklist, where previously both superglobals were filtered against the `server` blacklist only. [#17202](https://github.com/phalcon/cphalcon/issues/17202) [[doc]](https://docs.phalcon.io/5.16/support-debug/)
- Fixed `Phalcon\Tag\Select::selectField()` to invoke the resultset `using` render callback only when it is a `Closure` (previously any object), keeping the dynamically invoked callable out of reach of user-controlled data. [#17210](https://github.com/phalcon/cphalcon/issues/17210)

### Removed


## Upgrade
Developers can upgrade using PIE

```bash
pie install phalcon/cphalcon-5.16.0
```

To compile from source, follow our [installation document][installation_document]

[installation_document]: https://docs.phalcon.io/5.15/installation
[5_16_0]: https://github.com/phalcon/cphalcon/releases/tag/5.16.0
[queue_docs]: https://docs.phalcon.io/5.16/queue/
