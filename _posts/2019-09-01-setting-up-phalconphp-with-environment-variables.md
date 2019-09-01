---
layout: post
title: Setting up PhalconPHP with Environment Variables
date: 2015-07-24T21:20:00.000Z
tags:
  - phalcon
  - env
  - environment variables
---
The use of environment variables is quickly becoming a staple for many PHP developers. It is a way through which configurations can be easily added to the development of applications with very little work or hassle.

This is a small article to show you how to implement environment variables in your PhalconPHP configuration.

Some notes before you continue reading: I currently work using PHP 5.6 in my development environment. Therefore expect not to see `array()` when an array is being used or define. Expect to see the new brackets method (`[]`).

We will be using Vance Lucas’ [phpdotenv](https://github.com/vlucas/phpdotenv) library (the link will take you to his GitHub repository). You can follow the instructions for installing the library using Composer.

Once you have the library installed you will want to create a `.env` file, which is where you will define all your configuration values. It is a good idea to create this file in the user root directory (for exmaple: `/home/user/`).

```ini
//This is an exmaple of a `.env` file:
DOMAIN=yourdomain.com
BASE_DIR=/home/user/
PRODUCTION=1

DATABASE_HOST=
DATABASE_USER=
DATABASE_PASS=
DATABASE_NAME=

BEANSTALK_HOST=
BEANSTALK_PORT=
BEANSTALK_PREFIX=

MEMCACHE_HOST=
MEMCACHE_PORT=

REDIS_HOST=
REDIS_PORT=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
```

With this you can set all necessary configuration values. Do keep in mind that different development systems can (and probably will) have different values for the configurations. Your `.env` file is to be kept off your versioning system. So, in order to let the other developers know what values they NEED to set for the configuration all you need to do is create a `.env.example` file which is an exact copy of `.env`, except that none of the variables will have values.

This skeleton file will let the developer know what he has to provide for the system in order for it to work properly.

Next, we will load the environment variables into PhalconPHP. Locate the `loader.php` file (located in INSTALLATION_DIR/app/config/loader.php), open it in your editor of preference and append these lines to the end of the file:

```php
/**
 * Composer autoload
 */
include __DIR__ . '/../../vendor/autoload.php';

/**
 * Environment variables
 */
$dotenv = new Dotenv\Dotenv(__DIR__ . '/../../');
$dotenv->load();
```

**IMPORTANT** This environment variables loader has to go AFTER you include Composer’s `autoload.php` file. Look at the code above carefully.

With this we are ready to load our environment variables into PhalconPHP’s configuration. So go ahead and open the config.php file (in the same folder as the loader.php file), and use the environment variables like this:

```php
 [
        'adapter'  => 'Mysql',
        'host'     => getenv('DATABASE_HOST'),
        'username' => getenv('DATABASE_USER'),
        'password' => getenv('DATABASE_PASS'),
        'dbname'   => getenv('DATABASE_NAME')
    ],
    'application' => [
        'controllersDir' => getenv('BASE_DIR') . 'app/controllers/',
        'modelsDir'      => getenv('BASE_DIR') . 'app/models/',
        'viewsDir'       => getenv('BASE_DIR') . 'app/views/',
        'pluginsDir'     => getenv('BASE_DIR') . 'app/plugins/',
        'libraryDir'     => getenv('BASE_DIR') . 'app/library/',
        'cacheDir'       => getenv('BASE_DIR') . 'app/cache/',
        'baseUri'        => '/',
        'baseDir'        => getenv('BASE_DIR')
    ]
]
```php

That’s it! Couldn’t have been easier! With this in place you can now commit ALL project files without having to worry for the configurations the different systems need.
