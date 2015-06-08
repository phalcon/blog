<!--
slug: introduction-series-2-the-events-manager
date: Sun Aug 12 2012 15:35:00 GMT-0400 (EDT)
tags: phalcon, php, 0.5.x, mvc, frameworks
title: Introduction Series 2: The Events Manager
id: 29280239243
link: http://blog.phalconphp.com/post/29280239243/introduction-series-2-the-events-manager
raw: {"blog_name":"phalconphp","id":29280239243,"post_url":"http://blog.phalconphp.com/post/29280239243/introduction-series-2-the-events-manager","slug":"introduction-series-2-the-events-manager","type":"text","date":"2012-08-12 19:35:00 GMT","timestamp":1344800100,"state":"published","format":"html","reblog_key":"ycY6F0GQ","tags":["phalcon","php","0.5.x","mvc","frameworks"],"short_url":"http://tmblr.co/Z6PumvRHFFwB","highlighted":[],"note_count":0,"title":"Introduction Series 2: The Events Manager","body":"<p>In addition to the dependency injection component seen in the previous post of the introduction series, a new component makes its appearance in Phalcon 0.5: the Events Manager. Its purpose is to intercept the execution of most of the components of the framework by creating &ldquo;hooks point&rdquo;. These hook points allow the developer to obtain status information, manipulate data or change the flow of execution during the process of a component.</p>\n<p>In the following example, we use the EventManager to listen for events produced in a MySQL connection managed by Phalcon\\Db. First of all, we need a listener object to do this. We create a class which methods are the events we want to listen:</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    public function afterConnect()\n    {\n\n    }\n    \n    public function beforeQuery()\n    {\n\n    }\n\n    public function afterQuery()\n    {\n\n    }\n\n}\n</pre>\n<p>This new class can be as verbose as we need it to. The EventManager will interface between the component and our listener class, offering hook points based on the methods we defined in our listener class.:</p>\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\n\n//Create a database listener\n$dbListener = new MyDbListener()\n\n//Listen all the database events\n$eventsManager-&gt;attach('db', $dbListener);\n\n$connection = new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n    \"host\" =&gt; \"localhost\",\n    \"username\" =&gt; \"root\",\n    \"password\" =&gt; \"secret\",\n    \"dbname\" =&gt; \"invo\"\n));\n\n//Assign the eventsManager to the db adapter instance\n$connection-&gt;setEventsManager($eventsManager);\n\n//Send a SQL command to the database server\n$connection-&gt;query(\"SELECT * FROM products p WHERE p.status = 1\");\n</pre>\n<p>In order to log all the SQL statements executed by our application, we need to use the event &ldquo;afterQuery&rdquo;. The first parameter passed to the event listener contains contextual information about the event that is running, the second is the connection itself.</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    protected $_logger;\n\n    public function __construct()\n    {\n        $this-&gt;_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");\n    }    \n\n    public function afterQuery($event, $connection)\n    {\n        $this-&gt;_logger-&gt;log($connection-&gt;getSQLStatement(), \\Phalcon\\Logger::INFO);\n    }\n\n}\n</pre>\n<p>As part of this example, we will also implement the Phalcon\\Db\\Profiler to detect the SQL statements that are taking longer to execute than expected:</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    protected $_profiler;\n\n    protected $_logger;\n\n    public function __construct()\n    {\n        $this-&gt;_profiler = new \\Phalcon\\Db\\Profiler();\n        $this-&gt;_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");        \n    }\n\n    public function beforeQuery($event, $connection)\n    {\n        $this-&gt;_profiler-&gt;startProfile($connection-&gt;getSQLStatement());\n    }\n\n    public function afterQuery($event, $connection)\n    {\n        $this-&gt;_logger-&gt;log($connection-&gt;getSQLStatement(), \\Phalcon\\Logger::INFO);\n        $this-&gt;_profiler-&gt;stopProfile();\n    }\n\n    public function getProfiler()\n    {\n        return $this-&gt;_profiler;\n    }\n\n}\n</pre>\n<p>The resulting profile data can be obtained from the listener:</p>\n<pre class=\"sh_php\">//Send a SQL command to the database server\n$connection-&gt;query(\"SELECT * FROM products p WHERE p.status = 1\");\n\nforeach($dbListener-&gt;getProfiler()-&gt;getProfiles() as $profile){\n    echo \"SQL Statement: \", $profile-&gt;getSQLStatement(), \"\\n\";\n    echo \"Start Time: \", $profile-&gt;getInitialTime(), \"\\n\"<br/>    echo \"Final Time: \", $profile-&gt;getFinalTime(), \"\\n\";\n    echo \"Total Elapsed Time: \", $profile-&gt;getTotalElapsedSeconds(), \"\\n\";\n}\n</pre>\n<p>In a similar manner we can register an lambda function to perform the task instead of a separate listener class (as seen above):</p>\n<pre class=\"sh_php\">//Listen all the database events\n$eventManager-&gt;attach('db', function($event, $connection){    \n    if ($event-&gt;getType() == 'afterQuery') {\n        echo $connection-&gt;getSQLStatement();\n    }\n});\n</pre>\n<p>In the following example, the EventsManager is working with the class loader, allowing us to obtain debugging information regarding the flow of operation:</p>\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\n\n$loader = new \\Phalcon\\Loader();\n\n$loader-&gt;registerNamespaces(array(\n   'Example\\\\Base' =&gt; 'vendor/example/base/',\n   'Example\\\\Adapter' =&gt; 'vendor/example/adapter/',\n   'Example' =&gt; 'vendor/example/'\n));\n\n//Listen all the loader events\n$eventsManager-&gt;attach('loader', function(){\n    if ($event-&gt;getType() == 'beforeCheckPath') {\n        echo $loader-&gt;getCheckedPath();\n    }\n});\n\n$loader-&gt;setEventsManager($eventsManager);\n\n$loader-&gt;register();\n</pre>\n<p><strong>Conclusion</strong><br/>The new Phalcon Events Manager, offers an easy way to intercept and manipulate, if needed, the normal flow of operation. With the EventsManager the developer can create hooks or plugins that will offer monitoring of data, manipulation, conditional execution and much more.</p>\n<p>We made a lot of low-level optimizations in Phalcon, so as to ensure that there is very little if any reduction in performance with the introduction of the EventsManager, while at the same time offering an increased extensibility throughout the framework.</p>","reblog":{"tree_html":"","comment":"<p>In addition to the dependency injection component seen in the previous post of the introduction series, a new component makes its appearance in Phalcon 0.5: the Events Manager. Its purpose is to intercept the execution of most of the components of the framework by creating &ldquo;hooks point&rdquo;. These hook points allow the developer to obtain status information, manipulate data or change the flow of execution during the process of a component.</p>\n<p>In the following example, we use the EventManager to listen for events produced in a MySQL connection managed by Phalcon\\Db. First of all, we need a listener object to do this. We create a class which methods are the events we want to listen:</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    public function afterConnect()\n    {\n\n    }\n    \n    public function beforeQuery()\n    {\n\n    }\n\n    public function afterQuery()\n    {\n\n    }\n\n}\n</pre>\n<p>This new class can be as verbose as we need it to. The EventManager will interface between the component and our listener class, offering hook points based on the methods we defined in our listener class.:</p>\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\n\n//Create a database listener\n$dbListener = new MyDbListener()\n\n//Listen all the database events\n$eventsManager-&gt;attach('db', $dbListener);\n\n$connection = new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n    \"host\" =&gt; \"localhost\",\n    \"username\" =&gt; \"root\",\n    \"password\" =&gt; \"secret\",\n    \"dbname\" =&gt; \"invo\"\n));\n\n//Assign the eventsManager to the db adapter instance\n$connection-&gt;setEventsManager($eventsManager);\n\n//Send a SQL command to the database server\n$connection-&gt;query(\"SELECT * FROM products p WHERE p.status = 1\");\n</pre>\n<p>In order to log all the SQL statements executed by our application, we need to use the event &ldquo;afterQuery&rdquo;. The first parameter passed to the event listener contains contextual information about the event that is running, the second is the connection itself.</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    protected $_logger;\n\n    public function __construct()\n    {\n        $this-&gt;_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");\n    }    \n\n    public function afterQuery($event, $connection)\n    {\n        $this-&gt;_logger-&gt;log($connection-&gt;getSQLStatement(), \\Phalcon\\Logger::INFO);\n    }\n\n}\n</pre>\n<p>As part of this example, we will also implement the Phalcon\\Db\\Profiler to detect the SQL statements that are taking longer to execute than expected:</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    protected $_profiler;\n\n    protected $_logger;\n\n    public function __construct()\n    {\n        $this-&gt;_profiler = new \\Phalcon\\Db\\Profiler();\n        $this-&gt;_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");        \n    }\n\n    public function beforeQuery($event, $connection)\n    {\n        $this-&gt;_profiler-&gt;startProfile($connection-&gt;getSQLStatement());\n    }\n\n    public function afterQuery($event, $connection)\n    {\n        $this-&gt;_logger-&gt;log($connection-&gt;getSQLStatement(), \\Phalcon\\Logger::INFO);\n        $this-&gt;_profiler-&gt;stopProfile();\n    }\n\n    public function getProfiler()\n    {\n        return $this-&gt;_profiler;\n    }\n\n}\n</pre>\n<p>The resulting profile data can be obtained from the listener:</p>\n<pre class=\"sh_php\">//Send a SQL command to the database server\n$connection-&gt;query(\"SELECT * FROM products p WHERE p.status = 1\");\n\nforeach($dbListener-&gt;getProfiler()-&gt;getProfiles() as $profile){\n    echo \"SQL Statement: \", $profile-&gt;getSQLStatement(), \"\\n\";\n    echo \"Start Time: \", $profile-&gt;getInitialTime(), \"\\n\"<br>    echo \"Final Time: \", $profile-&gt;getFinalTime(), \"\\n\";\n    echo \"Total Elapsed Time: \", $profile-&gt;getTotalElapsedSeconds(), \"\\n\";\n}\n</pre>\n<p>In a similar manner we can register an lambda function to perform the task instead of a separate listener class (as seen above):</p>\n<pre class=\"sh_php\">//Listen all the database events\n$eventManager-&gt;attach('db', function($event, $connection){    \n    if ($event-&gt;getType() == 'afterQuery') {\n        echo $connection-&gt;getSQLStatement();\n    }\n});\n</pre>\n<p>In the following example, the EventsManager is working with the class loader, allowing us to obtain debugging information regarding the flow of operation:</p>\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\n\n$loader = new \\Phalcon\\Loader();\n\n$loader-&gt;registerNamespaces(array(\n   'Example\\\\Base' =&gt; 'vendor/example/base/',\n   'Example\\\\Adapter' =&gt; 'vendor/example/adapter/',\n   'Example' =&gt; 'vendor/example/'\n));\n\n//Listen all the loader events\n$eventsManager-&gt;attach('loader', function(){\n    if ($event-&gt;getType() == 'beforeCheckPath') {\n        echo $loader-&gt;getCheckedPath();\n    }\n});\n\n$loader-&gt;setEventsManager($eventsManager);\n\n$loader-&gt;register();\n</pre>\n<p><strong>Conclusion</strong><br>The new Phalcon Events Manager, offers an easy way to intercept and manipulate, if needed, the normal flow of operation. With the EventsManager the developer can create hooks or plugins that will offer monitoring of data, manipulation, conditional execution and much more.</p>\n<p>We made a lot of low-level optimizations in Phalcon, so as to ensure that there is very little if any reduction in performance with the introduction of the EventsManager, while at the same time offering an increased extensibility throughout the framework.</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"29280239243"},"content":"<p>In addition to the dependency injection component seen in the previous post of the introduction series, a new component makes its appearance in Phalcon 0.5: the Events Manager. Its purpose is to intercept the execution of most of the components of the framework by creating “hooks point”. These hook points allow the developer to obtain status information, manipulate data or change the flow of execution during the process of a component.</p>\n<p>In the following example, we use the EventManager to listen for events produced in a MySQL connection managed by Phalcon\\Db. First of all, we need a listener object to do this. We create a class which methods are the events we want to listen:</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    public function afterConnect()\n    {\n\n    }\n    \n    public function beforeQuery()\n    {\n\n    }\n\n    public function afterQuery()\n    {\n\n    }\n\n}\n</pre>\n<p>This new class can be as verbose as we need it to. The EventManager will interface between the component and our listener class, offering hook points based on the methods we defined in our listener class.:</p>\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\n\n//Create a database listener\n$dbListener = new MyDbListener()\n\n//Listen all the database events\n$eventsManager->attach('db', $dbListener);\n\n$connection = new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n    \"host\" => \"localhost\",\n    \"username\" => \"root\",\n    \"password\" => \"secret\",\n    \"dbname\" => \"invo\"\n));\n\n//Assign the eventsManager to the db adapter instance\n$connection->setEventsManager($eventsManager);\n\n//Send a SQL command to the database server\n$connection->query(\"SELECT * FROM products p WHERE p.status = 1\");\n</pre>\n<p>In order to log all the SQL statements executed by our application, we need to use the event “afterQuery”. The first parameter passed to the event listener contains contextual information about the event that is running, the second is the connection itself.</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    protected $_logger;\n\n    public function __construct()\n    {\n        $this->_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");\n    }    \n\n    public function afterQuery($event, $connection)\n    {\n        $this->_logger->log($connection->getSQLStatement(), \\Phalcon\\Logger::INFO);\n    }\n\n}\n</pre>\n<p>As part of this example, we will also implement the Phalcon\\Db\\Profiler to detect the SQL statements that are taking longer to execute than expected:</p>\n<pre class=\"sh_php\">class MyDbListener \n{\n\n    protected $_profiler;\n\n    protected $_logger;\n\n    public function __construct()\n    {\n        $this->_profiler = new \\Phalcon\\Db\\Profiler();\n        $this->_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");        \n    }\n\n    public function beforeQuery($event, $connection)\n    {\n        $this->_profiler->startProfile($connection->getSQLStatement());\n    }\n\n    public function afterQuery($event, $connection)\n    {\n        $this->_logger->log($connection->getSQLStatement(), \\Phalcon\\Logger::INFO);\n        $this->_profiler->stopProfile();\n    }\n\n    public function getProfiler()\n    {\n        return $this->_profiler;\n    }\n\n}\n</pre>\n<p>The resulting profile data can be obtained from the listener:</p>\n<pre class=\"sh_php\">//Send a SQL command to the database server\n$connection->query(\"SELECT * FROM products p WHERE p.status = 1\");\n\nforeach($dbListener->getProfiler()->getProfiles() as $profile){\n    echo \"SQL Statement: \", $profile->getSQLStatement(), \"\\n\";\n    echo \"Start Time: \", $profile->getInitialTime(), \"\\n\"<br>    echo \"Final Time: \", $profile->getFinalTime(), \"\\n\";\n    echo \"Total Elapsed Time: \", $profile->getTotalElapsedSeconds(), \"\\n\";\n}\n</pre>\n<p>In a similar manner we can register an lambda function to perform the task instead of a separate listener class (as seen above):</p>\n<pre class=\"sh_php\">//Listen all the database events\n$eventManager->attach('db', function($event, $connection){    \n    if ($event->getType() == 'afterQuery') {\n        echo $connection->getSQLStatement();\n    }\n});\n</pre>\n<p>In the following example, the EventsManager is working with the class loader, allowing us to obtain debugging information regarding the flow of operation:</p>\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\n\n$loader = new \\Phalcon\\Loader();\n\n$loader->registerNamespaces(array(\n   'Example\\\\Base' => 'vendor/example/base/',\n   'Example\\\\Adapter' => 'vendor/example/adapter/',\n   'Example' => 'vendor/example/'\n));\n\n//Listen all the loader events\n$eventsManager->attach('loader', function(){\n    if ($event->getType() == 'beforeCheckPath') {\n        echo $loader->getCheckedPath();\n    }\n});\n\n$loader->setEventsManager($eventsManager);\n\n$loader->register();\n</pre>\n<p><strong>Conclusion</strong><br>The new Phalcon Events Manager, offers an easy way to intercept and manipulate, if needed, the normal flow of operation. With the EventsManager the developer can create hooks or plugins that will offer monitoring of data, manipulation, conditional execution and much more.</p>\n<p>We made a lot of low-level optimizations in Phalcon, so as to ensure that there is very little if any reduction in performance with the introduction of the EventsManager, while at the same time offering an increased extensibility throughout the framework.</p>","content_raw":"<p>In addition to the dependency injection component seen in the previous post of the introduction series, a new component makes its appearance in Phalcon 0.5: the Events Manager. Its purpose is to intercept the execution of most of the components of the framework by creating \"hooks point\". These hook points allow the developer to obtain status information, manipulate data or change the flow of execution during the process of a component.</p>\r\n<p>In the following example, we use the EventManager to listen for events produced in a MySQL connection managed by Phalcon\\Db. First of all, we need a listener object to do this. We create a class which methods are the events we want to listen:</p>\r\n<pre class=\"sh_php\">class MyDbListener \r\n{\r\n\r\n    public function afterConnect()\r\n    {\r\n\r\n    }\r\n    \r\n    public function beforeQuery()\r\n    {\r\n\r\n    }\r\n\r\n    public function afterQuery()\r\n    {\r\n\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>This new class can be as verbose as we need it to. The EventManager will interface between the component and our listener class, offering hook points based on the methods we defined in our listener class.:</p>\r\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\r\n\r\n//Create a database listener\r\n$dbListener = new MyDbListener()\r\n\r\n//Listen all the database events\r\n$eventsManager-&gt;attach('db', $dbListener);\r\n\r\n$connection = new \\Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\r\n    \"host\" =&gt; \"localhost\",\r\n    \"username\" =&gt; \"root\",\r\n    \"password\" =&gt; \"secret\",\r\n    \"dbname\" =&gt; \"invo\"\r\n));\r\n\r\n//Assign the eventsManager to the db adapter instance\r\n$connection-&gt;setEventsManager($eventsManager);\r\n\r\n//Send a SQL command to the database server\r\n$connection-&gt;query(\"SELECT * FROM products p WHERE p.status = 1\");\r\n</pre>\r\n<p>In order to log all the SQL statements executed by our application, we need to use the event \"afterQuery\". The first parameter passed to the event listener contains contextual information about the event that is running, the second is the connection itself.</p>\r\n<pre class=\"sh_php\">class MyDbListener \r\n{\r\n\r\n    protected $_logger;\r\n\r\n    public function __construct()\r\n    {\r\n        $this-&gt;_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");\r\n    }    \r\n\r\n    public function afterQuery($event, $connection)\r\n    {\r\n        $this-&gt;_logger-&gt;log($connection-&gt;getSQLStatement(), \\Phalcon\\Logger::INFO);\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>As part of this example, we will also implement the Phalcon\\Db\\Profiler to detect the SQL statements that are taking longer to execute than expected:</p>\r\n<pre class=\"sh_php\">class MyDbListener \r\n{\r\n\r\n    protected $_profiler;\r\n\r\n    protected $_logger;\r\n\r\n    public function __construct()\r\n    {\r\n        $this-&gt;_profiler = new \\Phalcon\\Db\\Profiler();\r\n        $this-&gt;_logger = new \\Phalcon\\Logger\\Adapter\\File(\"../apps/logs/db.log\");        \r\n    }\r\n\r\n    public function beforeQuery($event, $connection)\r\n    {\r\n        $this-&gt;_profiler-&gt;startProfile($connection-&gt;getSQLStatement());\r\n    }\r\n\r\n    public function afterQuery($event, $connection)\r\n    {\r\n        $this-&gt;_logger-&gt;log($connection-&gt;getSQLStatement(), \\Phalcon\\Logger::INFO);\r\n        $this-&gt;_profiler-&gt;stopProfile();\r\n    }\r\n\r\n    public function getProfiler()\r\n    {\r\n        return $this-&gt;_profiler;\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>The resulting profile data can be obtained from the listener:</p>\r\n<pre class=\"sh_php\">//Send a SQL command to the database server\r\n$connection-&gt;query(\"SELECT * FROM products p WHERE p.status = 1\");\r\n\r\nforeach($dbListener-&gt;getProfiler()-&gt;getProfiles() as $profile){\r\n    echo \"SQL Statement: \", $profile-&gt;getSQLStatement(), \"\\n\";\r\n    echo \"Start Time: \", $profile-&gt;getInitialTime(), \"\\n\"<br>    echo \"Final Time: \", $profile-&gt;getFinalTime(), \"\\n\";\r\n    echo \"Total Elapsed Time: \", $profile-&gt;getTotalElapsedSeconds(), \"\\n\";\r\n}\r\n</pre>\r\n<p>In a similar manner we can register an lambda function to perform the task instead of a separate listener class (as seen above):</p>\r\n<pre class=\"sh_php\">//Listen all the database events\r\n$eventManager-&gt;attach('db', function($event, $connection){    \r\n    if ($event-&gt;getType() == 'afterQuery') {\r\n        echo $connection-&gt;getSQLStatement();\r\n    }\r\n});\r\n</pre>\r\n<p>In the following example, the EventsManager is working with the class loader, allowing us to obtain debugging information regarding the flow of operation:</p>\r\n<pre class=\"sh_php\">$eventsManager = new \\Phalcon\\Events\\Manager();\r\n\r\n$loader = new \\Phalcon\\Loader();\r\n\r\n$loader-&gt;registerNamespaces(array(\r\n   'Example\\\\Base' =&gt; 'vendor/example/base/',\r\n   'Example\\\\Adapter' =&gt; 'vendor/example/adapter/',\r\n   'Example' =&gt; 'vendor/example/'\r\n));\r\n\r\n//Listen all the loader events\r\n$eventsManager-&gt;attach('loader', function(){\r\n    if ($event-&gt;getType() == 'beforeCheckPath') {\r\n        echo $loader-&gt;getCheckedPath();\r\n    }\r\n});\r\n\r\n$loader-&gt;setEventsManager($eventsManager);\r\n\r\n$loader-&gt;register();\r\n</pre>\r\n<p><strong>Conclusion</strong><br>The new Phalcon Events Manager, offers an easy way to intercept and manipulate, if needed, the normal flow of operation. With the EventsManager the developer can create hooks or plugins that will offer monitoring of data, manipulation, conditional execution and much more.</p>\r\n<p>We made a lot of low-level optimizations in Phalcon, so as to ensure that there is very little if any reduction in performance with the introduction of the EventsManager, while at the same time offering an increased extensibility throughout the framework.</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-08-012
-->


Introduction Series 2: The Events Manager
=========================================

In addition to the dependency injection component seen in the previous
post of the introduction series, a new component makes its appearance in
Phalcon 0.5: the Events Manager. Its purpose is to intercept the
execution of most of the components of the framework by creating “hooks
point”. These hook points allow the developer to obtain status
information, manipulate data or change the flow of execution during the
process of a component.

In the following example, we use the EventManager to listen for events
produced in a MySQL connection managed by Phalcon\\Db. First of all, we
need a listener object to do this. We create a class which methods are
the events we want to listen:

~~~~ {.sh_php}
class MyDbListener 
{

    public function afterConnect()
    {

    }
    
    public function beforeQuery()
    {

    }

    public function afterQuery()
    {

    }

}
~~~~

This new class can be as verbose as we need it to. The EventManager will
interface between the component and our listener class, offering hook
points based on the methods we defined in our listener class.:

~~~~ {.sh_php}
$eventsManager = new \Phalcon\Events\Manager();

//Create a database listener
$dbListener = new MyDbListener()

//Listen all the database events
$eventsManager->attach('db', $dbListener);

$connection = new \Phalcon\Db\Adapter\Pdo\Mysql(array(
    "host" => "localhost",
    "username" => "root",
    "password" => "secret",
    "dbname" => "invo"
));

//Assign the eventsManager to the db adapter instance
$connection->setEventsManager($eventsManager);

//Send a SQL command to the database server
$connection->query("SELECT * FROM products p WHERE p.status = 1");
~~~~

In order to log all the SQL statements executed by our application, we
need to use the event “afterQuery”. The first parameter passed to the
event listener contains contextual information about the event that is
running, the second is the connection itself.

~~~~ {.sh_php}
class MyDbListener 
{

    protected $_logger;

    public function __construct()
    {
        $this->_logger = new \Phalcon\Logger\Adapter\File("../apps/logs/db.log");
    }    

    public function afterQuery($event, $connection)
    {
        $this->_logger->log($connection->getSQLStatement(), \Phalcon\Logger::INFO);
    }

}
~~~~

As part of this example, we will also implement the
Phalcon\\Db\\Profiler to detect the SQL statements that are taking
longer to execute than expected:

~~~~ {.sh_php}
class MyDbListener 
{

    protected $_profiler;

    protected $_logger;

    public function __construct()
    {
        $this->_profiler = new \Phalcon\Db\Profiler();
        $this->_logger = new \Phalcon\Logger\Adapter\File("../apps/logs/db.log");        
    }

    public function beforeQuery($event, $connection)
    {
        $this->_profiler->startProfile($connection->getSQLStatement());
    }

    public function afterQuery($event, $connection)
    {
        $this->_logger->log($connection->getSQLStatement(), \Phalcon\Logger::INFO);
        $this->_profiler->stopProfile();
    }

    public function getProfiler()
    {
        return $this->_profiler;
    }

}
~~~~

The resulting profile data can be obtained from the listener:

~~~~ {.sh_php}
//Send a SQL command to the database server
$connection->query("SELECT * FROM products p WHERE p.status = 1");

foreach($dbListener->getProfiler()->getProfiles() as $profile){
    echo "SQL Statement: ", $profile->getSQLStatement(), "\n";
    echo "Start Time: ", $profile->getInitialTime(), "\n"    echo "Final Time: ", $profile->getFinalTime(), "\n";
    echo "Total Elapsed Time: ", $profile->getTotalElapsedSeconds(), "\n";
}
~~~~

In a similar manner we can register an lambda function to perform the
task instead of a separate listener class (as seen above):

~~~~ {.sh_php}
//Listen all the database events
$eventManager->attach('db', function($event, $connection){    
    if ($event->getType() == 'afterQuery') {
        echo $connection->getSQLStatement();
    }
});
~~~~

In the following example, the EventsManager is working with the class
loader, allowing us to obtain debugging information regarding the flow
of operation:

~~~~ {.sh_php}
$eventsManager = new \Phalcon\Events\Manager();

$loader = new \Phalcon\Loader();

$loader->registerNamespaces(array(
   'Example\\Base' => 'vendor/example/base/',
   'Example\\Adapter' => 'vendor/example/adapter/',
   'Example' => 'vendor/example/'
));

//Listen all the loader events
$eventsManager->attach('loader', function(){
    if ($event->getType() == 'beforeCheckPath') {
        echo $loader->getCheckedPath();
    }
});

$loader->setEventsManager($eventsManager);

$loader->register();
~~~~

**Conclusion**\
The new Phalcon Events Manager, offers an easy way to intercept and
manipulate, if needed, the normal flow of operation. With the
EventsManager the developer can create hooks or plugins that will offer
monitoring of data, manipulation, conditional execution and much more.

We made a lot of low-level optimizations in Phalcon, so as to ensure
that there is very little if any reduction in performance with the
introduction of the EventsManager, while at the same time offering an
increased extensibility throughout the framework.

