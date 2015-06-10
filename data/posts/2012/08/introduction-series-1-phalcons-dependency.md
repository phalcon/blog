<!--
slug: introduction-series-1-phalcons-dependency
date: Thu Aug 09 2012 13:28:00 GMT-0400 (EDT)
tags: phalcon, php, 0.5.x, di, mvc
title: Introduction Series 1: Phalcon's Dependency Injector
id: 29061488806
link: http://blog.phalconphp.com/post/29061488806/introduction-series-1-phalcons-dependency
raw: {"blog_name":"phalconphp","id":29061488806,"post_url":"http://blog.phalconphp.com/post/29061488806/introduction-series-1-phalcons-dependency","slug":"introduction-series-1-phalcons-dependency","type":"text","date":"2012-08-09 17:28:00 GMT","timestamp":1344533280,"state":"published","format":"html","reblog_key":"fubuCAKO","tags":["phalcon","php","0.5.x","di","mvc"],"short_url":"http://tmblr.co/Z6PumvR4Co2c","highlighted":[],"note_count":0,"title":"Introduction Series 1: Phalcon's Dependency Injector","body":"<p>Development in the new version of Phalcon 0.5.0 is well underway. In this new version we are introducing new components for the community to use. In the blog posts to follow, we will explain these new features in length.</p>\n<p>With Phalcon 0.5.0 (still under development) we are introducing a new design pattern called Dependency Injection. In short, objects should not be instantiated inside a class, rather injected using constructors and/or setter methods. This pattern increases testability in the code, thus making it less prone to errors.</p>\n<p><strong>Phalcon\\Di</strong><br/>Phalcon\\Di is a new component that will be available in 0.5.0 and offer a dependency injection container. Phalcon\\Di works as a container of services.</p>\n<p>Services can be registered by the framework itself or the developer. When a component A requires component B (or an instance of its class) to operate, it can request component B from the container, rather than creating a new instance component B.</p>\n<p>Services can be registered in several ways:</p>\n<pre class=\"sh_php\">//Create the Dependency Injector Container\n$di = new Phalcon\\DI();\n\n//By its class name\n$di-&gt;set(\"request\", \"Phalcon\\Http\\Request\");\n\n//Using an anonymous function, the instance will lazy loaded\n$di-&gt;set(\"request\", function(){\n    return new Phalcon\\Http\\Request();\n});\n\n//Registering directly an instance\n$di-&gt;set(\"request\", new Phalcon\\Http\\Request());\n\n//Using an array definition\n$di-&gt;set(\"request\", array(\n    \"className\" =&gt; \"Phalcon\\Http\\Request\"\n));\n</pre>\n<p>In the above example, when the framework needs to access the request data, it will ask for the service identified as &lsquo;request&rsquo; in the container. The container in turn will return an instance of the required service. A developer might eventually replace the Phalcon\\Http\\Request component bundled with one provided by another vendor or created by the developer him/herself.</p>\n<p>Each of the methods (demonstrated in the above example) used to set/register a service has advantages and disadvantages. It is up to the developer and the particular requirements that will designate which one is used. </p>\n<p>Setting a service by a string is simple but lacks flexibility. Setting services using an array offers a lot more flexibility but makes the code more complicated. The lambda function is a good balance between the two but could lead to more maintenance than one would expect.</p>\n<p>Phalcon\\Di offers lazy loading for every service it stores. Unless the developer chooses to instantiate an object directly and store it in the container, any object stored in it (via array, string etc.) will be lazy loaded i.e. instantiated only when requested.</p>\n<pre class=\"sh_php\">//Register a service \"db\" with a class name and its parameters\n$di-&gt;set(\"db\", array(\n    \"className\" =&gt; \"Phalcon\\Db\\Adapter\\Pdo\\Mysql\",\n    \"parameters\" =&gt; array(\n          \"parameter\" =&gt; array(\n               \"host\" =&gt; \"localhost\",\n               \"username\" =&gt; \"root\",\n               \"password\" =&gt; \"secret\",\n               \"dbname\" =&gt; \"blog\"\n          )\n    )\n));\n\n//Using an anonymous function\n$di-&gt;set(\"db\", function(){\n    return new Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n         \"host\" =&gt; \"localhost\",\n         \"username\" =&gt; \"root\",\n         \"password\" =&gt; \"secret\",\n         \"dbname\" =&gt; \"blog\"\n    ));\n});\n</pre>\n<p>Both service registrations above produce the same result. The array definition however, allows for alteration of the service parameters if needed:</p>\n<pre class=\"sh_php\">$di-&gt;setParameter(\"db\", 0, array(\n    \"host\" =&gt; \"localhost\",\n    \"username\" =&gt; \"root\",\n    \"password\" =&gt; \"secret\"\n));\n</pre>\n<p>Obtaining a service from the container is a matter of simply calling the &ldquo;get&rdquo; method. A new instance of the service will be returned:</p>\n<pre class=\"sh_php\">$request = $di-&gt;get(\"request\");\n</pre>\n<p><span><span>Phalcon\\Di also allows for services to be reusable. To get a service previously instantiated the getShared() method can be used. Specifically for the Phalcon\\Http\\Request example shown above:</span></span></p>\n<pre class=\"sh_php\">$request = $di-&gt;getShared(\"request\");\n</pre>\n<p><strong>Conclusion</strong></p>\n<p>This has been one of the most popular requests by the community. Phalcon\\Di allows developers to extend and thoroughly test their code (with mock objects etc.) while keeping the same high performance levels and memory consumption low.</p>","reblog":{"tree_html":"","comment":"<p>Development in the new version of Phalcon 0.5.0 is well underway. In this new version we are introducing new components for the community to use. In the blog posts to follow, we will explain these new features in length.</p>\n<p>With Phalcon 0.5.0 (still under development) we are introducing a new design pattern called Dependency Injection. In short, objects should not be instantiated inside a class, rather injected using constructors and/or setter methods. This pattern increases testability in the code, thus making it less prone to errors.</p>\n<p><strong>Phalcon\\Di</strong><br>Phalcon\\Di is a new component that will be available in 0.5.0 and offer a dependency injection container. Phalcon\\Di works as a container of services.</p>\n<p>Services can be registered by the framework itself or the developer. When a component A requires component B (or an instance of its class) to operate, it can request component B from the container, rather than creating a new instance component B.</p>\n<p>Services can&nbsp;be registered&nbsp;in several ways:</p>\n<pre class=\"sh_php\">//Create the Dependency Injector Container\n$di = new Phalcon\\DI();\n\n//By its class name\n$di-&gt;set(\"request\", \"Phalcon\\Http\\Request\");\n\n//Using an anonymous function, the instance will lazy loaded\n$di-&gt;set(\"request\", function(){\n    return new Phalcon\\Http\\Request();\n});\n\n//Registering directly an instance\n$di-&gt;set(\"request\", new Phalcon\\Http\\Request());\n\n//Using an array definition\n$di-&gt;set(\"request\", array(\n    \"className\" =&gt; \"Phalcon\\Http\\Request\"\n));\n</pre>\n<p>In the above example, when the framework needs to access the request data, it will ask for the service identified as &lsquo;request&rsquo; in the container. The container in turn will return an instance of the required service. A developer might eventually replace the Phalcon\\Http\\Request component bundled with one provided by another vendor or created by the developer him/herself.</p>\n<p>Each of the methods (demonstrated in the above example) used to set/register a service has advantages and disadvantages. It is up to the developer and the particular requirements that will designate which one is used.&nbsp;</p>\n<p>Setting a service by a string is simple but lacks flexibility. Setting services using an array offers a lot more flexibility but makes the code more complicated. The lambda function is a good balance between the two but could lead to more maintenance than one would expect.</p>\n<p>Phalcon\\Di offers lazy loading for every service it stores. Unless the developer chooses to instantiate an object directly and store it in the container, any object stored in it (via array, string etc.) will be lazy loaded i.e. instantiated only when requested.</p>\n<pre class=\"sh_php\">//Register a service \"db\" with a class name and its parameters\n$di-&gt;set(\"db\", array(\n    \"className\" =&gt; \"Phalcon\\Db\\Adapter\\Pdo\\Mysql\",\n    \"parameters\" =&gt; array(\n          \"parameter\" =&gt; array(\n               \"host\" =&gt; \"localhost\",\n               \"username\" =&gt; \"root\",\n               \"password\" =&gt; \"secret\",\n               \"dbname\" =&gt; \"blog\"\n          )\n    )\n));\n\n//Using an anonymous function\n$di-&gt;set(\"db\", function(){\n    return new Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n         \"host\" =&gt; \"localhost\",\n         \"username\" =&gt; \"root\",\n         \"password\" =&gt; \"secret\",\n         \"dbname\" =&gt; \"blog\"\n    ));\n});\n</pre>\n<p>Both service registrations above produce the same result. The array definition however, allows for alteration of the service parameters if needed:</p>\n<pre class=\"sh_php\">$di-&gt;setParameter(\"db\", 0, array(\n    \"host\" =&gt; \"localhost\",\n    \"username\" =&gt; \"root\",\n    \"password\" =&gt; \"secret\"\n));\n</pre>\n<p>Obtaining a service from the container is a matter of simply calling the &ldquo;get&rdquo; method. A new instance of the service will be returned:</p>\n<pre class=\"sh_php\">$request = $di-&gt;get(\"request\");\n</pre>\n<p><span><span>Phalcon\\Di also allows for services to be reusable. To get a service previously instantiated the getShared() method can be used. Specifically for the Phalcon\\Http\\Request example shown above:</span></span></p>\n<pre class=\"sh_php\">$request = $di-&gt;getShared(\"request\");\n</pre>\n<p><strong>Conclusion</strong></p>\n<p>This has been one of the most popular requests by the community. Phalcon\\Di allows developers to extend and thoroughly test their code (with mock objects etc.) while keeping the same high performance levels and memory consumption low.</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"29061488806"},"content":"<p>Development in the new version of Phalcon 0.5.0 is well underway. In this new version we are introducing new components for the community to use. In the blog posts to follow, we will explain these new features in length.</p>\n<p>With Phalcon 0.5.0 (still under development) we are introducing a new design pattern called Dependency Injection. In short, objects should not be instantiated inside a class, rather injected using constructors and/or setter methods. This pattern increases testability in the code, thus making it less prone to errors.</p>\n<p><strong>Phalcon\\Di</strong><br>Phalcon\\Di is a new component that will be available in 0.5.0 and offer a dependency injection container. Phalcon\\Di works as a container of services.</p>\n<p>Services can be registered by the framework itself or the developer. When a component A requires component B (or an instance of its class) to operate, it can request component B from the container, rather than creating a new instance component B.</p>\n<p>Services can be registered in several ways:</p>\n<pre class=\"sh_php\">//Create the Dependency Injector Container\n$di = new Phalcon\\DI();\n\n//By its class name\n$di->set(\"request\", \"Phalcon\\Http\\Request\");\n\n//Using an anonymous function, the instance will lazy loaded\n$di->set(\"request\", function(){\n    return new Phalcon\\Http\\Request();\n});\n\n//Registering directly an instance\n$di->set(\"request\", new Phalcon\\Http\\Request());\n\n//Using an array definition\n$di->set(\"request\", array(\n    \"className\" => \"Phalcon\\Http\\Request\"\n));\n</pre>\n<p>In the above example, when the framework needs to access the request data, it will ask for the service identified as ‘request’ in the container. The container in turn will return an instance of the required service. A developer might eventually replace the Phalcon\\Http\\Request component bundled with one provided by another vendor or created by the developer him/herself.</p>\n<p>Each of the methods (demonstrated in the above example) used to set/register a service has advantages and disadvantages. It is up to the developer and the particular requirements that will designate which one is used. </p>\n<p>Setting a service by a string is simple but lacks flexibility. Setting services using an array offers a lot more flexibility but makes the code more complicated. The lambda function is a good balance between the two but could lead to more maintenance than one would expect.</p>\n<p>Phalcon\\Di offers lazy loading for every service it stores. Unless the developer chooses to instantiate an object directly and store it in the container, any object stored in it (via array, string etc.) will be lazy loaded i.e. instantiated only when requested.</p>\n<pre class=\"sh_php\">//Register a service \"db\" with a class name and its parameters\n$di->set(\"db\", array(\n    \"className\" => \"Phalcon\\Db\\Adapter\\Pdo\\Mysql\",\n    \"parameters\" => array(\n          \"parameter\" => array(\n               \"host\" => \"localhost\",\n               \"username\" => \"root\",\n               \"password\" => \"secret\",\n               \"dbname\" => \"blog\"\n          )\n    )\n));\n\n//Using an anonymous function\n$di->set(\"db\", function(){\n    return new Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\n         \"host\" => \"localhost\",\n         \"username\" => \"root\",\n         \"password\" => \"secret\",\n         \"dbname\" => \"blog\"\n    ));\n});\n</pre>\n<p>Both service registrations above produce the same result. The array definition however, allows for alteration of the service parameters if needed:</p>\n<pre class=\"sh_php\">$di->setParameter(\"db\", 0, array(\n    \"host\" => \"localhost\",\n    \"username\" => \"root\",\n    \"password\" => \"secret\"\n));\n</pre>\n<p>Obtaining a service from the container is a matter of simply calling the “get” method. A new instance of the service will be returned:</p>\n<pre class=\"sh_php\">$request = $di->get(\"request\");\n</pre>\n<p><span><span>Phalcon\\Di also allows for services to be reusable. To get a service previously instantiated the getShared() method can be used. Specifically for the Phalcon\\Http\\Request example shown above:</span></span></p>\n<pre class=\"sh_php\">$request = $di->getShared(\"request\");\n</pre>\n<p><strong>Conclusion</strong></p>\n<p>This has been one of the most popular requests by the community. Phalcon\\Di allows developers to extend and thoroughly test their code (with mock objects etc.) while keeping the same high performance levels and memory consumption low.</p>","content_raw":"<p>Development in the new version of Phalcon 0.5.0 is well underway. In this new version we are introducing new components for the community to use. In the blog posts to follow, we will explain these new features in length.</p>\r\n<p>With Phalcon 0.5.0 (still under development) we are introducing a new design pattern called Dependency Injection. In short, objects should not be instantiated inside a class, rather injected using constructors and/or setter methods. This pattern increases testability in the code, thus making it less prone to errors.</p>\r\n<p><strong>Phalcon\\Di</strong><br>Phalcon\\Di is a new component that will be available in 0.5.0 and offer a dependency injection container. Phalcon\\Di works as a container of services.</p>\r\n<p>Services can be registered by the framework itself or the developer. When a component A requires component B (or an instance of its class) to operate, it can request component B from the container, rather than creating a new instance component B.</p>\r\n<p>Services can&nbsp;be registered&nbsp;in several ways:</p>\r\n<pre class=\"sh_php\">//Create the Dependency Injector Container\r\n$di = new Phalcon\\DI();\r\n\r\n//By its class name\r\n$di-&gt;set(\"request\", \"Phalcon\\Http\\Request\");\r\n\r\n//Using an anonymous function, the instance will lazy loaded\r\n$di-&gt;set(\"request\", function(){\r\n    return new Phalcon\\Http\\Request();\r\n});\r\n\r\n//Registering directly an instance\r\n$di-&gt;set(\"request\", new Phalcon\\Http\\Request());\r\n\r\n//Using an array definition\r\n$di-&gt;set(\"request\", array(\r\n    \"className\" =&gt; \"Phalcon\\Http\\Request\"\r\n));\r\n</pre>\r\n<p>In the above example, when the framework needs to access the request data, it will ask for the service identified as 'request' in the container. The container in turn will return an instance of the required service. A developer might eventually replace the Phalcon\\Http\\Request component bundled with one provided by another vendor or created by the developer him/herself.</p>\r\n<p>Each of the methods (demonstrated in the above example) used to set/register a service has advantages and disadvantages. It is up to the developer and the particular requirements that will designate which one is used.&nbsp;</p>\r\n<p>Setting a service by a string is simple but lacks flexibility. Setting services using an array offers a lot more flexibility but makes the code more complicated. The lambda function is a good balance between the two but could lead to more maintenance than one would expect.</p>\r\n<p>Phalcon\\Di offers lazy loading for every service it stores. Unless the developer chooses to instantiate an object directly and store it in the container, any object stored in it (via array, string etc.) will be lazy loaded i.e. instantiated only when requested.</p>\r\n<pre class=\"sh_php\">//Register a service \"db\" with a class name and its parameters\r\n$di-&gt;set(\"db\", array(\r\n    \"className\" =&gt; \"Phalcon\\Db\\Adapter\\Pdo\\Mysql\",\r\n    \"parameters\" =&gt; array(\r\n          \"parameter\" =&gt; array(\r\n               \"host\" =&gt; \"localhost\",\r\n               \"username\" =&gt; \"root\",\r\n               \"password\" =&gt; \"secret\",\r\n               \"dbname\" =&gt; \"blog\"\r\n          )\r\n    )\r\n));\r\n\r\n//Using an anonymous function\r\n$di-&gt;set(\"db\", function(){\r\n    return new Phalcon\\Db\\Adapter\\Pdo\\Mysql(array(\r\n         \"host\" =&gt; \"localhost\",\r\n         \"username\" =&gt; \"root\",\r\n         \"password\" =&gt; \"secret\",\r\n         \"dbname\" =&gt; \"blog\"\r\n    ));\r\n});\r\n</pre>\r\n<p>Both service registrations above produce the same result. The array definition however, allows for alteration of the service parameters if needed:</p>\r\n<pre class=\"sh_php\">$di-&gt;setParameter(\"db\", 0, array(\r\n    \"host\" =&gt; \"localhost\",\r\n    \"username\" =&gt; \"root\",\r\n    \"password\" =&gt; \"secret\"\r\n));\r\n</pre>\r\n<p>Obtaining a service from the container is a matter of simply calling the \"get\" method. A new instance of the service will be returned:</p>\r\n<pre class=\"sh_php\">$request = $di-&gt;get(\"request\");\r\n</pre>\r\n<p><span><span>Phalcon\\Di also allows for services to be reusable. To get a service previously instantiated the getShared() method can be used. Specifically for the Phalcon\\Http\\Request example shown above:</span></span></p>\r\n<pre class=\"sh_php\">$request = $di-&gt;getShared(\"request\");\r\n</pre>\r\n<p><strong>Conclusion</strong></p>\r\n<p>This has been one of the most popular requests by the community. Phalcon\\Di allows developers to extend and thoroughly test their code (with mock objects etc.) while keeping the same high performance levels and memory consumption low.</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-08-09
-->


Introduction Series 1: Phalcon's Dependency Injector
====================================================

Development in the new version of Phalcon 0.5.0 is well underway. In
this new version we are introducing new components for the community to
use. In the blog posts to follow, we will explain these new features in
length.

With Phalcon 0.5.0 (still under development) we are introducing a new
design pattern called Dependency Injection. In short, objects should not
be instantiated inside a class, rather injected using constructors
and/or setter methods. This pattern increases testability in the code,
thus making it less prone to errors.

**Phalcon\\Di**\
Phalcon\\Di is a new component that will be available in 0.5.0 and offer
a dependency injection container. Phalcon\\Di works as a container of
services.

Services can be registered by the framework itself or the developer.
When a component A requires component B (or an instance of its class) to
operate, it can request component B from the container, rather than
creating a new instance component B.

Services can be registered in several ways:

~~~~ {.sh_php}
//Create the Dependency Injector Container
$di = new Phalcon\DI();

//By its class name
$di->set("request", "Phalcon\Http\Request");

//Using an anonymous function, the instance will lazy loaded
$di->set("request", function(){
    return new Phalcon\Http\Request();
});

//Registering directly an instance
$di->set("request", new Phalcon\Http\Request());

//Using an array definition
$di->set("request", array(
    "className" => "Phalcon\Http\Request"
));
~~~~

In the above example, when the framework needs to access the request
data, it will ask for the service identified as ‘request’ in the
container. The container in turn will return an instance of the required
service. A developer might eventually replace the Phalcon\\Http\\Request
component bundled with one provided by another vendor or created by the
developer him/herself.

Each of the methods (demonstrated in the above example) used to
set/register a service has advantages and disadvantages. It is up to the
developer and the particular requirements that will designate which one
is used. 

Setting a service by a string is simple but lacks flexibility. Setting
services using an array offers a lot more flexibility but makes the code
more complicated. The lambda function is a good balance between the two
but could lead to more maintenance than one would expect.

Phalcon\\Di offers lazy loading for every service it stores. Unless the
developer chooses to instantiate an object directly and store it in the
container, any object stored in it (via array, string etc.) will be lazy
loaded i.e. instantiated only when requested.

~~~~ {.sh_php}
//Register a service "db" with a class name and its parameters
$di->set("db", array(
    "className" => "Phalcon\Db\Adapter\Pdo\Mysql",
    "parameters" => array(
          "parameter" => array(
               "host" => "localhost",
               "username" => "root",
               "password" => "secret",
               "dbname" => "blog"
          )
    )
));

//Using an anonymous function
$di->set("db", function(){
    return new Phalcon\Db\Adapter\Pdo\Mysql(array(
         "host" => "localhost",
         "username" => "root",
         "password" => "secret",
         "dbname" => "blog"
    ));
});
~~~~

Both service registrations above produce the same result. The array
definition however, allows for alteration of the service parameters if
needed:

~~~~ {.sh_php}
$di->setParameter("db", 0, array(
    "host" => "localhost",
    "username" => "root",
    "password" => "secret"
));
~~~~

Obtaining a service from the container is a matter of simply calling the
“get” method. A new instance of the service will be returned:

~~~~ {.sh_php}
$request = $di->get("request");
~~~~

Phalcon\\Di also allows for services to be reusable. To get a service
previously instantiated the getShared() method can be used. Specifically
for the Phalcon\\Http\\Request example shown above:

~~~~ {.sh_php}
$request = $di->getShared("request");
~~~~

**Conclusion**

This has been one of the most popular requests by the community.
Phalcon\\Di allows developers to extend and thoroughly test their code
(with mock objects etc.) while keeping the same high performance levels
and memory consumption low.

