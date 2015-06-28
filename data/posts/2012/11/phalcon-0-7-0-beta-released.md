<!--
slug: phalcon-0-7-0-beta-released
date: Wed Nov 21 2012 11:00:00 GMT-0500 (EST)
tags: php, phalcon, orm, release
title: Phalcon 0.7.0 beta released
id: 36213237029
link: http://blog.phalconphp.com/post/36213237029/phalcon-0-7-0-beta-released
raw: {"blog_name":"phalconphp","id":36213237029,"post_url":"http://blog.phalconphp.com/post/36213237029/phalcon-0-7-0-beta-released","slug":"phalcon-0-7-0-beta-released","type":"text","date":"2012-11-21 16:00:00 GMT","timestamp":1353513600,"state":"published","format":"html","reblog_key":"EjsB77M7","tags":["php","phalcon","orm","release"],"short_url":"http://tmblr.co/Z6PumvXkUYKb","highlighted":[],"note_count":2,"title":"Phalcon 0.7.0 beta released","body":"<p>The newest version of Phalcon has entered the beta stage. 0.7.0 Beta 1 is now available. This upcoming release introduces features requested by the community, to make the framework more extensible and more robust.</p>\n<p>Some of the most important features introduced in this version are highlighted below:</p>\n<p><strong>Interfaces</strong><br/> We have added over 40 interfaces to the framework. Most of the components/classes now have <a href=\"http://php.net/manual/en/language.oop5.interfaces.php\">interfaces</a> that allow the framework to be extended as much as possible. The developers can now simply implement the relevant interface and replace specific (or all) parts of the framework with custom classes. In addition to this, developers can create new adapters for existing components thus expanding the framework according to their needs.</p>\n<p>For example:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass MySessionHandler implements Phalcon\\Session\\AdapterInterface \n{\n    \n    public function start()\n    {\n    }\n\n    public function setOptions(array $options)\n    {\n    }\n\n    public function getOptions()\n    {\n    }\n\n    public function get($index)\n    {\n    }\n\n    public function set($index, $value)\n    {\n    }\n\n    public function has($index)\n    {\n    }\n\n    public function remove($index)\n    {\n    }\n\n    public function getId()\n    {\n    }\n\n    public function isStarted()\n    {\n    }\n\n    public function destroy()\n    {\n    }\n\n}\n</pre>\n<p><strong>Independent Column Map</strong><br/> The <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> now supports a independent column map, which allows the developer to use different column names in the model to the ones in the table. Phalcon will recognize the new column names and will rename them accordingly to match the respective columns in the database. This is a great feature when one needs to rename fields in the database without having to worry about all the queries in the code. A change in the column map in the model will take care of the rest. For example:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass Robots extends Phalcon\\Mvc\\Model\n{\n    \n    public function columnMap()\n    {\n        //Keys are the real names in the table and <br/>        //the values their names in the application\n        return array(\n            'id' =&gt; 'code',\n            'the_name' =&gt; 'theName',\n            'the_type' =&gt; 'theType',\n            'the_year' =&gt; 'theYear'\n        );\n    }\n\n}\n</pre>\n<p>Then you can use the new names naturally in your code:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n//Find a robot by its name\n$robot = Robots::findFirst(\"theName = 'Voltron'\");\necho $robot-&gt;theName, \"\\n\";\n\n//Get robots ordered by type\n$robot = Robots::find(array('order' =&gt; 'theType DESC'));\nforeach ($robots as $robot) {\n    echo 'Code: ', $robot-&gt;code, \"\\n\";\n}\n\n$robot = new Robots();\n$robot-&gt;code = '10101';\n$robot-&gt;theName = 'Bender';\n$robot-&gt;theType = 'Industrial';\n$robot-&gt;theYear = 2999;\n$robot-&gt;save();\n</pre>\n<p><strong>ORM queries through PHQL</strong><br/> From 0.7.0, all the queries made by the ORM are now made through <a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a>.</p>\n<p>In PHQL, we&rsquo;ve implemented a set of features to make your access to databases more secure:</p>\n<ul><li>PHQL implements a high level abstraction allowing you handling models as tables and class attributes as fields</li>\n<li><a href=\"http://www.php.net/manual/en/pdo.prepared-statements.php\">Bound parameters</a> are part of the PHQL language helping you to secure your code</li>\n<li>PHQL only allows one SQL statement to be executed per call preventing injections</li>\n<li>PHQL ignores all SQL comments which are often used in <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injections</a></li>\n<li>PHQL only allows data manipulation statements, avoiding altering or dropping tables/databases by mistake or externally without authorization</li>\n</ul><p><strong>Object/Oriented Builder for PHQL</strong><br/> A new builder is available to create PHQL queries without the need to write PHQL statements:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$builder = new Phalcon\\Mvc\\Model\\Query\\Builder();\n\n$result = $builder-&gt;from('Robots')\n    -&gt;join('RobotsParts');\n    -&gt;limit(20);\n    -&gt;order('Robots.name')\n    -&gt;getQuery()\n    -&gt;execute();\n</pre>\n<p>The same as:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT r.*, p.* \n    FROM Robots r JOIN RobotsParts p \n    ORDER BY r.name LIMIT 20\";\n$result = $manager-&gt;executeQuery($phql);\n</pre>\n<p><strong>Full escaping system for generated SQL</strong><br/> Sometimes some our preferred names are reserved key words of the database system, so if they aren&rsquo;t correctly escaped using them as part of a SQL statement will cause a syntax error. To fix this Phalcon implements a full escaping system for every SQL generated by the ORM.</p>\n<p>The following PHQL statement:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT \nStore\\Toys\\Robots.type,\nSUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) AS totalPrice\nFROM Store\\Toys\\Robots \nWHERE Store\\Toys\\Robots.theType != 'virtual'\nGROUP BY Store\\Toys\\Robots.theType, 2\nHAVING SUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) &gt; 1000\"\n</pre>\n<p>Produces the following escaped SQL in MySQL:</p>\n<pre class=\"sh_sql sh_sourceCode\">SELECT `robots`.`type`,\nSUM(`robots`.`price` + `robots`.`taxes`) AS `totalPrice`\nFROM `robots`\nWHERE `robots`.`type` != 'virtual'\nGROUP BY `robots`.`type`, 2\nHAVING SUM(`robots`.`price` + `robots`.`taxes`) &gt; 1000\n</pre>\n<p>Escaping columns also avoids possible SQL injections making applications more secure.</p>\n<p><strong>Events Propagation/Cancelation</strong><br/> The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">EventsManager</a> now controls the event propagation allowing the developer to stop events preventing other listeners from being notified of an event in course. This is a great feature for those that need to control every step of the application logic.</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$eventsManager-&gt;attach('db', function($event, $connection){\n\n    //We stop the event if it is cancelable\n    if ($event-&gt;isCancelable()) {\n        //Stop the event, so other listeners will not be notified about this\n        $event-&gt;stop();\n    }\n\n    //...\n\n});\n</pre>\n<p><strong>Registering services as &ldquo;always shared&rdquo;</strong><br/><a href=\"http://docs.phalconphp.com/en/latest/reference/di.html\">Phalcon\\Di</a> has been refactored to register services always as shared. Following the Singleton pattern, no matter how the service is retrieved from the services container it will return always the first instance created:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n//Passing true as third parameter make it act as \"always shared\"\n$di-&gt;set('session', function (){\n    $session = new Phalcon\\Session\\Adapter\\Files();\n    $session-&gt;start();\n    return $session;\n});\n\n//Alternative way use \"setShared\"\n$di-&gt;setShared('session', function (){\n    $session = new Phalcon\\Session\\Adapter\\Files();\n    $session-&gt;start();\n    return $session;\n});\n</pre>\n<p>Returning the service in any way will return a shared instance of the service:</p>\n<pre class=\"sh_php sh_sourceCode\">$session = $di-&gt;get('session'); //By name\n$session = $di-&gt;getSession(); //Using the magic getter\n</pre>\n<p>0.7.0 includes other minor changes and bug fixes, see complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.7.0/CHANGELOG\">CHANGELOG</a> here. Applications created with 0.5.x/0.6.x will compatible with this new version.</p>\n<p>All the tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3287750\">Travis</a>, and <a href=\"http://phalconphp.com/\">our website</a> is running with it some couple of weeks ago, please update your applications to this version and report any problems/bugs on <a href=\"https://github.com/phalcon/cphalcon\">github</a>.</p>\n<p>Linux/Unix/Mac users please compile the extension from the <a href=\"https://github.com/phalcon/cphalcon/tree/0.7.0\">0.7.0</a> branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"https://github.com/phalcon/cphalcon\">https://github.com/phalcon/cphalcon</a>\ncd cphalcon/build\ngit checkout 0.7.0\nsudo ./install\n</pre>\n<p>Windows DLLs are available on the <a href=\"http://phalconphp.com/download\">download</a> page.</p>\n<p>Thanks for using Phalcon!</p>","reblog":{"tree_html":"","comment":"<p>The newest version of Phalcon has entered the beta stage. 0.7.0 Beta 1 is now available. This upcoming release introduces features requested by the community, to make the framework more extensible and more robust.</p>\n<p>Some of the most important features introduced in this version are highlighted below:</p>\n<p><strong>Interfaces</strong><br> We have added over 40 interfaces to the framework. Most of the components/classes now have <a href=\"http://php.net/manual/en/language.oop5.interfaces.php\">interfaces</a> that allow the framework to be extended as much as possible. The developers can now simply implement the relevant interface and replace specific (or all) parts of the framework with custom classes. In addition to this, developers can create new adapters for existing components thus expanding the framework according to their needs.</p>\n<p>For example:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass MySessionHandler implements Phalcon\\Session\\AdapterInterface \n{\n    \n    public function start()\n    {\n    }\n\n    public function setOptions(array $options)\n    {\n    }\n\n    public function getOptions()\n    {\n    }\n\n    public function get($index)\n    {\n    }\n\n    public function set($index, $value)\n    {\n    }\n\n    public function has($index)\n    {\n    }\n\n    public function remove($index)\n    {\n    }\n\n    public function getId()\n    {\n    }\n\n    public function isStarted()\n    {\n    }\n\n    public function destroy()\n    {\n    }\n\n}\n</pre>\n<p><strong>Independent Column Map</strong><br> The <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> now supports a independent column map, which allows the developer to use different column names in the model to the ones in the table. Phalcon will recognize the new column names and will rename them accordingly to match the respective columns in the database. This is a great feature when one needs to rename fields in the database without having to worry about all the queries in the code. A change in the column map in the model will take care of the rest. For example:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass Robots extends Phalcon\\Mvc\\Model\n{\n    \n    public function columnMap()\n    {\n        //Keys are the real names in the table and <br>        //the values their names in the application\n        return array(\n            'id' =&gt; 'code',\n            'the_name' =&gt; 'theName',\n            'the_type' =&gt; 'theType',\n            'the_year' =&gt; 'theYear'\n        );\n    }\n\n}\n</pre>\n<p>Then you can use the new names naturally in your code:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n//Find a robot by its name\n$robot = Robots::findFirst(\"theName = 'Voltron'\");\necho $robot-&gt;theName, \"\\n\";\n\n//Get robots ordered by type\n$robot = Robots::find(array('order' =&gt; 'theType DESC'));\nforeach ($robots as $robot) {\n    echo 'Code: ', $robot-&gt;code, \"\\n\";\n}\n\n$robot = new Robots();\n$robot-&gt;code = '10101';\n$robot-&gt;theName = 'Bender';\n$robot-&gt;theType = 'Industrial';\n$robot-&gt;theYear = 2999;\n$robot-&gt;save();\n</pre>\n<p><strong>ORM queries through PHQL</strong><br> From 0.7.0, all the queries made by the ORM are now made through <a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a>.</p>\n<p>In PHQL, we&rsquo;ve implemented a set of features to make your access to databases more secure:</p>\n<ul><li>PHQL implements a high level abstraction allowing you handling models as tables and class attributes as fields</li>\n<li><a href=\"http://www.php.net/manual/en/pdo.prepared-statements.php\">Bound parameters</a> are part of the PHQL language helping you to secure your code</li>\n<li>PHQL only allows one SQL statement to be executed per call preventing injections</li>\n<li>PHQL ignores all SQL comments which are often used in <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injections</a></li>\n<li>PHQL only allows data manipulation statements, avoiding altering or dropping tables/databases by mistake or externally without authorization</li>\n</ul><p><strong>Object/Oriented Builder for PHQL</strong><br> A new builder is available to create PHQL queries without the need to write PHQL statements:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$builder = new Phalcon\\Mvc\\Model\\Query\\Builder();\n\n$result = $builder-&gt;from('Robots')\n    -&gt;join('RobotsParts');\n    -&gt;limit(20);\n    -&gt;order('Robots.name')\n    -&gt;getQuery()\n    -&gt;execute();\n</pre>\n<p>The same as:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT r.*, p.* \n    FROM Robots r JOIN RobotsParts p \n    ORDER BY r.name LIMIT 20\";\n$result = $manager-&gt;executeQuery($phql);\n</pre>\n<p><strong>Full escaping system for generated SQL</strong><br> Sometimes some our preferred names are reserved key words of the database system, so if they aren&rsquo;t correctly escaped using them as part of a SQL statement will cause a syntax error. To fix this Phalcon implements a full escaping system for every SQL generated by the ORM.</p>\n<p>The following PHQL statement:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT \nStore\\Toys\\Robots.type,\nSUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) AS totalPrice\nFROM Store\\Toys\\Robots \nWHERE Store\\Toys\\Robots.theType != 'virtual'\nGROUP BY Store\\Toys\\Robots.theType, 2\nHAVING SUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) &gt; 1000\"\n</pre>\n<p>Produces the following escaped SQL in MySQL:</p>\n<pre class=\"sh_sql sh_sourceCode\">SELECT `robots`.`type`,\nSUM(`robots`.`price` + `robots`.`taxes`) AS `totalPrice`\nFROM `robots`\nWHERE `robots`.`type` != 'virtual'\nGROUP BY `robots`.`type`, 2\nHAVING SUM(`robots`.`price` + `robots`.`taxes`) &gt; 1000\n</pre>\n<p>Escaping columns also avoids possible SQL injections making applications more secure.</p>\n<p><strong>Events Propagation/Cancelation</strong><br> The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">EventsManager</a> now controls the event propagation allowing the developer to stop events preventing other listeners from being notified of an event in course. This is a great feature for those that need to control every step of the application logic.</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$eventsManager-&gt;attach('db', function($event, $connection){\n\n    //We stop the event if it is cancelable\n    if ($event-&gt;isCancelable()) {\n        //Stop the event, so other listeners will not be notified about this\n        $event-&gt;stop();\n    }\n\n    //...\n\n});\n</pre>\n<p><strong>Registering services as &ldquo;always shared&rdquo;</strong><br><a href=\"http://docs.phalconphp.com/en/latest/reference/di.html\">Phalcon\\Di</a> has been refactored to register services always as shared. Following the Singleton pattern, no matter how the service is retrieved from the services container it will return always the first instance created:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n//Passing true as third parameter make it act as \"always shared\"\n$di-&gt;set('session', function (){\n    $session = new Phalcon\\Session\\Adapter\\Files();\n    $session-&gt;start();\n    return $session;\n});\n\n//Alternative way use \"setShared\"\n$di-&gt;setShared('session', function (){\n    $session = new Phalcon\\Session\\Adapter\\Files();\n    $session-&gt;start();\n    return $session;\n});\n</pre>\n<p>Returning the service in any way will return a shared instance of the service:</p>\n<pre class=\"sh_php sh_sourceCode\">$session = $di-&gt;get('session'); //By name\n$session = $di-&gt;getSession(); //Using the magic getter\n</pre>\n<p>0.7.0 includes other minor changes and bug fixes, see complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.7.0/CHANGELOG\">CHANGELOG</a> here. Applications created with 0.5.x/0.6.x will compatible with this new version.</p>\n<p>All the tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3287750\">Travis</a>, and <a href=\"http://phalconphp.com/\">our website</a> is running with it some couple of weeks ago, please update your applications to this version and report any problems/bugs on <a href=\"https://github.com/phalcon/cphalcon\">github</a>.</p>\n<p>Linux/Unix/Mac users please compile the extension from the <a href=\"https://github.com/phalcon/cphalcon/tree/0.7.0\">0.7.0</a> branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"https://github.com/phalcon/cphalcon\">https://github.com/phalcon/cphalcon</a>\ncd cphalcon/build\ngit checkout 0.7.0\nsudo ./install\n</pre>\n<p>Windows DLLs are available on the <a href=\"http://phalconphp.com/download\">download</a> page.</p>\n<p>Thanks for using Phalcon!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"36213237029"},"content":"<p>The newest version of Phalcon has entered the beta stage. 0.7.0 Beta 1 is now available. This upcoming release introduces features requested by the community, to make the framework more extensible and more robust.</p>\n<p>Some of the most important features introduced in this version are highlighted below:</p>\n<p><strong>Interfaces</strong><br> We have added over 40 interfaces to the framework. Most of the components/classes now have <a href=\"http://php.net/manual/en/language.oop5.interfaces.php\">interfaces</a> that allow the framework to be extended as much as possible. The developers can now simply implement the relevant interface and replace specific (or all) parts of the framework with custom classes. In addition to this, developers can create new adapters for existing components thus expanding the framework according to their needs.</p>\n<p>For example:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nclass MySessionHandler implements Phalcon\\Session\\AdapterInterface \n{\n    \n    public function start()\n    {\n    }\n\n    public function setOptions(array $options)\n    {\n    }\n\n    public function getOptions()\n    {\n    }\n\n    public function get($index)\n    {\n    }\n\n    public function set($index, $value)\n    {\n    }\n\n    public function has($index)\n    {\n    }\n\n    public function remove($index)\n    {\n    }\n\n    public function getId()\n    {\n    }\n\n    public function isStarted()\n    {\n    }\n\n    public function destroy()\n    {\n    }\n\n}\n</pre>\n<p><strong>Independent Column Map</strong><br> The <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> now supports a independent column map, which allows the developer to use different column names in the model to the ones in the table. Phalcon will recognize the new column names and will rename them accordingly to match the respective columns in the database. This is a great feature when one needs to rename fields in the database without having to worry about all the queries in the code. A change in the column map in the model will take care of the rest. For example:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nclass Robots extends Phalcon\\Mvc\\Model\n{\n    \n    public function columnMap()\n    {\n        //Keys are the real names in the table and <br>        //the values their names in the application\n        return array(\n            'id' => 'code',\n            'the_name' => 'theName',\n            'the_type' => 'theType',\n            'the_year' => 'theYear'\n        );\n    }\n\n}\n</pre>\n<p>Then you can use the new names naturally in your code:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n//Find a robot by its name\n$robot = Robots::findFirst(\"theName = 'Voltron'\");\necho $robot->theName, \"\\n\";\n\n//Get robots ordered by type\n$robot = Robots::find(array('order' => 'theType DESC'));\nforeach ($robots as $robot) {\n    echo 'Code: ', $robot->code, \"\\n\";\n}\n\n$robot = new Robots();\n$robot->code = '10101';\n$robot->theName = 'Bender';\n$robot->theType = 'Industrial';\n$robot->theYear = 2999;\n$robot->save();\n</pre>\n<p><strong>ORM queries through PHQL</strong><br> From 0.7.0, all the queries made by the ORM are now made through <a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a>.</p>\n<p>In PHQL, we’ve implemented a set of features to make your access to databases more secure:</p>\n<ul><li>PHQL implements a high level abstraction allowing you handling models as tables and class attributes as fields</li>\n<li><a href=\"http://www.php.net/manual/en/pdo.prepared-statements.php\">Bound parameters</a> are part of the PHQL language helping you to secure your code</li>\n<li>PHQL only allows one SQL statement to be executed per call preventing injections</li>\n<li>PHQL ignores all SQL comments which are often used in <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injections</a></li>\n<li>PHQL only allows data manipulation statements, avoiding altering or dropping tables/databases by mistake or externally without authorization</li>\n</ul><p><strong>Object/Oriented Builder for PHQL</strong><br> A new builder is available to create PHQL queries without the need to write PHQL statements:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n$builder = new Phalcon\\Mvc\\Model\\Query\\Builder();\n\n$result = $builder->from('Robots')\n    ->join('RobotsParts');\n    ->limit(20);\n    ->order('Robots.name')\n    ->getQuery()\n    ->execute();\n</pre>\n<p>The same as:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT r.*, p.* \n    FROM Robots r JOIN RobotsParts p \n    ORDER BY r.name LIMIT 20\";\n$result = $manager->executeQuery($phql);\n</pre>\n<p><strong>Full escaping system for generated SQL</strong><br> Sometimes some our preferred names are reserved key words of the database system, so if they aren’t correctly escaped using them as part of a SQL statement will cause a syntax error. To fix this Phalcon implements a full escaping system for every SQL generated by the ORM.</p>\n<p>The following PHQL statement:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT \nStore\\Toys\\Robots.type,\nSUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) AS totalPrice\nFROM Store\\Toys\\Robots \nWHERE Store\\Toys\\Robots.theType != 'virtual'\nGROUP BY Store\\Toys\\Robots.theType, 2\nHAVING SUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) > 1000\"\n</pre>\n<p>Produces the following escaped SQL in MySQL:</p>\n<pre class=\"sh_sql sh_sourceCode\">SELECT `robots`.`type`,\nSUM(`robots`.`price` + `robots`.`taxes`) AS `totalPrice`\nFROM `robots`\nWHERE `robots`.`type` != 'virtual'\nGROUP BY `robots`.`type`, 2\nHAVING SUM(`robots`.`price` + `robots`.`taxes`) > 1000\n</pre>\n<p>Escaping columns also avoids possible SQL injections making applications more secure.</p>\n<p><strong>Events Propagation/Cancelation</strong><br> The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">EventsManager</a> now controls the event propagation allowing the developer to stop events preventing other listeners from being notified of an event in course. This is a great feature for those that need to control every step of the application logic.</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n$eventsManager->attach('db', function($event, $connection){\n\n    //We stop the event if it is cancelable\n    if ($event->isCancelable()) {\n        //Stop the event, so other listeners will not be notified about this\n        $event->stop();\n    }\n\n    //...\n\n});\n</pre>\n<p><strong>Registering services as "always shared"</strong><br><a href=\"http://docs.phalconphp.com/en/latest/reference/di.html\">Phalcon\\Di</a> has been refactored to register services always as shared. Following the Singleton pattern, no matter how the service is retrieved from the services container it will return always the first instance created:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n//Passing true as third parameter make it act as \"always shared\"\n$di->set('session', function (){\n    $session = new Phalcon\\Session\\Adapter\\Files();\n    $session->start();\n    return $session;\n});\n\n//Alternative way use \"setShared\"\n$di->setShared('session', function (){\n    $session = new Phalcon\\Session\\Adapter\\Files();\n    $session->start();\n    return $session;\n});\n</pre>\n<p>Returning the service in any way will return a shared instance of the service:</p>\n<pre class=\"sh_php sh_sourceCode\">$session = $di->get('session'); //By name\n$session = $di->getSession(); //Using the magic getter\n</pre>\n<p>0.7.0 includes other minor changes and bug fixes, see complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.7.0/CHANGELOG\">CHANGELOG</a> here. Applications created with 0.5.x/0.6.x will compatible with this new version.</p>\n<p>All the tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3287750\">Travis</a>, and <a href=\"http://phalconphp.com/\">our website</a> is running with it some couple of weeks ago, please update your applications to this version and report any problems/bugs on <a href=\"https://github.com/phalcon/cphalcon\">github</a>.</p>\n<p>Linux/Unix/Mac users please compile the extension from the <a href=\"https://github.com/phalcon/cphalcon/tree/0.7.0\">0.7.0</a> branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"https://github.com/phalcon/cphalcon\">https://github.com/phalcon/cphalcon</a>\ncd cphalcon/build\ngit checkout 0.7.0\nsudo ./install\n</pre>\n<p>Windows DLLs are available on the <a href=\"http://phalconphp.com/download\">download</a> page.</p>\n<p>Thanks for using Phalcon!</p>","content_raw":"<p>The newest version of Phalcon has entered the beta stage. 0.7.0 Beta 1 is now available. This upcoming release introduces features requested by the community, to make the framework more extensible and more robust.</p>\r\n<p>Some of the most important features introduced in this version are highlighted below:</p>\r\n<p><strong>Interfaces</strong><br> We have added over 40 interfaces to the framework. Most of the components/classes now have <a href=\"http://php.net/manual/en/language.oop5.interfaces.php\">interfaces</a> that allow the framework to be extended as much as possible. The developers can now simply implement the relevant interface and replace specific (or all) parts of the framework with custom classes. In addition to this, developers can create new adapters for existing components thus expanding the framework according to their needs.</p>\r\n<p>For example:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nclass MySessionHandler implements Phalcon\\Session\\AdapterInterface \r\n{\r\n    \r\n    public function start()\r\n    {\r\n    }\r\n\r\n    public function setOptions(array $options)\r\n    {\r\n    }\r\n\r\n    public function getOptions()\r\n    {\r\n    }\r\n\r\n    public function get($index)\r\n    {\r\n    }\r\n\r\n    public function set($index, $value)\r\n    {\r\n    }\r\n\r\n    public function has($index)\r\n    {\r\n    }\r\n\r\n    public function remove($index)\r\n    {\r\n    }\r\n\r\n    public function getId()\r\n    {\r\n    }\r\n\r\n    public function isStarted()\r\n    {\r\n    }\r\n\r\n    public function destroy()\r\n    {\r\n    }\r\n\r\n}\r\n</pre>\r\n<p><strong>Independent Column Map</strong><br> The <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> now supports a independent column map, which allows the developer to use different column names in the model to the ones in the table. Phalcon will recognize the new column names and will rename them accordingly to match the respective columns in the database. This is a great feature when one needs to rename fields in the database without having to worry about all the queries in the code. A change in the column map in the model will take care of the rest. For example:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nclass Robots extends Phalcon\\Mvc\\Model\r\n{\r\n    \r\n    public function columnMap()\r\n    {\r\n        //Keys are the real names in the table and <br>        //the values their names in the application\r\n        return array(\r\n            'id' =&gt; 'code',\r\n            'the_name' =&gt; 'theName',\r\n            'the_type' =&gt; 'theType',\r\n            'the_year' =&gt; 'theYear'\r\n        );\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Then you can use the new names naturally in your code:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n//Find a robot by its name\r\n$robot = Robots::findFirst(\"theName = 'Voltron'\");\r\necho $robot-&gt;theName, \"\\n\";\r\n\r\n//Get robots ordered by type\r\n$robot = Robots::find(array('order' =&gt; 'theType DESC'));\r\nforeach ($robots as $robot) {\r\n    echo 'Code: ', $robot-&gt;code, \"\\n\";\r\n}\r\n\r\n$robot = new Robots();\r\n$robot-&gt;code = '10101';\r\n$robot-&gt;theName = 'Bender';\r\n$robot-&gt;theType = 'Industrial';\r\n$robot-&gt;theYear = 2999;\r\n$robot-&gt;save();\r\n</pre>\r\n<p><strong>ORM queries through PHQL</strong><br> From 0.7.0, all the queries made by the ORM are now made through <a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a>.</p>\r\n<p>In PHQL, we've implemented a set of features to make your access to databases more secure:</p>\r\n<ul><li>PHQL implements a high level abstraction allowing you handling models as tables and class attributes as fields</li>\r\n<li><a href=\"http://www.php.net/manual/en/pdo.prepared-statements.php\">Bound parameters</a> are part of the PHQL language helping you to secure your code</li>\r\n<li>PHQL only allows one SQL statement to be executed per call preventing injections</li>\r\n<li>PHQL ignores all SQL comments which are often used in <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injections</a></li>\r\n<li>PHQL only allows data manipulation statements, avoiding altering or dropping tables/databases by mistake or externally without authorization</li>\r\n</ul><p><strong>Object/Oriented Builder for PHQL</strong><br> A new builder is available to create PHQL queries without the need to write PHQL statements:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n$builder = new Phalcon\\Mvc\\Model\\Query\\Builder();\r\n\r\n$result = $builder-&gt;from('Robots')\r\n    -&gt;join('RobotsParts');\r\n    -&gt;limit(20);\r\n    -&gt;order('Robots.name')\r\n    -&gt;getQuery()\r\n    -&gt;execute();\r\n</pre>\r\n<p>The same as:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT r.*, p.* \r\n    FROM Robots r JOIN RobotsParts p \r\n    ORDER BY r.name LIMIT 20\";\r\n$result = $manager-&gt;executeQuery($phql);\r\n</pre>\r\n<p><strong>Full escaping system for generated SQL</strong><br> Sometimes some our preferred names are reserved key words of the database system, so if they aren't correctly escaped using them as part of a SQL statement will cause a syntax error. To fix this Phalcon implements a full escaping system for every SQL generated by the ORM.</p>\r\n<p>The following PHQL statement:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$phql = \"SELECT \r\nStore\\Toys\\Robots.type,\r\nSUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) AS totalPrice\r\nFROM Store\\Toys\\Robots \r\nWHERE Store\\Toys\\Robots.theType != 'virtual'\r\nGROUP BY Store\\Toys\\Robots.theType, 2\r\nHAVING SUM(Store\\Toys\\Robots.price+Store\\Toys\\Robots.taxes) &gt; 1000\"\r\n</pre>\r\n<p>Produces the following escaped SQL in MySQL:</p>\r\n<pre class=\"sh_sql sh_sourceCode\">SELECT `robots`.`type`,\r\nSUM(`robots`.`price` + `robots`.`taxes`) AS `totalPrice`\r\nFROM `robots`\r\nWHERE `robots`.`type` != 'virtual'\r\nGROUP BY `robots`.`type`, 2\r\nHAVING SUM(`robots`.`price` + `robots`.`taxes`) &gt; 1000\r\n</pre>\r\n<p>Escaping columns also avoids possible SQL injections making applications more secure.</p>\r\n<p><strong>Events Propagation/Cancelation</strong><br> The <a href=\"http://docs.phalconphp.com/en/latest/reference/events.html\">EventsManager</a> now controls the event propagation allowing the developer to stop events preventing other listeners from being notified of an event in course. This is a great feature for those that need to control every step of the application logic.</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n$eventsManager-&gt;attach('db', function($event, $connection){\r\n\r\n    //We stop the event if it is cancelable\r\n    if ($event-&gt;isCancelable()) {\r\n        //Stop the event, so other listeners will not be notified about this\r\n        $event-&gt;stop();\r\n    }\r\n\r\n    //...\r\n\r\n});\r\n</pre>\r\n<p><strong>Registering services as \"always shared\"</strong><br><a href=\"http://docs.phalconphp.com/en/latest/reference/di.html\">Phalcon\\Di</a> has been refactored to register services always as shared. Following the Singleton pattern, no matter how the service is retrieved from the services container it will return always the first instance created:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n//Passing true as third parameter make it act as \"always shared\"\r\n$di-&gt;set('session', function (){\r\n    $session = new Phalcon\\Session\\Adapter\\Files();\r\n    $session-&gt;start();\r\n    return $session;\r\n});\r\n\r\n//Alternative way use \"setShared\"\r\n$di-&gt;setShared('session', function (){\r\n    $session = new Phalcon\\Session\\Adapter\\Files();\r\n    $session-&gt;start();\r\n    return $session;\r\n});\r\n</pre>\r\n<p>Returning the service in any way will return a shared instance of the service:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$session = $di-&gt;get('session'); //By name\r\n$session = $di-&gt;getSession(); //Using the magic getter\r\n</pre>\r\n<p>0.7.0 includes other minor changes and bug fixes, see complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.7.0/CHANGELOG\">CHANGELOG</a> here. Applications created with 0.5.x/0.6.x will compatible with this new version.</p>\r\n<p>All the tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3287750\">Travis</a>, and <a href=\"http://phalconphp.com/\">our website</a> is running with it some couple of weeks ago, please update your applications to this version and report any problems/bugs on <a href=\"https://github.com/phalcon/cphalcon\">github</a>.</p>\r\n<p>Linux/Unix/Mac users please compile the extension from the <a href=\"https://github.com/phalcon/cphalcon/tree/0.7.0\">0.7.0</a> branch:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone https://github.com/phalcon/cphalcon\r\ncd cphalcon/build\r\ngit checkout 0.7.0\r\nsudo ./install\r\n</pre>\r\n<p>Windows DLLs are available on the <a href=\"http://phalconphp.com/download\">download</a> page.</p>\r\n<p>Thanks for using Phalcon!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-11-021
-->


Phalcon 0.7.0 beta released
===========================

The newest version of Phalcon has entered the beta stage. 0.7.0 Beta 1
is now available. This upcoming release introduces features requested by
the community, to make the framework more extensible and more robust.

Some of the most important features introduced in this version are
highlighted below:

**Interfaces**\
 We have added over 40 interfaces to the framework. Most of the
components/classes now have
[interfaces](http://php.net/manual/en/language.oop5.interfaces.php) that
allow the framework to be extended as much as possible. The developers
can now simply implement the relevant interface and replace specific (or
all) parts of the framework with custom classes. In addition to this,
developers can create new adapters for existing components thus
expanding the framework according to their needs.

For example:

~~~~ {.sh_php .sh_sourceCode}
<?php

class MySessionHandler implements Phalcon\Session\AdapterInterface 
{
    
    public function start()
    {
    }

    public function setOptions(array $options)
    {
    }

    public function getOptions()
    {
    }

    public function get($index)
    {
    }

    public function set($index, $value)
    {
    }

    public function has($index)
    {
    }

    public function remove($index)
    {
    }

    public function getId()
    {
    }

    public function isStarted()
    {
    }

    public function destroy()
    {
    }

}
~~~~

**Independent Column Map**\
 The [ORM](http://docs.phalconphp.com/en/latest/reference/models.html)
now supports a independent column map, which allows the developer to use
different column names in the model to the ones in the table. Phalcon
will recognize the new column names and will rename them accordingly to
match the respective columns in the database. This is a great feature
when one needs to rename fields in the database without having to worry
about all the queries in the code. A change in the column map in the
model will take care of the rest. For example:

~~~~ {.sh_php .sh_sourceCode}
<?php

class Robots extends Phalcon\Mvc\Model
{
    
    public function columnMap()
    {
        //Keys are the real names in the table and         //the values their names in the application
        return array(
            'id' => 'code',
            'the_name' => 'theName',
            'the_type' => 'theType',
            'the_year' => 'theYear'
        );
    }

}
~~~~

Then you can use the new names naturally in your code:

~~~~ {.sh_php .sh_sourceCode}
<?php

//Find a robot by its name
$robot = Robots::findFirst("theName = 'Voltron'");
echo $robot->theName, "\n";

//Get robots ordered by type
$robot = Robots::find(array('order' => 'theType DESC'));
foreach ($robots as $robot) {
    echo 'Code: ', $robot->code, "\n";
}

$robot = new Robots();
$robot->code = '10101';
$robot->theName = 'Bender';
$robot->theType = 'Industrial';
$robot->theYear = 2999;
$robot->save();
~~~~

**ORM queries through PHQL**\
 From 0.7.0, all the queries made by the ORM are now made through
[PHQL](http://docs.phalconphp.com/en/latest/reference/phql.html).

In PHQL, we’ve implemented a set of features to make your access to
databases more secure:

-   PHQL implements a high level abstraction allowing you handling
    models as tables and class attributes as fields
-   [Bound
    parameters](http://www.php.net/manual/en/pdo.prepared-statements.php)
    are part of the PHQL language helping you to secure your code
-   PHQL only allows one SQL statement to be executed per call
    preventing injections
-   PHQL ignores all SQL comments which are often used in [SQL
    injections](http://en.wikipedia.org/wiki/SQL_injection)
-   PHQL only allows data manipulation statements, avoiding altering or
    dropping tables/databases by mistake or externally without
    authorization

**Object/Oriented Builder for PHQL**\
 A new builder is available to create PHQL queries without the need to
write PHQL statements:

~~~~ {.sh_php .sh_sourceCode}
<?php

$builder = new Phalcon\Mvc\Model\Query\Builder();

$result = $builder->from('Robots')
    ->join('RobotsParts');
    ->limit(20);
    ->order('Robots.name')
    ->getQuery()
    ->execute();
~~~~

The same as:

~~~~ {.sh_php .sh_sourceCode}
$phql = "SELECT r.*, p.* 
    FROM Robots r JOIN RobotsParts p 
    ORDER BY r.name LIMIT 20";
$result = $manager->executeQuery($phql);
~~~~

**Full escaping system for generated SQL**\
 Sometimes some our preferred names are reserved key words of the
database system, so if they aren’t correctly escaped using them as part
of a SQL statement will cause a syntax error. To fix this Phalcon
implements a full escaping system for every SQL generated by the ORM.

The following PHQL statement:

~~~~ {.sh_php .sh_sourceCode}
$phql = "SELECT 
Store\Toys\Robots.type,
SUM(Store\Toys\Robots.price+Store\Toys\Robots.taxes) AS totalPrice
FROM Store\Toys\Robots 
WHERE Store\Toys\Robots.theType != 'virtual'
GROUP BY Store\Toys\Robots.theType, 2
HAVING SUM(Store\Toys\Robots.price+Store\Toys\Robots.taxes) > 1000"
~~~~

Produces the following escaped SQL in MySQL:

~~~~ {.sh_sql .sh_sourceCode}
SELECT `robots`.`type`,
SUM(`robots`.`price` + `robots`.`taxes`) AS `totalPrice`
FROM `robots`
WHERE `robots`.`type` != 'virtual'
GROUP BY `robots`.`type`, 2
HAVING SUM(`robots`.`price` + `robots`.`taxes`) > 1000
~~~~

Escaping columns also avoids possible SQL injections making applications
more secure.

**Events Propagation/Cancelation**\
 The
[EventsManager](http://docs.phalconphp.com/en/latest/reference/events.html)
now controls the event propagation allowing the developer to stop events
preventing other listeners from being notified of an event in course.
This is a great feature for those that need to control every step of the
application logic.

~~~~ {.sh_php .sh_sourceCode}
<?php

$eventsManager->attach('db', function($event, $connection){

    //We stop the event if it is cancelable
    if ($event->isCancelable()) {
        //Stop the event, so other listeners will not be notified about this
        $event->stop();
    }

    //...

});
~~~~

**Registering services as "always shared"**\
[Phalcon\\Di](http://docs.phalconphp.com/en/latest/reference/di.html)
has been refactored to register services always as shared. Following the
Singleton pattern, no matter how the service is retrieved from the
services container it will return always the first instance created:

~~~~ {.sh_php .sh_sourceCode}
<?php

//Passing true as third parameter make it act as "always shared"
$di->set('session', function (){
    $session = new Phalcon\Session\Adapter\Files();
    $session->start();
    return $session;
});

//Alternative way use "setShared"
$di->setShared('session', function (){
    $session = new Phalcon\Session\Adapter\Files();
    $session->start();
    return $session;
});
~~~~

Returning the service in any way will return a shared instance of the
service:

~~~~ {.sh_php .sh_sourceCode}
$session = $di->get('session'); //By name
$session = $di->getSession(); //Using the magic getter
~~~~

0.7.0 includes other minor changes and bug fixes, see complete
[CHANGELOG](https://github.com/phalcon/cphalcon/blob/0.7.0/CHANGELOG)
here. Applications created with 0.5.x/0.6.x will compatible with this
new version.

All the tests are passing on
[Travis](https://travis-ci.org/phalcon/cphalcon/builds/3287750), and
[our website](http://phalconphp.com/) is running with it some couple of
weeks ago, please update your applications to this version and report
any problems/bugs on [github](https://github.com/phalcon/cphalcon).

Linux/Unix/Mac users please compile the extension from the
[0.7.0](https://github.com/phalcon/cphalcon/tree/0.7.0) branch:

~~~~ {.sh_sh .sh_sourceCode}
git clone https://github.com/phalcon/cphalcon
cd cphalcon/build
git checkout 0.7.0
sudo ./install
~~~~

Windows DLLs are available on the
[download](http://phalconphp.com/download) page.

Thanks for using Phalcon!

