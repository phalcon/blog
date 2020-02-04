---
layout: post
title: "Expanding on Phalcon 3.2.0 new features"
date: 2017-06-23T16:23:19.160Z
tags: 
  - php
  - phalcon
  - phalcon3
  - "3.2.x"
  - release
  - rfc
  - lts
  - php7
  - new features
---
With [Phalcon 3.2.0](https://blog.phalcon.io/post/phalcon-3-2-0-released-and-new-docs) there were many new features and bugs fixed. Today we will write about most important things you need to know and show some code examples of new features.

<!--more-->
#### Added Factory Adapter loaders [#11001](https://github.com/phalcon/cphalcon/issues/11001)
  With this feature you can load your services in more simplified way using for example ini file:
  
```ini
[database]
host = TEST_DB_MYSQL_HOST
username = TEST_DB_MYSQL_USER
password = TEST_DB_MYSQL_PASSWD
dbname = TEST_DB_MYSQL_NAME
port = TEST_DB_MYSQL_PORT
charset = TEST_DB_MYSQL_CHARSET
adapter = mysql
```

```php
<?php

use Phalcon\Config\Adapter\Ini;
use Phalcon\Di;
use Phalcon\Db\Adapter\Pdo\Factory;

$di = new Di();
$config = new Ini('config.ini');

$di->set('config', $config);

$di->set(
    'db', 
    function () {
        return Factory::load($this->config->database);
    }
);
```
  
This will properly create your database instance and you can change database adapter to another one if necessary in the `ini` file anytime without changing your code.
  
#### Added ability to sanitize URL to `Phalcon\Filter`
There were added new sanitize filter - `url` which allows you to clear your urls. For example:

```php
<?php

use Phalcon\Filter;

$filter     = new Filter();
$wrongUrl   = 'http://juhara��.co�m';
$correctUrl = $filter->sanitize($wrongUrl, 'url');

echo $correctUrl; // displays 'http://juhara.com'
```

#### Added `Phalcon\Mvc\Model::hasUpdated` and `Phalcon\Mvc\Model:getUpdatedFields`, way to check if fields were updated after create/save/update, Added option to disable snapshot update on create/save using `Phalcon\Mvc\Model::setup(['updateSnapshotOnSave' => false])` or `phalcon.orm.update_snapshot_on_save = 0` in `php.ini`
In Phalcon 3.1.0 we changed the behavior of snapshots; they are now updated on model creation/update. This could potentially cause problems to your application if you execute `Model::getChangedFields` in `afterUpdate()`, `afterSave()` or `afterCreate()`. This change was done to fix other things also (for example dynamic update).
  
Right now you have two options:
- change your methods from `hasChanged()`, `getChangedFields()`, `getSnapshotData()` to `hasUpdated()`, `getUpdatedFields()`, `getOldSnapshotData()` or
- add `phalcon.orm.update_snapshot_on_save = 0` to your php.ini to disable snapshot updating on save.
  
```php
<?php

use Phalcon\Mvc\Model;

class User extends Model
{
  public function initialize()
  {
      $this->keepSnapshots(true);
  }
}

$user       = new User();
$user->name = 'Test User';
$user->create();
var_dump($user->getChangedFields());
$user->login = 'testuser';
var_dump($user->getChangedFields());
$user->update();
var_dump($user->getChangedFields());
```

On Phalcon 3.0.0 output was:

```php
array(1) {
[0]=>
string(4) "name"
}
array(2) {
[0]=>
string(4) "name"
[1]=>
string(5) "login"
}
array(2) {
[0]=>
string(4) "name"
[1]=>
string(5) "login"
}
```

On Phalcon 3.1.0 and later it is:

```php
array(0) {
}
array(1) {
[0]=>
string(5) "login"
}
array(0) {
}
```
  
`Model::getUpdatedFields` will properly return updated fields or as mentioned above you can go back to the previous behavior by setting the relevant ini value.
  
#### Added support for having option in `Phalcon\Paginator\Adapter\QueryBuilder` [#12111](https://github.com/phalcon/cphalcon/issues/12111)
From now on you can use `Phalcon\Mvc\Model\Query\Builder::having` and `Phalcon\Paginator\Adapter\QueryBuilder`.
  
Let's assume you have such a table `stock`:

```sql
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
`id`    INT(11)     NOT NULL,
`name`  VARCHAR(32) NOT NULL,
`stock` INT(11)     NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `stock` WRITE;
INSERT INTO `stock` (`id`, `name`, `stock`) VALUES
(1, 'Apple', 2),
(2, 'Carrot', 6)
(3, 'pear', 0);
UNLOCK TABLES;

ALTER TABLE `stock`
ADD PRIMARY KEY (`id`);

ALTER TABLE `stock`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
```

And this code:

```php
<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Paginator\Adapter\QueryBuilder;

class Stock extends Phalcon\Mvc\Model {};

$di            = new FactoryDefault();
$modelsManager = $di->get('modelsManager');
$builder       = $modelsManager
                    ->createBuilder()
                    ->columns('*, COUNT(*) as stock_count')
                    ->from(['Stock' => Stock::class])
                    ->groupBy('name')
                    ->having('SUM(Stock.stock) > 0');

$paginate = (
    new QueryBuilder(
        [
            'builder' => $builder,
            'limit'   => 1,
            'page'    => 2
        ]
    )
)->getPaginate();
var_dump($paginate->total_pages); // now it will return 2, previously it was 3
var_dump($paginate->total_items); // now it will return 2, previously it was 3
```
  
Please note:

- MySQL(and other databases) will need to select all rows and do a `count` on it.
- We use `groupBy` to select columns for those rows.
- If you don't have `groupBy` then you need to pass columns option to `Phalcon\Paginator\Adapter\QueryBuilder`:
  
```php
<?php

use Phalcon\Di\FactoryDefault;
use Phalcon\Paginator\Adapter\QueryBuilder;

class Stock extends Phalcon\Mvc\Model {};

$di            = new FactoryDefault();
$modelsManager = $di->get('modelsManager');
$builder       = $modelsManager
                    ->createBuilder()
                    ->columns('*, COUNT(*) as stock_count')
                    ->from(['Stock' => Stock::class])
                    ->having('SUM(Stock.stock) > 0');

$paginate = (
    new QueryBuilder(
        [
            'builder' => $builder,
            'limit'   => 1,
            'page'    => 2,
            'columns' => 'id,stock' // this is required in this case
        ]
    )
)->getPaginate();
var_dump($paginate->total_pages); // now it will return 2, previously it was 3
var_dump($paginate->total_items); // now it will return 2, previously it was 3
```
  
#### Added `Phalcon\Config::path` to get a value using a dot separated path [#12221](https://github.com/phalcon/cphalcon/issues/12221)

```php
<?php

use Phalcon\Config;

$config = new Config(
    [
        'test' => [
            'parent' => [
                'property'  => 1,
                'property2' => 'yeah',
            ],
        ],  
    ]
);

echo $config->path('test.parent.property'); // displays 1
```
  
#### Added service provider interface to configure services by context [#12783](https://github.com/phalcon/cphalcon/pull/12783)

From now you can move all your `$di->set()` to classes like this:
  
```php
<?php

use Phalcon\Di\ServiceProviderInterface;
use Phalcon\DiInterface;
use Phalcon\Di;
use Phalcon\Config\Adapter\Ini;

class SomeServiceProvider implements ServiceProviderInterface
{
    public function register(DiInterface $di)
    {
        $di->set(
            'config', 
            function () {
                return new Ini('config.ini');
            }
        );
    }
}

$di = new Di();
$di->register(new SomeServiceProvider());
var_dump($di->get('config')); // will return properly our config
```
  
#### Added the ability to load services from yaml (`Phalcon\Di::loadFromYaml`) and php array (`Phalcon\Di::loadFromPhp`) files, so we can keep the references cleanly separated from code [#12784](https://github.com/phalcon/cphalcon/pull/12784)
This feature will let you set your services in yaml files or just in plain php. For example you can load yaml file like this:
 
```yaml
config:
  className: \Phalcon\Config
  shared: true
```

```php
<?php

use Phalcon\Di;

$di = new Di();
$di->loadFromYaml('services.yml');
$di->get('config'); // will properly return config service
```
  
#### Added `Phalcon\Cache\Backend\Apcu` to introduce pure support of APCu [#12098](https://github.com/phalcon/cphalcon/issues/12098), [#11934](https://github.com/phalcon/cphalcon/issues/11934), Added `Phalcon\Annotations\Adapter\Apcu` to introduce pure support of APCu [#12098](https://github.com/phalcon/cphalcon/issues/12098)
In PHP 7 to use phalcon `apc` based adapter classes you needed to install `apcu` and `apcu_bc` package from pecl. Now in Phalcon 3.2.0 you can switch your `*\Apc` classes to `*\Apcu` and remove `apcu_bc`. Keep in mind that in Phalcon 4 we will most likely remove all `*\Apc` classes.
  
#### Added `Phalcon\Mvc\Model\Manager::setModelPrefix` and `Phalcon\Mvc\Model\Manager::getModelPrefix` to introduce tables prefixes [#10328](https://github.com/phalcon/cphalcon/issues/10328)
If you want all your tables to have certain prefix and without setting source in all models you can use `Phalcon\Mvc\Model\Manager::setModelPrefix`:
  
```php
<?php

use Phalcon\Mvc\Model\Manager;
use Phalcon\Mvc\Model;

class Robots extends Model
{

}

$manager = new Manager();
$manager->setModelPrefix('wp_');
$robots = new Robots(null, null, $manager);
echo $robots->getSource(); // will return wp_robots
```
  
#### Added way to disable setters in `Phalcon\Mvc\Model::assign` by using `Phalcon\Mvc\Model::setup` or ini option
`Phalcon\Mvc\Model::assign`(which is used also when creating/updating/saving model) is always using setters if they exist when have data argument passed, even when it's not needed or not necessary. It can add not needed overhead to your application. From now you can change this behavior by adding `phalcon.orm.disable_assign_setters = 1` to your ini file, it will just simply use `this->property = value` from now on. From Phalcon 4 we will set it to be default behavior.
  
#### Added `dispatcher::beforeForward` event to allow forwarding request to the separated module [#121](https://github.com/phalcon/cphalcon/issues/121), [#12417](https://github.com/phalcon/cphalcon/issues/12417)
With new event you can change module where to forward in easy and clean way:

```php
<?php

use Phalcon\Di;
use Phalcon\Events\Manager;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Events\Event;

$di = new Di();

$modules = [
  'backend' => [
      'className' => 'App\Backend\Bootstrap',
      'path'      => '/app/Modules/Backend/Bootstrap.php',
      'metadata'  => [
          'controllersNamespace' => 'App\Backend\Controllers',
      ],
  ],
];

$manager = new Manager();

$manager->attach(
  'dispatch:beforeForward',
  function (Event $event, Dispatcher $dispatcher, array $forward) use ($modules) {
      $metadata = $modules[$forward['module']]['metadata'];
      $dispatcher->setModuleName($forward['module']);
      $dispatcher->setNamespaceName($metadata['controllersNamespace']);
  }
);

$dispatcher = new Dispatcher();
$dispatcher->setDI($di);
$dispatcher->setEventsManager($manager);
$di->set('dispatcher', $dispatcher);
$dispatcher->forward(
  [
      'module'     => 'backend',
      'controller' => 'posts',
      'action'     => 'index',
  ]
);

echo $dispatcher->getModuleName(); // will display properly 'backend'
```

<h5 class="alert alert-info">
Credit to [Wojciech Ślawski](https://github.com/jurigag) for the article
</h5>
