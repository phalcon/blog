---
layout: post
title: Performing a route redirection in PhalconPHP
date: 2015-08-22T21:10:00.000Z
tags:
  - phalcon
  - routes
  - redirection
---
After doing some searching around the PhalconPHP documentation, forums, and Google it became apparent that one of two things were happening here: either no one that is using PhalconPHP has had to do rerouting or there is a way and it just hasn’t been shared with the rest.

Either way, after digging through the PhalconPHP API we found something that could help us with what we wanted. Therefore we created a solution to what we needed. It might not be the prettiest or best one out there, but it worked and took care of it.

The issue:

While performing SEO optimization to a site that had already been online for some time, and that had already been indexed by Google it came to our attention of URLs that were 4 and 5 levels deep. According to SEO, URLs should try to stick to being 3 levels deep, 4 at most if it cannot be avoided.

Examples of URL depths:

http://domain.com/level2/level4/level5/level6/…

Correct way:

http://domain.com/level2/level3-level4-level5-level6-...

Our solution:

Take this original route definition (ignore how unusual it maybe, it is for example’s sake):

```php
$router->add('/level2/level3/([0-9]+)/([0-9]+)', [
    'namespace' => 'Project\\Controllers\\',
    'controller' => 'index',
    'action' => 'getLevel',
    'param1' => 'level3',
    'param2' => 1,
    'param3' => 2,
]);
```

We wanted to perform a 301 redirect on that URL in order to allow the new URL format without losing what had already been indexed.

We know $router is an instance of Phalcon\Mvc\Router, and when we add a route using $route->add() we get back an instance of Phalcon\Mvc\Router\Route. With that in mind we went to explore the API and found something within the Route class: beforeMatch().

A thought went across our heads, so we decided to test it.

```php
$router->add('/level2/level3/([0-9]+)/([0-9]+)', [
    'namespace' => 'Project\\Controllers\\',
    'controller' => 'index',
    'action' => 'getLevel',
    'param1' => 'level3',
    'param2' => 1,
    'param3' => 2,
])->beforeMatch(function(){
    die(‘Testing beforeMatch’);
})
```

Don’t judge. We know you use die() too. And it effectively printed the string when the URL was invoked. Neat! Well, the API doesn’t not specify any parameters, but surely there must be some, right? After all it is a callback, which means something should be sent back to us. Well, by specifying parameters we confirmed that 3 pieces of information are being sent back to the callback function:

Param 1: The match URL string.
Param 2: A `Phalcon\Mvc\Router\Route` object.
Param 3: A `Phalcon\Mvc\Router` object.

In the end we only needed the first two parameters in order to do what was needed.

```php
$router->add('/level2/level3/([0-9]+)/([0-9]+)', [
    'namespace' => 'Project\\Controllers\\',
    'controller' => 'index',
    'action' => 'getLevel',
    'param1' => 'level3',
    'param2' => 1,
    'param3' => 2,
])->beforeMatch(function($matchedRoute, $routeObject){
    // do something
});
```

Furthermore, it came to our attention that we did not need to specify the route’s paths:

```php
$router
    ->add('/level2/level3/([0-9]+)/([0-9]+)')
    ->beforeMatch(
        function ($matchedRoute, $routeObject) {
            // do something
        }
    )
;
```

Now all we had to do was work with this to get the redirect going. Through Phalcon\Mvc\Router\Route we found getCompiledPattern(). This will return the complete regular expression for the defined pattern.

```php
$router
    ->add('/level2/level3/([0-9]+)/([0-9]+)')
    ->beforeMatch(
        function ($matchedRoute, $routeObject) {
            preg_match(
                $routeObject->getCompiledPattern(),
                $matchedRoute, 
                $params
            );
        }
    )
;
```

Good so far. Next we defined the URL to where we wanted to do the redirection:

```php
$router
    ->add('/level2/level3/([0-9]+)/([0-9]+)')
    ->beforeMatch(
        function ($matchedRoute, $routeObject) {
            preg_match(
                $routeObject->getCompiledPattern(),
                $matchedRoute,
                $params
            );
            $url = '/level2/level3-' . $params[1] . '-' . $params[2];
        }
    )
;
```

The last thing we needed was to do the redirection. None of the parameters supplied by PhalconPHP could help us on that, so we decided to invoke our good old friend, the Dependency Injector (DI):

```php
$router
    ->add('/level2/level3/([0-9]+)/([0-9]+)')
    ->beforeMatch(
        function ($matchedRoute, $routeObject) {
            preg_match(
                $routeObject->getCompiledPattern(),
                $matchedRoute,
                $params
            );
            $url = '/level2/level3-' . $params[1] . '-' . $params[2];
            return \Phalcon\DI::getDefault()
                ->getResponse()
                ->redirect($url, true, 301);
        }
    )
;
```

And there you have it. A 301 redirect in PhalconPHP directly from the routes. Call it rerouting if you want.
