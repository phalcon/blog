---
layout: post
title: "Introduction Series 1: Phalcon's Dependency Injector"
tags: [php, framework, phalcon, series, mvc, di, "0.5", "0.x"]
---

Development in the new version of Phalcon 0.5.0 is well underway. In this new version we are introducing new components for the community to use. In the blog posts to follow, we will explain these new features in length.

With Phalcon 0.5.0 (still under development) we are introducing a new design pattern called [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection). In short, objects should not be instantiated inside a class, rather injected using constructors and/or setter methods. This pattern increases testability in the code, thus making it less prone to errors.

<!--more-->
**Phalcon\Di**
`Phalcon\\Di` is a new component that will be available in 0.5.0 and offers a dependency injection container. `Phalcon\Di` works as a container of services.

Services can be registered by the framework itself or the developer. When a component A requires component B (or an instance of its class) to operate, it can request component B from the container, rather than creating a new instance component B.

Services can be registered in several ways:

```php
// Create the Dependency Injector Container
$di = new \Phalcon\DI();

//By its class name
$di->set("request", "Phalcon\Http\Request");

//Using an anonymous function, the instance will lazy loaded
$di->set(
    "request", 
    function () {
        return new \Phalcon\Http\Request();
    }
);

// Registering directly an instance
$di->set("request", new \Phalcon\Http\Request());

// Using an array definition
$di->set(
    "request", 
    [
        "className" => "Phalcon\Http\Request"
    ]
);
```

In the above example, when the framework needs to access the request data, it will ask for the service identified as ‘request' in the container. The container in turn will return an instance of the required service. A developer might eventually replace the `Phalcon\Http\Request` component bundled with one provided by another vendor or created by the developer him/herself.

Each of the methods (demonstrated in the above example) used to set/register a service has advantages and disadvantages. It is up to the developer and the particular requirements that will designate which one is used. 

Setting a service by a string is simple but lacks flexibility. Setting services using an array offers a lot more flexibility but makes the code more complicated. The lambda function is a good balance between the two but could lead to more maintenance than one would expect.

`Phalcon\\Di` offers lazy loading for every service it stores. Unless the developer chooses to instantiate an object directly and store it in the container, any object stored in it (via array, string etc.) will be lazy loaded i.e. instantiated only when requested.

```php
// Register a service "db" with a class name and its parameters
$di->set(
    "db", 
    [
        "className"  => "Phalcon\Db\Adapter\Pdo\Mysql",
        "parameters" => [
            "parameter" => [
                "host"     => "localhost",
                "username" => "root",
                "password" => "secret",
                "dbname"   => "blog",
            ]
        ]
    ]
);

// Using an anonymous function
$di->set(
    "db",
    function () {
        return new \Phalcon\Db\Adapter\Pdo\Mysql(
            [
                "host"     => "localhost",
                "username" => "root",
                "password" => "secret",
                "dbname"   => "blog",
            ]
        );
    }
);
```

Both service registrations above produce the same result. The array definition however, allows for alteration of the service parameters if needed:

```php
$di->setParameter(
    "db", 
    0, 
    [
        "host"     => "localhost",
        "username" => "root",
        "password" => "secret",
    ]
);
```

Obtaining a service from the container is a matter of simply calling the `get` method. A new instance of the service will be returned:

```php
$request = $di->get("request");
```

`Phalcon\\Di` also allows for services to be reusable. To get a service previously instantiated the getShared() method can be used. Specifically for the `Phalcon\Http\Request` example shown above:

```php
$request = $di->getShared("request");
```

**Conclusion**
This has been one of the most popular requests by the community. `Phalcon\\Di` allows developers to extend and thoroughly test their code (with mock objects etc.) while keeping the same high performance levels and memory consumption low.

<3 Phalcon Team