---
layout: post
title: 2019 June - Status Update
date: 2019-06-01T16:04:08.692Z
tags:
  - phalcon4
  - phalcon
  - update
---
Happy June everyone and TGIW (Thank God it is the Weekend!)
<!--more-->

A quick update on where we are thus far on v4 and a summary from our hangout last week.

### TL;DR
- Thank you to the community ([@SidRoberts](https://github.com/SidRoberts), [@ekmst](https://github.com/ekmst), [@zsilbi](https://github.com/zsilbi), [@emiliodeg](https://github.com/emiliodeg) and many others
- Enhancements, cleanup, tests, optimizations and bugs
- 7 open PRs
- 92 open issues
- Project
    - 5 Todo Cards
    - 7 In Progress
    - 468 Done
    - ~72.00% code coverage (+7 since v3)
- 4.0.0.alpha.5
- Factories

### Zephir
- Optimizations
- Work on local memory management (WIP). This will allow for speed as well as introduction of asynchronous processing, co-routines (see `yield` in PHP)

### Translations - Documentation
- Huge thanks to all of our translators as well as [Crowdin](https://crowdin.com) for offering us this excellent platform to perform the translations.
- [https://crowdin.com/project/phalcon-documentation](https://crowdin.com/project/phalcon-documentation)

### Devtools
- [@Jeckerson](https://github.com/Jeckerson) leading the effort.
- Fixed 2 bugs, 2 more left to make possible to close 3.4.x 
- Created sandbox for daily builds [https://gitlab.com/phalcon-php/docker/pipelines](https://gitlab.com/phalcon-php/docker/pipelines) 
- Docker images for Phalcon [https://gitlab.com/phalcon-php/docker/blob/master/.gitlab-ci.yml](https://gitlab.com/phalcon-php/docker/blob/master/.gitlab-ci.yml) 
- Working on separation of builds
    - make each repository for each separate part, like _All related with Ubuntu_, or 
    - separate by PHP version like it's done with Circle CI on github
    - or make all inside single repository, inside single .gitlab-ci.yml

### v4.0.0.alpha.5
#### Summary
- `Cache` PSR-16 - full rewrite
- `Crypt` - Removed insecure algos (des/rc2/rc4 etc.), Added Auth Data for `gcm`/`ccm`
- `Helper\Arr` - more methods
- `Helper\Str` - more methods
- `Html\Attributes` - Forms
- `Storage\Adapter` - `Apcu`, `Libmemcached`, `Memory`, `Redis`
- `Storage\Serializer` - `Base64`, `Igbinary`, `Json`, `Msgpack`, `None`, `Php`
- Validation\Validator\Url - accepts parameters FILTER_FLAG_PATH_REQUIRED, etc
- View - toString()

#### Fixed
A lot of stuff

#### Removed
- Old Cache classes - `Backend`/`Frontend`
- `View::cache` - no caching in the view from the framework
- `Metadata\Session` - incompatible
- `Image\Gd` - incompatible PHP5 code
- `Model` : namespace aliases

#### Statistics
- 605 Commits, 6,264 files changed
- High: 1, Med: 6, Low: 3, NFR: 4, Tests: 4, Enhancements: 37

### PSR-16
#### Cache
- Cache
- Adapter - `Apcu`, `Libmemcached`, `Memory`, `Redis`
#### Storage
- Adapter - `Apcu`, `Libmemcached`, `Memory`, `Redis`
- Serializer - `Base64`, `Igbinary`, `Json`, `Msgpack`, `None`, `Php`

```pho
// Adapter options
$options = $this->config->libmemcached->toArray();

$serializer = new SerializerFactory();
$factory    = new AdapterFactory($serializer);

// Construct the Cache
$cache = new Libmemcached($factory, $options);

$factory = new CacheFactory(
    new AdapterFactory(
        new SerializerFactory()
    )
)
// Using the factory
$cache = $factory->newInstance(“libmemcached”, $options);
```
### Factories
Creating objects within objects is never a good idea. It makes testing that much more difficult while it could introduce errors or even architectural blocks, hindering maintenance and extensibility.

```php
class User
{
    private $perm;

    public function __construct()
    {
        $this->perm = new Permissions();
    }
    public function run()
    {
        echo $this
            ->perm
            ->render();
    }
}
```
Using a factory instead

```php
class User
{
    private $permFactory;

    public function __construct(
        PermissionsFactory $factory
    ) {
        $this->permFactory = $factory;
    }
    public function run()
    {
        echo $this
            ->permFactory
            ->newInstance()
            ->render();
    }
}
```

The example above shows how Phalcon has been restructured to allow for factory classes to create instances of objects needed. Wherever possible, these factories implement the Mapper pattern and they all lazy load objects to maintain performance. 

#### Factories available
- Annotations
    - AnnotationsFactory
- Cache
    - AdapterFactory
    - CacheFactory
- Db/Adapter
    - PdoFactory
- Image
    - ImageFactory
- Paginator
    - PaginatorFactory
- Translate
    - InterpolatorFactory
    - TranslateFactory
- Validation
    - ValidatorFactory

Example for setting up `modelsMetadata`:
```php
$this->container->set(
    'modelsMetadata',
    function () {
        $options     = $this->config->libmemcached->toArray();
        $serializer  = new SerializerFactory();
        $factory     = new AdapterFactory($serializer);

        return new Libmemcached($factory, $options);
    }
);
```
### Community
- [https://github.com/phalcon/cphalcon/graphs/contributors](https://github.com/phalcon/cphalcon/graphs/contributors)
- Forum: [https://phalcon.link/forum](https://phalcon.link/forum)
- Discord: [https://phalcon.link/discord](https://phalcon.link/discord)
- Telegram: [https://phalcon.link/telegram](https://phalcon.link/telegram)
- Gab: [https://phalcon.link/gab](https://phalcon.link/gab)
- MeWe: [https://phalcon.link/mewe](https://phalcon.link/mewe)
- Stack Overflow: [https://phalcon.link/so](https://phalcon.link/so)
- Facebook: [https://phalcon.link/fb](https://phalcon.link/fb)
- Twitter: [https://phalcon.link/t](https://phalcon.link/t)

<3 Phalcon Team
