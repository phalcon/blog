---
layout: post
title: "Phalcon 0.8.0 alpha available"
tags: [php, phalcon, release, alpha, "0.8", "0.x"]
---

We're happy to announce the last release of this year, 0.8.0 Alpha. This release is a preview of Phalcon's next stable release which will come next year. We decided to release this alpha version, so that you can get acquainted with the new features coming down the line.

In this article we highlight some of the features implemented:

<!--more-->
### Performance Improvements
This version includes more performance improvements, increasing performance while reducing memory usage:

#### Native compilation flags
One of the main advantages of a C-extension framework like Phalcon over a traditional PHP framework is the compilation process. Previously when Phalcon was compiled its binary was compatible among many processors in the same processor family. This meant that the same compiled extension could be copied to other machines. To achieve this compatibility we were using a common set of instructions independent of processor family. Although this was a safe way for compiling Phalcon across many processors, it removed the ability to produce greater optimizations according to the target architecture that Phalcon would run.

Starting from 0.8.0, Phalcon performs a quick pre-compilation check which seeks the best available optimizations according to the processor where it is currently compiling. This means faster and better use of resources.

#### Cache for Function/Method calls
Phalcon executes functions/methods in the PHP userland, due to this developers can use tools like [xdebug](http://xdebug.org/) or [xhprof](http://php.net/manual/fr/book.xhprof.php) to debug or profile your code including the one executed by the framework.

Every time a method needs to be executed it is first "located" and then PHP does enters a validation stage where it checks if a class can be called or the method has modifiers like protected/private, the method is not abstract, valid calling scopes, etc. All these validations are good because we want our code to run according to the requirements of PHP. If the same method is executed again, PHP performs the same validation checks again. To combat that, a new cache has been implemented internally which allows the whole process to skip the rediscovery and re-validation process thus improving the performance.

#### Security Component
We are introducing a brand new component called Security. This component aids the developer in common security tasks such as password hashing an and Cross-Site Request Forgery protection ([CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)).

#### Password Hashing
Storing passwords in plain text is a bad security practice. Anyone with access to the database will immediately have access to all user accounts thus being able to engage in unauthorized activities. To combat that, many applications use the familiar one way hashing methods "[md5](http://php.net/manual/en/function.md5.php)" and "[sha1](http://php.net/manual/en/function.md5.php)". However, hardware evolves each day, and becomes faster, these algorithms are becoming vulnerable to brute force attacks. These attacks are also known as [rainbow tables](http://en.wikipedia.org/wiki/Rainbow_table).

To solve this problem we can use hash algorithms as [bcrypt](http://en.wikipedia.org/wiki/Bcrypt). Why bcrypt? Thanks to its "[Eksblowfish](http://en.wikipedia.org/wiki/Crypt_(Unix))" key setup algorithm we could make the password encryption as "slow" as we want. Slow algorithms make the process to calculate the real password behind a hash extremely difficult if not impossible. This will protect your for a long time from a possible attack with rainbow tables.

Phalcon gives you the ability to use this algorithm in a simple way:

```php
class UsersController extends Phalcon\Mvc\Controller
{
    public function register()
    {
        $user     = new Users();
        $login    = $this->request->getPost('login');
        $password = $this->request->getPost('password');

        $user->login = $login;

        // Store the password hashed with a work factor of 10
        $user->password = $this->security->hash($password, 10);

        $user->save();
    }
}
```

We saved the password hashed with a work factor of 10. A higher work factor will make the password less vulnerable as its encryption will be slow. We can check if the password is correct as follows:

```php
class SessionController extends Phalcon\Mvc\Controller
{
    public function login()
    {
        $login    = $this->request->getPost('login');
        $password = $this->request->getPost('password');

        $user = Users::findFirst(
            [
                "login => ?0",
                "bind" => [$login]
            ]
        );
        if ($user) {
            if ($this->security->checkHash($password, $user->password)) {
                // The password is valid
            }
        }

        // The validation failed
    }
}
```

#### Cross-Site Request Forgery (CSRF) protection
This is another common attack against web sites and applications. Forms designed to perform tasks such as user registration or adding comments are vulnerable to this attack.

The idea is to prevent the form values from being sent outside our application. To fix this we generate a random [nonce](http://en.wikipedia.org/wiki/Cryptographic_nonce) (token) in each form, add the token in the session and then validate the token once the form posts data back to our application by comparing the stored token in the session to the one submitted by the form:

```php
<input type="hidden" name="<?php echo $this->security->getTokenKey() ?>"
value="<?php echo $this->security->getToken() ?>"/>
```

Then in your application:

```php
class SessionController extends Phalcon\Mvc\Controller
{
    public function login()
    {
        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {
                // The token is ok
            }
        }
    }
}
```

Adding a captcha is also recommended to completely avoid the risks of this attack.

#### Configuration Improvements
New features were added to Phalcon\\Config to ease its usage:

```php
$config = new Phalcon\Config(
    [
        'database' => [
            'host'     => 'localhost',
            'username' => 'mark',
            'password' => 'kaleidoskope'
        ]
    ]
);

// Convert the object to array
$data = $config->toArray();

// Getting a value with a result
$controllersDir = $config->get('controllersDir', '../controllers/');

// Merge recursively with other object
$config->merge($config2);

// Accessing its elements using the array-syntax
echo $config['database']['host'];
```

### Volt
More features are added to [Volt](https://docs.phalconphp.com/latest/en/volt) in this version:

#### Cache statement
Volt now supports caching fragments natively:

```php
{% raw %}
{# Cache by 500 seconds the sidebar #}
{% cache sidebar 500 %}
    <!-- your side bar here -->
{% endcache %}
{% endraw %}
```

#### Service Injection
Calling methods from services registered in the DI:

```php
{% raw %}
{{ session.get("user-name" )}}
{% endraw %}
```

the same as:

```php
<?php echo $this->session->get("user-name") ?>
```

#### Register User Functions
Now you can add functions to the Volt compiler or rename the current ones:

```php
$volt = new Phalcon\Mvc\View\Engine\Volt();

$volt->addFunction(
    'markdown',
    function ($arguments) {
        return 'My\Markdown\Component::processText('.$arguments.')';
    }
);
```

Then in your view:

```php
{% raw %}
{{ markdown("*Some bold text*") }}
{% endraw %}
```

#### Register User Filters
Or adding new filters or rename the current ones:

```php
$volt->addFilter(
    'replace',
    function ($arguments) {
        return 'strtr('.$arguments.')';
    }
);
```

In your view:

```php
{% raw %}
{{ ":greeting:, My name is :name:"|replace(['greeting': 'Hello', 'name': 'Bob']) }}
{% endraw %}
```

#### Multiple Inheritance/Two-way block Replacement
Volt now allows that extended templates to extend other templates. Additionally the parent block can be inserted in the extended block. The following example demonstrates this:

```php
{% raw %}
{# a.html #}
<head>{% block head %}{% endblock %}</head>
{% endraw %}
```

```php
{% raw %}
{# b.html #}
{% extends 'a.html' %}{% block head %}.parent-style { color: #333; }{% endblock %}
{% endraw %}
```

```php
{% raw %}
{# c.html #}
{% extends 'b.html' %}

{% block head %} <style type="text/css">.local-style { font-family: Arial; } {{ super() }} </style>{% endblock %}
{% endraw %}
```

Compiling c.html produce:

```php
<head> <style type="text/css">.local-style { font-family: Arial; } .parent-style { color: #333; } </style></head>
```

#### ORM
Some missing features are added to the [ORM](https://docs.phalconphp.com/latest/en/db-models) in this version:

#### Behaviors
Behaviors are shared conducts that several models may adopt in order to re-use code, a well-known is adding a timestamp indicating when a record was created or updated:

```php
<?php

use Phalcon\Mvc\Model\Behaviors\Timestampable;

class Users extends \Phalcon\Mvc\Model
{
    public $id;

    public $name;

    public $created_at;

    public function initialize()
    {
        $this->addBehavior(
            new Timestampable(
                [
                    'beforeCreate' => [
                        'field'  => 'created_at',
                        'format' => 'Y-m-d'
                    ]
                ]
            )
        );
    }
}
```

Additionally to the built in behaviors you can create your own behaviors as well.

#### Relationship aliasing
With this feature you can rename a relationship making your code more readable, have multiple relationships on a table or work easier with namespaces:

```php
class Users extends \Phalcon\Mvc\Model
{
    public $id;

    public $name;

    public $created_at;

    public function initialize()
    {
        // This is a many to one relation, but the table is pluralized,
        // so we add an alias to write more natural code
        $this->belongsTo(
            'profiles_id',
            'Store\Models\Profiles',
            'id',
            [
                'alias' => 'Profile'
            ]
        );
    }
}
```

Then you can use:

```php
$profile = Users::findFirst()->getProfile();
```

#### Help to Testing
This version can be installed from the 0.8.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 0.8.0
sudo ./install
```

All tests are passing on [Travis](https://travis-ci.org/phalcon/cphalcon/builds/3692718), still being an alpha, you should not have major problems with this version. Help us to test and report any bug/problem on [github](http://github.com/phalcon/cphalcon)

Complete [CHANGELOG](https://github.com/phalcon/cphalcon/blob/phalcon-v0.8.0/CHANGELOG) for this version.

Check it out and let us know what you think!

PS: Merry christmas, Happy new year, and thanks for this amazing year!


<3 The Phalcon Team
