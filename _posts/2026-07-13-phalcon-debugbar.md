---
layout: post
title: Introducing the Phalcon DebugBar
image: /assets/files/2026-07-13-phalcon-debug.svg
date: 2026-07-13T12:00:00.000Z
tags:
  - phalcon
  - debugbar
  - tools
---
We have released [`phalcon/debugbar`](https://github.com/phalcon/debugbar), a web debug bar and debugger for Phalcon applications. It installs with Composer and gives you a per-request view of what your application is doing, without reaching for `var_dump()` or tailing a log.

<!--more-->

The package is a fork of [snowair's Phalcon Debugbar](https://github.com/snowair/phalcon-debugbar), rebuilt for Phalcon 5 and 6, and it is under active development.

## What you get

One install provides two things:

- **The debug bar** - a status bar injected into the bottom of your application's HTML. Each tab is a *collector* that surfaces one slice of the request: messages, timing, database queries, the matched route, the request, session, config, cache operations, rendered views, exceptions, and version information.
- **The debug page** - the framework's exception/error page, migrated out of `Phalcon\Support\Debug` into this package as `Phalcon\Debug`. Its public API is unchanged, so an existing application moves over by swapping the namespace. Note that in v7/v8, the `Phalcon\Support\Debug` namespace will be deprecated and all that functionality will only be available from `phalcon/debugbar`

Collectors read their data in one of three ways: a **snapshot** taken when the response is assembled (request, config, session, version), a **stream** of framework events accumulated as they fire (database, route, view, cache), or **manual** entries fed through a facade (messages, timing, exceptions).

## Installing

```bash
composer require phalcon/debugbar
```

The bar is booted by a provider that takes your MVC application:

```php
<?php

use Phalcon\DebugBar\Provider;
use Phalcon\Events\Manager as EventsManager;
use Phalcon\Mvc\Application;

$application = new Application($container);
$application->setEventsManager(new EventsManager());

(new Provider($application))->boot();

echo $application->handle($_SERVER['REQUEST_URI'])->getContent();
```

The streamed collectors (database, route, view, cache) only see events from components that share the application's events manager. Register a single events manager as a shared service and hand it to each component whose activity you want on the bar:

```php
<?php

// if using the snippet above 
// $eventsManager = $application->getEventsManager();

$eventsManager = $container->getShared('eventsManager');

$connection->setEventsManager($eventsManager); // database
$view->setEventsManager($eventsManager);       // view
$router->setEventsManager($eventsManager);     // route
```

## It stays out of production

The bar runs only in development. It reads the environment from `APP_ENV` and refuses to boot when the value is blocked (`production` and `prod` by default) or undefined, so `boot()` is safe to call unconditionally - outside a permitted environment it registers nothing and returns. It also renders nothing on non-HTML responses.

Data is redacted before it leaves PHP. A redactor matches keys case-insensitively through nested arrays and either masks their values (`authorization`, `cookie`, `csrf`, `key`, `password`, `secret`, and `token` by default) or drops them entirely, applied to the request, config, and session collectors. Access can be narrowed further with an IP allowlist and an optional callback.

## Manual instrumentation

`Phalcon\DebugBar\Debug` is a static facade that forwards to the active bar and no-ops when the bar was never registered, so calls left in the code are safe in any environment:

```php
<?php

use Phalcon\DebugBar\Debug;

Debug::message('user resolved', 'auth');

Debug::startMeasure('render');
// ... work ...
Debug::stopMeasure('render');
```

## A working sample

If you want to see it wired into a real application, [Vökuró](https://github.com/phalcon/vokuro) - our long-standing sample app - now ships with the debug bar enabled. Its `DebugBarProvider` is a short service provider that shares the events manager with the application and calls `boot()`, and it is a good template to copy from.

## Links

- Repository: [github.com/phalcon/debugbar](https://github.com/phalcon/debugbar)
- Package: [packagist.org/packages/phalcon/debugbar](https://packagist.org/packages/phalcon/debugbar)
- Sample: [github.com/phalcon/vokuro](https://github.com/phalcon/vokuro)

Feedback and bug reports are welcome on the issue tracker.
