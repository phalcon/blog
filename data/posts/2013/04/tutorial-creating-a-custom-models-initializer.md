<!--
slug: tutorial-creating-a-custom-models-initializer
date: Mon Apr 08 2013 14:48:00 GMT-0400 (EDT)
tags: tutorial, phalcon, php
title: Tutorial: Creating a custom model's initializer with Annotations
id: 47471246411
link: http://blog.phalconphp.com/post/47471246411/tutorial-creating-a-custom-models-initializer
raw: {"blog_name":"phalconphp","id":47471246411,"post_url":"http://blog.phalconphp.com/post/47471246411/tutorial-creating-a-custom-models-initializer","slug":"tutorial-creating-a-custom-models-initializer","type":"text","date":"2013-04-08 18:48:00 GMT","timestamp":1365446880,"state":"published","format":"html","reblog_key":"U4vFY0Y9","tags":["tutorial","phalcon","php"],"short_url":"http://tmblr.co/Z6PumviDWRnB","highlighted":[],"note_count":2,"title":"Tutorial: Creating a custom model's initializer with Annotations","body":"<p>This tutorial is oriented to an intermediate/advanced audience. We&rsquo;ll explain how to create a custom model&rsquo;s initializer via annotations that can be easily modified/adapted to initialize collections, plugins, etc.</p>\n<h3>Bootstrap</h3>\n<p>The example provides a simple structure that can be implemented in any Phalcon application. You can find the complete code on <a href=\"https://github.com/phalcon/tutorial-models-init\">Github</a>. The following structure is used:</p>\n<pre class=\"sh_sh sh_sourceCode\">example/\n cache/<br/> db/\n models/\n   Robots.php\n   RobotsParts.php<br/>   Parts.php\n library/\n   AnnotationsInitializer.php\n   AnnotationsMetaDataInitializer.php\n services.php<br/> index.php\n </pre>\n<p>The file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a> is the example&rsquo;s bootstrap, on it you can find the service initialization, we are only initializing the basic services necessary to run the example.</p>\n<p>The first is the database connection, we used Sqlite as adapter, but you can use any other of the <a href=\"https://docs.phalconphp.com/en/latest/reference/db.html#database-adapters\">supported database systems</a>:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Setup a connection\n$di['db'] = function () {\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Sqlite(array(\n        \"dbname\" =&gt; \"sample.db\"\n    ));\n};\n</pre>\n<p>Then, we create the model&rsquo;s manager with a custom plugin that perform extra initialization tasks:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Set a models manager\n$di['modelsManager'] = function () {\n\n    $eventsManager = new EventsManager();\n\n    $modelsManager = new ModelsManager();\n\n    $modelsManager-&gt;setEventsManager($eventsManager);\n\n    //Attach a listener to models-manager\n    $eventsManager-&gt;attach('modelsManager', new AnnotationsInitializer());\n\n    return $modelsManager;\n};\n</pre>\n<h3>Model initialization</h3>\n<p><a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsInitializer.php\">AnnotationsInitializer</a> is a plugin that reads the annotations in the model&rsquo;s class performing the appropriate tasks according to the annotations used. A model with annotations is the following:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * Robots\n *\n * Represents a robot\n *\n * @Source('my_robots');\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\n */\nclass Robots extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\n     */\n    public $name;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_type\")\n     */\n    public $type;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_year\")\n     */\n    public $year;\n\n}\n</pre>\n<p>Both class and properties are initialized using annotations rather than use the standard methods &lsquo;initialize&rsquo;, 'columnMap&rsquo;, 'getSource&rsquo;, etc. In this class, columns are dynamically renamed to the original ones in the database removing the vendor prefix 'my_&rsquo;. So if the column in the table is called 'my_name&rsquo; you can freely rename it as just 'name&rsquo;.</p>\n<p>Our second model is &ldquo;Parts&rdquo;, every part represents a possible part to assemble our robots. This model contains every possible part that a robot could have.</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * Parts\n *\n * Represents every part to assemble a robot\n *\n * @Source('my_parts');\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\n */\nclass Parts extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\n     */\n    public $name;\n\n}\n</pre>\n<p>The relation between the robots and their parts are managed via the model RobotsParts:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * RobotsParts\n *\n * Represents the relation between Robots and Parts\n *\n * @Source('my_robots_parts');\n * @BelongsTo('robotsId', 'Robots', 'id', {\n *    'alias': 'robot'\n * });\n * @BelongsTo('partsId', 'Parts', 'id', {\n *    'alias': 'part'\n * });\n */\nclass RobotsParts extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_robots_id\")\n     */\n    public $robotsId;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_parts_id\")\n     */\n    public $partsId;\n\n}\n</pre>\n<p>To make these annotations work, we return to the AnnotationsInitializer, as mentioned before, this plugin is called after any model is initialized in the models manager allowing us to perform extra initializations:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Events\\Event,\n    Phalcon\\Mvc\\Model\\Manager as ModelsManager\n    Phalcon\\Mvc\\ModelInterface;\n\nclass AnnotationsInitializer extends Phalcon\\Mvc\\User\\Plugin\n{\n\n    /**\n     * This is called after initialize the model\n     *\n     * @param Phalcon\\Events\\Event $event\n     */\n    public function afterInitialize(Event $event, ModelsManager $manager, ModelInterface $model)\n    {\n        //...\n    }\n\n}\n</pre>\n<p>The method 'afterInitialize&rsquo; has the same name as the event triggered by the models manager, telling the events manager that this method must be executed. It receives the models manager itself and the model recently initialized.</p>\n<p>Now, we could extract the annotations in the model&rsquo;s class giving a useful meaning to each of them:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n//Get the annotations reflection\n$reflector = $this-&gt;annotations-&gt;get($model);\n\n/**\n * Read the annotations in the class docblock\n */\n$annotations = $reflector-&gt;getClassAnnotations();\nif ($annotations) {\n\n    /**\n     * Traverse the annotations\n     */\n    foreach ($annotations as $annotation) {\n        switch ($annotation-&gt;getName()) {\n            //...\n        }\n    }\n}\n</pre>\n<p>Annotations found are traversed and according to its name we&rsquo;re going to initialize the desired functionality, for example, if the name is 'Source&rsquo; we&rsquo;re going to assign its parameter as the model&rsquo;s mapped table:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * Initializes the models source\n */\ncase 'Source':\n    $arguments = $annotation-&gt;getArguments();\n    $manager-&gt;setModelSource($model, $arguments[0]);\n    break;\n\n</pre>\n<p>This way you can create new annotations, change the current names, etc. adding more functionality according to your application needs. Check out the original source code to understand how the other annotations are created.</p>\n<h3>Meta-Data initialization</h3>\n<p>The second part of the initialization is the model&rsquo;s meta-data. This information is required to automate the operation of ORM in Phalcon. The meta-data contains: field names, primary keys, data types, column maps, etc. Normally, Phalcon uses database introspection to read this information from the database. In our case, we&rsquo;re going to define those data in annotations.</p>\n<p>Phalcon provides the built-in strategy class: <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html#annotations-strategy\">Phalcon\\Mvc\\Model\\MetaData\\Strategy\\Annotations</a> which performs the same task we&rsquo;ll going to explain below. Our custom meta-data strategy also uses annotations but it gives us understanding of how this task is achieved. You can adapt this code to create dynamic schemas, row level security, new annotations, etc.</p>\n<p>This adapter is called <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsMetaDataInitializer.php\">AnnotationsMetaDataInitializer</a> (found in the library/ directory). It implements two methods: the former initializes the main meta-data and the second any column map found in the class:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Mvc\\ModelInterface,\n    Phalcon\\DiInterface,\n    Phalcon\\Mvc\\Model\\MetaData,\n    Phalcon\\Db\\Column;\n\nclass AnnotationsMetaDataInitializer\n{\n\n    /**\n     * Initializes the models meta-data\n     *\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     * @param Phalcon\\DiInterface $di\n     * @return array\n     */\n    public function getMetaData(ModelInterface $model, DiInterface $di)\n    {\n        //...\n    }\n\n    /**\n     * Initializes the models column map\n     *\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     * @param Phalcon\\DiInterface $di\n     * @return array\n     */\n    public function getColumnMaps(ModelInterface $model, DiInterface $di)\n    {\n        //...\n    }\n\n}\n</pre>\n<p>Following the same philosophy used in the model initializer we&rsquo;re going to find which annotations are defined in the properties, giving a meaning to each of them:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\nforeach ($reflection-&gt;getPropertiesAnnotations() as $name =&gt; $collection) {\n\n    if ($collection-&gt;has('Column')) {\n        //... do something if the property has this annotation defined\n    }\n\n}\n</pre>\n<p>Returning to the file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a>, we see how this adapter is set up instead of the default one:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n$di['modelsMetadata'] = function () {\n\n    //Use the memory meta-data adapter in development\n    $metaData = new MetaDataAdapter(array(\n        'metaDataDir' =&gt; './cache/meta-data/'\n    ));\n\n    //Set a custom meta-data database introspection\n    $metaData-&gt;setStrategy(new AnnotationsMetaDataInitializer());\n\n    return $metaData;\n};\n</pre>\n<h3>Caching Annotations/Meta-Data</h3>\n<p>Parsing/Reading annotations and processing meta-data could add an important amount of overhead to the application in every request reducing the performance. While the Phalcon&rsquo;s <a href=\"https://docs.phalconphp.com/en/latest/reference/annotations.html\">annotations parser</a> is very fast, you could improve the speed by aggressively caching the annotations and meta-data using some of the adapters provided by the framework. In our example, we&rsquo;re using files to export the processed data avoiding the permanent processing in each request:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Use the memory meta-data adapter in development\n$metaData = new MetaDataAdapter(array(\n    'metaDataDir' =&gt; './cache/meta-data/'\n));\n\n//Using the files adapter for annotations\n$di['annotations'] = function () {\n    return new AnnotationsAdapter(array(\n        'annotationsDir' =&gt; './cache/annotations/'\n    ));\n};\n\n</pre>\n<p>Note that these adapters aren&rsquo;t suitable for development because they don&rsquo;t reload the changes made to the classes, you can use the Memory adapters to achieve this result.</p>\n<h3>Example in Action</h3>\n<p>Once everything is correctly working you can use the models as is normally done in Phalcon:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n$robot = Robots::findFirst(\"type = 'mechanical'\");\n\nforeach ($robot-&gt;robotsParts as $robotPart) {\n    echo 'Name:', $robotPart-&gt;part-&gt;name, PHP_EOL;\n}\n</pre>\n<h3>Conclusion</h3>\n<p>This tutorial explains various strategies to extend Phalcon, the use of annotations, some additional information about the inner workings of the <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>. We hope that this example serve as a guide to create more robust applications with Phalcon.</p>","reblog":{"tree_html":"","comment":"<p>This tutorial is oriented to an intermediate/advanced audience. We&rsquo;ll explain how to create a custom model&rsquo;s initializer via annotations that can be easily modified/adapted to initialize collections, plugins, etc.</p>\n<h3>Bootstrap</h3>\n<p>The example provides a simple structure that can be implemented in any Phalcon application. You can find the complete code on <a href=\"https://github.com/phalcon/tutorial-models-init\">Github</a>. The following structure is used:</p>\n<pre class=\"sh_sh sh_sourceCode\">example/\n cache/<br> db/\n models/\n   Robots.php\n   RobotsParts.php<br>   Parts.php\n library/\n   AnnotationsInitializer.php\n   AnnotationsMetaDataInitializer.php\n services.php<br> index.php\n </pre>\n<p>The file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a> is the example&rsquo;s bootstrap, on it you can find the service initialization, we are only initializing the basic services necessary to run the example.</p>\n<p>The first is the database connection, we used Sqlite as adapter, but you can use any other of the <a href=\"https://docs.phalconphp.com/en/latest/reference/db.html#database-adapters\">supported database systems</a>:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Setup a connection\n$di['db'] = function () {\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Sqlite(array(\n        \"dbname\" =&gt; \"sample.db\"\n    ));\n};\n</pre>\n<p>Then, we create the model&rsquo;s manager with a custom plugin that perform extra initialization tasks:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Set a models manager\n$di['modelsManager'] = function () {\n\n    $eventsManager = new EventsManager();\n\n    $modelsManager = new ModelsManager();\n\n    $modelsManager-&gt;setEventsManager($eventsManager);\n\n    //Attach a listener to models-manager\n    $eventsManager-&gt;attach('modelsManager', new AnnotationsInitializer());\n\n    return $modelsManager;\n};\n</pre>\n<h3>Model initialization</h3>\n<p><a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsInitializer.php\">AnnotationsInitializer</a> is a plugin that reads the annotations in the model&rsquo;s class performing the&nbsp;appropriate&nbsp;tasks according to the annotations used. A model with annotations is the following:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * Robots\n *\n * Represents a robot\n *\n * @Source('my_robots');\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\n */\nclass Robots extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\n     */\n    public $name;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_type\")\n     */\n    public $type;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_year\")\n     */\n    public $year;\n\n}\n</pre>\n<p>Both class and properties are initialized using annotations rather than use the standard methods &lsquo;initialize&rsquo;, 'columnMap&rsquo;, 'getSource&rsquo;, etc. In this class, columns are dynamically renamed to the original ones in the database removing the vendor prefix 'my_&rsquo;. So if the column in the table is called 'my_name&rsquo; you can freely rename it as just 'name&rsquo;.</p>\n<p>Our second model is &ldquo;Parts&rdquo;, every part represents a possible part to assemble our robots. This model contains every possible part that a robot could have.</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * Parts\n *\n * Represents every part to assemble a robot\n *\n * @Source('my_parts');\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\n */\nclass Parts extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\n     */\n    public $name;\n\n}\n</pre>\n<p>The relation between the robots and their parts are managed via the model RobotsParts:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * RobotsParts\n *\n * Represents the relation between Robots and Parts\n *\n * @Source('my_robots_parts');\n * @BelongsTo('robotsId', 'Robots', 'id', {\n *    'alias': 'robot'\n * });\n * @BelongsTo('partsId', 'Parts', 'id', {\n *    'alias': 'part'\n * });\n */\nclass RobotsParts extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_robots_id\")\n     */\n    public $robotsId;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_parts_id\")\n     */\n    public $partsId;\n\n}\n</pre>\n<p>To make these annotations work, we return to the AnnotationsInitializer, as mentioned before, this plugin is called after any model is initialized in the models manager allowing us to perform extra initializations:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Events\\Event,\n    Phalcon\\Mvc\\Model\\Manager as ModelsManager\n    Phalcon\\Mvc\\ModelInterface;\n\nclass AnnotationsInitializer extends Phalcon\\Mvc\\User\\Plugin\n{\n\n    /**\n     * This is called after initialize the model\n     *\n     * @param Phalcon\\Events\\Event $event\n     */\n    public function afterInitialize(Event $event, ModelsManager $manager, ModelInterface $model)\n    {\n        //...\n    }\n\n}\n</pre>\n<p>The method 'afterInitialize&rsquo; has the same name as the event triggered by the models manager, telling the events manager that this method must be executed. It receives the models manager itself and the model recently initialized.</p>\n<p>Now, we could extract the annotations in the model&rsquo;s class giving a useful meaning to each of them:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n//Get the annotations reflection\n$reflector = $this-&gt;annotations-&gt;get($model);\n\n/**\n * Read the annotations in the class docblock\n */\n$annotations = $reflector-&gt;getClassAnnotations();\nif ($annotations) {\n\n    /**\n     * Traverse the annotations\n     */\n    foreach ($annotations as $annotation) {\n        switch ($annotation-&gt;getName()) {\n            //...\n        }\n    }\n}\n</pre>\n<p>Annotations found are traversed and according to its name we&rsquo;re going to initialize the desired functionality, for example, if the name is 'Source&rsquo; we&rsquo;re going to assign its parameter as the model&rsquo;s mapped table:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n/**\n * Initializes the models source\n */\ncase 'Source':\n    $arguments = $annotation-&gt;getArguments();\n    $manager-&gt;setModelSource($model, $arguments[0]);\n    break;\n\n</pre>\n<p>This way you can create new annotations, change the current names, etc. adding more functionality according to your application needs. Check out the original source code to understand how the other annotations are created.</p>\n<h3>Meta-Data initialization</h3>\n<p>The second part of the initialization is the model&rsquo;s meta-data. This information is required to automate the operation of ORM in Phalcon. The meta-data contains: field names, primary keys, data types, column maps, etc. Normally, Phalcon uses database introspection to read this information from the database. In our case, we&rsquo;re going to define those data in annotations.</p>\n<p>Phalcon provides the built-in strategy class: <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html#annotations-strategy\">Phalcon\\Mvc\\Model\\MetaData\\Strategy\\Annotations</a> which performs the same task we&rsquo;ll going to explain below. Our custom meta-data strategy also uses annotations but it gives us understanding of how this task is achieved. You can adapt this code to create dynamic schemas, row level security, new annotations, etc.</p>\n<p>This adapter is called <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsMetaDataInitializer.php\">AnnotationsMetaDataInitializer</a> (found in the library/ directory). It implements two methods: the former initializes the main meta-data and the second any column map found in the class:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Mvc\\ModelInterface,\n    Phalcon\\DiInterface,\n    Phalcon\\Mvc\\Model\\MetaData,\n    Phalcon\\Db\\Column;\n\nclass AnnotationsMetaDataInitializer\n{\n\n    /**\n     * Initializes the models meta-data\n     *\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     * @param Phalcon\\DiInterface $di\n     * @return array\n     */\n    public function getMetaData(ModelInterface $model, DiInterface $di)\n    {\n        //...\n    }\n\n    /**\n     * Initializes the models column map\n     *\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     * @param Phalcon\\DiInterface $di\n     * @return array\n     */\n    public function getColumnMaps(ModelInterface $model, DiInterface $di)\n    {\n        //...\n    }\n\n}\n</pre>\n<p>Following the same philosophy used in the model initializer we&rsquo;re going to find which annotations are defined in the properties, giving a meaning to each of them:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\nforeach ($reflection-&gt;getPropertiesAnnotations() as $name =&gt; $collection) {\n\n    if ($collection-&gt;has('Column')) {\n        //... do something if the property has this annotation defined\n    }\n\n}\n</pre>\n<p>Returning to the file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a>, we see how this adapter is set up instead of the default one:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n$di['modelsMetadata'] = function () {\n\n    //Use the memory meta-data adapter in development\n    $metaData = new MetaDataAdapter(array(\n        'metaDataDir' =&gt; './cache/meta-data/'\n    ));\n\n    //Set a custom meta-data database introspection\n    $metaData-&gt;setStrategy(new AnnotationsMetaDataInitializer());\n\n    return $metaData;\n};\n</pre>\n<h3>Caching Annotations/Meta-Data</h3>\n<p>Parsing/Reading annotations and processing meta-data could add an important amount of overhead to the application in every request reducing the performance. While the Phalcon&rsquo;s <a href=\"https://docs.phalconphp.com/en/latest/reference/annotations.html\">annotations parser</a> is very fast, you could improve the speed by&nbsp;aggressively&nbsp;caching the annotations and meta-data using some of the adapters provided by the framework. In our example, we&rsquo;re using files to export the processed data avoiding the permanent processing in each request:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Use the memory meta-data adapter in development\n$metaData = new MetaDataAdapter(array(\n    'metaDataDir' =&gt; './cache/meta-data/'\n));\n\n//Using the files adapter for annotations\n$di['annotations'] = function () {\n    return new AnnotationsAdapter(array(\n        'annotationsDir' =&gt; './cache/annotations/'\n    ));\n};\n\n</pre>\n<p>Note that these adapters aren&rsquo;t suitable for development because they don&rsquo;t reload the changes made to the classes, you can use the Memory adapters to achieve this result.</p>\n<h3>Example in Action</h3>\n<p>Once everything is correctly working you can use the models as is normally done in Phalcon:</p>\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\n\n$robot = Robots::findFirst(\"type = 'mechanical'\");\n\nforeach ($robot-&gt;robotsParts as $robotPart) {\n    echo 'Name:', $robotPart-&gt;part-&gt;name, PHP_EOL;\n}\n</pre>\n<h3>Conclusion</h3>\n<p>This tutorial explains various strategies to extend Phalcon, the use of annotations, some additional information about the inner workings of the <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>. We hope that this example serve as a guide to create more robust applications with Phalcon.</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"47471246411"},"content":"<p>This tutorial is oriented to an intermediate/advanced audience. We'll explain how to create a custom model's initializer via annotations that can be easily modified/adapted to initialize collections, plugins, etc.</p>\n<h3>Bootstrap</h3>\n<p>The example provides a simple structure that can be implemented in any Phalcon application. You can find the complete code on <a href=\"https://github.com/phalcon/tutorial-models-init\">Github</a>. The following structure is used:</p>\n<pre class=\"sh_sh sh_sourceCode\">example/\n cache/<br> db/\n models/\n   Robots.php\n   RobotsParts.php<br>   Parts.php\n library/\n   AnnotationsInitializer.php\n   AnnotationsMetaDataInitializer.php\n services.php<br> index.php\n </pre>\n<p>The file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a> is the example's bootstrap, on it you can find the service initialization, we are only initializing the basic services necessary to run the example.</p>\n<p>The first is the database connection, we used Sqlite as adapter, but you can use any other of the <a href=\"https://docs.phalconphp.com/en/latest/reference/db.html#database-adapters\">supported database systems</a>:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Setup a connection\n$di['db'] = function () {\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Sqlite(array(\n        \"dbname\" => \"sample.db\"\n    ));\n};\n</pre>\n<p>Then, we create the model's manager with a custom plugin that perform extra initialization tasks:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Set a models manager\n$di['modelsManager'] = function () {\n\n    $eventsManager = new EventsManager();\n\n    $modelsManager = new ModelsManager();\n\n    $modelsManager->setEventsManager($eventsManager);\n\n    //Attach a listener to models-manager\n    $eventsManager->attach('modelsManager', new AnnotationsInitializer());\n\n    return $modelsManager;\n};\n</pre>\n<h3>Model initialization</h3>\n<p><a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsInitializer.php\">AnnotationsInitializer</a> is a plugin that reads the annotations in the model's class performing the appropriate tasks according to the annotations used. A model with annotations is the following:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\n/**\n * Robots\n *\n * Represents a robot\n *\n * @Source('my_robots');\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\n */\nclass Robots extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\n     */\n    public $name;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_type\")\n     */\n    public $type;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_year\")\n     */\n    public $year;\n\n}\n</pre>\n<p>Both class and properties are initialized using annotations rather than use the standard methods ‘initialize', 'columnMap', 'getSource', etc. In this class, columns are dynamically renamed to the original ones in the database removing the vendor prefix 'my_'. So if the column in the table is called 'my_name' you can freely rename it as just 'name'.</p>\n<p>Our second model is "Parts", every part represents a possible part to assemble our robots. This model contains every possible part that a robot could have.</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\n/**\n * Parts\n *\n * Represents every part to assemble a robot\n *\n * @Source('my_parts');\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\n */\nclass Parts extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\n     */\n    public $name;\n\n}\n</pre>\n<p>The relation between the robots and their parts are managed via the model RobotsParts:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\n/**\n * RobotsParts\n *\n * Represents the relation between Robots and Parts\n *\n * @Source('my_robots_parts');\n * @BelongsTo('robotsId', 'Robots', 'id', {\n *    'alias': 'robot'\n * });\n * @BelongsTo('partsId', 'Parts', 'id', {\n *    'alias': 'part'\n * });\n */\nclass RobotsParts extends \\Phalcon\\Mvc\\Model\n{\n    /**\n     * @Primary\n     * @Identity\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\n     */\n    public $id;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_robots_id\")\n     */\n    public $robotsId;\n\n    /**\n     * @Column(type=\"integer\", nullable=false, column=\"my_parts_id\")\n     */\n    public $partsId;\n\n}\n</pre>\n<p>To make these annotations work, we return to the AnnotationsInitializer, as mentioned before, this plugin is called after any model is initialized in the models manager allowing us to perform extra initializations:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\nuse Phalcon\\Events\\Event,\n    Phalcon\\Mvc\\Model\\Manager as ModelsManager\n    Phalcon\\Mvc\\ModelInterface;\n\nclass AnnotationsInitializer extends Phalcon\\Mvc\\User\\Plugin\n{\n\n    /**\n     * This is called after initialize the model\n     *\n     * @param Phalcon\\Events\\Event $event\n     */\n    public function afterInitialize(Event $event, ModelsManager $manager, ModelInterface $model)\n    {\n        //...\n    }\n\n}\n</pre>\n<p>The method 'afterInitialize' has the same name as the event triggered by the models manager, telling the events manager that this method must be executed. It receives the models manager itself and the model recently initialized.</p>\n<p>Now, we could extract the annotations in the model's class giving a useful meaning to each of them:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\n//Get the annotations reflection\n$reflector = $this->annotations->get($model);\n\n/**\n * Read the annotations in the class docblock\n */\n$annotations = $reflector->getClassAnnotations();\nif ($annotations) {\n\n    /**\n     * Traverse the annotations\n     */\n    foreach ($annotations as $annotation) {\n        switch ($annotation->getName()) {\n            //...\n        }\n    }\n}\n</pre>\n<p>Annotations found are traversed and according to its name we're going to initialize the desired functionality, for example, if the name is 'Source' we're going to assign its parameter as the model's mapped table:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\n/**\n * Initializes the models source\n */\ncase 'Source':\n    $arguments = $annotation->getArguments();\n    $manager->setModelSource($model, $arguments[0]);\n    break;\n\n</pre>\n<p>This way you can create new annotations, change the current names, etc. adding more functionality according to your application needs. Check out the original source code to understand how the other annotations are created.</p>\n<h3>Meta-Data initialization</h3>\n<p>The second part of the initialization is the model's meta-data. This information is required to automate the operation of ORM in Phalcon. The meta-data contains: field names, primary keys, data types, column maps, etc. Normally, Phalcon uses database introspection to read this information from the database. In our case, we're going to define those data in annotations.</p>\n<p>Phalcon provides the built-in strategy class: <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html#annotations-strategy\">Phalcon\\Mvc\\Model\\MetaData\\Strategy\\Annotations</a> which performs the same task we'll going to explain below. Our custom meta-data strategy also uses annotations but it gives us understanding of how this task is achieved. You can adapt this code to create dynamic schemas, row level security, new annotations, etc.</p>\n<p>This adapter is called <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsMetaDataInitializer.php\">AnnotationsMetaDataInitializer</a> (found in the library/ directory). It implements two methods: the former initializes the main meta-data and the second any column map found in the class:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\nuse Phalcon\\Mvc\\ModelInterface,\n    Phalcon\\DiInterface,\n    Phalcon\\Mvc\\Model\\MetaData,\n    Phalcon\\Db\\Column;\n\nclass AnnotationsMetaDataInitializer\n{\n\n    /**\n     * Initializes the models meta-data\n     *\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     * @param Phalcon\\DiInterface $di\n     * @return array\n     */\n    public function getMetaData(ModelInterface $model, DiInterface $di)\n    {\n        //...\n    }\n\n    /**\n     * Initializes the models column map\n     *\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     * @param Phalcon\\DiInterface $di\n     * @return array\n     */\n    public function getColumnMaps(ModelInterface $model, DiInterface $di)\n    {\n        //...\n    }\n\n}\n</pre>\n<p>Following the same philosophy used in the model initializer we're going to find which annotations are defined in the properties, giving a meaning to each of them:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\nforeach ($reflection->getPropertiesAnnotations() as $name => $collection) {\n\n    if ($collection->has('Column')) {\n        //... do something if the property has this annotation defined\n    }\n\n}\n</pre>\n<p>Returning to the file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a>, we see how this adapter is set up instead of the default one:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\n$di['modelsMetadata'] = function () {\n\n    //Use the memory meta-data adapter in development\n    $metaData = new MetaDataAdapter(array(\n        'metaDataDir' => './cache/meta-data/'\n    ));\n\n    //Set a custom meta-data database introspection\n    $metaData->setStrategy(new AnnotationsMetaDataInitializer());\n\n    return $metaData;\n};\n</pre>\n<h3>Caching Annotations/Meta-Data</h3>\n<p>Parsing/Reading annotations and processing meta-data could add an important amount of overhead to the application in every request reducing the performance. While the Phalcon's <a href=\"https://docs.phalconphp.com/en/latest/reference/annotations.html\">annotations parser</a> is very fast, you could improve the speed by aggressively caching the annotations and meta-data using some of the adapters provided by the framework. In our example, we're using files to export the processed data avoiding the permanent processing in each request:</p>\n<pre class=\"sh_sh sh_sourceCode\">//Use the memory meta-data adapter in development\n$metaData = new MetaDataAdapter(array(\n    'metaDataDir' => './cache/meta-data/'\n));\n\n//Using the files adapter for annotations\n$di['annotations'] = function () {\n    return new AnnotationsAdapter(array(\n        'annotationsDir' => './cache/annotations/'\n    ));\n};\n\n</pre>\n<p>Note that these adapters aren't suitable for development because they don't reload the changes made to the classes, you can use the Memory adapters to achieve this result.</p>\n<h3>Example in Action</h3>\n<p>Once everything is correctly working you can use the models as is normally done in Phalcon:</p>\n<pre class=\"sh_sh sh_sourceCode\"><?php\n\n$robot = Robots::findFirst(\"type = 'mechanical'\");\n\nforeach ($robot->robotsParts as $robotPart) {\n    echo 'Name:', $robotPart->part->name, PHP_EOL;\n}\n</pre>\n<h3>Conclusion</h3>\n<p>This tutorial explains various strategies to extend Phalcon, the use of annotations, some additional information about the inner workings of the <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>. We hope that this example serve as a guide to create more robust applications with Phalcon.</p>","content_raw":"<p>This tutorial is oriented to an intermediate/advanced audience. We'll explain how to create a custom model's initializer via annotations that can be easily modified/adapted to initialize collections, plugins, etc.</p>\r\n<h3>Bootstrap</h3>\r\n<p>The example provides a simple structure that can be implemented in any Phalcon application. You can find the complete code on <a href=\"https://github.com/phalcon/tutorial-models-init\">Github</a>. The following structure is used:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">example/\r\n cache/<br> db/\r\n models/\r\n   Robots.php\r\n   RobotsParts.php<br>   Parts.php\r\n library/\r\n   AnnotationsInitializer.php\r\n   AnnotationsMetaDataInitializer.php\r\n services.php<br> index.php\r\n </pre>\r\n<p>The file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a> is the example's bootstrap, on it you can find the service initialization, we are only initializing the basic services necessary to run the example.</p>\r\n<p>The first is the database connection, we used Sqlite as adapter, but you can use any other of the <a href=\"https://docs.phalconphp.com/en/latest/reference/db.html#database-adapters\">supported database systems</a>:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">//Setup a connection\r\n$di['db'] = function () {\r\n    return new \\Phalcon\\Db\\Adapter\\Pdo\\Sqlite(array(\r\n        \"dbname\" =&gt; \"sample.db\"\r\n    ));\r\n};\r\n</pre>\r\n<p>Then, we create the model's manager with a custom plugin that perform extra initialization tasks:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">//Set a models manager\r\n$di['modelsManager'] = function () {\r\n\r\n    $eventsManager = new EventsManager();\r\n\r\n    $modelsManager = new ModelsManager();\r\n\r\n    $modelsManager-&gt;setEventsManager($eventsManager);\r\n\r\n    //Attach a listener to models-manager\r\n    $eventsManager-&gt;attach('modelsManager', new AnnotationsInitializer());\r\n\r\n    return $modelsManager;\r\n};\r\n</pre>\r\n<h3>Model initialization</h3>\r\n<p><a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsInitializer.php\">AnnotationsInitializer</a> is a plugin that reads the annotations in the model's class performing the&nbsp;appropriate&nbsp;tasks according to the annotations used. A model with annotations is the following:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\n/**\r\n * Robots\r\n *\r\n * Represents a robot\r\n *\r\n * @Source('my_robots');\r\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\r\n */\r\nclass Robots extends \\Phalcon\\Mvc\\Model\r\n{\r\n    /**\r\n     * @Primary\r\n     * @Identity\r\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\r\n     */\r\n    public $id;\r\n\r\n    /**\r\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\r\n     */\r\n    public $name;\r\n\r\n    /**\r\n     * @Column(type=\"string\", nullable=false, column=\"my_type\")\r\n     */\r\n    public $type;\r\n\r\n    /**\r\n     * @Column(type=\"integer\", nullable=false, column=\"my_year\")\r\n     */\r\n    public $year;\r\n\r\n}\r\n</pre>\r\n<p>Both class and properties are initialized using annotations rather than use the standard methods 'initialize', 'columnMap', 'getSource', etc. In this class, columns are dynamically renamed to the original ones in the database removing the vendor prefix 'my_'. So if the column in the table is called 'my_name' you can freely rename it as just 'name'.</p>\r\n<p>Our second model is \"Parts\", every part represents a possible part to assemble our robots. This model contains every possible part that a robot could have.</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\n/**\r\n * Parts\r\n *\r\n * Represents every part to assemble a robot\r\n *\r\n * @Source('my_parts');\r\n * @HasMany(\"id\", \"RobotsParts\", \"robotsId\")\r\n */\r\nclass Parts extends \\Phalcon\\Mvc\\Model\r\n{\r\n    /**\r\n     * @Primary\r\n     * @Identity\r\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\r\n     */\r\n    public $id;\r\n\r\n    /**\r\n     * @Column(type=\"string\", nullable=false, column=\"my_name\")\r\n     */\r\n    public $name;\r\n\r\n}\r\n</pre>\r\n<p>The relation between the robots and their parts are managed via the model RobotsParts:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\n/**\r\n * RobotsParts\r\n *\r\n * Represents the relation between Robots and Parts\r\n *\r\n * @Source('my_robots_parts');\r\n * @BelongsTo('robotsId', 'Robots', 'id', {\r\n *    'alias': 'robot'\r\n * });\r\n * @BelongsTo('partsId', 'Parts', 'id', {\r\n *    'alias': 'part'\r\n * });\r\n */\r\nclass RobotsParts extends \\Phalcon\\Mvc\\Model\r\n{\r\n    /**\r\n     * @Primary\r\n     * @Identity\r\n     * @Column(type=\"integer\", nullable=false, column=\"my_id\")\r\n     */\r\n    public $id;\r\n\r\n    /**\r\n     * @Column(type=\"integer\", nullable=false, column=\"my_robots_id\")\r\n     */\r\n    public $robotsId;\r\n\r\n    /**\r\n     * @Column(type=\"integer\", nullable=false, column=\"my_parts_id\")\r\n     */\r\n    public $partsId;\r\n\r\n}\r\n</pre>\r\n<p>To make these annotations work, we return to the AnnotationsInitializer, as mentioned before, this plugin is called after any model is initialized in the models manager allowing us to perform extra initializations:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\nuse Phalcon\\Events\\Event,\r\n    Phalcon\\Mvc\\Model\\Manager as ModelsManager\r\n    Phalcon\\Mvc\\ModelInterface;\r\n\r\nclass AnnotationsInitializer extends Phalcon\\Mvc\\User\\Plugin\r\n{\r\n\r\n    /**\r\n     * This is called after initialize the model\r\n     *\r\n     * @param Phalcon\\Events\\Event $event\r\n     */\r\n    public function afterInitialize(Event $event, ModelsManager $manager, ModelInterface $model)\r\n    {\r\n        //...\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>The method 'afterInitialize' has the same name as the event triggered by the models manager, telling the events manager that this method must be executed. It receives the models manager itself and the model recently initialized.</p>\r\n<p>Now, we could extract the annotations in the model's class giving a useful meaning to each of them:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\n//Get the annotations reflection\r\n$reflector = $this-&gt;annotations-&gt;get($model);\r\n\r\n/**\r\n * Read the annotations in the class docblock\r\n */\r\n$annotations = $reflector-&gt;getClassAnnotations();\r\nif ($annotations) {\r\n\r\n    /**\r\n     * Traverse the annotations\r\n     */\r\n    foreach ($annotations as $annotation) {\r\n        switch ($annotation-&gt;getName()) {\r\n            //...\r\n        }\r\n    }\r\n}\r\n</pre>\r\n<p>Annotations found are traversed and according to its name we're going to initialize the desired functionality, for example, if the name is 'Source' we're going to assign its parameter as the model's mapped table:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\n/**\r\n * Initializes the models source\r\n */\r\ncase 'Source':\r\n    $arguments = $annotation-&gt;getArguments();\r\n    $manager-&gt;setModelSource($model, $arguments[0]);\r\n    break;\r\n\r\n</pre>\r\n<p>This way you can create new annotations, change the current names, etc. adding more functionality according to your application needs. Check out the original source code to understand how the other annotations are created.</p>\r\n<h3>Meta-Data initialization</h3>\r\n<p>The second part of the initialization is the model's meta-data. This information is required to automate the operation of ORM in Phalcon. The meta-data contains: field names, primary keys, data types, column maps, etc. Normally, Phalcon uses database introspection to read this information from the database. In our case, we're going to define those data in annotations.</p>\r\n<p>Phalcon provides the built-in strategy class: <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html#annotations-strategy\">Phalcon\\Mvc\\Model\\MetaData\\Strategy\\Annotations</a> which performs the same task we'll going to explain below. Our custom meta-data strategy also uses annotations but it gives us understanding of how this task is achieved. You can adapt this code to create dynamic schemas, row level security, new annotations, etc.</p>\r\n<p>This adapter is called <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsMetaDataInitializer.php\">AnnotationsMetaDataInitializer</a> (found in the library/ directory). It implements two methods: the former initializes the main meta-data and the second any column map found in the class:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\nuse Phalcon\\Mvc\\ModelInterface,\r\n    Phalcon\\DiInterface,\r\n    Phalcon\\Mvc\\Model\\MetaData,\r\n    Phalcon\\Db\\Column;\r\n\r\nclass AnnotationsMetaDataInitializer\r\n{\r\n\r\n    /**\r\n     * Initializes the models meta-data\r\n     *\r\n     * @param Phalcon\\Mvc\\ModelInterface $model\r\n     * @param Phalcon\\DiInterface $di\r\n     * @return array\r\n     */\r\n    public function getMetaData(ModelInterface $model, DiInterface $di)\r\n    {\r\n        //...\r\n    }\r\n\r\n    /**\r\n     * Initializes the models column map\r\n     *\r\n     * @param Phalcon\\Mvc\\ModelInterface $model\r\n     * @param Phalcon\\DiInterface $di\r\n     * @return array\r\n     */\r\n    public function getColumnMaps(ModelInterface $model, DiInterface $di)\r\n    {\r\n        //...\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Following the same philosophy used in the model initializer we're going to find which annotations are defined in the properties, giving a meaning to each of them:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\nforeach ($reflection-&gt;getPropertiesAnnotations() as $name =&gt; $collection) {\r\n\r\n    if ($collection-&gt;has('Column')) {\r\n        //... do something if the property has this annotation defined\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Returning to the file <a href=\"https://github.com/phalcon/tutorial-models-init/blob/master/services.php\">services.php</a>, we see how this adapter is set up instead of the default one:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\n$di['modelsMetadata'] = function () {\r\n\r\n    //Use the memory meta-data adapter in development\r\n    $metaData = new MetaDataAdapter(array(\r\n        'metaDataDir' =&gt; './cache/meta-data/'\r\n    ));\r\n\r\n    //Set a custom meta-data database introspection\r\n    $metaData-&gt;setStrategy(new AnnotationsMetaDataInitializer());\r\n\r\n    return $metaData;\r\n};\r\n</pre>\r\n<h3>Caching Annotations/Meta-Data</h3>\r\n<p>Parsing/Reading annotations and processing meta-data could add an important amount of overhead to the application in every request reducing the performance. While the Phalcon's <a href=\"https://docs.phalconphp.com/en/latest/reference/annotations.html\">annotations parser</a> is very fast, you could improve the speed by&nbsp;aggressively&nbsp;caching the annotations and meta-data using some of the adapters provided by the framework. In our example, we're using files to export the processed data avoiding the permanent processing in each request:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">//Use the memory meta-data adapter in development\r\n$metaData = new MetaDataAdapter(array(\r\n    'metaDataDir' =&gt; './cache/meta-data/'\r\n));\r\n\r\n//Using the files adapter for annotations\r\n$di['annotations'] = function () {\r\n    return new AnnotationsAdapter(array(\r\n        'annotationsDir' =&gt; './cache/annotations/'\r\n    ));\r\n};\r\n\r\n</pre>\r\n<p>Note that these adapters aren't suitable for development because they don't reload the changes made to the classes, you can use the Memory adapters to achieve this result.</p>\r\n<h3>Example in Action</h3>\r\n<p>Once everything is correctly working you can use the models as is normally done in Phalcon:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">&lt;?php\r\n\r\n$robot = Robots::findFirst(\"type = 'mechanical'\");\r\n\r\nforeach ($robot-&gt;robotsParts as $robotPart) {\r\n    echo 'Name:', $robotPart-&gt;part-&gt;name, PHP_EOL;\r\n}\r\n</pre>\r\n<h3>Conclusion</h3>\r\n<p>This tutorial explains various strategies to extend Phalcon, the use of annotations, some additional information about the inner workings of the <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>. We hope that this example serve as a guide to create more robust applications with Phalcon.</p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-04-08
-->


Tutorial: Creating a custom model's initializer with Annotations
================================================================

This tutorial is oriented to an intermediate/advanced audience. We'll
explain how to create a custom model's initializer via annotations that
can be easily modified/adapted to initialize collections, plugins, etc.

### Bootstrap

The example provides a simple structure that can be implemented in any
Phalcon application. You can find the complete code on
[Github](https://github.com/phalcon/tutorial-models-init). The following
structure is used:

```
example/
 cache/ db/
 models/
   Robots.php
   RobotsParts.php   Parts.php
 library/
   AnnotationsInitializer.php
   AnnotationsMetaDataInitializer.php
 services.php index.php
 
```

The file
[services.php](https://github.com/phalcon/tutorial-models-init/blob/master/services.php)
is the example's bootstrap, on it you can find the service
initialization, we are only initializing the basic services necessary to
run the example.

The first is the database connection, we used Sqlite as adapter, but you
can use any other of the [supported database
systems](https://docs.phalconphp.com/en/latest/reference/db.html#database-adapters):

```
//Setup a connection
$di['db'] = function () {
    return new \Phalcon\Db\Adapter\Pdo\Sqlite(array(
        "dbname" => "sample.db"
    ));
};
```

Then, we create the model's manager with a custom plugin that perform
extra initialization tasks:

```
//Set a models manager
$di['modelsManager'] = function () {

    $eventsManager = new EventsManager();

    $modelsManager = new ModelsManager();

    $modelsManager->setEventsManager($eventsManager);

    //Attach a listener to models-manager
    $eventsManager->attach('modelsManager', new AnnotationsInitializer());

    return $modelsManager;
};
```

### Model initialization

[AnnotationsInitializer](https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsInitializer.php)
is a plugin that reads the annotations in the model's class performing
the appropriate tasks according to the annotations used. A model with
annotations is the following:

```
<?php

/**
 * Robots
 *
 * Represents a robot
 *
 * @Source('my_robots');
 * @HasMany("id", "RobotsParts", "robotsId")
 */
class Robots extends \Phalcon\Mvc\Model
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false, column="my_id")
     */
    public $id;

    /**
     * @Column(type="string", nullable=false, column="my_name")
     */
    public $name;

    /**
     * @Column(type="string", nullable=false, column="my_type")
     */
    public $type;

    /**
     * @Column(type="integer", nullable=false, column="my_year")
     */
    public $year;

}
```

Both class and properties are initialized using annotations rather than
use the standard methods ‘initialize', 'columnMap', 'getSource', etc. In
this class, columns are dynamically renamed to the original ones in the
database removing the vendor prefix 'my\_'. So if the column in the
table is called 'my\_name' you can freely rename it as just 'name'.

Our second model is "Parts", every part represents a possible part to
assemble our robots. This model contains every possible part that a
robot could have.

```
<?php

/**
 * Parts
 *
 * Represents every part to assemble a robot
 *
 * @Source('my_parts');
 * @HasMany("id", "RobotsParts", "robotsId")
 */
class Parts extends \Phalcon\Mvc\Model
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false, column="my_id")
     */
    public $id;

    /**
     * @Column(type="string", nullable=false, column="my_name")
     */
    public $name;

}
```

The relation between the robots and their parts are managed via the
model RobotsParts:

```
<?php

/**
 * RobotsParts
 *
 * Represents the relation between Robots and Parts
 *
 * @Source('my_robots_parts');
 * @BelongsTo('robotsId', 'Robots', 'id', {
 *    'alias': 'robot'
 * });
 * @BelongsTo('partsId', 'Parts', 'id', {
 *    'alias': 'part'
 * });
 */
class RobotsParts extends \Phalcon\Mvc\Model
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false, column="my_id")
     */
    public $id;

    /**
     * @Column(type="integer", nullable=false, column="my_robots_id")
     */
    public $robotsId;

    /**
     * @Column(type="integer", nullable=false, column="my_parts_id")
     */
    public $partsId;

}
```

To make these annotations work, we return to the AnnotationsInitializer,
as mentioned before, this plugin is called after any model is
initialized in the models manager allowing us to perform extra
initializations:

```
<?php

use Phalcon\Events\Event,
    Phalcon\Mvc\Model\Manager as ModelsManager
    Phalcon\Mvc\ModelInterface;

class AnnotationsInitializer extends Phalcon\Mvc\User\Plugin
{

    /**
     * This is called after initialize the model
     *
     * @param Phalcon\Events\Event $event
     */
    public function afterInitialize(Event $event, ModelsManager $manager, ModelInterface $model)
    {
        //...
    }

}
```

The method 'afterInitialize' has the same name as the event triggered by
the models manager, telling the events manager that this method must be
executed. It receives the models manager itself and the model recently
initialized.

Now, we could extract the annotations in the model's class giving a
useful meaning to each of them:

```
<?php

//Get the annotations reflection
$reflector = $this->annotations->get($model);

/**
 * Read the annotations in the class docblock
 */
$annotations = $reflector->getClassAnnotations();
if ($annotations) {

    /**
     * Traverse the annotations
     */
    foreach ($annotations as $annotation) {
        switch ($annotation->getName()) {
            //...
        }
    }
}
```

Annotations found are traversed and according to its name we're going to
initialize the desired functionality, for example, if the name is
'Source' we're going to assign its parameter as the model's mapped
table:

```
<?php

/**
 * Initializes the models source
 */
case 'Source':
    $arguments = $annotation->getArguments();
    $manager->setModelSource($model, $arguments[0]);
    break;
```

This way you can create new annotations, change the current names, etc.
adding more functionality according to your application needs. Check out
the original source code to understand how the other annotations are
created.

### Meta-Data initialization

The second part of the initialization is the model's meta-data. This
information is required to automate the operation of ORM in Phalcon. The
meta-data contains: field names, primary keys, data types, column maps,
etc. Normally, Phalcon uses database introspection to read this
information from the database. In our case, we're going to define those
data in annotations.

Phalcon provides the built-in strategy class:
[Phalcon\\Mvc\\Model\\MetaData\\Strategy\\Annotations](https://docs.phalconphp.com/en/latest/reference/models.html#annotations-strategy)
which performs the same task we'll going to explain below. Our custom
meta-data strategy also uses annotations but it gives us understanding
of how this task is achieved. You can adapt this code to create dynamic
schemas, row level security, new annotations, etc.

This adapter is called
[AnnotationsMetaDataInitializer](https://github.com/phalcon/tutorial-models-init/blob/master/library/AnnotationsMetaDataInitializer.php)
(found in the library/ directory). It implements two methods: the former
initializes the main meta-data and the second any column map found in
the class:

```
<?php

use Phalcon\Mvc\ModelInterface,
    Phalcon\DiInterface,
    Phalcon\Mvc\Model\MetaData,
    Phalcon\Db\Column;

class AnnotationsMetaDataInitializer
{

    /**
     * Initializes the models meta-data
     *
     * @param Phalcon\Mvc\ModelInterface $model
     * @param Phalcon\DiInterface $di
     * @return array
     */
    public function getMetaData(ModelInterface $model, DiInterface $di)
    {
        //...
    }

    /**
     * Initializes the models column map
     *
     * @param Phalcon\Mvc\ModelInterface $model
     * @param Phalcon\DiInterface $di
     * @return array
     */
    public function getColumnMaps(ModelInterface $model, DiInterface $di)
    {
        //...
    }

}
```

Following the same philosophy used in the model initializer we're going
to find which annotations are defined in the properties, giving a
meaning to each of them:

```
<?php

foreach ($reflection->getPropertiesAnnotations() as $name => $collection) {

    if ($collection->has('Column')) {
        //... do something if the property has this annotation defined
    }

}
```

Returning to the file
[services.php](https://github.com/phalcon/tutorial-models-init/blob/master/services.php),
we see how this adapter is set up instead of the default one:

```
<?php

$di['modelsMetadata'] = function () {

    //Use the memory meta-data adapter in development
    $metaData = new MetaDataAdapter(array(
        'metaDataDir' => './cache/meta-data/'
    ));

    //Set a custom meta-data database introspection
    $metaData->setStrategy(new AnnotationsMetaDataInitializer());

    return $metaData;
};
```

### Caching Annotations/Meta-Data

Parsing/Reading annotations and processing meta-data could add an
important amount of overhead to the application in every request
reducing the performance. While the Phalcon's [annotations
parser](https://docs.phalconphp.com/en/latest/reference/annotations.html)
is very fast, you could improve the speed by aggressively caching the
annotations and meta-data using some of the adapters provided by the
framework. In our example, we're using files to export the processed
data avoiding the permanent processing in each request:

```
//Use the memory meta-data adapter in development
$metaData = new MetaDataAdapter(array(
    'metaDataDir' => './cache/meta-data/'
));

//Using the files adapter for annotations
$di['annotations'] = function () {
    return new AnnotationsAdapter(array(
        'annotationsDir' => './cache/annotations/'
    ));
};
```

Note that these adapters aren't suitable for development because they
don't reload the changes made to the classes, you can use the Memory
adapters to achieve this result.

### Example in Action

Once everything is correctly working you can use the models as is
normally done in Phalcon:

```
<?php

$robot = Robots::findFirst("type = 'mechanical'");

foreach ($robot->robotsParts as $robotPart) {
    echo 'Name:', $robotPart->part->name, PHP_EOL;
}
```

### Conclusion

This tutorial explains various strategies to extend Phalcon, the use of
annotations, some additional information about the inner workings of the
[ORM](https://docs.phalconphp.com/en/latest/reference/models.html). We
hope that this example serve as a guide to create more robust
applications with Phalcon.

