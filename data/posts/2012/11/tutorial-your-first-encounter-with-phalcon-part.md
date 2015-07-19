<!--
slug: tutorial-your-first-encounter-with-phalcon-part
date: Mon Nov 26 2012 23:42:00 GMT-0500 (EST)
tags: tutorial, php, phalcon
title: Tutorial: your first encounter with Phalcon / Part 1
id: 36646589046
link: http://blog.phalconphp.com/post/36646589046/tutorial-your-first-encounter-with-phalcon-part
raw: {"blog_name":"phalconphp","id":36646589046,"post_url":"http://blog.phalconphp.com/post/36646589046/tutorial-your-first-encounter-with-phalcon-part","slug":"tutorial-your-first-encounter-with-phalcon-part","type":"text","date":"2012-11-27 04:42:00 GMT","timestamp":1353991320,"state":"published","format":"html","reblog_key":"aTP7twcP","tags":["tutorial","php","phalcon"],"short_url":"http://tmblr.co/Z6PumvY8Jf9s","highlighted":[],"note_count":3,"title":"Tutorial: your first encounter with Phalcon / Part 1","body":"<div class=\"highlightb\">Our friend <a href=\"https://twitter.com/mailopl\">Marcin @mailopl</a> from Poland sent us this amazing tutorial and introduction to Phalcon. Enjoy it!</div>\n<h3>Foreword</h3>\n<p>This tutorial was going to be published on <a href=\"http://net.tutsplus.com/\">net.tutsplus.com</a> but that process took more than 2 months and finally due to no response I decided to publish it on Phalcon&rsquo;s blog.</p>\n<p>In this tutorial I&rsquo;ll explain what Phalcon framework is, how to install, configure and use it. I will also walk you through a process of creating very simple blog system.</p>\n<p><em>Tutorial Details</em></p>\n<ul><li>Program: Phalcon PHP Framework</li>\n<li>Version (if applicable): <a href=\"https://phalconphp.com/download\">0.7.x</a></li>\n<li>Difficulty: easy</li>\n<li>Estimated Completion Time: 2h</li>\n</ul><h3>Introduction</h3>\n<h4>Requirements</h4>\n<p>In the following tutorial I am going to assume that you are familiar with:</p>\n<ul><li>MySQL - you know how to create a database, and tables; what a schema is and how to fetch and store information</li>\n<li>PHP - how to write and execute an application (i.e. not a single script)</li>\n<li>Apache-PHP-MySQL interaction</li>\n<li>OOP techniques in PHP</li>\n</ul><h4>What is Phalcon - MVC in C</h4>\n<p>Phalcon is a very recent framework on the market developed by the group of enthusiastic developers. In contrast to traditional frameworks which are written in PHP - Phalcon is a C extension to PHP interpreter itself. It means that its code doesn't have to be interpreted on every request by PHP - it's loaded only once, when server is booted (restarted) or reloaded.</p>\n<p>Phalcon is also a full stack framework, which means you just need a minimal amount of code to take advantage of available components, which cover many typical use cases. There is nothing stopping you from using only certain Phalcon&rsquo;s components (classes) on their own, for example if you just need <a href=\"https://docs.phalconphp.com/en/latest/reference/cache.html\">Phalcon's Cache component</a>, you can use it in any application written in either pure PHP or using a framework.</p>\n<p>Following image demonstrates message flow during typical request when employing <a href=\"http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller\">MVC</a> pattern, which is the preferred way to develop Phalcon applications. I won&rsquo;t go into details describing this scheme.</p>\n<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/mvc-c.png\"/></div>\n<h3>What makes Phalcon special</h3>\n<h4>Performance</h4>\n<p>Phalcon performance is clearly distinguishable from standard PHP frameworks. In terms of performance it is only fair to compare Phalcon to the other C-written frameworks. Still, to get at least a feeling for the level of performance check its benchmarks <a href=\"https://docs.phalconphp.com/en/latest/reference/benchmark.html\">here</a>.</p>\n<p>Bear in mind, that the goal of this minimal overhead benchmark is not to start another "benchmark" war. It demonstrates &ldquo;base level&rdquo; of performance that each framework provides and shows the difference between compiled and interpreted code.</p>\n<p>You can squeeze more performance from PHP frameworks by tuning and picking them apart, but it requires time, effort and (more often than not) advanced skills.</p>\n<h4>C-language ORM</h4>\n<p>Phalcon is the first PHP framework to implement a <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in pure C. The consequence of this fact is improved performance, when compared to typical ORMs.</p>\n<p>Since ORM is a key component of so many applications and is used so extensively, any positive changes to performance have a noticeable effect.</p>\n<p>In short, Phalcon's ORM allows you to do things like:</p>\n<p>Find all users and first user with active state:</p>\n<pre class=\"sh_php sh_sourceCode\">$users = Users::find();\n$user = Users::findFirst(‘state = ' . User::STATE_ACTIVE); \n</pre>\n<p>Count users and the user posts:</p>\n<pre class=\"sh_php sh_sourceCode\">echo Users::count(); \necho $user-&gt;countPosts(); \n</pre>\n<p>Retrieve user posts:</p>\n<pre class=\"sh_php sh_sourceCode\">$userPosts = $user-&gt;getPosts(); \n</pre>\n<p>Retrieve average user age:</p>\n<pre class=\"sh_php sh_sourceCode\">echo Users::average(array(\"column\" =&gt; \"age\")); //get average user age\n</pre>\n<p>Create user with appropriate login, security key and password hash:</p>\n<pre class=\"sh_php sh_sourceCode\">//...\n$salt = '<span class=\"s1\">$2a$</span>#$#DwaxE59';\n//...\n$user = new Users;  //creates ORM instance of Users model\n$user-&gt;login = \"Steve\";\n$user-&gt;password = crypt($myPassword . $salt); \n$user-&gt;save();\n</pre>\n<p>It is not uncommon (and quite convenient) to directly query your models inside views:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php foreach(Posts::find(\"active = 'Yes'\") as $post){ ?&gt;\n    &lt;?= $post-&gt;title ?&gt;\n&lt;?php } ?&gt;\n</pre>\n<h4>Developer tools</h4>\n<p><a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html\">Phalcon developer tools</a> allow you to generate boilerplate code and jump straight to implementation of your application&rsquo;s logic.</p>\n<p>They can generate any element of MVC triad separately – model, view or controller, or create scaffolding (complete code for managing records in the database) which is very efficient way to have running prototype.</p>\n<p>They can also generate skeleton of your project, or even employ <a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html#scaffold-with-twitter-bootstrap\">twitter bootstrap</a> for nice looking prototypes. If you are not a command line ninja, you can use web interface (both console tools and their web counterparts are provided).</p>\n<h4>Code Completion</h4>\n<p>You may think that since Phalcon is a C framework, it's not possible to provide code completion for your favorite IDE.</p>\n<p>Luckily, that's not the case. Code completion is handled the same way as it is for PHP functions, using <a href=\"https://github.com/phalcon/phalcon-devtools/tree/master/ide/phpstorm\">stub files</a>.</p>\n<h3>Summary</h3>\n<p>So far you&rsquo;ve learned that Phalcon brings performance, convenient migrations and easy to use developer tools. Now let us give it a go, and write some &ldquo;real&rdquo; application using Phalcon. In the <a href=\"http://blog.phalconphp.com/post/36648855158/tutorial-your-first-encounter-with-phalcon-part-2\">second part</a> I&rsquo;m going to walk through a process of creating a simple web application – blog.</p>","reblog":{"tree_html":"","comment":"<div class=\"highlightb\">Our friend <a href=\"https://twitter.com/mailopl\">Marcin @mailopl</a> from Poland sent us this amazing tutorial and introduction to Phalcon. Enjoy it!</div>\n<h3>Foreword</h3>\n<p>This tutorial was going to be published on <a href=\"http://net.tutsplus.com/\">net.tutsplus.com</a> but that process took more than 2 months and finally due to no response I decided to publish it on Phalcon&rsquo;s blog.</p>\n<p>In this tutorial I&rsquo;ll explain what Phalcon framework is, how to install, configure and use it. I will also walk you through a process of creating very simple blog system.</p>\n<p><em>Tutorial Details</em></p>\n<ul><li>Program: Phalcon PHP Framework</li>\n<li>Version (if applicable): <a href=\"https://phalconphp.com/download\">0.7.x</a></li>\n<li>Difficulty: easy</li>\n<li>Estimated Completion Time: 2h</li>\n</ul><h3>Introduction</h3>\n<h4>Requirements</h4>\n<p>In the following tutorial I am going to assume that you are familiar with:</p>\n<ul><li>MySQL - you know how to create a database, and tables; what a schema is and how to fetch and store information</li>\n<li>PHP - how to write and execute an application (i.e. not a single script)</li>\n<li>Apache-PHP-MySQL interaction</li>\n<li>OOP techniques in PHP</li>\n</ul><h4>What is Phalcon - MVC in C</h4>\n<p>Phalcon is a very recent framework on the market developed by the group of enthusiastic developers. In contrast to traditional frameworks which are written in PHP - Phalcon is a C extension to PHP interpreter itself. It means that its code doesn&rsquo;t have to be interpreted on every request by PHP - it&rsquo;s loaded only once, when server is booted (restarted) or reloaded.</p>\n<p>Phalcon is also a full stack framework, which means you just need a minimal amount of code to take advantage of available components, which cover many typical use cases. There is nothing stopping you from using only certain Phalcon&rsquo;s components (classes) on their own, for example if you just need <a href=\"https://docs.phalconphp.com/en/latest/reference/cache.html\">Phalcon&rsquo;s Cache component</a>, you can use it in any application written in either pure PHP or using a framework.</p>\n<p>Following image demonstrates message flow during typical request when employing <a href=\"http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller\">MVC</a> pattern, which is the preferred way to develop Phalcon applications. I won&rsquo;t go into details describing this scheme.</p>\n<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/mvc-c.png\"></div>\n<h3>What makes Phalcon special</h3>\n<h4>Performance</h4>\n<p>Phalcon performance is clearly distinguishable from standard PHP frameworks. In terms of performance it is only fair to compare Phalcon to the other C-written frameworks. Still, to get at least a feeling for the level of performance check its benchmarks <a href=\"https://docs.phalconphp.com/en/latest/reference/benchmark.html\">here</a>.</p>\n<p>Bear in mind, that the goal of this minimal overhead benchmark is not to start another &ldquo;benchmark&rdquo; war. It demonstrates &ldquo;base level&rdquo; of performance that each framework provides and shows the difference between compiled and interpreted code.</p>\n<p>You can squeeze more performance from PHP frameworks by tuning and picking them apart, but it requires time, effort and (more often than not) advanced skills.</p>\n<h4>C-language ORM</h4>\n<p>Phalcon is the first PHP framework to implement a <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in pure C. The consequence of this fact is improved performance, when compared to typical ORMs.</p>\n<p>Since ORM is a key component of so many applications and is used so extensively, any positive changes to performance have a noticeable effect.</p>\n<p>In short, Phalcon&rsquo;s ORM allows you to do things like:</p>\n<p>Find all users and first user with active state:</p>\n<pre class=\"sh_php sh_sourceCode\">$users = Users::find();\n$user = Users::findFirst(&lsquo;state = &rsquo; . User::STATE_ACTIVE); \n</pre>\n<p>Count users and the user posts:</p>\n<pre class=\"sh_php sh_sourceCode\">echo Users::count(); \necho $user-&gt;countPosts(); \n</pre>\n<p>Retrieve user posts:</p>\n<pre class=\"sh_php sh_sourceCode\">$userPosts = $user-&gt;getPosts(); \n</pre>\n<p>Retrieve average user age:</p>\n<pre class=\"sh_php sh_sourceCode\">echo Users::average(array(\"column\" =&gt; \"age\")); //get average user age\n</pre>\n<p>Create user with appropriate login, security key and password hash:</p>\n<pre class=\"sh_php sh_sourceCode\">//...\n$salt = '<span class=\"s1\">$2a$</span>#$#DwaxE59';\n//...\n$user = new Users;  //creates ORM instance of Users model\n$user-&gt;login = \"Steve\";\n$user-&gt;password = crypt($myPassword . $salt); \n$user-&gt;save();\n</pre>\n<p>It is not uncommon (and quite convenient) to directly query your models inside views:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php foreach(Posts::find(\"active = 'Yes'\") as $post){ ?&gt;\n    &lt;?= $post-&gt;title ?&gt;\n&lt;?php } ?&gt;\n</pre>\n<h4>Developer tools</h4>\n<p><a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html\">Phalcon developer tools</a> allow you to generate boilerplate code and jump straight to implementation of your application&rsquo;s logic.</p>\n<p>They can generate any element of MVC triad separately &ndash; model, view or controller, or create scaffolding (complete code for managing records in the database) which is very efficient way to have running prototype.</p>\n<p>They can also generate skeleton of your project, or even employ <a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html#scaffold-with-twitter-bootstrap\">twitter bootstrap</a> for nice looking prototypes. If you are not a command line ninja, you can use web interface (both console tools and their web counterparts are provided).</p>\n<h4>Code Completion</h4>\n<p>You may think that since Phalcon is a C framework, it&rsquo;s not possible to provide code completion for your favorite IDE.</p>\n<p>Luckily, that&rsquo;s not the case. Code completion is handled the same way as it is for PHP functions, using <a href=\"https://github.com/phalcon/phalcon-devtools/tree/master/ide/phpstorm\">stub files</a>.</p>\n<h3>Summary</h3>\n<p>So far you&rsquo;ve learned that Phalcon brings performance, convenient migrations and easy to use developer tools. Now let us give it a go, and write some &ldquo;real&rdquo; application using Phalcon. In the <a href=\"http://blog.phalconphp.com/post/36648855158/tutorial-your-first-encounter-with-phalcon-part-2\">second part</a> I&rsquo;m going to walk through a process of creating a simple web application &ndash; blog.</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"36646589046"},"content":"<div class=\"highlightb\">Our friend <a href=\"https://twitter.com/mailopl\">Marcin @mailopl</a> from Poland sent us this amazing tutorial and introduction to Phalcon. Enjoy it!</div>\n<h3>Foreword</h3>\n<p>This tutorial was going to be published on <a href=\"http://net.tutsplus.com/\">net.tutsplus.com</a> but that process took more than 2 months and finally due to no response I decided to publish it on Phalcon's blog.</p>\n<p>In this tutorial I'll explain what Phalcon framework is, how to install, configure and use it. I will also walk you through a process of creating very simple blog system.</p>\n<p><em>Tutorial Details</em></p>\n<ul><li>Program: Phalcon PHP Framework</li>\n<li>Version (if applicable): <a href=\"https://phalconphp.com/download\">0.7.x</a></li>\n<li>Difficulty: easy</li>\n<li>Estimated Completion Time: 2h</li>\n</ul><h3>Introduction</h3>\n<h4>Requirements</h4>\n<p>In the following tutorial I am going to assume that you are familiar with:</p>\n<ul><li>MySQL - you know how to create a database, and tables; what a schema is and how to fetch and store information</li>\n<li>PHP - how to write and execute an application (i.e. not a single script)</li>\n<li>Apache-PHP-MySQL interaction</li>\n<li>OOP techniques in PHP</li>\n</ul><h4>What is Phalcon - MVC in C</h4>\n<p>Phalcon is a very recent framework on the market developed by the group of enthusiastic developers. In contrast to traditional frameworks which are written in PHP - Phalcon is a C extension to PHP interpreter itself. It means that its code doesn't have to be interpreted on every request by PHP - it's loaded only once, when server is booted (restarted) or reloaded.</p>\n<p>Phalcon is also a full stack framework, which means you just need a minimal amount of code to take advantage of available components, which cover many typical use cases. There is nothing stopping you from using only certain Phalcon's components (classes) on their own, for example if you just need <a href=\"https://docs.phalconphp.com/en/latest/reference/cache.html\">Phalcon's Cache component</a>, you can use it in any application written in either pure PHP or using a framework.</p>\n<p>Following image demonstrates message flow during typical request when employing <a href=\"http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller\">MVC</a> pattern, which is the preferred way to develop Phalcon applications. I won't go into details describing this scheme.</p>\n<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/mvc-c.png\"></div>\n<h3>What makes Phalcon special</h3>\n<h4>Performance</h4>\n<p>Phalcon performance is clearly distinguishable from standard PHP frameworks. In terms of performance it is only fair to compare Phalcon to the other C-written frameworks. Still, to get at least a feeling for the level of performance check its benchmarks <a href=\"https://docs.phalconphp.com/en/latest/reference/benchmark.html\">here</a>.</p>\n<p>Bear in mind, that the goal of this minimal overhead benchmark is not to start another "benchmark" war. It demonstrates "base level" of performance that each framework provides and shows the difference between compiled and interpreted code.</p>\n<p>You can squeeze more performance from PHP frameworks by tuning and picking them apart, but it requires time, effort and (more often than not) advanced skills.</p>\n<h4>C-language ORM</h4>\n<p>Phalcon is the first PHP framework to implement a <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in pure C. The consequence of this fact is improved performance, when compared to typical ORMs.</p>\n<p>Since ORM is a key component of so many applications and is used so extensively, any positive changes to performance have a noticeable effect.</p>\n<p>In short, Phalcon's ORM allows you to do things like:</p>\n<p>Find all users and first user with active state:</p>\n<pre class=\"sh_php sh_sourceCode\">$users = Users::find();\n$user = Users::findFirst(‘state = ' . User::STATE_ACTIVE); \n</pre>\n<p>Count users and the user posts:</p>\n<pre class=\"sh_php sh_sourceCode\">echo Users::count(); \necho $user->countPosts(); \n</pre>\n<p>Retrieve user posts:</p>\n<pre class=\"sh_php sh_sourceCode\">$userPosts = $user->getPosts(); \n</pre>\n<p>Retrieve average user age:</p>\n<pre class=\"sh_php sh_sourceCode\">echo Users::average(array(\"column\" => \"age\")); //get average user age\n</pre>\n<p>Create user with appropriate login, security key and password hash:</p>\n<pre class=\"sh_php sh_sourceCode\">//...\n$salt = '<span class=\"s1\">$2a$</span>#$#DwaxE59';\n//...\n$user = new Users;  //creates ORM instance of Users model\n$user->login = \"Steve\";\n$user->password = crypt($myPassword . $salt); \n$user->save();\n</pre>\n<p>It is not uncommon (and quite convenient) to directly query your models inside views:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php foreach(Posts::find(\"active = 'Yes'\") as $post){ ?>\n    <?= $post->title ?>\n<?php } ?>\n</pre>\n<h4>Developer tools</h4>\n<p><a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html\">Phalcon developer tools</a> allow you to generate boilerplate code and jump straight to implementation of your application's logic.</p>\n<p>They can generate any element of MVC triad separately – model, view or controller, or create scaffolding (complete code for managing records in the database) which is very efficient way to have running prototype.</p>\n<p>They can also generate skeleton of your project, or even employ <a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html#scaffold-with-twitter-bootstrap\">twitter bootstrap</a> for nice looking prototypes. If you are not a command line ninja, you can use web interface (both console tools and their web counterparts are provided).</p>\n<h4>Code Completion</h4>\n<p>You may think that since Phalcon is a C framework, it's not possible to provide code completion for your favorite IDE.</p>\n<p>Luckily, that's not the case. Code completion is handled the same way as it is for PHP functions, using <a href=\"https://github.com/phalcon/phalcon-devtools/tree/master/ide/phpstorm\">stub files</a>.</p>\n<h3>Summary</h3>\n<p>So far you've learned that Phalcon brings performance, convenient migrations and easy to use developer tools. Now let us give it a go, and write some "real" application using Phalcon. In the <a href=\"http://blog.phalconphp.com/post/36648855158/tutorial-your-first-encounter-with-phalcon-part-2\">second part</a> I'm going to walk through a process of creating a simple web application – blog.</p>","content_raw":"<div class=\"highlightb\">Our friend <a href=\"https://twitter.com/mailopl\">Marcin @mailopl</a> from Poland sent us this amazing tutorial and introduction to Phalcon. Enjoy it!</div>\r\n<h3>Foreword</h3>\r\n<p>This tutorial was going to be published on <a href=\"http://net.tutsplus.com/\">net.tutsplus.com</a> but that process took more than 2 months and finally due to no response I decided to publish it on Phalcon's blog.</p>\r\n<p>In this tutorial I'll explain what Phalcon framework is, how to install, configure and use it. I will also walk you through a process of creating very simple blog system.</p>\r\n<p><em>Tutorial Details</em></p>\r\n<ul><li>Program: Phalcon PHP Framework</li>\r\n<li>Version (if applicable): <a href=\"https://phalconphp.com/download\">0.7.x</a></li>\r\n<li>Difficulty: easy</li>\r\n<li>Estimated Completion Time: 2h</li>\r\n</ul><h3>Introduction</h3>\r\n<h4>Requirements</h4>\r\n<p>In the following tutorial I am going to assume that you are familiar with:</p>\r\n<ul><li>MySQL - you know how to create a database, and tables; what a schema is and how to fetch and store information</li>\r\n<li>PHP - how to write and execute an application (i.e. not a single script)</li>\r\n<li>Apache-PHP-MySQL interaction</li>\r\n<li>OOP techniques in PHP</li>\r\n</ul><h4>What is Phalcon - MVC in C</h4>\r\n<p>Phalcon is a very recent framework on the market developed by the group of enthusiastic developers. In contrast to traditional frameworks which are written in PHP - Phalcon is a C extension to PHP interpreter itself. It means that its code doesn&rsquo;t have to be interpreted on every request by PHP - it&rsquo;s loaded only once, when server is booted (restarted) or reloaded.</p>\r\n<p>Phalcon is also a full stack framework, which means you just need a minimal amount of code to take advantage of available components, which cover many typical use cases. There is nothing stopping you from using only certain Phalcon's components (classes) on their own, for example if you just need <a href=\"https://docs.phalconphp.com/en/latest/reference/cache.html\">Phalcon&rsquo;s Cache component</a>, you can use it in any application written in either pure PHP or using a framework.</p>\r\n<p>Following image demonstrates message flow during typical request when employing <a href=\"http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller\">MVC</a> pattern, which is the preferred way to develop Phalcon applications. I won't go into details describing this scheme.</p>\r\n<div align=\"center\"><img alt=\"image\" src=\"http://static.phalconphp.com/blog/img/mvc-c.png\"></div>\r\n<h3>What makes Phalcon special</h3>\r\n<h4>Performance</h4>\r\n<p>Phalcon performance is clearly distinguishable from standard PHP frameworks. In terms of performance it is only fair to compare Phalcon to the other C-written frameworks. Still, to get at least a feeling for the level of performance check its benchmarks <a href=\"https://docs.phalconphp.com/en/latest/reference/benchmark.html\">here</a>.</p>\r\n<p>Bear in mind, that the goal of this minimal overhead benchmark is not to start another &ldquo;benchmark&rdquo; war. It demonstrates \"base level\" of performance that each framework provides and shows the difference between compiled and interpreted code.</p>\r\n<p>You can squeeze more performance from PHP frameworks by tuning and picking them apart, but it requires time, effort and (more often than not) advanced skills.</p>\r\n<h4>C-language ORM</h4>\r\n<p>Phalcon is the first PHP framework to implement a <a href=\"https://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a> in pure C. The consequence of this fact is improved performance, when compared to typical ORMs.</p>\r\n<p>Since ORM is a key component of so many applications and is used so extensively, any positive changes to performance have a noticeable effect.</p>\r\n<p>In short, Phalcon&rsquo;s ORM allows you to do things like:</p>\r\n<p>Find all users and first user with active state:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$users = Users::find();\r\n$user = Users::findFirst(&lsquo;state = &rsquo; . User::STATE_ACTIVE); \r\n</pre>\r\n<p>Count users and the user posts:</p>\r\n<pre class=\"sh_php sh_sourceCode\">echo Users::count(); \r\necho $user-&gt;countPosts(); \r\n</pre>\r\n<p>Retrieve user posts:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$userPosts = $user-&gt;getPosts(); \r\n</pre>\r\n<p>Retrieve average user age:</p>\r\n<pre class=\"sh_php sh_sourceCode\">echo Users::average(array(\"column\" =&gt; \"age\")); //get average user age\r\n</pre>\r\n<p>Create user with appropriate login, security key and password hash:</p>\r\n<pre class=\"sh_php sh_sourceCode\">//...\r\n$salt = '<span class=\"s1\">$2a$</span>#$#DwaxE59';\r\n//...\r\n$user = new Users;  //creates ORM instance of Users model\r\n$user-&gt;login = \"Steve\";\r\n$user-&gt;password = crypt($myPassword . $salt); \r\n$user-&gt;save();\r\n</pre>\r\n<p>It is not uncommon (and quite convenient) to directly query your models inside views:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php foreach(Posts::find(\"active = 'Yes'\") as $post){ ?&gt;\r\n    &lt;?= $post-&gt;title ?&gt;\r\n&lt;?php } ?&gt;\r\n</pre>\r\n<h4>Developer tools</h4>\r\n<p><a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html\">Phalcon developer tools</a> allow you to generate boilerplate code and jump straight to implementation of your application's logic.</p>\r\n<p>They can generate any element of MVC triad separately &ndash; model, view or controller, or create scaffolding (complete code for managing records in the database) which is very efficient way to have running prototype.</p>\r\n<p>They can also generate skeleton of your project, or even employ <a href=\"https://docs.phalconphp.com/en/latest/reference/tools.html#scaffold-with-twitter-bootstrap\">twitter bootstrap</a> for nice looking prototypes. If you are not a command line ninja, you can use web interface (both console tools and their web counterparts are provided).</p>\r\n<h4>Code Completion</h4>\r\n<p>You may think that since Phalcon is a C framework, it&rsquo;s not possible to provide code completion for your favorite IDE.</p>\r\n<p>Luckily, that&rsquo;s not the case. Code completion is handled the same way as it is for PHP functions, using <a href=\"https://github.com/phalcon/phalcon-devtools/tree/master/ide/phpstorm\">stub files</a>.</p>\r\n<h3>Summary</h3>\r\n<p>So far you've learned that Phalcon brings performance, convenient migrations and easy to use developer tools. Now let us give it a go, and write some \"real\" application using Phalcon. In the <a href=\"http://blog.phalconphp.com/post/36648855158/tutorial-your-first-encounter-with-phalcon-part-2\">second part</a> I'm going to walk through a process of creating a simple web application &ndash; blog.</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-11-026
-->


Tutorial: your first encounter with Phalcon / Part 1
====================================================

Our friend [Marcin @mailopl](https://twitter.com/mailopl) from Poland
sent us this amazing tutorial and introduction to Phalcon. Enjoy it!

### Foreword

This tutorial was going to be published on
[net.tutsplus.com](http://net.tutsplus.com/) but that process took more
than 2 months and finally due to no response I decided to publish it on
Phalcon's blog.

In this tutorial I'll explain what Phalcon framework is, how to install,
configure and use it. I will also walk you through a process of creating
very simple blog system.

*Tutorial Details*

-   Program: Phalcon PHP Framework
-   Version (if applicable): [0.7.x](https://phalconphp.com/download)
-   Difficulty: easy
-   Estimated Completion Time: 2h

### Introduction

#### Requirements

In the following tutorial I am going to assume that you are familiar
with:

-   MySQL - you know how to create a database, and tables; what a schema
    is and how to fetch and store information
-   PHP - how to write and execute an application (i.e. not a single
    script)
-   Apache-PHP-MySQL interaction
-   OOP techniques in PHP

#### What is Phalcon - MVC in C

Phalcon is a very recent framework on the market developed by the group
of enthusiastic developers. In contrast to traditional frameworks which
are written in PHP - Phalcon is a C extension to PHP interpreter itself.
It means that its code doesn't have to be interpreted on every request
by PHP - it's loaded only once, when server is booted (restarted) or
reloaded.

Phalcon is also a full stack framework, which means you just need a
minimal amount of code to take advantage of available components, which
cover many typical use cases. There is nothing stopping you from using
only certain Phalcon's components (classes) on their own, for example if
you just need [Phalcon's Cache
component](https://docs.phalconphp.com/en/latest/reference/cache.html),
you can use it in any application written in either pure PHP or using a
framework.

Following image demonstrates message flow during typical request when
employing
[MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
pattern, which is the preferred way to develop Phalcon applications. I
won't go into details describing this scheme.

![image](http://static.phalconphp.com/blog/img/mvc-c.png)

### What makes Phalcon special

#### Performance

Phalcon performance is clearly distinguishable from standard PHP
frameworks. In terms of performance it is only fair to compare Phalcon
to the other C-written frameworks. Still, to get at least a feeling for
the level of performance check its benchmarks
[here](https://docs.phalconphp.com/en/latest/reference/benchmark.html).

Bear in mind, that the goal of this minimal overhead benchmark is not to
start another "benchmark" war. It demonstrates "base level" of
performance that each framework provides and shows the difference
between compiled and interpreted code.

You can squeeze more performance from PHP frameworks by tuning and
picking them apart, but it requires time, effort and (more often than
not) advanced skills.

#### C-language ORM

Phalcon is the first PHP framework to implement a
[ORM](https://docs.phalconphp.com/en/latest/reference/models.html) in
pure C. The consequence of this fact is improved performance, when
compared to typical ORMs.

Since ORM is a key component of so many applications and is used so
extensively, any positive changes to performance have a noticeable
effect.

In short, Phalcon's ORM allows you to do things like:

Find all users and first user with active state:

```php
$users = Users::find();
$user = Users::findFirst(‘state = ' . User::STATE_ACTIVE); 
```

Count users and the user posts:

```php
echo Users::count(); 
echo $user->countPosts(); 
```

Retrieve user posts:

```php
$userPosts = $user->getPosts(); 
```

Retrieve average user age:

```php
echo Users::average(array("column" => "age")); //get average user age
```

Create user with appropriate login, security key and password hash:

```php
//...
$salt = '$2a$#$#DwaxE59';
//...
$user = new Users;  //creates ORM instance of Users model
$user->login = "Steve";
$user->password = crypt($myPassword . $salt); 
$user->save();
```

It is not uncommon (and quite convenient) to directly query your models
inside views:

```php
<?php foreach(Posts::find("active = 'Yes'") as $post){ ?>
    <?= $post->title ?>
<?php } ?>
```

#### Developer tools

[Phalcon developer
tools](https://docs.phalconphp.com/en/latest/reference/tools.html) allow
you to generate boilerplate code and jump straight to implementation of
your application's logic.

They can generate any element of MVC triad separately – model, view or
controller, or create scaffolding (complete code for managing records in
the database) which is very efficient way to have running prototype.

They can also generate skeleton of your project, or even employ [twitter
bootstrap](https://docs.phalconphp.com/en/latest/reference/tools.html#scaffold-with-twitter-bootstrap)
for nice looking prototypes. If you are not a command line ninja, you
can use web interface (both console tools and their web counterparts are
provided).

#### Code Completion

You may think that since Phalcon is a C framework, it's not possible to
provide code completion for your favorite IDE.

Luckily, that's not the case. Code completion is handled the same way as
it is for PHP functions, using [stub
files](https://github.com/phalcon/phalcon-devtools/tree/master/ide/phpstorm).

### Summary

So far you've learned that Phalcon brings performance, convenient
migrations and easy to use developer tools. Now let us give it a go, and
write some "real" application using Phalcon. In the [second
part](http://blog.phalconphp.com/post/36648855158/tutorial-your-first-encounter-with-phalcon-part-2)
I'm going to walk through a process of creating a simple web application
– blog.

