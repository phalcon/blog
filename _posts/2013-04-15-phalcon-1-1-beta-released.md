---
layout: post
title: "Phalcon 1.1 beta released!"
tags: [php, phalcon, "1.1", release, "1.x"]
---

After ​our successful 1.0 release, we continue improving Phalcon ​with our latest release 1.1.0 (beta). In this article, we're highlighting the most important features introduced:

<!--more-->
### QueryBuilder Paginator
In addition to the [ModelResultset](https://docs.phalconphp.com/latest/en/pagination.html) and [NativeArray](https://docs.phalconphp.com/latest/en/pagination.html) paginator, this version introduces the QueryBuilder paginator which uses a SQL `LIMIT`/`OFFSET` clause to obtain the requested results. This paginator is suitable to handle ​large datasets.

```php
use Phalcon\Paginator\Adapter\QueryBuilder;

$builder = $this->modelsManager->createBuilder()
        ->columns('id, name')
    ->from('Robots')
    ->orderBy('name');

$paginator = new Paginator(array(
    "builder" => $builder,
    "limit"=> 10,
    "page" => 1
));

$page = $paginator->getPaginate();
```

### Beanstalkd Queuing client
A simple client for the [Beanstalkd](http://kr.github.io/beanstalkd/) queuing server is now available as part of Phalcon:

```php
<?php

// Connect to the queue
$queue = new Phalcon\Queue\Beanstalk(
    [
        'host' => '192.168.0.21'
    ]
);

// Insert the job in the queue (simple)
$queue->put(array('processVideo' => 4871));

// Insert the job in the queue with options
$queue->put(
    [
        'processVideo' => 4871
    ],
    [
        'priority' => 250,
        'delay'    => 10,
        'ttr'      => 3600,
    ]
);

while (($job = $queue->peekReady()) !== false) {

    $message = $job->getBody();

    var_dump($message);

    $job->delete();
}
```

### Encryption
This version includes a simple class to encrypt/decrypt data based on the PHP's [mcrypt](http://php.net/manual/en/book.mcrypt.php) library.

```php
// Create an instance
$encryption = new Phalcon\Crypt();

$key  = 'le password';
$text = 'This is a secret text';

$encrypted = $encryption->encrypt($text, $key);

echo $encryption->decrypt($encrypted, $key);
```

### Assets Management
This component eases the task of adding static resources such as CSS scripts and Javascript libraries to then output them in the views:

```php
// Add some local CSS resources
$this->assets
     ->addCss('css/style.css')
     ->addCss('css/index.css');

// and some local javascript resources
$this->assets
     ->addJs('js/jquery.js')
     ->addJs('js/bootstrap.min.js');
```

Then in the view:

```php
<html>
    <head>
        <title>Some amazing website</title>
        <?php $this->assets->outputCss() ?>
    </head>
    <body>

        <!-- ... -->

        <?php $this->assets->outputJs() ?>
    </body>
</html>
```

### Exception mode in ORM Validations
By default, when some of the validators in a creating/updating process fails, the methods `save()`/`create()`/`update()` return ​​a boolean value​stating the success ​or failure ​of this operation. Now, you can change this behavior to use exceptions:

```php
use Phalcon\Mvc\Model\ValidationFailed;

try {

    $robot = new Robots();
    $robot->name = 'Bender';
    $robot->save();

} catch (ValidationFailed $e) {
    echo 'Reason: ', $e->getMessage();
}
```

### Hostname routing
`Phalcon\Mvc\Router` now accepts hostname restrictions on their routes

```php
$router = new Phalcon\Mvc\Router();

$router->addGet(
    '/api/robots', 
    [
        'module'     => 'api',
        'controller' => 'robots',
        'action'     => 'index'
    ]
)->setHostName('api.phalconphp.com');
```

Or use a group:

```php
$group = new Phalcon\Mvc\Router();

$group->setHostName('api.phalconphp.com');

$groop->addGet(
    '/api/robots', 
    [
        'module'     => 'api',
        'controller' => 'robots',
        'action'     => 'index',
    ]
);

$groop->addGet(
    '/api/robots/{id}', 
    [
        'module'     => 'api',
        'controller' => 'robots',
        'action'     => 'show',
    ]
);

$router->mount($group);
```

### Use Controllers in `Mvc\Micro`

To organize better micro applications, now you can set up classes as controllers

```php
$collection = new Phalcon\Mvc\Micro\Collection();

// Use direct instantiation
$collection
    ->setPrefix('/posts')
    ->setHandler(new PostsController());

// Lazy instantiation
$collection
    ->setPrefix('/posts')
    ->setHandler('PostsController', true);

$collection->get('/', 'index');

$collection->get('/edit/{id}', 'edit');

$collection->delete('/delete/{id}', 'delete');

$app->mount($collection);
```

1.1.0 includes other minor changes, bug fixes, stability and performance improvements. You can see the complete [CHANGELOG](https://github.com/phalcon/cphalcon/blob/1.1.0/CHANGELOG) here. Check the [documentation](https://docs.phalconphp.com/en/1.1.0/) for this version

### Help with Testing
This version can be installed from the 1.1.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 1.1.0
sudo ./install
```

Windows users can download a DLL from the [download page](https://phalconphp.com/download).

We welcome your comments regarding this new release in [Phosphorum](https://forum.phalconphp.com) and [Stack Overflow](http://stackoverflow.com/questions/tagged/phalcon). If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on [Github](http://github.com/phalcon/cphalcon/).

Thanks!


<3 The Phalcon Team
