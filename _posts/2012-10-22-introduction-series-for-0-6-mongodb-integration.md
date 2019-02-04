---
layout: post
title: "Introduction series for 0.6: MongoDB integration"
tags: [php, phalcon, mongo, "0.6", "0.x"]
---

We are very excited to announce that the 0.6.0 version of Phalcon is just around the corner.

With this version, we have made significant performance improvements in many components of the framework. We are also introducing the first template engine for PHP written in C called [Volt](https://docs.phalconphp.com/latest/en/volt).

We are proud to be pioneers in PHP performance in many areas such as:

<!--more-->
- [Full stack frameworks](https://docs.phalconphp.com/latest/en/mvc)
- [Micro frameworks](https://docs.phalconphp.com/latest/en/micro)
- [ORM (Object Relational Mappers) for PHP](https://docs.phalconphp.com/latest/en/models)
- [PHP Template Engines](https://docs.phalconphp.com/latest/en/volt) and
- ODM (Object Document Mappers)

NoSQL databases have earned a place in the development world, solving problems that relational databases could not. In 0.6.0 we have begun an effort to integrate NoSQL databases in Phalcon. [MongoDB](https://mongodb.org/) is one of the most popular NoSQL databases offering an interesting set of features.

We have integrated MongoDB with the [Cache](https://docs.phalconphp.com/latest/en/cache) and [Session](https://docs.phalconphp.com/latest/en/session) components. An ODM was created that extends the functionality of the [MongoDB PHP extension](http://www.php.net/manual/en/book.mongo.php). This allowed us to add new features such as events and validators, improving the integration with Phalcon.

Documents are used as models. Due to the absence of SQL queries and planners, NoSQL databases can see real improvements in performance using the Phalcon approach.

The following example shows how to implement a model that maps to a MongoDb collection.

A model can be just a class with the same name of the mapped collection:

```php
class Products extends Phalcon\Mvc\Collection
{

}
```

Adding validators/events as required:

```php
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validators\PresenceOf;
use Phalcon\Mvc\Model\Validators\Uniqueness;
use Phalcon\Mvc\Model\Validators\InclusionIn;

class Products extends Phalcon\Mvc\Collection
{
    public $code;

    public $name;

    public $type;

    public $status;

    public $created_at;

    public function validation()
    {
        $this->validate(
            new PresenceOf(
                [
                    "field"   => "name",
                    "message" => "The name is required"
                ]
            )
        );

        $this->validate(
            new Uniqueness(
                [
                    "field"   => "code",
                    "message" => "The 'code' must be unique"
                ]
            )
        );

        $this->validate(new InclusionIn(array(
            "field" => "type",
            "domain" => array('Vegetables', 'Fruits'),
            "message" => "The type must be 'Vegetables' or 'Fruits'"
        )));

        return $this->validationFails()!==false;
    }

    public function beforeCreate()
    {
        if (!$this->created_at) {
            $this->created_at = date('Y-m-d');
        }
    }

    public function beforeDelete()
    {
        if ($this->status == 'Active'){
            $message = new Message(
                "The record cannot be deleted because it's active"
            );
            $this->appendMessage($message);
            return false;
        }
    }
}
```

```php
// Create a product
$product         = new Products();
$product->name   = 'Artichoke';
$product->type   = 'Vegetables';
$product->status = 'Active';
$product->save();

// Querying all products
$products = Products::find();
foreach ($products as $product) {
    echo $product->name, "<br>";
}

// Querying products whose type is Vegetables
$products = Products::find(
    [
        ['types' => 'Vegetables']
    ]
);

// Querying the first product
$product = Products::findFirst();

// Querying the first product which is active
$product = Products::findFirst(
    [
        ['status' => 'Active']
    ]
);

// Deleting a product
$product->delete();
```

Additionally, as already mentioned above, an adapter for the Cache component is available. The following example shows how to use MongoDB as a cache for a SQL database, reducing the load:

```php
// Cache for one hour
$frontCache = new Phalcon\Cache\Frontend\Output(
    [
        'lifetime' => 3600
    ]
);

$cache = new Phalcon\Cache\Backend\Mongo(
    $frontCache,
    [
        'server'     => 'mongodb://192.168.0.99',
        'db'         => 'invo',
        'collection' => 'caches'
    ]
);

// Trying to get latest products cached
$cacheKey = 'lastest.products';
$products = $products->get($cacheKey);
if ($products === null) {

    // $products is null due to cache expiration or data does not exist
    // Make the database call and populate the variable
    $products = Products::find(
        [
            "order" => "created_at DESC",
            "limit" => 10
        ]
    );

    // Store it in the cache
    $cache->save($cacheKey, $products);
}

// Use the $products
foreach ($products as $product) {
    echo $product->name, "\n";
}
```

Complete documentation for the ODM is available [here](https://docs.phalconphp.com/en/0.6.0/reference/odm)

A beta for 0.6.0 will be available tomorrow and the final version November 1st!


<3 The Phalcon Team
