---
layout: post
title: Phalcon v5.14.1 Released
image: /assets/files/2026-06-08-phalcon-5.14.1-release.svg
date: 2026-06-08T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon [v5.14.1][5_14_1] has been released!

<!--more-->

Phalcon 5.14.1 addresses several bugs, some really old, and introduces long requested features.

## v5

### Auth

Added the old `Firewall` component - an ACL based guard to the framework, utilizing events. With the latest addition of `Phalcon\Auth`, the `Firewall` component has been reimplemented to work with `Auth`. Developers can now use a registered ACL to control access to their applications. The documentation has examples on how it can be utilized. Additionally, we added a listener for the `Phalcon\Mvc\Micro` application, which can now utlize the `Phalcon\Auth` functionality.

### Db

Added support for `UPDATE ... SET ...` in PHQL. The join is used to filter the records to update.

### Events Manager

A new `Phalcon\Events\Manager::dispatch(object $event, string|array|null $name = null, ?object $source = null)` is now available, to allow for object/class-based event dispatching.

### Forms

Two new hooks are available `beforeBind` and `afterbind` offering more control on the Form. A `false` returned on the `beforeBind` cancels the bind.

### Logger

Added a new level called `trace()`.

### Relations

For Many to Many relations, developers can now use the `sync = true` parameter in the relationship definition, which will delete intermediate rows no longer present when saving the parent model. The behavior before was purely additive. Additionally, a new `Phalcon\Mvc\Model::setSync()` fluent methods has been introduced to allow the behavior to be applied, or not, on a specific save instead of the whole relationship.

### Volt

A _very_ old request has finally been implemented. Developers now have the ability to use `{% verbatim %}....{% endverbatim %}` to output HTML as is, in their volt templates. 

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting! 

## Changelog

## [5.14.1](https://github.com/phalcon/cphalcon/releases/tag/v5.14.1) (2026-06-08)

### Tools

- Zephir Parser v2.0.4
- Zephir 0.23.0 (development - bae82f7bd)

### Changed

- Renamed the private `Phalcon\Events\Manager` dispatch hot-loop helper to `runQueue()`. [#17006](https://github.com/phalcon/cphalcon/issues/17006) [[doc]](https://docs.phalcon.io/5.14/events/)
- Reworked the `Phalcon\Auth` access gates into Specification-style policies. `Phalcon\Contracts\Auth\Access\Access::isAllowed()` now receives the current identity and the request context: `isAllowed(Guard $guard, string $actionName, array $context = [])`, where context carries `handler` (controller / task / Micro component name), `module` (MVC module, when present), and `params` (dispatcher or route parameters). [#17088](https://github.com/phalcon/cphalcon/issues/17088) [[doc]](https://docs.phalcon.io/5.14/auth/)
- `Phalcon\Auth\Manager::access()` now resolves gates through `Phalcon\Auth\Access\AccessLocator` from the container instead of constructing them directly. [#17088](https://github.com/phalcon/cphalcon/issues/17088) [[doc]](https://docs.phalcon.io/5.14/auth/)
- Consolidated the `Phalcon\Auth` dual-container handling (new `Phalcon\Container\Container` vs legacy `Phalcon\Di\Di`) behind a single internal `Phalcon\Auth\Internal\ContainerResolver`. [#17088](https://github.com/phalcon/cphalcon/issues/17088) [[doc]](https://docs.phalcon.io/5.14/auth/)

### Added

- Added `Phalcon\Events\Manager::dispatch(object $event, string|array|null $name = null, ?object $source = null)` for object/class-based event dispatch built on Phalcon's own `Phalcon\Contracts\Events\Stoppable`. Listeners are routed by an explicit name (a string, or a `[class, method]` array) or by the event's class name and receive the event object. [#17006](https://github.com/phalcon/cphalcon/issues/17006) [[doc]](https://docs.phalcon.io/5.14/events/)
- Added `beforeBind` and `afterBind` hook methods to `Phalcon\Forms\Form`. When defined on a form subclass, `beforeBind(array $data, ?object $entity)` runs at the start of `bind()` (returning `false` cancels the bind) and `afterBind(?object $entity)` runs after the data has been assigned. Both also fire when `bind()` is reached through `isValid()`. [#14598](https://github.com/phalcon/cphalcon/issues/14598) [[doc]](https://docs.phalcon.io/5.14/forms/)
- Added a `sync` option to many-to-many (`hasManyToMany`) relations and a chainable `Phalcon\Mvc\Model::setSync()` method to synchronize related records on save. When enabled, saving deletes the intermediate rows for records no longer present in the assigned array (add/update/delete), instead of only appending. [#17071](https://github.com/phalcon/cphalcon/issues/17071) [[doc]](https://docs.phalcon.io/5.14/db-models-relationships/)
- Added a `trace()` method to `Phalcon\Logger\Logger` together with a new `TRACE` log level (value `9`, label `trace`). [#17047](https://github.com/phalcon/cphalcon/issues/17047) [[doc]](https://docs.phalcon.io/5.14/logger/)
- Added a `{% verbatim %}`/`{% endverbatim %}` tag to Volt. Its body is emitted exactly as written, without being parsed by Volt, so `{{ ... }}`, `{% ... %}`, `{# ... #}` and constructs such as `<?xml ... ?>` or client-side templates (Handlebars, Mustache, Angular) pass through untouched. [#17085](https://github.com/phalcon/cphalcon/issues/17085) [[doc]](https://docs.phalcon.io/5.14/volt/)
- Added support for `JOIN` clauses in PHQL `UPDATE` statements (e.g. `UPDATE Invoices INNER JOIN Customers ON ... SET ... WHERE Customers.cst_id = :id:`). The join is used to filter the records to update; the statement still targets a single model. [#16984](https://github.com/phalcon/cphalcon/issues/16984) [[doc]](https://docs.phalcon.io/5.14/db-phql/)
- Added `Phalcon\Auth\Access\Acl` - an ACL-backed access gate that incorporates the role-based authorization of the old Firewall component ([#14630](https://github.com/phalcon/cphalcon/issues/14630)) into the Auth layer. The gate checks the authenticated user's role against a `Phalcon\Acl\Adapter\AdapterInterface`: the ACL component is the `handler` context key (prefixed with `module` and a configurable separator when present), the ACL access is the action name, and `params` are passed through to callable ACL rules. Unauthenticated requests resolve to a configurable guest role (default `guest`); authenticated users supply their role via `Phalcon\Acl\RoleAwareInterface`. [#17088](https://github.com/phalcon/cphalcon/issues/17088) [[doc]](https://docs.phalcon.io/5.14/auth/)
- Added `Phalcon\Auth\Micro\AuthMicroListener` to enforce the active Auth access gate on `Phalcon\Mvc\Micro` route execution (attach to the `micro` event space).[#17088](https://github.com/phalcon/cphalcon/issues/17088) [[doc]](https://docs.phalcon.io/5.14/auth/)

### Fixed

- Fixed PHQL parser cache to use string-keyed lookups (`zend_hash_str_find`/`zend_hash_str_update`) instead of integer keys derived from `zend_inline_hash_func`, eliminating hash collisions that caused different PHQL queries to return identical cached ASTs [#14791](https://github.com/phalcon/cphalcon/issues/14791)
- Fixed `Phalcon\Annotations\Reader` failing to parse a docblock when an annotation argument is a string literal containing a parenthesis (e.g. `@SomeAnnotation(key='value(')`). The docblock pre-scan that locates each `@Annotation(...)` span counted every `(`/`)`, including those inside quoted values, so an unbalanced parenthesis in a string consumed the rest of the comment and produced a "Scanning error". [#16084](https://github.com/phalcon/cphalcon/issues/16084)
- Fixed `Phalcon\Di\Injectable::__get()` to no longer cache resolved services as dynamic object properties. Services accessed via magic properties (e.g. `$this->request`) are now re-resolved through the container on each access, so replacing or updating a service in the container is reflected in controllers, views, and other injectable classes. Properties already declared on the class continue to be populated. [#17052](https://github.com/phalcon/cphalcon/issues/17052)
- Fixed `Phalcon\Mvc\Model\Query\Builder::orderBy()` when the array syntax is used with complex PHQL expressions. Previously any array item containing a space was split as a simple `column direction` pair, corrupting expressions such as `CASE WHEN inv_status_flag = 1 THEN 0 ELSE 1 END ASC`. The builder now only treats a trailing `ASC`/`DESC` as the direction (autoescaping a simple column) and preserves complex expressions verbatim. [#17077](https://github.com/phalcon/cphalcon/issues/17077)
- Fixed `Phalcon\Mvc\Model\Query` (PHQL) parsing of identifiers whose name begins with the `NOT` keyword. Columns, tables, and aliases such as `notice_id` were truncated to `ice_id` (the leading `not` was dropped), causing the database to report the column as unknown - most visibly in `Phalcon\Mvc\Model\Query\Builder` join conditions built via `createBuilder()`. The scanner's re2c backtracking marker shared the token-start pointer, so the `NOT BETWEEN` rule advanced it past `not`; escaped identifiers containing internal escapes (e.g. `[col\[0\]]`) were corrupted by the same root cause. [#16831](https://github.com/phalcon/cphalcon/issues/16831) [#17087](https://github.com/phalcon/cphalcon/issues/17087)
- Fixed the compilation failure (`'name_zv' undeclared`) in `Phalcon\Container\Container::callableGet()` and `callableNew()`. Both closures captured the typed `string name` parameter directly via `use (name)`. [#17078](https://github.com/phalcon/cphalcon/issues/17078)
- Fixed `Phalcon\Encryption\Crypt::decrypt()` to verify the HMAC tag with the constant-time `hash_equals()` instead of the identity operator, removing an observable timing discrepancy in the tag comparison (CWE-208, CWE-347) . The tag is now also verified before the decrypted text is unpadded, and truncated tags are rejected by the unequal-length path of `hash_equals()`. [#17090](https://github.com/phalcon/cphalcon/issues/17090) [[doc]](https://docs.phalcon.io/5.14/encryption-crypt/)

### Removed

- Removed the unfinished `{% raw %}`/`{% endraw %}` Volt tag. It never produced output (compilation threw `UnknownVoltStatement`) and its body was parsed rather than emitted literally. Use `{% verbatim %}` instead. [#17085](https://github.com/phalcon/cphalcon/issues/17085)

## Upgrade
Developers can upgrade using PIE

```bash
pie install phalcon/cphalcon-5.14.1
```

To compile from source, follow our [installation document][installation_document]

[installation_document]: https://docs.phalcon.io/5.14/installation
[5_14_1]: https://github.com/phalcon/cphalcon/releases/tag/5.13.1
[auth]: https://docs.phalcon.io/5.14/auth
[container]: https://docs.phalcon.io/5.14/container
