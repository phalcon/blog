<!--
slug: phalcon-1-2-beta-1-released
date: Tue Jun 18 2013 13:17:00 GMT-0400 (EDT)
tags: php, mvc, sql, frameworks
title: Phalcon 1.2 beta 1 released! 
id: 53287669607
link: http://blog.phalconphp.com/post/53287669607/phalcon-1-2-beta-1-released
raw: {"blog_name":"phalconphp","id":53287669607,"post_url":"http://blog.phalconphp.com/post/53287669607/phalcon-1-2-beta-1-released","slug":"phalcon-1-2-beta-1-released","type":"text","date":"2013-06-18 17:17:00 GMT","timestamp":1371575820,"state":"published","format":"html","reblog_key":"MiPOKnuA","tags":["php","mvc","sql","frameworks"],"short_url":"http://tmblr.co/Z6PumvneCKzd","highlighted":[],"note_count":1,"title":"Phalcon 1.2 beta 1 released! ","body":"<p><span>We are happy to announce the release of our first beta of Phalcon 1.2​!</span></p>\n<p>In this version we have introduced several new features and performance improvements. The intend of this beta release is get input from the community, test the new functionality making sure everything works fine once production environments are updated to 1.2.</p>\n<p>This post is extensive but we have a lot of new features, so bare with us!</p>\n<h3>Dynamic compile path in Volt</h3>\n<p>Now &lsquo;compiledPath&rsquo; option in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a> accepts a closure allowing the developer to dynamically create the compilation path for templates:</p>\n<pre class=\"sh_php sh_sourceCode\">// Just append the .php extension to the template path\n$volt-&gt;setOptions([\n    'compiledPath' =&gt; function($templatePath) {\t\t\n            return $templatePath . '.php';\n    }\n]);\n\n// ​ ​Recursively create the same structure in another directory\n$volt-&gt;setOptions([\n        'compiledPath' =&gt; function($templatePath) {\n               $dirName = dirname($templatePath);\n               if (!is_dir(CACHE_DIR . $dirName)) {\n                      mkdir(CACHE_DIR . $dirName);\n               }\n               return CACHE_DIR . $dirName . '/'. $templatePath . '.php';\n\t}\n]);\n</pre>\n<h3>Volt extensions</h3>\n<p>With extensions the developer has more flexibility to extend the template engine, and override the compilation of a​ specific instruction, change the behavior of an expression or operator, add functions/filters, and more. The class below allows to use any PHP function in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a>:</p>\n<pre class=\"sh_php sh_sourceCode\">class PhpFunctionExtension\n{\n    public function compileFunction($name, $arguments)\n    {\n          if (function_exists($name)) {\n              return $name . '('. $arguments . ')';\n          }          \n    }\n}\n</pre>\n<p>Load the extension in Volt:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt-&gt;getCompiler()-&gt;addExtension(new PHPFunctionExtension());\n</pre>\n<h3>Phalcon\\Mvc\\Url static/dynamic paths</h3>\n<p>With this separation ​the developer can change the base uri for static resources and define a different one for dynamic resources. This is particularly handy if a CDN or a different domain serving static resources​ are used:</p>\n<pre class=\"sh_php sh_sourceCode\">$di['url'] = function () {\n\t$url = new Phalcon\\Mvc\\Url();\n\n\t// ​ ​Dynamic URIs without mod-rewrite\n\t$url-&gt;setBaseUri('/index.php?_url=');\n\n\t// ​ ​Static URI for CSS/Javascript/Images\n\t$url-&gt;setStaticUri('/static/');\n\n\treturn $url;\n};\n</pre>\n<h3>Phalcon\\Mvc\\View\\Simple</h3>\n<p>This component is an alternative component similar to Phalcon\\Mvc\\View but lacks of a render hierarchy. It is particularly useful for <a href=\"http://docs.phalconphp.com/en/latest/reference/micro.html\">micro applications</a> or obtaining​ the content of an arbitrary view as an string. Due to the lack of the rendering hierarchy it&rsquo;s more suitable to be used together with the <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html#template-inheritance\">template inheritance</a> provided by Volt.</p>\n<pre class=\"sh_php sh_sourceCode\">// ​ ​View service\n$di['view'] = function () {\n\n\t$view = new Phalcon\\Mvc\\View\\Simple();\n\n\t$view-&gt;setViewsDir(APP_PATH . '/views/');\n\n\treturn $view;\n};\n</pre>\n<p>Using in micro-apps:</p>\n<pre class=\"sh_php sh_sourceCode\">$app-&gt;map('/login', function () use ($app) {\n\n\techo $app-&gt;view-&gt;render('security/login', array(\n\t\t'form' =&gt; new LoginForm(),\t\t\n\t));\n\n});\n</pre>\n<p>It supports multiple render engines and also have automatic caching capabilities.</p>\n<h3>Improved support for JSON</h3>\n<p>Now it&rsquo;s easier get input as JSON and return responses in the same format. ​Returned instances of <a href=\"http://docs.phalconphp.com/en/latest/reference/response.html\">Phalcon\\Http\\Response</a> in micro applications are automatically sent by the application:</p>\n<pre class=\"sh_php sh_sourceCode\">$app-&gt;post('/api/robots', function () use ($app) {\n\n    $data = $app-&gt;request-&gt;getJsonRawBody();\n\n    $robot = new Robots();\n    $robot-&gt;name = $data-&gt;name;\n    $robot-&gt;type = $data-&gt;type;        \n\n    $response = new Phalcon\\Http\\Response();\n\n    //Check if the insertion was successful\n    if ($robot-&gt;success() == true) {\n\n        $response-&gt;setJsonContent([\n        \t'status' =&gt; 'OK', \n        \t'id' =&gt; $robot-&gt;id\n        ]);\n\n    } else {\n\n        //Change the HTTP status\n        $response-&gt;setStatusCode(500, \"Internal Error\");\n\n        $response-&gt;setJsonContent([\n        \t'status' =&gt; 'ERROR', \n        \t'messages' =&gt; $status-&gt;getMessages()\n        ]);\n\n    }\n\n    return $response;\n});\n</pre>\n<h3>Support for Many-To-Many in the ORM</h3>\n<p>Finally Many-to-Many relations are supported in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>! Direct relationships between two models using an intermediate model can now be defined:</p>\n<pre class=\"sh_php sh_sourceCode\">class Artists extends Phalcon\\Mvc\\Model\n{\n\tpublic $id;\n\n\tpublic $name;\n\n\tpublic function initialize()\n\t{\n\t\t$this-&gt;hasManyToMany(\n\t\t\t'id', \n\t\t\t'ArtistsSongs', \n\t\t\t'artists_id', 'songs_id', \n\t\t\t'Songs', \n\t\t\t'id'\n\t\t);\n\t}\n}\n</pre>\n<p>​<span>The songs from an artist can be retrieved by accessing the relationship alias:</span></p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\n\n//Get all artist's songs\nforeach ($artist-&gt;songs as $song) {\n\techo $song-&gt;name;\n}\n</pre>\n<p>Many-to-Many relations can be joined in PHQL:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = 'SELECT Artists.name, Songs.name FROM Artists JOIN Songs WHERE Artists.genre = \"Trip-Hop\"';\n$result = $this-&gt;modelsManager-&gt;query($phql);\n</pre>\n<p>Many-to-Many related instances can be directly added to a model, the intermediate instances are automatically created in the sav​e process:</p>\n<pre class=\"sh_php sh_sourceCode\">$songs = array()\n\n$song = new Song();\n$song-&gt;name = 'Get Lucky';\n$songs[] = $song;\n\n$song = new Song();\n$song-&gt;name = 'Instant Crush';\n$songs[] = $song;\n\n$artist = new Artists();\n$artist-&gt;name = 'Daft Punk';\n$artist-&gt;songs = $songs; //Assign the n-m relation\n$artist-&gt;save();\n</pre>\n<h3>Cascade/Restrict actions in Virtual Foreign Keys</h3>\n<p>​<span><a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#virtual-foreign-keys\">Virtual foreign keys</a> can ​now be set up to delete all the referenced records if the master record is deleted:</span></p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\n\tPhalcon\\Mvc\\Model\\Relation;\n\nclass Artists extends Model\n{\n\n\tpublic $id;\n\n\tpublic $name;\n\n\tpublic function initialize()\n\t{\n\t\t$this-&gt;hasMany('id', 'Songs', 'artists_id', [\n\t\t\t'foreignKey' =&gt; [\n\t\t\t\t'action' =&gt; Relation::ACTION_CASCADE \n\t\t\t]\n\t\t]);\n\t}\n\n}\n</pre>\n<p>When a record in Artists is deleted all the related songs are deleted too:</p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\n\n$artist-&gt;delete(); // Deleting also its songs\n</pre>\n<h3>Assets Minification</h3>\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/assets.html\">Phalcon\\Assets</a> provides built-in minification of Javascript and CSS resources. The developer can create a collection of resources instructing the Assets Manager which ones must be filtered and which ones must be​left as they are. In addition to the above, <a href=\"https://github.com/douglascrockford/JSMin/blob/master/jsmin.c\">Jsmin</a> by Douglas Crockford is now part of the extension offering minification of javascript files for maximum performance. In the CSS land, <a href=\"https://github.com/soldair/cssmin/blob/master/cssmin.c\">CSSMin</a> by Ryan Day is also available to minify css files.</p>\n<pre class=\"sh_php sh_sourceCode\">$manager = new Phalcon\\Assets\\Manager(array(\n\t'sourceBasePath' =&gt; './js/',\n\t'targetBasePath' =&gt; './js/production/'\n));\n\n$manager\n\n\t//These Javascripts are located in the page's bottom\n\t-&gt;collection('jsFooter')\n\n\t//The name of the final output\n\t-&gt;setTargetPath('final.js')\n\n\t//The script tag is generated with this URI\n\t-&gt;setTargetUri('production/final.js')\n\n\t//This a remote resource that does not need filtering\n\t-&gt;addJs('code.jquery.com/jquery-1.10.0.min.js', true, false)\n\n\t//These are local resources that must be filtered\n\t-&gt;addJs('common-functions.js')\n\t-&gt;addJs('page-functions.js')\n\n\t//Join all the resources in a single file\n\t-&gt;join(true)\n\n\t//Use the built-in Jsmin filter\n\t-&gt;addFilter(new Phalcon\\Assets\\Filters\\Jsmin())\n\n\t//Use a custom filter\n\t-&gt;addFilter(new MyApp\\Assets\\Filters\\LicenseStamper());\n\n$manager-&gt;outputJs();\n</pre>\n<p>This component still needs a bit more of work​,​ adding caching, versioning and detection ​of changes to reduce processing. These changes will be available in the next beta.</p>\n<h3>Disallow literals in PHQL</h3>\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a> provides a set of features that aids the developer to secure his/her applications. Comparing to straight SQL, PHQL now has a new feature that increases even more security, thus avoiding a large number of potential <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injection</a> scenarios. The developer can now disable literals in PHQL. This means that directly using strings, numbers and boolean values in PHQL strings will be disallowed. If by mistake a developer​ writes:</p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst(\"name = '$name'\");\n</pre>\n<p><span>An exception will be thrown forcing the developer to use bound parameters.</span></p>\n<h3>Own Scope for Partials</h3>\n<p>​<span>A developer can now pass an array of variables to a <a href=\"http://docs.phalconphp.com/en/latest/reference/views.html#using-partials\">partial</a> that only exists in the scope of the partial:</span></p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php $this-&gt;partial('footer', ['links' =&gt; $myLinks]);\n</pre>\n<p>In Volt:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ partial('footer', ['links': myLinks]) }}\n{% include 'footer' with ['links': myLinks] %}\n</pre>\n<h3>Use Phalcon\\Tag as Service</h3>\n<p>Phalcon\\Tag is now a service in DI\\FactoryDefault​. So instead of doing this:</p>\n<pre class=\"sh_php sh_sourceCode\">Phalcon\\Tag::setDefault('name', $robot-&gt;name);\n</pre>\n<p>You can ​do one better and write:</p>\n<pre class=\"sh_php sh_sourceCode\">$this-&gt;tag-&gt;setDefault('name', $robot-&gt;name);\n</pre>\n<p>From now both syntax&rsquo;s are supported, but in further releases, the former will be deprecated. ​ There will be ample time for developers to migrate their applications to the new format. Using Phalcon\\Tag as a service allow​s the developer to extend the component without affecting application stability.</p>\n<h3>Macros in Volt</h3>\n<p>Initial support for macros in Volt is implemented in this version:</p>\n<pre class=\"sh_php sh_sourceCode\">{%- macro input_text(name, attributes=null) -%}\n {{- '&lt;input type=\"' ~ name ~ '\" ' -}}\n {%- for key, value in attributes -%}\n    {{- key ~ '=\"' ~ value|e '\"' -}}\n {%- endfor -%}\n {{- '/&gt;' -}}\n{%- endmacro -%}\n\n{{ input_text(\"telephone\", ['placeholder': 'Type telephone']) }}\n</pre>\n<h3>BadMethodCallException instead of warnings</h3>\n<p>Before 1.1.0 if a wrong number of parameters was passed to a method a warning was raised. Starting from 1.2.0 BadMethodCallException exceptions will be thrown so you can see a complete trace ​ where the problem is generated.</p>\n<pre class=\"sh_php sh_sourceCode\">$e = new Phalcon\\Escaper();\n$e-&gt;escapeCss('a {}', 1, 2, 3);\n</pre>\n<p>Shows:</p>\n<pre class=\"sh_php sh_sourceCode\">Fatal error: Uncaught exception 'BadMethodCallException' with message 'Wrong number of parameters' in test.php:4\nStack trace:\n#0 test.php(4): Phalcon\\Escaper-&gt;escapeCss('a {}', 1, 2, 3)\n#1 {main}\n</pre>\n<h3>Debug Component</h3>\n<p>Phalcon\\Debug ​offers the call stack to the developer, with a pretty presentation format. This helps with debugging and identifying errors.</p>\n<p>To use this component just remove any try/catch from your bootstrap. Add the following at the beginning of ​your script:</p>\n<pre class=\"sh_php sh_sourceCode\">(new Phalcon\\Debug)-&gt;listen();\n</pre>\n<p>A backtrace like this is showed when an exception is generated:</p>\n<div align=\"center\">\n<p><iframe frameborder=\"0\" height=\"313\" src=\"http://player.vimeo.com/video/68893840\" width=\"500\"></iframe></p>\n</div>\n\n<p>1.2.0 includes other minor changes, bug fixes, stability and performance improvements.​The complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.2.0/CHANGELOG\">CHANGELOG</a>​ is​ here.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.2.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.2.0\nsudo ./install\n</pre>\n<p>Windows users can download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a>.</p>\n<p>We welcome your comments regarding this new release in <a href=\"http://forum.phalconphp.com/\">Phosphorum</a> and <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\n<p>Thanks!</p>","reblog":{"tree_html":"","comment":"<p><span>We are happy to announce the release of our first beta of Phalcon 1.2&#8203;!</span></p>\n<p>In this version we have introduced several new features and performance improvements. The intend of this beta release is get input from the community, test the new functionality making sure everything works fine once production environments are updated to 1.2.</p>\n<p>This post is extensive but we have a lot of new features, so bare with us!</p>\n<h3>Dynamic compile path in Volt</h3>\n<p>Now &lsquo;compiledPath&rsquo; option in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a> accepts a closure allowing the developer to dynamically create the compilation path for templates:</p>\n<pre class=\"sh_php sh_sourceCode\">// Just append the .php extension to the template path\n$volt-&gt;setOptions([\n    'compiledPath' =&gt; function($templatePath) {\t\t\n            return $templatePath . '.php';\n    }\n]);\n\n// &#8203; &#8203;Recursively create the same structure in another directory\n$volt-&gt;setOptions([\n        'compiledPath' =&gt; function($templatePath) {\n               $dirName = dirname($templatePath);\n               if (!is_dir(CACHE_DIR . $dirName)) {\n                      mkdir(CACHE_DIR . $dirName);\n               }\n               return CACHE_DIR . $dirName . '/'. $templatePath . '.php';\n\t}\n]);\n</pre>\n<h3>Volt extensions</h3>\n<p>With extensions the developer has more flexibility to extend the template engine, and override the compilation of a&#8203; specific instruction, change the behavior of an expression or operator, add functions/filters, and more. The class below allows to use any PHP function in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a>:</p>\n<pre class=\"sh_php sh_sourceCode\">class PhpFunctionExtension\n{\n    public function compileFunction($name, $arguments)\n    {\n          if (function_exists($name)) {\n              return $name . '('. $arguments . ')';\n          }          \n    }\n}\n</pre>\n<p>Load the extension in Volt:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt-&gt;getCompiler()-&gt;addExtension(new PHPFunctionExtension());\n</pre>\n<h3>Phalcon\\Mvc\\Url static/dynamic paths</h3>\n<p>With this separation &#8203;the developer can change the base uri for static resources and define a different one for dynamic resources. This is particularly handy if a CDN or a different domain serving static resources&#8203; are used:</p>\n<pre class=\"sh_php sh_sourceCode\">$di['url'] = function () {\n\t$url = new Phalcon\\Mvc\\Url();\n\n\t// &#8203; &#8203;Dynamic URIs without mod-rewrite\n\t$url-&gt;setBaseUri('/index.php?_url=');\n\n\t// &#8203; &#8203;Static URI for CSS/Javascript/Images\n\t$url-&gt;setStaticUri('/static/');\n\n\treturn $url;\n};\n</pre>\n<h3>Phalcon\\Mvc\\View\\Simple</h3>\n<p>This component is an alternative component similar to Phalcon\\Mvc\\View but lacks of a render hierarchy. It is particularly useful for <a href=\"http://docs.phalconphp.com/en/latest/reference/micro.html\">micro applications</a>&nbsp;or&nbsp;obtaining&#8203; the content of an arbitrary view as an string. Due to the lack of the rendering hierarchy it&rsquo;s more suitable to be used together with the <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html#template-inheritance\">template inheritance</a> provided by Volt.</p>\n<pre class=\"sh_php sh_sourceCode\">// &#8203; &#8203;View service\n$di['view'] = function () {\n\n\t$view = new Phalcon\\Mvc\\View\\Simple();\n\n\t$view-&gt;setViewsDir(APP_PATH . '/views/');\n\n\treturn $view;\n};\n</pre>\n<p>Using in micro-apps:</p>\n<pre class=\"sh_php sh_sourceCode\">$app-&gt;map('/login', function () use ($app) {\n\n\techo $app-&gt;view-&gt;render('security/login', array(\n\t\t'form' =&gt; new LoginForm(),\t\t\n\t));\n\n});\n</pre>\n<p>It supports multiple render engines and also have automatic caching capabilities.</p>\n<h3>Improved support for JSON</h3>\n<p>Now it&rsquo;s easier get input as JSON and return responses in the same format. &#8203;Returned instances of <a href=\"http://docs.phalconphp.com/en/latest/reference/response.html\">Phalcon\\Http\\Response</a> in micro applications are automatically sent by the application:</p>\n<pre class=\"sh_php sh_sourceCode\">$app-&gt;post('/api/robots', function () use ($app) {\n\n    $data = $app-&gt;request-&gt;getJsonRawBody();\n\n    $robot = new Robots();\n    $robot-&gt;name = $data-&gt;name;\n    $robot-&gt;type = $data-&gt;type;        \n\n    $response = new Phalcon\\Http\\Response();\n\n    //Check if the insertion was successful\n    if ($robot-&gt;success() == true) {\n\n        $response-&gt;setJsonContent([\n        \t'status' =&gt; 'OK', \n        \t'id' =&gt; $robot-&gt;id\n        ]);\n\n    } else {\n\n        //Change the HTTP status\n        $response-&gt;setStatusCode(500, \"Internal Error\");\n\n        $response-&gt;setJsonContent([\n        \t'status' =&gt; 'ERROR', \n        \t'messages' =&gt; $status-&gt;getMessages()\n        ]);\n\n    }\n\n    return $response;\n});\n</pre>\n<h3>Support for Many-To-Many in the ORM</h3>\n<p>Finally Many-to-Many relations are supported in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>! Direct relationships between two models using an intermediate model can now be defined:</p>\n<pre class=\"sh_php sh_sourceCode\">class Artists extends Phalcon\\Mvc\\Model\n{\n\tpublic $id;\n\n\tpublic $name;\n\n\tpublic function initialize()\n\t{\n\t\t$this-&gt;hasManyToMany(\n\t\t\t'id', \n\t\t\t'ArtistsSongs', \n\t\t\t'artists_id', 'songs_id', \n\t\t\t'Songs', \n\t\t\t'id'\n\t\t);\n\t}\n}\n</pre>\n<p>&#8203;<span>The songs from an artist can be retrieved by accessing the relationship alias:</span></p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\n\n//Get all artist's songs\nforeach ($artist-&gt;songs as $song) {\n\techo $song-&gt;name;\n}\n</pre>\n<p>Many-to-Many relations can be joined in PHQL:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = 'SELECT Artists.name, Songs.name FROM Artists JOIN Songs WHERE Artists.genre = \"Trip-Hop\"';\n$result = $this-&gt;modelsManager-&gt;query($phql);\n</pre>\n<p>Many-to-Many related instances can be directly added to a model, the intermediate instances are automatically created in the sav&#8203;e process:</p>\n<pre class=\"sh_php sh_sourceCode\">$songs = array()\n\n$song = new Song();\n$song-&gt;name = 'Get Lucky';\n$songs[] = $song;\n\n$song = new Song();\n$song-&gt;name = 'Instant Crush';\n$songs[] = $song;\n\n$artist = new Artists();\n$artist-&gt;name = 'Daft Punk';\n$artist-&gt;songs = $songs; //Assign the n-m relation\n$artist-&gt;save();\n</pre>\n<h3>Cascade/Restrict actions in Virtual Foreign Keys</h3>\n<p>&#8203;<span><a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#virtual-foreign-keys\">Virtual foreign keys</a> can &#8203;now be set up to delete all the referenced records if the master record is deleted:</span></p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\n\tPhalcon\\Mvc\\Model\\Relation;\n\nclass Artists extends Model\n{\n\n\tpublic $id;\n\n\tpublic $name;\n\n\tpublic function initialize()\n\t{\n\t\t$this-&gt;hasMany('id', 'Songs', 'artists_id', [\n\t\t\t'foreignKey' =&gt; [\n\t\t\t\t'action' =&gt; Relation::ACTION_CASCADE \n\t\t\t]\n\t\t]);\n\t}\n\n}\n</pre>\n<p>When a record in Artists is deleted all the related songs are deleted too:</p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\n\n$artist-&gt;delete(); // Deleting also its songs\n</pre>\n<h3>Assets Minification</h3>\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/assets.html\">Phalcon\\Assets</a> provides built-in minification of Javascript and CSS resources. The developer can create a collection of resources instructing the Assets Manager which ones must be filtered and which ones must be&#8203;left as they are. In addition to the above, <a href=\"https://github.com/douglascrockford/JSMin/blob/master/jsmin.c\">Jsmin</a> by Douglas Crockford is now part of the extension offering minification of javascript files for maximum performance. In the CSS land, <a href=\"https://github.com/soldair/cssmin/blob/master/cssmin.c\">CSSMin</a> by Ryan Day is also available to minify css files.</p>\n<pre class=\"sh_php sh_sourceCode\">$manager = new Phalcon\\Assets\\Manager(array(\n\t'sourceBasePath' =&gt; './js/',\n\t'targetBasePath' =&gt; './js/production/'\n));\n\n$manager\n\n\t//These Javascripts are located in the page's bottom\n\t-&gt;collection('jsFooter')\n\n\t//The name of the final output\n\t-&gt;setTargetPath('final.js')\n\n\t//The script tag is generated with this URI\n\t-&gt;setTargetUri('production/final.js')\n\n\t//This a remote resource that does not need filtering\n\t-&gt;addJs('code.jquery.com/jquery-1.10.0.min.js', true, false)\n\n\t//These are local resources that must be filtered\n\t-&gt;addJs('common-functions.js')\n\t-&gt;addJs('page-functions.js')\n\n\t//Join all the resources in a single file\n\t-&gt;join(true)\n\n\t//Use the built-in Jsmin filter\n\t-&gt;addFilter(new Phalcon\\Assets\\Filters\\Jsmin())\n\n\t//Use a custom filter\n\t-&gt;addFilter(new MyApp\\Assets\\Filters\\LicenseStamper());\n\n$manager-&gt;outputJs();\n</pre>\n<p>This component still needs a bit more of work&#8203;,&#8203; adding caching, versioning and detection &#8203;of changes to reduce processing. These changes will be available in the next beta.</p>\n<h3>Disallow literals in PHQL</h3>\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a> provides a set of features that aids the developer to secure his/her applications. Comparing to straight SQL, PHQL now has a new feature that increases even more security, thus avoiding a large number of potential <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injection</a> scenarios. The developer can now disable literals in PHQL. This means that directly using strings, numbers and boolean values in PHQL strings will be disallowed. If by mistake a developer&#8203; writes:</p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst(\"name = '$name'\");\n</pre>\n<p><span>An exception will be thrown forcing the developer to use bound parameters.</span></p>\n<h3>Own Scope for Partials</h3>\n<p>&#8203;<span>A developer can now pass an array of variables to a <a href=\"http://docs.phalconphp.com/en/latest/reference/views.html#using-partials\">partial</a> that only exists in the scope of the partial:</span></p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php $this-&gt;partial('footer', ['links' =&gt; $myLinks]);\n</pre>\n<p>In Volt:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ partial('footer', ['links': myLinks]) }}\n{% include 'footer' with ['links': myLinks] %}\n</pre>\n<h3>Use Phalcon\\Tag as Service</h3>\n<p>Phalcon\\Tag is now a service in DI\\FactoryDefault&#8203;. So instead of doing this:</p>\n<pre class=\"sh_php sh_sourceCode\">Phalcon\\Tag::setDefault('name', $robot-&gt;name);\n</pre>\n<p>You can &#8203;do one better and write:</p>\n<pre class=\"sh_php sh_sourceCode\">$this-&gt;tag-&gt;setDefault('name', $robot-&gt;name);\n</pre>\n<p>From now both syntax&rsquo;s are supported, but in further releases, the former will be deprecated. &#8203; There will be ample time for developers to migrate their applications to the new format. Using Phalcon\\Tag as a service allow&#8203;s the developer to extend the component without affecting application stability.</p>\n<h3>Macros in Volt</h3>\n<p>Initial support for macros in Volt is implemented in this version:</p>\n<pre class=\"sh_php sh_sourceCode\">{%- macro input_text(name, attributes=null) -%}\n {{- '&lt;input type=\"' ~ name ~ '\" ' -}}\n {%- for key, value in attributes -%}\n    {{- key ~ '=\"' ~ value|e '\"' -}}\n {%- endfor -%}\n {{- '/&gt;' -}}\n{%- endmacro -%}\n\n{{ input_text(\"telephone\", ['placeholder': 'Type telephone']) }}\n</pre>\n<h3>BadMethodCallException instead of warnings</h3>\n<p>Before 1.1.0 if a wrong number of parameters was passed to a method a warning was raised. Starting from 1.2.0 BadMethodCallException exceptions will be thrown so you can see a complete trace &#8203; where the problem is generated.</p>\n<pre class=\"sh_php sh_sourceCode\">$e = new Phalcon\\Escaper();\n$e-&gt;escapeCss('a {}', 1, 2, 3);\n</pre>\n<p>Shows:</p>\n<pre class=\"sh_php sh_sourceCode\">Fatal error: Uncaught exception 'BadMethodCallException' with message 'Wrong number of parameters' in test.php:4\nStack trace:\n#0 test.php(4): Phalcon\\Escaper-&gt;escapeCss('a {}', 1, 2, 3)\n#1 {main}\n</pre>\n<h3>Debug Component</h3>\n<p>Phalcon\\Debug &#8203;offers the call stack to the developer, with a pretty presentation format. This helps with debugging and identifying errors.</p>\n<p>To use this component just remove any try/catch from your bootstrap. Add the following at the beginning of &#8203;your script:</p>\n<pre class=\"sh_php sh_sourceCode\">(new Phalcon\\Debug)-&gt;listen();\n</pre>\n<p>A backtrace like this is showed when an exception is generated:</p>\n<div align=\"center\">\n<p><iframe frameborder=\"0\" height=\"313\" src=\"http://player.vimeo.com/video/68893840\" width=\"500\"></iframe></p>\n</div>\n\n<p>1.2.0 includes other minor changes, bug fixes, stability and performance improvements.&#8203;The complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.2.0/CHANGELOG\">CHANGELOG</a>&#8203; is&#8203; here.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.2.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.2.0\nsudo ./install\n</pre>\n<p>Windows users can download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a>.</p>\n<p>We welcome your comments regarding this new release in <a href=\"http://forum.phalconphp.com/\">Phosphorum</a> and <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\n<p>Thanks!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"53287669607"},"content":"<p><span>We are happy to announce the release of our first beta of Phalcon 1.2​!</span></p>\n<p>In this version we have introduced several new features and performance improvements. The intend of this beta release is get input from the community, test the new functionality making sure everything works fine once production environments are updated to 1.2.</p>\n<p>This post is extensive but we have a lot of new features, so bare with us!</p>\n<h3>Dynamic compile path in Volt</h3>\n<p>Now ‘compiledPath’ option in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a> accepts a closure allowing the developer to dynamically create the compilation path for templates:</p>\n<pre class=\"sh_php sh_sourceCode\">// Just append the .php extension to the template path\n$volt->setOptions([\n    'compiledPath' => function($templatePath) {\t\t\n            return $templatePath . '.php';\n    }\n]);\n\n// ​ ​Recursively create the same structure in another directory\n$volt->setOptions([\n        'compiledPath' => function($templatePath) {\n               $dirName = dirname($templatePath);\n               if (!is_dir(CACHE_DIR . $dirName)) {\n                      mkdir(CACHE_DIR . $dirName);\n               }\n               return CACHE_DIR . $dirName . '/'. $templatePath . '.php';\n\t}\n]);\n</pre>\n<h3>Volt extensions</h3>\n<p>With extensions the developer has more flexibility to extend the template engine, and override the compilation of a​ specific instruction, change the behavior of an expression or operator, add functions/filters, and more. The class below allows to use any PHP function in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a>:</p>\n<pre class=\"sh_php sh_sourceCode\">class PhpFunctionExtension\n{\n    public function compileFunction($name, $arguments)\n    {\n          if (function_exists($name)) {\n              return $name . '('. $arguments . ')';\n          }          \n    }\n}\n</pre>\n<p>Load the extension in Volt:</p>\n<pre class=\"sh_php sh_sourceCode\">$volt->getCompiler()->addExtension(new PHPFunctionExtension());\n</pre>\n<h3>Phalcon\\Mvc\\Url static/dynamic paths</h3>\n<p>With this separation ​the developer can change the base uri for static resources and define a different one for dynamic resources. This is particularly handy if a CDN or a different domain serving static resources​ are used:</p>\n<pre class=\"sh_php sh_sourceCode\">$di['url'] = function () {\n\t$url = new Phalcon\\Mvc\\Url();\n\n\t// ​ ​Dynamic URIs without mod-rewrite\n\t$url->setBaseUri('/index.php?_url=');\n\n\t// ​ ​Static URI for CSS/Javascript/Images\n\t$url->setStaticUri('/static/');\n\n\treturn $url;\n};\n</pre>\n<h3>Phalcon\\Mvc\\View\\Simple</h3>\n<p>This component is an alternative component similar to Phalcon\\Mvc\\View but lacks of a render hierarchy. It is particularly useful for <a href=\"http://docs.phalconphp.com/en/latest/reference/micro.html\">micro applications</a> or obtaining​ the content of an arbitrary view as an string. Due to the lack of the rendering hierarchy it’s more suitable to be used together with the <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html#template-inheritance\">template inheritance</a> provided by Volt.</p>\n<pre class=\"sh_php sh_sourceCode\">// ​ ​View service\n$di['view'] = function () {\n\n\t$view = new Phalcon\\Mvc\\View\\Simple();\n\n\t$view->setViewsDir(APP_PATH . '/views/');\n\n\treturn $view;\n};\n</pre>\n<p>Using in micro-apps:</p>\n<pre class=\"sh_php sh_sourceCode\">$app->map('/login', function () use ($app) {\n\n\techo $app->view->render('security/login', array(\n\t\t'form' => new LoginForm(),\t\t\n\t));\n\n});\n</pre>\n<p>It supports multiple render engines and also have automatic caching capabilities.</p>\n<h3>Improved support for JSON</h3>\n<p>Now it’s easier get input as JSON and return responses in the same format. ​Returned instances of <a href=\"http://docs.phalconphp.com/en/latest/reference/response.html\">Phalcon\\Http\\Response</a> in micro applications are automatically sent by the application:</p>\n<pre class=\"sh_php sh_sourceCode\">$app->post('/api/robots', function () use ($app) {\n\n    $data = $app->request->getJsonRawBody();\n\n    $robot = new Robots();\n    $robot->name = $data->name;\n    $robot->type = $data->type;        \n\n    $response = new Phalcon\\Http\\Response();\n\n    //Check if the insertion was successful\n    if ($robot->success() == true) {\n\n        $response->setJsonContent([\n        \t'status' => 'OK', \n        \t'id' => $robot->id\n        ]);\n\n    } else {\n\n        //Change the HTTP status\n        $response->setStatusCode(500, \"Internal Error\");\n\n        $response->setJsonContent([\n        \t'status' => 'ERROR', \n        \t'messages' => $status->getMessages()\n        ]);\n\n    }\n\n    return $response;\n});\n</pre>\n<h3>Support for Many-To-Many in the ORM</h3>\n<p>Finally Many-to-Many relations are supported in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>! Direct relationships between two models using an intermediate model can now be defined:</p>\n<pre class=\"sh_php sh_sourceCode\">class Artists extends Phalcon\\Mvc\\Model\n{\n\tpublic $id;\n\n\tpublic $name;\n\n\tpublic function initialize()\n\t{\n\t\t$this->hasManyToMany(\n\t\t\t'id', \n\t\t\t'ArtistsSongs', \n\t\t\t'artists_id', 'songs_id', \n\t\t\t'Songs', \n\t\t\t'id'\n\t\t);\n\t}\n}\n</pre>\n<p>​<span>The songs from an artist can be retrieved by accessing the relationship alias:</span></p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\n\n//Get all artist's songs\nforeach ($artist->songs as $song) {\n\techo $song->name;\n}\n</pre>\n<p>Many-to-Many relations can be joined in PHQL:</p>\n<pre class=\"sh_php sh_sourceCode\">$phql = 'SELECT Artists.name, Songs.name FROM Artists JOIN Songs WHERE Artists.genre = \"Trip-Hop\"';\n$result = $this->modelsManager->query($phql);\n</pre>\n<p>Many-to-Many related instances can be directly added to a model, the intermediate instances are automatically created in the sav​e process:</p>\n<pre class=\"sh_php sh_sourceCode\">$songs = array()\n\n$song = new Song();\n$song->name = 'Get Lucky';\n$songs[] = $song;\n\n$song = new Song();\n$song->name = 'Instant Crush';\n$songs[] = $song;\n\n$artist = new Artists();\n$artist->name = 'Daft Punk';\n$artist->songs = $songs; //Assign the n-m relation\n$artist->save();\n</pre>\n<h3>Cascade/Restrict actions in Virtual Foreign Keys</h3>\n<p>​<span><a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#virtual-foreign-keys\">Virtual foreign keys</a> can ​now be set up to delete all the referenced records if the master record is deleted:</span></p>\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\n\tPhalcon\\Mvc\\Model\\Relation;\n\nclass Artists extends Model\n{\n\n\tpublic $id;\n\n\tpublic $name;\n\n\tpublic function initialize()\n\t{\n\t\t$this->hasMany('id', 'Songs', 'artists_id', [\n\t\t\t'foreignKey' => [\n\t\t\t\t'action' => Relation::ACTION_CASCADE \n\t\t\t]\n\t\t]);\n\t}\n\n}\n</pre>\n<p>When a record in Artists is deleted all the related songs are deleted too:</p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\n\n$artist->delete(); // Deleting also its songs\n</pre>\n<h3>Assets Minification</h3>\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/assets.html\">Phalcon\\Assets</a> provides built-in minification of Javascript and CSS resources. The developer can create a collection of resources instructing the Assets Manager which ones must be filtered and which ones must be​left as they are. In addition to the above, <a href=\"https://github.com/douglascrockford/JSMin/blob/master/jsmin.c\">Jsmin</a> by Douglas Crockford is now part of the extension offering minification of javascript files for maximum performance. In the CSS land, <a href=\"https://github.com/soldair/cssmin/blob/master/cssmin.c\">CSSMin</a> by Ryan Day is also available to minify css files.</p>\n<pre class=\"sh_php sh_sourceCode\">$manager = new Phalcon\\Assets\\Manager(array(\n\t'sourceBasePath' => './js/',\n\t'targetBasePath' => './js/production/'\n));\n\n$manager\n\n\t//These Javascripts are located in the page's bottom\n\t->collection('jsFooter')\n\n\t//The name of the final output\n\t->setTargetPath('final.js')\n\n\t//The script tag is generated with this URI\n\t->setTargetUri('production/final.js')\n\n\t//This a remote resource that does not need filtering\n\t->addJs('code.jquery.com/jquery-1.10.0.min.js', true, false)\n\n\t//These are local resources that must be filtered\n\t->addJs('common-functions.js')\n\t->addJs('page-functions.js')\n\n\t//Join all the resources in a single file\n\t->join(true)\n\n\t//Use the built-in Jsmin filter\n\t->addFilter(new Phalcon\\Assets\\Filters\\Jsmin())\n\n\t//Use a custom filter\n\t->addFilter(new MyApp\\Assets\\Filters\\LicenseStamper());\n\n$manager->outputJs();\n</pre>\n<p>This component still needs a bit more of work​,​ adding caching, versioning and detection ​of changes to reduce processing. These changes will be available in the next beta.</p>\n<h3>Disallow literals in PHQL</h3>\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a> provides a set of features that aids the developer to secure his/her applications. Comparing to straight SQL, PHQL now has a new feature that increases even more security, thus avoiding a large number of potential <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injection</a> scenarios. The developer can now disable literals in PHQL. This means that directly using strings, numbers and boolean values in PHQL strings will be disallowed. If by mistake a developer​ writes:</p>\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst(\"name = '$name'\");\n</pre>\n<p><span>An exception will be thrown forcing the developer to use bound parameters.</span></p>\n<h3>Own Scope for Partials</h3>\n<p>​<span>A developer can now pass an array of variables to a <a href=\"http://docs.phalconphp.com/en/latest/reference/views.html#using-partials\">partial</a> that only exists in the scope of the partial:</span></p>\n<pre class=\"sh_php sh_sourceCode\"><?php $this->partial('footer', ['links' => $myLinks]);\n</pre>\n<p>In Volt:</p>\n<pre class=\"sh_php sh_sourceCode\">{{ partial('footer', ['links': myLinks]) }}\n{% include 'footer' with ['links': myLinks] %}\n</pre>\n<h3>Use Phalcon\\Tag as Service</h3>\n<p>Phalcon\\Tag is now a service in DI\\FactoryDefault​. So instead of doing this:</p>\n<pre class=\"sh_php sh_sourceCode\">Phalcon\\Tag::setDefault('name', $robot->name);\n</pre>\n<p>You can ​do one better and write:</p>\n<pre class=\"sh_php sh_sourceCode\">$this->tag->setDefault('name', $robot->name);\n</pre>\n<p>From now both syntax’s are supported, but in further releases, the former will be deprecated. ​ There will be ample time for developers to migrate their applications to the new format. Using Phalcon\\Tag as a service allow​s the developer to extend the component without affecting application stability.</p>\n<h3>Macros in Volt</h3>\n<p>Initial support for macros in Volt is implemented in this version:</p>\n<pre class=\"sh_php sh_sourceCode\">{%- macro input_text(name, attributes=null) -%}\n {{- '<input type=\"' ~ name ~ '\" ' -}}\n {%- for key, value in attributes -%}\n    {{- key ~ '=\"' ~ value|e '\"' -}}\n {%- endfor -%}\n {{- '/>' -}}\n{%- endmacro -%}\n\n{{ input_text(\"telephone\", ['placeholder': 'Type telephone']) }}\n</pre>\n<h3>BadMethodCallException instead of warnings</h3>\n<p>Before 1.1.0 if a wrong number of parameters was passed to a method a warning was raised. Starting from 1.2.0 BadMethodCallException exceptions will be thrown so you can see a complete trace ​ where the problem is generated.</p>\n<pre class=\"sh_php sh_sourceCode\">$e = new Phalcon\\Escaper();\n$e->escapeCss('a {}', 1, 2, 3);\n</pre>\n<p>Shows:</p>\n<pre class=\"sh_php sh_sourceCode\">Fatal error: Uncaught exception 'BadMethodCallException' with message 'Wrong number of parameters' in test.php:4\nStack trace:\n#0 test.php(4): Phalcon\\Escaper->escapeCss('a {}', 1, 2, 3)\n#1 {main}\n</pre>\n<h3>Debug Component</h3>\n<p>Phalcon\\Debug ​offers the call stack to the developer, with a pretty presentation format. This helps with debugging and identifying errors.</p>\n<p>To use this component just remove any try/catch from your bootstrap. Add the following at the beginning of ​your script:</p>\n<pre class=\"sh_php sh_sourceCode\">(new Phalcon\\Debug)->listen();\n</pre>\n<p>A backtrace like this is showed when an exception is generated:</p>\n<div align=\"center\">\n<p><iframe frameborder=\"0\" height=\"313\" src=\"http://player.vimeo.com/video/68893840\" width=\"500\"></iframe></p>\n</div>\n\n<p>1.2.0 includes other minor changes, bug fixes, stability and performance improvements.​The complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.2.0/CHANGELOG\">CHANGELOG</a>​ is​ here.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.2.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.2.0\nsudo ./install\n</pre>\n<p>Windows users can download a DLL from the <a href=\"http://phalconphp.com/download\">download page</a>.</p>\n<p>We welcome your comments regarding this new release in <a href=\"http://forum.phalconphp.com/\">Phosphorum</a> and <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\n<p>Thanks!</p>","content_raw":"<p><span>We are happy to announce the release of our first beta of Phalcon 1.2&#8203;!</span></p>\r\n<p>In this version we have introduced several new features and performance improvements. The intend of this beta release is get input from the community, test the new functionality making sure everything works fine once production environments are updated to 1.2.</p>\r\n<p>This post is extensive but we have a lot of new features, so bare with us!</p>\r\n<h3>Dynamic compile path in Volt</h3>\r\n<p>Now 'compiledPath' option in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a> accepts a closure allowing the developer to dynamically create the compilation path for templates:</p>\r\n<pre class=\"sh_php sh_sourceCode\">// Just append the .php extension to the template path\r\n$volt-&gt;setOptions([\r\n    'compiledPath' =&gt; function($templatePath) {\t\t\r\n            return $templatePath . '.php';\r\n    }\r\n]);\r\n\r\n// &#8203; &#8203;Recursively create the same structure in another directory\r\n$volt-&gt;setOptions([\r\n        'compiledPath' =&gt; function($templatePath) {\r\n               $dirName = dirname($templatePath);\r\n               if (!is_dir(CACHE_DIR . $dirName)) {\r\n                      mkdir(CACHE_DIR . $dirName);\r\n               }\r\n               return CACHE_DIR . $dirName . '/'. $templatePath . '.php';\r\n\t}\r\n]);\r\n</pre>\r\n<h3>Volt extensions</h3>\r\n<p>With extensions the developer has more flexibility to extend the template engine, and override the compilation of a&#8203; specific instruction, change the behavior of an expression or operator, add functions/filters, and more. The class below allows to use any PHP function in <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html\">Volt</a>:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class PhpFunctionExtension\r\n{\r\n    public function compileFunction($name, $arguments)\r\n    {\r\n          if (function_exists($name)) {\r\n              return $name . '('. $arguments . ')';\r\n          }          \r\n    }\r\n}\r\n</pre>\r\n<p>Load the extension in Volt:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$volt-&gt;getCompiler()-&gt;addExtension(new PHPFunctionExtension());\r\n</pre>\r\n<h3>Phalcon\\Mvc\\Url static/dynamic paths</h3>\r\n<p>With this separation &#8203;the developer can change the base uri for static resources and define a different one for dynamic resources. This is particularly handy if a CDN or a different domain serving static resources&#8203; are used:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$di['url'] = function () {\r\n\t$url = new Phalcon\\Mvc\\Url();\r\n\r\n\t// &#8203; &#8203;Dynamic URIs without mod-rewrite\r\n\t$url-&gt;setBaseUri('/index.php?_url=');\r\n\r\n\t// &#8203; &#8203;Static URI for CSS/Javascript/Images\r\n\t$url-&gt;setStaticUri('/static/');\r\n\r\n\treturn $url;\r\n};\r\n</pre>\r\n<h3>Phalcon\\Mvc\\View\\Simple</h3>\r\n<p>This component is an alternative component similar to Phalcon\\Mvc\\View but lacks of a render hierarchy. It is particularly useful for <a href=\"http://docs.phalconphp.com/en/latest/reference/micro.html\">micro applications</a>&nbsp;or&nbsp;obtaining&#8203; the content of an arbitrary view as an string. Due to the lack of the rendering hierarchy it's more suitable to be used together with the <a href=\"http://docs.phalconphp.com/en/latest/reference/volt.html#template-inheritance\">template inheritance</a> provided by Volt.</p>\r\n<pre class=\"sh_php sh_sourceCode\">// &#8203; &#8203;View service\r\n$di['view'] = function () {\r\n\r\n\t$view = new Phalcon\\Mvc\\View\\Simple();\r\n\r\n\t$view-&gt;setViewsDir(APP_PATH . '/views/');\r\n\r\n\treturn $view;\r\n};\r\n</pre>\r\n<p>Using in micro-apps:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$app-&gt;map('/login', function () use ($app) {\r\n\r\n\techo $app-&gt;view-&gt;render('security/login', array(\r\n\t\t'form' =&gt; new LoginForm(),\t\t\r\n\t));\r\n\r\n});\r\n</pre>\r\n<p>It supports multiple render engines and also have automatic caching capabilities.</p>\r\n<h3>Improved support for JSON</h3>\r\n<p>Now it's easier get input as JSON and return responses in the same format. &#8203;Returned instances of <a href=\"http://docs.phalconphp.com/en/latest/reference/response.html\">Phalcon\\Http\\Response</a> in micro applications are automatically sent by the application:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$app-&gt;post('/api/robots', function () use ($app) {\r\n\r\n    $data = $app-&gt;request-&gt;getJsonRawBody();\r\n\r\n    $robot = new Robots();\r\n    $robot-&gt;name = $data-&gt;name;\r\n    $robot-&gt;type = $data-&gt;type;        \r\n\r\n    $response = new Phalcon\\Http\\Response();\r\n\r\n    //Check if the insertion was successful\r\n    if ($robot-&gt;success() == true) {\r\n\r\n        $response-&gt;setJsonContent([\r\n        \t'status' =&gt; 'OK', \r\n        \t'id' =&gt; $robot-&gt;id\r\n        ]);\r\n\r\n    } else {\r\n\r\n        //Change the HTTP status\r\n        $response-&gt;setStatusCode(500, \"Internal Error\");\r\n\r\n        $response-&gt;setJsonContent([\r\n        \t'status' =&gt; 'ERROR', \r\n        \t'messages' =&gt; $status-&gt;getMessages()\r\n        ]);\r\n\r\n    }\r\n\r\n    return $response;\r\n});\r\n</pre>\r\n<h3>Support for Many-To-Many in the ORM</h3>\r\n<p>Finally Many-to-Many relations are supported in the <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html\">ORM</a>! Direct relationships between two models using an intermediate model can now be defined:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Artists extends Phalcon\\Mvc\\Model\r\n{\r\n\tpublic $id;\r\n\r\n\tpublic $name;\r\n\r\n\tpublic function initialize()\r\n\t{\r\n\t\t$this-&gt;hasManyToMany(\r\n\t\t\t'id', \r\n\t\t\t'ArtistsSongs', \r\n\t\t\t'artists_id', 'songs_id', \r\n\t\t\t'Songs', \r\n\t\t\t'id'\r\n\t\t);\r\n\t}\r\n}\r\n</pre>\r\n<p>&#8203;<span>The songs from an artist can be retrieved by accessing the relationship alias:</span></p>\r\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\r\n\r\n//Get all artist's songs\r\nforeach ($artist-&gt;songs as $song) {\r\n\techo $song-&gt;name;\r\n}\r\n</pre>\r\n<p>Many-to-Many relations can be joined in PHQL:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$phql = 'SELECT Artists.name, Songs.name FROM Artists JOIN Songs WHERE Artists.genre = \"Trip-Hop\"';\r\n$result = $this-&gt;modelsManager-&gt;query($phql);\r\n</pre>\r\n<p>Many-to-Many related instances can be directly added to a model, the intermediate instances are automatically created in the sav&#8203;e process:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$songs = array()\r\n\r\n$song = new Song();\r\n$song-&gt;name = 'Get Lucky';\r\n$songs[] = $song;\r\n\r\n$song = new Song();\r\n$song-&gt;name = 'Instant Crush';\r\n$songs[] = $song;\r\n\r\n$artist = new Artists();\r\n$artist-&gt;name = 'Daft Punk';\r\n$artist-&gt;songs = $songs; //Assign the n-m relation\r\n$artist-&gt;save();\r\n</pre>\r\n<h3>Cascade/Restrict actions in Virtual Foreign Keys</h3>\r\n<p>&#8203;<span><a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#virtual-foreign-keys\">Virtual foreign keys</a> can &#8203;now be set up to delete all the referenced records if the master record is deleted:</span></p>\r\n<pre class=\"sh_php sh_sourceCode\">use Phalcon\\Mvc\\Model\r\n\tPhalcon\\Mvc\\Model\\Relation;\r\n\r\nclass Artists extends Model\r\n{\r\n\r\n\tpublic $id;\r\n\r\n\tpublic $name;\r\n\r\n\tpublic function initialize()\r\n\t{\r\n\t\t$this-&gt;hasMany('id', 'Songs', 'artists_id', [\r\n\t\t\t'foreignKey' =&gt; [\r\n\t\t\t\t'action' =&gt; Relation::ACTION_CASCADE \r\n\t\t\t]\r\n\t\t]);\r\n\t}\r\n\r\n}\r\n</pre>\r\n<p>When a record in Artists is deleted all the related songs are deleted too:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst();\r\n\r\n$artist-&gt;delete(); // Deleting also its songs\r\n</pre>\r\n<h3>Assets Minification</h3>\r\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/assets.html\">Phalcon\\Assets</a> provides built-in minification of Javascript and CSS resources. The developer can create a collection of resources instructing the Assets Manager which ones must be filtered and which ones must be&#8203;left as they are. In addition to the above, <a href=\"https://github.com/douglascrockford/JSMin/blob/master/jsmin.c\">Jsmin</a> by Douglas Crockford is now part of the extension offering minification of javascript files for maximum performance. In the CSS land, <a href=\"https://github.com/soldair/cssmin/blob/master/cssmin.c\">CSSMin</a> by Ryan Day is also available to minify css files.</p>\r\n<pre class=\"sh_php sh_sourceCode\">$manager = new Phalcon\\Assets\\Manager(array(\r\n\t'sourceBasePath' =&gt; './js/',\r\n\t'targetBasePath' =&gt; './js/production/'\r\n));\r\n\r\n$manager\r\n\r\n\t//These Javascripts are located in the page's bottom\r\n\t-&gt;collection('jsFooter')\r\n\r\n\t//The name of the final output\r\n\t-&gt;setTargetPath('final.js')\r\n\r\n\t//The script tag is generated with this URI\r\n\t-&gt;setTargetUri('production/final.js')\r\n\r\n\t//This a remote resource that does not need filtering\r\n\t-&gt;addJs('code.jquery.com/jquery-1.10.0.min.js', true, false)\r\n\r\n\t//These are local resources that must be filtered\r\n\t-&gt;addJs('common-functions.js')\r\n\t-&gt;addJs('page-functions.js')\r\n\r\n\t//Join all the resources in a single file\r\n\t-&gt;join(true)\r\n\r\n\t//Use the built-in Jsmin filter\r\n\t-&gt;addFilter(new Phalcon\\Assets\\Filters\\Jsmin())\r\n\r\n\t//Use a custom filter\r\n\t-&gt;addFilter(new MyApp\\Assets\\Filters\\LicenseStamper());\r\n\r\n$manager-&gt;outputJs();\r\n</pre>\r\n<p>This component still needs a bit more of work&#8203;,&#8203; adding caching, versioning and detection &#8203;of changes to reduce processing. These changes will be available in the next beta.</p>\r\n<h3>Disallow literals in PHQL</h3>\r\n<p><a href=\"http://docs.phalconphp.com/en/latest/reference/phql.html\">PHQL</a> provides a set of features that aids the developer to secure his/her applications. Comparing to straight SQL, PHQL now has a new feature that increases even more security, thus avoiding a large number of potential <a href=\"http://en.wikipedia.org/wiki/SQL_injection\">SQL injection</a> scenarios. The developer can now disable literals in PHQL. This means that directly using strings, numbers and boolean values in PHQL strings will be disallowed. If by mistake a developer&#8203; writes:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$artist = Artists::findFirst(\"name = '$name'\");\r\n</pre>\r\n<p><span>An exception will be thrown forcing the developer to use bound parameters.</span></p>\r\n<h3>Own Scope for Partials</h3>\r\n<p>&#8203;<span>A developer can now pass an array of variables to a <a href=\"http://docs.phalconphp.com/en/latest/reference/views.html#using-partials\">partial</a> that only exists in the scope of the partial:</span></p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php $this-&gt;partial('footer', ['links' =&gt; $myLinks]);\r\n</pre>\r\n<p>In Volt:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{{ partial('footer', ['links': myLinks]) }}\r\n{% include 'footer' with ['links': myLinks] %}\r\n</pre>\r\n<h3>Use Phalcon\\Tag as Service</h3>\r\n<p>Phalcon\\Tag is now a service in DI\\FactoryDefault&#8203;. So instead of doing this:</p>\r\n<pre class=\"sh_php sh_sourceCode\">Phalcon\\Tag::setDefault('name', $robot-&gt;name);\r\n</pre>\r\n<p>You can &#8203;do one better and write:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$this-&gt;tag-&gt;setDefault('name', $robot-&gt;name);\r\n</pre>\r\n<p>From now both syntax's are supported, but in further releases, the former will be deprecated. &#8203; There will be ample time for developers to migrate their applications to the new format. Using Phalcon\\Tag as a service allow&#8203;s the developer to extend the component without affecting application stability.</p>\r\n<h3>Macros in Volt</h3>\r\n<p>Initial support for macros in Volt is implemented in this version:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{%- macro input_text(name, attributes=null) -%}\r\n {{- '&lt;input type=\"' ~ name ~ '\" ' -}}\r\n {%- for key, value in attributes -%}\r\n    {{- key ~ '=\"' ~ value|e '\"' -}}\r\n {%- endfor -%}\r\n {{- '/&gt;' -}}\r\n{%- endmacro -%}\r\n\r\n{{ input_text(\"telephone\", ['placeholder': 'Type telephone']) }}\r\n</pre>\r\n<h3>BadMethodCallException instead of warnings</h3>\r\n<p>Before 1.1.0 if a wrong number of parameters was passed to a method a warning was raised. Starting from 1.2.0 BadMethodCallException exceptions will be thrown so you can see a complete trace &#8203; where the problem is generated.</p>\r\n<pre class=\"sh_php sh_sourceCode\">$e = new Phalcon\\Escaper();\r\n$e-&gt;escapeCss('a {}', 1, 2, 3);\r\n</pre>\r\n<p>Shows:</p>\r\n<pre class=\"sh_php sh_sourceCode\">Fatal error: Uncaught exception 'BadMethodCallException' with message 'Wrong number of parameters' in test.php:4\r\nStack trace:\r\n#0 test.php(4): Phalcon\\Escaper-&gt;escapeCss('a {}', 1, 2, 3)\r\n#1 {main}\r\n</pre>\r\n<h3>Debug Component</h3>\r\n<p>Phalcon\\Debug &#8203;offers the call stack to the developer, with a pretty presentation format. This helps with debugging and identifying errors.</p>\r\n<p>To use this component just remove any try/catch from your bootstrap. Add the following at the beginning of &#8203;your script:</p>\r\n<pre class=\"sh_php sh_sourceCode\">(new Phalcon\\Debug)-&gt;listen();\r\n</pre>\r\n<p>A backtrace like this is showed when an exception is generated:</p>\r\n<div align=\"center\">\r\n<p><iframe frameborder=\"0\" height=\"313\" src=\"http://player.vimeo.com/video/68893840\" width=\"500\"></iframe></p>\r\n</div>\r\n<p></p>\r\n<p>1.2.0 includes other minor changes, bug fixes, stability and performance improvements.&#8203;The complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.2.0/CHANGELOG\">CHANGELOG</a>&#8203; is&#8203; here.</p>\r\n<h3>Help with Testing</h3>\r\n<p>This version can be installed from the 1.2.0 branch:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone http://github.com/phalcon/cphalcon\r\ncd build\r\ngit checkout 1.2.0\r\nsudo ./install\r\n</pre>\r\n<p>Windows users can download a DLL from the <a href=\"phalconphp.com/download\">download page</a>.</p>\r\n<p>We welcome your comments regarding this new release in <a href=\"http://forum.phalconphp.com/\">Phosphorum</a> and <a href=\"stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\r\n<p>Thanks!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-06-018
-->


Phalcon 1.2 beta 1 released! 
=============================

We are happy to announce the release of our first beta of Phalcon 1.2​!

In this version we have introduced several new features and performance
improvements. The intend of this beta release is get input from the
community, test the new functionality making sure everything works fine
once production environments are updated to 1.2.

This post is extensive but we have a lot of new features, so bare with
us!

### Dynamic compile path in Volt

Now ‘compiledPath’ option in
[Volt](http://docs.phalconphp.com/en/latest/reference/volt.html) accepts
a closure allowing the developer to dynamically create the compilation
path for templates:

~~~~ {.sh_php .sh_sourceCode}
// Just append the .php extension to the template path
$volt->setOptions([
    'compiledPath' => function($templatePath) {      
            return $templatePath . '.php';
    }
]);

// ​ ​Recursively create the same structure in another directory
$volt->setOptions([
        'compiledPath' => function($templatePath) {
               $dirName = dirname($templatePath);
               if (!is_dir(CACHE_DIR . $dirName)) {
                      mkdir(CACHE_DIR . $dirName);
               }
               return CACHE_DIR . $dirName . '/'. $templatePath . '.php';
    }
]);
~~~~

### Volt extensions

With extensions the developer has more flexibility to extend the
template engine, and override the compilation of a​ specific
instruction, change the behavior of an expression or operator, add
functions/filters, and more. The class below allows to use any PHP
function in
[Volt](http://docs.phalconphp.com/en/latest/reference/volt.html):

~~~~ {.sh_php .sh_sourceCode}
class PhpFunctionExtension
{
    public function compileFunction($name, $arguments)
    {
          if (function_exists($name)) {
              return $name . '('. $arguments . ')';
          }          
    }
}
~~~~

Load the extension in Volt:

~~~~ {.sh_php .sh_sourceCode}
$volt->getCompiler()->addExtension(new PHPFunctionExtension());
~~~~

### Phalcon\\Mvc\\Url static/dynamic paths

With this separation ​the developer can change the base uri for static
resources and define a different one for dynamic resources. This is
particularly handy if a CDN or a different domain serving static
resources​ are used:

~~~~ {.sh_php .sh_sourceCode}
$di['url'] = function () {
    $url = new Phalcon\Mvc\Url();

    // ​ ​Dynamic URIs without mod-rewrite
    $url->setBaseUri('/index.php?_url=');

    // ​ ​Static URI for CSS/Javascript/Images
    $url->setStaticUri('/static/');

    return $url;
};
~~~~

### Phalcon\\Mvc\\View\\Simple

This component is an alternative component similar to Phalcon\\Mvc\\View
but lacks of a render hierarchy. It is particularly useful for [micro
applications](http://docs.phalconphp.com/en/latest/reference/micro.html) or obtaining​
the content of an arbitrary view as an string. Due to the lack of the
rendering hierarchy it’s more suitable to be used together with the
[template
inheritance](http://docs.phalconphp.com/en/latest/reference/volt.html#template-inheritance)
provided by Volt.

~~~~ {.sh_php .sh_sourceCode}
// ​ ​View service
$di['view'] = function () {

    $view = new Phalcon\Mvc\View\Simple();

    $view->setViewsDir(APP_PATH . '/views/');

    return $view;
};
~~~~

Using in micro-apps:

~~~~ {.sh_php .sh_sourceCode}
$app->map('/login', function () use ($app) {

    echo $app->view->render('security/login', array(
        'form' => new LoginForm(),       
    ));

});
~~~~

It supports multiple render engines and also have automatic caching
capabilities.

### Improved support for JSON

Now it’s easier get input as JSON and return responses in the same
format. ​Returned instances of
[Phalcon\\Http\\Response](http://docs.phalconphp.com/en/latest/reference/response.html)
in micro applications are automatically sent by the application:

~~~~ {.sh_php .sh_sourceCode}
$app->post('/api/robots', function () use ($app) {

    $data = $app->request->getJsonRawBody();

    $robot = new Robots();
    $robot->name = $data->name;
    $robot->type = $data->type;        

    $response = new Phalcon\Http\Response();

    //Check if the insertion was successful
    if ($robot->success() == true) {

        $response->setJsonContent([
            'status' => 'OK', 
            'id' => $robot->id
        ]);

    } else {

        //Change the HTTP status
        $response->setStatusCode(500, "Internal Error");

        $response->setJsonContent([
            'status' => 'ERROR', 
            'messages' => $status->getMessages()
        ]);

    }

    return $response;
});
~~~~

### Support for Many-To-Many in the ORM

Finally Many-to-Many relations are supported in the
[ORM](http://docs.phalconphp.com/en/latest/reference/models.html)!
Direct relationships between two models using an intermediate model can
now be defined:

~~~~ {.sh_php .sh_sourceCode}
class Artists extends Phalcon\Mvc\Model
{
    public $id;

    public $name;

    public function initialize()
    {
        $this->hasManyToMany(
            'id', 
            'ArtistsSongs', 
            'artists_id', 'songs_id', 
            'Songs', 
            'id'
        );
    }
}
~~~~

​The songs from an artist can be retrieved by accessing the relationship
alias:

~~~~ {.sh_php .sh_sourceCode}
$artist = Artists::findFirst();

//Get all artist's songs
foreach ($artist->songs as $song) {
    echo $song->name;
}
~~~~

Many-to-Many relations can be joined in PHQL:

~~~~ {.sh_php .sh_sourceCode}
$phql = 'SELECT Artists.name, Songs.name FROM Artists JOIN Songs WHERE Artists.genre = "Trip-Hop"';
$result = $this->modelsManager->query($phql);
~~~~

Many-to-Many related instances can be directly added to a model, the
intermediate instances are automatically created in the sav​e process:

~~~~ {.sh_php .sh_sourceCode}
$songs = array()

$song = new Song();
$song->name = 'Get Lucky';
$songs[] = $song;

$song = new Song();
$song->name = 'Instant Crush';
$songs[] = $song;

$artist = new Artists();
$artist->name = 'Daft Punk';
$artist->songs = $songs; //Assign the n-m relation
$artist->save();
~~~~

### Cascade/Restrict actions in Virtual Foreign Keys

​[Virtual foreign
keys](http://docs.phalconphp.com/en/latest/reference/models.html#virtual-foreign-keys)
can ​now be set up to delete all the referenced records if the master
record is deleted:

~~~~ {.sh_php .sh_sourceCode}
use Phalcon\Mvc\Model
    Phalcon\Mvc\Model\Relation;

class Artists extends Model
{

    public $id;

    public $name;

    public function initialize()
    {
        $this->hasMany('id', 'Songs', 'artists_id', [
            'foreignKey' => [
                'action' => Relation::ACTION_CASCADE 
            ]
        ]);
    }

}
~~~~

When a record in Artists is deleted all the related songs are deleted
too:

~~~~ {.sh_php .sh_sourceCode}
$artist = Artists::findFirst();

$artist->delete(); // Deleting also its songs
~~~~

### Assets Minification

[Phalcon\\Assets](http://docs.phalconphp.com/en/latest/reference/assets.html)
provides built-in minification of Javascript and CSS resources. The
developer can create a collection of resources instructing the Assets
Manager which ones must be filtered and which ones must be​left as they
are. In addition to the above,
[Jsmin](https://github.com/douglascrockford/JSMin/blob/master/jsmin.c)
by Douglas Crockford is now part of the extension offering minification
of javascript files for maximum performance. In the CSS land,
[CSSMin](https://github.com/soldair/cssmin/blob/master/cssmin.c) by Ryan
Day is also available to minify css files.

~~~~ {.sh_php .sh_sourceCode}
$manager = new Phalcon\Assets\Manager(array(
    'sourceBasePath' => './js/',
    'targetBasePath' => './js/production/'
));

$manager

    //These Javascripts are located in the page's bottom
    ->collection('jsFooter')

    //The name of the final output
    ->setTargetPath('final.js')

    //The script tag is generated with this URI
    ->setTargetUri('production/final.js')

    //This a remote resource that does not need filtering
    ->addJs('code.jquery.com/jquery-1.10.0.min.js', true, false)

    //These are local resources that must be filtered
    ->addJs('common-functions.js')
    ->addJs('page-functions.js')

    //Join all the resources in a single file
    ->join(true)

    //Use the built-in Jsmin filter
    ->addFilter(new Phalcon\Assets\Filters\Jsmin())

    //Use a custom filter
    ->addFilter(new MyApp\Assets\Filters\LicenseStamper());

$manager->outputJs();
~~~~

This component still needs a bit more of work​,​ adding caching,
versioning and detection ​of changes to reduce processing. These changes
will be available in the next beta.

### Disallow literals in PHQL

[PHQL](http://docs.phalconphp.com/en/latest/reference/phql.html)
provides a set of features that aids the developer to secure his/her
applications. Comparing to straight SQL, PHQL now has a new feature that
increases even more security, thus avoiding a large number of potential
[SQL injection](http://en.wikipedia.org/wiki/SQL_injection) scenarios.
The developer can now disable literals in PHQL. This means that directly
using strings, numbers and boolean values in PHQL strings will be
disallowed. If by mistake a developer​ writes:

~~~~ {.sh_php .sh_sourceCode}
$artist = Artists::findFirst("name = '$name'");
~~~~

An exception will be thrown forcing the developer to use bound
parameters.

### Own Scope for Partials

​A developer can now pass an array of variables to a
[partial](http://docs.phalconphp.com/en/latest/reference/views.html#using-partials)
that only exists in the scope of the partial:

~~~~ {.sh_php .sh_sourceCode}
<?php $this->partial('footer', ['links' => $myLinks]);
~~~~

In Volt:

~~~~ {.sh_php .sh_sourceCode}
{{ partial('footer', ['links': myLinks]) }}
{% include 'footer' with ['links': myLinks] %}
~~~~

### Use Phalcon\\Tag as Service

Phalcon\\Tag is now a service in DI\\FactoryDefault​. So instead of
doing this:

~~~~ {.sh_php .sh_sourceCode}
Phalcon\Tag::setDefault('name', $robot->name);
~~~~

You can ​do one better and write:

~~~~ {.sh_php .sh_sourceCode}
$this->tag->setDefault('name', $robot->name);
~~~~

From now both syntax’s are supported, but in further releases, the
former will be deprecated. ​ There will be ample time for developers to
migrate their applications to the new format. Using Phalcon\\Tag as a
service allow​s the developer to extend the component without affecting
application stability.

### Macros in Volt

Initial support for macros in Volt is implemented in this version:

~~~~ {.sh_php .sh_sourceCode}
{%- macro input_text(name, attributes=null) -%}
 {{- '<input type="' ~ name ~ '" ' -}}
 {%- for key, value in attributes -%}
    {{- key ~ '="' ~ value|e '"' -}}
 {%- endfor -%}
 {{- '/>' -}}
{%- endmacro -%}

{{ input_text("telephone", ['placeholder': 'Type telephone']) }}
~~~~

### BadMethodCallException instead of warnings

Before 1.1.0 if a wrong number of parameters was passed to a method a
warning was raised. Starting from 1.2.0 BadMethodCallException
exceptions will be thrown so you can see a complete trace ​ where the
problem is generated.

~~~~ {.sh_php .sh_sourceCode}
$e = new Phalcon\Escaper();
$e->escapeCss('a {}', 1, 2, 3);
~~~~

Shows:

~~~~ {.sh_php .sh_sourceCode}
Fatal error: Uncaught exception 'BadMethodCallException' with message 'Wrong number of parameters' in test.php:4
Stack trace:
#0 test.php(4): Phalcon\Escaper->escapeCss('a {}', 1, 2, 3)
#1 {main}
~~~~

### Debug Component

Phalcon\\Debug ​offers the call stack to the developer, with a pretty
presentation format. This helps with debugging and identifying errors.

To use this component just remove any try/catch from your bootstrap. Add
the following at the beginning of ​your script:

~~~~ {.sh_php .sh_sourceCode}
(new Phalcon\Debug)->listen();
~~~~

A backtrace like this is showed when an exception is generated:

1.2.0 includes other minor changes, bug fixes, stability and performance
improvements.​The complete
[CHANGELOG](https://github.com/phalcon/cphalcon/blob/1.2.0/CHANGELOG)​
is​ here.

### Help with Testing

This version can be installed from the 1.2.0 branch:

~~~~ {.sh_sh .sh_sourceCode}
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 1.2.0
sudo ./install
~~~~

Windows users can download a DLL from the [download
page](http://phalconphp.com/download).

We welcome your comments regarding this new release in
[Phosphorum](http://forum.phalconphp.com/) and [Stack
Overflow](http://stackoverflow.com/questions/tagged/phalcon). If you
discover any bugs, please (if possible) create a failing test and submit
a pull request, alongside with an issue on Github.

Thanks!

