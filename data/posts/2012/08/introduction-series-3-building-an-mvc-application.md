<!--
slug: introduction-series-3-building-an-mvc-application
date: Sat Aug 18 2012 14:51:00 GMT-0400 (EDT)
tags: php, phalcon, mvc, frameworks, 0.5.0
title: Introduction series 3: Building an MVC application with 0.5.0 
id: 29703992127
link: http://blog.phalconphp.com/post/29703992127/introduction-series-3-building-an-mvc-application
raw: {"blog_name":"phalconphp","id":29703992127,"post_url":"http://blog.phalconphp.com/post/29703992127/introduction-series-3-building-an-mvc-application","slug":"introduction-series-3-building-an-mvc-application","type":"text","date":"2012-08-18 18:51:00 GMT","timestamp":1345315860,"state":"published","format":"html","reblog_key":"dmpnEbM1","tags":["php","phalcon","mvc","frameworks","0.5.0"],"short_url":"http://tmblr.co/Z6PumvRgVlC-","highlighted":[],"note_count":0,"source_url":"https://github.com/phalcon/mvc/","source_title":"github.com","title":"Introduction series 3: Building an MVC application with 0.5.0 ","body":"<p>The third installment of our blog posts regarding the upcoming 0.5.0 version is about the MVC implementation. Below follows implementation concepts and examples of a MVC application using Phalcon 0.5.0.</p>\n<p>As far as the MVC implementation is concerned, our main goal with 0.5.0, was to make it more flexible than ever, giving more control to the developer. Due to this, Phalcon is now able to load simple MVC applications and multi-module ones.</p>\n<p><strong>Autoloaders</strong><br/> In previous versions of Phalcon, the developer had to assign specific folders for the controllers and the models that are going to be used from other components in the application. This was achieved with directives such as &ldquo;controllersDir&rdquo; and &ldquo;modelsDir&rdquo; passed in the front controller. This implementation was somewhat restrictive to the developers that wished to introduce different modules or implement complex routes and business logic in their application.</p>\n<p>In the 0.5.0 version, components are able to instantiate the classes and in turn use autoloaders to perform the task of discovering and loading components from their respective locations. These locations are predefined by the developer in the same manner in which they used to.</p>\n<p>The developer could create a simple autoloader as follows:</p>\n<pre class=\"sh_php\">spl_autoload_register(function($className) {\n    $path = \"../apps/controllers/\".$className.\".php\";\n    if (file_exists($path)) {\n        require $path;\n        return true;\n    }\n    $path = \"../apps/models/\".$className.\".php\";\n    if (file_exists($path)) {\n        require $path;\n        return true\n    }\n});\n</pre>\n<p>The above function simply looks for directories in two classes and if found they will be loaded. This structure allows the developer the freedom to create their own load management class. The framework component Phalcon\\Loader provides the same functionality as above, and uses low-level optimizations that increases the performance of loading classes and code in PHP.</p>\n<pre class=\"sh_php\">$loader = new \\Phalcon\\Loader();    \n$loader-&gt;registerDirs(\n    array(\n        '../apps/controllers/',\n        '../apps/models/'\n    )\n)-&gt;register();\n</pre>\n<p><strong>Services and the IoC container</strong><br/> The next step in an application development is to register services in the Dependency Injector container. Services are required by the MVC components for proper operation but also for optimization of resources used by the application.</p>\n<pre class=\"sh_php\">$di = new \\Phalcon\\DI();\n\n//Registering a router\n$di-&gt;set('router', function(){\n    return new \\Phalcon\\Mvc\\Router();\n});\n\n//Registering a dispatcher\n$di-&gt;set('dispatcher', function(){\n    return new \\Phalcon\\Mvc\\Dispatcher();\n});\n\n//Registering a Http\\Response\n$di-&gt;set('response', function(){\n    return new \\Phalcon\\Http\\Response();\n});\n\n//Registering the view component\n$di-&gt;set('view', function(){\n    $view = new \\Phalcon\\Mvc\\View();\n    $view-&gt;setViewsDir('../apps/views/');\n    return $view;\n});\n\n//Database connection\n$di-&gt;set('db', function(){\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n        \"host\" =&gt; \"localhost\",\n        \"username\" =&gt; \"root\",\n        \"password\" =&gt; \"secret\",\n        \"dbname\" =&gt; \"invo\"\n    ));\n});\n\n//Registering the Models-Metadata\n$di-&gt;set('modelsMetadata', function(){\n    return new \\Phalcon\\Mvc\\Model\\Metadata\\Memory();\n});\n\n//Registering the Models Manager\n$di-&gt;set('modelsManager', function(){\n    return new \\Phalcon\\Mvc\\Model\\Manager();\n});\n</pre>\n<p>The Phalcon\\Di offers many ways of registering services as seen in our previous <a href=\"http://blog.phalconphp.com/post/29061488806/introduction-series-1-phalcons-dependency-injector\">blog post</a>. In the example above we chose to use lambda functions to perform the task of registering the components in the Di container. These lambda functions are executed only when a component requires the relevant service from the container. This offers great resource management for the application since the services load the respective objects in a lazy load manner.</p>\n<p>In addition to the above, this allows the developer to replace any component in the container by a third party one or a custom built one, that would perform the task better - based on the requirements of the application.</p>\n<p>Due to the fact that most components have preset defaults, there is no need to set many options to be able to use them in this example.</p>\n<p>Running the request In 0.5.0 we are introducing a new component, the Phalcon\\Mvc\\Application. This component provides the initialization of the various MVC components so that the developer does not have to do it manually.</p>\n<pre class=\"sh_php\">try {\n    \n    $application = new Phalcon\\Mvc\\Application();\n    echo $application-&gt;handle-&gt;getContent();\n\n} catch(Phalcon\\Exception $e) {\n    echo $e-&gt;getMessage();\n}\n</pre>\n<p><strong>Controllers - Models - Views </strong></p>\n<p><em>Creating a controller: </em></p>\n<p>Let&rsquo;s create a controller. As before, we only need to create a class with the suffix &ldquo;Controller&rdquo; in a location where the autoloader can discover it.</p>\n<pre class=\"sh_php\">// ../apps/controllers/ProductsController.php\nclass ProductsController extends \\Phalcon\\Mvc\\Controller\n{\n    public function showAction()\n    {\n           \n    }\n} \n</pre>\n<p>As you can see, very little has changed from the previous version. Phalcon\\Controller has been moved to the Phalcon\\Mvc namespace, as did all components relating to MVC.</p>\n<p><em> Creating a model:</em></p>\n<pre class=\"sh_php\">// ../apps/models/Products.php\nclass Products extends \\Phalcon\\Mvc\\Model\n{\n\n}\n</pre>\n<p><em>Passing data to the view:</em></p>\n<pre class=\"sh_php\">public function showAction()\n{\n    $this-&gt;view-&gt;setVar(\"product\", Products::findFirst());          \n}\n</pre>\n<p>As you can see, the syntax is the same as the previous version. However, a lot has changed in the underlying MVC implementation by Phalcon. Specifically:</p>\n<ul><li>The Phalcon\\Mvc\\View component was injected from Phalcon\\DI in the controller attribute &ldquo;view&rdquo;</li>\n<li>The Products class does not exist but it was loaded using the previously defined autoloader.</li>\n<li>Internally the findFirst method requires the model manager, metadata and database connection services (previously defined in the Di container).</li>\n<li>The first product stored in the related table &ldquo;products&rdquo; is passed to the view as $product</li>\n</ul><p>All this work is performed transparently so that the developer does not have to worry about it, and of course in the same high performance manner as before.</p>\n<p>Finally, echoing results to the user:</p>\n<pre class=\"sh_php\">&lt;!-- ../apps/views/products/show.phtml --&gt;\n\n&lt;?php echo $product-&gt;name; ?&gt;\n</pre>\n<p>All this happens when browsing to http://localhost/my-app/products/show</p>\n<p><strong>Examples</strong></p>\n<p>To complete this example, we have published a series of MVC examples on <a href=\"https://github.com/phalcon/mvc/\">Github</a> like the one used in this article. Each example uses a different implementation of MVC:</p>\n<ul><li><strong>Simple</strong>: This example shows how to implement a very basic MVC structure similar to 0.4.x.</li>\n<li><strong>Single</strong>: This example shows how to implement a MVC structure with a single-module.</li>\n<li><strong>Single-NS</strong>: This example shows how to implement a MVC structure with a single-module. We use the namespace directive to better organize the application, as well as having a more efficient way of loading required classes.</li>\n<li><strong>Multiple</strong>: This a multi-module MVC structure. There are two modules that coexist in a single directory and can easily share resources between them.</li>\n<li><strong>Simple-waap</strong>: This makes a MVC integration without the use of Phalcon\\Mvc\\Application explaining how the different MVC components interact amongst them.</li>\n</ul><p>Once the release is final, Phalcon Developer Tools will be updated to generate each of these file structures.</p>\n<p>Conclusion The new MVC components offer greater flexibility and extensibility, giving the developer the ability to organize the application as he/she wishes. Thanks to its implementation with low-level optimizations, Phalcon allows developers to build high performance MVC applications in PHP.</p>","reblog":{"tree_html":"","comment":"<p>The third installment of our blog posts regarding the upcoming 0.5.0 version is about the MVC implementation. Below follows implementation concepts and examples of a MVC application using Phalcon 0.5.0.</p>\n<p>As far as the MVC implementation is concerned, our main goal with 0.5.0, was to make it more flexible than ever, giving more control to the developer. Due to this, Phalcon is now able to load simple MVC applications and multi-module ones.</p>\n<p><strong>Autoloaders</strong><br> In previous versions of Phalcon, the developer had to assign specific folders for the controllers and the models that are going to be used from other components in the application. This was achieved with directives such as &ldquo;controllersDir&rdquo; and &ldquo;modelsDir&rdquo; passed in the front controller. This implementation was somewhat restrictive to the developers that wished to introduce different modules or implement complex routes and business logic in their application.</p>\n<p>In the 0.5.0 version, components are able to instantiate the classes and in turn use autoloaders to perform the task of discovering and loading components from their respective locations. These locations are predefined by the developer in the same manner in which they used to.</p>\n<p>The developer could create a simple autoloader as follows:</p>\n<pre class=\"sh_php\">spl_autoload_register(function($className) {\n    $path = \"../apps/controllers/\".$className.\".php\";\n    if (file_exists($path)) {\n        require $path;\n        return true;\n    }\n    $path = \"../apps/models/\".$className.\".php\";\n    if (file_exists($path)) {\n        require $path;\n        return true\n    }\n});\n</pre>\n<p>The above function simply looks for directories in two classes and if found they will be loaded. This structure allows the developer the freedom to create their own load management class. The framework component Phalcon\\Loader provides the same functionality as above, and uses low-level optimizations that increases the performance of loading classes and code in PHP.</p>\n<pre class=\"sh_php\">$loader = new \\Phalcon\\Loader();    \n$loader-&gt;registerDirs(\n    array(\n        '../apps/controllers/',\n        '../apps/models/'\n    )\n)-&gt;register();\n</pre>\n<p><strong>Services and the IoC container</strong><br> The next step in an application development is to register services in the Dependency Injector container. Services are required by the MVC components for proper operation but also for optimization of resources used by the application.</p>\n<pre class=\"sh_php\">$di = new \\Phalcon\\DI();\n\n//Registering a router\n$di-&gt;set('router', function(){\n    return new \\Phalcon\\Mvc\\Router();\n});\n\n//Registering a dispatcher\n$di-&gt;set('dispatcher', function(){\n    return new \\Phalcon\\Mvc\\Dispatcher();\n});\n\n//Registering a Http\\Response\n$di-&gt;set('response', function(){\n    return new \\Phalcon\\Http\\Response();\n});\n\n//Registering the view component\n$di-&gt;set('view', function(){\n    $view = new \\Phalcon\\Mvc\\View();\n    $view-&gt;setViewsDir('../apps/views/');\n    return $view;\n});\n\n//Database connection\n$di-&gt;set('db', function(){\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n        \"host\" =&gt; \"localhost\",\n        \"username\" =&gt; \"root\",\n        \"password\" =&gt; \"secret\",\n        \"dbname\" =&gt; \"invo\"\n    ));\n});\n\n//Registering the Models-Metadata\n$di-&gt;set('modelsMetadata', function(){\n    return new \\Phalcon\\Mvc\\Model\\Metadata\\Memory();\n});\n\n//Registering the Models Manager\n$di-&gt;set('modelsManager', function(){\n    return new \\Phalcon\\Mvc\\Model\\Manager();\n});\n</pre>\n<p>The Phalcon\\Di offers many ways of registering services as seen in our previous <a href=\"http://blog.phalconphp.com/post/29061488806/introduction-series-1-phalcons-dependency-injector\">blog post</a>. In the example above we chose to use lambda functions to perform the task of registering the components in the Di container. These lambda functions are executed only when a component requires the relevant service from the container. This offers great resource management for the application since the services load the respective objects in a lazy load manner.</p>\n<p>In addition to the above, this allows the developer to replace any component in the container by a third party one or a custom built one, that would perform the task better - based on the requirements of the application.</p>\n<p>Due to the fact that most components have preset defaults, there is no need to set many options to be able to use them in this example.</p>\n<p>Running the request In 0.5.0 we are introducing a new component, the Phalcon\\Mvc\\Application. This component provides the initialization of the various MVC components so that the developer does not have to do it manually.</p>\n<pre class=\"sh_php\">try {\n    \n    $application = new Phalcon\\Mvc\\Application();\n    echo $application-&gt;handle-&gt;getContent();\n\n} catch(Phalcon\\Exception $e) {\n    echo $e-&gt;getMessage();\n}\n</pre>\n<p><strong>Controllers - Models - Views </strong></p>\n<p><em>Creating a controller: </em></p>\n<p>Let&rsquo;s create a controller. As before, we only need to create a class with the suffix &ldquo;Controller&rdquo; in a location where the autoloader can discover it.</p>\n<pre class=\"sh_php\">// ../apps/controllers/ProductsController.php\nclass ProductsController extends \\Phalcon\\Mvc\\Controller\n{\n    public function showAction()\n    {\n           \n    }\n} \n</pre>\n<p>As you can see, very little has changed from the previous version. Phalcon\\Controller has been moved to the Phalcon\\Mvc namespace, as did all components relating to MVC.</p>\n<p><em> Creating a model:</em></p>\n<pre class=\"sh_php\">// ../apps/models/Products.php\nclass Products extends \\Phalcon\\Mvc\\Model\n{\n\n}\n</pre>\n<p><em>Passing data to the view:</em></p>\n<pre class=\"sh_php\">public function showAction()\n{\n    $this-&gt;view-&gt;setVar(\"product\", Products::findFirst());          \n}\n</pre>\n<p>As you can see, the syntax is the same as the previous version. However, a lot has changed in the underlying MVC implementation by Phalcon. Specifically:</p>\n<ul><li>The Phalcon\\Mvc\\View component was injected from Phalcon\\DI in the controller attribute &ldquo;view&rdquo;</li>\n<li>The Products class does not exist but it was loaded using the previously defined autoloader.</li>\n<li>Internally the findFirst method requires the model manager, metadata and database connection services (previously defined in the Di container).</li>\n<li>The first product stored in the related table &ldquo;products&rdquo; is passed to the view as $product</li>\n</ul><p>All this work is performed transparently so that the developer does not have to worry about it, and of course in the same high performance manner as before.</p>\n<p>Finally, echoing results to the user:</p>\n<pre class=\"sh_php\">&lt;!-- ../apps/views/products/show.phtml --&gt;\n\n&lt;?php echo $product-&gt;name; ?&gt;\n</pre>\n<p>All this happens when browsing to http://localhost/my-app/products/show</p>\n<p><strong>Examples</strong></p>\n<p>To complete this example, we have published a series of MVC examples on <a href=\"https://github.com/phalcon/mvc/\">Github</a> like the one used in this article. Each example uses a different implementation of MVC:</p>\n<ul><li><strong>Simple</strong>: This example shows how to implement a very basic MVC structure similar to 0.4.x.</li>\n<li><strong>Single</strong>: This example shows how to implement a MVC structure with a single-module.</li>\n<li><strong>Single-NS</strong>: This example shows how to implement a MVC structure with a single-module. We use the namespace directive to better organize the application, as well as having a more efficient way of loading required classes.</li>\n<li><strong>Multiple</strong>: This a multi-module MVC structure. There are two modules that coexist in a single directory and can easily share resources between them.</li>\n<li><strong>Simple-waap</strong>: This makes a MVC integration without the use of Phalcon\\Mvc\\Application explaining how the different MVC components interact amongst them.</li>\n</ul><p>Once the release is final, Phalcon Developer Tools will be updated to generate each of these file structures.</p>\n<p>Conclusion The new MVC components offer greater flexibility and extensibility, giving the developer the ability to organize the application as he/she wishes. Thanks to its implementation with low-level optimizations, Phalcon allows developers to build high performance MVC applications in PHP.</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"29703992127"},"content":"<p>The third installment of our blog posts regarding the upcoming 0.5.0 version is about the MVC implementation. Below follows implementation concepts and examples of a MVC application using Phalcon 0.5.0.</p>\n<p>As far as the MVC implementation is concerned, our main goal with 0.5.0, was to make it more flexible than ever, giving more control to the developer. Due to this, Phalcon is now able to load simple MVC applications and multi-module ones.</p>\n<p><strong>Autoloaders</strong><br> In previous versions of Phalcon, the developer had to assign specific folders for the controllers and the models that are going to be used from other components in the application. This was achieved with directives such as “controllersDir” and “modelsDir” passed in the front controller. This implementation was somewhat restrictive to the developers that wished to introduce different modules or implement complex routes and business logic in their application.</p>\n<p>In the 0.5.0 version, components are able to instantiate the classes and in turn use autoloaders to perform the task of discovering and loading components from their respective locations. These locations are predefined by the developer in the same manner in which they used to.</p>\n<p>The developer could create a simple autoloader as follows:</p>\n<pre class=\"sh_php\">spl_autoload_register(function($className) {\n    $path = \"../apps/controllers/\".$className.\".php\";\n    if (file_exists($path)) {\n        require $path;\n        return true;\n    }\n    $path = \"../apps/models/\".$className.\".php\";\n    if (file_exists($path)) {\n        require $path;\n        return true\n    }\n});\n</pre>\n<p>The above function simply looks for directories in two classes and if found they will be loaded. This structure allows the developer the freedom to create their own load management class. The framework component Phalcon\\Loader provides the same functionality as above, and uses low-level optimizations that increases the performance of loading classes and code in PHP.</p>\n<pre class=\"sh_php\">$loader = new \\Phalcon\\Loader();    \n$loader->registerDirs(\n    array(\n        '../apps/controllers/',\n        '../apps/models/'\n    )\n)->register();\n</pre>\n<p><strong>Services and the IoC container</strong><br> The next step in an application development is to register services in the Dependency Injector container. Services are required by the MVC components for proper operation but also for optimization of resources used by the application.</p>\n<pre class=\"sh_php\">$di = new \\Phalcon\\DI();\n\n//Registering a router\n$di->set('router', function(){\n    return new \\Phalcon\\Mvc\\Router();\n});\n\n//Registering a dispatcher\n$di->set('dispatcher', function(){\n    return new \\Phalcon\\Mvc\\Dispatcher();\n});\n\n//Registering a Http\\Response\n$di->set('response', function(){\n    return new \\Phalcon\\Http\\Response();\n});\n\n//Registering the view component\n$di->set('view', function(){\n    $view = new \\Phalcon\\Mvc\\View();\n    $view->setViewsDir('../apps/views/');\n    return $view;\n});\n\n//Database connection\n$di->set('db', function(){\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n        \"host\" => \"localhost\",\n        \"username\" => \"root\",\n        \"password\" => \"secret\",\n        \"dbname\" => \"invo\"\n    ));\n});\n\n//Registering the Models-Metadata\n$di->set('modelsMetadata', function(){\n    return new \\Phalcon\\Mvc\\Model\\Metadata\\Memory();\n});\n\n//Registering the Models Manager\n$di->set('modelsManager', function(){\n    return new \\Phalcon\\Mvc\\Model\\Manager();\n});\n</pre>\n<p>The Phalcon\\Di offers many ways of registering services as seen in our previous <a href=\"http://blog.phalconphp.com/post/29061488806/introduction-series-1-phalcons-dependency-injector\">blog post</a>. In the example above we chose to use lambda functions to perform the task of registering the components in the Di container. These lambda functions are executed only when a component requires the relevant service from the container. This offers great resource management for the application since the services load the respective objects in a lazy load manner.</p>\n<p>In addition to the above, this allows the developer to replace any component in the container by a third party one or a custom built one, that would perform the task better - based on the requirements of the application.</p>\n<p>Due to the fact that most components have preset defaults, there is no need to set many options to be able to use them in this example.</p>\n<p>Running the request In 0.5.0 we are introducing a new component, the Phalcon\\Mvc\\Application. This component provides the initialization of the various MVC components so that the developer does not have to do it manually.</p>\n<pre class=\"sh_php\">try {\n    \n    $application = new Phalcon\\Mvc\\Application();\n    echo $application->handle->getContent();\n\n} catch(Phalcon\\Exception $e) {\n    echo $e->getMessage();\n}\n</pre>\n<p><strong>Controllers - Models - Views </strong></p>\n<p><em>Creating a controller: </em></p>\n<p>Let’s create a controller. As before, we only need to create a class with the suffix “Controller” in a location where the autoloader can discover it.</p>\n<pre class=\"sh_php\">// ../apps/controllers/ProductsController.php\nclass ProductsController extends \\Phalcon\\Mvc\\Controller\n{\n    public function showAction()\n    {\n           \n    }\n} \n</pre>\n<p>As you can see, very little has changed from the previous version. Phalcon\\Controller has been moved to the Phalcon\\Mvc namespace, as did all components relating to MVC.</p>\n<p><em> Creating a model:</em></p>\n<pre class=\"sh_php\">// ../apps/models/Products.php\nclass Products extends \\Phalcon\\Mvc\\Model\n{\n\n}\n</pre>\n<p><em>Passing data to the view:</em></p>\n<pre class=\"sh_php\">public function showAction()\n{\n    $this->view->setVar(\"product\", Products::findFirst());          \n}\n</pre>\n<p>As you can see, the syntax is the same as the previous version. However, a lot has changed in the underlying MVC implementation by Phalcon. Specifically:</p>\n<ul><li>The Phalcon\\Mvc\\View component was injected from Phalcon\\DI in the controller attribute “view”</li>\n<li>The Products class does not exist but it was loaded using the previously defined autoloader.</li>\n<li>Internally the findFirst method requires the model manager, metadata and database connection services (previously defined in the Di container).</li>\n<li>The first product stored in the related table “products” is passed to the view as $product</li>\n</ul><p>All this work is performed transparently so that the developer does not have to worry about it, and of course in the same high performance manner as before.</p>\n<p>Finally, echoing results to the user:</p>\n<pre class=\"sh_php\"><!-- ../apps/views/products/show.phtml -->\n\n<?php echo $product->name; ?>\n</pre>\n<p>All this happens when browsing to http://localhost/my-app/products/show</p>\n<p><strong>Examples</strong></p>\n<p>To complete this example, we have published a series of MVC examples on <a href=\"https://github.com/phalcon/mvc/\">Github</a> like the one used in this article. Each example uses a different implementation of MVC:</p>\n<ul><li><strong>Simple</strong>: This example shows how to implement a very basic MVC structure similar to 0.4.x.</li>\n<li><strong>Single</strong>: This example shows how to implement a MVC structure with a single-module.</li>\n<li><strong>Single-NS</strong>: This example shows how to implement a MVC structure with a single-module. We use the namespace directive to better organize the application, as well as having a more efficient way of loading required classes.</li>\n<li><strong>Multiple</strong>: This a multi-module MVC structure. There are two modules that coexist in a single directory and can easily share resources between them.</li>\n<li><strong>Simple-waap</strong>: This makes a MVC integration without the use of Phalcon\\Mvc\\Application explaining how the different MVC components interact amongst them.</li>\n</ul><p>Once the release is final, Phalcon Developer Tools will be updated to generate each of these file structures.</p>\n<p>Conclusion The new MVC components offer greater flexibility and extensibility, giving the developer the ability to organize the application as he/she wishes. Thanks to its implementation with low-level optimizations, Phalcon allows developers to build high performance MVC applications in PHP.</p>","content_raw":"<p>The third installment of our blog posts regarding the upcoming 0.5.0 version is about the MVC implementation. Below follows implementation concepts and examples of a MVC application using Phalcon 0.5.0.</p>\r\n<p>As far as the MVC implementation is concerned, our main goal with 0.5.0, was to make it more flexible than ever, giving more control to the developer. Due to this, Phalcon is now able to load simple MVC applications and multi-module ones.</p>\r\n<p><strong>Autoloaders</strong><br> In previous versions of Phalcon, the developer had to assign specific folders for the controllers and the models that are going to be used from other components in the application. This was achieved with directives such as \"controllersDir\" and \"modelsDir\" passed in the front controller. This implementation was somewhat restrictive to the developers that wished to introduce different modules or implement complex routes and business logic in their application.</p>\r\n<p>In the 0.5.0 version, components are able to instantiate the classes and in turn use autoloaders to perform the task of discovering and loading components from their respective locations. These locations are predefined by the developer in the same manner in which they used to.</p>\r\n<p>The developer could create a simple autoloader as follows:</p>\r\n<pre class=\"sh_php\">spl_autoload_register(function($className) {\r\n    $path = \"../apps/controllers/\".$className.\".php\";\r\n    if (file_exists($path)) {\r\n        require $path;\r\n        return true;\r\n    }\r\n    $path = \"../apps/models/\".$className.\".php\";\r\n    if (file_exists($path)) {\r\n        require $path;\r\n        return true\r\n    }\r\n});\r\n</pre>\r\n<p>The above function simply looks for directories in two classes and if found they will be loaded. This structure allows the developer the freedom to create their own load management class. The framework component Phalcon\\Loader provides the same functionality as above, and uses low-level optimizations that increases the performance of loading classes and code in PHP.</p>\r\n<pre class=\"sh_php\">$loader = new \\Phalcon\\Loader();    \r\n$loader-&gt;registerDirs(\r\n    array(\r\n        '../apps/controllers/',\r\n        '../apps/models/'\r\n    )\r\n)-&gt;register();\r\n</pre>\r\n<p><strong>Services and the IoC container</strong><br> The next step in an application development is to register services in the Dependency Injector container. Services are required by the MVC components for proper operation but also for optimization of resources used by the application.</p>\r\n<pre class=\"sh_php\">$di = new \\Phalcon\\DI();\r\n\r\n//Registering a router\r\n$di-&gt;set('router', function(){\r\n    return new \\Phalcon\\Mvc\\Router();\r\n});\r\n\r\n//Registering a dispatcher\r\n$di-&gt;set('dispatcher', function(){\r\n    return new \\Phalcon\\Mvc\\Dispatcher();\r\n});\r\n\r\n//Registering a Http\\Response\r\n$di-&gt;set('response', function(){\r\n    return new \\Phalcon\\Http\\Response();\r\n});\r\n\r\n//Registering the view component\r\n$di-&gt;set('view', function(){\r\n    $view = new \\Phalcon\\Mvc\\View();\r\n    $view-&gt;setViewsDir('../apps/views/');\r\n    return $view;\r\n});\r\n\r\n//Database connection\r\n$di-&gt;set('db', function(){\r\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\r\n        \"host\" =&gt; \"localhost\",\r\n        \"username\" =&gt; \"root\",\r\n        \"password\" =&gt; \"secret\",\r\n        \"dbname\" =&gt; \"invo\"\r\n    ));\r\n});\r\n\r\n//Registering the Models-Metadata\r\n$di-&gt;set('modelsMetadata', function(){\r\n    return new \\Phalcon\\Mvc\\Model\\Metadata\\Memory();\r\n});\r\n\r\n//Registering the Models Manager\r\n$di-&gt;set('modelsManager', function(){\r\n    return new \\Phalcon\\Mvc\\Model\\Manager();\r\n});\r\n</pre>\r\n<p>The Phalcon\\Di offers many ways of registering services as seen in our previous <a href=\"http://blog.phalconphp.com/post/29061488806/introduction-series-1-phalcons-dependency-injector\">blog post</a>. In the example above we chose to use lambda functions to perform the task of registering the components in the Di container. These lambda functions are executed only when a component requires the relevant service from the container. This offers great resource management for the application since the services load the respective objects in a lazy load manner.</p>\r\n<p>In addition to the above, this allows the developer to replace any component in the container by a third party one or a custom built one, that would perform the task better - based on the requirements of the application.</p>\r\n<p>Due to the fact that most components have preset defaults, there is no need to set many options to be able to use them in this example.</p>\r\n<p>Running the request In 0.5.0 we are introducing a new component, the Phalcon\\Mvc\\Application. This component provides the initialization of the various MVC components so that the developer does not have to do it manually.</p>\r\n<pre class=\"sh_php\">try {\r\n    \r\n    $application = new Phalcon\\Mvc\\Application();\r\n    echo $application-&gt;handle-&gt;getContent();\r\n\r\n} catch(Phalcon\\Exception $e) {\r\n    echo $e-&gt;getMessage();\r\n}\r\n</pre>\r\n<p><strong>Controllers - Models - Views </strong></p>\r\n<p><em>Creating a controller: </em></p>\r\n<p>Let's create a controller. As before, we only need to create a class with the suffix \"Controller\" in a location where the autoloader can discover it.</p>\r\n<pre class=\"sh_php\">// ../apps/controllers/ProductsController.php\r\nclass ProductsController extends \\Phalcon\\Mvc\\Controller\r\n{\r\n    public function showAction()\r\n    {\r\n           \r\n    }\r\n} \r\n</pre>\r\n<p>As you can see, very little has changed from the previous version. Phalcon\\Controller has been moved to the Phalcon\\Mvc namespace, as did all components relating to MVC.</p>\r\n<p><em> Creating a model:</em></p>\r\n<pre class=\"sh_php\">// ../apps/models/Products.php\r\nclass Products extends \\Phalcon\\Mvc\\Model\r\n{\r\n\r\n}\r\n</pre>\r\n<p><em>Passing data to the view:</em></p>\r\n<pre class=\"sh_php\">public function showAction()\r\n{\r\n    $this-&gt;view-&gt;setVar(\"product\", Products::findFirst());          \r\n}\r\n</pre>\r\n<p>As you can see, the syntax is the same as the previous version. However, a lot has changed in the underlying MVC implementation by Phalcon. Specifically:</p>\r\n<ul><li>The Phalcon\\Mvc\\View component was injected from Phalcon\\DI in the controller attribute \"view\"</li>\r\n<li>The Products class does not exist but it was loaded using the previously defined autoloader.</li>\r\n<li>Internally the findFirst method requires the model manager, metadata and database connection services (previously defined in the Di container).</li>\r\n<li>The first product stored in the related table \"products\" is passed to the view as $product</li>\r\n</ul><p>All this work is performed transparently so that the developer does not have to worry about it, and of course in the same high performance manner as before.</p>\r\n<p>Finally, echoing results to the user:</p>\r\n<pre class=\"sh_php\">&lt;!-- ../apps/views/products/show.phtml --&gt;\r\n\r\n&lt;?php echo $product-&gt;name; ?&gt;\r\n</pre>\r\n<p>All this happens when browsing to http://localhost/my-app/products/show</p>\r\n<p><strong>Examples</strong></p>\r\n<p>To complete this example, we have published a series of MVC examples on <a href=\"https://github.com/phalcon/mvc/\">Github</a> like the one used in this article. Each example uses a different implementation of MVC:</p>\r\n<ul><li><strong>Simple</strong>: This example shows how to implement a very basic MVC structure similar to 0.4.x.</li>\r\n<li><strong>Single</strong>: This example shows how to implement a MVC structure with a single-module.</li>\r\n<li><strong>Single-NS</strong>: This example shows how to implement a MVC structure with a single-module. We use the namespace directive to better organize the application, as well as having a more efficient way of loading required classes.</li>\r\n<li><strong>Multiple</strong>: This a multi-module MVC structure. There are two modules that coexist in a single directory and can easily share resources between them.</li>\r\n<li><strong>Simple-waap</strong>: This makes a MVC integration without the use of Phalcon\\Mvc\\Application explaining how the different MVC components interact amongst them.</li>\r\n</ul><p>Once the release is final, Phalcon Developer Tools will be updated to generate each of these file structures.</p>\r\n<p>Conclusion The new MVC components offer greater flexibility and extensibility, giving the developer the ability to organize the application as he/she wishes. Thanks to its implementation with low-level optimizations, Phalcon allows developers to build high performance MVC applications in PHP.</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-08-018
-->


Introduction series 3: Building an MVC application with 0.5.0 
==============================================================

The third installment of our blog posts regarding the upcoming 0.5.0
version is about the MVC implementation. Below follows implementation
concepts and examples of a MVC application using Phalcon 0.5.0.

As far as the MVC implementation is concerned, our main goal with 0.5.0,
was to make it more flexible than ever, giving more control to the
developer. Due to this, Phalcon is now able to load simple MVC
applications and multi-module ones.

**Autoloaders**\
 In previous versions of Phalcon, the developer had to assign specific
folders for the controllers and the models that are going to be used
from other components in the application. This was achieved with
directives such as “controllersDir” and “modelsDir” passed in the front
controller. This implementation was somewhat restrictive to the
developers that wished to introduce different modules or implement
complex routes and business logic in their application.

In the 0.5.0 version, components are able to instantiate the classes and
in turn use autoloaders to perform the task of discovering and loading
components from their respective locations. These locations are
predefined by the developer in the same manner in which they used to.

The developer could create a simple autoloader as follows:

~~~~ {.sh_php}
spl_autoload_register(function($className) {
    $path = "../apps/controllers/".$className.".php";
    if (file_exists($path)) {
        require $path;
        return true;
    }
    $path = "../apps/models/".$className.".php";
    if (file_exists($path)) {
        require $path;
        return true
    }
});
~~~~

The above function simply looks for directories in two classes and if
found they will be loaded. This structure allows the developer the
freedom to create their own load management class. The framework
component Phalcon\\Loader provides the same functionality as above, and
uses low-level optimizations that increases the performance of loading
classes and code in PHP.

~~~~ {.sh_php}
$loader = new \Phalcon\Loader();    
$loader->registerDirs(
    array(
        '../apps/controllers/',
        '../apps/models/'
    )
)->register();
~~~~

**Services and the IoC container**\
 The next step in an application development is to register services in
the Dependency Injector container. Services are required by the MVC
components for proper operation but also for optimization of resources
used by the application.

~~~~ {.sh_php}
$di = new \Phalcon\DI();

//Registering a router
$di->set('router', function(){
    return new \Phalcon\Mvc\Router();
});

//Registering a dispatcher
$di->set('dispatcher', function(){
    return new \Phalcon\Mvc\Dispatcher();
});

//Registering a Http\Response
$di->set('response', function(){
    return new \Phalcon\Http\Response();
});

//Registering the view component
$di->set('view', function(){
    $view = new \Phalcon\Mvc\View();
    $view->setViewsDir('../apps/views/');
    return $view;
});

//Database connection
$di->set('db', function(){
    return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
        "host" => "localhost",
        "username" => "root",
        "password" => "secret",
        "dbname" => "invo"
    ));
});

//Registering the Models-Metadata
$di->set('modelsMetadata', function(){
    return new \Phalcon\Mvc\Model\Metadata\Memory();
});

//Registering the Models Manager
$di->set('modelsManager', function(){
    return new \Phalcon\Mvc\Model\Manager();
});
~~~~

The Phalcon\\Di offers many ways of registering services as seen in our
previous [blog
post](http://blog.phalconphp.com/post/29061488806/introduction-series-1-phalcons-dependency-injector).
In the example above we chose to use lambda functions to perform the
task of registering the components in the Di container. These lambda
functions are executed only when a component requires the relevant
service from the container. This offers great resource management for
the application since the services load the respective objects in a lazy
load manner.

In addition to the above, this allows the developer to replace any
component in the container by a third party one or a custom built one,
that would perform the task better - based on the requirements of the
application.

Due to the fact that most components have preset defaults, there is no
need to set many options to be able to use them in this example.

Running the request In 0.5.0 we are introducing a new component, the
Phalcon\\Mvc\\Application. This component provides the initialization of
the various MVC components so that the developer does not have to do it
manually.

~~~~ {.sh_php}
try {
    
    $application = new Phalcon\Mvc\Application();
    echo $application->handle->getContent();

} catch(Phalcon\Exception $e) {
    echo $e->getMessage();
}
~~~~

**Controllers - Models - Views**

*Creating a controller:*

Let’s create a controller. As before, we only need to create a class
with the suffix “Controller” in a location where the autoloader can
discover it.

~~~~ {.sh_php}
// ../apps/controllers/ProductsController.php
class ProductsController extends \Phalcon\Mvc\Controller
{
    public function showAction()
    {
           
    }
} 
~~~~

As you can see, very little has changed from the previous version.
Phalcon\\Controller has been moved to the Phalcon\\Mvc namespace, as did
all components relating to MVC.

*Creating a model:*

~~~~ {.sh_php}
// ../apps/models/Products.php
class Products extends \Phalcon\Mvc\Model
{

}
~~~~

*Passing data to the view:*

~~~~ {.sh_php}
public function showAction()
{
    $this->view->setVar("product", Products::findFirst());          
}
~~~~

As you can see, the syntax is the same as the previous version. However,
a lot has changed in the underlying MVC implementation by Phalcon.
Specifically:

-   The Phalcon\\Mvc\\View component was injected from Phalcon\\DI in
    the controller attribute “view”
-   The Products class does not exist but it was loaded using the
    previously defined autoloader.
-   Internally the findFirst method requires the model manager, metadata
    and database connection services (previously defined in the Di
    container).
-   The first product stored in the related table “products” is passed
    to the view as \$product

All this work is performed transparently so that the developer does not
have to worry about it, and of course in the same high performance
manner as before.

Finally, echoing results to the user:

~~~~ {.sh_php}
<!-- ../apps/views/products/show.phtml -->

<?php echo $product->name; ?>
~~~~

All this happens when browsing to http://localhost/my-app/products/show

**Examples**

To complete this example, we have published a series of MVC examples on
[Github](https://github.com/phalcon/mvc/) like the one used in this
article. Each example uses a different implementation of MVC:

-   **Simple**: This example shows how to implement a very basic MVC
    structure similar to 0.4.x.
-   **Single**: This example shows how to implement a MVC structure with
    a single-module.
-   **Single-NS**: This example shows how to implement a MVC structure
    with a single-module. We use the namespace directive to better
    organize the application, as well as having a more efficient way of
    loading required classes.
-   **Multiple**: This a multi-module MVC structure. There are two
    modules that coexist in a single directory and can easily share
    resources between them.
-   **Simple-waap**: This makes a MVC integration without the use of
    Phalcon\\Mvc\\Application explaining how the different MVC
    components interact amongst them.

Once the release is final, Phalcon Developer Tools will be updated to
generate each of these file structures.

Conclusion The new MVC components offer greater flexibility and
extensibility, giving the developer the ability to organize the
application as he/she wishes. Thanks to its implementation with
low-level optimizations, Phalcon allows developers to build high
performance MVC applications in PHP.

