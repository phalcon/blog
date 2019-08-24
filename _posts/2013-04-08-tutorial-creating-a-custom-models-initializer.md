---
layout: post
title: "Tutorial: Creating a custom model's initializer with Annotations"
tags: [php, phalcon, sample, tutorial, "1.x"]
---

This tutorial is oriented to an intermediate/advanced audience. We'll explain how to create a custom model's initializer via annotations that can be easily modified/adapted to initialize collections, plugins, etc.

<!--more-->
### Bootstrap
The example provides a simple structure that can be implemented in any Phalcon application. You can find the complete code on Github. The following structure is used:

```sh
example/
   cache/
   db/
   models/
      Robots.php
      RobotsParts.php
      Parts.php
   library/
       AnnotationsInitializer.php
       AnnotationsMetaDataInitializer.php
   services.php
   index.php
```

The file services.php is the example's bootstrap, on it you can find the service initialization, we are only initializing the basic services necessary to run the example.

The first is the database connection, we used Sqlite as adapter, but you can use any other of the [supported database systems](https://docs.phalcon.io/latest/en/db#database-adapters):

```php
// Setup a connection
$di['db'] = function () {
    return new \Phalcon\Db\Adapter\Pdo\Sqlite(
        [
            "dbname" => "sample.db"
        ]
    );
};
```

Then, we create the model's manager with a custom plugin that perform extra initialization tasks:

```php
// Set a models manager
$di['modelsManager'] = function () {

    $eventsManager = new EventsManager();

    $modelsManager = new ModelsManager();

    $modelsManager->setEventsManager($eventsManager);

    // Attach a listener to models-manager
    $eventsManager->attach('modelsManager', new AnnotationsInitializer());

    return $modelsManager;
};
```

### Model initialization
AnnotationsInitializer is a plugin that reads the annotations in the model's class performing the appropriate tasks according to the annotations used. A model with annotations is the following:

```php
<?php

/**
 * Robots
 *
 * Represents a robot
 *
 * @Source('my_robots');
 * @HasMany("id", "RobotsParts", "robotsId")
 */
class Robots extends \Phalcon\Mvc\Model
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false, column="my_id")
     */
    public $id;

    /**
     * @Column(type="string", nullable=false, column="my_name")
     */
    public $name;

    /**
     * @Column(type="string", nullable=false, column="my_type")
     */
    public $type;

    /**
     * @Column(type="integer", nullable=false, column="my_year")
     */
    public $year;

}
```

Both classes and properties are initialized using annotations rather than use the standard methods `initialize`, `columnMap`, `getSource`, etc. In this class, columns are dynamically renamed to the original ones in the database removing the vendor prefix `my_`. So if the column in the table is called `my_name` you can freely rename it as just `name`.

Our second model is `Parts`, every part represents a possible part to assemble our robots. This model contains every possible part that a robot could have.

```php
<?php

/**
 * Parts
 *
 * Represents every part to assemble a robot
 *
 * @Source('my_parts');
 * @HasMany("id", "RobotsParts", "robotsId")
 */
class Parts extends \Phalcon\Mvc\Model
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false, column="my_id")
     */
    public $id;

    /**
     * @Column(type="string", nullable=false, column="my_name")
     */
    public $name;

}
```

The relation between the robots and their parts are managed via the model `RobotsParts`:

```php
<?php

/**
 * RobotsParts
 *
 * Represents the relation between Robots and Parts
 *
 * @Source('my_robots_parts');
 * @BelongsTo('robotsId', 'Robots', 'id', {
 *    'alias': 'robot'
 * });
 * @BelongsTo('partsId', 'Parts', 'id', {
 *    'alias': 'part'
 * });
 */
class RobotsParts extends \Phalcon\Mvc\Model
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false, column="my_id")
     */
    public $id;

    /**
     * @Column(type="integer", nullable=false, column="my_robots_id")
     */
    public $robotsId;

    /**
     * @Column(type="integer", nullable=false, column="my_parts_id")
     */
    public $partsId;

}
```

To make these annotations work, we return to the `AnnotationsInitializer`, as mentioned before, this plugin is called after any model is initialized in the models manager allowing us to perform extra initializations:

```php
<?php

use Phalcon\Events\Event,
    Phalcon\Mvc\Model\Manager as ModelsManager
    Phalcon\Mvc\ModelInterface;

class AnnotationsInitializer extends Phalcon\Mvc\User\Plugin
{

    /**
     * This is called after initialize the model
     *
     * @param Phalcon\Events\Event $event
     */
    public function afterInitialize(Event $event, ModelsManager $manager, ModelInterface $model)
    {
        //...
    }

}
```

The method `afterInitialize` has the same name as the event triggered by the models manager, telling the events manager that this method must be executed. It receives the models manager itself and the model recently initialized.

Now, we could extract the annotations in the model's class giving a useful meaning to each of them:

```php
<?php

// Get the annotations reflection
$reflector = $this->annotations->get($model);

/**
 * Read the annotations in the class docblock
 */
$annotations = $reflector->getClassAnnotations();
if ($annotations) {

    /**
     * Traverse the annotations
     */
    foreach ($annotations as $annotation) {
        switch ($annotation->getName()) {
            //...
        }
    }
}
```

Annotations found are traversed and according to its name we're going to initialize the desired functionality, for example, if the name is `Source` we're going to assign its parameter as the model's mapped table:

```php
<?php

/**
 * Initializes the models source
 */
case 'Source':
    $arguments = $annotation->getArguments();
    $manager->setModelSource($model, $arguments[0]);
    break;
```

This way you can create new annotations, change the current names, etc. adding more functionality according to your application needs. Check out the original source code to understand how the other annotations are created.

### Meta-Data initialization
The second part of the initialization is the model's meta-data. This information is required to automate the operation of ORM in Phalcon. The meta-data contains: field names, primary keys, data types, column maps, etc. Normally, Phalcon uses database introspection to read this information from the database. In our case, we're going to define those data in annotations.

Phalcon provides the built-in strategy class:
[Phalcon\Mvc\Model\MetaData\Strategy\Annotations](https://docs.phalcon.io/latest/en/db-models#annotations-strategy) which performs the same task we'll going to explain below. Our custom meta-data strategy also uses annotations but it gives us understanding of how this task is achieved. You can adapt this code to create dynamic schemas, row level security, new annotations, etc.

This adapter is called
AnnotationsMetaDataInitializer (found in the library/ directory). It implements two methods: the former initializes the main meta-data and the second any column map found in the class:

```php
<?php

use Phalcon\Mvc\ModelInterface,
    Phalcon\DiInterface,
    Phalcon\Mvc\Model\MetaData,
    Phalcon\Db\Column;

class AnnotationsMetaDataInitializer
{

    /**
     * Initializes the models meta-data
     *
     * @param Phalcon\Mvc\ModelInterface $model
     * @param Phalcon\DiInterface $di
     * @return array
     */
    public function getMetaData(ModelInterface $model, DiInterface $di)
    {
        //...
    }

    /**
     * Initializes the models column map
     *
     * @param Phalcon\Mvc\ModelInterface $model
     * @param Phalcon\DiInterface $di
     * @return array
     */
    public function getColumnMaps(ModelInterface $model, DiInterface $di)
    {
        //...
    }

}
```

Following the same philosophy used in the model initializer we're going to find which annotations are defined in the properties, giving a meaning to each of them:

```php
<?php

foreach ($reflection->getPropertiesAnnotations() as $name => $collection) {

    if ($collection->has('Column')) {
        //... do something if the property has this annotation defined
    }

}
```

Returning to the file services.php, we see how this adapter is set up instead of the default one:

```php
<?php

$di['modelsMetadata'] = function () {

    // Use the memory meta-data adapter in development
    $metaData = new MetaDataAdapter(
        [
            'metaDataDir' => './cache/meta-data/'
        ]
    );

    // Set a custom meta-data database introspection
    $metaData->setStrategy(new AnnotationsMetaDataInitializer());

    return $metaData;
};
```

### Caching Annotations/Meta-Data
Parsing/Reading annotations and processing meta-data could add an important amount of overhead to the application in every request reducing the performance. While the Phalcon's [annotations parser](https://docs.phalcon.io/latest/en/annotations) is very fast, you could improve the speed by aggressively caching the annotations and meta-data using some of the adapters provided by the framework. In our example, we're using files to export the processed data avoiding the permanent processing in each request:

```php
// Use the memory meta-data adapter in development
$metaData = new MetaDataAdapter(
    [
        'metaDataDir' => './cache/meta-data/'
    ]
);

// Using the files adapter for annotations
$di['annotations'] = function () {
    return new AnnotationsAdapter(
        [
            'annotationsDir' => './cache/annotations/'
        ]
    );
};
```

Note that these adapters aren't suitable for development because they don't reload the changes made to the classes, you can use the Memory adapters to achieve this result.

### Example in Action
Once everything is correctly working you can use the models as is normally done in Phalcon:

```php
<?php

$robot = Robots::findFirst("type = 'mechanical'");

foreach ($robot->robotsParts as $robotPart) {
    echo 'Name:', $robotPart->part->name, PHP_EOL;
}
```

### Conclusion
This tutorial explains various strategies to extend Phalcon, the use of annotations, some additional information about the inner workings of the [ORM](https://docs.phalcon.io/latest/en/db-models). We hope that this example serve as a guide to create more robust applications with Phalcon.


<3 The Phalcon Team
