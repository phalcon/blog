---
layout: post
title: "Phalcon 0.5.0 is finally here!"
tags: [php, framework, phalcon, release, mvc, phql, events manager, "0.5", "0.x"]
---
![image](/assets/files/2012-09-17-phalcon-attacking.jpg)

The long wait is over, Phalcon 0.5.0 final is here! This version marks a huge step forward in our development roadmap, taking into account mostly features requested by the community and offering a lot of flexibility while still keeping performance high. Phalcon framework is now a very powerful, extensible and fast tool building any number of websites and applications using PHP.

The major changes in this version are:

<!--more-->
- **Namespaces**: Classes are now organized into namespaces. The components have been placed in their respective namespaces, offering better organization within the framework. [API](https://phalcon.io/api)
- **Dependency Injection**: The framework is equipped with the first service container and dependency injection component written in C for PHP. All components have been adjusted to make the most of this design pattern. Thus your code becomes more extensible, testable and flexible than ever before. [Using Dependency Injection](https://docs.phalcon.io/latest/en/di)
- **Single and Multi-Module applications**: The MVC components are now capable of creating single and multi module applications. This allows for easier resource sharing between modules. [MVC Applications](https://docs.phalcon.io/latest/en/mvc)
- **Micro Applications**: With a minimal amount of code, it is now possible to create small applications such as  prototypes, apis, RESTFul applications and more. [Micro Applications](https://docs.phalcon.io/latest/en/micro)
- **PhalconQL (PHQL)**: PHQL is a high level, object oriented SQL dialect that allows to write queries using a standardized SQL-like language. PHQL is implemented as a parser (written in C) that translates syntax in that of the target RDBMS. To achieve the highest performance possible, the parser uses the same technology as [SQLite](https://en.wikipedia.org/wiki/Lemon_Parser_Generator). This technology provides a small in-memory parser with a very low memory footprint that is also thread-safe. [Phalcon Query Language (PHQL)](https://docs.phalcon.io/latest/en/phql)
- **Events Manager**: With this new component you can add "hook points" and listen for events of the framework's components as well as your own. Listeners could change the normal behavior of a component or simply obtain real-time information about them. [Events Manager](https://docs.phalcon.io/latest/en/events)
- **CLI Applications**: Now you can create command line applications. These are useful to create cron jobs, scripts, command utilities and more. [Command Line Applications](https://docs.phalcon.io/latest/en/cli)
- **PDO Database Adapters**: All the database adapters have been migrated their PDO equivalents. This improves reuse of the framework's code as well as offers an easier way to add more adapters in the future. PDO adapters increase the security of applications by reducing the SQL injection attacks. Also, from this version is available an adapter for SQLite. [Database Adapters](https://docs.phalcon.io/latest/en/db#database-adapters)
- **Reflection and Introspection**: Despite being written in C, Phalcon runs methods in the PHP userland, providing the debug capability that any other application or framework written in PHP has. Additionally, now, any instance of a Phalcon class offers exactly the same behavior than a PHP normal one. It's possible to use the [Reflection API](https://www.php.net/manual/en/book.reflection.php) or simply print any object to show how is its internal state. [Debugging Applications](https://docs.phalcon.io/latest/en/debug)

Other changes:

- **URL Generation**: Now is possible to create URLs based on routes. [Generating URLs and Paths](https://docs.phalcon.io/latest/en/url)
- **Universal Class Loader**: The component to load classes is now PSR-0 compliant. [Universal Class Loader](https://docs.phalcon.io/latest/en/loader)
- **HTTP Constraints on Routes**: Routes can be set if they match on certain HTTP methods. [Routing](https://docs.phalcon.io/latest/en/routing)
- **Session Flash Messenger**: Flash messages can be directly printed or be stored in session to be shown in future requests [Flashing Messages](https://docs.phalcon.io/latest/en/flash)

Alongside with the above changes, improvements have been introduced within the framework to ensure stability and low memory usage.

**Documentation**
The documentation now provides 3 tutorials:

- [Tutorial 1: Let's learn by example](https://docs.phalcon.io/latest/en/tutorial)
- [Tutorial 2: Explaining INVO](https://docs.phalcon.io/latest/en/tutorial-invo)
- [Tutorial 3: Creating a Simple REST API](https://docs.phalcon.io/latest/en/tutorial-rest)

The sample applications have been updated too:

- [INVO application](https://blog.phalcon.io/post/invo-a-sample-application)
- [PHP Alternative website](https://blog.phalcon.io/post/sample-application-php-alternative-site)

As always you can download a DLL for Windows from the [download page](https://phalcon.io/download) and compile the extension from [Github](https://github.com/phalcon/cphalcon/). The complete documentation can be found [here](https://docs.phalcon.io/)

We are happy to say that Phalcon is is turning into the best balance between performance and functionality never before achieved in the PHP world. Phalcon is one of the fastest frameworks on earth, and gradually is being one of the most robust too, providing you the tools you need to create amazing software and websites.

Thanks to all the community and the [contributors](https://github.com/phalcon/cphalcon/graphs/contributors?from=2012-07-30&to=2012-09-15&type=c) for their hard work!

Thanks for being part of this amazing tool. Phalcon is made with a lot of love for you and the community. Tell everyone about this and enjoy Phalcon!


