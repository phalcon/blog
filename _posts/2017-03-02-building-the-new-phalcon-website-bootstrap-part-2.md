---
layout: post
title: "Building the new Phalcon Website - Bootstrap (Part 2)"
tags: [php, phalcon, "3.0.x", phalcon3, implementation, website, series]
---

This post is part of a series. [Part 1](/post/building-the-new-phalcon-website-implementation-part-1) - [Part 2](/post/building-the-new-phalcon-website-bootstrap-part-2) - [Part 3](/post/building-the-new-phalcon-website-middleware-part-3)

Continuing with our series, we will now discuss the bootstrapping process in depth.

<!--more-->
### Bootstrap process
The call stack is as follows:

```php
$this->initOptions();
$this->initDi();
$this->initLoader();
$this->initRegistry();
$this->initEnvironment();
$this->initApplication();
$this->initUtils();
$this->initConfig();
$this->initDispatcher();
$this->initCache();
$this->initLogger();
$this->initLocale();
$this->>initErrorHandler();
$this->initRoutes();
$this->initView();
$this->initAssets();

return $this->runApplication();
```

#### `initOptions()`
Our bootstrap process starts by calling the `initOptions()` method. For the main application, this method is empty. However the CLI application requires some options to be set because we need to process the parameters passed using the command line.

```php
protected function initOptions()
{
    $arguments = [];
    if (true === isset($_SERVER['argv'])) {
        foreach ($_SERVER['argv'] as $index => $argument) {
            switch ($index) {
                case 1:
                    $arguments['task'] = $argument;
                    break;
                case 2:
                    $arguments['action'] = $argument;
                    break;
                case 3:
                    $arguments['params'] = $argument;
                    break;
            }
        }
    }

    $this->options = $arguments;
}
```
We are using the `$_SERVER` array to access the passed variables. We could have also used `func_get_args()` to achieve the same result. The reason we are not using the `Phalcon\Http\Request` object and the `hasServer()`/`getServer()` methods is because the DI container has not been initialized yet. 

#### `initDi()`
We initialize the DI container and set it as a default. It is also stored in a private variable so that it can be passed in the application later on, but also to access relevant services if necessary.

#### `initLoader()`
Our application uses several packages such as [Dotenv](https://github.com/vlucas/phpdotenv), [CLI Progress Bar](https://github.com/dariuszp/cli-progress-bar) and [Guzzle](http://docs.guzzlephp.org/en/stable/). To ensure that those packages are available in our application, we use the composer autoloader. 

```php
protected function initLoader()
{
    require_once APP_PATH . '/vendor/autoload.php';
}
```

In other implementations, we could initialize the `Phalcon\Loader` to load the files that our application uses. However for this implementation, we decided to use only one loader (the composer autoloader) for the whole application.
 
To achieve this, we changed the `composer.json` file so that the composer autoloader understands our namespaces.
 
```json
"autoload": {
  "psr-4": {
    "Website\\": "app/library/",
    "Website\\Cli\\Tasks\\": "app/tasks/",
    "Website\\Controllers\\": "app/controllers/",
    "Website\\Middleware\\": "app/library/Middleware/"
  }
}
```

We also issued the following command when installing composer packages to ensure that we can get the most out of our autoloader.

```bash
composer install --optimize-autoloader
```

#### `initRegistry()`
We use the `Phalcon\Registry` as a storage of information that can be used throughout the request process. For instance we store the actual `view` file name that needs to be rendered. How we render views will be discussed later on when we will discuss [Middleware](https://docs.phalconphp.com/latest/en/micro#middleware-events).

```php
protected function initRegistry()
{
    $registry = new PhRegistry();
    $registry->contributors  = [];             // The contributors array (main page/about)
    $registry->executionTime = 0;              // Execution time (profiling)
    $registry->language      = 'en';           // Current language requested
    $registry->imageLanguage = 'en';           // Image on the language selector (dropdown)
    $registry->memory        = 0;              // Memory usage (profiling)
    $registry->menuLanguages = [];             // The available languages menu (dropdown)
    $registry->noindex       = false;          // Whether this page is to be indexed or not
    $registry->slug          = '';             // The slug requested (url)
    $registry->releases      = [];             // The releases array (download windows)
    $registry->version       = '3.0.0';        // The current version
    $registry->view          = 'index/index';  // The view name to be rendered

    $this->diContainer->setShared('registry', $registry);
}
```

#### `initEnvironment()`
We set up some variables that can be used for profiling in the registry. Additionally we call the `Dotenv()->load()` function to read the `.env` file which is specific to our installation. 

```php
/**
 * Initializes the environment
 */
protected function initEnvironment()
{
    /** @var \Phalcon\Registry $registry */
    $registry                = $this->diContainer->getShared('registry');
    $registry->memory        = memory_get_usage();
    $registry->executionTime = microtime(true);

    (new Dotenv(APP_PATH))->load();
}
```
Again, similar to our `index.php` we do not use a variable to instantiate the `Dotenv` object.

#### `initApplication()`
For our main application, the `$application` variable is set to an object of `Phalcon\Mvc\Micro`.

```php
protected function initApplication()
{
    $this->application = new PhMicro($this->diContainer);
}
```

For the CLI application we return a different application object: `Phalcon\Cli\Console`

```php
protected function initApplication()
{
    $this->application = new PhCliConsole($this->diContainer);
    $this->diContainer->setShared('console', $this->application);
}
```

#### `initUtils()`
The `Utils` class contains helper methods for our application.

```php
protected function initUtils()
{
    $this->diContainer->setShared('utils', new Utils());
}
```

* `fetch()` Returns the element of an array or an object or the default value if not set
* `getDocsUrl($lang)` Returns the docs language
* `getCdnUrl($resource = '')` Returns the asset with/without the CDN URL
* `isCdnLocal()` If this is a CDN resource or a local one
* `timeToHuman($microseconds, $precision = 3)` Profiling - time to human readable time
* `bytesToHuman` Profiling - bytes to human readable bytes

#### `initConfig()`
We now load the configuration file, which contains elements populated by `getenv` calls. Those have been set earlier using the `Dotenv` library.

```php
protected function initConfig()
{
    $fileName = APP_PATH . '/app/config/config.php';
    if (true !== file_exists($fileName)) {
        throw new Exception('Configuration file not found');
    }

    $configArray = require_once($fileName);
    $config = new PhConfig($configArray);

    $this->diContainer->setShared('config', $config);
}
```

The configuration file contains also information about the routes of our application, middleware class stack, available languages, sitemap generation pages as well as logger, cache and other initialization variables.

It can be found in `app/config/config.php` and it looks like this:

```php
    ...
    'app'           => [
        'version'         => '3.0.3',
        'timezone'        => getenv('APP_TIMEZONE'),
        'debug'           => getenv('APP_DEBUG'),
        'env'             => getenv('APP_ENV'),
        ...
    ],
    'cache'         => [
        'driver'          => getenv('CACHE_DRIVER'),
        'viewDriver'      => getenv('VIEW_CACHE_DRIVER'),
        'prefix'          => getenv('CACHE_PREFIX'),
        'lifetime'        => getenv('CACHE_LIFETIME'),
    ],
    ...
```

#### `initDispatcher()`
For our main application, the class is empty, since `Phalcon\Mvc\Micro` applications do not have a dispatcher.

The CLI application though requires a dispatcher, so we set one there:

```php
protected function initDispatcher()
{
    $dispatcher = new PhCliDispatcher();
    $dispatcher->setDefaultNamespace('Website\Cli\Tasks');

    $this->diContainer->setShared('dispatcher', $dispatcher);
}
```

#### `initCache()`
We now initialize the cache for our main application. We initialize two caches. One for data and one for the view. The CLI application overrides this function and is empty, since the CLI application does not require a cache service.

More about the `viewCache` later on when we explore [Middleware](https://docs.phalconphp.com/latest/en/micro#middleware-events).

```php
protected function initCache()
{
    /**
     * viewCache
     */
    /** @var \Phalcon\Config $config */
    $config   = $this->diContainer->getShared('config');
    $lifetime = $config->get('cache')->get('lifetime', 3600);
    $driver   = $config->get('cache')->get('viewDriver', 'file');
    $frontEnd = new PhCacheFrontOutput(['lifetime' => $lifetime]);
    $backEnd  = ['cacheDir' => APP_PATH . '/storage/cache/view/'];
    $class    = sprintf('\Phalcon\Cache\Backend\%s', ucfirst($driver));
    $cache    = new $class($frontEnd, $backEnd);

    $this->diContainer->set('viewCache', $cache);

    /**
     * cacheData
     */
    $driver   = $config->get('cache')->get('driver', 'file');
    $frontEnd = new PhCacheFrontData(['lifetime' => $lifetime]);
    $backEnd  = ['cacheDir' => APP_PATH . '/storage/cache/data/'];
    $class    = sprintf('\Phalcon\Cache\Backend\%s', ucfirst($driver));
    $cache    = new $class($frontEnd, $backEnd);

    $this->diContainer->setShared('cacheData', $cache);
}
```

#### `initLogger()`
We now initialize the logger based on values from the configuration file, which in turn is populated from the `.env` file.

```php
protected function initLogger()
{
    /** @var \Phalcon\Config $config */
    $config   = $this->diContainer->getShared('config');
    $fileName = $config->get('logger')
                       ->get('defaultFilename', 'application');
    $format   = $config->get('logger')
                       ->get('format', '[%date%][%type%] %message%');

    $logFile   = sprintf(
        '%s/storage/logs/%s-%s.log',
        APP_PATH,
        date('Ymd'),
        $fileName
    );
    $formatter = new PhLoggerFormatter($format);
    $logger    = new PhFileLogger($logFile);
    $logger->setFormatter($formatter);

    $this->diContainer->setShared('logger', $logger);
}
```
#### `initLocale()`
We set the default timezone for the application and initialize the `locale` object. 

The `Locale` object is responsible for converting the language strings located in the views to the relevant text. Initially it loads the `en.json` file which contains the strings and text available for the English version of the website. Based on the requested page/language, the new language file is also loaded and merged with the English one. This ensures that English text is always displayed if text is not translated in the requested language.  
 
```php
protected function initLocale()
{
    $config = $this->diContainer->getShared('config');

    date_default_timezone_set($config->get('app')->get('timezone', 'US/Eastern'));

    $this->diContainer->setShared('locale', new Locale());
}
```

All translations are handled by Transifex. 

#### `initErrorHandler()`
We override the default PHP error handler with something we can control. Therefore we set our own error handler that logs all the errors using our logger service. Additionally, we set up our own `register_shutdown_function` so that we can enable the profiler. The profiler is very simple, it utilizes the registry service and calculates the execution time as well as the memory consumption per request. This can be invaluable in your application (only in development mode), allowing you to find areas where your application is not performing at maximum.

```php
protected function initErrorHandler()
{
    $registry = $this->diContainer->getShared('registry');
    $logger   = $this->diContainer->getShared('logger');
    $utils    = $this->diContainer->getShared('utils');
    $mode     = getenv('APP_ENV');
    $mode     = (false !== $mode) ? $mode : 'development';

    ini_set('display_errors', boolval('development' === $mode));
    error_reporting(E_ALL);

    set_error_handler(
        function ($errorNumber, $errorString, $errorFile, $errorLine) use ($logger) {
            if (0 === $errorNumber & 0 === error_reporting()) {
                return;
            }

            $logger->error(
                sprintf(
                    "[%s] [%s] %s - %s",
                    $errorNumber,
                    $errorLine,
                    $errorString,
                    $errorFile
                )
            );
        }
    );

    set_exception_handler(
        function () use ($logger) {
            $logger->error(json_encode(debug_backtrace()));
        }
    );

    register_shutdown_function(
        function () use ($logger, $utils, $registry, $mode) {
            $memory    = memory_get_usage() - $registry->memory;
            $execution = microtime(true) - $registry->executionTime;

            if ('development' === $mode) {
                $logger->info(
                    sprintf(
                        'Shutdown completed [%s] - [%s]',
                        $utils->timeToHuman($execution),
                        $utils->bytesToHuman($memory)
                    )
                );
            }
        }
    );
}
```

#### `initRoutes()`
The routes configuration is located in our `config.php` file (located at `app/config`). This method sets up the routes (including 404) as well as the middleware stack.

Note that this method is overriden and replaced by an empty one for our CLI application, since CLI applications do not use routes.

The configuration array looks something like this:

```php
[
    'class'   => Website\Controllers\DownloadController::class,
    'methods' => [
        'get' => [
            '/download'                                               => 'redirectAction',
            "/download/{slug:({$downloadSlugs})}"                     => 'redirectAction',
            '/{language:[a-z]{2}}/download'                           => 'pageAction',
            "/{language:[a-z]{2}}/download/{slug:({$downloadSlugs})}" => 'pageAction',
        ],
    ],
],
[
    'class'   => Website\Controllers\UtilsController::class,
    'methods' => [
        'get' => [
            '/sitemap'      => 'sitemapAction',
        ],
    ],
],
```

We are registering actual classes as handlers instead of anonymous functions for our Micro application. We use the `::class` suffix to return the actual name of the class for our handler, which avoids typing errors and delays in finding them :) 

The second element of the array contains sub arrays, whose keys are the names of the request methods that our Micro application needs. For our application we only use the `get` request method.
 
That sub array contains the actual route pattern as a key and the method in our class handler that will handle that request.

As you can see with the above example, we are matching a `get` request of `/sitemap` to the `Website\Controllers\UtilsController::class`, method `sitemapAction`.

The code that makes all this happen is in the `initRoutes`.

```php
protected function initRoutes()
{
    /** @var PhConfig $config */
    $config     = $this->diContainer->getShared('config');
    $routes     = $config->get('routes')->toArray();
    $middleware = $config->get('middleware')->toArray();

    foreach ($routes as $route) {
        $collection = new PhMicroCollection();
        $collection->setHandler($route['class'], true);
        if (true !== empty($route['prefix'])) {
            $collection->setPrefix($route['prefix']);
        }

        foreach ($route['methods'] as $verb => $methods) {
            foreach ($methods as $endpoint => $action) {
                $collection->$verb($endpoint, $action);
            }
        }
        $this->application->mount($collection);
    }

    $eventsManager = $this->diContainer->getShared('eventsManager');

    foreach ($middleware as $element) {
        $class = $element['class'];
        $event = $element['event'];
        $eventsManager->attach('micro', new $class());
        $this->application->$event(new $class());
    }

    $this->application->setEventsManager($eventsManager);
}
```

**IMPORTANT**: One of the reasons for this implementation is lazy loading. `Phalcon\Mvc\Micro` allows you to lazy load handlers. This minimizes the resources needed for each request, since only the files needed are interpreted per request. In our implementation we kept the handlers very thin so that only a couple of methods are present per handler, so as to reduce even more the execution time.
 
Lazy loading is achieved by the `setHandler()`'s second parameter in a Micro collection.

```php
$collection->setHandler($route['class'], true);
```

#### `initView()`
A micro application does not render views automatically, nor does it have a view object. For our views we use the `Phalcon\Mvc\View\Simple` component. Setting it up is very easy, it resembles any other view setup. 

Note that this method is overriden and replaced by an empty one for our CLI application, since CLI applications do not use views.

```php
protected function initView()
{
    /** @var \Phalcon\Config $config */
    $config = $this->diContainer->getShared('config');
    $mode   = $config->get('app')->get('env', 'development');

    $view  = new PhViewSimple();
    $view->setViewsDir(APP_PATH . '/app/views/');
    $view->registerEngines(
        [
            '.volt' => function ($view) use ($mode) {
                $volt  = new PhVolt($view, $this->diContainer);
                $volt->setOptions(
                    [
                        'compiledPath'      => APP_PATH . '/storage/cache/volt/',
                        'compiledSeparator' => '_',
                        'compiledExtension' => '.php',
                        'compileAlways'     => boolval('development' === $mode),
                        'stat'              => true,
                    ]
                );

                /**
                 * Register the PHP extension, to be able to use PHP
                 * functions in Volt
                 */

                $volt->getCompiler()->addExtension(new Php());

                return $volt;
            },
        ]
    );

    $this->diContainer->setShared('viewSimple', $view);
}
```

We are setting up Volt as our templating engine. We also ensure that all of our templates are recompiled all the time while in development mode. This is accomplished with the following option (in `setOptions`)

```php
'compileAlways' => boolval('development' === $mode),
```

Additionally we are registering a Volt extension, which allows us to use any PHP function in our Volt templates.

```php
$volt->getCompiler()->addExtension(new Php());
```

The code for the extension is located in `library/View/Engine/Volt/Extensions/Php.php`

#### `initAssets()`
Trying to keep ourselves DRY, we initialize our Asset service with the assets that are common to all pages of the application. 

Again this method is overriden in our CLI application because CLI tasks do not need assets.

```php
protected function initAssets()
{
    /** @var \Website\Utils $utils */
    $utils = $this->diContainer->getShared('utils');

    $assets = new Manager();

    /**
     * Collections
     */
    $assets->collection("header_js");
    $assets
        ->collection('header_css')
        ->addCss('//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css', false)
        ->addCss('//netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', false)
        ->addCss('//fonts.googleapis.com/css?family=Open+Sans:700,400', false);

    $assets
        ->collection('footer_js')
        ->addJs('//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', false)
        ->addJs('//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', false)
        ->addJs($utils->getCdnUrl() . 'js/plugins/jquery.lazyload.min.js', $utils->isCdnLocal())
        ->addJs($utils->getCdnUrl() . 'js/plugins/jquery.magnific-popup.min.js', $utils->isCdnLocal())
        ->addJs($utils->getCdnUrl() . 'js/plugins/highlight.pack.js', $utils->isCdnLocal())
        ->addJs($utils->getCdnUrl() . 'js/plugins/jquery.ajaxchimp.min.js', $utils->isCdnLocal())
        ->addJs($utils->getCdnUrl() . 'js/plugins/jquery.backstretch.min.js', $utils->isCdnLocal())
        ->addJs($utils->getCdnUrl() . 'js/custom.js');

    $this->diContainer->setShared('assets', $assets);
}
```

#### `runApplication()`
Finally we run our application. You will notice that for the main application we invoke the `handle()` method with no parameters

```php
protected function runApplication()
{
    return $this->application->handle();
}
```

and as far as the CLI application is concerned, we invoke it with our options (set in the `initOptions` method).

```php
protected function runApplication()
{
    return $this->application->handle($this->options);
}
```

### Conclusion

We have looked at the boostrap of the application and each service setup for both the CLI and the main application. In the next part of these series we will discuss the middleware. 

### References
- [Part 1](/post/building-the-new-phalcon-website-implementation-part-1)
- [Part 2](/post/building-the-new-phalcon-website-bootstrap-part-2) 
- [Part 3](/post/building-the-new-phalcon-website-middleware-part-3)
- [Micro Application](https://docs.phalconphp.com/latest/en/micro)
- [Middleware](https://docs.phalconphp.com/latest/en/micro#middleware-events)
- [Source Code](https://github.com/phalcon/website)
- [Dotenv](https://github.com/vlucas/phpdotenv)
- [CLI Progress Bar](https://github.com/dariuszp/cli-progress-bar)
- [Guzzle](http://docs.guzzlephp.org/en/stable/)
- Transifex

