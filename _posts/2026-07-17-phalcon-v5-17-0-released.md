---
layout: post
title: Phalcon v5.17.0 Released
image: /assets/files/2026-07-17-phalcon-5.17.0-release.svg
date: 2026-07-17T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
Phalcon [v5.17.0][5_17_0] is here, and for once the release notes do not fit inside a single repository. Along with the framework itself, this cycle brought new packages, a from-scratch testing tool, and a wave of modernized sample applications.

<!--more-->

## A New Hope

Under the hood, 5.17.0 is the first release built on **Zephir 1.1.0**, a big step for the toolchain and one that clears the runway for the upcoming v6. On top of that, the core picked up 16 new features and 13 fixes. A few of the highlights:

- **Storage-backed ACL.** The new `Phalcon\Acl\Adapter\Storage` persists your whole ACL to any `Phalcon\Storage` backend (Redis, APCu, Memcached, Stream) and loads it back on construction, so you no longer have to rebuild the list on every boot.
- **Sticky read/write connections.** Turn on `setSticky(true)` on the model manager and, once a model writes, its later reads in the same request go to the write connection. No more reading stale data from a replica right after you saved it.
- **Custom resultset rows.** `Query::setResultsetRowClass()` lets custom-column queries and joins hydrate into your own `Row` subclass instead of a plain object.

That is just the top of the list. The rest (new validators, a `Files` upload validator, JWT subject validation, smarter Volt template paths, the full set of router HTTP-verb annotations, and a public `Phalcon\Traits` namespace you can use in your own code) is in the changelog below.

Of course every change is mirrored in the v6 repo!

## The Expanded Universe

### Attack of the Clones

[Talon](https://github.com/phalcon/talon) is a PHPUnit-based testing toolkit built specifically for Phalcon. We used to have a few classes in `incubator-test` but they were outdated. We decided to make our own, that will fit the needs of any Phalcon application 

Talon can drive an application in-process with no web server for browser-style tests, ships a `talon` command-line runner, and runs your suite against both the v5 C extension and the v6 PHP package. We have already converted our top packages to use Talon, so we use it too!!

### The Return of the DebugBar

[`phalcon/debugbar`]({% post_url 2026-07-13-phalcon-debugbar %}) was dormant for years. We decided to tackle that long standing task and rebuild it. It drops a per-request debug bar into your app with eleven collectors (database queries with their bound parameters, routing, views, cache, session, timing, exceptions, logs, and more), a redaction layer that keeps secrets out of the panel, and an access gate so it only appears for you. It boots purely off the events manager, so wiring it in is a one-liner.

In addition - and in anticipation for v7/v8, the `Phalcon\Support\Debug` has been copied in the debugbar repo. As such, any debugging packages that developers need will live in one spot. The Debug components in the main framework will eventually be deprecated

### The Standards Strike Back

Three new bridge packages connect Phalcon to the PSR standards, and each of them works in *both* directions:

- **[`phalcon/bridge-psr3`](https://github.com/phalcon/bridge-psr3)** — use Phalcon's logger as a PSR-3 logger, or feed a PSR-3 logger such as Monolog into Phalcon.
- **[`phalcon/bridge-psr11`](https://github.com/phalcon/bridge-psr11)** — wrap the Phalcon container as a PSR-11 container, or use any PSR-11 container inside Phalcon.
- **[`phalcon/bridge-psr16`](https://github.com/phalcon/bridge-psr16)** — expose Phalcon cache as a PSR-16 cache, or plug a PSR-16 cache into Phalcon's storage.

We do have planned more bridge packages (especially for PSR-7) and those will come in due time.

### The Apps Awaken

The sample applications got a serious refresh. [INVO](https://github.com/phalcon/invo) and [Vökuró](https://github.com/phalcon/vokuro) jumped forward several PHP versions, moved to a modern project layout, and picked up real security fixes (proper password hashing and hardened authentication). Like the [REST API](https://github.com/phalcon/rest-api) sample, they now run on **both** the Phalcon 5 extension and the Phalcon 6 PHP package from a single codebase, chosen at build time. Vökuró even ships with the new DebugBar already wired in.

Speaking of v6: the pure-PHP implementation is moving quickly, with `v6.0.0alpha4` already out. Everything above is being built and tested against it as we go.

## The Rebel Alliance

A huge thanks to everyone who reported bugs, opened pull requests, and tested along the way. This release is as much yours as it is ours.

## Changelog

## [5.17.0](https://github.com/phalcon/cphalcon/releases/tag/v5.17.0) (2026-07-17)

### Tools

- Zephir 1.1.0 (80d17e6a0)
 
### Changed

- Changed `Phalcon\Acl\Adapter\Memory` so a freshly constructed adapter returns an empty array instead of `null` from `getRoles()`, `getComponents()` and `getInheritedRoles()`. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/acl/)
- Changed the `Phalcon\Auth` array adapters (`Memory`, `Stream`) to compare non-password credential fields against configured row values as strings, so string input from a request (e.g. `'1'`) matches a typed row value (e.g. `1` or `true`) instead of failing a strict type comparison. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/auth/)
- Changed the `Phalcon\Auth` layer to throw granular `Phalcon\Auth\Exceptions\*` subclasses instead of the base `Phalcon\Auth\Exception`: `AccessNotRegistered`, `ActiveAccessRequired`, `DefaultGuardNotRegistered` and `GuardNotDefined` (`Phalcon\Auth\Manager`), `UnknownAdapter` and `UnknownGuard` (`Phalcon\Auth\ManagerFactory`), `OptionRequiresArray` and `OptionRequiresString` (`fromOptions()` option parsing), `SessionNamesMustDiffer` (`Phalcon\Auth\Guard\Config\SessionGuardConfig`), and `MissingHandlerContext` (`Phalcon\Auth\Access\Acl`). Each extends `Phalcon\Auth\Exception`, so existing `catch` blocks keep working. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/auth/)
- Deprecated `Phalcon\Acl\Adapter\Memory::getActiveKey()` (use `getActiveRole()`, `getActiveComponent()` and `getActiveAccess()`) and the legacy ACL interfaces `Phalcon\Acl\Adapter\AdapterInterface`, `Phalcon\Acl\RoleInterface`, `Phalcon\Acl\ComponentInterface`, `Phalcon\Acl\RoleAwareInterface` and `Phalcon\Acl\ComponentAwareInterface` in favour of their `Phalcon\Contracts\Acl\...` equivalents. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/acl/)
- Note: `Phalcon\Auth\ManagerFactory` validates the required guard configuration up front and throws a `Phalcon\Auth\Exception` subclass on a missing key, where earlier versions emitted a PHP notice followed by a `TypeError`; handlers that caught `TypeError` there should catch `Phalcon\Auth\Exception` instead. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/auth/)
- Refactored the read path of model hydration by extracting `Phalcon\Mvc\Model::cloneResultMapHydrate()` into the dedicated `Phalcon\Mvc\Model\Hydration\CloneResultMapHydrate` class and the case-insensitive column-map lookup into `Phalcon\Mvc\Model\Hydration\CaseInsensitiveColumnMap`. [#17228](https://github.com/phalcon/cphalcon/issues/17228) [[doc]](https://docs.phalcon.io/5.17/db-models/)
- `Phalcon\Support\Helper\Str\Concat::__invoke()` was reimplemented as a typed variadic `(string $delimiter, string ...$many)` - previously it declared no parameters and read them through `func_get_args()` - with unchanged behavior. [#17273](https://github.com/phalcon/cphalcon/issues/17273) [[doc]](https://docs.phalcon.io/5.17/traits)

### Added

- Added `@Connect`, `@Head`, `@Purge` and `@Trace` method annotations to `Phalcon\Mvc\Router\Annotations`, matching the existing `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete` and `@Options` shortcuts. [[doc]](https://docs.phalcon.io/5.17/routing/)
- Added `Phalcon\Acl\Adapter\Storage`, a storage-backed ACL adapter that persists the entire policy as a versioned, serializer-agnostic snapshot to any `Phalcon\Storage` backend (Redis, Apcu, Stream, Memcached) and reloads it on construction, defined by the new `Phalcon\Contracts\Acl\Adapter\Persistable` contract (`save()`/`load()`). Callable (closure) rules are not serializable, so they are persisted as `DENY` (fail closed) and must be re-registered after `load()`; `load()` returns `false` for a snapshot without a version marker and throws `Phalcon\Acl\Exceptions\InvalidSnapshot` on an incompatible version or a malformed structure. Single-writer contract: `save()` writes the whole snapshot (last-write-wins; use external locking for concurrent writers). [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/acl/)
- Added `Phalcon\Acl\Exceptions\InvalidSnapshot`, thrown by `Phalcon\Acl\Adapter\Storage::load()` on an incompatible or malformed policy snapshot. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/acl/)
- Added `Phalcon\Encryption\Security\JWT\Validator::validateSubject()`, which compares the token's `sub` claim against the expected subject and reports `Validation: incorrect subject` on a mismatch. A `null` subject expresses no expectation and is skipped. [#17361](https://github.com/phalcon/cphalcon/issues/17361) [[doc]](https://docs.phalcon.io/5.17/encryption-security-jwt/)
- Added `Phalcon\Filter\Validation::setDefaultMessages()` and `Phalcon\Filter\Validation::getDefaultMessage()` for registering global default validator failure messages keyed by validator class name (e.g. `Validation::setDefaultMessages([PresenceOf::class => 'Default message :field is required'])`). A registered default overrides a validator's built-in class default message, while a message set on the validator instance (the constructor `message`/`template` option or `setTemplate()`) still takes precedence; it applies to validators whose message is produced through `getTemplate()`/`messageFactory()`. [#17257](https://github.com/phalcon/cphalcon/issues/17257) [[doc]](https://docs.phalcon.io/5.17/filter-validation/)
- Added `Phalcon\Filter\Validation\Validator\Files`, a validator for an array of uploaded files (`<input name="files[]" type="file" multiple>`). It accepts the same options as `Phalcon\Filter\Validation\Validator\File`, normalizes a single-file or transposed multi-file `$_FILES` node into individual files, and validates each by delegating to `File`, failing on the first file that violates a rule. [#17259](https://github.com/phalcon/cphalcon/issues/17259) [[doc]](https://docs.phalcon.io/5.17/filter-validation/)
- Added `Phalcon\Mvc\Model\Query::setResultsetRowClass()` and `Phalcon\Mvc\Model\Query::getResultsetRowClass()` to control the class used to hydrate rows that are not mapped to a model (custom-column `SELECT`s and joins). When set, those result rows are built as the given subclass of `Phalcon\Mvc\Model\Row` instead of `Row` itself - on both the simple (custom columns) and complex (join) resultset paths - so they can carry reusable helper methods. The class is validated when set (it must exist and be a subclass of `Phalcon\Mvc\Model\Row`), throwing the new `Phalcon\Mvc\Model\Query\Exceptions\ResultsetRowClassNotFound` or `Phalcon\Mvc\Model\Query\Exceptions\InvalidResultsetRowClass`. [#17337](https://github.com/phalcon/cphalcon/issues/17337) [[doc]](https://docs.phalcon.io/5.17/db-models/)
- Added `Phalcon\Mvc\Model\Query\Builder::setResultsetRowClass()` and `Phalcon\Mvc\Model\Query\Builder::getResultsetRowClass()` so the custom resultset row class can be set on a query builder, which forwards it to the `Phalcon\Mvc\Model\Query` it produces in `getQuery()`. Because `Phalcon\Paginator\Adapter\QueryBuilder` builds its query through the builder, `paginate()` now returns the given `Phalcon\Mvc\Model\Row` subclass for its non-model result rows. [#17337](https://github.com/phalcon/cphalcon/issues/17337) [[doc]](https://docs.phalcon.io/5.17/db-models/)
- Added a set of reusable traits under the `Phalcon\Traits` namespace that framework classes compose instead of carrying duplicated logic. The public traits:
    - `Phalcon\Traits\Support\Helper\Arr\GetTrait` - read an array element by key with a default value and an optional cast.
    - `Phalcon\Traits\Support\Helper\Arr\FilterTrait` - filter a collection with `array_filter()` and an optional callable.
    - `Phalcon\Traits\Support\Helper\Str\DirFromFileTrait` - build a nested directory path from a file name, with an optional path-safety flag.
    - `Phalcon\Traits\Support\Helper\Str\DirSeparatorTrait` - ensure a directory string ends with exactly one `DIRECTORY_SEPARATOR`.
    - `Phalcon\Traits\Support\Helper\Str\EndsWithTrait` / `StartsWithTrait` - case-insensitive, multibyte-aware suffix/prefix checks.
    - `Phalcon\Traits\Support\Helper\Str\InterpolateTrait` - PSR-3 `%placeholder%` message interpolation.
    - `Phalcon\Traits\Support\Helper\Str\CamelizeTrait` / `UncamelizeTrait` - convert between `CamelCase` and delimited strings.
    - `Phalcon\Traits\Support\Helper\Str\LowerTrait` / `UpperTrait` - multibyte-safe lower/upper casing.
    - `Phalcon\Traits\Support\Helper\Json\EncodeTrait` / `DecodeTrait` - `json_encode()`/`json_decode()` wrappers that throw the native `\JsonException`.
    - `Phalcon\Traits\Php\ApcuTrait` - wrappers for `apcu_*` methods.
    - `Phalcon\Traits\Php\Base64Trait` - wrappers for `base64_*` methods.
    - `Phalcon\Traits\Php\FileTrait` - wrappers for `file_*` methods.
    - `Phalcon\Traits\Php\HashTrait` - wrappers for `hash_*` methods.
    - `Phalcon\Traits\Php\HeaderTrait` - wrapper for `headers_sent`.
    - `Phalcon\Traits\Php\IgbinaryTrait` - wrappers for `igbinary_*` methods.
    - `Phalcon\Traits\Php\InfoTrait` - wrappers for `extension_loaded` and `function_exists.
    - `Phalcon\Traits\Php\IniTrait` - wrappers for `ini_*` methods.
    - `Phalcon\Traits\Php\MbCaseTrait` - wrappers for `mb_case_*` methods.
    - `Phalcon\Traits\Php\MsgpackTrait` - wrappers for `msgpack_*` methods.
    - `Phalcon\Traits\Php\OpensslTrait` - wrappers for `openssl_*` methods.
    - `Phalcon\Traits\Php\SerializeTrait` - wrappers for `serialize` and `unserialize`.
    - `Phalcon\Traits\Php\UrlTrait` - wrappers for `parse_url`, `rawurldecode` and `rawurlencode`.
    - `Phalcon\Traits\Php\YamlTrait` - - wrappers for `yaml_*` methods. These calls can be substituted in tests. [#17273](https://github.com/phalcon/cphalcon/issues/17273) [[doc]](https://docs.phalcon.io/5.17/traits)
- Added an opt-in "sticky" read/write connection mode to `Phalcon\Mvc\Model\Manager`. After `Phalcon\Mvc\Model\Manager::setSticky(true)`, once a model has written to its write connection during the current request cycle, any further reads for that write service are served from the write connection, so data written earlier in the request can be read back immediately. Writes are recorded via the new `Phalcon\Mvc\Model\Manager::registerWrite()` (called internally on a successful insert/update/delete), and `Phalcon\Mvc\Model\Manager::resetConnectionState()` clears the per-request tracking for long-running runtimes (e.g. Swoole, RoadRunner) that reuse the manager across requests. Sticky is off by default, preserving the existing read/write split; the transaction connection still takes precedence. The three methods are added to `Phalcon\Mvc\Model\ManagerInterface`. [#17256](https://github.com/phalcon/cphalcon/issues/17256) [[doc]](https://docs.phalcon.io/5.17/db-models/)
- Added an opt-in `allowWildcards` option to `Phalcon\Filter\Validation\Validator\File\MimeType` (and passed through from `Phalcon\Filter\Validation\Validator\File` via the same key) that, when `true`, matches each configured type against the detected MIME type as an anchored regular expression (e.g. `image/.*`, `video/.*`) in addition to an exact string match; it defaults to `false`, preserving the existing exact-match behavior. [#17254](https://github.com/phalcon/cphalcon/issues/17254) [[doc]](https://docs.phalcon.io/5.17/filter-validation/)
- Added closure binding to `Phalcon\Filter\Validation\Validator\Callback`: a `Closure` passed as the `callback` option is now bound to the validator instance (`$this`) before it is invoked, so the callback can call the validator's own public methods - for example `$this->setTemplate('...')` to set a per-failure message from inside the callback. Non-closure callables (function-name strings, `[object, method]` arrays) are left unbound, and the callback's return contract is unchanged (`bool`, or a `Phalcon\Filter\Validation\ValidatorInterface` to delegate). [#17255](https://github.com/phalcon/cphalcon/issues/17255) [[doc]](https://docs.phalcon.io/5.17/filter-validation/)
- Added support for absolute and current-template-relative paths in the Volt `{% raw %}{% extends %}{% endraw %}` and `{% raw %}{% include %}{% endraw %}` tags (`Phalcon\Mvc\View\Engine\Volt\Compiler`): an absolute path (Unix `/...`, or a Windows drive/UNC path) is now used as-is, and a path beginning with `./` or `../` is resolved against the directory of the template currently being compiled instead of the views directory; every other path keeps the existing views-directory-relative resolution. [#17269](https://github.com/phalcon/cphalcon/issues/17269) [[doc]](https://docs.phalcon.io/5.17/volt/)
- Added the `Phalcon\Contracts\Acl` contracts - `Phalcon\Contracts\Acl\Adapter\Adapter`, `Phalcon\Contracts\Acl\Adapter\Persistable`, `Phalcon\Contracts\Acl\Role`, `Phalcon\Contracts\Acl\Component`, `Phalcon\Contracts\Acl\RoleAware` and `Phalcon\Contracts\Acl\ComponentAware` - as the canonical homes for the ACL interfaces; the legacy `Phalcon\Acl\...\*Interface` types remain as deprecated bridges that extend them. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/acl/)
- Added the `Phalcon\Contracts\Queue\Inspectable` contract (`getStats(Queue $queue): array`), implemented by `Phalcon\Queue\Adapter\Beanstalk\BeanstalkContext`, exposing the Beanstalkd `stats-tube` fields (`current-jobs-ready`, `current-jobs-reserved`, `current-jobs-delayed`, `current-jobs-buried`, `current-jobs-urgent`, `total-jobs`, the `cmd-*` counters, ...) for queue backlog/depth monitoring. The returned array is adapter-native; the `current-jobs-*` keys are always present (zero for an unknown tube) and the read runs on its own short-lived connection. Backed by a new `Phalcon\Queue\Adapter\Beanstalk\BeanstalkConnection::statsTube()` wire command. [#17209](https://github.com/phalcon/cphalcon/issues/17209) [[doc]](https://docs.phalcon.io/5.17/queue/)
- Added the granular `Phalcon\Auth\Exceptions\*` exceptions `AccessNotRegistered`, `ActiveAccessRequired`, `DefaultGuardNotRegistered`, `GuardNotDefined`, `MissingHandlerContext`, `OptionRequiresArray`, `OptionRequiresString`, `SessionNamesMustDiffer`, `UnknownAdapter` and `UnknownGuard`. [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/auth/)

### Fixed

- Fixed `Phalcon\Auth` login timing leaking account existence: the credential adapters now perform a throwaway password hash on the user-not-found path, so an attempt for an unknown identifier costs the same as one for a real account with a wrong password (mitigates login-timing user enumeration). [#17220](https://github.com/phalcon/cphalcon/issues/17220) [[doc]](https://docs.phalcon.io/5.17/auth/)
- Fixed `Phalcon\Db\Dialect::getSqlExpression()` throwing `The argument is not initialized or iterable()` while resolving a `case` expression when the expression array is held as a PHP reference, by fetching the `when-clauses` list through `array_values()` before iterating it. [#17225](https://github.com/phalcon/cphalcon/issues/17225) [[doc]](https://docs.phalcon.io/5.17/db-layer/)
- Fixed `Phalcon\Encryption\Crypt::encrypt()` to properly capture exceptions thrown by `openssl_random_pseudo_bytes`. [#17326](https://github.com/phalcon/cphalcon/issues/17326) [[doc]](https://docs.phalcon.io/5.17/encryption/)
- Fixed `Phalcon\Encryption\Security\JWT\Token\Token::validate()` throwing `Phalcon\Encryption\Security\JWT\Exceptions\InvalidAudienceType` when handed a freshly constructed `Phalcon\Encryption\Security\JWT\Validator`, which made a default `Validator` impossible to pass to it. [#17361](https://github.com/phalcon/cphalcon/issues/17361) [[doc]](https://docs.phalcon.io/5.17/encryption-security-jwt/)
- Fixed `Phalcon\Encryption\Security\JWT\Validator::validateIssuedAt()` and `Phalcon\Encryption\Security\JWT\Validator::validateNotBefore()` rejecting a token whose `iat`/`nbf` claim falls on exactly the validated timestamp. [#17361](https://github.com/phalcon/cphalcon/issues/17361) [[doc]](https://docs.phalcon.io/5.17/encryption-security-jwt/)
- Fixed `Phalcon\Forms\Element\AbstractElement::render()` to cast a non-`null` element value to `string` before passing it to the input helper, so a numeric default set via `setDefault()` (e.g. `setDefault(10)` or `setDefault(10.5)` on a `Phalcon\Forms\Element\Numeric`) renders as `value="10"` instead of raising a `TypeError` for passing an `int`/`float` to the helper's `string` `$value` parameter. [#17232](https://github.com/phalcon/cphalcon/issues/17232) [[doc]](https://docs.phalcon.io/5.17/forms/)
- Fixed `Phalcon\Http\Response::getStatusCode()` and `Phalcon\Http\Response::getReasonPhrase()` raising a `TypeError` (`substr(): Argument #1 ($string) must be of type string, bool given`) when no `Status` header had been set (e.g. a response built with only `setContent()`), because `Phalcon\Http\Response\Headers::get('Status')` returns `false` for an absent header; the header value is now cast to string before `substr()`, so both methods return `null` as documented. [#17248](https://github.com/phalcon/cphalcon/issues/17248) [[doc]](https://docs.phalcon.io/5.17/http-response/)
- Fixed `Phalcon\Image\Adapter\AbstractAdapter::resize()` truncating the scaled master-mode (`Enum::WIDTH`, `Enum::HEIGHT`, `Enum::PRECISE`) dimension to an `int` before rounding, so a value whose fractional part was `>= 0.5` came out one pixel short (e.g. a `1820x694` source resized to height `80` produced width `209` instead of `210`); the scaled width/height are now rounded before the integer cast. [#17225](https://github.com/phalcon/cphalcon/issues/17225) [[doc]](https://docs.phalcon.io/5.17/image/)
- Fixed `Phalcon\Mvc\Model::cloneResult()` and `Phalcon\Mvc\Model::cloneResultMap()` calling a model setter (or throwing `Phalcon\Mvc\Model\Exceptions\PropertyNotAccessible` when no setter exists) while hydrating a declared `private` property, because the property write from `Model` scope fell back to `__set()` and its `possibleSetter()` routing regardless of the `orm.call_setters_on_hydration` setting. [#16454](https://github.com/phalcon/cphalcon/issues/16454) [[doc]](https://docs.phalcon.io/5.17/db-models/)
- Fixed `Phalcon\Mvc\Model::create()` and `Phalcon\Mvc\Model::update()` passing `null` to the `field` argument of `Phalcon\Messages\Message` (typed `string` since v5.14), which raised a `Passing null to parameter #2 ($field) of type string is deprecated` warning when calling `create()` on an existing record or `update()` on a non-existent one; they now pass an empty string. [#17224](https://github.com/phalcon/cphalcon/issues/17224) [[doc]](https://docs.phalcon.io/5.17/db-models/)
- Fixed `Phalcon\Mvc\Model\Query::executeUpdate()` raising a PDO `Invalid parameter number: mixed named and positional parameters` error for a PHQL `UPDATE` whose `SET` clause is an expression carrying a bound placeholder (e.g. `SET col = col + :inc:`): the named placeholder is now resolved from the bind parameters and inlined into the expression before the `Phalcon\Db\RawValue` is built, so it no longer collides with the positional `?` marker of the primary-key `WHERE` clause, and the placeholder is removed from the bind parameters forwarded to the pre-update `SELECT`. [#16976](https://github.com/phalcon/cphalcon/issues/16976) [[doc]](https://docs.phalcon.io/5.17/db-models/)
- Fixed a segmentation fault when rendering a Volt template that `extends` a parent chain but defines no blocks of its own, where a block declared higher in the chain calls `{% raw %}{{ partial() }}{% endraw %}`: `Phalcon\Mvc\View\Engine\Volt\Compiler::compileSource()` passed a `null` `blocks` value to `array_key_exists()`, which read it as an array from an uninitialized pointer; `blocks` is now coerced to an empty array so any inheritance depth is handled. [#17294](https://github.com/phalcon/cphalcon/issues/17294) [[doc]](https://docs.phalcon.io/5.17/volt/)
- Fixed the PHP 8.4/8.5 deprecation notices raised by the extension: removed the `imagedestroy()` calls in `Phalcon\Image\Adapter\Gd` (a no-op since PHP 8.0), the `finfo_close()` calls in `Phalcon\Http\Request\File` and `Phalcon\Filter\Validation\Validator\File\MimeType` and the `ReflectionProperty::setAccessible()` call in `Phalcon\Support\Debug\Dump` (no-ops since PHP 8.1), clamped the random pad byte in `Phalcon\Encryption\Crypt\Padding\Iso10126` to `chr(rand() % 256)` to avoid the out-of-range `chr()` deprecation on PHP 8.5, and guarded `Phalcon\Messages\Messages::offsetSet()` against an implicit `null` array offset. [#17253](https://github.com/phalcon/cphalcon/issues/17253) [[doc]](https://docs.phalcon.io/5.17/)

### Removed

- Removed the deprecated `Serializable` interface from `Phalcon\Mvc\Model` and `Phalcon\Mvc\Model\Resultset` (deprecated by PHP 8.1); the `__serialize()` and `__unserialize()` magic methods remain, so model and resultset serialization is unchanged. [#17253](https://github.com/phalcon/cphalcon/issues/17253) [[doc]](https://docs.phalcon.io/5.17/db-models/)


## Upgrade
Developers can upgrade using PIE

```bash
pie install phalcon/cphalcon-5.17.0
```

To compile from source, follow our [installation document][installation_document]

[installation_document]: https://docs.phalcon.io/5.17/installation
[5_17_0]: https://github.com/phalcon/cphalcon/releases/tag/v5.17.0
