<!--
slug: introduction-series-for-0-6-mongodb-integration
date: Mon Oct 22 2012 17:34:00 GMT-0400 (EDT)
tags: mongo, php, phalcon
title: Introduction series for 0.6: MongoDB integration
id: 34119544351
link: http://blog.phalconphp.com/post/34119544351/introduction-series-for-0-6-mongodb-integration
raw: {"blog_name":"phalconphp","id":34119544351,"post_url":"http://blog.phalconphp.com/post/34119544351/introduction-series-for-0-6-mongodb-integration","slug":"introduction-series-for-0-6-mongodb-integration","type":"text","date":"2012-10-22 21:34:00 GMT","timestamp":1350941640,"state":"published","format":"html","reblog_key":"WcaWKFzk","tags":["mongo","php","phalcon"],"short_url":"http://tmblr.co/Z6PumvVnhkuV","highlighted":[],"note_count":5,"source_url":"http://docs.phalconphp.com/en/0.6.0/index.html","source_title":"docs.phalconphp.com","title":"Introduction series for 0.6: MongoDB integration","body":"<p>We are very excited to announce that the 0.6.0 version of Phalcon is just around the corner.</p>\n<p>With this version, we have made significant performance improvements in many components of the framework. We are also introducing the first template engine for PHP written in C called <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">Volt</a>.</p>\n<p>We are proud to be pioneers in PHP performance in many areas such as:</p>\n<ul><li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/mvc.html\">Full stack frameworks</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/micro.html\">Micro frameworks</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/models.html\">ORM (Object Relational Mappers) for PHP</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">PHP Template Engines </a>and</li>\n<li>ODM (Object Document Mappers)</li>\n</ul><p>NoSQL databases have earned a place in the development world, solving problems that relational databases could not. In 0.6.0 we have begun an effort to integrate NoSQL databases in Phalcon. <a href=\"http://mongodb.org/\">MongoDB</a> is one of the most popular NoSQL databases offering an interesting set of features.</p>\n<p>We have integrated MongoDB with the <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/cache.html\">Cache</a> and <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/session.html\">Session</a> components. An ODM was created that extends the functionality of the <a href=\"http://www.php.net/manual/en/book.mongo.php\">MongoDB PHP extension</a>. This allowed us to add new features such as events and validators, improving the integration with Phalcon.</p>\n<p>Documents are used as models. Due to the absence of SQL queries and planners, NoSQL databases can see real improvements in performance using the Phalcon approach.</p>\n<p>The following example shows how to implement a model that maps to a MongoDb collection.</p>\n<p>A model can be just a class with the same name of the mapped collection:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Collection\n{\n\n}\n</pre>\n<p>Adding validators/events as required:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\Message;\nuse Phalcon\\Mvc\\Model\\Validators\\PresenceOf;\nuse Phalcon\\Mvc\\Model\\Validators\\Uniqueness;\nuse Phalcon\\Mvc\\Model\\Validators\\InclusionIn;\n\nclass Products extends Phalcon\\Mvc\\Collection\n{\n\n    public $code;\n\n    public $name;\n\n    public $type;\n\n    public $status;\n\n    public $created_at;\n\n    public function validation()\n    {\n\n        $this-&gt;validate(new PresenceOf(array(\n            \"field\" =&gt; \"name\",\n            \"message\" =&gt; \"The name is required\"\n        )));\n\n        $this-&gt;validate(new Uniqueness(array(\n            \"field\" =&gt; \"code\",\n            \"message\" =&gt; \"The 'code' must be unique\"\n        )));\n\n        $this-&gt;validate(new InclusionIn(array(\n            \"field\" =&gt; \"type\",\n            \"domain\" =&gt; array('Vegetables', 'Fruits'),\n            \"message\" =&gt; \"The type must be 'Vegetables' or 'Fruits'\"\n        )));\n\n        return $this-&gt;validationFails()!==false;\n    }\n\n    public function beforeCreate()\n    {\n        if (!$this-&gt;created_at) {\n            $this-&gt;created_at = date('Y-m-d');\n        }\n    }\n\n    public function beforeDelete()\n    {\n        if ($this-&gt;status == 'Active'){\n            $message = new Message(\"The record cannot be deleted because it's active\");\n            $this-&gt;appendMessage($message);\n            return false;\n        }\n    }\n\n}\n</pre>\n<pre class=\"sh_php sh_sourceCode\">//Create a product\n$product = new Products();\n$product-&gt;name = 'Artichoke';\n$product-&gt;type = 'Vegetables';\n$product-&gt;status = 'Active';\n$product-&gt;save();\n\n//Querying all products\n$products = Products::find();\nforeach ($products as $product) {\n    echo $product-&gt;name, \"&lt;br&gt;\";\n}\n\n//Querying products whose type is Vegetables\n$products = Products::find(array(\n    array('types' =&gt; 'Vegetables')\n));\n\n//Querying the first product\n$product = Products::findFirst();\n\n//Querying the first product which is active\n$product = Products::findFirst(array(\n    array('status' =&gt; 'Active')\n));\n\n//Deleting a product\n$product-&gt;delete();\n</pre>\n<p>Additionally, as already mentioned above, an adapter for the Cache component is available. The following example shows how to use MongoDB as a cache for a SQL database, reducing the load:</p>\n<pre class=\"sh_php sh_sourceCode\">//Cache for one hour\n$frontCache = new Phalcon\\Cache\\Frontend\\Output(array(\n    'lifetime' =&gt; 3600\n));\n\n$cache = new Phalcon\\Cache\\Backend\\Mongo($frontCache, array(\n    'server' =&gt; 'mongodb://192.168.0.99',\n    'db' =&gt; 'invo',\n    'collection' =&gt; 'caches'\n));\n\n// Trying to get latest products cached\n$cacheKey = 'lastest.products';\n$products    = $products-&gt;get($cacheKey);\nif ($products === null) {\n\n    // $products is null due to cache expiration or data does not exist\n    // Make the database call and populate the variable\n    $products = Products::find(array(\n        \"order\" =&gt; \"created_at DESC\",\n        \"limit\" =&gt; 10\n    ));\n\n    // Store it in the cache\n    $cache-&gt;save($cacheKey, $products);\n}\n\n// Use the $products\nforeach ($products as $product) {\n    echo $product-&gt;name, \"\\n\";\n}\n</pre>\n<p>Complete documentation for the ODM is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/odm.html\">here</a> </p>\n<p>A beta for 0.6.0 will be available tomorrow and the final version November 1st!</p>\n<p>:)</p>","reblog":{"tree_html":"","comment":"<p>We are very excited to announce that the 0.6.0 version of Phalcon is just around the corner.</p>\n<p>With this version, we have made significant performance improvements in many components of the framework. We are also introducing the first template engine for PHP written in C called <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">Volt</a>.</p>\n<p>We are proud to be pioneers in PHP performance in many areas such as:</p>\n<ul><li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/mvc.html\">Full stack frameworks</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/micro.html\">Micro frameworks</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/models.html\">ORM (Object Relational Mappers) for PHP</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">PHP Template Engines </a>and</li>\n<li>ODM (Object Document Mappers)</li>\n</ul><p>NoSQL databases have earned a place in the development world, solving problems that relational databases could not. In 0.6.0 we have begun an effort to integrate NoSQL databases in Phalcon. <a href=\"http://mongodb.org/\">MongoDB</a> is one of the most popular NoSQL databases offering an interesting set of features.</p>\n<p>We have integrated MongoDB with the <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/cache.html\">Cache</a> and <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/session.html\">Session</a> components. An ODM was created that extends the functionality of the <a href=\"http://www.php.net/manual/en/book.mongo.php\">MongoDB PHP extension</a>. This allowed us to add new features such as events and validators, improving the integration with Phalcon.</p>\n<p>Documents are used as models. Due to the absence of SQL queries and planners, NoSQL databases can see real improvements in performance using the Phalcon approach.</p>\n<p>The following example shows how to implement a model that maps to a MongoDb collection.</p>\n<p>A model can be just a class with the same name of the mapped collection:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Collection\n{\n\n}\n</pre>\n<p>Adding validators/events as required:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\Message;\nuse Phalcon\\Mvc\\Model\\Validators\\PresenceOf;\nuse Phalcon\\Mvc\\Model\\Validators\\Uniqueness;\nuse Phalcon\\Mvc\\Model\\Validators\\InclusionIn;\n\nclass Products extends Phalcon\\Mvc\\Collection\n{\n\n    public $code;\n\n    public $name;\n\n    public $type;\n\n    public $status;\n\n    public $created_at;\n\n    public function validation()\n    {\n\n        $this-&gt;validate(new PresenceOf(array(\n            \"field\" =&gt; \"name\",\n            \"message\" =&gt; \"The name is required\"\n        )));\n\n        $this-&gt;validate(new Uniqueness(array(\n            \"field\" =&gt; \"code\",\n            \"message\" =&gt; \"The 'code' must be unique\"\n        )));\n\n        $this-&gt;validate(new InclusionIn(array(\n            \"field\" =&gt; \"type\",\n            \"domain\" =&gt; array('Vegetables', 'Fruits'),\n            \"message\" =&gt; \"The type must be 'Vegetables' or 'Fruits'\"\n        )));\n\n        return $this-&gt;validationFails()!==false;\n    }\n\n    public function beforeCreate()\n    {\n        if (!$this-&gt;created_at) {\n            $this-&gt;created_at = date('Y-m-d');\n        }\n    }\n\n    public function beforeDelete()\n    {\n        if ($this-&gt;status == 'Active'){\n            $message = new Message(\"The record cannot be deleted because it's active\");\n            $this-&gt;appendMessage($message);\n            return false;\n        }\n    }\n\n}\n</pre>\n<pre class=\"sh_php sh_sourceCode\">//Create a product\n$product = new Products();\n$product-&gt;name = 'Artichoke';\n$product-&gt;type = 'Vegetables';\n$product-&gt;status = 'Active';\n$product-&gt;save();\n\n//Querying all products\n$products = Products::find();\nforeach ($products as $product) {\n    echo $product-&gt;name, \"&lt;br&gt;\";\n}\n\n//Querying products whose type is Vegetables\n$products = Products::find(array(\n    array('types' =&gt; 'Vegetables')\n));\n\n//Querying the first product\n$product = Products::findFirst();\n\n//Querying the first product which is active\n$product = Products::findFirst(array(\n    array('status' =&gt; 'Active')\n));\n\n//Deleting a product\n$product-&gt;delete();\n</pre>\n<p>Additionally, as already mentioned above, an adapter for the Cache component is available. The following example shows how to use MongoDB as a cache for a SQL database, reducing the load:</p>\n<pre class=\"sh_php sh_sourceCode\">//Cache for one hour\n$frontCache = new Phalcon\\Cache\\Frontend\\Output(array(\n    'lifetime' =&gt; 3600\n));\n\n$cache = new Phalcon\\Cache\\Backend\\Mongo($frontCache, array(\n    'server' =&gt; 'mongodb://192.168.0.99',\n    'db' =&gt; 'invo',\n    'collection' =&gt; 'caches'\n));\n\n// Trying to get latest products cached\n$cacheKey = 'lastest.products';\n$products    = $products-&gt;get($cacheKey);\nif ($products === null) {\n\n    // $products is null due to cache expiration or data does not exist\n    // Make the database call and populate the variable\n    $products = Products::find(array(\n        \"order\" =&gt; \"created_at DESC\",\n        \"limit\" =&gt; 10\n    ));\n\n    // Store it in the cache\n    $cache-&gt;save($cacheKey, $products);\n}\n\n// Use the $products\nforeach ($products as $product) {\n    echo $product-&gt;name, \"\\n\";\n}\n</pre>\n<p>Complete documentation for the ODM is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/odm.html\">here</a> </p>\n<p>A beta for 0.6.0 will be available tomorrow and the final version November 1st!</p>\n<p>:)</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"34119544351"},"content":"<p>We are very excited to announce that the 0.6.0 version of Phalcon is just around the corner.</p>\n<p>With this version, we have made significant performance improvements in many components of the framework. We are also introducing the first template engine for PHP written in C called <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">Volt</a>.</p>\n<p>We are proud to be pioneers in PHP performance in many areas such as:</p>\n<ul><li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/mvc.html\">Full stack frameworks</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/micro.html\">Micro frameworks</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/models.html\">ORM (Object Relational Mappers) for PHP</a></li>\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">PHP Template Engines </a>and</li>\n<li>ODM (Object Document Mappers)</li>\n</ul><p>NoSQL databases have earned a place in the development world, solving problems that relational databases could not. In 0.6.0 we have begun an effort to integrate NoSQL databases in Phalcon. <a href=\"http://mongodb.org/\">MongoDB</a> is one of the most popular NoSQL databases offering an interesting set of features.</p>\n<p>We have integrated MongoDB with the <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/cache.html\">Cache</a> and <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/session.html\">Session</a> components. An ODM was created that extends the functionality of the <a href=\"http://www.php.net/manual/en/book.mongo.php\">MongoDB PHP extension</a>. This allowed us to add new features such as events and validators, improving the integration with Phalcon.</p>\n<p>Documents are used as models. Due to the absence of SQL queries and planners, NoSQL databases can see real improvements in performance using the Phalcon approach.</p>\n<p>The following example shows how to implement a model that maps to a MongoDb collection.</p>\n<p>A model can be just a class with the same name of the mapped collection:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Collection\n{\n\n}\n</pre>\n<p>Adding validators/events as required:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\Message;\nuse Phalcon\\Mvc\\Model\\Validators\\PresenceOf;\nuse Phalcon\\Mvc\\Model\\Validators\\Uniqueness;\nuse Phalcon\\Mvc\\Model\\Validators\\InclusionIn;\n\nclass Products extends Phalcon\\Mvc\\Collection\n{\n\n    public $code;\n\n    public $name;\n\n    public $type;\n\n    public $status;\n\n    public $created_at;\n\n    public function validation()\n    {\n\n        $this->validate(new PresenceOf(array(\n            \"field\" => \"name\",\n            \"message\" => \"The name is required\"\n        )));\n\n        $this->validate(new Uniqueness(array(\n            \"field\" => \"code\",\n            \"message\" => \"The 'code' must be unique\"\n        )));\n\n        $this->validate(new InclusionIn(array(\n            \"field\" => \"type\",\n            \"domain\" => array('Vegetables', 'Fruits'),\n            \"message\" => \"The type must be 'Vegetables' or 'Fruits'\"\n        )));\n\n        return $this->validationFails()!==false;\n    }\n\n    public function beforeCreate()\n    {\n        if (!$this->created_at) {\n            $this->created_at = date('Y-m-d');\n        }\n    }\n\n    public function beforeDelete()\n    {\n        if ($this->status == 'Active'){\n            $message = new Message(\"The record cannot be deleted because it's active\");\n            $this->appendMessage($message);\n            return false;\n        }\n    }\n\n}\n</pre>\n<pre class=\"sh_php sh_sourceCode\">//Create a product\n$product = new Products();\n$product->name = 'Artichoke';\n$product->type = 'Vegetables';\n$product->status = 'Active';\n$product->save();\n\n//Querying all products\n$products = Products::find();\nforeach ($products as $product) {\n    echo $product->name, \"<br>\";\n}\n\n//Querying products whose type is Vegetables\n$products = Products::find(array(\n    array('types' => 'Vegetables')\n));\n\n//Querying the first product\n$product = Products::findFirst();\n\n//Querying the first product which is active\n$product = Products::findFirst(array(\n    array('status' => 'Active')\n));\n\n//Deleting a product\n$product->delete();\n</pre>\n<p>Additionally, as already mentioned above, an adapter for the Cache component is available. The following example shows how to use MongoDB as a cache for a SQL database, reducing the load:</p>\n<pre class=\"sh_php sh_sourceCode\">//Cache for one hour\n$frontCache = new Phalcon\\Cache\\Frontend\\Output(array(\n    'lifetime' => 3600\n));\n\n$cache = new Phalcon\\Cache\\Backend\\Mongo($frontCache, array(\n    'server' => 'mongodb://192.168.0.99',\n    'db' => 'invo',\n    'collection' => 'caches'\n));\n\n// Trying to get latest products cached\n$cacheKey = 'lastest.products';\n$products    = $products->get($cacheKey);\nif ($products === null) {\n\n    // $products is null due to cache expiration or data does not exist\n    // Make the database call and populate the variable\n    $products = Products::find(array(\n        \"order\" => \"created_at DESC\",\n        \"limit\" => 10\n    ));\n\n    // Store it in the cache\n    $cache->save($cacheKey, $products);\n}\n\n// Use the $products\nforeach ($products as $product) {\n    echo $product->name, \"\\n\";\n}\n</pre>\n<p>Complete documentation for the ODM is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/odm.html\">here</a> </p>\n<p>A beta for 0.6.0 will be available tomorrow and the final version November 1st!</p>\n<p>:)</p>","content_raw":"<p>We are very excited to announce that the 0.6.0 version of Phalcon is just around the corner.</p>\r\n<p>With this version, we have made significant performance improvements in many components of the framework. We are also introducing the first template engine for PHP written in C called <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">Volt</a>.</p>\r\n<p>We are proud to be pioneers in PHP performance in many areas such as:</p>\r\n<ul><li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/mvc.html\">Full stack frameworks</a></li>\r\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/micro.html\">Micro frameworks</a></li>\r\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/models.html\">ORM (Object Relational Mappers) for PHP</a></li>\r\n<li><a href=\"http://docs.phalconphp.com/en/0.6.0/reference/volt.html\">PHP Template Engines </a>and</li>\r\n<li>ODM (Object Document Mappers)</li>\r\n</ul><p>NoSQL databases have earned a place in the development world, solving problems that relational databases could not. In 0.6.0 we have begun an effort to integrate NoSQL databases in Phalcon. <a href=\"http://mongodb.org/\">MongoDB</a> is one of the most popular NoSQL databases offering an interesting set of features.</p>\r\n<p>We have integrated MongoDB with the <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/cache.html\">Cache</a> and <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/session.html\">Session</a> components. An ODM was created that extends the functionality of the <a href=\"http://www.php.net/manual/en/book.mongo.php\">MongoDB PHP extension</a>. This allowed us to add new features such as events and validators, improving the integration with Phalcon.</p>\r\n<p>Documents are used as models. Due to the absence of SQL queries and planners, NoSQL databases can see real improvements in performance using the Phalcon approach.</p>\r\n<p>The following example shows how to implement a model that maps to a MongoDb collection.</p>\r\n<p>A model can be just a class with the same name of the mapped collection:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Collection\r\n{\r\n\r\n}\r\n</pre>\r\n<p>Adding validators/events as required:</p>\r\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\Message;\r\nuse Phalcon\\Mvc\\Model\\Validators\\PresenceOf;\r\nuse Phalcon\\Mvc\\Model\\Validators\\Uniqueness;\r\nuse Phalcon\\Mvc\\Model\\Validators\\InclusionIn;\r\n\r\nclass Products extends Phalcon\\Mvc\\Collection\r\n{\r\n\r\n    public $code;\r\n\r\n    public $name;\r\n\r\n    public $type;\r\n\r\n    public $status;\r\n\r\n    public $created_at;\r\n\r\n    public function validation()\r\n    {\r\n\r\n        $this-&gt;validate(new PresenceOf(array(\r\n            \"field\" =&gt; \"name\",\r\n            \"message\" =&gt; \"The name is required\"\r\n        )));\r\n\r\n        $this-&gt;validate(new Uniqueness(array(\r\n            \"field\" =&gt; \"code\",\r\n            \"message\" =&gt; \"The 'code' must be unique\"\r\n        )));\r\n\r\n        $this-&gt;validate(new InclusionIn(array(\r\n            \"field\" =&gt; \"type\",\r\n            \"domain\" =&gt; array('Vegetables', 'Fruits'),\r\n            \"message\" =&gt; \"The type must be 'Vegetables' or 'Fruits'\"\r\n        )));\r\n\r\n        return $this-&gt;validationFails()!==false;\r\n    }\r\n\r\n    public function beforeCreate()\r\n    {\r\n        if (!$this-&gt;created_at) {\r\n            $this-&gt;created_at = date('Y-m-d');\r\n        }\r\n    }\r\n\r\n    public function beforeDelete()\r\n    {\r\n        if ($this-&gt;status == 'Active'){\r\n            $message = new Message(\"The record cannot be deleted because it's active\");\r\n            $this-&gt;appendMessage($message);\r\n            return false;\r\n        }\r\n    }\r\n\r\n}\r\n</pre>\r\n<pre class=\"sh_php sh_sourceCode\">//Create a product\r\n$product = new Products();\r\n$product-&gt;name = 'Artichoke';\r\n$product-&gt;type = 'Vegetables';\r\n$product-&gt;status = 'Active';\r\n$product-&gt;save();\r\n\r\n//Querying all products\r\n$products = Products::find();\r\nforeach ($products as $product) {\r\n    echo $product-&gt;name, \"&lt;br&gt;\";\r\n}\r\n\r\n//Querying products whose type is Vegetables\r\n$products = Products::find(array(\r\n    array('types' =&gt; 'Vegetables')\r\n));\r\n\r\n//Querying the first product\r\n$product = Products::findFirst();\r\n\r\n//Querying the first product which is active\r\n$product = Products::findFirst(array(\r\n    array('status' =&gt; 'Active')\r\n));\r\n\r\n//Deleting a product\r\n$product-&gt;delete();\r\n</pre>\r\n<p>Additionally, as already mentioned above, an adapter for the Cache component is available. The following example shows how to use MongoDB as a cache for a SQL database, reducing the load:</p>\r\n<pre class=\"sh_php sh_sourceCode\">//Cache for one hour\r\n$frontCache = new Phalcon\\Cache\\Frontend\\Output(array(\r\n    'lifetime' =&gt; 3600\r\n));\r\n\r\n$cache = new Phalcon\\Cache\\Backend\\Mongo($frontCache, array(\r\n    'server' =&gt; 'mongodb://192.168.0.99',\r\n    'db' =&gt; 'invo',\r\n    'collection' =&gt; 'caches'\r\n));\r\n\r\n// Trying to get latest products cached\r\n$cacheKey = 'lastest.products';\r\n$products    = $products-&gt;get($cacheKey);\r\nif ($products === null) {\r\n\r\n    // $products is null due to cache expiration or data does not exist\r\n    // Make the database call and populate the variable\r\n    $products = Products::find(array(\r\n        \"order\" =&gt; \"created_at DESC\",\r\n        \"limit\" =&gt; 10\r\n    ));\r\n\r\n    // Store it in the cache\r\n    $cache-&gt;save($cacheKey, $products);\r\n}\r\n\r\n// Use the $products\r\nforeach ($products as $product) {\r\n    echo $product-&gt;name, \"\\n\";\r\n}\r\n</pre>\r\n<p>Complete documentation for the ODM is available <a href=\"http://docs.phalconphp.com/en/0.6.0/reference/odm.html\">here</a> </p>\r\n<p>A beta for 0.6.0 will be available tomorrow and the final version November 1st!</p>\r\n<p>:)</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-10-022
-->


Introduction series for 0.6: MongoDB integration
================================================

We are very excited to announce that the 0.6.0 version of Phalcon is
just around the corner.

With this version, we have made significant performance improvements in
many components of the framework. We are also introducing the first
template engine for PHP written in C called
[Volt](http://docs.phalconphp.com/en/0.6.0/reference/volt.html).

We are proud to be pioneers in PHP performance in many areas such as:

-   [Full stack
    frameworks](http://docs.phalconphp.com/en/0.6.0/reference/mvc.html)
-   [Micro
    frameworks](http://docs.phalconphp.com/en/0.6.0/reference/micro.html)
-   [ORM (Object Relational Mappers) for
    PHP](http://docs.phalconphp.com/en/0.6.0/reference/models.html)
-   [PHP Template
    Engines](http://docs.phalconphp.com/en/0.6.0/reference/volt.html)and
-   ODM (Object Document Mappers)

NoSQL databases have earned a place in the development world, solving
problems that relational databases could not. In 0.6.0 we have begun an
effort to integrate NoSQL databases in Phalcon.
[MongoDB](http://mongodb.org/) is one of the most popular NoSQL
databases offering an interesting set of features.

We have integrated MongoDB with the
[Cache](http://docs.phalconphp.com/en/0.6.0/reference/cache.html) and
[Session](http://docs.phalconphp.com/en/0.6.0/reference/session.html)
components. An ODM was created that extends the functionality of the
[MongoDB PHP extension](http://www.php.net/manual/en/book.mongo.php).
This allowed us to add new features such as events and validators,
improving the integration with Phalcon.

Documents are used as models. Due to the absence of SQL queries and
planners, NoSQL databases can see real improvements in performance using
the Phalcon approach.

The following example shows how to implement a model that maps to a
MongoDb collection.

A model can be just a class with the same name of the mapped collection:

```php
class Products extends Phalcon\Mvc\Collection
{

}
```

Adding validators/events as required:

```php
use Phalcon\Mvc\Model\Message;
use Phalcon\Mvc\Model\Validators\PresenceOf;
use Phalcon\Mvc\Model\Validators\Uniqueness;
use Phalcon\Mvc\Model\Validators\InclusionIn;

class Products extends Phalcon\Mvc\Collection
{

    public $code;

    public $name;

    public $type;

    public $status;

    public $created_at;

    public function validation()
    {

        $this->validate(new PresenceOf(array(
            "field" => "name",
            "message" => "The name is required"
        )));

        $this->validate(new Uniqueness(array(
            "field" => "code",
            "message" => "The 'code' must be unique"
        )));

        $this->validate(new InclusionIn(array(
            "field" => "type",
            "domain" => array('Vegetables', 'Fruits'),
            "message" => "The type must be 'Vegetables' or 'Fruits'"
        )));

        return $this->validationFails()!==false;
    }

    public function beforeCreate()
    {
        if (!$this->created_at) {
            $this->created_at = date('Y-m-d');
        }
    }

    public function beforeDelete()
    {
        if ($this->status == 'Active'){
            $message = new Message("The record cannot be deleted because it's active");
            $this->appendMessage($message);
            return false;
        }
    }

}
```

```php
//Create a product
$product = new Products();
$product->name = 'Artichoke';
$product->type = 'Vegetables';
$product->status = 'Active';
$product->save();

//Querying all products
$products = Products::find();
foreach ($products as $product) {
    echo $product->name, "<br>";
}

//Querying products whose type is Vegetables
$products = Products::find(array(
    array('types' => 'Vegetables')
));

//Querying the first product
$product = Products::findFirst();

//Querying the first product which is active
$product = Products::findFirst(array(
    array('status' => 'Active')
));

//Deleting a product
$product->delete();
```

Additionally, as already mentioned above, an adapter for the Cache
component is available. The following example shows how to use MongoDB
as a cache for a SQL database, reducing the load:

```php
//Cache for one hour
$frontCache = new Phalcon\Cache\Frontend\Output(array(
    'lifetime' => 3600
));

$cache = new Phalcon\Cache\Backend\Mongo($frontCache, array(
    'server' => 'mongodb://192.168.0.99',
    'db' => 'invo',
    'collection' => 'caches'
));

// Trying to get latest products cached
$cacheKey = 'lastest.products';
$products    = $products->get($cacheKey);
if ($products === null) {

    // $products is null due to cache expiration or data does not exist
    // Make the database call and populate the variable
    $products = Products::find(array(
        "order" => "created_at DESC",
        "limit" => 10
    ));

    // Store it in the cache
    $cache->save($cacheKey, $products);
}

// Use the $products
foreach ($products as $product) {
    echo $product->name, "\n";
}
```

Complete documentation for the ODM is available
[here](http://docs.phalconphp.com/en/0.6.0/reference/odm.html)

A beta for 0.6.0 will be available tomorrow and the final version
November 1st!

:)

