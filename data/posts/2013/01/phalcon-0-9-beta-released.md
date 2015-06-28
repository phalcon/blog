<!--
slug: phalcon-0-9-beta-released
date: Mon Jan 21 2013 14:55:00 GMT-0500 (EST)
tags: php, phalcon, release
title: Phalcon 0.9 beta released
id: 41126616624
link: http://blog.phalconphp.com/post/41126616624/phalcon-0-9-beta-released
raw: {"blog_name":"phalconphp","id":41126616624,"post_url":"http://blog.phalconphp.com/post/41126616624/phalcon-0-9-beta-released","slug":"phalcon-0-9-beta-released","type":"text","date":"2013-01-21 19:55:00 GMT","timestamp":1358798100,"state":"published","format":"html","reblog_key":"NpkjoVfG","tags":["php","phalcon","release"],"short_url":"http://tmblr.co/Z6PumvcJLbum","highlighted":[],"note_count":1,"title":"Phalcon 0.9 beta released","body":"<p>We are happy to announce the release of Phalcon 0.9.0 Beta. This new release follows our roadmap, introducing features mostly requested by our community. We thank everyone that has been involved by providing input and helping with testing and finding bugs.</p>\n<p><strong>Getting/Saving records with Magic Properties</strong></p>\n<p>It is now easier to obtain records related to a current model in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>, by simply accessing a property with the same alias of the relationship (the relationship has to be set up first in the models):</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n// Get a song\n$song = Songs::findFirst(100);\n\n// Get the album name\n// Note we are accessing the Album relationship of the song \necho $song-&gt;album-&gt;name;\n\n// Find an album \n$album = Albums::findFirst(70);\n\n// Print all songs related to an album\nforeach ($album-&gt;songs as $song) {\n\techo $song-&gt;name;\t\n}\n\n// Delete all the songs related to the album\n$album-&gt;songs-&gt;delete();\n</pre>\n<p>Magic properties can also be used to store model instances and their related relations:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n// Create an artist\n$artist = new Artists();\n$artist-&gt;name = 'Shinichi Osawa';\n$artist-&gt;country = 'Japan';\n\n// Create an album\n$album = new Albums();\n$album-&gt;name = 'The One';\n$album-&gt;artist = $artist; //Assign the artist\n$album-&gt;year = 2008;\n\n// Save the album and the artist at the same time\n// This saves as a transaction so if anything goes wrong with \n// saving the related records, the parent will not saved either\n// Messages are passed back to the user for information regarding\n// any errors\n$album-&gt;save();\n</pre>\n<p>Also has-many relations are supported:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n// Get an existing artist\n$artist = Artists::findFirst('name = \"Röyksopp\"');\n\n// Get an album\n$album = new Albums();\n$album-&gt;name = 'Junior';\n$album-&gt;artist = $artist;\n\n$songs = array();\n\n// Create a first song\n$songs[0] = new Songs();\n$songs[0]-&gt;name = 'Happy up Here';\n$songs[0]-&gt;duration = '2:44';\n\n// Create a second song\n$songs[1] = new Songs();\n$songs[1]-&gt;name = 'The Girl and the Robot';\n$songs[1]-&gt;duration = '4:29';\n\n// Assign the songs array\n$album-&gt;songs = $songs;\n\n// Save the album + its songs\n$album-&gt;save();\n</pre>\n<p><strong>Priorities in the Events component</strong></p>\n<p>The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">Events</a> component is now supporting priorities. With this feature you can attach listeners indicating the order in which they must be called.</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$evManager-&gt;attach('db', new DbListener(), 150); //More priority\n$evManager-&gt;attach('db', new DbListener(), 100); //Normal priority\n$evManager-&gt;attach('db', new DbListener(), 50); //Less priority\n</pre>\n<p><strong>Annotations</strong></p>\n<p>Addressing another request from the community, we begun implementing annotations. This is yet another first for Phalcon! It is the first time that an annotations parser component is written in C for the PHP world. <strong>Phalcon\\Annotations</strong> is a general purpose component that provides ease of parsing and caching annotations in PHP classes to be used in applications.</p>\n<p>Let&rsquo;s pretend we&rsquo;ve the following controller and the developer wants to create a plugin to automatically start the cache if the latest action executed is marked as cacheable:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n \nclass NewsController extends \\Phalcon\\Mvc\\Controller\n{\n \n    public function indexAction()\n    {\n \n    }\n \n    /**\n     * @Cache(lifetime=86400)\n     */\n    public function showAction($slug)\n    {\n        $this-&gt;view-&gt;article = Article::findFirstByTitle($slug);\n    }\n \n}\n</pre>\n<p>We setup the dispatch service to send events to an events manager:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$eventsManager = new \\Phalcon\\Events\\Manager();\n \n//Attach the plugin to 'dispatch' events\n$eventsManager-&gt;attach('dispatch', new CacheEnablerPlugin());\n \n// Setup the dispatcher service to send events to an events manager\n$di-&gt;set('dispatcher', function () use ($eventsManager) {\n\t$dispatcher = new \\Phalcon\\Mvc\\Dispatcher();\n\t$dispatcher-&gt;setEventsManager($eventsManager);\n\treturn $dispatcher;\n});\n</pre>\n<p>The &lsquo;CacheEnablerPlugin&rsquo; enables the cache in the view if the method implements the annotation called 'Cache&rsquo;:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n \nclass CacheEnablerPlugin extends \\Phalcon\\Mvc\\User\\Plugin\n{\n \n    public function beforeExecuteRoute($event, $dispatcher)\n    {\n \n        //Get the method annotations\n        $annotations = $this-&gt;annotations-&gt;getMethod(\n            $dispatcher-&gt;getActiveController(),\n            $dispatcher-&gt;getActiveMethod()\n        );\n \n        //Check if the method had implemented an annotation 'Cache'\n        if ($annotations-&gt;has('Cache')) {\n \n            //Get the lifetime parameter\n            $lifetime = $annotations-&gt;get('Cache')-&gt;getNamedParameter('lifetime');\n \n            //Enable the cache\n            $this-&gt;view-&gt;cache(array('lifetime' =&gt; $lifetime));\n        }\n \n    }\n \n}\n</pre>\n<p>Check the complete example <a href=\"https://gist.github.com/4544542\">here</a></p>\n<p>Phalcon\\Annotations also allows the implementation of annotations in different components (not only for the view).</p>\n<p><strong>Routing based on Annotations</strong></p>\n<p>Taking advantage of the new annotations component we&rsquo;re introducing a variant of the standard router that reads routes from the annotations in the controller then adding them to the router. This allows for a simpler management of projects with multiple and more complex routes, since your routing table is &ldquo;attached&rdquo; to the respective controller also making the code a lot easier to read.:</p>\n<p>Let&rsquo;s pretend we&rsquo;ve the following controller:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nnamespace MyApi\\Controllers\\Users;\n \n/**\n * @RoutePrefix(\"/robots\")\n */\nclass UsersController extends Phalcon\\Mvc\\Controller\n{\n \n\t/**\n\t * @Get(\"/\")\n\t */\n\tpublic function indexAction()\n\t{\n \t\t//...\n\t}\n \n\t/**\n\t * @Get(\"/find/{id:[0-9]+}\", name=\"find-user\")\n\t */\n\tpublic function findAction($id)\n\t{\n \t\t//...\n\t}\n \n\t/**\n\t * @Route(\"/save\", methods={\"POST\", \"PUT\"}, name=\"save-user\")\n\t */\n\tpublic function saveAction()\n\t{\n \t\t//...\n\t}\n\n\t/**\n\t * @Delete(\"/delete/{id:[0-9]+}\")\n\t */\n\tpublic function removeAction($id)\n\t{\n \t\t//...\n\t}\n \n}\n</pre>\n<p>The annotations router must be used:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$di-&gt;set('router', function () {\n\n\t//Use the annotations router\n\t$router = new \\Phalcon\\Mvc\\Router\\Annotations(false);\n\t\t\t \n\t//Read the annotations in MyApi\\Controllers\\Users <br/><span>\t//</span>if the uri starts with /api/users\n\t$router-&gt;addResource('Api\\Controllers\\Users', '/api/users');\n\n\t//Read the annotations in MySite\\Controllers\\Blog <br/><span>\t//</span>if the uri starts with /blog\n\t$router-&gt;addResource('Web\\Controllers\\Blog', '/blog');\n\t \n\treturn $router;\n});\n</pre>\n<p>This version also fixes bugs and add some minor improvements. Check the complete changelog for this version <a href=\"https://github.com/phalcon/cphalcon/blob/0.9.0/CHANGELOG\">here</a>.</p>\n<p><strong>Help with Testing</strong></p>\n<p>This version can be installed from the 0.9.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 0.9.0\nsudo ./install</pre>\n<p>Windows users can <a href=\"http://phalconphp.com/download\">download</a> a DLL from the download page.</p>\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon\">Travis</a>, so there should not be any major issues with this version. Please help us test and report any bugs or problems on <a href=\"https://github.com/phalcon/cphalcon/issues\">Github</a>. If you have any questions about functionality, feel free to ask either in <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or in our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>.</p>","reblog":{"tree_html":"","comment":"<p>We are happy to announce the release of Phalcon 0.9.0 Beta. This new release follows our roadmap, introducing features mostly requested by our community. We thank everyone that has been involved by providing input and helping with testing and finding bugs.</p>\n<p><strong>Getting/Saving records with Magic Properties</strong></p>\n<p>It is now easier to obtain records related to a current model in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>, by simply accessing a property with the same alias of the relationship (the relationship has to be set up first in the models):</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n// Get a song\n$song = Songs::findFirst(100);\n\n// Get the album name\n// Note we are accessing the Album relationship of the song \necho $song-&gt;album-&gt;name;\n\n// Find an album \n$album = Albums::findFirst(70);\n\n// Print all songs related to an album\nforeach ($album-&gt;songs as $song) {\n\techo $song-&gt;name;\t\n}\n\n// Delete all the songs related to the album\n$album-&gt;songs-&gt;delete();\n</pre>\n<p>Magic properties can also be used to store model instances and their related relations:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n// Create an artist\n$artist = new Artists();\n$artist-&gt;name = 'Shinichi Osawa';\n$artist-&gt;country = 'Japan';\n\n// Create an album\n$album = new Albums();\n$album-&gt;name = 'The One';\n$album-&gt;artist = $artist; //Assign the artist\n$album-&gt;year = 2008;\n\n// Save the album and the artist at the same time\n// This saves as a transaction so if anything goes wrong with \n// saving the related records, the parent will not saved either\n// Messages are passed back to the user for information regarding\n// any errors\n$album-&gt;save();\n</pre>\n<p>Also has-many relations are supported:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n// Get an existing artist\n$artist = Artists::findFirst('name = \"R&ouml;yksopp\"');\n\n// Get an album\n$album = new Albums();\n$album-&gt;name = 'Junior';\n$album-&gt;artist = $artist;\n\n$songs = array();\n\n// Create a first song\n$songs[0] = new Songs();\n$songs[0]-&gt;name = 'Happy up Here';\n$songs[0]-&gt;duration = '2:44';\n\n// Create a second song\n$songs[1] = new Songs();\n$songs[1]-&gt;name = 'The Girl and the Robot';\n$songs[1]-&gt;duration = '4:29';\n\n// Assign the songs array\n$album-&gt;songs = $songs;\n\n// Save the album + its songs\n$album-&gt;save();\n</pre>\n<p><strong>Priorities in the Events component</strong></p>\n<p>The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">Events</a> component is now supporting priorities. With this feature you can attach listeners indicating the order in which they must be called.</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$evManager-&gt;attach('db', new DbListener(), 150); //More priority\n$evManager-&gt;attach('db', new DbListener(), 100); //Normal priority\n$evManager-&gt;attach('db', new DbListener(), 50); //Less priority\n</pre>\n<p><strong>Annotations</strong></p>\n<p>Addressing another request from the community, we begun implementing annotations. This is yet another first for Phalcon! It is the first time that an annotations parser component is written in C for the PHP world. <strong>Phalcon\\Annotations</strong> is a general purpose component that provides ease of parsing and caching annotations in PHP classes to be used in applications.</p>\n<p>Let&rsquo;s pretend we&rsquo;ve the following controller and the developer wants to create a plugin to automatically start the cache if the latest action executed is marked as cacheable:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n \nclass NewsController extends \\Phalcon\\Mvc\\Controller\n{\n \n    public function indexAction()\n    {\n \n    }\n \n    /**\n     * @Cache(lifetime=86400)\n     */\n    public function showAction($slug)\n    {\n        $this-&gt;view-&gt;article = Article::findFirstByTitle($slug);\n    }\n \n}\n</pre>\n<p>We setup the dispatch service to send events to an events manager:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$eventsManager = new \\Phalcon\\Events\\Manager();\n \n//Attach the plugin to 'dispatch' events\n$eventsManager-&gt;attach('dispatch', new CacheEnablerPlugin());\n \n// Setup the dispatcher service to send events to an events manager\n$di-&gt;set('dispatcher', function () use ($eventsManager) {\n\t$dispatcher = new \\Phalcon\\Mvc\\Dispatcher();\n\t$dispatcher-&gt;setEventsManager($eventsManager);\n\treturn $dispatcher;\n});\n</pre>\n<p>The &lsquo;CacheEnablerPlugin&rsquo; enables the cache in the view if the method implements the annotation called 'Cache&rsquo;:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n \nclass CacheEnablerPlugin extends \\Phalcon\\Mvc\\User\\Plugin\n{\n \n    public function beforeExecuteRoute($event, $dispatcher)\n    {\n \n        //Get the method annotations\n        $annotations = $this-&gt;annotations-&gt;getMethod(\n            $dispatcher-&gt;getActiveController(),\n            $dispatcher-&gt;getActiveMethod()\n        );\n \n        //Check if the method had implemented an annotation 'Cache'\n        if ($annotations-&gt;has('Cache')) {\n \n            //Get the lifetime parameter\n            $lifetime = $annotations-&gt;get('Cache')-&gt;getNamedParameter('lifetime');\n \n            //Enable the cache\n            $this-&gt;view-&gt;cache(array('lifetime' =&gt; $lifetime));\n        }\n \n    }\n \n}\n</pre>\n<p>Check the complete example <a href=\"https://gist.github.com/4544542\">here</a></p>\n<p>Phalcon\\Annotations also allows the implementation of annotations in different components (not only for the view).</p>\n<p><strong>Routing based on Annotations</strong></p>\n<p>Taking advantage of the new annotations component we&rsquo;re introducing a variant of the standard router that reads routes from the annotations in the controller then adding them to the router. This allows for a simpler management of projects with multiple and more complex routes, since your routing table is &ldquo;attached&rdquo; to the respective controller also making the code a lot easier to read.:</p>\n<p>Let&rsquo;s pretend we&rsquo;ve the following controller:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nnamespace MyApi\\Controllers\\Users;\n \n/**\n * @RoutePrefix(\"/robots\")\n */\nclass UsersController extends Phalcon\\Mvc\\Controller\n{\n \n\t/**\n\t * @Get(\"/\")\n\t */\n\tpublic function indexAction()\n\t{\n \t\t//...\n\t}\n \n\t/**\n\t * @Get(\"/find/{id:[0-9]+}\", name=\"find-user\")\n\t */\n\tpublic function findAction($id)\n\t{\n \t\t//...\n\t}\n \n\t/**\n\t * @Route(\"/save\", methods={\"POST\", \"PUT\"}, name=\"save-user\")\n\t */\n\tpublic function saveAction()\n\t{\n \t\t//...\n\t}\n\n\t/**\n\t * @Delete(\"/delete/{id:[0-9]+}\")\n\t */\n\tpublic function removeAction($id)\n\t{\n \t\t//...\n\t}\n \n}\n</pre>\n<p>The annotations router must be used:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$di-&gt;set('router', function () {\n\n\t//Use the annotations router\n\t$router = new \\Phalcon\\Mvc\\Router\\Annotations(false);\n\t\t\t \n\t//Read the annotations in MyApi\\Controllers\\Users <br><span>\t//</span>if the uri starts with /api/users\n\t$router-&gt;addResource('Api\\Controllers\\Users', '/api/users');\n\n\t//Read the annotations in MySite\\Controllers\\Blog <br><span>\t//</span>if the uri starts with /blog\n\t$router-&gt;addResource('Web\\Controllers\\Blog', '/blog');\n\t \n\treturn $router;\n});\n</pre>\n<p>This version also fixes bugs and add some minor improvements. Check the complete changelog for this version <a href=\"https://github.com/phalcon/cphalcon/blob/0.9.0/CHANGELOG\">here</a>.</p>\n<p><strong>Help with Testing</strong></p>\n<p>This version can be installed from the 0.9.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 0.9.0\nsudo ./install</pre>\n<p>Windows users can <a href=\"http://phalconphp.com/download\">download</a> a DLL from the download page.</p>\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon\">Travis</a>, so there should not be any major issues with this version. Please help us test and report any bugs or problems on <a href=\"https://github.com/phalcon/cphalcon/issues\">Github</a>. If you have any questions about functionality, feel free to ask either in <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or in our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>.</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"41126616624"},"content":"<p>We are happy to announce the release of Phalcon 0.9.0 Beta. This new release follows our roadmap, introducing features mostly requested by our community. We thank everyone that has been involved by providing input and helping with testing and finding bugs.</p>\n<p><strong>Getting/Saving records with Magic Properties</strong></p>\n<p>It is now easier to obtain records related to a current model in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>, by simply accessing a property with the same alias of the relationship (the relationship has to be set up first in the models):</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n// Get a song\n$song = Songs::findFirst(100);\n\n// Get the album name\n// Note we are accessing the Album relationship of the song \necho $song->album->name;\n\n// Find an album \n$album = Albums::findFirst(70);\n\n// Print all songs related to an album\nforeach ($album->songs as $song) {\n\techo $song->name;\t\n}\n\n// Delete all the songs related to the album\n$album->songs->delete();\n</pre>\n<p>Magic properties can also be used to store model instances and their related relations:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n// Create an artist\n$artist = new Artists();\n$artist->name = 'Shinichi Osawa';\n$artist->country = 'Japan';\n\n// Create an album\n$album = new Albums();\n$album->name = 'The One';\n$album->artist = $artist; //Assign the artist\n$album->year = 2008;\n\n// Save the album and the artist at the same time\n// This saves as a transaction so if anything goes wrong with \n// saving the related records, the parent will not saved either\n// Messages are passed back to the user for information regarding\n// any errors\n$album->save();\n</pre>\n<p>Also has-many relations are supported:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n// Get an existing artist\n$artist = Artists::findFirst('name = \"Röyksopp\"');\n\n// Get an album\n$album = new Albums();\n$album->name = 'Junior';\n$album->artist = $artist;\n\n$songs = array();\n\n// Create a first song\n$songs[0] = new Songs();\n$songs[0]->name = 'Happy up Here';\n$songs[0]->duration = '2:44';\n\n// Create a second song\n$songs[1] = new Songs();\n$songs[1]->name = 'The Girl and the Robot';\n$songs[1]->duration = '4:29';\n\n// Assign the songs array\n$album->songs = $songs;\n\n// Save the album + its songs\n$album->save();\n</pre>\n<p><strong>Priorities in the Events component</strong></p>\n<p>The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">Events</a> component is now supporting priorities. With this feature you can attach listeners indicating the order in which they must be called.</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n$evManager->attach('db', new DbListener(), 150); //More priority\n$evManager->attach('db', new DbListener(), 100); //Normal priority\n$evManager->attach('db', new DbListener(), 50); //Less priority\n</pre>\n<p><strong>Annotations</strong></p>\n<p>Addressing another request from the community, we begun implementing annotations. This is yet another first for Phalcon! It is the first time that an annotations parser component is written in C for the PHP world. <strong>Phalcon\\Annotations</strong> is a general purpose component that provides ease of parsing and caching annotations in PHP classes to be used in applications.</p>\n<p>Let’s pretend we’ve the following controller and the developer wants to create a plugin to automatically start the cache if the latest action executed is marked as cacheable:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n \nclass NewsController extends \\Phalcon\\Mvc\\Controller\n{\n \n    public function indexAction()\n    {\n \n    }\n \n    /**\n     * @Cache(lifetime=86400)\n     */\n    public function showAction($slug)\n    {\n        $this->view->article = Article::findFirstByTitle($slug);\n    }\n \n}\n</pre>\n<p>We setup the dispatch service to send events to an events manager:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n$eventsManager = new \\Phalcon\\Events\\Manager();\n \n//Attach the plugin to 'dispatch' events\n$eventsManager->attach('dispatch', new CacheEnablerPlugin());\n \n// Setup the dispatcher service to send events to an events manager\n$di->set('dispatcher', function () use ($eventsManager) {\n\t$dispatcher = new \\Phalcon\\Mvc\\Dispatcher();\n\t$dispatcher->setEventsManager($eventsManager);\n\treturn $dispatcher;\n});\n</pre>\n<p>The ‘CacheEnablerPlugin’ enables the cache in the view if the method implements the annotation called 'Cache’:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n \nclass CacheEnablerPlugin extends \\Phalcon\\Mvc\\User\\Plugin\n{\n \n    public function beforeExecuteRoute($event, $dispatcher)\n    {\n \n        //Get the method annotations\n        $annotations = $this->annotations->getMethod(\n            $dispatcher->getActiveController(),\n            $dispatcher->getActiveMethod()\n        );\n \n        //Check if the method had implemented an annotation 'Cache'\n        if ($annotations->has('Cache')) {\n \n            //Get the lifetime parameter\n            $lifetime = $annotations->get('Cache')->getNamedParameter('lifetime');\n \n            //Enable the cache\n            $this->view->cache(array('lifetime' => $lifetime));\n        }\n \n    }\n \n}\n</pre>\n<p>Check the complete example <a href=\"https://gist.github.com/4544542\">here</a></p>\n<p>Phalcon\\Annotations also allows the implementation of annotations in different components (not only for the view).</p>\n<p><strong>Routing based on Annotations</strong></p>\n<p>Taking advantage of the new annotations component we’re introducing a variant of the standard router that reads routes from the annotations in the controller then adding them to the router. This allows for a simpler management of projects with multiple and more complex routes, since your routing table is "attached" to the respective controller also making the code a lot easier to read.:</p>\n<p>Let’s pretend we’ve the following controller:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nnamespace MyApi\\Controllers\\Users;\n \n/**\n * @RoutePrefix(\"/robots\")\n */\nclass UsersController extends Phalcon\\Mvc\\Controller\n{\n \n\t/**\n\t * @Get(\"/\")\n\t */\n\tpublic function indexAction()\n\t{\n \t\t//...\n\t}\n \n\t/**\n\t * @Get(\"/find/{id:[0-9]+}\", name=\"find-user\")\n\t */\n\tpublic function findAction($id)\n\t{\n \t\t//...\n\t}\n \n\t/**\n\t * @Route(\"/save\", methods={\"POST\", \"PUT\"}, name=\"save-user\")\n\t */\n\tpublic function saveAction()\n\t{\n \t\t//...\n\t}\n\n\t/**\n\t * @Delete(\"/delete/{id:[0-9]+}\")\n\t */\n\tpublic function removeAction($id)\n\t{\n \t\t//...\n\t}\n \n}\n</pre>\n<p>The annotations router must be used:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n$di->set('router', function () {\n\n\t//Use the annotations router\n\t$router = new \\Phalcon\\Mvc\\Router\\Annotations(false);\n\t\t\t \n\t//Read the annotations in MyApi\\Controllers\\Users <br><span>\t//</span>if the uri starts with /api/users\n\t$router->addResource('Api\\Controllers\\Users', '/api/users');\n\n\t//Read the annotations in MySite\\Controllers\\Blog <br><span>\t//</span>if the uri starts with /blog\n\t$router->addResource('Web\\Controllers\\Blog', '/blog');\n\t \n\treturn $router;\n});\n</pre>\n<p>This version also fixes bugs and add some minor improvements. Check the complete changelog for this version <a href=\"https://github.com/phalcon/cphalcon/blob/0.9.0/CHANGELOG\">here</a>.</p>\n<p><strong>Help with Testing</strong></p>\n<p>This version can be installed from the 0.9.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 0.9.0\nsudo ./install</pre>\n<p>Windows users can <a href=\"http://phalconphp.com/download\">download</a> a DLL from the download page.</p>\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon\">Travis</a>, so there should not be any major issues with this version. Please help us test and report any bugs or problems on <a href=\"https://github.com/phalcon/cphalcon/issues\">Github</a>. If you have any questions about functionality, feel free to ask either in <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or in our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>.</p>","content_raw":"<p>We are happy to announce the release of Phalcon 0.9.0 Beta. This new release follows our roadmap, introducing features mostly requested by our community. We thank everyone that has been involved by providing input and helping with testing and finding bugs.</p>\r\n<p><strong>Getting/Saving records with Magic Properties</strong></p>\r\n<p>It is now easier to obtain records related to a current model in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>, by simply accessing a property with the same alias of the relationship (the relationship has to be set up first in the models):</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n// Get a song\r\n$song = Songs::findFirst(100);\r\n\r\n// Get the album name\r\n// Note we are accessing the Album relationship of the song \r\necho $song-&gt;album-&gt;name;\r\n\r\n// Find an album \r\n$album = Albums::findFirst(70);\r\n\r\n// Print all songs related to an album\r\nforeach ($album-&gt;songs as $song) {\r\n\techo $song-&gt;name;\t\r\n}\r\n\r\n// Delete all the songs related to the album\r\n$album-&gt;songs-&gt;delete();\r\n</pre>\r\n<p>Magic properties can also be used to store model instances and their related relations:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n// Create an artist\r\n$artist = new Artists();\r\n$artist-&gt;name = 'Shinichi Osawa';\r\n$artist-&gt;country = 'Japan';\r\n\r\n// Create an album\r\n$album = new Albums();\r\n$album-&gt;name = 'The One';\r\n$album-&gt;artist = $artist; //Assign the artist\r\n$album-&gt;year = 2008;\r\n\r\n// Save the album and the artist at the same time\r\n// This saves as a transaction so if anything goes wrong with \r\n// saving the related records, the parent will not saved either\r\n// Messages are passed back to the user for information regarding\r\n// any errors\r\n$album-&gt;save();\r\n</pre>\r\n<p>Also has-many relations are supported:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n// Get an existing artist\r\n$artist = Artists::findFirst('name = \"R&ouml;yksopp\"');\r\n\r\n// Get an album\r\n$album = new Albums();\r\n$album-&gt;name = 'Junior';\r\n$album-&gt;artist = $artist;\r\n\r\n$songs = array();\r\n\r\n// Create a first song\r\n$songs[0] = new Songs();\r\n$songs[0]-&gt;name = 'Happy up Here';\r\n$songs[0]-&gt;duration = '2:44';\r\n\r\n// Create a second song\r\n$songs[1] = new Songs();\r\n$songs[1]-&gt;name = 'The Girl and the Robot';\r\n$songs[1]-&gt;duration = '4:29';\r\n\r\n// Assign the songs array\r\n$album-&gt;songs = $songs;\r\n\r\n// Save the album + its songs\r\n$album-&gt;save();\r\n</pre>\r\n<p><strong>Priorities in the Events component</strong></p>\r\n<p>The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">Events</a> component is now supporting priorities. With this feature you can attach listeners indicating the order in which they must be called.</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n$evManager-&gt;attach('db', new DbListener(), 150); //More priority\r\n$evManager-&gt;attach('db', new DbListener(), 100); //Normal priority\r\n$evManager-&gt;attach('db', new DbListener(), 50); //Less priority\r\n</pre>\r\n<p><strong>Annotations</strong></p>\r\n<p>Addressing another request from the community, we begun implementing annotations. This is yet another first for Phalcon! It is the first time that an annotations parser component is written in C for the PHP world. <strong>Phalcon\\Annotations</strong> is a general purpose component that provides ease of parsing and caching annotations in PHP classes to be used in applications.</p>\r\n<p>Let's pretend we've the following controller and the developer wants to create a plugin to automatically start the cache if the latest action executed is marked as cacheable:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n \r\nclass NewsController extends \\Phalcon\\Mvc\\Controller\r\n{\r\n \r\n    public function indexAction()\r\n    {\r\n \r\n    }\r\n \r\n    /**\r\n     * @Cache(lifetime=86400)\r\n     */\r\n    public function showAction($slug)\r\n    {\r\n        $this-&gt;view-&gt;article = Article::findFirstByTitle($slug);\r\n    }\r\n \r\n}\r\n</pre>\r\n<p>We setup the dispatch service to send events to an events manager:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n$eventsManager = new \\Phalcon\\Events\\Manager();\r\n \r\n//Attach the plugin to 'dispatch' events\r\n$eventsManager-&gt;attach('dispatch', new CacheEnablerPlugin());\r\n \r\n// Setup the dispatcher service to send events to an events manager\r\n$di-&gt;set('dispatcher', function () use ($eventsManager) {\r\n\t$dispatcher = new \\Phalcon\\Mvc\\Dispatcher();\r\n\t$dispatcher-&gt;setEventsManager($eventsManager);\r\n\treturn $dispatcher;\r\n});\r\n</pre>\r\n<p>The 'CacheEnablerPlugin' enables the cache in the view if the method implements the annotation called 'Cache':</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n \r\nclass CacheEnablerPlugin extends \\Phalcon\\Mvc\\User\\Plugin\r\n{\r\n \r\n    public function beforeExecuteRoute($event, $dispatcher)\r\n    {\r\n \r\n        //Get the method annotations\r\n        $annotations = $this-&gt;annotations-&gt;getMethod(\r\n            $dispatcher-&gt;getActiveController(),\r\n            $dispatcher-&gt;getActiveMethod()\r\n        );\r\n \r\n        //Check if the method had implemented an annotation 'Cache'\r\n        if ($annotations-&gt;has('Cache')) {\r\n \r\n            //Get the lifetime parameter\r\n            $lifetime = $annotations-&gt;get('Cache')-&gt;getNamedParameter('lifetime');\r\n \r\n            //Enable the cache\r\n            $this-&gt;view-&gt;cache(array('lifetime' =&gt; $lifetime));\r\n        }\r\n \r\n    }\r\n \r\n}\r\n</pre>\r\n<p>Check the complete example <a href=\"https://gist.github.com/4544542\">here</a></p>\r\n<p>Phalcon\\Annotations also allows the implementation of annotations in different components (not only for the view).</p>\r\n<p><strong>Routing based on Annotations</strong></p>\r\n<p>Taking advantage of the new annotations component we're introducing a variant of the standard router that reads routes from the annotations in the controller then adding them to the router. This allows for a simpler management of projects with multiple and more complex routes, since your routing table is \"attached\" to the respective controller also making the code a lot easier to read.:</p>\r\n<p>Let's pretend we've the following controller:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nnamespace MyApi\\Controllers\\Users;\r\n \r\n/**\r\n * @RoutePrefix(\"/robots\")\r\n */\r\nclass UsersController extends Phalcon\\Mvc\\Controller\r\n{\r\n \r\n\t/**\r\n\t * @Get(\"/\")\r\n\t */\r\n\tpublic function indexAction()\r\n\t{\r\n \t\t//...\r\n\t}\r\n \r\n\t/**\r\n\t * @Get(\"/find/{id:[0-9]+}\", name=\"find-user\")\r\n\t */\r\n\tpublic function findAction($id)\r\n\t{\r\n \t\t//...\r\n\t}\r\n \r\n\t/**\r\n\t * @Route(\"/save\", methods={\"POST\", \"PUT\"}, name=\"save-user\")\r\n\t */\r\n\tpublic function saveAction()\r\n\t{\r\n \t\t//...\r\n\t}\r\n\r\n\t/**\r\n\t * @Delete(\"/delete/{id:[0-9]+}\")\r\n\t */\r\n\tpublic function removeAction($id)\r\n\t{\r\n \t\t//...\r\n\t}\r\n \r\n}\r\n</pre>\r\n<p>The annotations router must be used:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n$di-&gt;set('router', function () {\r\n\r\n\t//Use the annotations router\r\n\t$router = new \\Phalcon\\Mvc\\Router\\Annotations(false);\r\n\t\t\t \r\n\t//Read the annotations in MyApi\\Controllers\\Users <br><span>\t//</span>if the uri starts with /api/users\r\n\t$router-&gt;addResource('Api\\Controllers\\Users', '/api/users');\r\n\r\n\t//Read the annotations in MySite\\Controllers\\Blog <br><span>\t//</span>if the uri starts with /blog\r\n\t$router-&gt;addResource('Web\\Controllers\\Blog', '/blog');\r\n\t \r\n\treturn $router;\r\n});\r\n</pre>\r\n<p>This version also fixes bugs and add some minor improvements. Check the complete changelog for this version <a href=\"https://github.com/phalcon/cphalcon/blob/0.9.0/CHANGELOG\">here</a>.</p>\r\n<p><strong>Help with Testing</strong></p>\r\n<p>This version can be installed from the 0.9.0 branch:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone http://github.com/phalcon/cphalcon\r\ncd build\r\ngit checkout 0.9.0\r\nsudo ./install</pre>\r\n<p>Windows users can <a href=\"phalconphp.com/download\">download</a> a DLL from the download page.</p>\r\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon\">Travis</a>, so there should not be any major issues with this version. Please help us test and report any bugs or problems on <a href=\"https://github.com/phalcon/cphalcon/issues\">Github</a>. If you have any questions about functionality, feel free to ask either in <a href=\"stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or in our <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>.</p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-01-021
-->


Phalcon 0.9 beta released
=========================

We are happy to announce the release of Phalcon 0.9.0 Beta. This new
release follows our roadmap, introducing features mostly requested by
our community. We thank everyone that has been involved by providing
input and helping with testing and finding bugs.

**Getting/Saving records with Magic Properties**

It is now easier to obtain records related to a current model in the
[ORM](http://docs.phalconphp.com/en/latest/reference/models.html), by
simply accessing a property with the same alias of the relationship (the
relationship has to be set up first in the models):

~~~~ {.sh_php .sh_sourceCode}
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
~~~~

Magic properties can also be used to store model instances and their
related relations:

~~~~ {.sh_php .sh_sourceCode}
<?php

// Create an artist
$artist = new Artists();
$artist->name = 'Shinichi Osawa';
$artist->country = 'Japan';

// Create an album
$album = new Albums();
$album->name = 'The One';
$album->artist = $artist; //Assign the artist
$album->year = 2008;

// Save the album and the artist at the same time
// This saves as a transaction so if anything goes wrong with 
// saving the related records, the parent will not saved either
// Messages are passed back to the user for information regarding
// any errors
$album->save();
~~~~

Also has-many relations are supported:

~~~~ {.sh_php .sh_sourceCode}
<?php

// Get an existing artist
$artist = Artists::findFirst('name = "Röyksopp"');

// Get an album
$album = new Albums();
$album->name = 'Junior';
$album->artist = $artist;

$songs = array();

// Create a first song
$songs[0] = new Songs();
$songs[0]->name = 'Happy up Here';
$songs[0]->duration = '2:44';

// Create a second song
$songs[1] = new Songs();
$songs[1]->name = 'The Girl and the Robot';
$songs[1]->duration = '4:29';

// Assign the songs array
$album->songs = $songs;

// Save the album + its songs
$album->save();
~~~~

**Priorities in the Events component**

The [Events](http://docs.phalconphp.com/en/latest/reference/events.html)
component is now supporting priorities. With this feature you can attach
listeners indicating the order in which they must be called.

~~~~ {.sh_php .sh_sourceCode}
<?php

$evManager->attach('db', new DbListener(), 150); //More priority
$evManager->attach('db', new DbListener(), 100); //Normal priority
$evManager->attach('db', new DbListener(), 50); //Less priority
~~~~

**Annotations**

Addressing another request from the community, we begun implementing
annotations. This is yet another first for Phalcon! It is the first time
that an annotations parser component is written in C for the PHP world.
**Phalcon\\Annotations** is a general purpose component that provides
ease of parsing and caching annotations in PHP classes to be used in
applications.

Let’s pretend we’ve the following controller and the developer wants to
create a plugin to automatically start the cache if the latest action
executed is marked as cacheable:

~~~~ {.sh_php .sh_sourceCode}
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
~~~~

We setup the dispatch service to send events to an events manager:

~~~~ {.sh_php .sh_sourceCode}
<?php

$eventsManager = new \Phalcon\Events\Manager();
 
//Attach the plugin to 'dispatch' events
$eventsManager->attach('dispatch', new CacheEnablerPlugin());
 
// Setup the dispatcher service to send events to an events manager
$di->set('dispatcher', function () use ($eventsManager) {
    $dispatcher = new \Phalcon\Mvc\Dispatcher();
    $dispatcher->setEventsManager($eventsManager);
    return $dispatcher;
});
~~~~

The ‘CacheEnablerPlugin’ enables the cache in the view if the method
implements the annotation called 'Cache’:

~~~~ {.sh_php .sh_sourceCode}
<?php
 
class CacheEnablerPlugin extends \Phalcon\Mvc\User\Plugin
{
 
    public function beforeExecuteRoute($event, $dispatcher)
    {
 
        //Get the method annotations
        $annotations = $this->annotations->getMethod(
            $dispatcher->getActiveController(),
            $dispatcher->getActiveMethod()
        );
 
        //Check if the method had implemented an annotation 'Cache'
        if ($annotations->has('Cache')) {
 
            //Get the lifetime parameter
            $lifetime = $annotations->get('Cache')->getNamedParameter('lifetime');
 
            //Enable the cache
            $this->view->cache(array('lifetime' => $lifetime));
        }
 
    }
 
}
~~~~

Check the complete example [here](https://gist.github.com/4544542)

Phalcon\\Annotations also allows the implementation of annotations in
different components (not only for the view).

**Routing based on Annotations**

Taking advantage of the new annotations component we’re introducing a
variant of the standard router that reads routes from the annotations in
the controller then adding them to the router. This allows for a simpler
management of projects with multiple and more complex routes, since your
routing table is "attached" to the respective controller also making the
code a lot easier to read.:

Let’s pretend we’ve the following controller:

~~~~ {.sh_php .sh_sourceCode}
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
~~~~

The annotations router must be used:

~~~~ {.sh_php .sh_sourceCode}
<?php

$di->set('router', function () {

    //Use the annotations router
    $router = new \Phalcon\Mvc\Router\Annotations(false);
             
    //Read the annotations in MyApi\Controllers\Users    //if the uri starts with /api/users
    $router->addResource('Api\Controllers\Users', '/api/users');

    //Read the annotations in MySite\Controllers\Blog    //if the uri starts with /blog
    $router->addResource('Web\Controllers\Blog', '/blog');
     
    return $router;
});
~~~~

This version also fixes bugs and add some minor improvements. Check the
complete changelog for this version
[here](https://github.com/phalcon/cphalcon/blob/0.9.0/CHANGELOG).

**Help with Testing**

This version can be installed from the 0.9.0 branch:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 0.9.0
sudo ./install
~~~~

Windows users can [download](http://phalconphp.com/download) a DLL from
the download page.

All tests are passing on
[Travis](https://travis-ci.org/phalcon/cphalcon), so there should not be
any major issues with this version. Please help us test and report any
bugs or problems on
[Github](https://github.com/phalcon/cphalcon/issues). If you have any
questions about functionality, feel free to ask either in [Stack
Overflow](http://stackoverflow.com/questions/tagged/phalcon) or in our
[Google Group](https://groups.google.com/forum/#!forum/phalcon).

