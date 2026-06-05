---
layout: post
title: Phalcon v5.14.0 Released
image: /assets/files/2026-06-04-phalcon-5.14.0-release.svg
date: 2026-06-04T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---
We are happy to announce that Phalcon [v5.14.0][5_14_0] has been released!

<!--more-->

Phalcon 5.14.0 introduces three new components and changes the way we deal with exceptions, as well as fixing several bugs.

## v5

### Auth

`Phalcon\Auth` provides authentication (who the user is) and authorization (what the user may do) behind a single facade, `Phalcon\Auth\Manager`. There are four building blocks available:

- Guards - "is there an authenticated user, and who is it?"
- Adapters - user providers
- Access gates - "is this action allowed?"
- AuthUser - the authenticated user value object returned by guards.

There are several implementations that are available for each of the building blocks. The documentation is [here][auth]

### Container

A modern dependency injection container built alongside the existing `Phalcon\Di\Di`. It supports autowiring, service lifetimes, lazy value resolution, service tags, and decorator extension. It is designed for both standard PHP shared-nothing requests and long-running environments (Octane, Swoole, RoadRunner).

Container is the recommended choice for new projects. `Phalcon\Di\Di` remains fully supported and is not being removed. [docs][container] 

    Container cannot be used with components that use the "Inversion of Control" methodology in Phalcon. That is, the container is available in the component, and it is used to retrive a different service to be used in that component. An example is the Response object which internally retrieves the Filter service for filtering. For this to happen, we need to widen the `getDI()` and `setDI()` which will affect backwards compatibiity. As such, `Container` cannot be used out of the box for this version. In the next major version we will change the interfaces to offer this functionality. 
{: .alert .alert-warning }

"_So why introduce it now if I cannot use it with some of the components_"?

To make Container available throughtout Phalcon, we need to change interfaces in components that require the `DiInterface`. In short, widen the interface to accept `object` or at least the union of `Collection` and `DiInterface`. We cannot change interfaces unless this is a major version. As such, we are introducing the container now, and in the next major version of cphalcon we will make the necessary changes so that developers can choose which container they want to use.

### AbstractLocator

A new abstract class is available in `Support\AbstractLocator`. It allows you to create locators that resolve the "located" instances through the DI container. The object works with both the `Di` as well as the new `Container`. For an example of the implementation you can look at the `Auth` namespace. 

### Exceptions

Every namespace now has dedicated exceptions for every exception message raised. They all extend the base extension of the namespace so this change is fully backwards compatible. This change offers greater control towards exception messages thrown by the framework. The documentation has a full list of the granular exceptions of each component. Additionally for a quick look you can check the changelog below.

## v6

I know we promised v6 to be out last time around but we found a few areas where the code was not fully aligned. The tests are now pass fully and both projects are aligned. v6 alpha is coming out this weekend.

## Community

A huge thanks to our community for helping out with bug fixing and more importantly bug reporting! We also thank you for your patience since some of these bugs and pull requests have been open for a few years (yes, years :/).

## Changelog

## [5.14.0](https://github.com/phalcon/cphalcon/releases/tag/v5.14.0) (2026-06-04)

### Tools

- Zephir Parser v2.0.2
- Zephir 0.22.0 (development - 9d2def774)

### Changed

- Alignment with v6; docblocks; sorting; return types; minor fixes (image watermark opacity calc, serializer/helpers, readonly-becoming-mutable, ACL local access). [#17055](https://github.com/phalcon/cphalcon/issues/17055)
- Changed return types to `-> <static>` or `-> <self>` in various components. The change is a covariant narrowing on implementation methods and does not touch any interface contracts, so userland classes that implement Phalcon interfaces and return the interface type continue to work unchanged. [#17035](https://github.com/phalcon/cphalcon/issues/17035)
- Internal performance work across `Autoload`, `Dispatcher`, `Annotations`, `Db`, `Mvc\Model`, `Mvc\Model\Query`, `Tag`, `Assets`, `Acl\Adapter\Memory`, `Http\Request`, `Encryption\Crypt`. Behavior preserved. [#17049](https://github.com/phalcon/cphalcon/issues/17049)
- Moved CI tools/scripts in `resources/` removed unused ones [#17066](https://github.com/phalcon/cphalcon/pull/17066)
- Moved docker in `resources/` [#17066](https://github.com/phalcon/cphalcon/pull/17066)
- Refactored docker images (more flexible less cruft) [#17066](https://github.com/phalcon/cphalcon/pull/17066)
- Reorganization of quality tool config files (in `resources/`) [#17066](https://github.com/phalcon/cphalcon/pull/17066)
- `Phalcon\Autoload\Loader` getters (`getDirectories`, `getExtensions`, `getFiles`) return arrays keyed by the value string instead of by a SHA256 hash of it; iteration order and contents are unchanged. [#17049](https://github.com/phalcon/cphalcon/issues/17049) [[doc]](https://docs.phalcon.io/5.14/autoload/)
- `Phalcon\Mvc\Router::handle()` internal optimizations: O(1) hash lookup for literal-URI routes; per-HTTP-method buckets; hot-loop reads; PCRE patterns chunked; per-route metadata cache deduplicated by route id. [#17012](https://github.com/phalcon/cphalcon/issues/17012) [[doc]](https://docs.phalcon.io/5.14/routing/)
- `Phalcon\Mvc\Router\Route::getCompiledHostName()` now uses cache for hostname/converters. [#17012](https://github.com/phalcon/cphalcon/issues/17012) [[doc]](https://docs.phalcon.io/5.14/routing/)

### Added

- Added a new dependency-injection container under `Phalcon\Container`, with its contracts under `Phalcon\Contracts\Container`. It adds:
    - `Phalcon\Container\Container` / `Phalcon\Container\ContainerFactory` - the container and its factory, configured through `Phalcon\Contracts\Container\Service\Provider` providers (`Phalcon\Container\Provider\Web`, `Phalcon\Container\Provider\Cli`).
    - `Phalcon\Container\Definition\ServiceDefinition` - fluent service definitions with autowiring, factories, extenders, tags, aliases, and configurable service lifetimes (`Phalcon\Container\Definition\ServiceLifetime`).
    - `Phalcon\Container\Resolver\Resolver` - reflection-based constructor / method / parameter autowiring, plus the `Phalcon\Container\Resolver\Lazy\*` family for lazy resolution (`Get`, `GetCall`, `NewInstance`, `Call`, `Env`, `CsEnv`, `ArrayValues`, etc.).
    - `Phalcon\Container\Exceptions\*` - granular, per-cause exceptions (`ServiceNotFound`, `CircularAliasFound`, `FrozenDefinition`, `CannotResolveParameter`, `NoProcessorFound`, etc.). [#16897](https://github.com/phalcon/cphalcon/issues/16897) [[doc]](https://docs.phalcon.io/5.14/container/)
- Added a new authentication and authorization layer under `Phalcon\Auth`, with its contracts under `Phalcon\Contracts\Auth`. Built on top of `Phalcon\Container`, it adds:
    - `Phalcon\Auth\Manager` / `Phalcon\Auth\ManagerFactory` - the central manager that wires guards and access gates together, and its factory.
    - `Phalcon\Auth\AuthUser` - a lightweight user value object returned by array-backed adapters when no application model class is configured.
    - Guards under `Phalcon\Auth\Guard` - `Session` and `Token` (with `AbstractGuard` and `UserRemember`), resolved via `Phalcon\Auth\Guard\GuardLocator` and configured through `Phalcon\Auth\Guard\Config\*` (`AbstractGuardConfig`, `SessionGuardConfig`, `TokenGuardConfig`).
    - Adapters under `Phalcon\Auth\Adapter` - `Memory`, `Model`, and `Stream` user providers (with `AbstractAdapter` and `AbstractArrayAdapter`), resolved via `Phalcon\Auth\Adapter\AdapterLocator` and configured through `Phalcon\Auth\Adapter\Config\*` (`AbstractAdapterConfig`, `MemoryAdapterConfig`, `ModelAdapterConfig`, `StreamAdapterConfig`).
    - Access gates under `Phalcon\Auth\Access` - `Auth` and `Guest` (with `AbstractAccess`), resolved via `Phalcon\Auth\Access\AccessLocator`.
    - Dispatcher listeners `Phalcon\Auth\Mvc\AuthDispatcherListener` and `Phalcon\Auth\Cli\AuthDispatcherListener` (with `Phalcon\Auth\AbstractAuthDispatcherListener`) to guard MVC and CLI dispatch.
    - `Phalcon\Auth\Exception` plus granular `Phalcon\Auth\Exceptions\*` (`AccessDenied`, `ConfigRequiresNonEmptyValue`, `DataMustContainIdKey`, `DoesNotImplement`, `FileCannotRead`, `FileDoesNotContainJson`, `FileDoesNotExist`, `FileNotValidJson`).
    - Contracts under `Phalcon\Contracts\Auth` - `Manager`, `AuthUser`, `AuthRemember`, `RememberToken`, `Access\Access`, `Adapter\Adapter`, `Adapter\AdapterConfig`, `Adapter\RememberAdapter`, `Guard\Guard`, `Guard\GuardConfig`, `Guard\GuardStateful`, `Guard\BasicAuth`.
    - `Phalcon\Support\AbstractLocator` - the shared service-locator base extended by the guard, adapter, and access locators. [#16273](https://github.com/phalcon/cphalcon/issues/16273) [[doc]](https://docs.phalcon.io/5.14/auth/)
- Added granular exception classes across the framework. Every namespace that previously surfaced failures through a single umbrella `Phalcon\<Namespace>\Exception` (or its sub-namespace counterpart) now ships per-cause classes under a sibling `Exceptions/` folder. Each new class extends the existing per-namespace parent so `catch (Phalcon\<Namespace>\Exception $e)` continues to work unchanged. New classes:
    - `Phalcon\Acl\Exceptions`
        - `AccessRuleNotFound`
        - `CircularInheritanceError`
        - `ElementNotFound`
        - `ForbiddenWildcard`
        - `InvalidAccessList`
        - `InvalidComponentImplementation`
        - `InvalidRoleImplementation`
        - `InvalidRoleType`
        - `MissingFunctionParameters`
        - `ParameterTypeMismatch`
        - `RoleNotFoundException`
    - `Phalcon\Annotations\Exceptions`
        - `AnnotationNotFound`
        - `AnnotationsDirectoryNotWritable`
        - `CannotReadAnnotationData`
        - `UnknownAnnotationExpression`
    - `Phalcon\Application\Exceptions`
        - `ModuleNotRegistered`
    - `Phalcon\Assets\Exceptions`
        - `AssetSourceTargetCollision`
        - `CannotReadAsset`
        - `CollectionNotFound`
        - `InvalidAssetSourcePath`
        - `InvalidAssetTargetPath`
        - `InvalidFilter`
        - `InvalidTargetPath`
        - `TargetPathIsDirectory`
    - `Phalcon\Autoload\Exceptions`
        - `LoaderDirectoriesNotArray`
        - `LoaderMethodNotCallable`
    - `Phalcon\Cache\Exception`
        - `CacheKeysNotIterable`
        - `InvalidCacheKey`
    - `Phalcon\Cli\Console\Exceptions`
        - `ConsoleModuleNotRegistered`
        - `ContainerRequired`
        - `InvalidModuleDefinitionPath`
        - `ModuleDefinitionPathNotFound`
    - `Phalcon\Cli\Router\Exceptions`
        - `BeforeMatchNotCallable`
        - `InvalidRoutePaths`
        - `RouterArgumentsInvalidType`
    - `Phalcon\Config\Exceptions`
        - `CannotLoadConfigFile`
        - `ConfigNotArrayOrObject`
        - `GroupedAdapterRequiresArray`
        - `InvalidMergeData`
        - `MissingConfigOption`
        - `MissingFileExtension`
        - `MissingYamlExtension`
    - `Phalcon\DataMapper\Pdo\Exception`
        - `DriverNotSupported`
        - `UnknownDriverMethod`
        - `UnknownQueryMethod`
    - `Phalcon\Db\Exceptions`
        - `CannotInsertWithoutData`
        - `CannotPrepareStatement`
        - `CheckExpressionRequired`
        - `ColumnTypeRejectsAutoIncrement`
        - `ColumnTypeRejectsScale`
        - `ColumnTypeRequired`
        - `ConflictTargetColumnRequired`
        - `ConflictUpdateColumnRequired`
        - `ForeignKeyColumnsRequired`
        - `GeneratedAutoIncrementConflict`
        - `GeneratedDefaultConflict`
        - `IncompleteBindTypes`
        - `InvalidBindParameter`
        - `InvalidCheckExpression`
        - `InvalidGenerationExpression`
        - `InvalidGroupByExpression`
        - `InvalidIndexColumns`
        - `InvalidIndexDirections`
        - `InvalidIndexWhere`
        - `InvalidListExpression`
        - `InvalidOrderByExpression`
        - `InvalidSqlExpression`
        - `InvalidSqlExpressionType`
        - `InvalidUnaryExpression`
        - `InvalidWhereConditions`
        - `MatchedParameterNotFound`
        - `MaterializedViewsNotSupported`
        - `MissingDefinitionKey`
        - `MissingForeignKeyChecks`
        - `MissingSqliteDatabase`
        - `MysqlOnConflictNotSupported`
        - `NestedTransactionChangeBlocked`
        - `NoActiveTransaction`
        - `ReferencedColumnCountMismatch`
        - `ReferencedColumnsRequired`
        - `ReferencedTableRequired`
        - `ReturningNotSupported`
        - `ReturningRequiresColumn`
        - `SavepointsNotSupported`
        - `SqliteAlterCheckNotSupported`
        - `SqliteAlterColumnNotSupported`
        - `SqliteAlterForeignKeyNotSupported`
        - `SqliteAlterPrimaryKeyNotSupported`
        - `SqliteDropCheckNotSupported`
        - `SqliteDropForeignKeyNotSupported`
        - `SqliteDropPrimaryKeyNotSupported`
        - `TableMustHaveColumn`
        - `UnrecognizedDataType`
        - `UpdateFieldCountMismatch`
    - `Phalcon\Di\Exceptions`
        - `AliasAlreadyInUse`
        - `AliasNameMustBeString`
        - `ArgumentTypeRequired`
        - `CallArgumentsMustBeArray`
        - `CircularAliasReference`
        - `ContainerRequired`
        - `DefinitionMustBeArrayForRead`
        - `DefinitionMustBeArrayForUpdate`
        - `MethodCallMustBeArray`
        - `MethodNameRequired`
        - `MissingClassNameParameter`
        - `MissingParameterKey`
        - `PropertyInjectionRequiresInstance`
        - `PropertyMustBeArray`
        - `PropertyNameRequired`
        - `PropertyValueRequired`
        - `ServiceCannotBeResolved`
        - `SetterInjectionRequiresInstance`
        - `SetterParametersMustBeArray`
        - `UnknownServiceType`
    - `Phalcon\Dispatcher\Exceptions`
        - `ForwardInInitializeForbidden`
    - `Phalcon\Encryption\Crypt\Exception`
        - `DecryptionFailed`
        - `EmptyDecryptionKey`
        - `EmptyEncryptionKey`
        - `EncryptionFailed`
        - `InvalidPaddingSize`
        - `IvLengthCalculationFailed`
        - `MissingAuthData`
        - `MissingOpensslExtension`
        - `RandomBytesGenerationFailed`
        - `UnsupportedAlgorithm`
    - `Phalcon\Encryption\Security\Exceptions`
        - `InvalidRandomInput`
        - `UnknownHashAlgorithm`
    - `Phalcon\Encryption\Security\JWT\Exceptions`
        - `EmptyPassphrase`
        - `InvalidAudience`
        - `InvalidAudienceType`
        - `InvalidClaims`
        - `InvalidExpirationTime`
        - `InvalidHeader`
        - `InvalidNotBefore`
        - `MalformedJwtString`
        - `MissingJwtTypHeader`
        - `UnsupportedHmacAlgorithm`
        - `WeakPassphrase`
    - `Phalcon\Events\Exceptions`
        - `EventNotCancelable`
        - `InvalidEventHandler`
        - `InvalidEventSource`
        - `InvalidEventType`
        - `InvalidSubscriberConfiguration`
        - `NoListenersForEvent`
    - `Phalcon\Filter\Exceptions`
        - `FilterNotRegistered`
    - `Phalcon\Filter\Validation\Exceptions`
        - `FieldNotPrintable`
        - `FilterServiceUnavailable`
        - `InvalidAllowedTypes`
        - `InvalidCallbackReturn`
        - `InvalidDomainOption`
        - `InvalidFieldType`
        - `InvalidFilterService`
        - `InvalidStrictOption`
        - `InvalidValidationData`
        - `InvalidValidator`
        - `InvalidValidatorScope`
        - `MissingMbstring`
        - `NoDataToValidate`
        - `NoValidators`
        - `NoValidatorsInComposite`
        - `UniquenessConversionMustBeArray`
        - `UniquenessModelRequired`
        - `UniquenessOnlyForPhalconModel`
        - `ValidationEntityNotObject`
    - `Phalcon\Flash\Exceptions`
        - `EscaperServiceUnavailable`
        - `FlashMessageNotStringOrArray`
        - `SessionServiceUnavailable`
    - `Phalcon\Forms\Exceptions`
        - `ElementNotInForm`
        - `FormElementNameRequired`
        - `FormNotInLocator`
        - `FormNotRegistered`
        - `InvalidEntity`
        - `InvalidFilterType`
        - `InvalidJsonSchema`
        - `JsonSchemaNotArray`
        - `NoFormElements`
        - `SchemaEntryMissingKey`
        - `SchemaEntryNotArray`
        - `UnknownFormElementType`
        - `YamlExtensionRequired`
        - `YamlSchemaNotArray`
    - `Phalcon\Html\Exceptions`
        - `AttributeNotRenderable`
        - `FriendlyTitleConversionFailed`
        - `InvalidResultsetValue`
        - `ServiceNotRegistered`
        - `UsingRequiresTwoValues`
    - `Phalcon\Http\Cookie\Exceptions`
        - `CookieKeyTooShort`
        - `CryptInterfaceRequired`
        - `CryptServiceUnavailable`
        - `FilterServiceUnavailable`
    - `Phalcon\Http\Request\Exceptions`
        - `FilterServiceUnavailable`
        - `InvalidHost`
        - `InvalidHttpMethod`
        - `MissingFilters`
        - `SanitizerNotFound`
    - `Phalcon\Http\Response\Exceptions`
        - `NonStandardStatusCodeRequiresMessage`
        - `ResponseAlreadySent`
        - `ResponseServiceUnavailable`
        - `UrlServiceUnavailable`
    - `Phalcon\Image\Exceptions`
        - `CompositeFailed`
        - `ExtensionNotLoaded`
        - `ImageLoadFailed`
        - `MissingDimensions`
        - `MissingHeight`
        - `MissingWidth`
        - `ResizeFailed`
        - `ResourceTypeError`
        - `TextRenderingFailed`
        - `UnsupportedImageType`
        - `VersionMismatch`
    - `Phalcon\Logger\Adapter\Exceptions`
        - `FileOpenFailed`
        - `InvalidStreamMode`
        - `SyslogOpenFailed`
    - `Phalcon\Logger\Exceptions`
        - `AdapterNotFound`
        - `DeserializationFailed`
        - `NoAdaptersConfigured`
        - `SerializationFailed`
        - `TransactionAlreadyActive`
        - `TransactionNotActive`
    - `Phalcon\Messages\Exceptions`
        - `MessageNotObject`
        - `MessagesNotIterable`
    - `Phalcon\Mvc\Application\Exceptions`
        - `ContainerRequired`
        - `InvalidModuleDefinition`
        - `ModuleDefinitionPathNotFound`
    - `Phalcon\Mvc\Dispatcher\Exceptions`
        - `ResponseServiceUnavailable`
    - `Phalcon\Mvc\Micro\Exceptions`
        - `ContainerRequired`
        - `ErrorHandlerNotCallable`
        - `HandlerNotCallable`
        - `InvalidRegisteredHandler`
        - `LazyHandlerNotFound`
        - `MissingCollectionMainHandler`
        - `NoHandlersToMount`
        - `NoMatchedRouteHandler`
        - `NotFoundHandlerNotCallable`
        - `ResponseHandlerNotCallable`
    - `Phalcon\Mvc\Model\Behavior\Exceptions`
        - `MissingRequiredOption`
    - `Phalcon\Mvc\Model\Exceptions`
        - `BelongsToRequiresObject`
        - `BindTypeNotDefined`
        - `CannotResolveAttribute`
        - `ColumnNotInMap`
        - `ColumnNotInTableColumns`
        - `ColumnNotInTableMap`
        - `CorruptColumnType`
        - `CursorIsImmutable`
        - `DataTypeNotDefined`
        - `HandlerMustImplementBindable`
        - `IdentityNotInColumnMap`
        - `IdentityNotInTableColumns`
        - `IndexNotInCursor`
        - `IndexNotInRow`
        - `InvalidConnectionService`
        - `InvalidContainer`
        - `InvalidDumpResultKey`
        - `InvalidFindParameters`
        - `InvalidGetModelNameReturn`
        - `InvalidModelName`
        - `InvalidModelsManagerService`
        - `InvalidModelsMetadataService`
        - `InvalidResultsetCacheService`
        - `InvalidReturnedRecord`
        - `InvalidSerializationData`
        - `ManagerOrmServicesUnavailable`
        - `MethodNotFound`
        - `MissingMethodName`
        - `MissingModelClassName`
        - `ModelCouldNotLoad`
        - `ModelOrmServicesUnavailable`
        - `PrimaryKeyAttributeNotSet`
        - `PrimaryKeyRequired`
        - `PropertyNotAccessible`
        - `RecordCannotRefresh`
        - `RecordNotPersisted`
        - `ReferencedFieldsMismatch`
        - `RelationAliasMustBeString`
        - `RelationNotDefined`
        - `RelationRequiresObjectOrArray`
        - `ResultsetColumnNotInMap`
        - `RowIsImmutable`
        - `SnapshotsDisabled`
        - `StaticMethodRequiresOneArgument`
        - `UnknownRelationType`
        - `UpdateSnapshotDisabled`
    - `Phalcon\Mvc\Model\MetaData\Exceptions`
        - `CannotObtainTableColumns`
        - `ColumnMapNotArray`
        - `ContainerRequired`
        - `CorruptedMetaData`
        - `InvalidContainer`
        - `InvalidMetaDataForModel`
        - `MetaDataDirectoryNotWritable`
        - `MetaDataStrategyFailed`
        - `NoAnnotationsForClass`
        - `NoPropertyAnnotationsForClass`
        - `TableNotInDatabase`
    - `Phalcon\Mvc\Model\Query\Exceptions`
        - `AmbiguousColumn`
        - `AmbiguousJoinRelation`
        - `BindParameterNotInPlaceholders`
        - `BindTypeRequiresArray`
        - `BindValueRequired`
        - `ColumnNotInDomain`
        - `ColumnNotInSelectedModels`
        - `CorruptedAst`
        - `CorruptedDeleteAst`
        - `CorruptedInsertAst`
        - `CorruptedSelectAst`
        - `CorruptedUpdateAst`
        - `DeleteMultipleNotSupported`
        - `DuplicateAlias`
        - `EmptyArrayPlaceholderValue`
        - `InsertColumnCountMismatch`
        - `InvalidCachedResultset`
        - `InvalidCachingOptions`
        - `InvalidColumnDefinition`
        - `InvalidInjectedManager`
        - `InvalidInjectedMetadata`
        - `InvalidQueryCacheService`
        - `InvalidResultsetClass`
        - `JoinAliasAlreadyUsed`
        - `JoinFieldCountMismatch`
        - `MissingCacheKey`
        - `MissingMetaData`
        - `MissingModelAttribute`
        - `MissingModelsManager`
        - `MixedDatabaseSystems`
        - `ModelSourceNotFound`
        - `ModelsListNotLoaded`
        - `MultipleSqlStatementsNotSupported`
        - `NoModelForAlias`
        - `PhqlColumnNotInMap`
        - `ReadConnectionMissing`
        - `RelationshipNotFound`
        - `ResultsetClassNotFound`
        - `ResultsetNonCacheable`
        - `UnknownBindType`
        - `UnknownColumnType`
        - `UnknownJoinType`
        - `UnknownModelOrAlias`
        - `UnknownPhqlExpression`
        - `UnknownPhqlExpressionType`
        - `UnknownPhqlStatement`
        - `UpdateMultipleNotSupported`
        - `WriteConnectionMissing`
    - `Phalcon\Mvc\Model\Query\Exceptions\Builder`
        - `BuilderColumnNotInMap`
        - `BuilderConditionInvalid`
        - `ModelRequired`
        - `NoPrimaryKey`
        - `OperatorNotAvailable`
    - `Phalcon\Mvc\Router\Exceptions`
        - `AnnotationsServiceUnavailable`
        - `BeforeMatchNotCallable`
        - `ConfigKeyMustBeArray`
        - `EmptyGroupOfRoutes`
        - `GroupRoutesMustBeArray`
        - `InvalidCallbackParameter`
        - `InvalidConfigSource`
        - `InvalidNotFoundPaths`
        - `InvalidRoutePaths`
        - `InvalidRoutePosition`
        - `InvalidRouterFactoryConfig`
        - `MissingGroupRouteKey`
        - `MissingRouteConfigKey`
        - `RequestServiceUnavailable`
        - `UnknownHttpMethod`
        - `WrongPathsKey`
    - `Phalcon\Mvc\Url\Exceptions`
        - `MissingRouteName`
        - `RouteNotFound`
        - `RouterServiceUnavailable`
    - `Phalcon\Mvc\View\Engine\Volt\Exceptions`
        - `CannotOpenCompiledFile`
        - `CorruptedStatement`
        - `CorruptedStatementWithData`
        - `InvalidCompilationPrefix`
        - `InvalidExtension`
        - `InvalidHaystack`
        - `InvalidIntermediateRepresentation`
        - `InvalidOptionType`
        - `InvalidPathClosureReturn`
        - `InvalidPathType`
        - `InvalidStatement`
        - `InvalidUserFilterDefinition`
        - `InvalidUserFunctionDefinition`
        - `MacroAlreadyDefined`
        - `MacroNotFound`
        - `MbstringRequired`
        - `TemplateFileNotFound`
        - `TemplateFileNotOpenable`
        - `TemplatePathCollision`
        - `UnknownVoltExpression`
        - `UnknownVoltFilter`
        - `UnknownVoltFilterType`
        - `UnknownVoltStatement`
        - `VoltDirectoryNotWritable`
    - `Phalcon\Mvc\View\Exceptions`
        - `InvalidEngineRegistration`
        - `InvalidViewsDirType`
        - `SimpleViewNotFound`
        - `SimpleViewServicesUnavailable`
        - `ViewNotFound`
        - `ViewServicesUnavailable`
        - `ViewsDirItemMustBeString`
    - `Phalcon\Paginator\Exceptions`
        - `BuilderModelNotDefined`
        - `InvalidBuilderInstance`
        - `InvalidCursorColumn`
        - `InvalidLimit`
        - `MissingColumnsForHaving`
        - `MissingRequiredParameter`
        - `PaginatorDataNotArray`
    - `Phalcon\Session\Adapter\Exceptions`
        - `AdapterRuntimeError`
        - `InvalidSavePath`
        - `SavePathUnavailable`
    - `Phalcon\Session\Exceptions`
        - `InvalidSessionAdapter`
        - `InvalidSessionName`
        - `SessionAlreadyStarted`
        - `SessionModificationDenied`
    - `Phalcon\Storage\Exceptions`
        - `AuthenticationFailed`
        - `ClusterConnectionFailed`
        - `ConnectionFailed`
        - `DatabaseSelectionFailed`
        - `InvalidConfiguration`
        - `StorageError`
    - `Phalcon\Storage\Serializer\Exceptions`
        - `InvalidSerializationInput`
        - `InvalidUnserializationInput`
    - `Phalcon\Support\Collection\Exceptions`
        - `InvalidValueType`
        - `ReadOnlyViolation`
    - `Phalcon\Support\Debug\Exceptions`
        - `RequestHalted`
        - `RuntimeWarning`
    - `Phalcon\Support\Helper\Json\Exceptions`
        - `JsonDecodeError`
        - `JsonEncodeError`
    - `Phalcon\Support\Helper\Str\Exceptions`
        - `InsufficientArguments`
        - `InvalidReplaceFormat`
        - `SyntaxError`
    - `Phalcon\Time\Clock\Exceptions`
        - `InvalidModifier`
    - `Phalcon\Translate\Exceptions`
        - `FileOpenError`
        - `ImmutableObject`
        - `InterpolatorNotRegistered`
        - `InvalidDataType`
        - `KeyNotFound`
        - `MissingContent`
        - `MissingGettextExtension`
        - `MissingRequiredParameter`
        - `TranslatorNotRegistered` [#17019](https://github.com/phalcon/cphalcon/issues/17019)
- Added `Phalcon\Events\Manager::fire()` `beforeFire()` / `afterFire()` extension seams to `Manager::fire()`. [#17065](https://github.com/phalcon/cphalcon/issues/17065) [[doc]](https://docs.phalcon.io/5.14/events/)
- Added opt-in memory caps for long-running workers (Swoole / RoadRunner / queue consumers). Default `0` preserves the original unbounded behavior: [#17049](https://github.com/phalcon/cphalcon/issues/17049)
    - `Phalcon\Db\Profiler::setMaxProfiles(int)` / `getMaxProfiles()` [[doc]](https://docs.phalcon.io/5.14/db-layer/)
    - `Phalcon\Logger\Adapter\AbstractAdapter::setQueueLimit(int)` / `getQueueLimit()` [[doc]](https://docs.phalcon.io/5.14/logger/)
    - `Phalcon\Events\Manager::setMethodExistsCacheLimit(int)` / `getMethodExistsCacheLimit()` [[doc]](https://docs.phalcon.io/5.14/events/)
    - `Phalcon\Annotations\Adapter\AbstractAdapter::setAnnotationsLimit(int)` / `getAnnotationsLimit()` [[doc]](https://docs.phalcon.io/5.14/annotations/)
    - `Phalcon\Storage\Adapter\Memory::setMaxItems(int)` / `getMaxItems()` [[doc]](https://docs.phalcon.io/5.14/storage/)
- Added `Phalcon\Mvc\Router\Route::setRouteId(string $routeId)` - setter intended for restoring cached routes [#17012](https://github.com/phalcon/cphalcon/issues/17012) [[doc]](https://docs.phalcon.io/5.14/routing/)
- Added `Phalcon\Mvc\Router::buildDispatcherDump()` / `Phalcon\Mvc\Router::loadDispatcherFromArray(array $dump)` - used to build/load the routes [#17012](https://github.com/phalcon/cphalcon/issues/17012) [[doc]](https://docs.phalcon.io/5.14/routing/)
- Added `Phalcon\Mvc\Router::dumpDispatcher(string $path)` / `Phalcon\Mvc\Router::loadDispatcher(string $path)` - file-shaped helpers that write/read routes [#17012](https://github.com/phalcon/cphalcon/issues/17012) [[doc]](https://docs.phalcon.io/5.14/routing/)
- Added `Phalcon\Mvc\Router::useCache()` - to use a `Phalcon\Cache` adapter to store routes [#17012](https://github.com/phalcon/cphalcon/issues/17012) [[doc]](https://docs.phalcon.io/5.14/routing/)

### Fixed

- Fixed `$this->eventsManager` resolving to `null` inside `Phalcon\Mvc\Controller` methods [#17060](https://github.com/phalcon/cphalcon/issues/17060) [[doc]](https://docs.phalcon.io/5.14/controllers/)
- Fixed `Phalcon\Events\Event` and `Phalcon\Events\Manager::fire()` being declared `final` in 5.13.0 ([#17006](https://github.com/phalcon/cphalcon/issues/17006)), which prevented subclassing the events manager. [#17065](https://github.com/phalcon/cphalcon/issues/17065) [[doc]](https://docs.phalcon.io/5.14/events/)
- Fixed `Phalcon\Forms\Form::clear()` leaving a previously-bound `null` field value in the data array instead of unsetting it before reassigning the element default [#17042](https://github.com/phalcon/cphalcon/issues/17042) [[doc]](https://docs.phalcon.io/5.14/forms/)
- Fixed `Phalcon\Mvc\Model::getChangedFields()` / `hasChanged()` flagging every null-valued column of a freshly-loaded row as changed [#17042](https://github.com/phalcon/cphalcon/issues/17042) [[doc]](https://docs.phalcon.io/5.14/db-models/)
- Fixed `Phalcon\Mvc\Model::getUpdatedFields()` flagging unchanged null-valued columns as updated [#17042](https://github.com/phalcon/cphalcon/issues/17042) [[doc]](https://docs.phalcon.io/5.14/db-models/)
- Fixed `Phalcon\Mvc\Model\Row::offsetGet()` / `offsetExists()` throwing `The index does not exist in the row` when accessing a column whose value is `null` [#17041](https://github.com/phalcon/cphalcon/issues/17041) [[doc]](https://docs.phalcon.io/5.14/db-models/)
- Fixed `Phalcon\Mvc\Router::handle()` falling back to a default catch-all route instead of matching an HTTP-method-constrained route attached afterward. [#17062](https://github.com/phalcon/cphalcon/issues/17062) [[doc]](https://docs.phalcon.io/5.14/routing/)
- Fixed `Phalcon\Mvc\View::getContent()` throwing `TypeError` after `View::start()`. `start()` was assigning `$this->content = null` [#17041](https://github.com/phalcon/cphalcon/issues/17041) [[doc]](https://docs.phalcon.io/5.14/views/)
- Fixed `Phalcon\Mvc\View\Engine\Volt\Compiler` emitting invalid PHP when a double-quoted Volt string contained literal single quotes (e.g. `"send_ga('Link', ...)"`). Only un-escaped single quotes are now escaped, so the `'Let\'s Encrypt'` case from [#17002](https://github.com/phalcon/cphalcon/issues/17002) is preserved [#17046](https://github.com/phalcon/cphalcon/issues/17046) [[doc]](https://docs.phalcon.io/5.14/volt/)
- Fixed warning in `Phalcon\Auth\ManagerFactory` emitted in tests (random commit but had to be fixed) [#17066](https://github.com/phalcon/cphalcon/pull/17066)

### Removed

- Removed unused `Phalcon\Contracts\Container\Service\Lifetime` [#17066](https://github.com/phalcon/cphalcon/pull/17066)
- Reverted the `Phalcon\Mvc\Model\Query::executeUpdate()` named-placeholder substitution introduced for [#16976](https://github.com/phalcon/cphalcon/issues/16976). The substitution path was triggering a use-after-free in the model update flow under PostgreSQL ([#17042](https://github.com/phalcon/cphalcon/issues/17042)). Issue [#16976](https://github.com/phalcon/cphalcon/issues/16976) is reopened and will be addressed with a different approach. [[doc]](https://docs.phalcon.io/5.14/db-phql/)

## Upgrade
Developers can upgrade using PIE

```bash
pie install phalcon/cphalcon-5.14.0
```

To compile from source, follow our [installation document][installation_document]

[installation_document]: https://docs.phalcon.io/5.14/installation
[5_14_0]: https://github.com/phalcon/cphalcon/releases/tag/5.13.0
[auth]: https://docs.phalcon.io/5.14/auth
[container]: https://docs.phalcon.io/5.14/container
