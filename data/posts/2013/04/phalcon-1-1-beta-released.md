<!--
slug: phalcon-1-1-beta-released
date: Mon Apr 15 2013 21:59:00 GMT-0400 (EDT)
tags: phalcon, php, release
title: Phalcon 1.1 beta released!
id: 48089073098
link: http://blog.phalconphp.com/post/48089073098/phalcon-1-1-beta-released
raw: {"blog_name":"phalconphp","id":48089073098,"post_url":"http://blog.phalconphp.com/post/48089073098/phalcon-1-1-beta-released","slug":"phalcon-1-1-beta-released","type":"text","date":"2013-04-16 01:59:00 GMT","timestamp":1366077540,"state":"published","format":"html","reblog_key":"WEcDfATF","tags":["phalcon","php","release"],"short_url":"http://tmblr.co/Z6PumvioLGNA","highlighted":[],"note_count":3,"title":"Phalcon 1.1 beta released!","body":"<p>After ​our successful 1.0 release, we continue improving Phalcon ​with our latest release 1.1.0 (beta). In this article, we&rsquo;re highlighting the most important features introduced:</p>\n<h3>QueryBuilder Paginator</h3>\n<p>In addition to the <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">ModelResultset</a> and <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">NativeArray</a> paginator, this version introduces the QueryBuilder paginator which uses a SQL LIMIT/OFFSET clause to obtain the requested results. This paginator is suitable to handle ​large datasets.</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Paginator\\Adapter\\QueryBuilder;\n\n$builder = $this-&gt;modelsManager-&gt;createBuilder()\n      \t-&gt;columns('id, name')\n  \t-&gt;from('Robots')\n  \t-&gt;orderBy('name');\n\n$paginator = new Paginator(array(\n\t\"builder\" =&gt; $builder,\n\t\"limit\"=&gt; 10,\n\t\"page\" =&gt; 1\n));\n\n$page = $paginator-&gt;getPaginate();\n</pre>\n<h3>Beanstalkd Queuing client</h3>\n<p>A simple client for the <a href=\"http://kr.github.io/beanstalkd/\">Beanstalkd</a> queuing server is now available as part of Phalcon:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n//Connect to the queue\n$queue = new Phalcon\\Queue\\Beanstalk(array(\n    'host' =&gt; '192.168.0.21'\n));\n\n//Insert the job in the queue (simple)\n$queue-&gt;put(array('proccessVideo' =&gt; 4871));\n\n//Insert the job in the queue with options\n$queue-&gt;put(\n    array('proccessVideo' =&gt; 4871),\n    array('priority' =&gt; 250, 'delay' =&gt; 10, 'ttr' =&gt; 3600)\n);\n\nwhile (($job = $queue-&gt;peekReady()) !== false) {\n\n    $message = $job-&gt;getBody();\n\n    var_dump($message);\n\n    $job-&gt;delete();\n}\n</pre>\n<h3>Encryption</h3>\n<p>This version includes a simple class to encrypt/decrypt data based on the PHP&rsquo;s <a href=\"http://php.net/manual/en/book.mcrypt.php\">mcrypt</a> library.</p>\n<pre class=\"sh_php sh_sourceCode\">//Create an instance\n$encryption = new Phalcon\\Crypt();\n\n$key = 'le password';\n$text = 'This is a secret text';\n\n$encrypted = $encryption-&gt;encrypt($text, $key);\n\necho $encryption-&gt;decrypt($encrypted, $key);</pre>\n<h3>Assets Management</h3>\n<p>This component eases the task of adding static resources such as CSS scripts and Javascript libraries to then output them in the views:</p>\n<pre class=\"sh_php sh_sourceCode\">//Add some local CSS resources\n$this-&gt;assets\n\t-&gt;addCss('css/style.css')\n\t-&gt;addCss('css/index.css');\n\n//and some local javascript resources\n$this-&gt;assets\n\t-&gt;addJs('js/jquery.js')\n\t-&gt;addJs('js/bootstrap.min.js');\n</pre>\n<p>Then in the view:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;html&gt;\n    &lt;head&gt;\n        &lt;title&gt;Some amazing website&lt;/title&gt;\n        &lt;?php $this-&gt;assets-&gt;outputCss() ?&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n\n        &lt;!-- ... --&gt;\n\n        &lt;?php $this-&gt;assets-&gt;outputJs() ?&gt;\n    &lt;/body&gt;\n&lt;/html&gt;</pre>\n<h3>Exception mode in ORM Validations</h3>\n<p>By default, when some of the validators in a creating/updating process fails, the methods save()/create()/update return ​ ​a boolean value​stating the success ​or failure ​of this operation. Now, you can change this behavior to use exceptions:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\ValidationFailed;\n\ntry {\n\n\t$robot = new Robots();\n\t$robot-&gt;name = 'Bender';\n\t$robot-&gt;save();\n\n} catch (ValidationFailed $e) {\n\techo 'Reason: ', $e-&gt;getMessage();\n}\n</pre>\n<h3>Hostname routing</h3>\n<p>Phalcon\\Mvc\\Router now accepts hostname restrictions on their routes</p>\n<pre class=\"sh_php sh_sourceCode\">$router = new Phalcon\\Mvc\\Router();\n\n$router-&gt;addGet('/api/robots', array(\n\t'module' =&gt; 'api',\n\t'controller' =&gt; 'robots',\n\t'action' =&gt; 'index'\n))-&gt;setHostName('api.phalconphp.com');\n\n</pre>\n<p>Or use a group:</p>\n<pre class=\"sh_php sh_sourceCode\">$group = new Phalcon\\Mvc\\Router();\n\n$group-&gt;setHostName('api.phalconphp.com');\n\n$groop-&gt;addGet('/api/robots', array(\n\t'module' =&gt; 'api',\n\t'controller' =&gt; 'robots',\n\t'action' =&gt; 'index'\n));\n\n$groop-&gt;addGet('/api/robots/{id}', array(\n\t'module' =&gt; 'api',\n\t'controller' =&gt; 'robots',\n\t'action' =&gt; 'show'\n));\n\n$router-&gt;mount($group);\n</pre>\n<h3>Use Controllers in Mvc\\Micro</h3>\n<p>To organize better micro applications, now you can set up classes as controllers</p>\n<pre class=\"sh_php sh_sourceCode\">$collection = new Phalcon\\Mvc\\Micro\\Collection();\n\n//Use direct instantiation\n$collection\n\t-&gt;setPrefix('/posts')\n\t-&gt;setHandler(new PostsController());\n\n//Lazy instantiation\n$collection\n\t-&gt;setPrefix('/posts')\n\t-&gt;setHandler('PostsController', true);\n\n$collection-&gt;get('/', 'index');\n\n$collection-&gt;get('/edit/{id}', 'edit');\n\n$collection-&gt;delete('/delete/{id}', 'delete');\n\n$app-&gt;mount($collection);\n</pre>\n<p>1.1.0 includes other minor changes, bug fixes, stability and performance improvements. You can see the complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.1.0/CHANGELOG\">CHANGELOG</a> here. Check the <a href=\"http://docs.phalconphp.com/en/1.1.0/\">documentation</a> for this version</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.1.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.1.0\nsudo ./install\n</pre>\n<p>Windows users can download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a>.</p>\n<p>We welcome your comments regarding this new release in <a href=\"http://forum.phalconphp.com\">Phosphorum</a> and <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on <a href=\"http://github.com/phalcon/cphalcon/\">Github</a>.</p>\n<p>Thanks!</p>","reblog":{"tree_html":"","comment":"<p>After &#8203;our successful 1.0 release, we continue improving Phalcon &#8203;with our latest release 1.1.0 (beta). In this article, we&rsquo;re highlighting the most important features introduced:</p>\n<h3>QueryBuilder Paginator</h3>\n<p>In addition to the <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">ModelResultset</a> and <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">NativeArray</a> paginator, this version introduces the QueryBuilder paginator which uses a SQL LIMIT/OFFSET clause to obtain the requested results. This paginator is suitable to handle &#8203;large datasets.</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Paginator\\Adapter\\QueryBuilder;\n\n$builder = $this-&gt;modelsManager-&gt;createBuilder()\n      \t-&gt;columns('id, name')\n  \t-&gt;from('Robots')\n  \t-&gt;orderBy('name');\n\n$paginator = new Paginator(array(\n\t\"builder\" =&gt; $builder,\n\t\"limit\"=&gt; 10,\n\t\"page\" =&gt; 1\n));\n\n$page = $paginator-&gt;getPaginate();\n</pre>\n<h3>Beanstalkd Queuing client</h3>\n<p>A simple client for the <a href=\"http://kr.github.io/beanstalkd/\">Beanstalkd</a> queuing server is now available as part of Phalcon:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n//Connect to the queue\n$queue = new Phalcon\\Queue\\Beanstalk(array(\n    'host' =&gt; '192.168.0.21'\n));\n\n//Insert the job in the queue (simple)\n$queue-&gt;put(array('proccessVideo' =&gt; 4871));\n\n//Insert the job in the queue with options\n$queue-&gt;put(\n    array('proccessVideo' =&gt; 4871),\n    array('priority' =&gt; 250, 'delay' =&gt; 10, 'ttr' =&gt; 3600)\n);\n\nwhile (($job = $queue-&gt;peekReady()) !== false) {\n\n    $message = $job-&gt;getBody();\n\n    var_dump($message);\n\n    $job-&gt;delete();\n}\n</pre>\n<h3>Encryption</h3>\n<p>This version includes a simple class to encrypt/decrypt data based on the PHP&rsquo;s <a href=\"http://php.net/manual/en/book.mcrypt.php\">mcrypt</a> library.</p>\n<pre class=\"sh_php sh_sourceCode\">//Create an instance\n$encryption = new Phalcon\\Crypt();\n\n$key = 'le password';\n$text = 'This is a secret text';\n\n$encrypted = $encryption-&gt;encrypt($text, $key);\n\necho $encryption-&gt;decrypt($encrypted, $key);</pre>\n<h3>Assets Management</h3>\n<p>This component eases the task of adding static resources such as CSS scripts and Javascript libraries to then output them in the views:</p>\n<pre class=\"sh_php sh_sourceCode\">//Add some local CSS resources\n$this-&gt;assets\n\t-&gt;addCss('css/style.css')\n\t-&gt;addCss('css/index.css');\n\n//and some local javascript resources\n$this-&gt;assets\n\t-&gt;addJs('js/jquery.js')\n\t-&gt;addJs('js/bootstrap.min.js');\n</pre>\n<p>Then in the view:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;html&gt;\n    &lt;head&gt;\n        &lt;title&gt;Some amazing website&lt;/title&gt;\n        &lt;?php $this-&gt;assets-&gt;outputCss() ?&gt;\n    &lt;/head&gt;\n    &lt;body&gt;\n\n        &lt;!-- ... --&gt;\n\n        &lt;?php $this-&gt;assets-&gt;outputJs() ?&gt;\n    &lt;/body&gt;\n&lt;/html&gt;</pre>\n<h3>Exception mode in ORM Validations</h3>\n<p>By default, when some of the validators in a creating/updating process fails, the methods save()/create()/update return &#8203; &#8203;a boolean value&#8203;stating the success &#8203;or failure &#8203;of this operation. Now, you can change this behavior to use exceptions:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\ValidationFailed;\n\ntry {\n\n\t$robot = new Robots();\n\t$robot-&gt;name = 'Bender';\n\t$robot-&gt;save();\n\n} catch (ValidationFailed $e) {\n\techo 'Reason: ', $e-&gt;getMessage();\n}\n</pre>\n<h3>Hostname routing</h3>\n<p>Phalcon\\Mvc\\Router now accepts hostname restrictions on their routes</p>\n<pre class=\"sh_php sh_sourceCode\">$router = new Phalcon\\Mvc\\Router();\n\n$router-&gt;addGet('/api/robots', array(\n\t'module' =&gt; 'api',\n\t'controller' =&gt; 'robots',\n\t'action' =&gt; 'index'\n))-&gt;setHostName('api.phalconphp.com');\n\n</pre>\n<p>Or use a group:</p>\n<pre class=\"sh_php sh_sourceCode\">$group = new Phalcon\\Mvc\\Router();\n\n$group-&gt;setHostName('api.phalconphp.com');\n\n$groop-&gt;addGet('/api/robots', array(\n\t'module' =&gt; 'api',\n\t'controller' =&gt; 'robots',\n\t'action' =&gt; 'index'\n));\n\n$groop-&gt;addGet('/api/robots/{id}', array(\n\t'module' =&gt; 'api',\n\t'controller' =&gt; 'robots',\n\t'action' =&gt; 'show'\n));\n\n$router-&gt;mount($group);\n</pre>\n<h3>Use Controllers in Mvc\\Micro</h3>\n<p>To organize better micro applications, now you can set up classes as controllers</p>\n<pre class=\"sh_php sh_sourceCode\">$collection = new Phalcon\\Mvc\\Micro\\Collection();\n\n//Use direct instantiation\n$collection\n\t-&gt;setPrefix('/posts')\n\t-&gt;setHandler(new PostsController());\n\n//Lazy instantiation\n$collection\n\t-&gt;setPrefix('/posts')\n\t-&gt;setHandler('PostsController', true);\n\n$collection-&gt;get('/', 'index');\n\n$collection-&gt;get('/edit/{id}', 'edit');\n\n$collection-&gt;delete('/delete/{id}', 'delete');\n\n$app-&gt;mount($collection);\n</pre>\n<p>1.1.0 includes other minor changes, bug fixes, stability and performance improvements. You can see the complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.1.0/CHANGELOG\">CHANGELOG</a> here. Check the <a href=\"http://docs.phalconphp.com/en/1.1.0/\">documentation</a> for this version</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.1.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.1.0\nsudo ./install\n</pre>\n<p>Windows users can download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a>.</p>\n<p>We welcome your comments regarding this new release in <a href=\"http://forum.phalconphp.com\">Phosphorum</a> and <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on <a href=\"http://github.com/phalcon/cphalcon/\">Github</a>.</p>\n<p>Thanks!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"48089073098"},"content":"<p>After ​our successful 1.0 release, we continue improving Phalcon ​with our latest release 1.1.0 (beta). In this article, we’re highlighting the most important features introduced:</p>\n<h3>QueryBuilder Paginator</h3>\n<p>In addition to the <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">ModelResultset</a> and <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">NativeArray</a> paginator, this version introduces the QueryBuilder paginator which uses a SQL LIMIT/OFFSET clause to obtain the requested results. This paginator is suitable to handle ​large datasets.</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Paginator\\Adapter\\QueryBuilder;\n\n$builder = $this->modelsManager->createBuilder()\n      \t->columns('id, name')\n  \t->from('Robots')\n  \t->orderBy('name');\n\n$paginator = new Paginator(array(\n\t\"builder\" => $builder,\n\t\"limit\"=> 10,\n\t\"page\" => 1\n));\n\n$page = $paginator->getPaginate();\n</pre>\n<h3>Beanstalkd Queuing client</h3>\n<p>A simple client for the <a href=\"http://kr.github.io/beanstalkd/\">Beanstalkd</a> queuing server is now available as part of Phalcon:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n//Connect to the queue\n$queue = new Phalcon\\Queue\\Beanstalk(array(\n    'host' => '192.168.0.21'\n));\n\n//Insert the job in the queue (simple)\n$queue->put(array('proccessVideo' => 4871));\n\n//Insert the job in the queue with options\n$queue->put(\n    array('proccessVideo' => 4871),\n    array('priority' => 250, 'delay' => 10, 'ttr' => 3600)\n);\n\nwhile (($job = $queue->peekReady()) !== false) {\n\n    $message = $job->getBody();\n\n    var_dump($message);\n\n    $job->delete();\n}\n</pre>\n<h3>Encryption</h3>\n<p>This version includes a simple class to encrypt/decrypt data based on the PHP’s <a href=\"http://php.net/manual/en/book.mcrypt.php\">mcrypt</a> library.</p>\n<pre class=\"sh_php sh_sourceCode\">//Create an instance\n$encryption = new Phalcon\\Crypt();\n\n$key = 'le password';\n$text = 'This is a secret text';\n\n$encrypted = $encryption->encrypt($text, $key);\n\necho $encryption->decrypt($encrypted, $key);</pre>\n<h3>Assets Management</h3>\n<p>This component eases the task of adding static resources such as CSS scripts and Javascript libraries to then output them in the views:</p>\n<pre class=\"sh_php sh_sourceCode\">//Add some local CSS resources\n$this->assets\n\t->addCss('css/style.css')\n\t->addCss('css/index.css');\n\n//and some local javascript resources\n$this->assets\n\t->addJs('js/jquery.js')\n\t->addJs('js/bootstrap.min.js');\n</pre>\n<p>Then in the view:</p>\n<pre class=\"sh_php sh_sourceCode\"><html>\n    <head>\n        <title>Some amazing website</title>\n        <?php $this->assets->outputCss() ?>\n    </head>\n    <body>\n\n        <!-- ... -->\n\n        <?php $this->assets->outputJs() ?>\n    </body>\n</html></pre>\n<h3>Exception mode in ORM Validations</h3>\n<p>By default, when some of the validators in a creating/updating process fails, the methods save()/create()/update return ​ ​a boolean value​stating the success ​or failure ​of this operation. Now, you can change this behavior to use exceptions:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\ValidationFailed;\n\ntry {\n\n\t$robot = new Robots();\n\t$robot->name = 'Bender';\n\t$robot->save();\n\n} catch (ValidationFailed $e) {\n\techo 'Reason: ', $e->getMessage();\n}\n</pre>\n<h3>Hostname routing</h3>\n<p>Phalcon\\Mvc\\Router now accepts hostname restrictions on their routes</p>\n<pre class=\"sh_php sh_sourceCode\">$router = new Phalcon\\Mvc\\Router();\n\n$router->addGet('/api/robots', array(\n\t'module' => 'api',\n\t'controller' => 'robots',\n\t'action' => 'index'\n))->setHostName('api.phalconphp.com');\n\n</pre>\n<p>Or use a group:</p>\n<pre class=\"sh_php sh_sourceCode\">$group = new Phalcon\\Mvc\\Router();\n\n$group->setHostName('api.phalconphp.com');\n\n$groop->addGet('/api/robots', array(\n\t'module' => 'api',\n\t'controller' => 'robots',\n\t'action' => 'index'\n));\n\n$groop->addGet('/api/robots/{id}', array(\n\t'module' => 'api',\n\t'controller' => 'robots',\n\t'action' => 'show'\n));\n\n$router->mount($group);\n</pre>\n<h3>Use Controllers in Mvc\\Micro</h3>\n<p>To organize better micro applications, now you can set up classes as controllers</p>\n<pre class=\"sh_php sh_sourceCode\">$collection = new Phalcon\\Mvc\\Micro\\Collection();\n\n//Use direct instantiation\n$collection\n\t->setPrefix('/posts')\n\t->setHandler(new PostsController());\n\n//Lazy instantiation\n$collection\n\t->setPrefix('/posts')\n\t->setHandler('PostsController', true);\n\n$collection->get('/', 'index');\n\n$collection->get('/edit/{id}', 'edit');\n\n$collection->delete('/delete/{id}', 'delete');\n\n$app->mount($collection);\n</pre>\n<p>1.1.0 includes other minor changes, bug fixes, stability and performance improvements. You can see the complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.1.0/CHANGELOG\">CHANGELOG</a> here. Check the <a href=\"http://docs.phalconphp.com/en/1.1.0/\">documentation</a> for this version</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.1.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.1.0\nsudo ./install\n</pre>\n<p>Windows users can download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a>.</p>\n<p>We welcome your comments regarding this new release in <a href=\"http://forum.phalconphp.com\">Phosphorum</a> and <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on <a href=\"http://github.com/phalcon/cphalcon/\">Github</a>.</p>\n<p>Thanks!</p>","content_raw":"<p>After &#8203;our successful 1.0 release, we continue improving Phalcon &#8203;with our latest release 1.1.0 (beta). In this article, we're highlighting the most important features introduced:</p>\r\n<h3>QueryBuilder Paginator</h3>\r\n<p>In addition to the <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">ModelResultset</a> and <a href=\"http://docs.phalconphp.com/en/latest/reference/pagination.html\">NativeArray</a> paginator, this version introduces the QueryBuilder paginator which uses a SQL LIMIT/OFFSET clause to obtain the requested results. This paginator is suitable to handle &#8203;large datasets.</p>\r\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Paginator\\Adapter\\QueryBuilder;\r\n\r\n$builder = $this-&gt;modelsManager-&gt;createBuilder()\r\n      \t-&gt;columns('id, name')\r\n  \t-&gt;from('Robots')\r\n  \t-&gt;orderBy('name');\r\n\r\n$paginator = new Paginator(array(\r\n\t\"builder\" =&gt; $builder,\r\n\t\"limit\"=&gt; 10,\r\n\t\"page\" =&gt; 1\r\n));\r\n\r\n$page = $paginator-&gt;getPaginate();\r\n</pre>\r\n<h3>Beanstalkd Queuing client</h3>\r\n<p>A simple client for the <a href=\"http://kr.github.io/beanstalkd/\">Beanstalkd</a> queuing server is now available as part of Phalcon:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n//Connect to the queue\r\n$queue = new Phalcon\\Queue\\Beanstalk(array(\r\n    'host' =&gt; '192.168.0.21'\r\n));\r\n\r\n//Insert the job in the queue (simple)\r\n$queue-&gt;put(array('proccessVideo' =&gt; 4871));\r\n\r\n//Insert the job in the queue with options\r\n$queue-&gt;put(\r\n    array('proccessVideo' =&gt; 4871),\r\n    array('priority' =&gt; 250, 'delay' =&gt; 10, 'ttr' =&gt; 3600)\r\n);\r\n\r\nwhile (($job = $queue-&gt;peekReady()) !== false) {\r\n\r\n    $message = $job-&gt;getBody();\r\n\r\n    var_dump($message);\r\n\r\n    $job-&gt;delete();\r\n}\r\n</pre>\r\n<h3>Encryption</h3>\r\n<p>This version includes a simple class to encrypt/decrypt data based on the PHP's <a href=\"http://php.net/manual/en/book.mcrypt.php\">mcrypt</a> library.</p>\r\n<pre class=\"sh_php sh_sourceCode\">//Create an instance\r\n$encryption = new Phalcon\\Crypt();\r\n\r\n$key = 'le password';\r\n$text = 'This is a secret text';\r\n\r\n$encrypted = $encryption-&gt;encrypt($text, $key);\r\n\r\necho $encryption-&gt;decrypt($encrypted, $key);</pre>\r\n<h3>Assets Management</h3>\r\n<p>This component eases the task of adding static resources such as CSS scripts and Javascript libraries to then output them in the views:</p>\r\n<pre class=\"sh_php sh_sourceCode\">//Add some local CSS resources\r\n$this-&gt;assets\r\n\t-&gt;addCss('css/style.css')\r\n\t-&gt;addCss('css/index.css');\r\n\r\n//and some local javascript resources\r\n$this-&gt;assets\r\n\t-&gt;addJs('js/jquery.js')\r\n\t-&gt;addJs('js/bootstrap.min.js');\r\n</pre>\r\n<p>Then in the view:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;html&gt;\r\n    &lt;head&gt;\r\n        &lt;title&gt;Some amazing website&lt;/title&gt;\r\n        &lt;?php $this-&gt;assets-&gt;outputCss() ?&gt;\r\n    &lt;/head&gt;\r\n    &lt;body&gt;\r\n\r\n        &lt;!-- ... --&gt;\r\n\r\n        &lt;?php $this-&gt;assets-&gt;outputJs() ?&gt;\r\n    &lt;/body&gt;\r\n&lt;/html&gt;</pre>\r\n<h3>Exception mode in ORM Validations</h3>\r\n<p>By default, when some of the validators in a creating/updating process fails, the methods save()/create()/update return &#8203; &#8203;a boolean value&#8203;stating the success &#8203;or failure &#8203;of this operation. Now, you can change this behavior to use exceptions:</p>\r\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\\ValidationFailed;\r\n\r\ntry {\r\n\r\n\t$robot = new Robots();\r\n\t$robot-&gt;name = 'Bender';\r\n\t$robot-&gt;save();\r\n\r\n} catch (ValidationFailed $e) {\r\n\techo 'Reason: ', $e-&gt;getMessage();\r\n}\r\n</pre>\r\n<h3>Hostname routing</h3>\r\n<p>Phalcon\\Mvc\\Router now accepts hostname restrictions on their routes</p>\r\n<pre class=\"sh_php sh_sourceCode\">$router = new Phalcon\\Mvc\\Router();\r\n\r\n$router-&gt;addGet('/api/robots', array(\r\n\t'module' =&gt; 'api',\r\n\t'controller' =&gt; 'robots',\r\n\t'action' =&gt; 'index'\r\n))-&gt;setHostName('api.phalconphp.com');\r\n\r\n</pre>\r\n<p>Or use a group:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$group = new Phalcon\\Mvc\\Router();\r\n\r\n$group-&gt;setHostName('api.phalconphp.com');\r\n\r\n$groop-&gt;addGet('/api/robots', array(\r\n\t'module' =&gt; 'api',\r\n\t'controller' =&gt; 'robots',\r\n\t'action' =&gt; 'index'\r\n));\r\n\r\n$groop-&gt;addGet('/api/robots/{id}', array(\r\n\t'module' =&gt; 'api',\r\n\t'controller' =&gt; 'robots',\r\n\t'action' =&gt; 'show'\r\n));\r\n\r\n$router-&gt;mount($group);\r\n</pre>\r\n<h3>Use Controllers in Mvc\\Micro</h3>\r\n<p>To organize better micro applications, now you can set up classes as controllers</p>\r\n<pre class=\"sh_php sh_sourceCode\">$collection = new Phalcon\\Mvc\\Micro\\Collection();\r\n\r\n//Use direct instantiation\r\n$collection\r\n\t-&gt;setPrefix('/posts')\r\n\t-&gt;setHandler(new PostsController());\r\n\r\n//Lazy instantiation\r\n$collection\r\n\t-&gt;setPrefix('/posts')\r\n\t-&gt;setHandler('PostsController', true);\r\n\r\n$collection-&gt;get('/', 'index');\r\n\r\n$collection-&gt;get('/edit/{id}', 'edit');\r\n\r\n$collection-&gt;delete('/delete/{id}', 'delete');\r\n\r\n$app-&gt;mount($collection);\r\n</pre>\r\n<p>1.1.0 includes other minor changes, bug fixes, stability and performance improvements. You can see the complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.1.0/CHANGELOG\">CHANGELOG</a> here. Check the <a href=\"docs.phalconphp.com/en/1.1.0/\">documentation</a> for this version</p>\r\n<h3>Help with Testing</h3>\r\n<p>This version can be installed from the 1.1.0 branch:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone http://github.com/phalcon/cphalcon\r\ncd build\r\ngit checkout 1.1.0\r\nsudo ./install\r\n</pre>\r\n<p>Windows users can download a DLL from the <a href=\"phalconphp.com/download\">download page</a>.</p>\r\n<p>We welcome your comments regarding this new release in <a href=\"forum.phalconphp.com\">Phosphorum</a> and <a href=\"stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on <a href=\"github.com/phalcon/cphalcon/\">Github</a>.</p>\r\n<p>Thanks!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-04-015
-->


Phalcon 1.1 beta released!
==========================

After ​our successful 1.0 release, we continue improving Phalcon ​with
our latest release 1.1.0 (beta). In this article, we’re highlighting the
most important features introduced:

### QueryBuilder Paginator

In addition to the
[ModelResultset](http://docs.phalconphp.com/en/latest/reference/pagination.html)
and
[NativeArray](http://docs.phalconphp.com/en/latest/reference/pagination.html)
paginator, this version introduces the QueryBuilder paginator which uses
a SQL LIMIT/OFFSET clause to obtain the requested results. This
paginator is suitable to handle ​large datasets.

~~~~ {.sh_php .sh_sourceCode}
use Phalcon\Paginator\Adapter\QueryBuilder;

$builder = $this->modelsManager->createBuilder()
        ->columns('id, name')
    ->from('Robots')
    ->orderBy('name');

$paginator = new Paginator(array(
    "builder" => $builder,
    "limit"=> 10,
    "page" => 1
));

$page = $paginator->getPaginate();
~~~~

### Beanstalkd Queuing client

A simple client for the [Beanstalkd](http://kr.github.io/beanstalkd/)
queuing server is now available as part of Phalcon:

~~~~ {.sh_php .sh_sourceCode}
<?php

//Connect to the queue
$queue = new Phalcon\Queue\Beanstalk(array(
    'host' => '192.168.0.21'
));

//Insert the job in the queue (simple)
$queue->put(array('proccessVideo' => 4871));

//Insert the job in the queue with options
$queue->put(
    array('proccessVideo' => 4871),
    array('priority' => 250, 'delay' => 10, 'ttr' => 3600)
);

while (($job = $queue->peekReady()) !== false) {

    $message = $job->getBody();

    var_dump($message);

    $job->delete();
}
~~~~

### Encryption

This version includes a simple class to encrypt/decrypt data based on
the PHP’s [mcrypt](http://php.net/manual/en/book.mcrypt.php) library.

~~~~ {.sh_php .sh_sourceCode}
//Create an instance
$encryption = new Phalcon\Crypt();

$key = 'le password';
$text = 'This is a secret text';

$encrypted = $encryption->encrypt($text, $key);

echo $encryption->decrypt($encrypted, $key);
~~~~

### Assets Management

This component eases the task of adding static resources such as CSS
scripts and Javascript libraries to then output them in the views:

~~~~ {.sh_php .sh_sourceCode}
//Add some local CSS resources
$this->assets
    ->addCss('css/style.css')
    ->addCss('css/index.css');

//and some local javascript resources
$this->assets
    ->addJs('js/jquery.js')
    ->addJs('js/bootstrap.min.js');
~~~~

Then in the view:

~~~~ {.sh_php .sh_sourceCode}
<html>
    <head>
        <title>Some amazing website</title>
        <?php $this->assets->outputCss() ?>
    </head>
    <body>

        <!-- ... -->

        <?php $this->assets->outputJs() ?>
    </body>
</html>
~~~~

### Exception mode in ORM Validations

By default, when some of the validators in a creating/updating process
fails, the methods save()/create()/update return ​ ​a boolean
value​stating the success ​or failure ​of this operation. Now, you can
change this behavior to use exceptions:

~~~~ {.sh_php .sh_sourceCode}
use Phalcon\Mvc\Model\ValidationFailed;

try {

    $robot = new Robots();
    $robot->name = 'Bender';
    $robot->save();

} catch (ValidationFailed $e) {
    echo 'Reason: ', $e->getMessage();
}
~~~~

### Hostname routing

Phalcon\\Mvc\\Router now accepts hostname restrictions on their routes

~~~~ {.sh_php .sh_sourceCode}
$router = new Phalcon\Mvc\Router();

$router->addGet('/api/robots', array(
    'module' => 'api',
    'controller' => 'robots',
    'action' => 'index'
))->setHostName('api.phalconphp.com');
~~~~

Or use a group:

~~~~ {.sh_php .sh_sourceCode}
$group = new Phalcon\Mvc\Router();

$group->setHostName('api.phalconphp.com');

$groop->addGet('/api/robots', array(
    'module' => 'api',
    'controller' => 'robots',
    'action' => 'index'
));

$groop->addGet('/api/robots/{id}', array(
    'module' => 'api',
    'controller' => 'robots',
    'action' => 'show'
));

$router->mount($group);
~~~~

### Use Controllers in Mvc\\Micro

To organize better micro applications, now you can set up classes as
controllers

~~~~ {.sh_php .sh_sourceCode}
$collection = new Phalcon\Mvc\Micro\Collection();

//Use direct instantiation
$collection
    ->setPrefix('/posts')
    ->setHandler(new PostsController());

//Lazy instantiation
$collection
    ->setPrefix('/posts')
    ->setHandler('PostsController', true);

$collection->get('/', 'index');

$collection->get('/edit/{id}', 'edit');

$collection->delete('/delete/{id}', 'delete');

$app->mount($collection);
~~~~

1.1.0 includes other minor changes, bug fixes, stability and performance
improvements. You can see the complete
[CHANGELOG](https://github.com/phalcon/cphalcon/blob/1.1.0/CHANGELOG)
here. Check the [documentation](http://docs.phalconphp.com/en/1.1.0/)
for this version

### Help with Testing

This version can be installed from the 1.1.0 branch:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 1.1.0
sudo ./install
~~~~

Windows users can download a DLL from the [download
page](http://phalconphp.com/download).

We welcome your comments regarding this new release in
[Phosphorum](http://forum.phalconphp.com) and [Stack
Overflow](http://stackoverflow.com/questions/tagged/phalcon). If you
discover any bugs, please (if possible) create a failing test and submit
a pull request, alongside with an issue on
[Github](http://github.com/phalcon/cphalcon/).

Thanks!

