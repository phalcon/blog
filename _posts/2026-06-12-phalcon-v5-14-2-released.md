---
layout: post
title: Phalcon v5.14.2 Released
image: /assets/files/2026-06-12-phalcon-5.14.2-release.svg
date: 2026-06-12T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon [v5.14.2][5_14_2] has been released!

<!--more-->

Phalcon 5.14.2 addresses 11 bugs and several changes, plus adds more functionality to the framework (see below). Some of the features have been requested a long time ago, and we are happy to finally be able to introduce them and clean up the issue tracker, which between `cphalcon` and `phalcon` stands to around 65 issues. We have not seen such a low number in a very long time :)

## v5

### Db

- Added support for operators `@@`, `@>`, `<@`, `&&`, `||`, `->`, `->>`, `#>`, `#>>` (each has a different meaning for each RDBMS)
- Added Geometry support (`Point`, `LineString`, `Polygon`, `MultiPoint`, `MultiLineString`, `MultiPolygon`, `GeometryCollection`) and read-side hydration of spatial columns. 
- Added table comments support
- 
### Filter

New `AspectRatio` validator for uploaded images

### Session

- Enabling session locks (`session.lazy_write`)
- Added opt-in session locking for Redis 

### Storage

- Added a `stripPrefix` option (default `true`) to the `Phalcon\Storage` / `Phalcon\Cache` adapters.


## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting! 

## Changelog

## [5.14.2](https://github.com/phalcon/cphalcon/releases/tag/v5.14.2) (2026-06-12)

### Tools

- Zephir Parser v2.0.4
- Zephir 0.23.0 (development - 27535f802)

### Changed

- Changed `Phalcon\Cli\Console::handle()` to process module definitions the same way as `Phalcon\Mvc\Application::handle()`. The module is now resolved through the inherited `getModule()`, so an unregistered module throws `Phalcon\Application\Exceptions\ModuleNotRegistered` (as `Console::getModule()` already did) instead of `Phalcon\Cli\Console\Exceptions\ConsoleModuleNotRegistered`. `Closure` module definitions are now supported and are invoked with the container, matching MVC. A definition that is neither an array nor a `Closure` throws the new `Phalcon\Cli\Console\Exceptions\InvalidModuleDefinition` instead of `InvalidModuleDefinitionPath`. [#17107](https://github.com/phalcon/cphalcon/issues/17107)
- Changed `Phalcon\Config\Adapter\Ini::parseIniString()` to use `Phalcon\Config\Config::DEFAULT_PATH_DELIMITER` for the key nesting separator instead of a hardcoded `.` (no behavior change). [#17134](https://github.com/phalcon/cphalcon/issues/17134)
- Changed `Phalcon\Config\Adapter\Json` and `Phalcon\Config\Adapter\Php` to throw `Phalcon\Config\Exceptions\CannotLoadConfigFile` when the configuration file cannot be read, instead of failing inside the JSON decoder (`Json`) or with a fatal `require` error (`Php`). All file based Config adapters now share the same failure contract. [#17134](https://github.com/phalcon/cphalcon/issues/17134)
- Changed `Phalcon\Config\ConfigFactory` to resolve adapter-specific constructor arguments (`mode` for `ini`, `callbacks` for `yaml`) through a single internal parameter map consulted by both `load()` and `newInstance()`, instead of two hardcoded switches. `load()` now also resolves the `yml` adapter name / file extension to the `yaml` adapter. [#17134](https://github.com/phalcon/cphalcon/issues/17134)
- Consolidated the `allowEmpty` handling of `Phalcon\Filter\Validation` into the validator (`Phalcon\Filter\Validation\AbstractValidator::isAllowEmpty()`). The per-field `allowEmpty` map is also honored. [#17124](https://github.com/phalcon/cphalcon/issues/17124)
- Moved the resolution of an array `attribute` option from `Phalcon\Filter\Validation\AbstractValidator::getOption()` into `Phalcon\Filter\Validation\Validator\Uniqueness::getOption()`. [#17124](https://github.com/phalcon/cphalcon/issues/17124)

### Added

- Added `Phalcon\Filter\Filter::getDefaultMapper()`, for mapper services used also by `Phalcon\Filter\FilterFactory::getServices()`. [#17124](https://github.com/phalcon/cphalcon/issues/17124)
- Added `Phalcon\Filter\Validation\Validator\File\Resolution\AspectRatio`, validating that an uploaded image has an exact aspect ratio. The `ratio` option uses the `16x9` format (per-field array form supported) and is compared with integer cross-multiplication, so the dimensions must match exactly: 1920x1080 matches `16x9`, 1366x768 does not. Also available through the composite `Phalcon\Filter\Validation\Validator\File` via the `aspectRatio` and `messageAspectRatio` options. [#17104](https://github.com/phalcon/cphalcon/issues/17104)
- Added `SessionUpdateTimestampHandlerInterface` support to the `Phalcon\Session` adapters (`Noop`, `Stream`, `Redis`, `Libmemcached`), enabling PHP's `session.lazy_write` (on by default): when the session data is unchanged at close, PHP now calls `updateTimestamp()` instead of `write()`. `Stream` touches the session file without rewriting its data; `Redis` and `Libmemcached` delegate to `write()` to refresh the TTL. With `session.use_strict_mode` enabled, the new `validateId()` rejects uninitialized session ids. [#17129](https://github.com/phalcon/cphalcon/issues/17129)
- Added a `stripPrefix` option (default `true`) to the `Phalcon\Storage` / `Phalcon\Cache` adapters, controlling whether a leading prefix is stripped from incoming keys (the behavior introduced for [#17089](https://github.com/phalcon/cphalcon/issues/17089)). `Phalcon\Session\Adapter\Redis` and `Phalcon\Session\Adapter\Libmemcached` disable it by default: session ids are externally generated, so an id that happens to start with the prefix text must not collide with another session. [#17127](https://github.com/phalcon/cphalcon/issues/17127)
- Added an optional `Phalcon\Config\ConfigFactory` constructor parameter to `Phalcon\Config\Adapter\Grouped`. The factory is created once and reused for every configuration fragment, so custom adapters registered on a supplied factory are now visible when loading grouped configurations. [#17134](https://github.com/phalcon/cphalcon/issues/17134)
- Added dialect-specific operators to PHQL: `@@`, `@>`, `<@`, `&&`, `||`, `->`, `->>`, `#>`, `#>>`. Each is parsed into a binary expression and emitted only by the dialects that support it (PostgreSQL: all nine; MySQL: `->`, `->>`; SQLite: `||`, `->`, `->>`); using an operator on a dialect that does not support it throws `Phalcon\Db\Exceptions\UnsupportedOperator`. The jsonb existence operators (`?`, `?|`, `?&`, `@?`) and the `~` regex family are intentionally unsupported - use their function equivalents (e.g. `jsonb_exists()`, `regexp_like()`). [#14954](https://github.com/phalcon/cphalcon/issues/14954) [#14579](https://github.com/phalcon/cphalcon/issues/14579)
- Added geometry value objects under `Phalcon\Db\Geometry` (`Point`, `LineString`, `Polygon`, `MultiPoint`, `MultiLineString`, `MultiPolygon`, `GeometryCollection`) and read-side hydration of spatial columns. When `orm.cast_on_hydrate` is enabled, spatial column values (MySQL WKB / PostGIS EWKB) are decoded into these objects on model read; otherwise the raw value is returned unchanged. [#17110](https://github.com/phalcon/cphalcon/issues/17110) [#14769](https://github.com/phalcon/cphalcon/issues/14769) [#13670](https://github.com/phalcon/cphalcon/issues/13670)
- Added opt-in session locking to `Phalcon\Session\Adapter\Redis`, preventing concurrent requests from racing on the same session (stale reads / lost writes). When enabled with the new `lockingEnabled` constructor option, `read()` acquires a per-session lock (`SET NX EX`, retried with pauses) and `close()` / `destroy()` release it with a token-guarded delete, so an adapter can only remove a lock it still owns. A read that cannot acquire the lock throws `Phalcon\Session\Adapter\Exceptions\AdapterRuntimeError`. Tunable via the `lockExpiry` (lock TTL in seconds, default `30`), `lockRetries` (maximum attempts, default `100`) and `lockWaitTime` (microseconds between attempts, default `50000`) options. Locking is off by default. [#17126](https://github.com/phalcon/cphalcon/issues/17126)
- Added table comment support to the MySQL and PostgreSQL dialects. Comment values are single-quote escaped (the existing PostgreSQL column-comment emission is now escaped as well). SQLite has no native table comment and ignores the option. [#15258](https://github.com/phalcon/cphalcon/issues/15258)
- Added the `Phalcon\Contracts\Filter\Sanitizer` interface and moving array recursion in `Phalcon\Filter\Filter::sanitize()`. [#17124](https://github.com/phalcon/cphalcon/issues/17124)

### Fixed

- Fixed `Phalcon\Config\Config::cloneEmpty()` so that `filter()`, `map()`, `sort()` and `where()` no longer fail on adapter instances (`Ini`, `Json`, `Php`, `Yaml`, `Grouped`). The override clones the current instance and replaces its data instead of invoking the adapter constructor with the parent `(array $data, ...)` signature. [#17134](https://github.com/phalcon/cphalcon/issues/17134)
- Fixed `Phalcon\Config\Config::merge()` emptying the configuration before validating its argument. Invalid merge data still throws `Phalcon\Config\Exceptions\InvalidMergeData`, but the current configuration now survives intact. [#17134](https://github.com/phalcon/cphalcon/issues/17134)
- Fixed `Phalcon\Config\Config::setData()` bypassing the `Phalcon\Support\Collection` runtime type guard: a `type` passed to the constructor is now enforced on leaf values at every nesting depth (arrays become nested Config objects, which validate their own leaves). Nested Config objects also inherit the `strictNull` and `type` flags in addition to `insensitive`. [#17134](https://github.com/phalcon/cphalcon/issues/17134)
- Fixed `Phalcon\Http\Cookie::send()` fataling when the cookie has a non-empty definition and no DI container is set. The session integration (service lookup, started check, and the `_PHCOOKIE_` key convention) is now consolidated in private `getStartedSession()`/`getSessionKey()` helpers shared by `delete()`, `restore()` and `send()`. [#17127](https://github.com/phalcon/cphalcon/issues/17127)
- Fixed `Phalcon\Mvc\Model::groupResult()` declaring a `Phalcon\Mvc\Model\ResultsetInterface` return type while returning a scalar (`int`, `float`, `string`, or `null`) for non-grouped aggregate queries (`count()`, `sum()`, `average()`, `maximum()`, `minimum()`). The return type declaration has been removed (`@return int|float|string|null|ResultsetInterface`), so model subclasses can override `groupResult()` without risking a `TypeError`. [#17114](https://github.com/phalcon/cphalcon/issues/17114)
- Fixed `Phalcon\Mvc\Model::save()` and `Phalcon\Mvc\Model::update()` to run the record-existence check on the write connection instead of the read connection. On master-replica setups, replication lag could make the check miss a row already written to the master, causing `save()` to attempt an `INSERT` instead of an `UPDATE`, or `update()` to fail with `Record cannot be updated because it does not exist`. `create()` has used the write connection since [#14256](https://github.com/phalcon/cphalcon/issues/14256). [#17105](https://github.com/phalcon/cphalcon/issues/17105)
- Fixed `Phalcon\Session\Bag` calling `getDI()` on its `Phalcon\Session\ManagerInterface` constructor parameter - a method the interface does not declare - which fataled for any manager implementing only the interface. The container is now captured only when the manager provides one. [#17127](https://github.com/phalcon/cphalcon/issues/17127)
- Fixed `Phalcon\Session\Manager::start()` deleting valid session cookies when `session.sid_bits_per_character` is `6`: the cookie sanity check now accepts the full PHP session ID alphabet (`[a-zA-Z0-9,-]`) instead of alphanumerics only. [#17127](https://github.com/phalcon/cphalcon/issues/17127)
- Fixed the Volt parser raising `Syntax error, unexpected token DEFAULT` when the `default` filter (e.g. `{{ value|default('text') }}`) is used inside a `{% switch %}` block. The word `default` is now treated as the `{% default %}` clause only when it directly follows the opening `{%` delimiter inside a switch; everywhere else it is parsed as a plain identifier, so the filter, `{{ default }}` and `{% set default = ... %}` all work inside switch-case blocks. [#16003](https://github.com/phalcon/cphalcon/issues/16003)
- Fixed the `Phalcon\Storage` / `Phalcon\Cache` adapters to accept keys already carrying the adapter prefix, so keys returned by `getKeys()` can be passed straight back to `get()`, `has()`, `delete()`, `deleteMultiple()`, `set()`, `setForever()`, `increment()` and `decrement()`. `Phalcon\Storage\Adapter\AbstractAdapter` now strips a leading prefix from incoming keys. [#17089](https://github.com/phalcon/cphalcon/issues/17089)
- Fixed the alternative installation script (`build/install`) to set the installed `phalcon.so` to mode `0644` after `make install`. The PHP build system installs shared extensions with the `install` default mode `0755`; shared objects only need read permission. [#17113](https://github.com/phalcon/cphalcon/issues/17113)

### Removed

- Removed `Phalcon\Cli\Console\Exceptions\ConsoleModuleNotRegistered` and `Phalcon\Cli\Console\Exceptions\InvalidModuleDefinitionPath`, superseded by `Phalcon\Application\Exceptions\ModuleNotRegistered` and `Phalcon\Cli\Console\Exceptions\InvalidModuleDefinition`. [#17107](https://github.com/phalcon/cphalcon/issues/17107)

## Upgrade
Developers can upgrade using PIE

```bash
pie install phalcon/cphalcon-5.14.2
```

To compile from source, follow our [installation document][installation_document]

[installation_document]: https://docs.phalcon.io/5.14/installation
[5_14_2]: https://github.com/phalcon/cphalcon/releases/tag/5.13.2
[auth]: https://docs.phalcon.io/5.14/auth
[container]: https://docs.phalcon.io/5.14/container
