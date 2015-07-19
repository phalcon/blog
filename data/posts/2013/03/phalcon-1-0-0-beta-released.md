<!--
slug: phalcon-1-0-0-beta-released
date: Wed Mar 06 2013 12:42:00 GMT-0500 (EST)
tags: php, phalcon, release
title: Phalcon 1.0.0 beta released 
id: 44715359754
link: http://blog.phalconphp.com/post/44715359754/phalcon-1-0-0-beta-released
raw: {"blog_name":"phalconphp","id":44715359754,"post_url":"http://blog.phalconphp.com/post/44715359754/phalcon-1-0-0-beta-released","slug":"phalcon-1-0-0-beta-released","type":"text","date":"2013-03-06 17:42:00 GMT","timestamp":1362591720,"state":"published","format":"html","reblog_key":"ss85BKBZ","tags":["php","phalcon","release"],"short_url":"http://tmblr.co/Z6PumvffFZuA","highlighted":[],"note_count":0,"title":"Phalcon 1.0.0 beta released ","body":"<p>We&rsquo;re ​are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\n<h3>Multi-Level Cache</h3>\n<p>This new feature ​of the cache component, ​allows ​the developer to implement a multi-level cache​. This new feature is very ​ useful because you can save the same data in several cache​ locations​ with different lifetimes ​, reading ​first from the one with the faster adapter and ending with the slowest one until the data expire​s​:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 3600\n));\n\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 86400\n));\n\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 604800\n));\n\n//Backends are registered from the fastest to the slower\n$cache = new \\Phalcon\\Cache\\Multiple(array(\n<span>    </span>new Phalcon\\Cache\\Backend\\Apc($ultraFastFrontend, array(\n\t\t\"prefix\" =&gt; 'cache',\n\t)),\n\tnew Phalcon\\Cache\\Backend\\Memcache($fastFrontend, array(\n\t\t\"prefix\" =&gt; 'cache',\n\t\t\"host\" =&gt; \"localhost\",\n\t\t\"port\" =&gt; \"11211\"\n\t)),\n\tnew Phalcon\\Cache\\Backend\\File($slowFrontend, array(\n\t\t\"prefix\" =&gt; 'cache',\n\t\t\"cacheDir\" =&gt; \"../app/cache/\"\n\t))\n));\n\n//Save, saves in every backend\n$cache-&gt;save('my-key', $data);</pre>\n<p>We&rsquo;re ​are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\n<h3>Multi-Level Cache</h3>\n<p>This new feature ​of the cache component, ​allows ​the developer to implement a multi-level cache​. This new feature is very ​ useful because you can save the same data in several cache​ locations​ with different lifetimes, reading ​first from the one with the faster adapter and ending with the slowest one until the data expire​s​:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 3600\n));\n\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 86400\n));\n\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 604800\n));\n\n//Backends are registered from the fastest to the slower\n$cache = new \\Phalcon\\Cache\\Multiple(array(\n<span>  </span>new Phalcon\\Cache\\Backend\\Apc($frontCache, array(\n        \"prefix\" =&gt; 'cache',\n    )),\n    new Phalcon\\Cache\\Backend\\Memcache($fastFrontCache, array(\n        \"prefix\" =&gt; 'cache',\n        \"host\" =&gt; \"localhost\",\n        \"port\" =&gt; \"11211\"\n    )),\n    new Phalcon\\Cache\\Backend\\File($slowestFrontCache, array(\n        \"prefix\" =&gt; 'cache',\n        \"cacheDir\" =&gt; \"../app/cache/\"\n    ));\n));\n\n//Save, saves in every backend\n$cache-&gt;save('my-key', $data);\n\n//Read, reads every cache, if one of them return data returns it\n$data = $cache-&gt;get('my-key');\n</pre>\n<h3>Volt Improvements</h3>\n<p>Several volt improvements are introduced in this version:</p>\n<pre class=\"sh_php sh_sourceCode\">{# Ternary operator #}\n{{ total &gt; 0 ? total|format('%0.2f') : '0.0' }}\n\n{# For-Else clause #}\n{% for robot in robots %}\n    {{ robot.name }}\n{% else %}\n    There are no robots\n{% endfor %}\n\n{# Loop-Context #}\n&lt;table&gt;\n{% for robot in robots %}\n    {% if loop.first %}\n        &lt;thead&gt;\n            &lt;tr&gt;\n                &lt;th&gt;Position&lt;/th&gt;\n                &lt;th&gt;Id&lt;/th&gt;\n                &lt;th&gt;Name&lt;/th&gt;\n            &lt;/tr&gt;\n        &lt;/thead&gt;ae\n        &lt;tbody&gt;\n    {% endif %}\n    &lt;tr&gt;\n        &lt;th&gt;{{ loop.index }}&lt;/th&gt;\n        &lt;th&gt;{{ robot.id }}&lt;/th&gt;\n        &lt;th&gt;{{ robot.name }}&lt;/th&gt;\n    &lt;/tr&gt;\n    {% if loop.last %}\n        &lt;tbody&gt;\n    {% endif %}\n{% endfor %}\n&lt;/table&gt;\n\n{# Space control delimiters #}\n&lt;ul&gt;\n    {%- for robot in robots -%}\n    &lt;li&gt;  {{- robot.name -}}&lt;/li&gt;\n    {%- endfor %}\n&lt;/ul&gt;\n</pre>\n<h3>Vertical/Horizontal Sharding Improvements</h3>\n<p>Now you can define a define a different connection to read from a model and a different one ​ for write​. This is especially beneficial when dealing with master/slave configurations in a RDBMS​:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initialize()\n    {\n        $this-&gt;setReadConnectionService('dbSlave');\n        $this-&gt;setWriteConnectionService('dbMaster');\n    }\n}\n</pre>\n<p>Horizontal sharding implies that the connection to read is selected acording to the data that will be queried:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function selectReadConnection($intermediate, $bindParams, $bindTypes)\n    {\n        //Check if there is a 'where' clause in the select\n        if (isset($intermediate['where'])) {\n\n            $conditions = $intermediate['where'];\n\n            //Choose the possible shard according to the conditions\n            if ($conditions['left']['name'] == 'id') {\n                $id = $conditions['right']['value'];\n                if ($id &gt; 0 &amp;&amp; $id &lt; 10000) {\n                    return $this-&gt;getDI()-&gt;get('dbShard1');\n                }\n                if ($id &gt; 10000) {\n                    return $this-&gt;getDI()-&gt;get('dbShard2');\n                }\n            }\n        }\n\n        //Use a default shard\n        return $this-&gt;getDI()-&gt;get('dbShard0');\n    }\n\n}\n</pre>\n<h3>Record Snapshots</h3>\n<p>With this new feature, specific models could be set to maintain a record snapshot when they&rsquo;re queried. You can use this feature to implement auditing or just to know what fields are changed according to the data queried from the persistence:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initalize()\n    {\n        $this-&gt;keepSnapshots(true);\n    }\n}\n</pre>\n<p>This way you can check what fields changed:</p>\n<pre class=\"sh_php sh_sourceCode\">$robot = new Robots();\n$robot-&gt;name = 'Other name';\nvar_dump($robot-&gt;getChangedFields()); // ['name']\nvar_dump($robot-&gt;hasChanged('name')); // true\nvar_dump($robot-&gt;hasChanged('type')); // false\n</pre>\n<h3>Dynamic Update</h3>\n<p>This feature allows to set up the ORM to create SQL UPDATE statements with just the fields that changed instead of the full all-field SQL update. In some cases this could improve the performance by reducing the traffic between the application and the database server:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initalize()\n    {\n        $this-&gt;useDynamicUpdate(true);\n    }\n}\n</pre>\n<h3>Validation</h3>\n<p>Phalcon\\Validation is an independent validation component based on the validation system implemented in the ORM and the ODM. This component can be used to implement validation rules that does not belong to a model or collection:</p>\n<pre class=\"sh_php sh_sourceCode\">$validation = new Phalcon\\Validation();\n\n$validation\n    -&gt;add('name', new PresenceOf(array(\n        'message' =&gt; 'The name is required'\n    )))\n    -&gt;add('name', new StringLength(array(\n        'min' =&gt; 5,\n        'minimumMessage' =&gt; 'The name is too short'\n    )))\n    -&gt;add('email', new PresenceOf(array(\n        'message' =&gt; 'The email is required'\n    )))\n    -&gt;add('email', new Email(array(\n        'message' =&gt; 'The email is not valid'\n    )))\n    -&gt;add('login', new PresenceOf(array(\n        'message' =&gt; 'The login is required'\n    )));\n\n$messages = $validation-&gt;validate($_POST);\nif (count($messages)) {\n    foreach ($messages as $message) {\n        echo $message;\n    }\n} </pre>\n<p>1.0.0 includes other minor changes, bug fixes and stability improvements. You can see the complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.0.0/CHANGELOG\">CHANGELOG</a>&gt; here.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.0.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.0.0\nsudo ./install</pre>\n<p><span>Windows users can</span><span> </span><a href=\"https://phalconphp.com/download\">download</a><span> </span><span>a DLL from the download page.</span>​​</p>\n<p>We ​welcome your comments regarding this new release in <a href=\"https://forum.phalconphp.com/\">Phosphorum</a>, <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\n<p>Thanks!</p>","reblog":{"tree_html":"","comment":"<p>We&rsquo;re &#8203;are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\n<h3>Multi-Level Cache</h3>\n<p>This new feature &#8203;of the cache component, &#8203;allows &#8203;the developer to implement a multi-level cache&#8203;. This new feature is very &#8203; useful because you can save the same data in several cache&#8203; locations&#8203; with different lifetimes &#8203;, reading &#8203;first from the one with the faster adapter and ending with the slowest one until the data expire&#8203;s&#8203;:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 3600\n));\n\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 86400\n));\n\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 604800\n));\n\n//Backends are registered from the fastest to the slower\n$cache = new \\Phalcon\\Cache\\Multiple(array(\n<span>    </span>new Phalcon\\Cache\\Backend\\Apc($ultraFastFrontend, array(\n\t\t\"prefix\" =&gt; 'cache',\n\t)),\n\tnew Phalcon\\Cache\\Backend\\Memcache($fastFrontend, array(\n\t\t\"prefix\" =&gt; 'cache',\n\t\t\"host\" =&gt; \"localhost\",\n\t\t\"port\" =&gt; \"11211\"\n\t)),\n\tnew Phalcon\\Cache\\Backend\\File($slowFrontend, array(\n\t\t\"prefix\" =&gt; 'cache',\n\t\t\"cacheDir\" =&gt; \"../app/cache/\"\n\t))\n));\n\n//Save, saves in every backend\n$cache-&gt;save('my-key', $data);</pre>\n<p>We&rsquo;re &#8203;are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\n<h3>Multi-Level Cache</h3>\n<p>This new feature &#8203;of the cache component, &#8203;allows &#8203;the developer to implement a multi-level cache&#8203;. This new feature is very &#8203; useful because you can save the same data in several cache&#8203; locations&#8203; with different lifetimes, reading &#8203;first from the one with the faster adapter and ending with the slowest one until the data expire&#8203;s&#8203;:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 3600\n));\n\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 86400\n));\n\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" =&gt; 604800\n));\n\n//Backends are registered from the fastest to the slower\n$cache = new \\Phalcon\\Cache\\Multiple(array(\n<span>  </span>new Phalcon\\Cache\\Backend\\Apc($frontCache, array(\n        \"prefix\" =&gt; 'cache',\n    )),\n    new Phalcon\\Cache\\Backend\\Memcache($fastFrontCache, array(\n        \"prefix\" =&gt; 'cache',\n        \"host\" =&gt; \"localhost\",\n        \"port\" =&gt; \"11211\"\n    )),\n    new Phalcon\\Cache\\Backend\\File($slowestFrontCache, array(\n        \"prefix\" =&gt; 'cache',\n        \"cacheDir\" =&gt; \"../app/cache/\"\n    ));\n));\n\n//Save, saves in every backend\n$cache-&gt;save('my-key', $data);\n\n//Read, reads every cache, if one of them return data returns it\n$data = $cache-&gt;get('my-key');\n</pre>\n<h3>Volt Improvements</h3>\n<p>Several volt improvements are introduced in this version:</p>\n<pre class=\"sh_php sh_sourceCode\">{# Ternary operator #}\n{{ total &gt; 0 ? total|format('%0.2f') : '0.0' }}\n\n{# For-Else clause #}\n{% for robot in robots %}\n    {{ robot.name }}\n{% else %}\n    There are no robots\n{% endfor %}\n\n{# Loop-Context #}\n&lt;table&gt;\n{% for robot in robots %}\n    {% if loop.first %}\n        &lt;thead&gt;\n            &lt;tr&gt;\n                &lt;th&gt;Position&lt;/th&gt;\n                &lt;th&gt;Id&lt;/th&gt;\n                &lt;th&gt;Name&lt;/th&gt;\n            &lt;/tr&gt;\n        &lt;/thead&gt;ae\n        &lt;tbody&gt;\n    {% endif %}\n    &lt;tr&gt;\n        &lt;th&gt;{{ loop.index }}&lt;/th&gt;\n        &lt;th&gt;{{ robot.id }}&lt;/th&gt;\n        &lt;th&gt;{{ robot.name }}&lt;/th&gt;\n    &lt;/tr&gt;\n    {% if loop.last %}\n        &lt;tbody&gt;\n    {% endif %}\n{% endfor %}\n&lt;/table&gt;\n\n{# Space control delimiters #}\n&lt;ul&gt;\n    {%- for robot in robots -%}\n    &lt;li&gt;  {{- robot.name -}}&lt;/li&gt;\n    {%- endfor %}\n&lt;/ul&gt;\n</pre>\n<h3>Vertical/Horizontal Sharding Improvements</h3>\n<p>Now you can define a define a different connection to read from a model and a different one &#8203; for write&#8203;. This is especially beneficial when dealing with master/slave configurations in a RDBMS&#8203;:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initialize()\n    {\n        $this-&gt;setReadConnectionService('dbSlave');\n        $this-&gt;setWriteConnectionService('dbMaster');\n    }\n}\n</pre>\n<p>Horizontal sharding implies that the connection to read is selected acording to the data that will be queried:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function selectReadConnection($intermediate, $bindParams, $bindTypes)\n    {\n        //Check if there is a 'where' clause in the select\n        if (isset($intermediate['where'])) {\n\n            $conditions = $intermediate['where'];\n\n            //Choose the possible shard according to the conditions\n            if ($conditions['left']['name'] == 'id') {\n                $id = $conditions['right']['value'];\n                if ($id &gt; 0 &amp;&amp; $id &lt; 10000) {\n                    return $this-&gt;getDI()-&gt;get('dbShard1');\n                }\n                if ($id &gt; 10000) {\n                    return $this-&gt;getDI()-&gt;get('dbShard2');\n                }\n            }\n        }\n\n        //Use a default shard\n        return $this-&gt;getDI()-&gt;get('dbShard0');\n    }\n\n}\n</pre>\n<h3>Record Snapshots</h3>\n<p>With this new feature, specific models could be set to maintain a record snapshot when they&rsquo;re queried. You can use this feature to implement auditing or just to know what fields are changed according to the data queried from the persistence:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initalize()\n    {\n        $this-&gt;keepSnapshots(true);\n    }\n}\n</pre>\n<p>This way you can check what fields changed:</p>\n<pre class=\"sh_php sh_sourceCode\">$robot = new Robots();\n$robot-&gt;name = 'Other name';\nvar_dump($robot-&gt;getChangedFields()); // ['name']\nvar_dump($robot-&gt;hasChanged('name')); // true\nvar_dump($robot-&gt;hasChanged('type')); // false\n</pre>\n<h3>Dynamic Update</h3>\n<p>This feature allows to set up the ORM to create SQL UPDATE statements with just the fields that changed instead of the full all-field SQL update. In some cases this could improve the performance by reducing the traffic between the application and the database server:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initalize()\n    {\n        $this-&gt;useDynamicUpdate(true);\n    }\n}\n</pre>\n<h3>Validation</h3>\n<p>Phalcon\\Validation is an independent validation component based on the validation system implemented in the ORM and the ODM. This component can be used to implement validation rules that does not belong to a model or collection:</p>\n<pre class=\"sh_php sh_sourceCode\">$validation = new Phalcon\\Validation();\n\n$validation\n    -&gt;add('name', new PresenceOf(array(\n        'message' =&gt; 'The name is required'\n    )))\n    -&gt;add('name', new StringLength(array(\n        'min' =&gt; 5,\n        'minimumMessage' =&gt; 'The name is too short'\n    )))\n    -&gt;add('email', new PresenceOf(array(\n        'message' =&gt; 'The email is required'\n    )))\n    -&gt;add('email', new Email(array(\n        'message' =&gt; 'The email is not valid'\n    )))\n    -&gt;add('login', new PresenceOf(array(\n        'message' =&gt; 'The login is required'\n    )));\n\n$messages = $validation-&gt;validate($_POST);\nif (count($messages)) {\n    foreach ($messages as $message) {\n        echo $message;\n    }\n}&nbsp;</pre>\n<p>1.0.0 includes other minor changes, bug fixes and stability improvements. You can see the complete&nbsp;<a href=\"https://github.com/phalcon/cphalcon/blob/1.0.0/CHANGELOG\">CHANGELOG</a>&gt;&nbsp;here.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.0.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.0.0\nsudo ./install</pre>\n<p><span>Windows users can</span><span>&nbsp;</span><a href=\"https://phalconphp.com/download\">download</a><span>&nbsp;</span><span>a DLL from the download page.</span>&#8203;&#8203;</p>\n<p>We &#8203;welcome your comments regarding this new release in <a href=\"https://forum.phalconphp.com/\">Phosphorum</a>, <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\n<p>Thanks!</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"44715359754"},"content":"<p>We're ​are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\n<h3>Multi-Level Cache</h3>\n<p>This new feature ​of the cache component, ​allows ​the developer to implement a multi-level cache​. This new feature is very ​ useful because you can save the same data in several cache​ locations​ with different lifetimes ​, reading ​first from the one with the faster adapter and ending with the slowest one until the data expire​s​:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" => 3600\n));\n\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" => 86400\n));\n\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" => 604800\n));\n\n//Backends are registered from the fastest to the slower\n$cache = new \\Phalcon\\Cache\\Multiple(array(\n<span>    </span>new Phalcon\\Cache\\Backend\\Apc($ultraFastFrontend, array(\n\t\t\"prefix\" => 'cache',\n\t)),\n\tnew Phalcon\\Cache\\Backend\\Memcache($fastFrontend, array(\n\t\t\"prefix\" => 'cache',\n\t\t\"host\" => \"localhost\",\n\t\t\"port\" => \"11211\"\n\t)),\n\tnew Phalcon\\Cache\\Backend\\File($slowFrontend, array(\n\t\t\"prefix\" => 'cache',\n\t\t\"cacheDir\" => \"../app/cache/\"\n\t))\n));\n\n//Save, saves in every backend\n$cache->save('my-key', $data);</pre>\n<p>We're ​are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\n<h3>Multi-Level Cache</h3>\n<p>This new feature ​of the cache component, ​allows ​the developer to implement a multi-level cache​. This new feature is very ​ useful because you can save the same data in several cache​ locations​ with different lifetimes, reading ​first from the one with the faster adapter and ending with the slowest one until the data expire​s​:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" => 3600\n));\n\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" => 86400\n));\n\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\n    \"lifetime\" => 604800\n));\n\n//Backends are registered from the fastest to the slower\n$cache = new \\Phalcon\\Cache\\Multiple(array(\n<span>  </span>new Phalcon\\Cache\\Backend\\Apc($frontCache, array(\n        \"prefix\" => 'cache',\n    )),\n    new Phalcon\\Cache\\Backend\\Memcache($fastFrontCache, array(\n        \"prefix\" => 'cache',\n        \"host\" => \"localhost\",\n        \"port\" => \"11211\"\n    )),\n    new Phalcon\\Cache\\Backend\\File($slowestFrontCache, array(\n        \"prefix\" => 'cache',\n        \"cacheDir\" => \"../app/cache/\"\n    ));\n));\n\n//Save, saves in every backend\n$cache->save('my-key', $data);\n\n//Read, reads every cache, if one of them return data returns it\n$data = $cache->get('my-key');\n</pre>\n<h3>Volt Improvements</h3>\n<p>Several volt improvements are introduced in this version:</p>\n<pre class=\"sh_php sh_sourceCode\">{# Ternary operator #}\n{{ total > 0 ? total|format('%0.2f') : '0.0' }}\n\n{# For-Else clause #}\n{% for robot in robots %}\n    {{ robot.name }}\n{% else %}\n    There are no robots\n{% endfor %}\n\n{# Loop-Context #}\n<table>\n{% for robot in robots %}\n    {% if loop.first %}\n        <thead>\n            <tr>\n                <th>Position</th>\n                <th>Id</th>\n                <th>Name</th>\n            </tr>\n        </thead>ae\n        <tbody>\n    {% endif %}\n    <tr>\n        <th>{{ loop.index }}</th>\n        <th>{{ robot.id }}</th>\n        <th>{{ robot.name }}</th>\n    </tr>\n    {% if loop.last %}\n        <tbody>\n    {% endif %}\n{% endfor %}\n</table>\n\n{# Space control delimiters #}\n<ul>\n    {%- for robot in robots -%}\n    <li>  {{- robot.name -}}</li>\n    {%- endfor %}\n</ul>\n</pre>\n<h3>Vertical/Horizontal Sharding Improvements</h3>\n<p>Now you can define a define a different connection to read from a model and a different one ​ for write​. This is especially beneficial when dealing with master/slave configurations in a RDBMS​:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initialize()\n    {\n        $this->setReadConnectionService('dbSlave');\n        $this->setWriteConnectionService('dbMaster');\n    }\n}\n</pre>\n<p>Horizontal sharding implies that the connection to read is selected acording to the data that will be queried:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function selectReadConnection($intermediate, $bindParams, $bindTypes)\n    {\n        //Check if there is a 'where' clause in the select\n        if (isset($intermediate['where'])) {\n\n            $conditions = $intermediate['where'];\n\n            //Choose the possible shard according to the conditions\n            if ($conditions['left']['name'] == 'id') {\n                $id = $conditions['right']['value'];\n                if ($id > 0 && $id < 10000) {\n                    return $this->getDI()->get('dbShard1');\n                }\n                if ($id > 10000) {\n                    return $this->getDI()->get('dbShard2');\n                }\n            }\n        }\n\n        //Use a default shard\n        return $this->getDI()->get('dbShard0');\n    }\n\n}\n</pre>\n<h3>Record Snapshots</h3>\n<p>With this new feature, specific models could be set to maintain a record snapshot when they're queried. You can use this feature to implement auditing or just to know what fields are changed according to the data queried from the persistence:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initalize()\n    {\n        $this->keepSnapshots(true);\n    }\n}\n</pre>\n<p>This way you can check what fields changed:</p>\n<pre class=\"sh_php sh_sourceCode\">$robot = new Robots();\n$robot->name = 'Other name';\nvar_dump($robot->getChangedFields()); // ['name']\nvar_dump($robot->hasChanged('name')); // true\nvar_dump($robot->hasChanged('type')); // false\n</pre>\n<h3>Dynamic Update</h3>\n<p>This feature allows to set up the ORM to create SQL UPDATE statements with just the fields that changed instead of the full all-field SQL update. In some cases this could improve the performance by reducing the traffic between the application and the database server:</p>\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\n{\n    public function initalize()\n    {\n        $this->useDynamicUpdate(true);\n    }\n}\n</pre>\n<h3>Validation</h3>\n<p>Phalcon\\Validation is an independent validation component based on the validation system implemented in the ORM and the ODM. This component can be used to implement validation rules that does not belong to a model or collection:</p>\n<pre class=\"sh_php sh_sourceCode\">$validation = new Phalcon\\Validation();\n\n$validation\n    ->add('name', new PresenceOf(array(\n        'message' => 'The name is required'\n    )))\n    ->add('name', new StringLength(array(\n        'min' => 5,\n        'minimumMessage' => 'The name is too short'\n    )))\n    ->add('email', new PresenceOf(array(\n        'message' => 'The email is required'\n    )))\n    ->add('email', new Email(array(\n        'message' => 'The email is not valid'\n    )))\n    ->add('login', new PresenceOf(array(\n        'message' => 'The login is required'\n    )));\n\n$messages = $validation->validate($_POST);\nif (count($messages)) {\n    foreach ($messages as $message) {\n        echo $message;\n    }\n} </pre>\n<p>1.0.0 includes other minor changes, bug fixes and stability improvements. You can see the complete <a href=\"https://github.com/phalcon/cphalcon/blob/1.0.0/CHANGELOG\">CHANGELOG</a>> here.</p>\n<h3>Help with Testing</h3>\n<p>This version can be installed from the 1.0.0 branch:</p>\n<pre class=\"sh_sh sh_sourceCode\">git clone <a href=\"http://github.com/phalcon/cphalcon\">http://github.com/phalcon/cphalcon</a>\ncd build\ngit checkout 1.0.0\nsudo ./install</pre>\n<p><span>Windows users can</span><span> </span><a href=\"https://phalconphp.com/download\">download</a><span> </span><span>a DLL from the download page.</span>​​</p>\n<p>We ​welcome your comments regarding this new release in <a href=\"https://forum.phalconphp.com/\">Phosphorum</a>, <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\n<p>Thanks!</p>","content_raw":"<p>We're &#8203;are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\r\n<h3>Multi-Level Cache</h3>\r\n<p>This new feature &#8203;of the cache component, &#8203;allows &#8203;the developer to implement a multi-level cache&#8203;. This new feature is very &#8203; useful because you can save the same data in several cache&#8203; locations&#8203; with different lifetimes &#8203;, reading &#8203;first from the one with the faster adapter and ending with the slowest one until the data expire&#8203;s&#8203;:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\r\n    \"lifetime\" =&gt; 3600\r\n));\r\n\r\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\r\n    \"lifetime\" =&gt; 86400\r\n));\r\n\r\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\r\n    \"lifetime\" =&gt; 604800\r\n));\r\n\r\n//Backends are registered from the fastest to the slower\r\n$cache = new \\Phalcon\\Cache\\Multiple(array(\r\n<span>    </span>new Phalcon\\Cache\\Backend\\Apc($ultraFastFrontend, array(\r\n\t\t\"prefix\" =&gt; 'cache',\r\n\t)),\r\n\tnew Phalcon\\Cache\\Backend\\Memcache($fastFrontend, array(\r\n\t\t\"prefix\" =&gt; 'cache',\r\n\t\t\"host\" =&gt; \"localhost\",\r\n\t\t\"port\" =&gt; \"11211\"\r\n\t)),\r\n\tnew Phalcon\\Cache\\Backend\\File($slowFrontend, array(\r\n\t\t\"prefix\" =&gt; 'cache',\r\n\t\t\"cacheDir\" =&gt; \"../app/cache/\"\r\n\t))\r\n));\r\n\r\n//Save, saves in every backend\r\n$cache-&gt;save('my-key', $data);</pre>\r\n<p>We're &#8203;are releasing today the beta version of Phalcon 1.0.0. Our goal is to get this version out to the community so as to discover bugs and get feedback. This post highlights some of the more important features introduced in this release:</p>\r\n<h3>Multi-Level Cache</h3>\r\n<p>This new feature &#8203;of the cache component, &#8203;allows &#8203;the developer to implement a multi-level cache&#8203;. This new feature is very &#8203; useful because you can save the same data in several cache&#8203; locations&#8203; with different lifetimes, reading &#8203;first from the one with the faster adapter and ending with the slowest one until the data expire&#8203;s&#8203;:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\n$ultraFastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\r\n    \"lifetime\" =&gt; 3600\r\n));\r\n\r\n$fastFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\r\n    \"lifetime\" =&gt; 86400\r\n));\r\n\r\n$slowFrontend = new Phalcon\\Cache\\Frontend\\Data(array(\r\n    \"lifetime\" =&gt; 604800\r\n));\r\n\r\n//Backends are registered from the fastest to the slower\r\n$cache = new \\Phalcon\\Cache\\Multiple(array(\r\n<span>  </span>new Phalcon\\Cache\\Backend\\Apc($frontCache, array(\r\n        \"prefix\" =&gt; 'cache',\r\n    )),\r\n    new Phalcon\\Cache\\Backend\\Memcache($fastFrontCache, array(\r\n        \"prefix\" =&gt; 'cache',\r\n        \"host\" =&gt; \"localhost\",\r\n        \"port\" =&gt; \"11211\"\r\n    )),\r\n    new Phalcon\\Cache\\Backend\\File($slowestFrontCache, array(\r\n        \"prefix\" =&gt; 'cache',\r\n        \"cacheDir\" =&gt; \"../app/cache/\"\r\n    ));\r\n));\r\n\r\n//Save, saves in every backend\r\n$cache-&gt;save('my-key', $data);\r\n\r\n//Read, reads every cache, if one of them return data returns it\r\n$data = $cache-&gt;get('my-key');\r\n</pre>\r\n<h3>Volt Improvements</h3>\r\n<p>Several volt improvements are introduced in this version:</p>\r\n<pre class=\"sh_php sh_sourceCode\">{# Ternary operator #}\r\n{{ total &gt; 0 ? total|format('%0.2f') : '0.0' }}\r\n\r\n{# For-Else clause #}\r\n{% for robot in robots %}\r\n    {{ robot.name }}\r\n{% else %}\r\n    There are no robots\r\n{% endfor %}\r\n\r\n{# Loop-Context #}\r\n&lt;table&gt;\r\n{% for robot in robots %}\r\n    {% if loop.first %}\r\n        &lt;thead&gt;\r\n            &lt;tr&gt;\r\n                &lt;th&gt;Position&lt;/th&gt;\r\n                &lt;th&gt;Id&lt;/th&gt;\r\n                &lt;th&gt;Name&lt;/th&gt;\r\n            &lt;/tr&gt;\r\n        &lt;/thead&gt;ae\r\n        &lt;tbody&gt;\r\n    {% endif %}\r\n    &lt;tr&gt;\r\n        &lt;th&gt;{{ loop.index }}&lt;/th&gt;\r\n        &lt;th&gt;{{ robot.id }}&lt;/th&gt;\r\n        &lt;th&gt;{{ robot.name }}&lt;/th&gt;\r\n    &lt;/tr&gt;\r\n    {% if loop.last %}\r\n        &lt;tbody&gt;\r\n    {% endif %}\r\n{% endfor %}\r\n&lt;/table&gt;\r\n\r\n{# Space control delimiters #}\r\n&lt;ul&gt;\r\n    {%- for robot in robots -%}\r\n    &lt;li&gt;  {{- robot.name -}}&lt;/li&gt;\r\n    {%- endfor %}\r\n&lt;/ul&gt;\r\n</pre>\r\n<h3>Vertical/Horizontal Sharding Improvements</h3>\r\n<p>Now you can define a define a different connection to read from a model and a different one &#8203; for write&#8203;. This is especially beneficial when dealing with master/slave configurations in a RDBMS&#8203;:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\r\n{\r\n    public function initialize()\r\n    {\r\n        $this-&gt;setReadConnectionService('dbSlave');\r\n        $this-&gt;setWriteConnectionService('dbMaster');\r\n    }\r\n}\r\n</pre>\r\n<p>Horizontal sharding implies that the connection to read is selected acording to the data that will be queried:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\r\n{\r\n    public function selectReadConnection($intermediate, $bindParams, $bindTypes)\r\n    {\r\n        //Check if there is a 'where' clause in the select\r\n        if (isset($intermediate['where'])) {\r\n\r\n            $conditions = $intermediate['where'];\r\n\r\n            //Choose the possible shard according to the conditions\r\n            if ($conditions['left']['name'] == 'id') {\r\n                $id = $conditions['right']['value'];\r\n                if ($id &gt; 0 &amp;&amp; $id &lt; 10000) {\r\n                    return $this-&gt;getDI()-&gt;get('dbShard1');\r\n                }\r\n                if ($id &gt; 10000) {\r\n                    return $this-&gt;getDI()-&gt;get('dbShard2');\r\n                }\r\n            }\r\n        }\r\n\r\n        //Use a default shard\r\n        return $this-&gt;getDI()-&gt;get('dbShard0');\r\n    }\r\n\r\n}\r\n</pre>\r\n<h3>Record Snapshots</h3>\r\n<p>With this new feature, specific models could be set to maintain a record snapshot when they're queried. You can use this feature to implement auditing or just to know what fields are changed according to the data queried from the persistence:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\r\n{\r\n    public function initalize()\r\n    {\r\n        $this-&gt;keepSnapshots(true);\r\n    }\r\n}\r\n</pre>\r\n<p>This way you can check what fields changed:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$robot = new Robots();\r\n$robot-&gt;name = 'Other name';\r\nvar_dump($robot-&gt;getChangedFields()); // ['name']\r\nvar_dump($robot-&gt;hasChanged('name')); // true\r\nvar_dump($robot-&gt;hasChanged('type')); // false\r\n</pre>\r\n<h3>Dynamic Update</h3>\r\n<p>This feature allows to set up the ORM to create SQL UPDATE statements with just the fields that changed instead of the full all-field SQL update. In some cases this could improve the performance by reducing the traffic between the application and the database server:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Robots extends Phalcon\\Mvc\\Model\r\n{\r\n    public function initalize()\r\n    {\r\n        $this-&gt;useDynamicUpdate(true);\r\n    }\r\n}\r\n</pre>\r\n<h3>Validation</h3>\r\n<p>Phalcon\\Validation is an independent validation component based on the validation system implemented in the ORM and the ODM. This component can be used to implement validation rules that does not belong to a model or collection:</p>\r\n<pre class=\"sh_php sh_sourceCode\">$validation = new Phalcon\\Validation();\r\n\r\n$validation\r\n    -&gt;add('name', new PresenceOf(array(\r\n        'message' =&gt; 'The name is required'\r\n    )))\r\n    -&gt;add('name', new StringLength(array(\r\n        'min' =&gt; 5,\r\n        'minimumMessage' =&gt; 'The name is too short'\r\n    )))\r\n    -&gt;add('email', new PresenceOf(array(\r\n        'message' =&gt; 'The email is required'\r\n    )))\r\n    -&gt;add('email', new Email(array(\r\n        'message' =&gt; 'The email is not valid'\r\n    )))\r\n    -&gt;add('login', new PresenceOf(array(\r\n        'message' =&gt; 'The login is required'\r\n    )));\r\n\r\n$messages = $validation-&gt;validate($_POST);\r\nif (count($messages)) {\r\n    foreach ($messages as $message) {\r\n        echo $message;\r\n    }\r\n}&nbsp;</pre>\r\n<p>1.0.0 includes other minor changes, bug fixes and stability improvements. You can see the complete&nbsp;<a href=\"https://github.com/phalcon/cphalcon/blob/1.0.0/CHANGELOG\">CHANGELOG</a>&gt;&nbsp;here.</p>\r\n<h3>Help with Testing</h3>\r\n<p>This version can be installed from the 1.0.0 branch:</p>\r\n<pre class=\"sh_sh sh_sourceCode\">git clone http://github.com/phalcon/cphalcon\r\ncd build\r\ngit checkout 1.0.0\r\nsudo ./install</pre>\r\n<p><span>Windows users can</span><span>&nbsp;</span><a href=\"phalconphp.com/download\">download</a><span>&nbsp;</span><span>a DLL from the download page.</span>&#8203;&#8203;</p>\r\n<p>We &#8203;welcome your comments regarding this new release in <a href=\"https://forum.phalconphp.com/\">Phosphorum</a>, <a href=\"http://stackoverflow.com/questions/tagged/phalcon\">Stack Overflow</a> or <a href=\"https://groups.google.com/forum/#!forum/phalcon\">Google Group</a>. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.</p>\r\n<p>Thanks!</p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-03-06
-->


Phalcon 1.0.0 beta released 
============================

We're ​are releasing today the beta version of Phalcon 1.0.0. Our goal
is to get this version out to the community so as to discover bugs and
get feedback. This post highlights some of the more important features
introduced in this release:

### Multi-Level Cache

This new feature ​of the cache component, ​allows ​the developer to
implement a multi-level cache​. This new feature is very ​ useful
because you can save the same data in several cache​ locations​ with
different lifetimes ​, reading ​first from the one with the faster
adapter and ending with the slowest one until the data expire​s​:

```php
<?php

$ultraFastFrontend = new Phalcon\Cache\Frontend\Data(array(
    "lifetime" => 3600
));

$fastFrontend = new Phalcon\Cache\Frontend\Data(array(
    "lifetime" => 86400
));

$slowFrontend = new Phalcon\Cache\Frontend\Data(array(
    "lifetime" => 604800
));

//Backends are registered from the fastest to the slower
$cache = new \Phalcon\Cache\Multiple(array(
    new Phalcon\Cache\Backend\Apc($ultraFastFrontend, array(
        "prefix" => 'cache',
    )),
    new Phalcon\Cache\Backend\Memcache($fastFrontend, array(
        "prefix" => 'cache',
        "host" => "localhost",
        "port" => "11211"
    )),
    new Phalcon\Cache\Backend\File($slowFrontend, array(
        "prefix" => 'cache',
        "cacheDir" => "../app/cache/"
    ))
));

//Save, saves in every backend
$cache->save('my-key', $data);
```

We're ​are releasing today the beta version of Phalcon 1.0.0. Our goal
is to get this version out to the community so as to discover bugs and
get feedback. This post highlights some of the more important features
introduced in this release:

### Multi-Level Cache

This new feature ​of the cache component, ​allows ​the developer to
implement a multi-level cache​. This new feature is very ​ useful
because you can save the same data in several cache​ locations​ with
different lifetimes, reading ​first from the one with the faster adapter
and ending with the slowest one until the data expire​s​:

```php
<?php

$ultraFastFrontend = new Phalcon\Cache\Frontend\Data(array(
    "lifetime" => 3600
));

$fastFrontend = new Phalcon\Cache\Frontend\Data(array(
    "lifetime" => 86400
));

$slowFrontend = new Phalcon\Cache\Frontend\Data(array(
    "lifetime" => 604800
));

//Backends are registered from the fastest to the slower
$cache = new \Phalcon\Cache\Multiple(array(
  new Phalcon\Cache\Backend\Apc($frontCache, array(
        "prefix" => 'cache',
    )),
    new Phalcon\Cache\Backend\Memcache($fastFrontCache, array(
        "prefix" => 'cache',
        "host" => "localhost",
        "port" => "11211"
    )),
    new Phalcon\Cache\Backend\File($slowestFrontCache, array(
        "prefix" => 'cache',
        "cacheDir" => "../app/cache/"
    ));
));

//Save, saves in every backend
$cache->save('my-key', $data);

//Read, reads every cache, if one of them return data returns it
$data = $cache->get('my-key');
```

### Volt Improvements

Several volt improvements are introduced in this version:

```php
{# Ternary operator #}
{{ total > 0 ? total|format('%0.2f') : '0.0' }}

{# For-Else clause #}
{% for robot in robots %}
    {{ robot.name }}
{% else %}
    There are no robots
{% endfor %}

{# Loop-Context #}
<table>
{% for robot in robots %}
    {% if loop.first %}
        <thead>
            <tr>
                <th>Position</th>
                <th>Id</th>
                <th>Name</th>
            </tr>
        </thead>ae
        <tbody>
    {% endif %}
    <tr>
        <th>{{ loop.index }}</th>
        <th>{{ robot.id }}</th>
        <th>{{ robot.name }}</th>
    </tr>
    {% if loop.last %}
        <tbody>
    {% endif %}
{% endfor %}
</table>

{# Space control delimiters #}
<ul>
    {%- for robot in robots -%}
    <li>  {{- robot.name -}}</li>
    {%- endfor %}
</ul>
```

### Vertical/Horizontal Sharding Improvements

Now you can define a define a different connection to read from a model
and a different one ​ for write​. This is especially beneficial when
dealing with master/slave configurations in a RDBMS​:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function initialize()
    {
        $this->setReadConnectionService('dbSlave');
        $this->setWriteConnectionService('dbMaster');
    }
}
```

Horizontal sharding implies that the connection to read is selected
acording to the data that will be queried:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function selectReadConnection($intermediate, $bindParams, $bindTypes)
    {
        //Check if there is a 'where' clause in the select
        if (isset($intermediate['where'])) {

            $conditions = $intermediate['where'];

            //Choose the possible shard according to the conditions
            if ($conditions['left']['name'] == 'id') {
                $id = $conditions['right']['value'];
                if ($id > 0 && $id < 10000) {
                    return $this->getDI()->get('dbShard1');
                }
                if ($id > 10000) {
                    return $this->getDI()->get('dbShard2');
                }
            }
        }

        //Use a default shard
        return $this->getDI()->get('dbShard0');
    }

}
```

### Record Snapshots

With this new feature, specific models could be set to maintain a record
snapshot when they're queried. You can use this feature to implement
auditing or just to know what fields are changed according to the data
queried from the persistence:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function initalize()
    {
        $this->keepSnapshots(true);
    }
}
```

This way you can check what fields changed:

```php
$robot = new Robots();
$robot->name = 'Other name';
var_dump($robot->getChangedFields()); // ['name']
var_dump($robot->hasChanged('name')); // true
var_dump($robot->hasChanged('type')); // false
```

### Dynamic Update

This feature allows to set up the ORM to create SQL UPDATE statements
with just the fields that changed instead of the full all-field SQL
update. In some cases this could improve the performance by reducing the
traffic between the application and the database server:

```php
class Robots extends Phalcon\Mvc\Model
{
    public function initalize()
    {
        $this->useDynamicUpdate(true);
    }
}
```

### Validation

Phalcon\\Validation is an independent validation component based on the
validation system implemented in the ORM and the ODM. This component can
be used to implement validation rules that does not belong to a model or
collection:

```php
$validation = new Phalcon\Validation();

$validation
    ->add('name', new PresenceOf(array(
        'message' => 'The name is required'
    )))
    ->add('name', new StringLength(array(
        'min' => 5,
        'minimumMessage' => 'The name is too short'
    )))
    ->add('email', new PresenceOf(array(
        'message' => 'The email is required'
    )))
    ->add('email', new Email(array(
        'message' => 'The email is not valid'
    )))
    ->add('login', new PresenceOf(array(
        'message' => 'The login is required'
    )));

$messages = $validation->validate($_POST);
if (count($messages)) {
    foreach ($messages as $message) {
        echo $message;
    }
} 
```

1.0.0 includes other minor changes, bug fixes and stability
improvements. You can see the
complete [CHANGELOG](https://github.com/phalcon/cphalcon/blob/1.0.0/CHANGELOG)\> here.

### Help with Testing

This version can be installed from the 1.0.0 branch:

```
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 1.0.0
sudo ./install
```

Windows users can [download](https://phalconphp.com/download) a DLL from
the download page.​​

We ​welcome your comments regarding this new release in
[Phosphorum](https://forum.phalconphp.com/), [Stack
Overflow](http://stackoverflow.com/questions/tagged/phalcon) or [Google
Group](https://groups.google.com/forum/#!forum/phalcon). If you discover
any bugs, please (if possible) create a failing test and submit a pull
request, alongside with an issue on Github.

Thanks!

