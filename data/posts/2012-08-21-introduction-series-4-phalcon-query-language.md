## Introduction Series 4: Phalcon Query Language (PHQL)

This is the last part of the introduction series regarding our upcoming release of Phalcon 0.5.0.

With the 0.5x release, we have made changes in the architecture, introducing more components the framework while still keeping performance very high. We felt that the ORM could use some additional optimization as well as functionality, so that was the last area we concentrated on. We have made many improvements in the database and ORM components, such as the use of [PDO](http://php.net/manual/en/book.pdo.php), improved security with automatically binding parameters and much more.

A few weeks ago, our focus shifted briefly towards a more ambitious project: PhalconQL (PHQL). Following in line with other frameworks, we have created a hybrid SQL language to aid the developers when interacting with databases. PHQL allows the use of models, instead of just tables, that can encapsulate a lot more model logic in them. A similar idea exists in other projects such as Hibernate with its [HQL](http://en.wikipedia.org/wiki/Hibernate_Query_Language), Doctrine with [DQL](http://doctrine-orm.readthedocs.org/en/2.0.x/reference/dql-doctrine-query-language.html).

PHQL is implemented as a parser (written in C) that translates syntax in that of the target RDBMS. The parser is the most interesting, yet challenging, part of this component. It allows Phalcon to offer a unified SQL language to the developer, while internally doing all the work of translating PHQL instructions to the most optimal SQL instructions depending on the RDBMS type associated with a model.

To better explain how PHQL works consider the following example. We have two models `Cars` and `Brands`:

```php
class Cars extends Phalcon\Mvc\Model
{
    public $id;
    public $name;
    public $brand_id;
    public $year;
    public $style;

    /**
     * This model is mapped to the table sample_cars
     */
    public function getSource()
    {
        return 'sample_cars';
    }

    /**
     * A car only has a Brand, but a Brand have many Cars
     */
    public function initialize()
    {
        $this->belongsTo('brand_id', 'Brands', 'id');
    }
}
```

And every Car has a Brand, so a Brand has many Cars:

```php
class Brands extends Phalcon\Mvc\Model
{
    public $id;
    public $name;
    
    /**
     * The model Brands is mapped to the "sample_brands" table
     */
    public function getSource()
    {
        return 'sample_brands';
    }
    
    /**
     * A Brand can have many Cars
     */
    public function initialize()
    {
        $this->hasMany('id', 'Brands', 'brand_id');
    }
}
```

Selecting Records With PHQL, we can query existing records as we would in SQL, except that instead of specifying tables, we use models:

```php
$query = $manager->createQuery("SELECT * FROM Cars ORDER BY Cars.name"); 
$query = $manager->createQuery("SELECT Cars.name FROM Cars ORDER BY Cars.name");
```

Most of the SQL standard is supported by PHQL even nonstandard directives as `LIMIT`:

```php
$sql   = "SELECT c.name FROM Cars AS c "
       . "WHERE c.brand_id = 21 ORDER BY c.name LIMIT 100";
$query = $manager->createQuery($sql);
```

**Joins** 
Creating joins between tables is a trivial task with PHQL, if the relationships are defined in the models. PHQL adds these conditions automatically:

```php
// Joining Two tables
$sql   = "SELECT Cars.name AS car_name, Brands.name AS brand_name "
       . "FROM Cars "
       . "JOIN Brands "
       . "ORDER BY Cars.name";
$query = $manager->createQuery($sql);

// Using aliases
$sql   = "SELECT c.name AS car_name, b.name AS brand_name "
       . "FROM Cars c "
       . "JOIN Brands b "
       . "ORDER BY c.name";
$query = $manager->createQuery($sql);

// This produces the following SQL
// SELECT c.name AS car_name, b.name AS brand_name 
// FROM sample_cars AS c 
// INNER JOIN sample_brands AS b ON c.brands_id = b.id 
// ORDER BY c.name
```

Also, as part of PHQL, we added prepared parameters that automatically escape the input data, introducing more security:

```php
$sql    = "SELECT c.name FROM Cars c WHERE c.id = :id:";
$params = array('id' => $someExternalId);
$query  = $manager->createQuery($sql, $params);
```

Those parameters are directly transformed into PDO parameters that are compatible various RDBMS.

**Inserting/Updating/Deleting Records**
PHQL is not just about querying a database. It also offers methods to manipulate data using familiar SQL instructions:

```php
$sql = "INSERT INTO Cars "
     . "VALUES (NULL, 'Lamborghini Espada', 7, 1969, 'Grand Tourer')";

$manager->executeQuery($sql);

$sql = "INSERT INTO Cars (name, brand_id, year, style) "
     . "VALUES ('Lamborghini Espada', 7, 1969, 'Grand Tourer')";
$manager->executeQuery($sql);

$sql = "INSERT INTO Cars (name, brand_id, year, style) "
     . "VALUES (:name:, :brand_id:, :year:, :style)";

$params = [
    'name'     => 'Lamborghini Espada',
    'brand_id' => 7,
    'year'     => 1969,
    'style'    => 'Grand Tourer',
];
$manager->executeQuery($sql, $params);
```

By default, statements that manipulate data, honor the [Events Manager](/post/introduction-series-2-the-events-manager) hook calls. So internally, events such as `beforeSave`, `beforeUpdate` or `beforeDelete` are also executed prior to the statement. Similarly, after the statement is executed, `afterSave`, `afterUpdate` or `afterDelete` are also executed.

For example:

```php
$manager->executeQuery("DELETE FROM Brands WHERE name LIKE 'Lam%'");
```

Is the same as:

```php
foreach (Brands::find("name LIKE 'Lam%'") as $brand) {
    $brand->delete();
}
```

So, for every record found, the delete method will call the events `beforeDelete` and `afterDelete` (if they are defined) giving the developer the option to define any business rules needed or validating virtual foreign keys as well.

This ensures the correct flow of operation throughout the framework when using PHQL.

**Namespaces**
PHQL also takes advantage of Namespaces, and can be used transparently as part of a PHQL statement:

```php
$sql   = "SELECT Store\Products.type, SUM(Store\Products.price) AS price "
       . "FROM Store\Products "
       . "ORDER BY Store\Products.type";

$query = $manager->createQuery($sql);
```

**General Operation**
To achieve the highest performance possible, we wrote a parser that uses the same technology as [SQLite](http://en.wikipedia.org/wiki/Lemon_Parser_Generator). This technology provides a small in-memory parser with a very low memory footprint that is also thread-safe.

The parser first checks the syntax of the passed PHQL statement, then builds an intermediate representation of the statement and finally it converts it to the respective SQL dialect of the target RDBMS.

We are in the process of rewriting the documentation to reflect all these changes. However if you want to check some examples, please check our unit tests.

**Conclusion**
Phalcon provided the first ORM written purely in C for PHP developers. We are now taking it a step further, offering a high level, object oriented SQL dialect, which can be used in any of the supported RDBMS for an application. The common syntax allows developers to quickly develop ultra fast models and become more productive.

PS: We need vacations :)

<3 Phalcon Team