<!--
slug: phalcon-0-8-0-alpha-available
date: Sun Dec 16 2012 21:49:00 GMT-0500 (EST)
tags: release, alpha, phalcon, php
title: Phalcon 0.8.0 alpha available
id: 38117434637
link: http://blog.phalconphp.com/post/38117434637/phalcon-0-8-0-alpha-available
raw: {"blog_name":"phalconphp","id":38117434637,"post_url":"http://blog.phalconphp.com/post/38117434637/phalcon-0-8-0-alpha-available","slug":"phalcon-0-8-0-alpha-available","type":"text","date":"2012-12-17 02:49:00 GMT","timestamp":1355712540,"state":"published","format":"html","reblog_key":"zJqCzvOY","tags":["release","alpha","phalcon","php"],"short_url":"http://tmblr.co/Z6PumvZV_UKD","highlighted":[],"note_count":0,"source_url":"http://github.com/phalcon/cphalcon","source_title":"github.com","title":"Phalcon 0.8.0 alpha available","body":"<p>We&rsquo;re happy to announce the last release of this year, 0.8.0 Alpha. This release is a preview of Phalcon&rsquo;s next stable release which will come next year. We decided to release this alpha version, so that you can get acquainted with the new features coming down the line.</p>\n<p>In this article we highlight some of the features implemented:</p>\n<h3>Performance Improvements</h3>\n<p>This version includes more performance improvements, increasing performance while reducing memory usage:</p>\n<h4>Native compilation flags</h4>\n<p>One of the main advantages of a C-extension framework like Phalcon over a traditional PHP framework is the compilation process. Previously when Phalcon was compiled its binary was compatible among many processors in the same processor family. This meant that the same compiled extension could be copied to other machines. To achieve this compatibility we were using a common set of instructions independent of processor family. Although this was a safe way for compiling Phalcon across many processors, it removed the ability to produce greater optimizations according to the target architecture that Phalcon would run.</p>\n<p>Starting from 0.8.0, Phalcon performs a quick pre-compilation check which seeks the best available optimizations according to the processor where it is currently compiling. This means faster and better use of resources.</p>\n<h4>Cache for Function/Method calls</h4>\n<p>Phalcon executes functions/methods in the PHP userland, due to this developers can use tools like <a href=\"http://xdebug.org/\">xdebug</a> or <a href=\"http://php.net/manual/fr/book.xhprof.php\">xhprof</a> to debug or profile your code including the one executed by the framework.</p>\n<p>Every time a method needs to be executed it is first &ldquo;located&rdquo; and then PHP does enters a validation stage where it checks if a class can be called or the method has modifiers like protected/private, the method is not abstract, valid calling scopes, etc. All these validations are good because we want our code to run according to the requirements of PHP. If the same method is executed again, PHP performs the same validation checks again. To combat that, a new cache has been implemented internally which allows the whole process to skip the rediscovery and re-validation process thus improving the performance.</p>\n<h4>Security Component</h4>\n<p>We are introducing a brand new component called Security. This component aids the developer in common security tasks such as password hashing an and Cross-Site Request Forgery protection (<a href=\"http://en.wikipedia.org/wiki/Cross-site_request_forgery\">CSRF</a>).</p>\n<h4>Password Hashing</h4>\n<p>Storing passwords in plain text is a bad security practice. Anyone with access to the database will immediately have access to all user accounts thus being able to engage in unauthorized activities. To combat that, many applications use the familiar one way hashing methods &ldquo;<a href=\"http://php.net/manual/en/function.md5.php\">md5</a>&rdquo; and &ldquo;<a href=\"http://php.net/manual/en/function.md5.php\">sha1</a>&rdquo;. However, hardware evolves each day, and becomes faster, these algorithms are becoming vulnerable to brute force attacks. These attacks are also known as <a href=\"http://en.wikipedia.org/wiki/Rainbow_table\">rainbow tables</a>.</p>\n<p>To solve this problem we can use hash algorithms as <a href=\"http://en.wikipedia.org/wiki/Bcrypt\">bcrypt</a>. Why bcrypt? Thanks to its &ldquo;<a href=\"http://en.wikipedia.org/wiki/Crypt_(Unix)\">Eksblowfish</a>&rdquo; key setup algorithm we could make the password encryption as &ldquo;slow&rdquo; as we want. Slow algorithms make the process to calculate the real password behind a hash extremely difficult if not impossible. This will protect your for a long time from a possible attack with rainbow tables.</p>\n<p>Phalcon gives you the ability to use this algorithm in a simple way:</p>\n<pre class=\"sh_php sh_sourceCode\">class UsersController extends Phalcon\\Mvc\\Controller\n{\n\n    public function register()\n    {\n\n        $user = new Users();\n\n        $login = $this-&gt;request-&gt;getPost('login');\n        $password = $this-&gt;request-&gt;getPost('password');\n\n        $user-&gt;login = $login;\n\n        //Store the password hashed with a work factor of 10\n        $user-&gt;password = $this-&gt;security-&gt;hash($password, 10);\n\n        $user-&gt;save();\n    }\n\n}\n</pre>\n<p>We saved the password hashed with a work factor of 10. A higher work factor will make the password less vulnerable as its encryption will be slow. We can check if the password is correct as follows:</p>\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\n{\n\n    public function login()\n    {\n\n        $login = $this-&gt;request-&gt;getPost('login');\n        $password = $this-&gt;request-&gt;getPost('password');\n\n        $user = Users::findFirst(array(\n            \"login = ?0\",\n            \"bind\" =&gt; array($login)\n        ));\n        if ($user) {\n            if ($this-&gt;security-&gt;checkHash($password, $user-&gt;password)) {\n                //The password is valid\n            }\n        }\n\n        //The validation failed\n    }\n\n}\n</pre>\n<h4>Cross-Site Request Forgery (CSRF) protection</h4>\n<p>This is another common attack against web sites and applications. Forms designed to perform tasks such as user registration or adding comments are vulnerable to this attack.</p>\n<p>The idea is to prevent the form values from being sent outside our application. To fix this we generate a random <a href=\"http://en.wikipedia.org/wiki/Cryptographic_nonce\">nonce</a> (token) in each form, add the token in the session and then validate the token once the form posts data back to our application by comparing the stored token in the session to the one submitted by the form:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;input type=\"hidden\" name=\"&lt;?php echo $this-&gt;security-&gt;getTokenKey() ?&gt;\"\nvalue=\"&lt;?php echo $this-&gt;security-&gt;getToken() ?&gt;\"/&gt;\n</pre>\n<p>Then in your application:</p>\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\n{\n\n    public function login()\n    {\n        if ($this-&gt;request-&gt;isPost()) {\n            if ($this-&gt;security-&gt;checkToken()) {\n                //The token is ok\n            }\n        }\n    }\n\n}\n</pre>\n<p>Adding a captcha is also recommended to completely avoid the risks of this attack.</p>\n<h4>Configuration Improvements</h4>\n<p>New features were added to Phalcon\\Config to ease its usage:</p>\n<pre class=\"sh_php sh_sourceCode\">$config = new Phalcon\\Config(array(\n    'database' =&gt; array(\n        'host' =&gt; 'localhost',\n        'username' =&gt; 'mark',\n        'password' =&gt; 'kaleidoskope'\n    )\n));\n\n//Convert the object to array\n$data = $config-&gt;toArray();\n\n//Getting a value with a result\n$controllersDir = $config-&gt;get('controllersDir', '../controllers/');\n\n//Merge recursively with other object\n$config-&gt;merge($config2);\n\n//Accessing its elements using the array-syntax\necho $config['database']['host'];\n</pre>\n<h3>Volt</h3>\n<p>More features are added to <a href=\"http://docs.phalconphp.com/en/0.8.0/reference/volt.html\">Volt</a> in this version:</p>\n<h4>Cache statement</h4>\n<p>Volt now supports caching fragments natively:</p>\n<pre class=\"sh_php sh_sourceCode\">{# Cache by 500 seconds the sidebar #}\n{% cache sidebar 500 %}\n    &lt;!-- your side bar here --&gt;\n{% endcache %}\n</pre>\n<h4>Service Injection</h4>\n<p>Calling methods from services registered in the DI:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ session.get(\"user-name\" )}}\n</pre>\n<p>the same as:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php echo $this-&gt;session-&gt;get(\"user-name\") ?&gt;\n</pre>\n<h4>Register User Functions</h4>\n<p>Now you can add functions to the Volt compiler or rename the current ones:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt = new Phalcon\\Mvc\\View\\Engine\\Volt();\n\n$volt-&gt;addFunction('markdown', function($arguments) {\n    return 'My\\Markdown\\Component::processText('.$arguments.')';\n});\n</pre>\n<p>Then in your view:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ markdown(\"*Some bold text*\") }}\n</pre>\n<h4>Register User Filters</h4>\n<p>Or adding new filters or rename the current ones:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt-&gt;addFilter('replace', function($arguments) {\n    return 'strtr('.$arguments.')';\n});\n</pre>\n<p>In your view:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ \":greeting:, My name is :name:\"|replace(['greeting': 'Hello', 'name': 'Bob']) }}\n</pre>\n<h4>Multiple Inheritance/Two-way block Replacement</h4>\n<p>Volt now allows that extended templates to extend other templates. Additionally the parent block can be inserted in the extended block. The following example demonstrates this:</p>\n<pre class=\"sh_php sh_sourceCode\">{# a.html #}\n&lt;head&gt;{% block head %}{% endblock %}&lt;/head&gt;\n</pre>\n<pre class=\"sh_php sh_sourceCode\">{# b.html #}\n{% extends 'a.html' %}{% block head %}.parent-style { color: #333; }{% endblock %}\n</pre>\n<pre class=\"sh_php sh_sourceCode\">{# c.html #}\n{% extends 'b.html' %}\n\n{% block head %} &lt;style type=\"text/css\"&gt;.local-style { font-family: Arial; } {{ super() }} &lt;/style&gt;{% endblock %}</pre>\n<p>Compiling c.html produce:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;head&gt; &lt;style type=\"text/css\"&gt;.local-style { font-family: Arial; } .parent-style { color: #333; } &lt;/style&gt;&lt;/head&gt;\n</pre>\n<h4>ORM</h4>\n<p>Some missing features are added to the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in this version:</p>\n<h4>Behaviors</h4>\n<p>Behaviors are shared conducts that several models may adopt in order to re-use code, a well-known is adding a timestamp indicating when a record was created or updated:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Mvc\\Model\\Behaviors\\Timestampable;\n\nclass Users extends \\Phalcon\\Mvc\\Model\n{\n    public $id;\n\n    public $name;\n\n    public $created_at;\n\n    public function initialize()\n    {\n        $this-&gt;addBehavior(new Timestampable(array(\n            'beforeCreate' =&gt; array(\n                'field' =&gt; 'created_at',\n                'format' =&gt; 'Y-m-d'\n            )\n        )));\n    }\n\n}\n</pre>\n<p>Additionally to the built in behaviors you can create your own behaviors as well.</p>\n<h4>Relationship aliasing</h4>\n<p>With this feature you can rename a relationship making your code more readable, have multiple relationships on a table or work easier with namespaces:</p>\n<pre class=\"sh_php sh_sourceCode\">class Users extends \\Phalcon\\Mvc\\Model\n{\n    public $id;\n\n    public $name;\n\n    public $created_at;\n\n    public function initialize()\n    {\n        //This is a many to one relation, but the table is pluralized,\n        //so we add an alias to write more natural code\n        $this-&gt;belongsTo(\n            'profiles_id', 'Store\\Models\\Profiles', 'id', array(\n                'alias' =&gt; 'Profile'\n            )\n        );\n    }\n\n}\n</pre>\n<p>Then you can use:</p>\n<pre class=\"sh_php sh_sourceCode\">$profile = Users::findFirst()-&gt;getProfile();\n</pre>\n<h4>Help to Testing</h4>\n<p>This version can be installed from the 0.8.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 0.8.0\nsudo ./install\n</pre>\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3692718\">Travis</a>, still being an alpha, you should not have major problems with this version. Help us to test and report any bug/problem on <a href=\"http://github.com/phalcon/cphalcon\">github</a></p>\n<p>Complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.8.0/CHANGELOG\">CHANGELOG</a> for this version.</p>\n<p>Check it out and let us know what you think!</p>\n<p>PS: Merry christmas, Happy new year, and thanks for this amazing year!</p>\n<p>&lt;3!</p>","reblog":{"tree_html":"","comment":"<p>We&rsquo;re happy to announce the last release of this year, 0.8.0 Alpha. This release is a preview of Phalcon&rsquo;s next stable release which will come next year. We decided to release this alpha version, so that you can get acquainted with the new features coming down the line.</p>\n<p>In this article we highlight some of the features implemented:</p>\n<h3>Performance Improvements</h3>\n<p>This version includes more performance improvements, increasing performance while reducing memory usage:</p>\n<h4>Native compilation flags</h4>\n<p>One of the main advantages of a C-extension framework like Phalcon over a traditional PHP framework is the compilation process. Previously when Phalcon was compiled its binary was compatible among many processors in the same processor family. This meant that the same compiled extension could be copied to other machines. To achieve this compatibility we were using a common set of instructions independent of processor family. Although this was a safe way for compiling Phalcon across many processors, it removed the ability to produce greater optimizations according to the target architecture that Phalcon would run.</p>\n<p>Starting from 0.8.0, Phalcon performs a quick pre-compilation check which seeks the best available optimizations according to the processor where it is currently compiling. This means faster and better use of resources.</p>\n<h4>Cache for Function/Method calls</h4>\n<p>Phalcon executes functions/methods in the PHP userland, due to this developers can use tools like <a href=\"http://xdebug.org/\">xdebug</a> or <a href=\"http://php.net/manual/fr/book.xhprof.php\">xhprof</a> to debug or profile your code including the one executed by the framework.</p>\n<p>Every time a method needs to be executed it is first &ldquo;located&rdquo; and then PHP does enters a validation stage where it checks if a class can be called or the method has modifiers like protected/private, the method is not abstract, valid calling scopes, etc. All these validations are good because we want our code to run according to the requirements of PHP. If the same method is executed again, PHP performs the same validation checks again. To combat that, a new cache has been implemented internally which allows the whole process to skip the rediscovery and re-validation process thus improving the performance.</p>\n<h4>Security Component</h4>\n<p>We are introducing a brand new component called Security. This component aids the developer in common security tasks such as password hashing an and Cross-Site Request Forgery protection (<a href=\"http://en.wikipedia.org/wiki/Cross-site_request_forgery\">CSRF</a>).</p>\n<h4>Password Hashing</h4>\n<p>Storing passwords in plain text is a bad security practice. Anyone with access to the database will immediately have access to all user accounts thus being able to engage in unauthorized activities. To combat that, many applications use the familiar one way hashing methods &ldquo;<a href=\"http://php.net/manual/en/function.md5.php\">md5</a>&rdquo; and &ldquo;<a href=\"http://php.net/manual/en/function.md5.php\">sha1</a>&rdquo;. However, hardware evolves each day, and becomes faster, these algorithms are becoming vulnerable to brute force attacks. These attacks are also known as <a href=\"http://en.wikipedia.org/wiki/Rainbow_table\">rainbow tables</a>.</p>\n<p>To solve this problem we can use hash algorithms as <a href=\"http://en.wikipedia.org/wiki/Bcrypt\">bcrypt</a>. Why bcrypt? Thanks to its &ldquo;<a href=\"http://en.wikipedia.org/wiki/Crypt_(Unix)\">Eksblowfish</a>&rdquo; key setup algorithm we could make the password encryption as &ldquo;slow&rdquo; as we want. Slow algorithms make the process to calculate the real password behind a hash extremely difficult if not impossible. This will protect your for a long time from a possible attack with rainbow tables.</p>\n<p>Phalcon gives you the ability to use this algorithm in a simple way:</p>\n<pre class=\"sh_php sh_sourceCode\">class UsersController extends Phalcon\\Mvc\\Controller\n{\n\n    public function register()\n    {\n\n        $user = new Users();\n\n        $login = $this-&gt;request-&gt;getPost('login');\n        $password = $this-&gt;request-&gt;getPost('password');\n\n        $user-&gt;login = $login;\n\n        //Store the password hashed with a work factor of 10\n        $user-&gt;password = $this-&gt;security-&gt;hash($password, 10);\n\n        $user-&gt;save();\n    }\n\n}\n</pre>\n<p>We saved the password hashed with a work factor of 10. A higher work factor will make the password less vulnerable as its encryption will be slow. We can check if the password is correct as follows:</p>\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\n{\n\n    public function login()\n    {\n\n        $login = $this-&gt;request-&gt;getPost('login');\n        $password = $this-&gt;request-&gt;getPost('password');\n\n        $user = Users::findFirst(array(\n            \"login = ?0\",\n            \"bind\" =&gt; array($login)\n        ));\n        if ($user) {\n            if ($this-&gt;security-&gt;checkHash($password, $user-&gt;password)) {\n                //The password is valid\n            }\n        }\n\n        //The validation failed\n    }\n\n}\n</pre>\n<h4>Cross-Site Request Forgery (CSRF) protection</h4>\n<p>This is another common attack against web sites and applications. Forms designed to perform tasks such as user registration or adding comments are vulnerable to this attack.</p>\n<p>The idea is to prevent the form values from being sent outside our application. To fix this we generate a random <a href=\"http://en.wikipedia.org/wiki/Cryptographic_nonce\">nonce</a> (token) in each form, add the token in the session and then validate the token once the form posts data back to our application by comparing the stored token in the session to the one submitted by the form:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;input type=\"hidden\" name=\"&lt;?php echo $this-&gt;security-&gt;getTokenKey() ?&gt;\"\nvalue=\"&lt;?php echo $this-&gt;security-&gt;getToken() ?&gt;\"/&gt;\n</pre>\n<p>Then in your application:</p>\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\n{\n\n    public function login()\n    {\n        if ($this-&gt;request-&gt;isPost()) {\n            if ($this-&gt;security-&gt;checkToken()) {\n                //The token is ok\n            }\n        }\n    }\n\n}\n</pre>\n<p>Adding a captcha is also recommended to completely avoid the risks of this attack.</p>\n<h4>Configuration Improvements</h4>\n<p>New features were added to Phalcon\\Config to ease its usage:</p>\n<pre class=\"sh_php sh_sourceCode\">$config = new Phalcon\\Config(array(\n    'database' =&gt; array(\n        'host' =&gt; 'localhost',\n        'username' =&gt; 'mark',\n        'password' =&gt; 'kaleidoskope'\n    )\n));\n\n//Convert the object to array\n$data = $config-&gt;toArray();\n\n//Getting a value with a result\n$controllersDir = $config-&gt;get('controllersDir', '../controllers/');\n\n//Merge recursively with other object\n$config-&gt;merge($config2);\n\n//Accessing its elements using the array-syntax\necho $config['database']['host'];\n</pre>\n<h3>Volt</h3>\n<p>More features are added to <a href=\"http://docs.phalconphp.com/en/0.8.0/reference/volt.html\">Volt</a> in this version:</p>\n<h4>Cache statement</h4>\n<p>Volt now supports caching fragments natively:</p>\n<pre class=\"sh_php sh_sourceCode\">{# Cache by 500 seconds the sidebar #}\n{% cache sidebar 500 %}\n    &lt;!-- your side bar here --&gt;\n{% endcache %}\n</pre>\n<h4>Service Injection</h4>\n<p>Calling methods from services registered in the DI:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ session.get(\"user-name\" )}}\n</pre>\n<p>the same as:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php echo $this-&gt;session-&gt;get(\"user-name\") ?&gt;\n</pre>\n<h4>Register User Functions</h4>\n<p>Now you can add functions to the Volt compiler or rename the current ones:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt = new Phalcon\\Mvc\\View\\Engine\\Volt();\n\n$volt-&gt;addFunction('markdown', function($arguments) {\n    return 'My\\Markdown\\Component::processText('.$arguments.')';\n});\n</pre>\n<p>Then in your view:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ markdown(\"*Some bold text*\") }}\n</pre>\n<h4>Register User Filters</h4>\n<p>Or adding new filters or rename the current ones:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt-&gt;addFilter('replace', function($arguments) {\n    return 'strtr('.$arguments.')';\n});\n</pre>\n<p>In your view:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ \":greeting:, My name is :name:\"|replace(['greeting': 'Hello', 'name': 'Bob']) }}\n</pre>\n<h4>Multiple Inheritance/Two-way block Replacement</h4>\n<p>Volt now allows that extended templates to extend other templates. Additionally the parent block can be inserted in the extended block. The following example demonstrates this:</p>\n<pre class=\"sh_php sh_sourceCode\">{# a.html #}\n&lt;head&gt;{% block head %}{% endblock %}&lt;/head&gt;\n</pre>\n<pre class=\"sh_php sh_sourceCode\">{# b.html #}\n{% extends 'a.html' %}{% block head %}.parent-style { color: #333; }{% endblock %}\n</pre>\n<pre class=\"sh_php sh_sourceCode\">{# c.html #}\n{% extends 'b.html' %}\n\n{% block head %} &lt;style type=\"text/css\"&gt;.local-style { font-family: Arial; } {{ super() }} &lt;/style&gt;{% endblock %}</pre>\n<p>Compiling c.html produce:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;head&gt; &lt;style type=\"text/css\"&gt;.local-style { font-family: Arial; } .parent-style { color: #333; } &lt;/style&gt;&lt;/head&gt;\n</pre>\n<h4>ORM</h4>\n<p>Some missing features are added to the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in this version:</p>\n<h4>Behaviors</h4>\n<p>Behaviors are shared conducts that several models may adopt in order to re-use code, a well-known is adding a timestamp indicating when a record was created or updated:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Mvc\\Model\\Behaviors\\Timestampable;\n\nclass Users extends \\Phalcon\\Mvc\\Model\n{\n    public $id;\n\n    public $name;\n\n    public $created_at;\n\n    public function initialize()\n    {\n        $this-&gt;addBehavior(new Timestampable(array(\n            'beforeCreate' =&gt; array(\n                'field' =&gt; 'created_at',\n                'format' =&gt; 'Y-m-d'\n            )\n        )));\n    }\n\n}\n</pre>\n<p>Additionally to the built in behaviors you can create your own behaviors as well.</p>\n<h4>Relationship aliasing</h4>\n<p>With this feature you can rename a relationship making your code more readable, have multiple relationships on a table or work easier with namespaces:</p>\n<pre class=\"sh_php sh_sourceCode\">class Users extends \\Phalcon\\Mvc\\Model\n{\n    public $id;\n\n    public $name;\n\n    public $created_at;\n\n    public function initialize()\n    {\n        //This is a many to one relation, but the table is pluralized,\n        //so we add an alias to write more natural code\n        $this-&gt;belongsTo(\n            'profiles_id', 'Store\\Models\\Profiles', 'id', array(\n                'alias' =&gt; 'Profile'\n            )\n        );\n    }\n\n}\n</pre>\n<p>Then you can use:</p>\n<pre class=\"sh_php sh_sourceCode\">$profile = Users::findFirst()-&gt;getProfile();\n</pre>\n<h4>Help to Testing</h4>\n<p>This version can be installed from the 0.8.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 0.8.0\nsudo ./install\n</pre>\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3692718\">Travis</a>, still being an alpha, you should not have major problems with this version. Help us to test and report any bug/problem on <a href=\"http://github.com/phalcon/cphalcon\">github</a></p>\n<p>Complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.8.0/CHANGELOG\">CHANGELOG</a>&nbsp;for this version.</p>\n<p>Check it out and let us know what you think!</p>\n<p>PS: Merry&nbsp;christmas, Happy new year, and thanks for this amazing year!</p>\n<p>&lt;3!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"38117434637"},"content":"<p>We're happy to announce the last release of this year, 0.8.0 Alpha. This release is a preview of Phalcon's next stable release which will come next year. We decided to release this alpha version, so that you can get acquainted with the new features coming down the line.</p>\n<p>In this article we highlight some of the features implemented:</p>\n<h3>Performance Improvements</h3>\n<p>This version includes more performance improvements, increasing performance while reducing memory usage:</p>\n<h4>Native compilation flags</h4>\n<p>One of the main advantages of a C-extension framework like Phalcon over a traditional PHP framework is the compilation process. Previously when Phalcon was compiled its binary was compatible among many processors in the same processor family. This meant that the same compiled extension could be copied to other machines. To achieve this compatibility we were using a common set of instructions independent of processor family. Although this was a safe way for compiling Phalcon across many processors, it removed the ability to produce greater optimizations according to the target architecture that Phalcon would run.</p>\n<p>Starting from 0.8.0, Phalcon performs a quick pre-compilation check which seeks the best available optimizations according to the processor where it is currently compiling. This means faster and better use of resources.</p>\n<h4>Cache for Function/Method calls</h4>\n<p>Phalcon executes functions/methods in the PHP userland, due to this developers can use tools like <a href=\"http://xdebug.org/\">xdebug</a> or <a href=\"http://php.net/manual/fr/book.xhprof.php\">xhprof</a> to debug or profile your code including the one executed by the framework.</p>\n<p>Every time a method needs to be executed it is first "located" and then PHP does enters a validation stage where it checks if a class can be called or the method has modifiers like protected/private, the method is not abstract, valid calling scopes, etc. All these validations are good because we want our code to run according to the requirements of PHP. If the same method is executed again, PHP performs the same validation checks again. To combat that, a new cache has been implemented internally which allows the whole process to skip the rediscovery and re-validation process thus improving the performance.</p>\n<h4>Security Component</h4>\n<p>We are introducing a brand new component called Security. This component aids the developer in common security tasks such as password hashing an and Cross-Site Request Forgery protection (<a href=\"http://en.wikipedia.org/wiki/Cross-site_request_forgery\">CSRF</a>).</p>\n<h4>Password Hashing</h4>\n<p>Storing passwords in plain text is a bad security practice. Anyone with access to the database will immediately have access to all user accounts thus being able to engage in unauthorized activities. To combat that, many applications use the familiar one way hashing methods "<a href=\"http://php.net/manual/en/function.md5.php\">md5</a>" and "<a href=\"http://php.net/manual/en/function.md5.php\">sha1</a>". However, hardware evolves each day, and becomes faster, these algorithms are becoming vulnerable to brute force attacks. These attacks are also known as <a href=\"http://en.wikipedia.org/wiki/Rainbow_table\">rainbow tables</a>.</p>\n<p>To solve this problem we can use hash algorithms as <a href=\"http://en.wikipedia.org/wiki/Bcrypt\">bcrypt</a>. Why bcrypt? Thanks to its "<a href=\"http://en.wikipedia.org/wiki/Crypt_(Unix)\">Eksblowfish</a>" key setup algorithm we could make the password encryption as "slow" as we want. Slow algorithms make the process to calculate the real password behind a hash extremely difficult if not impossible. This will protect your for a long time from a possible attack with rainbow tables.</p>\n<p>Phalcon gives you the ability to use this algorithm in a simple way:</p>\n<pre class=\"sh_php sh_sourceCode\">class UsersController extends Phalcon\\Mvc\\Controller\n{\n\n    public function register()\n    {\n\n        $user = new Users();\n\n        $login = $this->request->getPost('login');\n        $password = $this->request->getPost('password');\n\n        $user->login = $login;\n\n        //Store the password hashed with a work factor of 10\n        $user->password = $this->security->hash($password, 10);\n\n        $user->save();\n    }\n\n}\n</pre>\n<p>We saved the password hashed with a work factor of 10. A higher work factor will make the password less vulnerable as its encryption will be slow. We can check if the password is correct as follows:</p>\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\n{\n\n    public function login()\n    {\n\n        $login = $this->request->getPost('login');\n        $password = $this->request->getPost('password');\n\n        $user = Users::findFirst(array(\n            \"login = ?0\",\n            \"bind\" => array($login)\n        ));\n        if ($user) {\n            if ($this->security->checkHash($password, $user->password)) {\n                //The password is valid\n            }\n        }\n\n        //The validation failed\n    }\n\n}\n</pre>\n<h4>Cross-Site Request Forgery (CSRF) protection</h4>\n<p>This is another common attack against web sites and applications. Forms designed to perform tasks such as user registration or adding comments are vulnerable to this attack.</p>\n<p>The idea is to prevent the form values from being sent outside our application. To fix this we generate a random <a href=\"http://en.wikipedia.org/wiki/Cryptographic_nonce\">nonce</a> (token) in each form, add the token in the session and then validate the token once the form posts data back to our application by comparing the stored token in the session to the one submitted by the form:</p>\n<pre class=\"sh_php sh_sourceCode\"><input type=\"hidden\" name=\"<?php echo $this->security->getTokenKey() ?>\"\nvalue=\"<?php echo $this->security->getToken() ?>\"/>\n</pre>\n<p>Then in your application:</p>\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\n{\n\n    public function login()\n    {\n        if ($this->request->isPost()) {\n            if ($this->security->checkToken()) {\n                //The token is ok\n            }\n        }\n    }\n\n}\n</pre>\n<p>Adding a captcha is also recommended to completely avoid the risks of this attack.</p>\n<h4>Configuration Improvements</h4>\n<p>New features were added to Phalcon\\Config to ease its usage:</p>\n<pre class=\"sh_php sh_sourceCode\">$config = new Phalcon\\Config(array(\n    'database' => array(\n        'host' => 'localhost',\n        'username' => 'mark',\n        'password' => 'kaleidoskope'\n    )\n));\n\n//Convert the object to array\n$data = $config->toArray();\n\n//Getting a value with a result\n$controllersDir = $config->get('controllersDir', '../controllers/');\n\n//Merge recursively with other object\n$config->merge($config2);\n\n//Accessing its elements using the array-syntax\necho $config['database']['host'];\n</pre>\n<h3>Volt</h3>\n<p>More features are added to <a href=\"http://docs.phalconphp.com/en/0.8.0/reference/volt.html\">Volt</a> in this version:</p>\n<h4>Cache statement</h4>\n<p>Volt now supports caching fragments natively:</p>\n<pre class=\"sh_php sh_sourceCode\">{# Cache by 500 seconds the sidebar #}\n{% cache sidebar 500 %}\n    <!-- your side bar here -->\n{% endcache %}\n</pre>\n<h4>Service Injection</h4>\n<p>Calling methods from services registered in the DI:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ session.get(\"user-name\" )}}\n</pre>\n<p>the same as:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php echo $this->session->get(\"user-name\") ?>\n</pre>\n<h4>Register User Functions</h4>\n<p>Now you can add functions to the Volt compiler or rename the current ones:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt = new Phalcon\\Mvc\\View\\Engine\\Volt();\n\n$volt->addFunction('markdown', function($arguments) {\n    return 'My\\Markdown\\Component::processText('.$arguments.')';\n});\n</pre>\n<p>Then in your view:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ markdown(\"*Some bold text*\") }}\n</pre>\n<h4>Register User Filters</h4>\n<p>Or adding new filters or rename the current ones:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt->addFilter('replace', function($arguments) {\n    return 'strtr('.$arguments.')';\n});\n</pre>\n<p>In your view:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ \":greeting:, My name is :name:\"|replace(['greeting': 'Hello', 'name': 'Bob']) }}\n</pre>\n<h4>Multiple Inheritance/Two-way block Replacement</h4>\n<p>Volt now allows that extended templates to extend other templates. Additionally the parent block can be inserted in the extended block. The following example demonstrates this:</p>\n<pre class=\"sh_php sh_sourceCode\">{# a.html #}\n<head>{% block head %}{% endblock %}</head>\n</pre>\n<pre class=\"sh_php sh_sourceCode\">{# b.html #}\n{% extends 'a.html' %}{% block head %}.parent-style { color: #333; }{% endblock %}\n</pre>\n<pre class=\"sh_php sh_sourceCode\">{# c.html #}\n{% extends 'b.html' %}\n\n{% block head %} <style type=\"text/css\">.local-style { font-family: Arial; } {{ super() }} </style>{% endblock %}</pre>\n<p>Compiling c.html produce:</p>\n<pre class=\"sh_php sh_sourceCode\"><head> <style type=\"text/css\">.local-style { font-family: Arial; } .parent-style { color: #333; } </style></head>\n</pre>\n<h4>ORM</h4>\n<p>Some missing features are added to the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in this version:</p>\n<h4>Behaviors</h4>\n<p>Behaviors are shared conducts that several models may adopt in order to re-use code, a well-known is adding a timestamp indicating when a record was created or updated:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nuse Phalcon\\Mvc\\Model\\Behaviors\\Timestampable;\n\nclass Users extends \\Phalcon\\Mvc\\Model\n{\n    public $id;\n\n    public $name;\n\n    public $created_at;\n\n    public function initialize()\n    {\n        $this->addBehavior(new Timestampable(array(\n            'beforeCreate' => array(\n                'field' => 'created_at',\n                'format' => 'Y-m-d'\n            )\n        )));\n    }\n\n}\n</pre>\n<p>Additionally to the built in behaviors you can create your own behaviors as well.</p>\n<h4>Relationship aliasing</h4>\n<p>With this feature you can rename a relationship making your code more readable, have multiple relationships on a table or work easier with namespaces:</p>\n<pre class=\"sh_php sh_sourceCode\">class Users extends \\Phalcon\\Mvc\\Model\n{\n    public $id;\n\n    public $name;\n\n    public $created_at;\n\n    public function initialize()\n    {\n        //This is a many to one relation, but the table is pluralized,\n        //so we add an alias to write more natural code\n        $this->belongsTo(\n            'profiles_id', 'Store\\Models\\Profiles', 'id', array(\n                'alias' => 'Profile'\n            )\n        );\n    }\n\n}\n</pre>\n<p>Then you can use:</p>\n<pre class=\"sh_php sh_sourceCode\">$profile = Users::findFirst()->getProfile();\n</pre>\n<h4>Help to Testing</h4>\n<p>This version can be installed from the 0.8.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 0.8.0\nsudo ./install\n</pre>\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3692718\">Travis</a>, still being an alpha, you should not have major problems with this version. Help us to test and report any bug/problem on <a href=\"http://github.com/phalcon/cphalcon\">github</a></p>\n<p>Complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.8.0/CHANGELOG\">CHANGELOG</a> for this version.</p>\n<p>Check it out and let us know what you think!</p>\n<p>PS: Merry christmas, Happy new year, and thanks for this amazing year!</p>\n<p><3!</p>","content_raw":"<p>We're happy to announce the last release of this year, 0.8.0 Alpha. This release is a preview of Phalcon's next stable release which will come next year. We decided to release this alpha version, so that you can get acquainted with the new features coming down the line.</p>\r\n<p>In this article we highlight some of the features implemented:</p>\r\n<h3>Performance Improvements</h3>\r\n<p>This version includes more performance improvements, increasing performance while reducing memory usage:</p>\r\n<h4>Native compilation flags</h4>\r\n<p>One of the main advantages of a C-extension framework like Phalcon over a traditional PHP framework is the compilation process. Previously when Phalcon was compiled its binary was compatible among many processors in the same processor family. This meant that the same compiled extension could be copied to other machines. To achieve this compatibility we were using a common set of instructions independent of processor family. Although this was a safe way for compiling Phalcon across many processors, it removed the ability to produce greater optimizations according to the target architecture that Phalcon would run.</p>\r\n<p>Starting from 0.8.0, Phalcon performs a quick pre-compilation check which seeks the best available optimizations according to the processor where it is currently compiling. This means faster and better use of resources.</p>\r\n<h4>Cache for Function/Method calls</h4>\r\n<p>Phalcon executes functions/methods in the PHP userland, due to this developers can use tools like <a href=\"http://xdebug.org/\">xdebug</a> or <a href=\"http://php.net/manual/fr/book.xhprof.php\">xhprof</a> to debug or profile your code including the one executed by the framework.</p>\r\n<p>Every time a method needs to be executed it is first \"located\" and then PHP does enters a validation stage where it checks if a class can be called or the method has modifiers like protected/private, the method is not abstract, valid calling scopes, etc. All these validations are good because we want our code to run according to the requirements of PHP. If the same method is executed again, PHP performs the same validation checks again. To combat that, a new cache has been implemented internally which allows the whole process to skip the rediscovery and re-validation process thus improving the performance.</p>\r\n<h4>Security Component</h4>\r\n<p>We are introducing a brand new component called Security. This component aids the developer in common security tasks such as password hashing an and Cross-Site Request Forgery protection (<a href=\"http://en.wikipedia.org/wiki/Cross-site_request_forgery\">CSRF</a>).</p>\r\n<h4>Password Hashing</h4>\r\n<p>Storing passwords in plain text is a bad security practice. Anyone with access to the database will immediately have access to all user accounts thus being able to engage in unauthorized activities. To combat that, many applications use the familiar one way hashing methods \"<a href=\"http://php.net/manual/en/function.md5.php\">md5</a>\" and \"<a href=\"http://php.net/manual/en/function.md5.php\">sha1</a>\". However, hardware evolves each day, and becomes faster, these algorithms are becoming vulnerable to brute force attacks. These attacks are also known as <a href=\"http://en.wikipedia.org/wiki/Rainbow_table\">rainbow tables</a>.</p>\r\n<p>To solve this problem we can use hash algorithms as <a href=\"http://en.wikipedia.org/wiki/Bcrypt\">bcrypt</a>. Why bcrypt? Thanks to its \"<a href=\"http://en.wikipedia.org/wiki/Crypt_(Unix)\">Eksblowfish</a>\" key setup algorithm we could make the password encryption as \"slow\" as we want. Slow algorithms make the process to calculate the real password behind a hash extremely difficult if not impossible. This will protect your for a long time from a possible attack with rainbow tables.</p>\r\n<p>Phalcon gives you the ability to use this algorithm in a simple way:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class UsersController extends Phalcon\\Mvc\\Controller\r\n{\r\n\r\n    public function register()\r\n    {\r\n\r\n        $user = new Users();\r\n\r\n        $login = $this-&gt;request-&gt;getPost('login');\r\n        $password = $this-&gt;request-&gt;getPost('password');\r\n\r\n        $user-&gt;login = $login;\r\n\r\n        //Store the password hashed with a work factor of 10\r\n        $user-&gt;password = $this-&gt;security-&gt;hash($password, 10);\r\n\r\n        $user-&gt;save();\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>We saved the password hashed with a work factor of 10. A higher work factor will make the password less vulnerable as its encryption will be slow. We can check if the password is correct as follows:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\r\n{\r\n\r\n    public function login()\r\n    {\r\n\r\n        $login = $this-&gt;request-&gt;getPost('login');\r\n        $password = $this-&gt;request-&gt;getPost('password');\r\n\r\n        $user = Users::findFirst(array(\r\n            \"login = ?0\",\r\n            \"bind\" =&gt; array($login)\r\n        ));\r\n        if ($user) {\r\n            if ($this-&gt;security-&gt;checkHash($password, $user-&gt;password)) {\r\n                //The password is valid\r\n            }\r\n        }\r\n\r\n        //The validation failed\r\n    }\r\n\r\n}\r\n</pre>\r\n<h4>Cross-Site Request Forgery (CSRF) protection</h4>\r\n<p>This is another common attack against web sites and applications. Forms designed to perform tasks such as user registration or adding comments are vulnerable to this attack.</p>\r\n<p>The idea is to prevent the form values from being sent outside our application. To fix this we generate a random <a href=\"http://en.wikipedia.org/wiki/Cryptographic_nonce\">nonce</a> (token) in each form, add the token in the session and then validate the token once the form posts data back to our application by comparing the stored token in the session to the one submitted by the form:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;input type=\"hidden\" name=\"&lt;?php echo $this-&gt;security-&gt;getTokenKey() ?&gt;\"\r\nvalue=\"&lt;?php echo $this-&gt;security-&gt;getToken() ?&gt;\"/&gt;\r\n</pre>\r\n<p>Then in your application:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class SessionController extends Phalcon\\Mvc\\Controller\r\n{\r\n\r\n    public function login()\r\n    {\r\n        if ($this-&gt;request-&gt;isPost()) {\r\n            if ($this-&gt;security-&gt;checkToken()) {\r\n                //The token is ok\r\n            }\r\n        }\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Adding a captcha is also recommended to completely avoid the risks of this attack.</p>\r\n<h4>Configuration Improvements</h4>\r\n<p>New features were added to Phalcon\\Config to ease its usage:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$config = new Phalcon\\Config(array(\r\n    'database' =&gt; array(\r\n        'host' =&gt; 'localhost',\r\n        'username' =&gt; 'mark',\r\n        'password' =&gt; 'kaleidoskope'\r\n    )\r\n));\r\n\r\n//Convert the object to array\r\n$data = $config-&gt;toArray();\r\n\r\n//Getting a value with a result\r\n$controllersDir = $config-&gt;get('controllersDir', '../controllers/');\r\n\r\n//Merge recursively with other object\r\n$config-&gt;merge($config2);\r\n\r\n//Accessing its elements using the array-syntax\r\necho $config['database']['host'];\r\n</pre>\r\n<h3>Volt</h3>\r\n<p>More features are added to <a href=\"http://docs.phalconphp.com/en/0.8.0/reference/volt.html\">Volt</a> in this version:</p>\r\n<h4>Cache statement</h4>\r\n<p>Volt now supports caching fragments natively:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{# Cache by 500 seconds the sidebar #}\r\n{% cache sidebar 500 %}\r\n    &lt;!-- your side bar here --&gt;\r\n{% endcache %}\r\n</pre>\r\n<h4>Service Injection</h4>\r\n<p>Calling methods from services registered in the DI:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{{ session.get(\"user-name\" )}}\r\n</pre>\r\n<p>the same as:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php echo $this-&gt;session-&gt;get(\"user-name\") ?&gt;\r\n</pre>\r\n<h4>Register User Functions</h4>\r\n<p>Now you can add functions to the Volt compiler or rename the current ones:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$volt = new Phalcon\\Mvc\\View\\Engine\\Volt();\r\n\r\n$volt-&gt;addFunction('markdown', function($arguments) {\r\n    return 'My\\Markdown\\Component::processText('.$arguments.')';\r\n});\r\n</pre>\r\n<p>Then in your view:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{{ markdown(\"*Some bold text*\") }}\r\n</pre>\r\n<h4>Register User Filters</h4>\r\n<p>Or adding new filters or rename the current ones:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$volt-&gt;addFilter('replace', function($arguments) {\r\n    return 'strtr('.$arguments.')';\r\n});\r\n</pre>\r\n<p>In your view:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{{ \":greeting:, My name is :name:\"|replace(['greeting': 'Hello', 'name': 'Bob']) }}\r\n</pre>\r\n<h4>Multiple Inheritance/Two-way block Replacement</h4>\r\n<p>Volt now allows that extended templates to extend other templates. Additionally the parent block can be inserted in the extended block. The following example demonstrates this:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{# a.html #}\r\n&lt;head&gt;{% block head %}{% endblock %}&lt;/head&gt;\r\n</pre>\r\n<pre class=\"sh_php sh_sourceCode\">{# b.html #}\r\n{% extends 'a.html' %}{% block head %}.parent-style { color: #333; }{% endblock %}\r\n</pre>\r\n<pre class=\"sh_php sh_sourceCode\">{# c.html #}\r\n{% extends 'b.html' %}\r\n\r\n{% block head %} &lt;style type=\"text/css\"&gt;.local-style { font-family: Arial; } {{ super() }} &lt;/style&gt;{% endblock %}</pre>\r\n<p>Compiling c.html produce:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;head&gt; &lt;style type=\"text/css\"&gt;.local-style { font-family: Arial; } .parent-style { color: #333; } &lt;/style&gt;&lt;/head&gt;\r\n</pre>\r\n<h4>ORM</h4>\r\n<p>Some missing features are added to the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in this version:</p>\r\n<h4>Behaviors</h4>\r\n<p>Behaviors are shared conducts that several models may adopt in order to re-use code, a well-known is adding a timestamp indicating when a record was created or updated:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nuse Phalcon\\Mvc\\Model\\Behaviors\\Timestampable;\r\n\r\nclass Users extends \\Phalcon\\Mvc\\Model\r\n{\r\n    public $id;\r\n\r\n    public $name;\r\n\r\n    public $created_at;\r\n\r\n    public function initialize()\r\n    {\r\n        $this-&gt;addBehavior(new Timestampable(array(\r\n            'beforeCreate' =&gt; array(\r\n                'field' =&gt; 'created_at',\r\n                'format' =&gt; 'Y-m-d'\r\n            )\r\n        )));\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Additionally to the built in behaviors you can create your own behaviors as well.</p>\r\n<h4>Relationship aliasing</h4>\r\n<p>With this feature you can rename a relationship making your code more readable, have multiple relationships on a table or work easier with namespaces:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Users extends \\Phalcon\\Mvc\\Model\r\n{\r\n    public $id;\r\n\r\n    public $name;\r\n\r\n    public $created_at;\r\n\r\n    public function initialize()\r\n    {\r\n        //This is a many to one relation, but the table is pluralized,\r\n        //so we add an alias to write more natural code\r\n        $this-&gt;belongsTo(\r\n            'profiles_id', 'Store\\Models\\Profiles', 'id', array(\r\n                'alias' =&gt; 'Profile'\r\n            )\r\n        );\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Then you can use:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$profile = Users::findFirst()-&gt;getProfile();\r\n</pre>\r\n<h4>Help to Testing</h4>\r\n<p>This version can be installed from the 0.8.0 branch:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone http://github.com/phalcon/cphalcon\r\ncd build\r\ngit checkout 0.8.0\r\nsudo ./install\r\n</pre>\r\n<p>All tests are passing on <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/3692718\">Travis</a>, still being an alpha, you should not have major problems with this version. Help us to test and report any bug/problem on <a href=\"http://github.com/phalcon/cphalcon\">github</a></p>\r\n<p>Complete <a href=\"https://github.com/phalcon/cphalcon/blob/0.8.0/CHANGELOG\">CHANGELOG</a>&nbsp;for this version.</p>\r\n<p>Check it out and let us know what you think!</p>\r\n<p>PS: Merry&nbsp;christmas, Happy new year, and thanks for this amazing year!</p>\r\n<p>&lt;3!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-12-016
-->


Phalcon 0.8.0 alpha available
=============================

We're happy to announce the last release of this year, 0.8.0 Alpha. This
release is a preview of Phalcon's next stable release which will come
next year. We decided to release this alpha version, so that you can get
acquainted with the new features coming down the line.

In this article we highlight some of the features implemented:

### Performance Improvements

This version includes more performance improvements, increasing
performance while reducing memory usage:

#### Native compilation flags

One of the main advantages of a C-extension framework like Phalcon over
a traditional PHP framework is the compilation process. Previously when
Phalcon was compiled its binary was compatible among many processors in
the same processor family. This meant that the same compiled extension
could be copied to other machines. To achieve this compatibility we were
using a common set of instructions independent of processor family.
Although this was a safe way for compiling Phalcon across many
processors, it removed the ability to produce greater optimizations
according to the target architecture that Phalcon would run.

Starting from 0.8.0, Phalcon performs a quick pre-compilation check
which seeks the best available optimizations according to the processor
where it is currently compiling. This means faster and better use of
resources.

#### Cache for Function/Method calls

Phalcon executes functions/methods in the PHP userland, due to this
developers can use tools like [xdebug](http://xdebug.org/) or
[xhprof](http://php.net/manual/fr/book.xhprof.php) to debug or profile
your code including the one executed by the framework.

Every time a method needs to be executed it is first "located" and then
PHP does enters a validation stage where it checks if a class can be
called or the method has modifiers like protected/private, the method is
not abstract, valid calling scopes, etc. All these validations are good
because we want our code to run according to the requirements of PHP. If
the same method is executed again, PHP performs the same validation
checks again. To combat that, a new cache has been implemented
internally which allows the whole process to skip the rediscovery and
re-validation process thus improving the performance.

#### Security Component

We are introducing a brand new component called Security. This component
aids the developer in common security tasks such as password hashing an
and Cross-Site Request Forgery protection
([CSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)).

#### Password Hashing

Storing passwords in plain text is a bad security practice. Anyone with
access to the database will immediately have access to all user accounts
thus being able to engage in unauthorized activities. To combat that,
many applications use the familiar one way hashing methods
"[md5](http://php.net/manual/en/function.md5.php)" and
"[sha1](http://php.net/manual/en/function.md5.php)". However, hardware
evolves each day, and becomes faster, these algorithms are becoming
vulnerable to brute force attacks. These attacks are also known as
[rainbow tables](http://en.wikipedia.org/wiki/Rainbow_table).

To solve this problem we can use hash algorithms as
[bcrypt](http://en.wikipedia.org/wiki/Bcrypt). Why bcrypt? Thanks to its
"[Eksblowfish](http://en.wikipedia.org/wiki/Crypt_(Unix))" key setup
algorithm we could make the password encryption as "slow" as we want.
Slow algorithms make the process to calculate the real password behind a
hash extremely difficult if not impossible. This will protect your for a
long time from a possible attack with rainbow tables.

Phalcon gives you the ability to use this algorithm in a simple way:

~~~~ {.sh_php .sh_sourceCode}
class UsersController extends Phalcon\Mvc\Controller
{

    public function register()
    {

        $user = new Users();

        $login = $this->request->getPost('login');
        $password = $this->request->getPost('password');

        $user->login = $login;

        //Store the password hashed with a work factor of 10
        $user->password = $this->security->hash($password, 10);

        $user->save();
    }

}
~~~~

We saved the password hashed with a work factor of 10. A higher work
factor will make the password less vulnerable as its encryption will be
slow. We can check if the password is correct as follows:

~~~~ {.sh_php .sh_sourceCode}
class SessionController extends Phalcon\Mvc\Controller
{

    public function login()
    {

        $login = $this->request->getPost('login');
        $password = $this->request->getPost('password');

        $user = Users::findFirst(array(
            "login = ?0",
            "bind" => array($login)
        ));
        if ($user) {
            if ($this->security->checkHash($password, $user->password)) {
                //The password is valid
            }
        }

        //The validation failed
    }

}
~~~~

#### Cross-Site Request Forgery (CSRF) protection

This is another common attack against web sites and applications. Forms
designed to perform tasks such as user registration or adding comments
are vulnerable to this attack.

The idea is to prevent the form values from being sent outside our
application. To fix this we generate a random
[nonce](http://en.wikipedia.org/wiki/Cryptographic_nonce) (token) in
each form, add the token in the session and then validate the token once
the form posts data back to our application by comparing the stored
token in the session to the one submitted by the form:

~~~~ {.sh_php .sh_sourceCode}
<input type="hidden" name="<?php echo $this->security->getTokenKey() ?>"
value="<?php echo $this->security->getToken() ?>"/>
~~~~

Then in your application:

~~~~ {.sh_php .sh_sourceCode}
class SessionController extends Phalcon\Mvc\Controller
{

    public function login()
    {
        if ($this->request->isPost()) {
            if ($this->security->checkToken()) {
                //The token is ok
            }
        }
    }

}
~~~~

Adding a captcha is also recommended to completely avoid the risks of
this attack.

#### Configuration Improvements

New features were added to Phalcon\\Config to ease its usage:

~~~~ {.sh_php .sh_sourceCode}
$config = new Phalcon\Config(array(
    'database' => array(
        'host' => 'localhost',
        'username' => 'mark',
        'password' => 'kaleidoskope'
    )
));

//Convert the object to array
$data = $config->toArray();

//Getting a value with a result
$controllersDir = $config->get('controllersDir', '../controllers/');

//Merge recursively with other object
$config->merge($config2);

//Accessing its elements using the array-syntax
echo $config['database']['host'];
~~~~

### Volt

More features are added to
[Volt](http://docs.phalconphp.com/en/0.8.0/reference/volt.html) in this
version:

#### Cache statement

Volt now supports caching fragments natively:

~~~~ {.sh_php .sh_sourceCode}
{# Cache by 500 seconds the sidebar #}
{% cache sidebar 500 %}
    <!-- your side bar here -->
{% endcache %}
~~~~

#### Service Injection

Calling methods from services registered in the DI:

~~~~ {.sh_php .sh_sourceCode}
{{ session.get("user-name" )}}
~~~~

the same as:

~~~~ {.sh_php .sh_sourceCode}
<?php echo $this->session->get("user-name") ?>
~~~~

#### Register User Functions

Now you can add functions to the Volt compiler or rename the current
ones:

~~~~ {.sh_php .sh_sourceCode}
$volt = new Phalcon\Mvc\View\Engine\Volt();

$volt->addFunction('markdown', function($arguments) {
    return 'My\Markdown\Component::processText('.$arguments.')';
});
~~~~

Then in your view:

~~~~ {.sh_php .sh_sourceCode}
{{ markdown("*Some bold text*") }}
~~~~

#### Register User Filters

Or adding new filters or rename the current ones:

~~~~ {.sh_php .sh_sourceCode}
$volt->addFilter('replace', function($arguments) {
    return 'strtr('.$arguments.')';
});
~~~~

In your view:

~~~~ {.sh_php .sh_sourceCode}
{{ ":greeting:, My name is :name:"|replace(['greeting': 'Hello', 'name': 'Bob']) }}
~~~~

#### Multiple Inheritance/Two-way block Replacement

Volt now allows that extended templates to extend other templates.
Additionally the parent block can be inserted in the extended block. The
following example demonstrates this:

~~~~ {.sh_php .sh_sourceCode}
{# a.html #}
<head>{% block head %}{% endblock %}</head>
~~~~

~~~~ {.sh_php .sh_sourceCode}
{# b.html #}
{% extends 'a.html' %}{% block head %}.parent-style { color: #333; }{% endblock %}
~~~~

~~~~ {.sh_php .sh_sourceCode}
{# c.html #}
{% extends 'b.html' %}

{% block head %} <style type="text/css">.local-style { font-family: Arial; } {{ super() }} </style>{% endblock %}
~~~~

Compiling c.html produce:

~~~~ {.sh_php .sh_sourceCode}
<head> <style type="text/css">.local-style { font-family: Arial; } .parent-style { color: #333; } </style></head>
~~~~

#### ORM

Some missing features are added to the
[ORM](http://docs.phalconphp.com/en/latest/reference/models.html) in
this version:

#### Behaviors

Behaviors are shared conducts that several models may adopt in order to
re-use code, a well-known is adding a timestamp indicating when a record
was created or updated:

~~~~ {.sh_php .sh_sourceCode}
<?php

use Phalcon\Mvc\Model\Behaviors\Timestampable;

class Users extends \Phalcon\Mvc\Model
{
    public $id;

    public $name;

    public $created_at;

    public function initialize()
    {
        $this->addBehavior(new Timestampable(array(
            'beforeCreate' => array(
                'field' => 'created_at',
                'format' => 'Y-m-d'
            )
        )));
    }

}
~~~~

Additionally to the built in behaviors you can create your own behaviors
as well.

#### Relationship aliasing

With this feature you can rename a relationship making your code more
readable, have multiple relationships on a table or work easier with
namespaces:

~~~~ {.sh_php .sh_sourceCode}
class Users extends \Phalcon\Mvc\Model
{
    public $id;

    public $name;

    public $created_at;

    public function initialize()
    {
        //This is a many to one relation, but the table is pluralized,
        //so we add an alias to write more natural code
        $this->belongsTo(
            'profiles_id', 'Store\Models\Profiles', 'id', array(
                'alias' => 'Profile'
            )
        );
    }

}
~~~~

Then you can use:

~~~~ {.sh_php .sh_sourceCode}
$profile = Users::findFirst()->getProfile();
~~~~

#### Help to Testing

This version can be installed from the 0.8.0 branch:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 0.8.0
sudo ./install
~~~~

All tests are passing on
[Travis](https://travis-ci.org/phalcon/cphalcon/builds/3692718), still
being an alpha, you should not have major problems with this version.
Help us to test and report any bug/problem on
[github](http://github.com/phalcon/cphalcon)

Complete
[CHANGELOG](https://github.com/phalcon/cphalcon/blob/0.8.0/CHANGELOG) for
this version.

Check it out and let us know what you think!

PS: Merry christmas, Happy new year, and thanks for this amazing year!

\<3!

