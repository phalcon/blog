---
layout: post
title: "Phalcon 1.0.0 beta released"
tags: [php, phalcon, mvc, frameworks, base, release "1.0", "1.x"]
---

We're ​are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:

<!--more-->
### Multi-Level Cache
This new feature ​of the cache component, ​allows ​the developer to implement a multi-level cache​. This new feature is very ​ useful because you can save the same data in several cache​ locations​ with different lifetimes ​, reading ​first from the one with the faster adapter and ending with the slowest one until the data expire​s​:

```php
<?php

$ultraFastFrontend = new Phalcon\Cache\Frontend\Data(
    [
        "lifetime" => 3600
    ]
);

$fastFrontend = new Phalcon\Cache\Frontend\Data(
    [
        "lifetime" => 86400
    ]
);

$slowFrontend = new Phalcon\Cache\Frontend\Data(
    [
        "lifetime" => 604800
    ]
);

// Backends are registered from the fastest to the slower
$cache = new \Phalcon\Cache\Multiple(
    [
        new Phalcon\Cache\Backend\Apc(
            $ultraFastFrontend,
            [
                "prefix" => 'cache',
            ]
        ),
        new Phalcon\Cache\Backend\Memcache(
            $fastFrontend, 
            [
                "prefix" => 'cache',
                "host"   => "localhost",
                "port"   => "11211",
            ]
        ),
        new Phalcon\Cache\Backend\File(
            $slowFrontend,
            [
                "prefix"   => 'cache',
                "cacheDir" => "../app/cache/",
            ]
        )
    ]
);

// Save, saves in every backend
$cache->save('my-key', $data);
```

We're ​are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:

### Multi-Level Cache
This new feature ​of the cache component, ​allows ​the developer to implement a multi-level cache​. This new feature is very  useful because you can save the same data in several cache​ locations​ with different lifetimes, reading ​first from the one with the faster adapter and ending with the slowest one until the data expire​s​:

```php
<?php

$ultraFastFrontend = new Phalcon\Cache\Frontend\Data(
    [
        "lifetime" => 3600
    ]
);

$fastFrontend = new Phalcon\Cache\Frontend\Data(
    [
        "lifetime" => 86400
    ]
);

$slowFrontend = new Phalcon\Cache\Frontend\Data(
    [
        "lifetime" => 604800
    ]
);

// Backends are registered from the fastest to the slower
$cache = new \Phalcon\Cache\Multiple(
    [
        new Phalcon\Cache\Backend\Apc(
            $frontCache, 
            [
                "prefix" => 'cache',
            ]
        ),
        new Phalcon\Cache\Backend\Memcache(
            $fastFrontCache,
            [
                "prefix" => 'cache',
                "host"   => "localhost",
                "port"   => "11211",
            ]
        ),
        new Phalcon\Cache\Backend\File(
            $slowestFrontCache,
            [
                "prefix"   => 'cache',
                "cacheDir" => "../app/cache/"
            ]
        )
    ]
);

// Save, saves in every backend
$cache->save('my-key', $data);

// Read, reads every cache, if one of them return data returns it
$data = $cache->get('my-key');
```

### Volt Improvements
Several volt improvements are introduced in this version:

```php
{% raw %}
{# Ternary operator #}
{{ total > 0 ? total|format('%0.2f') : '0.0' }}

{# For-Else clause #}
{% for robot in robots %}
    {{ robot.name }}
{% else %}
    There are no robots
{% endfor %}

{# Loop-Context #}
<table>
{% for robot in robots %}
    {% if loop.first %}
        <thead>
            <tr>
                <th>Position</th>
                <th>Id</th>
                <th>Name</th>
            </tr>
        </thead>ae
        <tbody>
    {% endif %}
    <tr>
        <th>{{ loop.index }}</th>
        <th>{{ robot.id }}</th>
        <th>{{ robot.name }}</th>
    </tr>
    {% if loop.last %}
        <tbody>
    {% endif %}
{% endfor %}
</table>

{# Space control delimiters #}
<ul>
    {%- for robot in robots -%}
    <li>  {{- robot.name -}}</li>
    {%- endfor %}
</ul>
{% endraw %}
```

### Vertical/Horizontal Sharding Improvements
Now you can define a define a different connection to read from a model and a different one ​ for write​. This is especially beneficial when dealing with master/slave configurations in a RDBMS​:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function initialize()
    {
        $this->setReadConnectionService('dbSlave');
        $this->setWriteConnectionService('dbMaster');
    }
}
```

Horizontal sharding implies that the connection to read is selected according to the data that will be queried:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function selectReadConnection($intermediate, $bindParams, $bindTypes)
    {
        // Check if there is a 'where' clause in the select
        if (isset($intermediate['where'])) {

            $conditions = $intermediate['where'];

            // Choose the possible shard according to the conditions
            if ($conditions['left']['name'] == 'id') {
                $id = $conditions['right']['value'];
                if ($id > 0 && $id < 10000) {
                    return $this->getDI()->get('dbShard1');
                }
                if ($id > 10000) {
                    return $this->getDI()->get('dbShard2');
                }
            }
        }

        // Use a default shard
        return $this->getDI()->get('dbShard0');
    }
}
```

### Record Snapshots
With this new feature, specific models could be set to maintain a record snapshot when they're queried. You can use this feature to implement auditing or just to know what fields are changed according to the data queried from the persistence:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function initialize()
    {
        $this->keepSnapshots(true);
    }
}
```

This way you can check what fields changed:

```php
$robot       = new Robots();
$robot->name = 'Other name';
var_dump($robot->getChangedFields()); // ['name']
var_dump($robot->hasChanged('name')); // true
var_dump($robot->hasChanged('type')); // false
```

### Dynamic Update
This feature allows to set up the ORM to create SQL UPDATE statements with just the fields that changed instead of the full all-field SQL update. In some cases this could improve the performance by reducing the traffic between the application and the database server:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function initialize()
    {
        $this->useDynamicUpdate(true);
    }
}
```

### Validation
`Phalcon\Validation` is an independent validation component based on the validation system implemented in the ORM and the ODM. This component can be used to implement validation rules that does not belong to a model or collection:

```php
$validation = new Phalcon\Validation();

$validation
    ->add(
        'name',
        new PresenceOf(
            [
                'message' => 'The name is required'
            ]
        )
    )
    ->add(
        'name',
         new StringLength(
            [
                'min'            => 5,
                'minimumMessage' => 'The name is too short'
            ]
        )
    )
    ->add(
        'email',
        new PresenceOf(
            [
                'message' => 'The email is required'
            ]
        )
    )
    ->add(
        'email',
        new Email(
            [
                'message' => 'The email is not valid'
            ]
        )
    )
    ->add(
        'login',
        new PresenceOf(
            [
                'message' => 'The login is required'
            ]
        )
    );

$messages = $validation->validate($_POST);
if (count($messages)) {
    foreach ($messages as $message) {
        echo $message;
    }
} 
```

1.0.0 includes other minor changes, bug fixes and stability improvements. You can see the complete [CHANGELOG](https://github.com/phalcon/cphalcon/blob/1.0.0/CHANGELOG)\> here.

### Help with Testing
This version can be installed from the 1.0.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 1.0.0
sudo ./install
```

Windows users can [download](https://phalconphp.com/download) DLLs from the download page.​​

We ​welcome your comments regarding this new release in [Phosphorum](https://forum.phalconphp.com/) or [Stack Overflow](http://stackoverflow.com/questions/tagged/phalcon). If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.

Thanks!


<3 The Phalcon Team
