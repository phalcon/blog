Phalcon 2.0.4 released
======================

As part of our three to five weeks minor release schedule, we are excited to
announce that Phalcon 2.0.4 has been released!

The number of improvements and bug fixes are a lot more compared to other
releases in the 2.0.x series:

### Changes

- Fixed bug in `Phalcon\Mvc\Model::update()` that mistakenly throws an
  exception when the record does exist
- Now links in `Phalcon\Debug` point to https://api.phalconphp.com instead of
  http://docs.phalconphp.com
- Implemented a more versatile way to assign variables in Volt allowing to
  assign properties and array indexes
- Improved generation of macros in Volt using anonymous functions instead of
  plain PHP functions, which allows binding the adapter object and injecting
  services within them
- Fixed generation and validation of default parameters in Volt's macros
- Added `Phalcon\Assets\Manager::getCollections()` to return all collections
  registered [#2488](https://github.com/phalcon/cphalcon/pull/2488)
- Now `Phalcon\Mvc\Url::getStatic()` generates URLs from routes
- Introduced `Phalcon\Mvc\EntityInterface` to allow parameters receive both
  `Phalcon\Mvc\Model` and `Phalcon\Mvc\Collection` instances. This interface
  allows `Mvc\Model\Validators` to be used in `Mvc\Collection`
- Added `Phalcon\Session\Adapter::setName()` to change the session name
- Added `BIGINT` column type support in `Phalcon\Db`
- Added new types `Phalcon\Db\Column::BLOB` and `Phalcon\Db\Column::DOUBLE`
  [#10506](https://github.com/phalcon/cphalcon/pull/10506)
- Automatic binding of Large Object data (LOB) in the ORM
- Support for `BIT` types in MySQL with binding as booleans
- Added `Phalcon\Flash\Direct::output()` allowing to place flash messages in a
  specific place of the view [#629](https://github.com/phalcon/cphalcon/pull/629)
- Added 'autoescape' option that allows to globally enable autoescape in any
  Volt template
- Added `readAttribute`/`writeAttribute` to `Phalcon\Mvc\Collection\Document`
- Added toArray to `Phalcon\Mvc\Collection\Document`
- Global setting `db.force_casting` now forces casting bound parameters to
  specified bind types
- Introduced new placeholders in PHQL enclosed in brackets that allow to set
  the type: `{name:str}` or `{names:array}`
- Now you can bind arrays in bound parameters in PHQL
- Global setting `orm.cast_on_hydrate` allows casting hydrated attributes to
  the original types in the mapped tables instead of using strings
- Values in `LIMIT`/`OFFSET` clause are now passed using bound parameters in PHQL
- Allowing late state binding in both Simple/Complex results to allow override
  `Mvc\Model::cloneResultMap`
- Added method `distinct()` in `Phalcon\Mvc\Model\Criteria`
  [#10536](https://github.com/phalcon/cphalcon/issues/10536)
- Added global setting `orm.ignore_unknown_columns` to ignore unexpected
  columns when hydrating instances in the ORM. This fixes extra auxiliary
  columns used in `Db\Adapter\Pdo\Oracle`
- Added support for `afterFetch` in `Mvc\Collection`
- Added `beforeMatch` parameter in `@Route` annotation of `Mvc\Router\Annotations`
- Added `groupBy`/`getGroupBy`/`having`/`getHaving` to `Mvc\Model\Criteria`
- `Phalcon\Mvc\Model::count()` now return values as integer
- Removed `__construct` from `Phalcon\Mvc\View\EngineInterface`
- Added `Phalcon\Debug\Dump::toJson()` to return an JSON string of information
  about a single variable
- Instances in `Phalcon\Di` are built using internal optimizers instead of
  `\ReflectionClass` (PHP 5.6)
- Added `Phalcon\Mvc\Model\Validator\IP` from incubator
- Added parameter return `defaultValue` in `Phalcon\Mvc\Model\Validator::getOption()`
- Developers can now define relationships based on conditionals

### Highlights

#### Typed Placeholders in the ORM
Before this version, only standard placeholders (strings and numerical) were
supported in PHQL [PHQL](https://docs.phalconphp.com/en/latest/reference/phql.html).
Placeholders allowed you to bind parameters to avoid SQL injections:

```php
$phql = "SELECT * FROM Store\Robots WHERE id > :id:";
$robots = $this->modelsManager->executeQuery($phql, ['id' => 100]);
```

However, some database systems require additional actions when using
placeholders like specify the bind type:

```php
use Phalcon\Db\Column;

// ...

$phql = "SELECT * FROM Store\Robots LIMIT :number:";
$robots = $this->modelsManager->executeQuery(
    $phql,
    ['number' => 10],
    Column::BIND_PARAM_INT
);
```

To make this task easy, Phalcon 2.0.4 introduces typed placeholders, these work
exactly as the other supported ones but additionally you can specify the type:

```php
$phql = "SELECT * FROM Store\Robots LIMIT {number:int}";
$robots = $this->modelsManager->executeQuery(
    $phql,
    ['number' => 10]
);

$phql = "SELECT * FROM Store\Robots WHERE name <> {name:str}";
$robots = $this->modelsManager->executeQuery(
    $phql,
    ['name' => $name]
);
```

You can also omit the type if you don't need to specify it:

```php
$phql = "SELECT * FROM Store\Robots WHERE name <> {name}";
$robots = $this->modelsManager->executeQuery(
    $phql,
    ['name' => $name]
);
```

Typed placeholders are also more powerful, since we can now bind a static array
without having to pass each element independently as a placeholder:

```php
$phql = "SELECT * FROM Store\Robots WHERE id IN ({ids:array})";
$robots = $this->modelsManager->executeQuery(
    $phql,
    ['ids' => [1, 2, 3, 4]]
);
```

The following types are available:

| Bind Type  | Bind Type Constant                 | Example         |
|------------|------------------------------------|-----------------|
| str        | Column::BIND_PARAM_STR             | {name:str}      |
| int        | Column::BIND_PARAM_INT             | {number:int}    |
| double     | Column::BIND_PARAM_DECIMAL         | {price:double}  |
| bool       | Column::BIND_PARAM_BOOL            | {enabled:bool}  |
| blob       | Column::BIND_PARAM_BLOB            | {image:blob}    |
| null       | Column::BIND_PARAM_NULL            | {exists:null}   |
| array      | Array of Column::BIND_PARAM_STR    | {codes:array}   |
| array-str  | Array of Column::BIND_PARAM_STR    | {names:array}   |
| array-int  | Array of Column::BIND_PARAM_INT    | {flags:array}   |

#### Cast bound parameters values
By default, bound parameters aren't casted in the PHP userland to the specified
bind types, this option allows you to make Phalcon cast values before bind them
with PDO.

A classic situation when this problem raises is passing
a string in a `LIMIT`/`OFFSET` placeholder:

```php
$number = '100';
$robots = $modelsManager->executeQuery(
    'SELECT * FROM Some\Robots LIMIT {number:int}',
    ['number' => $number]
);
```

This causes the following exception:

``
Fatal error: Uncaught exception 'PDOException' with message 'SQLSTATE[42000]:
Syntax error or access violation: 1064 You have an error in your SQL syntax;
check the manual that corresponds to your MySQL server version for the right
syntax to use near ''100'' at line 1' in /Users/scott/demo.php:78
``

This happens because 100 is a string variable. It is easily fixable by casting
the value to integer first:

```php
$number = '100';
$robots = $modelsManager->executeQuery(
    'SELECT * FROM Some\Robots LIMIT {number:int}',
    ['number' => (int) $number]
);
```

However this solution requires that the developer pays special attention about
how bound parameters are passed and their types. To make this task easier and
avoid unexpected exceptions you can instruct Phalcon to do this casting for you:

```php
\Phalcon\Db::setup(['forceCasting' => true]);
```

The following actions are performed according to the bind type specified:

| Bind Type                  | Action                                   |
|----------------------------|------------------------------------------|
| Column::BIND_PARAM_STR     | Cast the value as a native PHP string    |
| Column::BIND_PARAM_INT     | Cast the value as a native PHP integer   |
| Column::BIND_PARAM_BOOL    | Cast the value as a native PHP boolean   |
| Column::BIND_PARAM_DECIMAL | Cast the value as a native PHP double    |

#### Cast on Hydrate
Values returned from the database system are always represented as string values
by PDO, no matter if the value belongs to a numerical or boolean type column.
This happens because some column types cannot be represented with its
corresponding PHP native types due to their size limitations.

For instance, a `BIGINT` in MySQL can store large integer numbers that cannot be
represented as a 32bit integer in PHP. Because of that, PDO and the ORM by
default, make the safe decision of leaving all values as strings.

However, some developers may find this unexpected and uncomfortable. From
Phalcon 2.0.4, you can set up the ORM to automatically cast those types
considered safe to their corresponding PHP native types:

```php
\Phalcon\Mvc\Model::setup(['castOnHydrate' => true]);
```

This way you can use strict operators or make assumptions about the type of
variables:

```php
$robot = Robots::findFirst();
if ($robot->id === 11) {
    echo $robot->name;
}
```

#### Relationships with conditionals
With 2.0.4 you can create relationships based on conditionals. When querying
based on the relationship the condition will be automatically appended to the
query:

```php
// Companies have invoices issued to them (paid/unpaid)
// Invoices model
class Invoices extends Phalcon\Mvc\Model
{
    public function getSource()
    {
        return 'invoices';
    }
}

// Companies model
class Companies extends Phalcon\Mvc\Model
{
    public function getSource()
    {
        return 'companies';
    }

    public function initialize()
    {
        // All invoices relationship
        $this->hasMany(
            'id',
            'Invoices',
            'inv_id',
            [
                'alias' => 'invoices',
                'reusable' => true,
            ]
        );

        // Paid invoices relationship
        $this->hasMany(
            'id',
            'Invoices',
            'inv_id',
            [
                'alias'    => 'invoicesPaid',
                'reusable' => true,
                'params'   => [
                    'conditions' => "inv_status = 'paid'"
                ]
            ]
        );

        // Unpaid invoices relationship
        $this->hasMany(
            'id',
            'Invoices',
            'inv_id',
            [
                'alias'    => 'invoicesUnpaid',
                'reusable' => true,
                'params'   => [
                    'conditions' => "inv_status <> 'paid'"
                ]
            ]
        );
    }
}
```

### Update/Upgrade

This version can be installed from the master branch, if you don't have Zephir
installed follow these instructions:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout master
cd build
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
git checkout master
zephir fullclean
zephir build
```

Note that running the installation script will replace any version of Phalcon
installed before.

Windows DLLs are available in the [download page](http://phalconphp.com/en/download/windows).

See the [upgrading guide](https://blog.phalconphp.com/post/guide-upgrading-to-phalcon-2)
for more information about upgrading to Phalcon 2.0.x from 1.3.x.

* [Documentation](https://docs.phalconphp.com)
* [API](https://api.phalconphp.com/)
