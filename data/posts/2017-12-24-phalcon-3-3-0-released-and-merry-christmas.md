![image]({{ cdnUrl }}files/2017-12-24-christmas.jpg)

The Phalcon Team wishes all of our friends, contributors, developers and users of the framework a Merry Christmas!. We hope that the new year will bring health and happiness to you and your loved ones!

As a small gift for this holiday/celebration, we are releasing Phalcon [3.3.0](https://github.com/phalcon/cphalcon/releases/tag/v3.3.0).

This release concentrated on support for **PHP 7.2**, new features and fixing some bugs,

##### **A huge thank you to all of our contributors and the community!!** {.alert .alert-warning}

The release tag can be found here: [3.3.0](https://github.com/phalcon/cphalcon/releases/tag/v3.3.0)

#### Changelog
- Added support of PHP 7.2 and initial support of PHP 7.3
- Added support for `switch/case` syntax to the Volt Engine [#13107](https://github.com/phalcon/cphalcon/issues/13107)
- Added `Phalcon\Logger\Adapter\Blackhole` [#13074](https://github.com/phalcon/cphalcon/issues/13074)
- Added `Phalcon\Http\Request::hasHeader` to check if certain header exists
- Added support of [`103 (Early Hint)`](https://datatracker.ietf.org/doc/draft-ietf-httpbis-early-hints) HTTP status code
- Added `router:beforeMount` event to `Router::mount` [#13158](https://github.com/phalcon/cphalcon/issues/13158)
- Added `Phalcon\Mvc\Application::sendHeadersOnHandleRequest` to enable or disable sending headers by each request handling [#13101](https://github.com/phalcon/cphalcon/issues/13101)
- Added `Phalcon\Mvc\Application::sendCookiesOnHandleRequest` to enable or disable sending cookies by each request handling [#13101](https://github.com/phalcon/cphalcon/issues/13101)
- Added ability to use PDO option aliases on database connect [#13010](https://github.com/phalcon/cphalcon/issues/13010)
- Added `Phalcon\Mvc\Model\MetaData\Apcu` [#13078](https://github.com/phalcon/cphalcon/issues/13078)
- Added ability to use string(file path) as a argument in `Phalcon\Config\Factory::load()`
- Added `Phalcon\Mvc\Mico\Collection::mapVia` to map routes via methods
- Added `Phalcon\Mvc\Model::setOldSnapshotData` to set old snapshot data separately to current snapshot data
- Added `Phalcon\Http\Response::removeHeader` to remove specific header from response
- Added `Phalcon\Mvc\Query::setTransaction` to enable an override transaction [#13226](https://github.com/phalcon/cphalcon/issues/13226)
- Fixed `Phalcon\Mvc\Model\Query\Builder::getPhql` to correct generate PHQL in argument's array when using order `DESC` or `ASC` [#11827](https://github.com/phalcon/cphalcon/issues/11827)
- Fixed `Phalcon\Db\Dialect\Postgresql::createTable` to produce valid SQL for table definition with `BOOLEAN` types [#13132](https://github.com/phalcon/cphalcon/issues/13132)
- Fixed `Phalcon\Db\Dialect\Postgresql::_castDefault` to return correct value for `BOOLEAN` type [#13132](https://github.com/phalcon/cphalcon/issues/13132), [phalcon/phalcon-devtools#1118](https://github.com/phalcon/phalcon-devtools/issues/1118)
- Fixed `Phalcon\Mvc\Model::_doLowInsert` to correct save snapshot on creation/save identityless models [#13166](https://github.com/phalcon/cphalcon/issues/13166)
- Fixed `Phalcon\Mvc\Model::_doLowUpdate` to correctly work with `Phalcon\Db\RawValue` [#13170](https://github.com/phalcon/cphalcon/issues/13170)
- Fixed `Phalcon\Mvc\Model::allowEmptyStringValues` to correct works with saving empty string values when DEFAULT not set in SQL
- Fixed `Phalcon\Mvc\Model\Behavior\SoftDelete` to correctly update snapshots after deleting item
- Fixed `Phalcon\Mvc\Model` to set old snapshot when no fields are changed when dynamic update is enabled
- Fixed `Phalcon\Acl\Adapter\Memory::isAllowed` to properly pass role and resource objects to custom function if they are objects of the same class
- Changed `Phalcon\Mvc\Model` to allow to pass a transaction within the query context [#13226](https://github.com/phalcon/cphalcon/issues/13226)

#### Highlights
The most notable additions are support for `switch/case` syntax in Volt, `hasHeader` in Request and the addition of the `router:beforeMount` event.

#### `switch/case`
You can now use the `switch` statement in Volt

```twig
{% switch foo %}
    {% case 0 %}
    {% case 1 %}
    {% case 2 %}
        `foo` is less than 3 but not negative
        {% break %}
    {% case 3 %}
        `foo` is 3
        {% break %}
    {% default %}
        `foo` is {{ foo }}
{% endswitch %}
```

The switch statement executes statement by statement, therefore the `break` statement is necessary in some cases. Any output (including whitespace) between a switch statement and the first case will result in a syntax error. Empty lines and whitespaces can therefore be cleared to reduce the number of errors [see here](http://php.net/control-structures.alternative-syntax).

**`case` without `switch`**
```twig
{% case EXPRESSION %}
```
Will throw `Fatal error: Uncaught Phalcon\Mvc\View\Exception: Unexpected CASE`.

**`switch` without `endswitch`**
```twig
{% switch EXPRESSION %}
Will throw `Fatal error: Uncaught Phalcon\Mvc\View\Exception: Syntax error, unexpected EOF in ..., there is a 'switch' block without 'endswitch'`.
```

**`default` without `switch`**
```twig
{% default %}
```
Will not throw an error because `default` is a reserved word for filters like `{{ EXPRESSION | default(VALUE) }}` but in this case the expression will only output an empty char '' .

**nested `switch`**
```twig
{% switch EXPRESSION %}
  {% switch EXPRESSION %}
  {% endswitch %}
{% endswitch %}
```

Will throw `Fatal error: Uncaught Phalcon\Mvc\View\Exception: A nested switch detected. There is no nested switch-case statements support in ... on line ....`

**a `switch` without an expression**
```twig
{% switch %}
  {% case EXPRESSION %}
      {% break %}
{% endswitch %}
```

Will throw `Fatal error: Uncaught Phalcon\Mvc\View\Exception: Syntax error, unexpected token %} in ... on line ....`

The most notable additions are support for `switch/case` syntax in Volt, `hasHeader` in Request and the addition of the `router:beforeMount` event.

#### `hasHeader` in `Phalcon\Http\Request`
You can now use the `hasHeader` method, to check if a header has been set in the incoming request.

```php
if ($request->hasHeader('myheader') {
    echo 'Yay! Header was set!!'
}
```

#### `router:beforeMount`
Sometimes it is necessary to attach some logic to our application, before the routes are mounted in our `Router` object. The `beforeMount` event is perfect in these cases. You can now use it if your application requirements dictate so.

### Update/Upgrade
Phalcon 3.3.0 can be installed from the `master` branch, if you don't have Zephir installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Note that running the installation script will replace any version of Phalcon installed before.

[PackageCloud.io](https://packagecloud.io/phalcon/stable) has been updated to allow your package manager (for Linux machines) to upgrade to the new version seamlessly.

##### NOTE: Our packaging system not longer supports Ubuntu 15.10 due to difficulties installing dependencies, updates and major security patches. Ubuntu 15.10 reached its end of life in July 28, 2016. We strongly recommend you upgrade your installation. If you cannot, you can always build the latest stable version of Phalcon from the source code. {.alert .alert-danger}

##### NOTE: Windows DLLs are now available in our [Github Release](https://github.com/phalcon/cphalcon/releases/tag/v3.2.3) page. {.alert .alert-danger}

We encourage existing Phalcon 3 users to update to this version.


<3 Phalcon Team

