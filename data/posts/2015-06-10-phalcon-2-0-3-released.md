As part of our regular release schedule, we are happy to announce that Phalcon 2.0.3 has been released!

This version contains many bug fixes as well as new functionality that derived from community NFRs.

### Changes

 - Implemented Namespace aliases in PHQL
 - Ability to define if a virtual foreign key must ignore `null` values or not
 - Added support for Behaviors in `Phalcon\Mvc\Collection`
 - Added `SoftDelete` and `Timestampable` behaviors to Collections
 - Fixed bug that added two ? in `Mvc\Url::get` when using query parameters [10421](https://github.com/phalcon/cphalcon/issue/10421)
 - String attributes in models can be marked to allow empty string values [440](https://github.com/phalcon/cphalcon/issue/440)
 - Added an option to return the SQL to be generated from a `Mvc\Model\Query` instance [1908](https://github.com/phalcon/cphalcon/issue/1908)
 - Fix doesn't correct column domain in `Phalcon\Db\Dialect::select()` [10439](https://github.com/phalcon/cphalcon/issue/10439)
 - Added support for DOUBLE type in MySQL
 - `Phalcon\Tag\Select` now handles array values as strings avoiding that zero will be handled as empty string [2921](https://github.com/phalcon/cphalcon/issue/2921)
 - PHQL now supports CASE/WHEN/ELSE expressions [651](https://github.com/phalcon/cphalcon/issue/651)
 - Fixed bug that passes non-string values to `Phalcon\Crypt::encrypt` from `Phalcon\Http\Cookies`
 - Fixed bug that didn't pass the schema name in the sequence name (PostgreSQL) 
 - Attribute persistent is now removed from the DNS attributes in PDO connections to avoid errors in PostgreSQL [10484](https://github.com/phalcon/cphalcon/issue/10484)

### Highlights

#### Support for CASE/WHEN/ELSE
Now `CASE/WHEN/ELSE` is available in [PHQL](https://docs.phalconphp.com/en/latest/reference/phql.html) expressions:

```php
$robots = $this->modelsManager->executeQuery("
    SELECT
        CASE r.Type
            WHEN 'Mechanical' THEN 1
            WHEN 'Virtual' THEN 2
            ELSE 3
        END
    FROM Store\Robots
");
```

#### Namespace Aliases
If you are using namespaces to organize your models, you will often find yourself typing a long namespaced string to just reference one of your models. By using this feature, you can add aliases to existing namespaces, which will speed up development time:

```php
// Before
$data = $this->modelsManager->executeQuery("
    SELECT r.*, rp.*
    FROM Store\Backend\Models\Robots AS r
    JOIN Store\Backend\Models\RobotsParts AS rp
");
```

Define aliases in the models manager:

```php
use Phalcon\Mvc\Model\Manager as ModelsManager;

// ...

$di->set(
    'modelsManager',
    function () {
        $modelsManager = new ModelsManager();
        $modelsManager->registerNamespaceAlias(
            'bm',
             'Store\Backend\Models\Robots'
         );
        return $modelsManager;
    }
);
```

And in the queries:

```php
// After
$data = $this->modelsManager->executeQuery("
    SELECT r.*, rp.*
    FROM bm:Robots AS r
    JOIN bm:RobotsParts AS rp
");
```

#### Custom Dialect Functions
This new functionality will help you to extend PHQL as you need using custom functions. In the following example we're going to implement the MySQL's extension MATCH/BINARY. First of all you have to instantiate the SQL dialect

```php
use Phalcon\Db\Dialect\MySQL as SqlDialect;
use Phalcon\Db\Adapter\Pdo\MySQL as Connection;

$dialect = new SqlDialect();

// Register a new function called MATCH_AGAINST
$dialect->registerCustomFunction(
    'MATCH_AGAINST',
    function($dialect, $expression) {
        $arguments = $expression['arguments'];
        return sprintf(
            " MATCH (%s) AGAINST (%)",
            $dialect->getSqlExpression($arguments[0]),
            $dialect->getSqlExpression($arguments[1])
         );
    }
);

// The dialect must be passed in the connection constructor
$connection = new Connection(
    [
        "host"          => "localhost",
        "username"      => "root",
        "password"      => "",
        "dbname"        => "test",
        "dialectClass"  => $dialect
    ]
);

```

Now you can use this function in PHQL and it internally translates to the right SQL using the custom function:

```php
$phql = "SELECT *
   FROM Posts
   WHERE MATCH_AGAINST(title, :pattern:)";
$posts = $modelsManager->executeQuery($phql, ['pattern' => $pattern]);
```

#### Improvements in Subqueries

In Phalcon 2.0.2 subqueries were introduced in PHQL. Support for this feature had been improved in 2.0.3 by introducing the EXISTS operator:

```php
$phql = "SELECT c.*
  FROM Shop\Cars c
  WHERE EXISTS (
     SELECT id
     FROM Shop\Brands b
     WHERE b.id = c.brandId
  )";
$cars = $this->modelsManager->executeQuery($phql);
```

### Update/Upgrade

This version can be installed from the master branch, if you don't have Zephir installed follow these instructions:

```sh
    git clone http://github.com/phalcon/cphalcon
    git checkout master
    cd ext
    sudo ./install
```

The standard installation method also works:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

If you have Zephir installed:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
zephir build
```

Note that running the installation script will replace any version of Phalcon installed before.

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

See the [upgrading guide](https://blog.phalconphp.com/post/guide-upgrading-to-phalcon-2) for more information about upgrading to Phalcon 2.0.x from 1.3.x.

* [Documentation](https://docs.phalconphp.com)
* [API](https://api.phalconphp.com/) (Thanks to [gsouf](https://github.com/gsouf))

### Thanks

Thanks to everyone involved in making this version: collaborators and as well to the community for their continuous input and feedback!


<3 Phalcon Team
