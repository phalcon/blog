## Tutorial: your first encounter with Phalcon / Part 1

Our friend [Marcin @mailopl](https://twitter.com/mailopl) from Poland sent us this amazing tutorial and introduction to Phalcon. Enjoy it!

### Foreword
This tutorial was going to be published on [net.tutsplus.com](http://net.tutsplus.com/) but that process took more than 2 months and finally due to no response I decided to publish it on Phalcon's blog.

In this tutorial I'll explain what Phalcon framework is, how to install, configure and use it. I will also walk you through a process of creating very simple blog system.

*Tutorial Details*

- Program: Phalcon PHP Framework
- Version (if applicable): [0.7.x](https://phalconphp.com/download)
- Difficulty: easy
- Estimated Completion Time: 2h

### Introduction

#### Requirements
In the following tutorial I am going to assume that you are familiar with:

- MySQL - you know how to create a database, and tables; what a schema is and how to fetch and store information
- PHP - how to write and execute an application (i.e. not a single script)
- Apache-PHP-MySQL interaction
- OOP techniques in PHP

#### What is Phalcon - MVC in C
Phalcon is a very recent framework on the market developed by the group of enthusiastic developers. In contrast to traditional frameworks which are written in PHP - Phalcon is a C extension to PHP interpreter itself. It means that its code doesn't have to be interpreted on every request by PHP - it's loaded only once, when server is booted (restarted) or reloaded.

Phalcon is also a full stack framework, which means you just need a minimal amount of code to take advantage of available components, which cover many typical use cases. There is nothing stopping you from using only certain Phalcon's components (classes) on their own, for example if you just need [Phalcon's Cache component](https://docs.phalconphp.com/en/latest/reference/cache.html), you can use it in any application written in either pure PHP or using a framework.

Following image demonstrates message flow during typical request when employing [MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern, which is the preferred way to develop Phalcon applications. I won't go into details describing this scheme.

![image]({{ cdnUrl }}files/2012-11-26-mvc-c.png)

### What makes Phalcon special

#### Performance
Phalcon performance is clearly distinguishable from standard PHP frameworks. In terms of performance it is only fair to compare Phalcon to the other C-written frameworks. Still, to get at least a feeling for the level of performance check its benchmarks [here](https://docs.phalconphp.com/en/latest/reference/benchmark.html).

Bear in mind, that the goal of this minimal overhead benchmark is not to start another "benchmark" war. It demonstrates "base level" of performance that each framework provides and shows the difference between compiled and interpreted code.

You can squeeze more performance from PHP frameworks by tuning and
picking them apart, but it requires time, effort and (more often than
not) advanced skills.

#### C-language ORM
Phalcon is the first PHP framework to implement a [ORM](https://docs.phalconphp.com/en/latest/reference/models.html) in pure C. The consequence of this fact is improved performance, when compared to typical ORMs.

Since ORM is a key component of so many applications and is used so extensively, any positive changes to performance have a noticeable effect.

In short, Phalcon's ORM allows you to do things like:

Find all users and first user with active state:

```php
$users = Users::find();
$user  = Users::findFirst(‘state = ' . User::STATE_ACTIVE); 
```

Count users and the user posts:

```php
echo Users::count(); 
echo $user->countPosts(); 
```

Retrieve user posts:

```php
$userPosts = $user->getPosts(); 
```

Retrieve average user age:

```php
echo Users::average(array("column" => "age")); // get average user age
```

Create user with appropriate login, security key and password hash:

```php
//...
$salt = '$2a$#$#DwaxE59';
//...
$user           = new Users;  // creates ORM instance of Users model
$user->login    = "Steve";
$user->password = crypt($myPassword . $salt); 
$user->save();
```

It is not uncommon (and quite convenient) to directly query your models inside views:

```php
<?php foreach(Posts::find("active = 'Yes'") as $post){ ?>
    <?= $post->title ?>
<?php } ?>
```

#### Developer tools
[Phalcon developer tools](https://docs.phalconphp.com/en/latest/reference/tools.html) allow you to generate boilerplate code and jump straight to implementation of your application's logic.

They can generate any element of MVC triad separately – model, view or controller, or create scaffolding (complete code for managing records in the database) which is very efficient way to have running prototype.

They can also generate skeleton of your project, or even employ [twitter bootstrap](https://docs.phalconphp.com/en/latest/reference/tools.html#scaffold-with-twitter-bootstrap) for nice looking prototypes. If you are not a command line ninja, you can use web interface (both console tools and their web counterparts are provided).

#### Code Completion
You may think that since Phalcon is a C framework, it's not possible to provide code completion for your favorite IDE.

Luckily, that's not the case. Code completion is handled the same way as it is for PHP functions, using [stub files](https://github.com/phalcon/phalcon-devtools/tree/master/ide/phpstorm).

### Summary
So far you've learned that Phalcon brings performance, convenient migrations and easy to use developer tools. Now let us give it a go, and write some "real" application using Phalcon. In the [second part](/post/tutorial-your-first-encounter-with-phalcon-part-2) I'm going to walk through a process of creating a simple web application – blog.


<3 The Phalcon Team
