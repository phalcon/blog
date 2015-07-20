Introduction Series 3: Building an MVC application with 0.5.0
=============================================================

The third installment of our blog posts regarding the upcoming 0.5.0 version is about the MVC implementation. Below follows implementation concepts and examples of a MVC application using Phalcon 0.5.0.

As far as the MVC implementation is concerned, our main goal with 0.5.0, was to make it more flexible than ever, giving more control to the developer. Due to this, Phalcon is now able to load simple MVC applications and multi-module ones.

**Autoloaders**
In previous versions of Phalcon, the developer had to assign specific folders for the controllers and the models that are going to be used from other components in the application. This was achieved with directives such as "controllersDir" and "modelsDir" passed in the front controller. This implementation was somewhat restrictive to the developers that wished to introduce different modules or implement complex routes and business logic in their application.

In the 0.5.0 version, components are able to instantiate the classes and in turn use autoloaders to perform the task of discovering and loading components from their respective locations. These locations are predefined by the developer in the same manner in which they used to.

The developer could create a simple autoloader as follows:

```php
spl_autoload_register(
    function ($className) {
        $path = "../apps/controllers/".$className.".php";
        if (file_exists($path)) {
            require $path;
            return true;
        }
        $path = "../apps/models/".$className.".php";
        if (file_exists($path)) {
            require $path;
            return true
        }
    }
);
```

The above function simply looks for directories in two classes and if found they will be loaded. This structure allows the developer the freedom to create their own load management class. The framework component `Phalcon\Loader` provides the same functionality as above, and uses low-level optimizations that increases the performance of loading classes and code in PHP.

```php
$loader = new \Phalcon\Loader();    
$loader->registerDirs(
    [
        '../apps/controllers/',
        '../apps/models/'
    ]
)->register();
```

**Services and the IoC container**
The next step in an application development is to register services in the Dependency Injector container. Services are required by the MVC components for proper operation but also for optimization of resources used by the application.

```php
$di = new \Phalcon\DI();

// Registering a router
$di->set(
    'router', 
    function () {
        return new \Phalcon\Mvc\Router();
    }
);

// Registering a dispatcher
$di->set(
    'dispatcher', 
    function () {
        return new \Phalcon\Mvc\Dispatcher();
    }
);

// Registering a Http\Response
$di->set(
    'response', 
    function () {
        return new \Phalcon\Http\Response();
    }
);

// Registering the view component
$di->set(
    'view', 
    function () {
        $view = new \Phalcon\Mvc\View();
        $view->setViewsDir('../apps/views/');
        return $view;
    }
);

// Database connection
$di->set(
    'db',
    function () {
        return new \Phalcon\Db\Adapter\Pdo\Mysql(
            [
                "host"     => "localhost",
                "username" => "root",
                "password" => "secret",
                "dbname"   => "invo",
            ]
        );
    }
);

// Registering the Models-Metadata
$di->set(
    'modelsMetadata',
    function () {
        return new \Phalcon\Mvc\Model\Metadata\Memory();
    }
);

// Registering the Models Manager
$di->set(
    'modelsManager',
    function () {
        return new \Phalcon\Mvc\Model\Manager();
    }
);
```

The `Phalcon\Di` offers many ways of registering services as seen in our previous [blog post](/post/introduction-series-1-phalcons-dependency). In the example above we chose to use lambda functions to perform the task of registering the components in the Di container. These lambda functions are executed only when a component requires the relevant service from the container. This offers great resource management for the application since the services load the respective objects in a lazy load manner.

In addition to the above, this allows the developer to replace any component in the container by a third party one or a custom built one, that would perform the task better - based on the requirements of the application.

Due to the fact that most components have preset defaults, there is no need to set many options to be able to use them in this example.

Running the request In 0.5.0 we are introducing a new component, the `Phalcon\Mvc\Application`. This component provides the initialization of the various MVC components so that the developer does not have to do it manually.

```php
try {
    
    $application = new Phalcon\Mvc\Application();
    echo $application->handle->getContent();

} catch (\Phalcon\Exception $e) {
    echo $e->getMessage();
}
```

**Controllers - Models - Views**
*Creating a controller:*
Let's create a controller. As before, we only need to create a class with the suffix `Controller` in a location where the autoloader can discover it.

```php
// ../apps/controllers/ProductsController.php
class ProductsController extends \Phalcon\Mvc\Controller
{
    public function showAction()
    {
           
    }
} 
```

As you can see, very little has changed from the previous version. `Phalcon\Controller` has been moved to the `Phalcon\Mvc` namespace, as did all components relating to MVC.

*Creating a model:*
```php
// ../apps/models/Products.php
class Products extends \Phalcon\Mvc\Model
{

}
```

*Passing data to the view:*
```php
public function showAction()
{
    $this->view->setVar("product", Products::findFirst());          
}
```

As you can see, the syntax is the same as the previous version. However, a lot has changed in the underlying MVC implementation by Phalcon. Specifically:

- The `Phalcon\Mvc\View` component was injected from `Phalcon\DI` in the controller attribute "view"
- The Products class does not exist but it was loaded using the previously defined autoloader.
- Internally the findFirst method requires the model manager, metadata and database connection services (previously defined in the Di container).
- The first product stored in the related table "products" is passed to the view as `$product`

All this work is performed transparently so that the developer does not have to worry about it, and of course in the same high performance manner as before.

Finally, echoing results to the user:

```php
<!-- ../apps/views/products/show.phtml -->

<?php echo $product->name; ?>
```

All this happens when browsing to `http://localhost/my-app/products/show`

**Examples**
To complete this example, we have published a series of MVC examples on [Github](https://github.com/phalcon/mvc/) like the one used in this article. Each example uses a different implementation of MVC:

- **Simple**: This example shows how to implement a very basic MVC structure similar to 0.4.x.
- **Single**: This example shows how to implement a MVC structure with a single-module.
- **Single-NS**: This example shows how to implement a MVC structure with a single-module. We use the namespace directive to better organize the application, as well as having a more efficient way of loading required classes.
- **Multiple**: This a multi-module MVC structure. There are two modules that coexist in a single directory and can easily share resources between them.
- **Simple-waap**: This makes a MVC integration without the use of `Phalcon\Mvc\Application` explaining how the different MVC components interact amongst them.

Once the release is final, Phalcon Developer Tools will be updated to generate each of these file structures.

Conclusion The new MVC components offer greater flexibility and extensibility, giving the developer the ability to organize the application as he/she wishes. Thanks to its implementation with low-level optimizations, Phalcon allows developers to build high performance MVC applications in PHP.

<3 Phalcon Team