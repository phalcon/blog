---
layout: post
title: "Phalcon IDE Stubs Repository"
date: 2017-04-11T16:23:19.160Z
tags: 
  - php
  - phalcon
  - phalcon3
  - stubs
  - ide
---

Hey everyone!!

As part of our restructuring and working towards a better more robust framework in terms of features as well as organization, we have removed the IDE stubs from the [Phalcon DevTools](https://github.com/phalcon/phalcon-devtools/) repository and moved to its own repository.

Since Phalcon is a module that is loaded in memory and always available, there is no way for an IDE such as PHPStorm to interrogate the sources of the framework and offer autocomplete features for namespaces, classes, methods etc.

To work around this issue, the Phalcon team has been generating IDE stubs that can be used with such IDEs.

<!--more-->
You can now find those stubs in Packagist:

[https://packagist.org/packages/phalcon/ide-stubs](https://packagist.org/packages/phalcon/ide-stubs)

The installation is extremely simple. 

#### Composer
Install Composer in a common location or in your project:

```bash
curl -s http://getcomposer.org/installer | php
```

Create the composer.json file as follows:

```json
{
    "require-dev": {
        "phalcon/ide-stubs": "*"
    }
}
```

Run the composer installer:

```bash
php composer.phar install
```

#### Git
Clone the Phalcon IDE Stubs repository in a location of your choosing.
```bash
git clone https://github.com/phalcon/ide-stubs.git
```

#### Setup your IDE.
For PHPStorm users, you can:
 
- Right mouse click on the `External Libraries` in the Project listing pane
- Click `Configure PHP Include Paths`
- Click the green `+` button and click `Specify Other...`
- Navigate to the folder where the stubs are located
- Click the `Phalcon` folder and click `OK`
- Click `Apply` and then `OK`

<iframe width="560" height="315" src="https://www.youtube.com/embed/UbUx_6Cs6r4" frameborder="0" allowfullscreen></iframe>

<h5 class="alert alert-danger">
Note: The video above shows how to enable the IDE stubs cloning the DevTools. The installation is the same, all you have to do is locate the <code>Phalcon</code> project 
</h5>


<3 Phalcon Team

