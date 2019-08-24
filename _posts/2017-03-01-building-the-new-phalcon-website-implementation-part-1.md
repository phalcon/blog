---
layout: post
title: "Building the new Phalcon Website - Implementation (Part 1)"
tags: [php, phalcon, "3.0.x", phalcon3, implementation, website, series]
---

This post is part of a series. [Part 1](/post/building-the-new-phalcon-website-implementation-part-1) - [Part 2](/post/building-the-new-phalcon-website-bootstrap-part-2) - [Part 3](/post/building-the-new-phalcon-website-middleware-part-3)

Our website has undergone a number of iterations in its implementation.

When we released Phalcon 3.0, we also released a fresh look for our website. However, some files were left over from a previous implementation and new text was introduced in several pages. This made that particular text not translatable by Transifex, the excellent service we use to handle translations for our site.

<!--more-->
### Goals
One our Q1 goals for 2017 is to improve documentation and also offer better implementations of Phalcon in applications to our community. So we cleaned up our website application, and will use it as an implementation sample for our community to inspire them for their own projects :)

### Standards
Building the website we used a particular style throughout. Specifically:
 - PSR-2 was used as the coding standard
 - Used for comparisons, yoda conditions were
 - Identical comparisons
 - Single quotes for all strings

### Implementation
This implementation of our website showcases the `Phalcon\Mvc\Micro` application with [Middleware](https://docs.phalcon.io/latest/en/micro#middleware-events). It was built for maximum performance.

We implemented two applications for the website. One to dispatch the site for web users to see and a CLI application that allows for certain tasks that need to be run from the console, such as fetching the contributors from Github or cleaning the cache folders.

Let's look at the implementation:

### Skeleton
The skeleton of the application is very simple.

<table>
<tr><th style="width:25%">Folder</th><th>Purpose</th><tr>
<tr><td>app</td><td>The main application folder</td><tr>
<tr><td>app/config/</td><td>Contains the configuration file for our application</td><tr>
<tr><td>app/controllers/</td><td>The controllers (or handlers) of the application</td><tr>
<tr><td>app/library</td><td>Necessary library classes such as the middleware, locale, utils, bootstrap etc.</td><tr>
<tr><td>app/tasks</td><td>Contains the CLI application tasks</td><tr>
<tr><td>app/views</td><td>The Volt view files that the application needs</td><tr>
<tr><td>public</td><td>The `index.php`, images and assets (css, js files)</td><tr>
<tr><td>storage/cache/data</td><td>Stores the contributors cache file and any additional cache files</td><tr>
<tr><td>storage/cache/view</td><td>Stores the view cache data</td><tr>
<tr><td>storage/cache/volt</td><td>Stores the volt compiled templates</td><tr>
<tr><td>storage/files</td><td>Stores the `releases.json` file which contains metadata for download files</td><tr>
<tr><td>storage/languages</td><td>Stores the languages files which are pulled from Transifex</td><tr>
<tr><td>storage/logs/</td><td>Stores the application logs</td><tr>
</table>

### `index.php`
The `index.php` file is the entry point of our application. Apache has been configured with a virtual host to route all requests to that file as follows:

```apacheconfig
<VirtualHost *:443>
    ServerName              phalcon.io
    ServerAlias             www.phalcon.io
    DocumentRoot            /path/to/installation/public
    ...
    <Directory "/path/to/installation/public">
        Options FollowSymLinks MultiViews
        AllowOverride All
        RewriteEngine On
        Options +FollowSymlinks
        # Phalcon
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ index.php?_url=/$1 [QSA,L]
    </Directory>
</VirtualHost>
```
The file itself is very small

```php
use Website\Bootstrap\Main;

if (true !== defined('APP_PATH')) {
    define('APP_PATH', dirname(dirname(__FILE__)));
}

try {
    require_once APP_PATH . '/app/library/Bootstrap/AbstractBootstrap.php';
    require_once APP_PATH . '/app/library/Bootstrap/Main.php';

    /**
     * We don't want a global scope variable for this
     */
    (new Main())->run();

} catch (\Exception $e) {
    echo $e->getMessage() . PHP_EOL . $e->getTraceAsString();
}
```

First of all we set a constant `APP_PATH` which points to the actual path of our application. We are going to use this constant throughout the application to ensure that the files are included from their correct paths, logs are stored in their proper locations etc.

We then `require` two files, the `AbstractBootstrap.php` and `Main.php`. We do so because the autoloader has not been loaded yet. `Main.php` is the file that bootstraps our main application and that file extends `AbstractBootstrap.php`, so we have to require them both.

The next line is invoking the `run()` command which bootstraps the application, creating the necessary objects and handles each request.
 
Instead of using this syntax

```php
$ourApp = new Main();
$ourApp->run();
```

we use this:

```php
(new Main())->run();
```

The reason for this is because we do not want to have a variable available in the global scope. With the first implementation `$ourApp` is available in the global scope.
 
This particular syntax can be very useful in your application, especially if you want to ensure that a particular object cannot be used or overridden by accident.

### Bootstrap
We opted using abstraction for our bootstrap process. The main file for bootstrapping is `AbstractBootstrap.php` located in `app/library/Bootstrap` and contains our abstract bootstrap class. The files `Main.php` and `Cli.php` located in the same folder extend the abstract class, to bootstrap the main application as well as the CLI one.

The `run()` method makes several calls to protected functions within `AbstractBootstrap` to initialize objects necessary for our application. 

```php
public function run()
{
    $this->initOptions();           // Initializes options - used in CLI
    $this->initDi();                // Initializes the DI container
    $this->initLoader();            // Initializes the autoloader
    $this->initRegistry();          // Initializes the registry
    $this->initEnvironment();       // Initializes the environment
    $this->initApplication();       // Initializes the application (micro/console)
    $this->initUtils();             // Initializes the utilities object
    $this->initConfig();            // Initializes the configuration
    $this->initDispatcher();        // Initializes the dispatcher (only cli)
    $this->initCache();             // Initializes the cache
    $this->initLogger();            // Initializes the logger
    $this->initLocale();            // Initializes the locale (translations)
    $this->initRoutes();            // Initializes the routes
    $this->initView();              // Initializes the view (only main)
    $this->initAssets();            // Initializes the assets (only main)

    return $this->runApplication();
}
```

Using this implementation we can override relevant methods to serve the purposes of each of our two applications (main or CLI). For instance since we are using the `Phalcon\Mvc\Micro` application, we do not have a dispatcher. Therefore, in our `AbstractBootstrap` class the `initDispatcher()` method is empty. However in the CLI application, the method `initDispatcher()` sets up the necessary `Phalcon\Cli\Dispatcher`.
 
Similarly, the `initApplication()` returns an instance of `Phalcon\Mvc\Micro` for our main application, and an instance of `Phalcon\Cli\Console` for the CLI application.

### Conclusion

We have looked at the skeleton of our application and also discussed briefly about the bootstrap process. In the next part of these series we will discuss in depth the bootstrap process both for the main app as well as the CLI.
 
### References
- [Part 1](/post/building-the-new-phalcon-website-implementation-part-1)
- [Part 2](/post/building-the-new-phalcon-website-bootstrap-part-2) 
- [Part 3](/post/building-the-new-phalcon-website-middleware-part-3)
- [Micro Application](https://docs.phalcon.io/latest/en/micro)
- [Middleware](https://docs.phalcon.io/latest/en/micro#middleware-events)
- [Source Code](https://github.com/phalcon/website)
- Transifex
