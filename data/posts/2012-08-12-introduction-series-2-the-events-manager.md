## Introduction Series 2: The Events Manager

In addition to the dependency injection component seen in the [previous post](/post/introduction-series-1-phalcons-dependency) of the introduction series, a new component makes its appearance in Phalcon 0.5: the Events Manager. Its purpose is to intercept the execution of most of the components of the framework by creating "hook points". These hook points allow the developer to obtain status information, manipulate data or change the flow of execution during the process of a component.

In the following example, we use the EventManager to listen for events produced in a MySQL connection managed by `Phalcon\Db`. First of all, we need a listener object to do this. We create a class which methods are the events we want to listen:

```php
class MyDbListener 
{
    public function afterConnect()
    {

    }
    
    public function beforeQuery()
    {

    }

    public function afterQuery()
    {

    }
}
```

This new class can be as verbose as we need it to. The EventManager will interface between the component and our listener class, offering hook points based on the methods we defined in our listener class.:

```php
$eventsManager = new \Phalcon\Events\Manager();

// Create a database listener
$dbListener = new MyDbListener()

// Listen all the database events
$eventsManager->attach('db', $dbListener);

$connection = new \Phalcon\Db\Adapter\Pdo\Mysql(
    [
        "host"     => "localhost",
        "username" => "root",
        "password" => "secret",
        "dbname"   => "invo",
    ]
);

// Assign the eventsManager to the db adapter instance
$connection->setEventsManager($eventsManager);

// Send a SQL command to the database server
$connection->query("SELECT * FROM products p WHERE p.status = 1");
```

In order to log all the SQL statements executed by our application, we need to use the event `afterQuery`. The first parameter passed to the event listener contains contextual information about the event that is running, the second is the connection itself.

```php
class MyDbListener 
{
    protected $_logger;

    public function __construct()
    {
        $this->_logger = new \Phalcon\Logger\Adapter\File("../apps/logs/db.log");
    }    

    public function afterQuery($event, $connection)
    {
        $this->_logger->log($connection->getSQLStatement(), \Phalcon\Logger::INFO);
    }
}
```

As part of this example, we will also implement the `Phalcon\Db\Profiler` to detect the SQL statements that are taking longer to execute than expected:

```php
class MyDbListener 
{
    protected $_profiler;

    protected $_logger;

    public function __construct()
    {
        $this->_profiler = new \Phalcon\Db\Profiler();
        $this->_logger = new \Phalcon\Logger\Adapter\File("../apps/logs/db.log");        
    }

    public function beforeQuery($event, $connection)
    {
        $this->_profiler->startProfile($connection->getSQLStatement());
    }

    public function afterQuery($event, $connection)
    {
        $this->_logger->log($connection->getSQLStatement(), \Phalcon\Logger::INFO);
        $this->_profiler->stopProfile();
    }

    public function getProfiler()
    {
        return $this->_profiler;
    }

}
```

The resulting profile data can be obtained from the listener:

```php
// Send a SQL command to the database server
$connection->query("SELECT * FROM products p WHERE p.status = 1");

foreach ($dbListener->getProfiler()->getProfiles() as $profile) {
    echo "SQL Statement: ", $profile->getSQLStatement(), "\n";
    echo "Start Time: ", $profile->getInitialTime(), "\n";
    echo "Final Time: ", $profile->getFinalTime(), "\n";
    echo "Total Elapsed Time: ", $profile->getTotalElapsedSeconds(), "\n";
}
```

In a similar manner we can register an lambda function to perform the task instead of a separate listener class (as seen above):

```php
// Listen all the database events
$eventManager->attach(
    'db',
    function ($event, $connection) {    
        if ($event->getType() == 'afterQuery') {
            echo $connection->getSQLStatement();
        }
    }
);
```

In the following example, the EventsManager is working with the class loader, allowing us to obtain debugging information regarding the flow of operation:

```php
$eventsManager = new \Phalcon\Events\Manager();

$loader = new \Phalcon\Loader();

$loader->registerNamespaces(
    [
        'Example\Base'    => 'vendor/example/base/',
        'Example\Adapter' => 'vendor/example/adapter/',
        'Example'         => 'vendor/example/',
    ]
);

// Listen all the loader events
$eventsManager->attach(
    'loader',
    function () {
        if ($event->getType() == 'beforeCheckPath') {
            echo $loader->getCheckedPath();
        }
    }
);

$loader->setEventsManager($eventsManager);

$loader->register();
```

**Conclusion**
The new Phalcon Events Manager, offers an easy way to intercept and manipulate, if needed, the normal flow of operation. With the EventsManager the developer can create hooks or plugins that will offer monitoring of data, manipulation, conditional execution and much more.

We made a lot of low-level optimizations in Phalcon, so as to ensure that there is very little if any reduction in performance with the introduction of the `EventsManager`, while at the same time offering an increased extensibility throughout the framework.

<3 Phalcon Team