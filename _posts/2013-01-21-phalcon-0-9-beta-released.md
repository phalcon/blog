---
layout: post
title: "Phalcon 0.9 beta released"
tags: [php, phalcon, release, beta, "0.9", "0.x"]
---
We are happy to announce the release of Phalcon 0.9.0 Beta. This new release follows our roadmap, introducing features mostly requested by our community. We thank everyone that has been involved by providing input and helping with testing and finding bugs.

<!--more-->
**Getting/Saving records with Magic Properties**
It is now easier to obtain records related to a current model in the [ORM](https://docs.phalcon.io/latest/en/db-models), by simply accessing a property with the same alias of the relationship (the relationship has to be set up first in the models):

```php
<?php

// Get a song
$song = Songs::findFirst(100);

// Get the album name
// Note we are accessing the Album relationship of the song 
echo $song->album->name;

// Find an album 
$album = Albums::findFirst(70);

// Print all songs related to an album
foreach ($album->songs as $song) {
    echo $song->name;    
}

// Delete all the songs related to the album
$album->songs->delete();
```

Magic properties can also be used to store model instances and their related relations:

```php
<?php

// Create an artist
$artist          = new Artists();
$artist->name    = 'Shinichi Osawa';
$artist->country = 'Japan';

// Create an album
$album         = new Albums();
$album->name   = 'The One';
$album->artist = $artist; // Assign the artist
$album->year   = 2008;

// Save the album and the artist at the same time
// This saves as a transaction so if anything goes wrong with 
// saving the related records, the parent will not saved either
// Messages are passed back to the user for information regarding
// any errors
$album->save();
```

Also has-many relations are supported:

```php
<?php

// Get an existing artist
$artist = Artists::findFirst('name = "Röyksopp"');

// Get an album
$album         = new Albums();
$album->name   = 'Junior';
$album->artist = $artist;

$songs = array();

// Create a first song
$songs[0]           = new Songs();
$songs[0]->name     = 'Happy up Here';
$songs[0]->duration = '2:44';

// Create a second song
$songs[1]           = new Songs();
$songs[1]->name     = 'The Girl and the Robot';
$songs[1]->duration = '4:29';

// Assign the songs array
$album->songs = $songs;

// Save the album + its songs
$album->save();
```

**Priorities in the Events component**
The [Events](https://docs.phalcon.io/latest/en/events) component is now supporting priorities. With this feature you can attach listeners indicating the order in which they must be called.

```php
<?php

$evManager->attach('db', new DbListener(), 150); // More priority
$evManager->attach('db', new DbListener(), 100); // Normal priority
$evManager->attach('db', new DbListener(), 50);  // Less priority
```

**Annotations**
Addressing another request from the community, we begun implementing annotations. This is yet another first for Phalcon! It is the first time that an annotations parser component is written in C for the PHP world. 

**Phalcon\\Annotations** is a general purpose component that provides ease of parsing and caching annotations in PHP classes to be used in applications.

Let's pretend we've the following controller and the developer wants to create a plugin to automatically start the cache if the latest action executed is marked as cacheable:

```php
<?php
 
class NewsController extends \Phalcon\Mvc\Controller
{
    public function indexAction()
    {
 
    }
 
    /**
     * @Cache(lifetime=86400)
     */
    public function showAction($slug)
    {
        $this->view->article = Article::findFirstByTitle($slug);
    }
}
```

We setup the dispatch service to send events to an events manager:

```php
<?php

$eventsManager = new \Phalcon\Events\Manager();
 
// Attach the plugin to 'dispatch' events
$eventsManager->attach('dispatch', new CacheEnablerPlugin());
 
// Setup the dispatcher service to send events to an events manager
$di->set(
    'dispatcher',
    function () use ($eventsManager) {
        $dispatcher = new \Phalcon\Mvc\Dispatcher();
        $dispatcher->setEventsManager($eventsManager);
        return $dispatcher;
    }
);
```

The `CacheEnablerPlugin` enables the cache in the view if the method implements the annotation called `Cache`:

```php
<?php
 
class CacheEnablerPlugin extends \Phalcon\Mvc\User\Plugin
{
    public function beforeExecuteRoute($event, $dispatcher)
    {
         // Get the method annotations
        $annotations = $this->annotations->getMethod(
            $dispatcher->getActiveController(),
            $dispatcher->getActiveMethod()
        );
 
        // Check if the method had implemented an annotation 'Cache'
        if ($annotations->has('Cache')) {
 
            // Get the lifetime parameter
            $lifetime = $annotations->get('Cache')
                                    ->getNamedParameter('lifetime');
            
            // Enable the cache
            $this->view->cache(array('lifetime' => $lifetime));
        }
 
    }
}
```

Check the complete example [here](https://gist.github.com/4544542)

`Phalcon\Annotations` also allows the implementation of annotations in different components (not only for the view).

**Routing based on Annotations**
Taking advantage of the new annotations component we're introducing a variant of the standard router that reads routes from the annotations in the controller then adding them to the router. This allows for a simpler management of projects with multiple and more complex routes, since your routing table is "attached" to the respective controller also making the code a lot easier to read.:

Let's pretend we've the following controller:

```php
<?php

namespace MyApi\Controllers\Users;
 
/**
 * @RoutePrefix("/robots")
 */
class UsersController extends Phalcon\Mvc\Controller
{
    /**
     * @Get("/")
     */
    public function indexAction()
    {
        //...
    }
 
    /**
     * @Get("/find/{id:[0-9]+}", name="find-user")
     */
    public function findAction($id)
    {
        //...
    }
 
    /**
     * @Route("/save", methods={"POST", "PUT"}, name="save-user")
     */
    public function saveAction()
    {
        //...
    }

    /**
     * @Delete("/delete/{id:[0-9]+}")
     */
    public function removeAction($id)
    {
        //...
    }
}
```

The annotations router must be used:

```php
<?php

$di->set(
    'router',
    function () {
        
        // Use the annotations router
        $router = new \Phalcon\Mvc\Router\Annotations(false);
             
        // Read the annotations in MyApi\Controllers\Users    
        // if the uri starts with /api/users
        $router->addResource('Api\Controllers\Users', '/api/users');
        
        // Read the annotations in MySite\Controllers\Blog    
        // if the uri starts with /blog
        $router->addResource('Web\Controllers\Blog', '/blog');
        
        return $router;
    }
);
```

This version also fixes bugs and add some minor improvements. Check the complete changelog for this version [here](https://github.com/phalcon/cphalcon/blob/phalcon-v0.9.0/CHANGELOG).

**Help with Testing**
This version can be installed from the 0.9.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 0.9.0
sudo ./install
```

Windows users can [download](https://phalcon.io/download) a DLL from the download page.

All tests are passing on [Travis](https://travis-ci.org/phalcon/cphalcon), so there should not be any major issues with this version. Please help us test and report any bugs or problems on [Github](https://github.com/phalcon/cphalcon/issues). If you have any questions about functionality, feel free to ask either in [Stack Overflow](http://stackoverflow.com/questions/tagged/phalcon) or in our [Google Group](https://groups.google.com/forum/#!forum/phalcon).


<3 The Phalcon Team
