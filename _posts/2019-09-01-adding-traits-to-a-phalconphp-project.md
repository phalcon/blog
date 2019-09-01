---
layout: post
title: Adding Traits to a PhalconPHP Project
date: 2015-08-03T20:50:00.000Z
tags:
  - phalcon
  - traits
---
PHP is a single inheritance language. This limitation created challenging situations for a lot of PHP developers. Thankfully this limitation was solved in PHP 5.4 with the introduction of traits.

Here is a brief overview on traits.

Traits are a very handy way of reusing code in PHP. This allowed to overcome the single inheritance limitation that PHP had. It enabled developer to reuse methods across several independent classes residing in different class arrangements. Traits reduce complexity, and allows to helps prevent problems that were associated to multiple inheritance and mixins.

Traits are very similar to classes, but are intended to group up functionality in a smooth and uniform way, and they cannot be instantiated on their own. It is an expansion to traditional inheritance and enables a horizontal scaling behavior; as in, utilization of class members without having to require inheritance.

Now, onto what you came here for.

> I like to think that I am organized. I've been told so, but I think that there is always room for improvement. Therefore when adding traits to a project I like to create a `traits` directory under my `app` directory. Placement is not really that important, but I like to keep it clean (for example you could create the traits folder under your library folder). Here is how to looks:

The next step after creating the folder is integrating it into our working environment. Open the `/app/config/config.php` file and add a reference to the directory under `application`.

```php
  return new \Phalcon\Config([
        'siteName'       => getenv('SITE_NAME'),
        'siteUrl'        => 'http://'.getenv('SITE_NAME'),
        'controllersDir' => getenv('BASE_DIR') . 'app/controllers/',
        'modelsDir'      => getenv('BASE_DIR') . 'app/models/',
        'viewsDir'       => getenv('BASE_DIR') . 'app/views/',
        'pluginsDir'     => getenv('BASE_DIR') . 'app/plugins/',
        'libraryDir'     => getenv('BASE_DIR') . 'app/library/',
        'cacheDir'       => getenv('BASE_DIR') . 'app/cache/',
        'traitsDir'      => getenv('BASE_DIR') . 'app/traits/'
        'baseDir'        => getenv('BASE_DIR'),
        'baseUri'        => '/'
    ]
]);
```

Next, open the `/app/config/loader.php` file and add register the namespace reference.

```php
$loader->registerNamespaces(array(
    'Project\Controllers' => $config->application->controllersDir,
    'Project\Traits' => $config->application->traitsDir
));

$loader->register();
```

That's it! Well, aside from actually creating a trait and applying for use. Take this trait for example:

```php
namespace Project\Traits;

trait HttpBehavior
{
    /**
     * Set JSON response for AJAX, API request
     * 
     * @param  string  $content       
     * @param  integer $statusCode    
     * @param  string  $statusMessage
     * 
     * @return \Phalcon\Http\Response                 
     */
    public function jsonResponse($content, $statusCode = 200, $statusMessage = 'OK')
    {
        // Encode content
        $content = json_encode($content);

        // Create a response since it's an ajax
        $response = new \Phalcon\Http\Response();
        $response->setStatusCode($statusCode, $statusMessage);
        $response->setContentType('application/json', 'UTF-8');
        $response->setContent($content);

        return $response;
    }
}
```

Now, to use it just go where you want to include it and invoke it:

```php
namespace Project\Controllers;

class IndexController extends ControllerBase
{
    /**
     * Invoke Traits
     */
    use \Project\Traits\HttpBehavior;

    /**
     * Does something...
     *
     * @param $someVar
     *
     * @return \Phalcon\Http\Response
     */
    public function doSomethingAction($someVar = '')
    {
        // Do this and that and get something to return
        $content = [
            'id' => 1,
            'message' => 'something'
        ];

        // Return reponse
        return $this->jsonResponse($content);
    }
}
```
Very simple and elegant.
