<!--
slug: phalcon-2-beta-3-released
date: Wed Oct 15 2014 11:58:00 GMT-0400 (EDT)
tags: phalcon, phalcon2, phalconphp, zephir
title: Phalcon 2 (beta 3) released
id: 100083107700
link: http://blog.phalconphp.com/post/100083107700/phalcon-2-beta-3-released
raw: {"blog_name":"phalconphp","id":100083107700,"post_url":"http://blog.phalconphp.com/post/100083107700/phalcon-2-beta-3-released","slug":"phalcon-2-beta-3-released","type":"text","date":"2014-10-15 15:58:00 GMT","timestamp":1413388680,"state":"published","format":"html","reblog_key":"cG6rnFZD","tags":["phalcon","phalcon2","phalconphp","zephir"],"short_url":"http://tmblr.co/Z6Pumv1TDQmTq","highlighted":[],"note_count":5,"title":"Phalcon 2 (beta 3) released","body":"<p>Today we&rsquo;re very excited to announce the release of the third beta (and possibly last one) of Phalcon 2!</p>\n<p>Phalcon 2 is almost fully functional and stable as Phalcon 1.x, virtually all tests in 1.x <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/38007986\">are now passing</a> 2.0. If you haven&rsquo;t tried Phalcon 2 out, it&rsquo;s time to give it a shot!</p>\n<h3>Preparing your migration to Phalcon 2</h3>\n<h4>Interfaces and type checkings</h4>\n<p>Thanks to <a href=\"http://www.zephir-lang.org\">Zephir</a>, Phalcon 2 performs a greater number of type and class checks, and as a result this make the whole framework more stable and consistent. If a wrong type or class is passed to a method you&rsquo;ll see the relevant exception with a verbose message. If you have created user adapters or extended framework components and they do not implement the necessary interfaces and/or types you may need to fix them.</p>\n<pre class=\"sh_php sh_sourceCode\">Catchable fatal error: Argument 2 passed to Phalcon\\Mvc\\Model\\Query::__construct() must implement \ninterface Phalcon\\DiInterface, instance of stdClass given in /home/scott/test.php on line 17\n</pre>\n<h4>Better debug information</h4>\n<p><a href=\"http://zephir-lang.com/\">Zephir</a> provides the exact place where an exception was thrown and it will provide more information as to where the error occurred.</p>\n<pre class=\"sh_php sh_sourceCode\">Exception: The static method 'someMethod' doesn't exist on model 'Robots'\nFile=phalcon/mvc/model.zep Line=4042\n#0 /home/scott/test.php(64): Phalcon\\Mvc\\Model::__callStatic('someMethod', Array)\n#1 /home/scott/test.php(64): Robots::someMethod()\n#2 {main}\n</pre>\n<p>This could help you to find solutions for your problems by just looking at the framework source.</p>\n<h4>Error Handling</h4>\n<p>Phalcon 2 provides better facilities to handle exceptions, for instance, in micro applications you can use the new error handler which will allow you to do something like this:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Http\\Response;\nuse Phalcon\\Mvc\\Micro;\n\n$app = new Micro();\n\n$app-&gt;map('/say/{name}', function ($name) {\n    throw new \\Exception(\"An exception has occurred\");\n});\n\n$app-&gt;error(function($e) {\n\treturn new Response('Internal error');\t\t\n});\n</pre>\n<p>These facilities were easily implemented thanks to the low-level exception system provided by Zephir.</p>\n<h4>Performance Improvements</h4>\n<p>Zephir/Phalcon 2 takes advantage of the <a href=\"http://lxr.php.net/xref/PHP_5_6/UPGRADING.INTERNALS#56\">improved way to return values</a> in PHP 5.6. This optimization greatly reduces the number of unecessesary copies improving the performance.</p>\n<h3>Phalcon 2 new look</h3>\n<p>Our community have contributed 4 amazing proposals for the new design in the Phalcon 2 era. Contribute by voting your favorite design <a href=\"http://survey.phalconphp.com\">here</a>.</p>\n<h3>Want to contribute?</h3>\n<p>From the beginning, Phalcon has been a different framework than any other framework out there, providing developers with many components and functionality in a single PHP extension. If you want to contribute in Phalcon 2, being a part of something unique and amazing, the simplest way is to look through the <a href=\"https://github.com/phalcon/cphalcon\">issue tracker</a> for issues, bugs or features to implement. Help us to make Phalcon the greatest framework for PHP ever! Your contributions are very valuable.</p>\n<h3>Codeception</h3>\n<p>An important work has been done migrating and simplifying tests for Phalcon 2 into a single test-suite powered by <a href=\"http://codeception.com/\">CodeCeption</a>. See the migrated tests <a href=\"https://github.com/phalcon/cphalcon/tree/2.0.0/tests\">here</a>.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 2.0.0 branch, if you don't have Zephir installed follow these instructions:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd ext\nsudo ./install\n</pre>\n<p>If you have Zephir installed:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\nzephir build\n</pre>\n<p>We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on <a href=\"http://forum.phalconphp.com/\">Phosphorum</a>.</p>\n<p>;3</p>","reblog":{"tree_html":"","comment":"<p>Today we&rsquo;re very excited to announce the release of the third beta (and possibly last one) of Phalcon 2!</p>\n<p>Phalcon 2 is almost fully functional and stable as Phalcon 1.x, virtually all tests in 1.x <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/38007986\">are now passing</a> 2.0. If you haven&rsquo;t tried Phalcon 2 out, it&rsquo;s time to give it a shot!</p>\n<h3>Preparing your migration to Phalcon 2</h3>\n<h4>Interfaces and type checkings</h4>\n<p>Thanks to <a href=\"http://www.zephir-lang.org\">Zephir</a>, Phalcon 2 performs a greater number of type and class checks, and as a result this make the whole framework more stable and consistent. If a wrong type or class is passed to a method you&rsquo;ll see the relevant exception with a verbose message. If you have created user adapters or extended framework components and they do not implement the necessary interfaces and/or types you may need to fix them.</p>\n<pre class=\"sh_php sh_sourceCode\">Catchable fatal error: Argument 2 passed to Phalcon\\Mvc\\Model\\Query::__construct() must implement \ninterface Phalcon\\DiInterface, instance of stdClass given in /home/scott/test.php on line 17\n</pre>\n<h4>Better debug information</h4>\n<p><a href=\"http://zephir-lang.com/\">Zephir</a> provides the exact place where an exception was thrown and it will provide more information as to where the error occurred.</p>\n<pre class=\"sh_php sh_sourceCode\">Exception: The static method 'someMethod' doesn't exist on model 'Robots'\nFile=phalcon/mvc/model.zep Line=4042\n#0 /home/scott/test.php(64): Phalcon\\Mvc\\Model::__callStatic('someMethod', Array)\n#1 /home/scott/test.php(64): Robots::someMethod()\n#2 {main}\n</pre>\n<p>This could help you to find solutions for your problems by just looking at the framework source.</p>\n<h4>Error Handling</h4>\n<p>Phalcon 2 provides better facilities to handle exceptions, for instance, in micro applications you can use the new error handler which will allow you to do something like this:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Http\\Response;\nuse Phalcon\\Mvc\\Micro;\n\n$app = new Micro();\n\n$app-&gt;map('/say/{name}', function ($name) {\n    throw new \\Exception(\"An exception has occurred\");\n});\n\n$app-&gt;error(function($e) {\n\treturn new Response('Internal error');\t\t\n});\n</pre>\n<p>These facilities were easily implemented thanks to the low-level exception system provided by Zephir.</p>\n<h4>Performance Improvements</h4>\n<p>Zephir/Phalcon 2 takes advantage of the <a href=\"http://lxr.php.net/xref/PHP_5_6/UPGRADING.INTERNALS#56\">improved way to return values</a> in PHP 5.6. This optimization greatly reduces the number of unecessesary copies improving the performance.</p>\n<h3>Phalcon 2 new look</h3>\n<p>Our community have contributed 4 amazing proposals for the new design in the Phalcon 2 era. Contribute by voting your favorite design <a href=\"http://survey.phalconphp.com\">here</a>.</p>\n<h3>Want to contribute?</h3>\n<p>From the beginning, Phalcon has been a different framework than any other framework out there, providing developers with many components and functionality in a single PHP extension. If you want to contribute in Phalcon 2, being a part of something unique and amazing,&nbsp;the simplest way is to look through the <a href=\"https://github.com/phalcon/cphalcon\">issue tracker</a> for issues, bugs or features to implement. Help us to make Phalcon the greatest framework for PHP ever! Your contributions are very valuable.</p>\n<h3>Codeception</h3>\n<p>An important work has been done migrating and simplifying tests for Phalcon 2 into a single test-suite powered by <a href=\"http://codeception.com/\">CodeCeption</a>. See the migrated tests <a href=\"https://github.com/phalcon/cphalcon/tree/2.0.0/tests\">here</a>.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 2.0.0 branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd ext\nsudo ./install\n</pre>\n<p>If you have Zephir installed:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\nzephir build\n</pre>\n<p>We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on&nbsp;<a href=\"http://forum.phalconphp.com/\">Phosphorum</a>.</p>\n<p>;3</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"100083107700"},"content":"<p>Today we're very excited to announce the release of the third beta (and possibly last one) of Phalcon 2!</p>\n<p>Phalcon 2 is almost fully functional and stable as Phalcon 1.x, virtually all tests in 1.x <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/38007986\">are now passing</a> 2.0. If you haven't tried Phalcon 2 out, it's time to give it a shot!</p>\n<h3>Preparing your migration to Phalcon 2</h3>\n<h4>Interfaces and type checkings</h4>\n<p>Thanks to <a href=\"http://www.zephir-lang.org\">Zephir</a>, Phalcon 2 performs a greater number of type and class checks, and as a result this make the whole framework more stable and consistent. If a wrong type or class is passed to a method you'll see the relevant exception with a verbose message. If you have created user adapters or extended framework components and they do not implement the necessary interfaces and/or types you may need to fix them.</p>\n<pre class=\"sh_php sh_sourceCode\">Catchable fatal error: Argument 2 passed to Phalcon\\Mvc\\Model\\Query::__construct() must implement \ninterface Phalcon\\DiInterface, instance of stdClass given in /home/scott/test.php on line 17\n</pre>\n<h4>Better debug information</h4>\n<p><a href=\"http://zephir-lang.com/\">Zephir</a> provides the exact place where an exception was thrown and it will provide more information as to where the error occurred.</p>\n<pre class=\"sh_php sh_sourceCode\">Exception: The static method 'someMethod' doesn't exist on model 'Robots'\nFile=phalcon/mvc/model.zep Line=4042\n#0 /home/scott/test.php(64): Phalcon\\Mvc\\Model::__callStatic('someMethod', Array)\n#1 /home/scott/test.php(64): Robots::someMethod()\n#2 {main}\n</pre>\n<p>This could help you to find solutions for your problems by just looking at the framework source.</p>\n<h4>Error Handling</h4>\n<p>Phalcon 2 provides better facilities to handle exceptions, for instance, in micro applications you can use the new error handler which will allow you to do something like this:</p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Http\\Response;\nuse Phalcon\\Mvc\\Micro;\n\n$app = new Micro();\n\n$app->map('/say/{name}', function ($name) {\n    throw new \\Exception(\"An exception has occurred\");\n});\n\n$app->error(function($e) {\n\treturn new Response('Internal error');\t\t\n});\n</pre>\n<p>These facilities were easily implemented thanks to the low-level exception system provided by Zephir.</p>\n<h4>Performance Improvements</h4>\n<p>Zephir/Phalcon 2 takes advantage of the <a href=\"http://lxr.php.net/xref/PHP_5_6/UPGRADING.INTERNALS#56\">improved way to return values</a> in PHP 5.6. This optimization greatly reduces the number of unecessesary copies improving the performance.</p>\n<h3>Phalcon 2 new look</h3>\n<p>Our community have contributed 4 amazing proposals for the new design in the Phalcon 2 era. Contribute by voting your favorite design <a href=\"http://survey.phalconphp.com\">here</a>.</p>\n<h3>Want to contribute?</h3>\n<p>From the beginning, Phalcon has been a different framework than any other framework out there, providing developers with many components and functionality in a single PHP extension. If you want to contribute in Phalcon 2, being a part of something unique and amazing, the simplest way is to look through the <a href=\"https://github.com/phalcon/cphalcon\">issue tracker</a> for issues, bugs or features to implement. Help us to make Phalcon the greatest framework for PHP ever! Your contributions are very valuable.</p>\n<h3>Codeception</h3>\n<p>An important work has been done migrating and simplifying tests for Phalcon 2 into a single test-suite powered by <a href=\"http://codeception.com/\">CodeCeption</a>. See the migrated tests <a href=\"https://github.com/phalcon/cphalcon/tree/2.0.0/tests\">here</a>.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 2.0.0 branch, if you don't have Zephir installed follow these instructions:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\ncd ext\nsudo ./install\n</pre>\n<p>If you have Zephir installed:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ngit checkout 2.0.0\nzephir build\n</pre>\n<p>We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on <a href=\"http://forum.phalconphp.com/\">Phosphorum</a>.</p>\n<p>;3</p>","content_raw":"<p>Today we're very excited to announce the release of the third beta (and possibly last one) of Phalcon 2!</p>\r\n<p>Phalcon 2 is almost fully functional and stable as Phalcon 1.x, virtually all tests in 1.x <a href=\"https://travis-ci.org/phalcon/cphalcon/builds/38007986\">are now passing</a> 2.0. If you haven't tried Phalcon 2 out, it's time to give it a shot!</p>\r\n<h3>Preparing your migration to Phalcon 2</h3>\r\n<h4>Interfaces and type checkings</h4>\r\n<p>Thanks to <a href=\"http://www.zephir-lang.org\">Zephir</a>, Phalcon 2 performs a greater number of type and class checks, and as a result this make the whole framework more stable and consistent. If a wrong type or class is passed to a method you'll see the relevant exception with a verbose message. If you have created user adapters or extended framework components and they do not implement the necessary interfaces and/or types you may need to fix them.</p>\r\n<pre class=\"sh_php sh_sourceCode\">Catchable fatal error: Argument 2 passed to Phalcon\\Mvc\\Model\\Query::__construct() must implement \r\ninterface Phalcon\\DiInterface, instance of stdClass given in /home/scott/test.php on line 17\r\n</pre>\r\n<h4>Better debug information</h4>\r\n<p><a href=\"http://zephir-lang.com/\">Zephir</a> provides the exact place where an exception was thrown and it will provide more information as to where the error occurred.</p>\r\n<pre class=\"sh_php sh_sourceCode\">Exception: The static method 'someMethod' doesn't exist on model 'Robots'\r\nFile=phalcon/mvc/model.zep Line=4042\r\n#0 /home/scott/test.php(64): Phalcon\\Mvc\\Model::__callStatic('someMethod', Array)\r\n#1 /home/scott/test.php(64): Robots::someMethod()\r\n#2 {main}\r\n</pre>\r\n<p>This could help you to find solutions for your problems by just looking at the framework source.</p>\r\n<h4>Error Handling</h4>\r\n<p>Phalcon 2 provides better facilities to handle exceptions, for instance, in micro applications you can use the new error handler which will allow you to do something like this:</p>\r\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Http\\Response;\r\nuse Phalcon\\Mvc\\Micro;\r\n\r\n$app = new Micro();\r\n\r\n$app-&gt;map('/say/{name}', function ($name) {\r\n    throw new \\Exception(\"An exception has occurred\");\r\n});\r\n\r\n$app-&gt;error(function($e) {\r\n\treturn new Response('Internal error');\t\t\r\n});\r\n</pre>\r\n<p>These facilities were easily implemented thanks to the low-level exception system provided by Zephir.</p>\r\n<h4>Performance Improvements</h4>\r\n<p>Zephir/Phalcon 2 takes advantage of the <a href=\"http://lxr.php.net/xref/PHP_5_6/UPGRADING.INTERNALS#56\">improved way to return values</a> in PHP 5.6. This optimization greatly reduces the number of unecessesary copies improving the performance.</p>\r\n<h3>Phalcon 2 new look</h3>\r\n<p>Our community have contributed 4 amazing proposals for the new design in the Phalcon 2 era. Contribute by voting your favorite design <a href=\"http://survey.phalconphp.com\">here</a>.</p>\r\n<h3>Want to contribute?</h3>\r\n<p>From the beginning, Phalcon has been a different framework than any other framework out there, providing developers with many components and functionality in a single PHP extension. If you want to contribute in Phalcon 2, being a part of something unique and amazing,&nbsp;the simplest way is to look through the <a href=\"https://github.com/phalcon/cphalcon\">issue tracker</a> for issues, bugs or features to implement. Help us to make Phalcon the greatest framework for PHP ever! Your contributions are very valuable.</p>\r\n<h3>Codeception</h3>\r\n<p>An important work has been done migrating and simplifying tests for Phalcon 2 into a single test-suite powered by <a href=\"http://codeception.com/\">CodeCeption</a>. See the migrated tests <a href=\"https://github.com/phalcon/cphalcon/tree/2.0.0/tests\">here</a>.</p>\r\n<h3>Help with Testing</h3>\r\n<p>This version can be installed from the 2.0.0 branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone http://github.com/phalcon/cphalcon\r\ngit checkout 2.0.0\r\ncd ext\r\nsudo ./install\r\n</pre>\r\n<p>If you have Zephir installed:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone http://github.com/phalcon/cphalcon\r\ngit checkout 2.0.0\r\nzephir build\r\n</pre>\r\n<p>We hope that you will enjoy these improvements and additions. We invite you to share your thoughts and questions about this version on&nbsp;<a href=\"http://forum.phalconphp.com/\">Phosphorum</a>.</p>\r\n<p>;3</p>","is_current_item":true,"is_root_item":true}]}
publish: 2014-10-015
-->


Phalcon 2 (beta 3) released
===========================

Today we're very excited to announce the release of the third beta (and
possibly last one) of Phalcon 2!

Phalcon 2 is almost fully functional and stable as Phalcon 1.x,
virtually all tests in 1.x [are now
passing](https://travis-ci.org/phalcon/cphalcon/builds/38007986) 2.0. If
you haven't tried Phalcon 2 out, it's time to give it a shot!

### Preparing your migration to Phalcon 2

#### Interfaces and type checkings

Thanks to [Zephir](http://www.zephir-lang.org), Phalcon 2 performs a
greater number of type and class checks, and as a result this make the
whole framework more stable and consistent. If a wrong type or class is
passed to a method you'll see the relevant exception with a verbose
message. If you have created user adapters or extended framework
components and they do not implement the necessary interfaces and/or
types you may need to fix them.

~~~~ {.sh_php .sh_sourceCode}
Catchable fatal error: Argument 2 passed to Phalcon\Mvc\Model\Query::__construct() must implement 
interface Phalcon\DiInterface, instance of stdClass given in /home/scott/test.php on line 17
~~~~

#### Better debug information

[Zephir](http://zephir-lang.com/) provides the exact place where an
exception was thrown and it will provide more information as to where
the error occurred.

~~~~ {.sh_php .sh_sourceCode}
Exception: The static method 'someMethod' doesn't exist on model 'Robots'
File=phalcon/mvc/model.zep Line=4042
#0 /home/scott/test.php(64): Phalcon\Mvc\Model::__callStatic('someMethod', Array)
#1 /home/scott/test.php(64): Robots::someMethod()
#2 {main}
~~~~

This could help you to find solutions for your problems by just looking
at the framework source.

#### Error Handling

Phalcon 2 provides better facilities to handle exceptions, for instance,
in micro applications you can use the new error handler which will allow
you to do something like this:

~~~~ {.sh_php .sh_sourceCode}
use Phalcon\Http\Response;
use Phalcon\Mvc\Micro;

$app = new Micro();

$app->map('/say/{name}', function ($name) {
    throw new \Exception("An exception has occurred");
});

$app->error(function($e) {
    return new Response('Internal error');      
});
~~~~

These facilities were easily implemented thanks to the low-level
exception system provided by Zephir.

#### Performance Improvements

Zephir/Phalcon 2 takes advantage of the [improved way to return
values](http://lxr.php.net/xref/PHP_5_6/UPGRADING.INTERNALS#56) in PHP
5.6. This optimization greatly reduces the number of unecessesary copies
improving the performance.

### Phalcon 2 new look

Our community have contributed 4 amazing proposals for the new design in
the Phalcon 2 era. Contribute by voting your favorite design
[here](http://survey.phalconphp.com).

### Want to contribute?

From the beginning, Phalcon has been a different framework than any
other framework out there, providing developers with many components and
functionality in a single PHP extension. If you want to contribute in
Phalcon 2, being a part of something unique and amazing, the simplest
way is to look through the [issue
tracker](https://github.com/phalcon/cphalcon) for issues, bugs or
features to implement. Help us to make Phalcon the greatest framework
for PHP ever! Your contributions are very valuable.

### Codeception

An important work has been done migrating and simplifying tests for
Phalcon 2 into a single test-suite powered by
[CodeCeption](http://codeception.com/). See the migrated tests
[here](https://github.com/phalcon/cphalcon/tree/2.0.0/tests).

### Help with Testing

This version can be installed from the 2.0.0 branch, if you don't have
Zephir installed follow these instructions:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
cd ext
sudo ./install
~~~~

If you have Zephir installed:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
git checkout 2.0.0
zephir build
~~~~

We hope that you will enjoy these improvements and additions. We invite
you to share your thoughts and questions about this version
on [Phosphorum](http://forum.phalconphp.com/).

;3

