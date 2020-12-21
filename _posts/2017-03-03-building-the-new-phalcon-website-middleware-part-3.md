---
layout: post
title: "Building the new Phalcon Website - Bootstrap (Part 3)"
tags: [php, phalcon, "3.0.x", phalcon3, implementation, website, series]
---
This post is part of a series. [Part 1](/post/building-the-new-phalcon-website-implementation-part-1) - [Part 2](/post/building-the-new-phalcon-website-bootstrap-part-2) - [Part 3](/post/building-the-new-phalcon-website-middleware-part-3)

In the final part of our series, we are going to investigate [Middleware](https://docs.phalcon.io/latest/en/micro#middleware-events) and how it helps our application.

<!--more-->
### Middleware
The core of the application is its Middleware. We discussed how the middleware is set up in [Part 2](/post/building-the-new-phalcon-website-bootstrap-part-2) in the `initRoutes()` method of our `AbstractBootstrap` class. Note that this only applies to our main application and not the CLI.  

#### Setup
Middleware needs to be attached to specific events in our events manager. These events are:

* `before`: This attaches the middleware to the event that fires before the handler has been executed. 
* `after`: This attaches the middleware to the event that fires after the handler has been executed. 
* `finish`: This attaches the middleware to the event that fires after the response has been sent to the caller.  

You can attach as many middleware classes in each of these events. They will be processed in a sequential manner, i.e. the first one registered gets processed first, then the second one etc.

#### Execution
Each middleware class has specific events in it that get executed (if present). These are methods/events available in every middleware class. The main method that gets executed is `call`

```php
public function call(Micro $application)
{
    return true;
}
```

The events present in each middleware class are:

* `beforeHandleRoute` - Called before any routes are matched
* `beforeExecuteRoute` - Called when a route is matched and a valid handler exists but has not been executed
* `afterExecuteRoute` - Called after executing a handler
* `beforeNotFound` - Called when a route has not been matched
* `afterHandleRoute` - Called after the handler has been executed successfully	

For instance for the `NotFoundMiddleware` we have:

```php
public function beforeNotFound()
{
    $language = $this->registry->language;
    $redirect= sprintf('/%s/404', $language);

    $this->response->redirect($redirect);
    $this->response->send();

    return false;
}
```

Returning `false` stops the execution of the application. As we can see above, since the `beforeNotFound` event has been triggerred, we need to first pick up the `$language` from the registry, set up the 404 route and then redirect the caller to the relevant handler/action. 

#### `EnvironmentMiddleware`
This middleware has been attached to the `before` event, so it will be executed before a handler starts processing


```php
public function call(Micro $application)
{
    /**
     * This is where we calculate what language we need to work with
     * and what slug has been requested
     */
    $params   = $application->router->getParams();
    $language = $this->getLang($application, 'en');
    $slug     = $application->utils->fetch($params, 'slug', 'index');
    $image    = $application->utils->fetch(
        $this->getImageMap($application),
        $language,
        'en'
    );

    /**
     * These are needed for all pages
     */
    $application->registry->language      = $language;
    $application->registry->slug          = $slug;
    $application->registry->imageLanguage = $image;
    $application->registry->menuLanguages = $this->getMenuLanguages($application, $language);
    $application->registry->version       = $application->config->get('app')->get('version');

    switch ($slug) {
        /**
         * Contributors are needed only in the front page or 'team'
         */
        case 'team':
        case 'index':
        case '':
            $application->registry->contributors = $this->getContributors();
            break;
        /**
         * Releases are needed in 'windows'
         */
        case 'windows':
            $application->registry->releases = $this->getReleases();
            break;
    }

    return true;
}
```
First we get a few parameters that have been passed to our application. One of those is the language. We use the `getLang()` method to check if the passed language exists. If not, we try to detect the browser language and if that fails it defaults to English. The `getLang()` method is located in the `LanguageTrait` (`app/library/Traits`).

Then we set some more variables in the registry and as the last step, we set the contributors and releases only in the specific pages that require them. This way we remove unnecessary processing and transfer of data from the application to the view.

#### `NotFoundMiddleware`
We discussed briefly the `NotFoundMiddleware` above. The implementation uses the events within the middleware, in particular the `beforeNotFound` one.

```php
public function beforeNotFound()
{
    $language = $this->registry->language;
    $redirect= sprintf('/%s/404', $language);

    $this->response->redirect($redirect);
    $this->response->send();

    return false;
}
```

This method is called within our middleware class, before the `call()` method is called. As a result, if we are here, that means that we have a 404 and therefore need to route the user to the relevant handler/view.

#### `RedirectMiddleware`
This middleware is responsible for redirections. We only have one actual redirection from the `/roadmap` url/stub to our Github page, which can be easily achieved with a directive in our  `.htaccess` file.

Since this application serves as a showcase or tutorial, we opted to create a middleware class that will handle this.

```php
public function call(Micro $application)
{
    $slug     = $application->registry->slug;
    $uri      = $application->request->getURI();
    $redirect = '';

    if ('roadmap' === $slug) {
        $redirect= 'https://github.com/phalcon/cphalcon/wiki/Roadmap';
    } elseif ('download' === substr($uri, 4) || 'download/' === substr($uri, 4)) {
        $redirect = $uri
                  . ('/' === substr($uri, -1) ? '' : '/')
                  . 'linux';
    }

    if (true !== empty($redirect)) {
        $application->response->redirect($redirect);
        $application->response->send();

        return false;
    }

    return true;
}
```

If the request is for the roadmap page, then our `$slug` is indeed `roadmap` and therefore the user will be redirected to the Github page. 

Also if the user just requested the `/download` page, they will be redirected automatically to the `/download/linux` page.

There are many implementations that a developer can employ to achieve the above task. This is just one of them using Middleware.

#### `AssetsMiddleware`
The assets middleware is invoked to inject specific asset files to specific pages. The front page requires a few more CSS files than the other pages, so this middleware checks where we are and adds the relevant CSS pages in the `header_css` asset collection if necessary. 


```php
public function call(Micro $application)
{
    /**
     * Adds relevant assets to the assets manager
     */
    $slug       = $application->registry->slug;
    $cdnUrl     = $application->utils->getCdnUrl();
    $isCdnLocal = $application->utils->isCdnLocal();

    if (true !== empty($slug) && 'index' !== $slug) {
        $application
            ->assets
            ->collection('header_css')
            ->addCss($cdnUrl . 'css/style.css', $isCdnLocal)
            ->addCss($cdnUrl . 'css/phalconPage.css', $isCdnLocal);
    } else {
        $application
            ->assets
            ->collection('header_css')
            ->addCss($cdnUrl . 'css/flags.css', $isCdnLocal)
            ->addCss($cdnUrl . 'css/highlight.js.css', $isCdnLocal)
            ->addCss($cdnUrl . 'css/phalcon.min.css', $isCdnLocal)
            ->addCss($cdnUrl . 'css/style.css', $isCdnLocal);
    }

    return true;
}
```

#### `ViewMiddleware`
This middleware is responsible for our final response to the client. It utilizes variables set in the registry service passes them to the view service (`Phalcon\Mvc\View\Simple`) and then sends the response back.

```php
public function call(Micro $application)
{
    $cacheKey = str_replace(
        '/',
        '_',
        $application->router->getRewriteUri()
    ) . '.cache';

    /** @var \Phalcon\Registry $registry */
    $registry     = $application->registry;
    $viewName     = $registry->view;

    if ('production' === $application->config->get('app')->get('env')) {
        $application->viewSimple->cache(['key' => $cacheKey]);
    }

    if (true === $application->viewCache->exists($cacheKey)) {
        $contents = $application->viewCache->get($cacheKey);
    } else {
        $application->viewSimple->setVars(
            [
                'page'          => $registry->slug,
                'language'      => $registry->language,
                'imageLanguage' => $registry->imageLanguage,
                'contributors'  => $registry->contributors,
                'languages'     => $registry->menuLanguages,
                'noindex'       => $registry->noindex,
                'releases'      => $registry->releases,
                'version'       => $registry->version,
            ]
        );

        $contents = $application->viewSimple->render($viewName);
    }
    $application->response->setContent($contents);
    $application->response->send();

    return true;
}
```

We first check where we are. Using a simple `str_replace`, we create a unique file name based on the route, so that we can have a cache file name (or key depending on your cache adapter).

We then check if we are in production mode (set in our `.env` file) and if so, we invoke the cache for the view. If the data has been cached we use that.

If we do not have a cache hit, several variables are being sent to the view, which have originally been set in our `EnvironmentMiddleware` or other areas of the site. We then render the view, set the response contents and send the response back.

### CLI Application

#### Executable
In our root folder, we have created a file called `phalcon` which is executable under a Linux based environment. The file resembles the `index.php` (under `public`).

```php
#!/usr/bin/env php
<?php

use Website\Bootstrap\Cli;

if (true !== defined('APP_PATH')) {
    define('APP_PATH', dirname(__FILE__));
}

try {
    require_once APP_PATH . '/app/library/Bootstrap/AbstractBootstrap.php';
    require_once APP_PATH . '/app/library/Bootstrap/Cli.php';

    /**
     * We don't want a global scope variable for this
     */
    (new Cli())->run();

} catch (\Exception $e) {
    fwrite(STDERR, PHP_EOL . $e->getMessage() . PHP_EOL);
    fwrite(STDERR, PHP_EOL . $e->getTraceAsString() . PHP_EOL . PHP_EOL);
    exit(1);
}
```

We once more set up the application path, include the needed files, and run our CLI bootstrap process.
 
Running this command without any parameters will show a menu of available parameters that our application accepts.

#### Bootstrap
We discussed the bootstrap process in our previous post. The CLI application uses the same class but removes services that are not needed such as the assets, the view etc. (since this is a CLI application), while it sets up some services differently. We encourage you to check the bootstrap application in the source code of our [github repository]()

#### Tasks
Our CLI application uses Task classes (`Phalcon\CLI\Task`) instead of handlers. This routing is set with our CLI dispatcher during the bootstrap process. For our application, we have three task classes which correspond to the commands that our CLI application can accept. The task classes can be found in `app/tasks`.

#### MainTask
This task class displays the available commands for our CLI application

#### ClearCache
This task class checks all the available cache files (in `storage/cache/*/`) and deletes them when invoked. It is used to clear the cache after each deployment.

#### FetchContributors
For quite some time now, we have introduced a big image map at the bottom of our site, to thank our contributors. This command is responsible for fetching the contributors from Github and constructing the final JSON file. To execute the HTTP request we are using the excellent [Guzzle](http://docs.guzzlephp.org/en/stable/) library.

We first assign some weights in different repositories. The more updates, the "heavier" the repository. We then interrogate the Github API for each of the repositories, and retrieve all the contributors. 

Looping through the contributors we create a final array of contributors with their avatar, github profile, name and weight. We sort the results and then save those results in our `contributors.json` file located in `storage/cache/data`.
 
This task is run once a day using a CRON job.

### Conclusion

We have looked at the middleware implementation, what is the purpose of each of those classes as well as our CLI implementation.

No implementation is perfect for every application. We have tried to keep this one simple so that the learning curve is much smoother, and also tried to show you different ways of doing things with Phalcon so that we can inspire you to write even better applications!

If you have any comments, suggestions, need to discuss something, please remember that you can find us in our [slack channel](https://phalcon.io/slack) or our [forum](https://phalcon.io/forum).
 
We would welcome suggestions for this implementation using the above, or even pull requests for something we have missed or a new enhancement, in our [github repository](https://github.com/phalcon/website).
 
If Phalcon has helped you with your personal projects, consider supporting us in our [Patreon](https://phalcon.io/fund) page. Contributions do not necessarily need to be monetary. We always welcome pull requests for improvements to Phalcon or documentation, as well as success stories to be showcased in this blog.

Thank you all 

### References
- [Part 1](/post/building-the-new-phalcon-website-implementation-part-1)
- [Part 2](/post/building-the-new-phalcon-website-bootstrap-part-2) 
- [Part 3](/post/building-the-new-phalcon-website-middleware-part-3)
- [Micro Application](https://docs.phalcon.io/latest/en/micro)
- [Middleware](https://docs.phalcon.io/latest/en/micro#middleware-events)
- [Source Code](https://github.com/phalcon/website)
- [Dotenv](https://github.com/vlucas/phpdotenv)
- [CLI Progress Bar](https://github.com/dariuszp/cli-progress-bar)
- [Guzzle](http://docs.guzzlephp.org/en/stable/)


