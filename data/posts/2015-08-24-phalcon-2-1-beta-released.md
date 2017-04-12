We're excited to announce the first beta release of **Phalcon 2.1**!

The 2.1.x series are going to be supported for a much longer period than previous versions, thus it is marked as our first Long Term Support [LTS](https://en.wikipedia.org/wiki/Long-term_support) release!

In the Phalcon 2.0.x series, we introduced a lot of new features as well as bug fixes. Our focus however has always been to keep backwards compatibility with Phalcon 1.3.x series, while at the same time encourage developers to upgrade to 2.0.x. This allowed ample time for developers to adjust their applications to work with the 2.0.x series.

Phalcon 2.1 introduces new features some of them incompatible with previous released versions, so make sure you test your application before upgrading a production system.

We are confident that the changes in this release warrant the upgrade :)

Deprecation for PHP 5.3
-----------------------
Phalcon 2.0.x is the latest series of releases supporting PHP 5.3 (>= 5.3.21). Due to this constraint, we were unable to include some performance enhancements to the framework.

From 2.1.x onwards we are deprecating support for PHP 5.3. We highly encourage developers to upgrade their installations to 5.6, since PHP 7 is just around the corner. We are working on PHP 7 support for Phalcon, but in the meantime the recommended PHP version with Phalcon is 5.6.

`Phalcon\Mvc\Model\Validation` is now deprecated
------------------------------------------------
[Phalcon\Mvc\Model\Validation](https://docs.phalconphp.com/en/latest/reference/models.html#validating-data-integrity) is now deprecated in favor of [Phalcon\Validation](https://docs.phalconphp.com/en/latest/reference/validation.html). The functionality of both components is merged into one, allowing us to reduce the codebase while offering the same functionality as before.

Previously validations were implemented as follows:

```php
namespace Invo\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;
use Phalcon\Mvc\Model\Validator\Uniqueness as UniquenessValidator;

class Users extends Model
{
    public function validation()
    {
        $this->validate(
            new EmailValidator(
                [
                    'field' => 'email',
                ]
            )
        );

        $this->validate(
            new UniquenessValidator(
                [
                    'field'   => 'username',
                    'message' => 'Sorry, That username is already taken',
                ]
            )
        );

        if ($this->validationHasFailed() == true) {
            return false;
        }
    }
}
```

Introducing [Phalcon\Validation](https://docs.phalconphp.com/en/latest/reference/validation.html), you will need to change the above to:

```php
namespace Invo\Models;

use Phalcon\Mvc\Model;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Email as EmailValidator;
use Phalcon\Validation\Validator\Uniqueness as UniquenessValidator;

class Users extends Model
{
    public function validation()
    {
        $validator = new Validation();

        $validator->add(
            'email', //your field name
            new EmailValidator([
                'model' => $this,
                "message" => 'Please enter a correct email address'
            ])
        );

        $validator->add(
            'username',
            new UniquenessValidator([
                'model' => $this,
                'message' => 'Sorry, That username is already taken',
            ])
        );

        return $this->validate($validator);
    }
}
```

You will agree that this change makes the code much smaller and easier to read.

Changed the constructor of `Phalcon\Mvc\Model`
----------------------------------------------
The constructor of model classes has been changed, to allow you to pass an array of initialization data:

```php
$customer = new Customer(
    [
        'name'   => 'Peter',
        'status' => 'Active',
    ]
);
```

Using this method is the same as calling `assign()`, any setter available will be used and will fallback to property assignment.


`Phalcon\Mvc\View` supports many views directories
--------------------------------------------------
This has been one of the features that our community requested many times in the past. We are happy to announce that you can use any kind of folder hierarchy with your application for your view files. This is specially useful for reusing views and layouts between modules:

```php
use Phalcon\Mvc\View;

// ...

$di->set(
    'view',
    function () {

        $view = new View();

        $view->setViewsDir(
            [
                '/var/www/htdocs/blog/modules/backend/views/',
                '/var/www/htdocs/blog/common/views/',
            ]
        );

        return $view;
    }
);
```

`Phalcon\Mvc\View` now supports absolute paths
----------------------------------------------
An absolute path can now be used on `Mvc\View::setLayoutsDir` and `Mvc\View::setPartialsDir`. This allows the use of folders outside the main views folder:

```php
use Phalcon\Mvc\View;

// ...

$di->set(
    'view',
    function () {

        $view = new View();

        $view->setViewsDir(
            [
                '/var/www/htdocs/blog/modules/backend/views/',
                '/var/www/htdocs/blog/common/views/',
            ]
        );

        $view->setLayoutsDir(
            '/var/www/htdocs/common/views/layouts/'
        );

        return $view;
    }
);
```

`Phalcon\Di` is now bound to services closures
----------------------------------------------
In the past, we had to pass the dependency injector inside a service closure, if we had to perform some actions inside the closure. Examples of that were accessing the configuration object or the events manager. Now we can use `$this` to access the `Phalcon\Di` along with the registered services.

Code before:

```php
use Phalcon\Mvc\Dispatcher;

// ...

$di->set(
    'dispatcher',
     function () use ($di) {
        $eventsManager = $di->getEventsManager();

        $eventsManager->attach(
            'dispatch:beforeException',
            new NotFoundPlugin()
        );

        $dispatcher = new Dispatcher;
        $dispatcher->setEventsManager($eventsManager);

        return $dispatcher;
    }
);
```

Now you can access services without passing `$di`:

```php
use Phalcon\Mvc\Dispatcher;

// ...

$di->set(
    'dispatcher',
    function () {
        $eventsManager = $this->getEventsManager();

        $eventsManager->attach(
            'dispatch:beforeException',
            new NotFoundPlugin()
            );

        $dispatcher = new Dispatcher;
        $dispatcher->setEventsManager($eventsManager);
        return $dispatcher;
    }
);
```

Service Resolve overriding
--------------------------
If an object is returned after firing the event `beforeServiceResolve` in `Phalcon\Di`, the returned instance overrides the default service localization process.

The following example shows how to override the creation of the service `response` from a custom plugin:

```php
use Phalcon\Di;
use Phalcon\Http\Response;
use Phalcon\Events\Manager;

use MyApp\Plugins\ResponseResolverInterceptor;

$di = new Di();

$eventsManager = new EventsManager;

// Intercept service creation
$eventsManager->attach(
    'di',
    new ResponseResolverInterceptor()
);

$di->set('response', Response::class);

$di->setInternalEventsManager($eventsManager);

```

The plugin can now intercept the creation of services:

```php
namespace MyApp\Plugins;

use Phalcon\Http\Response;

class ResponseResolverInterceptor
{
    private $cache = false;

    public function beforeServiceResolve($event, $di, $parameters)
    {
        // Intercept creation of responses
        if ($parameters['name'] == 'response' && $this->cache == false) {
            $response = new Response();
            $response->setHeader('Cache-Control', 'no-cache, must-revalidate');

            return $response;
        }
    }
}
```

Disabling the view from an action
---------------------------------
Sometimes the view must be disabled by calling `$this->view->disable()` within an action in order to avoid the `Phalcon\Mvc\View` component to process the relevant view(s).

Now this much easier; simply return `false`:

```php
use Phalcon\Mvc\Controller;

class Api extends Controller
{
    public function loginAction()
    {
        if ($this->safeApp->isBanned()) {
            $this->response->setStatusCode(401, "Unauthorized");
            return false;
        }

        // ...
    }
}
```

Returning a string makes it the body of the response
----------------------------------------------------
Return a string from an action takes it as the body of the response:
(same as `return $this->response->setContent('Hello world')`)

```php
use Phalcon\Mvc\Controller;

class Session extends Controller
{
    public function welcomeAction()
    {
        return '<h1>Hello world!</h1>';
    }
}
```

This feature is specially handy if `Phalcon\Mvc\View\Simple` is used instead of `Phalcon\Mvc\View`:

```php
use Phalcon\Mvc\Controller;

class Session extends Controller
{
    public function welcomeAction($name)
    {
        return $this->view->render(
            'welcome/index',
            [
                'name' => $name,
            ]
        );
    }
}
```

This feature is also available in `Mvc\Micro` handlers:

```php
use Phalcon\Mvc\Micro;

$app = new Micro();

// ...

$app->get(
    '/hello/{name}',
    function () {
        return $this->view->render(
            'hello',
            [
                'name' => $name,
            ]
        );
    }
);
```

Override dispatcher+view behavior in routes
-------------------------------------------
Routes now can have an associated callback that can override the default dispatcher + view behavior:

```php
// Make a redirection if the /help route is matched
$router->add('/help', [])->match(function () {
    return $this->getResponse()->redirect('https://support.google.com/');
});

// Return a string directly from the route
$router->add('/', [])->match(function () {
    return '<h1>It works</h1>';
});
```

See the full [CHANGELOG](https://github.com/phalcon/cphalcon/blob/2.1.x/CHANGELOG.md#210-2015-xx-xx) for Phalcon 2.1.

### Help with Testing

This version can be installed from the 2.1.x branch. If you don't have Zephir installed follow these instructions:

```sh
git clone https://github.com/phalcon/cphalcon
git checkout 2.1.x
cd cphalcon/ext
sudo ./install
```

If you have Zephir installed:

```sh
git clone https://github.com/phalcon/cphalcon
cd cphalcon/
git checkout 2.1.x
zephir build
```

We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on [Phosphorum](https://forum.phalconphp.com/).

<3 Phalcon Team
