Phalcon 2.1.0 beta 1 released
=============================

We're excited to announce the first beta release of Phalcon 2.1.
New 2.1.x series are designed to be supported for a longer than normal period
and therefore it's marked as our first Long Term Support [LTS](https://en.wikipedia.org/wiki/Long-term_support) release.

In Phalcon 2.0.x many features and bug fixes were included but mostly keeping backwards compatibility with Phalcon 1.3.x encouraging developers to update to this latest version. Phalcon 2.1 introduces new features some of them
incompatible with previous released versions.

Deprecation for PHP 5.3
-----------------------
Phalcon 2.0.x is the latest series of releases supporting PHP 5.3 (>= 5.3.21).
Because of this, in the past, we weren't in the ability to include some features in Phalcon.
We encourage you to upgrade to at least PHP 5.4 in order to use Phalcon 2.1.
While support for PHP 7 is on its way, the recommended version is PHP 5.6.

Phalcon\Mvc\Model\Validation is now deprecated
----------------------------------------------
[Phalcon\Mvc\Model\Validation](https://docs.phalconphp.com/en/latest/reference/models.html#validating-data-integrity) is now deprecated in favor of [Phalcon\\Validation](https://docs.phalconphp.com/en/latest/reference/validation.html).
We expect to merge the functionality duplicated between both components improving
the understanding of the validation system in Phalcon applications.

Previously validations were implemented as follows:

```php
<?php

namespace Invo\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;
use Phalcon\Mvc\Model\Validator\Uniqueness as UniquenessValidator;

class Users extends Model
{
    public function validation()
    {
        $this->validate(new EmailValidator(array(
            'field' => 'email'
        )));

        $this->validate(new UniquenessValidator(array(
            'field' => 'username',
            'message' => 'Sorry, That username is already taken'
        )));

        if ($this->validationHasFailed() == true) {
            return false;
        }
    }
}
```

Employing [Phalcon\\Validation](https://docs.phalconphp.com/en/latest/reference/validation.html), it must be changed to:

```php
<?php

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

        $validator->add('email', new EmailValidator());

        $validator->add('username', new UniquenessValidator(array(
            'message' => 'Sorry, That username is already taken'
        ));

        return $this->validate();
    }
}
```

Changed constructor of Phalcon\\Mvc\\Model
------------------------------------------
Constructor of models has been changed to allow you pass an array of initialization data:

```php
$customer = new Customer([
    'name'   => 'Peter',
    'status' => 'Active'
]);
```

Using this method is the same as calling assing(), any setter available will be used
and will fallback to property assignment.


Phalcon\\Mvc\\View supports many views directories
--------------------------------------------------
If you are using the hierarchical view component, now you can place your views at several
directories. This is specially useful to reuse views and layouts between more than one
module:

```php
use Phalcon\Mvc\View;

// ...

$di->set('view', function () {

	$view = new View();

	$view->setViewsDir([
        '/var/www/htdocs/blog/modules/backend/views/',
        '/var/www/htdocs/blog/common/views/',
    ]);

	return $view;
});
```

Phalcon\\Mvc\\View now supports absolute paths
----------------------------------------------
An absolute path can now be used to Mvc\View::setLayoutsDir and Mvc\View::setPartialsDir.
This allow you to use directories outside the main views directory:

```php
use Phalcon\Mvc\View;

// ...

$di->set('view', function () {

	$view = new View();

	$view->setViewsDir('/var/www/htdocs/blog/modules/backend/views/');

    $view->setLayoutsDir('/var/www/htdocs/common/views/layouts/');

	return $view;
});
```

Phalcon\\Di is now bound to services closures
--------------------------------------------
This allows to use Phalcon\\Di as $this and access services within closure definitions.
Before this functionality you have to do something like:

```php
use Phalcon\Mvc\Dispatcher;

// ...

$di->set('dispatcher', function () use ($di) {

	$eventsManager = $di->getEventsManager();

	$eventsManager->attach('dispatch:beforeException', new NotFoundPlugin);

	$dispatcher = new Dispatcher;
	$dispatcher->setEventsManager($eventsManager);
	return $dispatcher;
});
```

Now you can access services without passing $di:

```php
use Phalcon\Mvc\Dispatcher;

// ...

$di->set('dispatcher', function () {

	$eventsManager = $this->getEventsManager();

	$eventsManager->attach('dispatch:beforeException', new NotFoundPlugin);

	$dispatcher = new Dispatcher;
	$dispatcher->setEventsManager($eventsManager);
	return $dispatcher;
});
```

Service resolve overriding
--------------------------
If an object is returned after firing the event beforeServiceResolve in Phalcon\\Di,
this returned instance overrides the default service localization process.
The following example shows how to override the creation of the service 'response'
from a custom plugin:

```php
use Phalcon\Http\Response;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Events\Manager;
use MyApp\Plugins\ResponseResolverInterceptor;

$di = new Phalcon\Di;

$eventsManager = new EventsManager;

// Intercept service creation
$eventsManager->attach('di', new ResponseResolverInterceptor);

$di->set('response', Response::class);

$di->setInternalEventsManager($eventsManager);

```

The plugin can now intercept the creation of services:

```php
namespace MyApp\Plugins;

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
Sometimes the view must be disabled by calling $this->view->disable() within an action
in order to avoid the view to process any view. Now this is easier by simply returning 'false':

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
Return a string from an action takes it as the body of the response (same as `return $this->response->setContent('Hello world')``).

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

This feature is specially handy if `Phalcon\Mvc\View\Simple` is used instead of
`Phalcon\Mvc\View`:

```php
use Phalcon\Mvc\Controller;

class Session extends Controller
{
    public function welcomeAction($name)
    {
        return $this->view->render('welcome/index', [
            'name' => $name
        ]);
    }
}
```

This feature is also available in Mvc\\Micro handlers:

```php
use Phalcon\Mvc\Micro;

$app = new Phalcon\Mvc\Micro();

// ...

$app->get('/hello/{name}', function() {
    return $this->view->render('hello', [
        'name' => $name
    ]);
});
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
