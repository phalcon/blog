<!--
slug: introduction-series-4-phalcon-query-language
date: Tue Aug 21 2012 13:20:00 GMT-0400 (EDT)
tags: php, phalcon, mvc, sql, hql, mysql
title:  Introduction Series 4: Phalcon Query Language (PHQL)
id: 29905494935
link: http://blog.phalconphp.com/post/29905494935/introduction-series-4-phalcon-query-language
raw: {"blog_name":"phalconphp","id":29905494935,"post_url":"http://blog.phalconphp.com/post/29905494935/introduction-series-4-phalcon-query-language","slug":"introduction-series-4-phalcon-query-language","type":"text","date":"2012-08-21 17:20:00 GMT","timestamp":1345569600,"state":"published","format":"html","reblog_key":"7hf6ahZ5","tags":["php","phalcon","mvc","sql","hql","mysql"],"short_url":"http://tmblr.co/Z6PumvRsWQEN","highlighted":[],"note_count":0,"source_url":"http://github.com/phalcon/cphalcon","source_title":"github.com","title":" Introduction Series 4: Phalcon Query Language (PHQL)","body":"<p>This is the last part of the introduction series regarding our upcoming release of Phalcon 0.5.0.</p>\n<p>With the 0.5x release, we have made changes in the architecture, introducing more components the framework while still keeping performance very high. We felt that the ORM could use some additional optimization as well as functionality, so that was the last area we concentrated on. We have made many improvements in the database and ORM components, such as the use of <a href=\"http://php.net/manual/en/book.pdo.php\">PDO</a>, improved security with automatically binding parameters and much more.</p>\n<p>A few weeks ago, our focus shifted briefly towards a more ambitious project: PhalconQL (PHQL). Following in line with other frameworks, we have created a hybrid SQL language to aid the developers when interacting with databases. PHQL allows the use of models, instead of just tables, that can encapsulate a lot more model logic in them. A similar idea exists in other projects such as Hibernate with its <a href=\"http://en.wikipedia.org/wiki/Hibernate_Query_Language\">HQL</a>, Doctrine with <a href=\"http://doctrine-orm.readthedocs.org/en/2.0.x/reference/dql-doctrine-query-language.html\">DQL</a>.</p>\n<p>PHQL is implemented as a parser (written in C) that translates syntax in that of the target RDBMS. The parser is the most interesting, yet challenging, part of this component. It allows Phalcon to offer a unified SQL language to the developer, while internally doing all the work of translating PHQL instructions to the most optimal SQL instructions depending on the RDBMS type associated with a model.</p>\n<p>To better explain how PHQL works consider the following example. We have two models &ldquo;Cars&rdquo; and &ldquo;Brands&rdquo;:</p>\n<pre class=\"sh_php\">class Cars extends Phalcon\\Mvc\\Model\n{\n    public $id;\n    public $name;\n    public $brand_id;\n    public $year;\n    public $style;\n\n   /**\n    * This model is mapped to the table sample_cars\n    */\n    public function getSource()\n    {\n        return 'sample_cars';\n    }\n\n    /**\n     * A car only has a Brand, but a Brand have many Cars\n     */\n    public function initialize()\n    {\n        $this-&gt;belongsTo('brand_id', 'Brands', 'id');\n    }\n}\n</pre>\n<p>And every Car has a Brand, so a Brand has many Cars:</p>\n<pre class=\"sh_php\">class Brands extends Phalcon\\Mvc\\Model\n{\n\n    public $id;\n    public $name;<br/><br/>    /**\n     * The model Brands is mapped to the \"sample_brands\" table\n     */\n    public function getSource()\n    {\n        return 'sample_brands';\n    }<br/><br/>    /**\n     * A Brand can have many Cars\n     */\n    public function initialize()\n    {\n        $this-&gt;hasMany('id', 'Brands', 'brand_id');\n    }\n}\n</pre>\n<p>Selecting Records With PHQL, we can query existing records as we would in SQL, except that instead of specifying tables, we use models:</p>\n<pre class=\"sh_php\">$query = $manager-&gt;createQuery(\"SELECT * FROM Cars ORDER BY Cars.name\"); \n$query = $manager-&gt;createQuery(\"SELECT Cars.name FROM Cars ORDER BY Cars.name\");\n</pre>\n<p>Most of the SQL standard is supported by PHQL even nonstandard directives as LIMIT:</p>\n<pre class=\"sh_php\">$sql   = \"SELECT c.name FROM Cars AS c \"\n       . \"WHERE c.brand_id = 21 ORDER BY c.name LIMIT 100\";\n$query = $manager-&gt;createQuery($sql);\n</pre>\n<p><strong>Joins</strong> <br/>Creating joins between tables is a trivial task with PHQL, if the relationships are defined in the models. PHQL adds these conditions automatically:</p>\n<pre class=\"sh_php\">// Joining Two tables\n$sql   = \"SELECT Cars.name AS car_name, Brands.name AS brand_name \"\n       . \"FROM Cars \"\n       . \"JOIN Brands \"\n       . \"ORDER BY Cars.name\";\n$query = $manager-&gt;createQuery($sql);\n\n// Using aliases\n$sql   = \"SELECT c.name AS car_name, b.name AS brand_name \"\n       . \"FROM Cars c \"\n       . \"JOIN Brands b \"\n       . \"ORDER BY c.name\";\n$query = $manager-&gt;createQuery($sql);\n\n// This produces the following SQL\n// SELECT c.name AS car_name, b.name AS brand_name \n// FROM sample_cars AS c \n// INNER JOIN sample_brands AS b ON c.brands_id = b.id \n// ORDER BY c.name\n</pre>\n<p>Also, as part of PHQL, we added prepared parameters that automatically escape the input data, introducing more security:</p>\n<pre class=\"sh_php\">$sql    = \"SELECT c.name FROM Cars c WHERE c.id = :id:\";\n$params = array('id' =&gt; $someExternalId);\n$query  = $manager-&gt;createQuery($sql, $params);\n</pre>\n<p>Those parameters are directly transformed into PDO parameters that are compatible various RDBMS.</p>\n<p><strong>Inserting/Updating/Deleting Records</strong> <br/>PHQL is not just about querying a database. It also offers methods to manipulate data using familiar SQL instructions:</p>\n<pre class=\"sh_php\">$sql = \"INSERT INTO Cars VALUES (NULL, 'Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\n\n$manager-&gt;executeQuery($sql);\n\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\n     . \"VALUES ('Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\n$manager-&gt;executeQuery($sql);\n\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\n      . \"VALUES (:name:, :brand_id:, :year:, :style)\";\n\n$params = array(\n    'name'     =&gt; 'Lamborghini Espada',\n    'brand_id' =&gt; 7,\n    'year'      =&gt; 1969,\n    'style'    =&gt; 'Grand Tourer',\n);\n$manager-&gt;executeQuery($sql, $params);\n</pre>\n<p>By default, statements that manipulate data, honor the <a href=\"http://blog.phalconphp.com/post/29280239243/introduction-series-2-the-events-manager\">Events Manager</a> hook calls. So internally, events such as beforeSave, beforeUpdate or beforeDelete are also executed prior to the statement. Similarly, after the statement is executed, afterSave, afterUpdate or afterDelete are also executed.</p>\n<p>For example:</p>\n<pre class=\"sh_php\">$manager-&gt;executeQuery(\"DELETE FROM Brands WHERE name LIKE 'Lam%'\");\n</pre>\n<p>Is the same as:</p>\n<pre class=\"sh_php\">foreach (Brands::find(\"name LIKE 'Lam%'\") as $brand) {\n    $brand-&gt;delete();\n}\n</pre>\n<p>So, for every record found, the delete method will call the events beforeDelete and afterDelete (if they are defined) giving the developer the option to define any business rules needed or validating virtual foreign keys as well.</p>\n<p>This ensures the correct flow of operation throughout the framework when using PHQL.</p>\n<p><strong>Namespaces</strong> <br/>PHQL also takes advantage of Namespaces, and can be used transparently as part of a PHQL statement:</p>\n<pre class=\"sh_php\">$sql   = \"SELECT Store\\Products.type, SUM(Store\\Products.price) AS price \"\n       . \"FROM Store\\Products \"\n       . \"ORDER BY Store\\Products.type\";\n\n$query = $manager-&gt;createQuery($sql);\n</pre>\n<p><strong>General Operation</strong><br/>To achieve the highest performance possible, we wrote a parser that uses the same technology as <a href=\"http://en.wikipedia.org/wiki/Lemon_Parser_Generator\">SQLite</a>. This technology provides a small in-memory parser with a very low memory footprint that is also thread-safe.</p>\n<p>The parser first checks the syntax of the passed PHQL statement, then builds an intermediate representation of the statement and finally it converts it to the respective SQL dialect of the target RDBMS.</p>\n<p>We are in the process of rewriting the documentation to reflect all these changes. However if you want to check some examples, please check our unit tests</p>\n<p><strong>Conclusion</strong><br/>Phalcon provided the first ORM written purely in C for PHP developers. We are now taking it a step further, offering a high level, object oriented SQL dialect, which can be used in any of the supported RDBMS for an application. The common syntax allows developers to quickly develop ultra fast models and become more productive.</p>\n<p>PS: We need vacations :)</p>","reblog":{"tree_html":"","comment":"<p>This is the last part of the introduction series regarding our upcoming release of Phalcon 0.5.0.</p>\n<p>With the 0.5x release, we have made changes in the architecture, introducing more components the framework while still keeping performance very high. We felt that the ORM could use some additional optimization as well as functionality, so that was the last area we concentrated on. We have made many improvements in the database and ORM components, such as the use of <a href=\"http://php.net/manual/en/book.pdo.php\">PDO</a>, improved security with automatically binding parameters and much more.</p>\n<p>A few weeks ago, our focus shifted briefly towards a more ambitious project: PhalconQL (PHQL). Following in line with other frameworks, we have created a hybrid SQL language to aid the developers when interacting with databases. PHQL allows the use of models, instead of just tables, that can encapsulate a lot more model logic in them. A similar idea exists in other projects such as Hibernate with its <a href=\"http://en.wikipedia.org/wiki/Hibernate_Query_Language\">HQL</a>, Doctrine with <a href=\"http://doctrine-orm.readthedocs.org/en/2.0.x/reference/dql-doctrine-query-language.html\">DQL</a>.</p>\n<p>PHQL is implemented as a parser (written in C) that translates syntax in that of the target RDBMS. The parser is the most interesting, yet challenging, part of this component. It allows Phalcon to offer a unified SQL language to the developer, while internally doing all the work of translating PHQL instructions to the most optimal SQL instructions depending on the RDBMS type associated with a model.</p>\n<p>To better explain how PHQL works consider the following example. We have two models &ldquo;Cars&rdquo; and &ldquo;Brands&rdquo;:</p>\n<pre class=\"sh_php\">class Cars extends Phalcon\\Mvc\\Model\n{\n    public $id;\n    public $name;\n    public $brand_id;\n    public $year;\n    public $style;\n\n   /**\n    * This model is mapped to the table sample_cars\n    */\n    public function getSource()\n    {\n        return 'sample_cars';\n    }\n\n    /**\n     * A car only has a Brand, but a Brand have many Cars\n     */\n    public function initialize()\n    {\n        $this-&gt;belongsTo('brand_id', 'Brands', 'id');\n    }\n}\n</pre>\n<p>And every Car has a Brand, so a Brand has many Cars:</p>\n<pre class=\"sh_php\">class Brands extends Phalcon\\Mvc\\Model\n{\n\n    public $id;\n    public $name;<br><br>   &nbsp;/**\n     * The model Brands is mapped to the \"sample_brands\" table\n     */\n    public function getSource()\n    {\n        return 'sample_brands';\n    }<br><br>   &nbsp;/**\n     * A Brand can have many Cars\n     */\n    public function initialize()\n    {\n        $this-&gt;hasMany('id', 'Brands', 'brand_id');\n    }\n}\n</pre>\n<p>Selecting Records With PHQL, we can query existing records as we would in SQL, except that instead of specifying tables, we use models:</p>\n<pre class=\"sh_php\">$query = $manager-&gt;createQuery(\"SELECT * FROM Cars ORDER BY Cars.name\"); \n$query = $manager-&gt;createQuery(\"SELECT Cars.name FROM Cars ORDER BY Cars.name\");\n</pre>\n<p>Most of the SQL standard is supported by PHQL even nonstandard directives as LIMIT:</p>\n<pre class=\"sh_php\">$sql   = \"SELECT c.name FROM Cars AS c \"\n       . \"WHERE c.brand_id = 21 ORDER BY c.name LIMIT 100\";\n$query = $manager-&gt;createQuery($sql);\n</pre>\n<p><strong>Joins</strong> <br>Creating joins between tables is a trivial task with PHQL, if the relationships are defined in the models. PHQL adds these conditions automatically:</p>\n<pre class=\"sh_php\">// Joining Two tables\n$sql   = \"SELECT Cars.name AS car_name, Brands.name AS brand_name \"\n       . \"FROM Cars \"\n       . \"JOIN Brands \"\n       . \"ORDER BY Cars.name\";\n$query = $manager-&gt;createQuery($sql);\n\n// Using aliases\n$sql   = \"SELECT c.name AS car_name, b.name AS brand_name \"\n       . \"FROM Cars c \"\n       . \"JOIN Brands b \"\n       . \"ORDER BY c.name\";\n$query = $manager-&gt;createQuery($sql);\n\n// This produces the following SQL\n// SELECT c.name AS car_name, b.name AS brand_name \n// FROM sample_cars AS c \n// INNER JOIN sample_brands AS b ON c.brands_id = b.id \n// ORDER BY c.name\n</pre>\n<p>Also, as part of PHQL, we added prepared parameters that automatically escape the input data, introducing more security:</p>\n<pre class=\"sh_php\">$sql    = \"SELECT c.name FROM Cars c WHERE c.id = :id:\";\n$params = array('id' =&gt; $someExternalId);\n$query  = $manager-&gt;createQuery($sql, $params);\n</pre>\n<p>Those parameters are directly transformed into PDO parameters that are compatible various RDBMS.</p>\n<p><strong>Inserting/Updating/Deleting Records</strong> <br>PHQL is not just about querying a database. It also offers methods to manipulate data using familiar SQL instructions:</p>\n<pre class=\"sh_php\">$sql = \"INSERT INTO Cars VALUES (NULL, 'Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\n\n$manager-&gt;executeQuery($sql);\n\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\n     . \"VALUES ('Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\n$manager-&gt;executeQuery($sql);\n\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\n      . \"VALUES (:name:, :brand_id:, :year:, :style)\";\n\n$params = array(\n    'name'     =&gt; 'Lamborghini Espada',\n    'brand_id' =&gt; 7,\n    'year'      =&gt; 1969,\n    'style'    =&gt; 'Grand Tourer',\n);\n$manager-&gt;executeQuery($sql, $params);\n</pre>\n<p>By default, statements that manipulate data, honor the <a href=\"http://blog.phalconphp.com/post/29280239243/introduction-series-2-the-events-manager\">Events Manager</a> hook calls. So internally, events such as beforeSave, beforeUpdate or beforeDelete are also executed prior to the statement. Similarly, after the statement is executed, afterSave, afterUpdate or afterDelete are also executed.</p>\n<p>For example:</p>\n<pre class=\"sh_php\">$manager-&gt;executeQuery(\"DELETE FROM Brands WHERE name LIKE 'Lam%'\");\n</pre>\n<p>Is the same as:</p>\n<pre class=\"sh_php\">foreach (Brands::find(\"name LIKE 'Lam%'\") as $brand) {\n    $brand-&gt;delete();\n}\n</pre>\n<p>So, for every record found, the delete method will call the events beforeDelete and afterDelete (if they are defined) giving the developer the option to define any business rules needed or validating virtual foreign keys as well.</p>\n<p>This ensures the correct flow of operation throughout the framework when using PHQL.</p>\n<p><strong>Namespaces</strong> <br>PHQL also takes advantage of Namespaces, and can be used transparently as part of a PHQL statement:</p>\n<pre class=\"sh_php\">$sql   = \"SELECT Store\\Products.type, SUM(Store\\Products.price) AS price \"\n       . \"FROM Store\\Products \"\n       . \"ORDER BY Store\\Products.type\";\n\n$query = $manager-&gt;createQuery($sql);\n</pre>\n<p><strong>General Operation</strong><br>To achieve the highest performance possible, we wrote a parser that uses the same technology as <a href=\"http://en.wikipedia.org/wiki/Lemon_Parser_Generator\">SQLite</a>. This technology provides a small in-memory parser with a very low memory footprint that is also thread-safe.</p>\n<p>The parser first checks the syntax of the passed PHQL statement, then builds an intermediate representation of the statement and finally it converts it to the respective SQL dialect of the target RDBMS.</p>\n<p>We are in the process of rewriting the documentation to reflect all these changes. However if you want to check some examples, please check our unit tests</p>\n<p><strong>Conclusion</strong><br>Phalcon provided the first ORM written purely in C for PHP developers. We are now taking it a step further, offering a high level, object oriented SQL dialect, which can be used in any of the supported RDBMS for an application. The common syntax allows developers to quickly develop ultra fast models and become more productive.</p>\n<p>PS: We need vacations :)</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"29905494935"},"content":"<p>This is the last part of the introduction series regarding our upcoming release of Phalcon 0.5.0.</p>\n<p>With the 0.5x release, we have made changes in the architecture, introducing more components the framework while still keeping performance very high. We felt that the ORM could use some additional optimization as well as functionality, so that was the last area we concentrated on. We have made many improvements in the database and ORM components, such as the use of <a href=\"http://php.net/manual/en/book.pdo.php\">PDO</a>, improved security with automatically binding parameters and much more.</p>\n<p>A few weeks ago, our focus shifted briefly towards a more ambitious project: PhalconQL (PHQL). Following in line with other frameworks, we have created a hybrid SQL language to aid the developers when interacting with databases. PHQL allows the use of models, instead of just tables, that can encapsulate a lot more model logic in them. A similar idea exists in other projects such as Hibernate with its <a href=\"http://en.wikipedia.org/wiki/Hibernate_Query_Language\">HQL</a>, Doctrine with <a href=\"http://doctrine-orm.readthedocs.org/en/2.0.x/reference/dql-doctrine-query-language.html\">DQL</a>.</p>\n<p>PHQL is implemented as a parser (written in C) that translates syntax in that of the target RDBMS. The parser is the most interesting, yet challenging, part of this component. It allows Phalcon to offer a unified SQL language to the developer, while internally doing all the work of translating PHQL instructions to the most optimal SQL instructions depending on the RDBMS type associated with a model.</p>\n<p>To better explain how PHQL works consider the following example. We have two models “Cars” and “Brands”:</p>\n<pre class=\"sh_php\">class Cars extends Phalcon\\Mvc\\Model\n{\n    public $id;\n    public $name;\n    public $brand_id;\n    public $year;\n    public $style;\n\n   /**\n    * This model is mapped to the table sample_cars\n    */\n    public function getSource()\n    {\n        return 'sample_cars';\n    }\n\n    /**\n     * A car only has a Brand, but a Brand have many Cars\n     */\n    public function initialize()\n    {\n        $this->belongsTo('brand_id', 'Brands', 'id');\n    }\n}\n</pre>\n<p>And every Car has a Brand, so a Brand has many Cars:</p>\n<pre class=\"sh_php\">class Brands extends Phalcon\\Mvc\\Model\n{\n\n    public $id;\n    public $name;<br><br>    /**\n     * The model Brands is mapped to the \"sample_brands\" table\n     */\n    public function getSource()\n    {\n        return 'sample_brands';\n    }<br><br>    /**\n     * A Brand can have many Cars\n     */\n    public function initialize()\n    {\n        $this->hasMany('id', 'Brands', 'brand_id');\n    }\n}\n</pre>\n<p>Selecting Records With PHQL, we can query existing records as we would in SQL, except that instead of specifying tables, we use models:</p>\n<pre class=\"sh_php\">$query = $manager->createQuery(\"SELECT * FROM Cars ORDER BY Cars.name\"); \n$query = $manager->createQuery(\"SELECT Cars.name FROM Cars ORDER BY Cars.name\");\n</pre>\n<p>Most of the SQL standard is supported by PHQL even nonstandard directives as LIMIT:</p>\n<pre class=\"sh_php\">$sql   = \"SELECT c.name FROM Cars AS c \"\n       . \"WHERE c.brand_id = 21 ORDER BY c.name LIMIT 100\";\n$query = $manager->createQuery($sql);\n</pre>\n<p><strong>Joins</strong> <br>Creating joins between tables is a trivial task with PHQL, if the relationships are defined in the models. PHQL adds these conditions automatically:</p>\n<pre class=\"sh_php\">// Joining Two tables\n$sql   = \"SELECT Cars.name AS car_name, Brands.name AS brand_name \"\n       . \"FROM Cars \"\n       . \"JOIN Brands \"\n       . \"ORDER BY Cars.name\";\n$query = $manager->createQuery($sql);\n\n// Using aliases\n$sql   = \"SELECT c.name AS car_name, b.name AS brand_name \"\n       . \"FROM Cars c \"\n       . \"JOIN Brands b \"\n       . \"ORDER BY c.name\";\n$query = $manager->createQuery($sql);\n\n// This produces the following SQL\n// SELECT c.name AS car_name, b.name AS brand_name \n// FROM sample_cars AS c \n// INNER JOIN sample_brands AS b ON c.brands_id = b.id \n// ORDER BY c.name\n</pre>\n<p>Also, as part of PHQL, we added prepared parameters that automatically escape the input data, introducing more security:</p>\n<pre class=\"sh_php\">$sql    = \"SELECT c.name FROM Cars c WHERE c.id = :id:\";\n$params = array('id' => $someExternalId);\n$query  = $manager->createQuery($sql, $params);\n</pre>\n<p>Those parameters are directly transformed into PDO parameters that are compatible various RDBMS.</p>\n<p><strong>Inserting/Updating/Deleting Records</strong> <br>PHQL is not just about querying a database. It also offers methods to manipulate data using familiar SQL instructions:</p>\n<pre class=\"sh_php\">$sql = \"INSERT INTO Cars VALUES (NULL, 'Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\n\n$manager->executeQuery($sql);\n\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\n     . \"VALUES ('Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\n$manager->executeQuery($sql);\n\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\n      . \"VALUES (:name:, :brand_id:, :year:, :style)\";\n\n$params = array(\n    'name'     => 'Lamborghini Espada',\n    'brand_id' => 7,\n    'year'      => 1969,\n    'style'    => 'Grand Tourer',\n);\n$manager->executeQuery($sql, $params);\n</pre>\n<p>By default, statements that manipulate data, honor the <a href=\"http://blog.phalconphp.com/post/29280239243/introduction-series-2-the-events-manager\">Events Manager</a> hook calls. So internally, events such as beforeSave, beforeUpdate or beforeDelete are also executed prior to the statement. Similarly, after the statement is executed, afterSave, afterUpdate or afterDelete are also executed.</p>\n<p>For example:</p>\n<pre class=\"sh_php\">$manager->executeQuery(\"DELETE FROM Brands WHERE name LIKE 'Lam%'\");\n</pre>\n<p>Is the same as:</p>\n<pre class=\"sh_php\">foreach (Brands::find(\"name LIKE 'Lam%'\") as $brand) {\n    $brand->delete();\n}\n</pre>\n<p>So, for every record found, the delete method will call the events beforeDelete and afterDelete (if they are defined) giving the developer the option to define any business rules needed or validating virtual foreign keys as well.</p>\n<p>This ensures the correct flow of operation throughout the framework when using PHQL.</p>\n<p><strong>Namespaces</strong> <br>PHQL also takes advantage of Namespaces, and can be used transparently as part of a PHQL statement:</p>\n<pre class=\"sh_php\">$sql   = \"SELECT Store\\Products.type, SUM(Store\\Products.price) AS price \"\n       . \"FROM Store\\Products \"\n       . \"ORDER BY Store\\Products.type\";\n\n$query = $manager->createQuery($sql);\n</pre>\n<p><strong>General Operation</strong><br>To achieve the highest performance possible, we wrote a parser that uses the same technology as <a href=\"http://en.wikipedia.org/wiki/Lemon_Parser_Generator\">SQLite</a>. This technology provides a small in-memory parser with a very low memory footprint that is also thread-safe.</p>\n<p>The parser first checks the syntax of the passed PHQL statement, then builds an intermediate representation of the statement and finally it converts it to the respective SQL dialect of the target RDBMS.</p>\n<p>We are in the process of rewriting the documentation to reflect all these changes. However if you want to check some examples, please check our unit tests</p>\n<p><strong>Conclusion</strong><br>Phalcon provided the first ORM written purely in C for PHP developers. We are now taking it a step further, offering a high level, object oriented SQL dialect, which can be used in any of the supported RDBMS for an application. The common syntax allows developers to quickly develop ultra fast models and become more productive.</p>\n<p>PS: We need vacations :)</p>","content_raw":"<p>This is the last part of the introduction series regarding our upcoming release of Phalcon 0.5.0.</p>\r\n<p>With the 0.5x release, we have made changes in the architecture, introducing more components the framework while still keeping performance very high. We felt that the ORM could use some additional optimization as well as functionality, so that was the last area we concentrated on. We have made many improvements in the database and ORM components, such as the use of <a href=\"http://php.net/manual/en/book.pdo.php\">PDO</a>, improved security with automatically binding parameters and much more.</p>\r\n<p>A few weeks ago, our focus shifted briefly towards a more ambitious project: PhalconQL (PHQL). Following in line with other frameworks, we have created a hybrid SQL language to aid the developers when interacting with databases. PHQL allows the use of models, instead of just tables, that can encapsulate a lot more model logic in them. A similar idea exists in other projects such as Hibernate with its <a href=\"http://en.wikipedia.org/wiki/Hibernate_Query_Language\">HQL</a>, Doctrine with <a href=\"http://doctrine-orm.readthedocs.org/en/2.0.x/reference/dql-doctrine-query-language.html\">DQL</a>.</p>\r\n<p>PHQL is implemented as a parser (written in C) that translates syntax in that of the target RDBMS. The parser is the most interesting, yet challenging, part of this component. It allows Phalcon to offer a unified SQL language to the developer, while internally doing all the work of translating PHQL instructions to the most optimal SQL instructions depending on the RDBMS type associated with a model.</p>\r\n<p>To better explain how PHQL works consider the following example. We have two models \"Cars\" and \"Brands\":</p>\r\n<pre class=\"sh_php\">class Cars extends Phalcon\\Mvc\\Model\r\n{\r\n    public $id;\r\n    public $name;\r\n    public $brand_id;\r\n    public $year;\r\n    public $style;\r\n\r\n   /**\r\n    * This model is mapped to the table sample_cars\r\n    */\r\n    public function getSource()\r\n    {\r\n        return 'sample_cars';\r\n    }\r\n\r\n    /**\r\n     * A car only has a Brand, but a Brand have many Cars\r\n     */\r\n    public function initialize()\r\n    {\r\n        $this-&gt;belongsTo('brand_id', 'Brands', 'id');\r\n    }\r\n}\r\n</pre>\r\n<p>And every Car has a Brand, so a Brand has many Cars:</p>\r\n<pre class=\"sh_php\">class Brands extends Phalcon\\Mvc\\Model\r\n{\r\n\r\n    public $id;\r\n    public $name;<br><br>   &nbsp;/**\r\n     * The model Brands is mapped to the \"sample_brands\" table\r\n     */\r\n    public function getSource()\r\n    {\r\n        return 'sample_brands';\r\n    }<br><br>   &nbsp;/**\r\n     * A Brand can have many Cars\r\n     */\r\n    public function initialize()\r\n    {\r\n        $this-&gt;hasMany('id', 'Brands', 'brand_id');\r\n    }\r\n}\r\n</pre>\r\n<p>Selecting Records With PHQL, we can query existing records as we would in SQL, except that instead of specifying tables, we use models:</p>\r\n<pre class=\"sh_php\">$query = $manager-&gt;createQuery(\"SELECT * FROM Cars ORDER BY Cars.name\"); \r\n$query = $manager-&gt;createQuery(\"SELECT Cars.name FROM Cars ORDER BY Cars.name\");\r\n</pre>\r\n<p>Most of the SQL standard is supported by PHQL even nonstandard directives as LIMIT:</p>\r\n<pre class=\"sh_php\">$sql   = \"SELECT c.name FROM Cars AS c \"\r\n       . \"WHERE c.brand_id = 21 ORDER BY c.name LIMIT 100\";\r\n$query = $manager-&gt;createQuery($sql);\r\n</pre>\r\n<p><strong>Joins</strong> <br>Creating joins between tables is a trivial task with PHQL, if the relationships are defined in the models. PHQL adds these conditions automatically:</p>\r\n<pre class=\"sh_php\">// Joining Two tables\r\n$sql   = \"SELECT Cars.name AS car_name, Brands.name AS brand_name \"\r\n       . \"FROM Cars \"\r\n       . \"JOIN Brands \"\r\n       . \"ORDER BY Cars.name\";\r\n$query = $manager-&gt;createQuery($sql);\r\n\r\n// Using aliases\r\n$sql   = \"SELECT c.name AS car_name, b.name AS brand_name \"\r\n       . \"FROM Cars c \"\r\n       . \"JOIN Brands b \"\r\n       . \"ORDER BY c.name\";\r\n$query = $manager-&gt;createQuery($sql);\r\n\r\n// This produces the following SQL\r\n// SELECT c.name AS car_name, b.name AS brand_name \r\n// FROM sample_cars AS c \r\n// INNER JOIN sample_brands AS b ON c.brands_id = b.id \r\n// ORDER BY c.name\r\n</pre>\r\n<p>Also, as part of PHQL, we added prepared parameters that automatically escape the input data, introducing more security:</p>\r\n<pre class=\"sh_php\">$sql    = \"SELECT c.name FROM Cars c WHERE c.id = :id:\";\r\n$params = array('id' =&gt; $someExternalId);\r\n$query  = $manager-&gt;createQuery($sql, $params);\r\n</pre>\r\n<p>Those parameters are directly transformed into PDO parameters that are compatible various RDBMS.</p>\r\n<p><strong>Inserting/Updating/Deleting Records</strong> <br>PHQL is not just about querying a database. It also offers methods to manipulate data using familiar SQL instructions:</p>\r\n<pre class=\"sh_php\">$sql = \"INSERT INTO Cars VALUES (NULL, 'Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\r\n\r\n$manager-&gt;executeQuery($sql);\r\n\r\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\r\n     . \"VALUES ('Lamborghini Espada', 7, 1969, 'Grand Tourer')\";\r\n$manager-&gt;executeQuery($sql);\r\n\r\n$sql = \"INSERT INTO Cars (name, brand_id, year, style) \"\r\n      . \"VALUES (:name:, :brand_id:, :year:, :style)\";\r\n\r\n$params = array(\r\n    'name'     =&gt; 'Lamborghini Espada',\r\n    'brand_id' =&gt; 7,\r\n    'year'      =&gt; 1969,\r\n    'style'    =&gt; 'Grand Tourer',\r\n);\r\n$manager-&gt;executeQuery($sql, $params);\r\n</pre>\r\n<p>By default, statements that manipulate data, honor the <a href=\"http://blog.phalconphp.com/post/29280239243/introduction-series-2-the-events-manager\">Events Manager</a> hook calls. So internally, events such as beforeSave, beforeUpdate or beforeDelete are also executed prior to the statement. Similarly, after the statement is executed, afterSave, afterUpdate or afterDelete are also executed.</p>\r\n<p>For example:</p>\r\n<pre class=\"sh_php\">$manager-&gt;executeQuery(\"DELETE FROM Brands WHERE name LIKE 'Lam%'\");\r\n</pre>\r\n<p>Is the same as:</p>\r\n<pre class=\"sh_php\">foreach (Brands::find(\"name LIKE 'Lam%'\") as $brand) {\r\n    $brand-&gt;delete();\r\n}\r\n</pre>\r\n<p>So, for every record found, the delete method will call the events beforeDelete and afterDelete (if they are defined) giving the developer the option to define any business rules needed or validating virtual foreign keys as well.</p>\r\n<p>This ensures the correct flow of operation throughout the framework when using PHQL.</p>\r\n<p><strong>Namespaces</strong> <br>PHQL also takes advantage of Namespaces, and can be used transparently as part of a PHQL statement:</p>\r\n<pre class=\"sh_php\">$sql   = \"SELECT Store\\Products.type, SUM(Store\\Products.price) AS price \"\r\n       . \"FROM Store\\Products \"\r\n       . \"ORDER BY Store\\Products.type\";\r\n\r\n$query = $manager-&gt;createQuery($sql);\r\n</pre>\r\n<p><strong>General Operation</strong><br>To achieve the highest performance possible, we wrote a parser that uses the same technology as <a href=\"http://en.wikipedia.org/wiki/Lemon_Parser_Generator\">SQLite</a>. This technology provides a small in-memory parser with a very low memory footprint that is also thread-safe.</p>\r\n<p>The parser first checks the syntax of the passed PHQL statement, then builds an intermediate representation of the statement and finally it converts it to the respective SQL dialect of the target RDBMS.</p>\r\n<p>We are in the process of rewriting the documentation to reflect all these changes. However if you want to check some examples, please check our unit tests</p>\r\n<p><strong>Conclusion</strong><br>Phalcon provided the first ORM written purely in C for PHP developers. We are now taking it a step further, offering a high level, object oriented SQL dialect, which can be used in any of the supported RDBMS for an application. The common syntax allows developers to quickly develop ultra fast models and become more productive.</p>\r\n<p>PS: We need vacations :)</p>","is_current_item":true,"is_root_item":true}]}
publish: 2012-08-021
-->


 Introduction Series 4: Phalcon Query Language (PHQL)
=====================================================

This is the last part of the introduction series regarding our upcoming
release of Phalcon 0.5.0.

With the 0.5x release, we have made changes in the architecture,
introducing more components the framework while still keeping
performance very high. We felt that the ORM could use some additional
optimization as well as functionality, so that was the last area we
concentrated on. We have made many improvements in the database and ORM
components, such as the use of
[PDO](http://php.net/manual/en/book.pdo.php), improved security with
automatically binding parameters and much more.

A few weeks ago, our focus shifted briefly towards a more ambitious
project: PhalconQL (PHQL). Following in line with other frameworks, we
have created a hybrid SQL language to aid the developers when
interacting with databases. PHQL allows the use of models, instead of
just tables, that can encapsulate a lot more model logic in them. A
similar idea exists in other projects such as Hibernate with its
[HQL](http://en.wikipedia.org/wiki/Hibernate_Query_Language), Doctrine
with
[DQL](http://doctrine-orm.readthedocs.org/en/2.0.x/reference/dql-doctrine-query-language.html).

PHQL is implemented as a parser (written in C) that translates syntax in
that of the target RDBMS. The parser is the most interesting, yet
challenging, part of this component. It allows Phalcon to offer a
unified SQL language to the developer, while internally doing all the
work of translating PHQL instructions to the most optimal SQL
instructions depending on the RDBMS type associated with a model.

To better explain how PHQL works consider the following example. We have
two models “Cars” and “Brands”:

~~~~ {.sh_php}
class Cars extends Phalcon\Mvc\Model
{
    public $id;
    public $name;
    public $brand_id;
    public $year;
    public $style;

   /**
    * This model is mapped to the table sample_cars
    */
    public function getSource()
    {
        return 'sample_cars';
    }

    /**
     * A car only has a Brand, but a Brand have many Cars
     */
    public function initialize()
    {
        $this->belongsTo('brand_id', 'Brands', 'id');
    }
}
~~~~

And every Car has a Brand, so a Brand has many Cars:

~~~~ {.sh_php}
class Brands extends Phalcon\Mvc\Model
{

    public $id;
    public $name;    /**
     * The model Brands is mapped to the "sample_brands" table
     */
    public function getSource()
    {
        return 'sample_brands';
    }    /**
     * A Brand can have many Cars
     */
    public function initialize()
    {
        $this->hasMany('id', 'Brands', 'brand_id');
    }
}
~~~~

Selecting Records With PHQL, we can query existing records as we would
in SQL, except that instead of specifying tables, we use models:

~~~~ {.sh_php}
$query = $manager->createQuery("SELECT * FROM Cars ORDER BY Cars.name"); 
$query = $manager->createQuery("SELECT Cars.name FROM Cars ORDER BY Cars.name");
~~~~

Most of the SQL standard is supported by PHQL even nonstandard
directives as LIMIT:

~~~~ {.sh_php}
$sql   = "SELECT c.name FROM Cars AS c "
       . "WHERE c.brand_id = 21 ORDER BY c.name LIMIT 100";
$query = $manager->createQuery($sql);
~~~~

**Joins** \
Creating joins between tables is a trivial task with PHQL, if the
relationships are defined in the models. PHQL adds these conditions
automatically:

~~~~ {.sh_php}
// Joining Two tables
$sql   = "SELECT Cars.name AS car_name, Brands.name AS brand_name "
       . "FROM Cars "
       . "JOIN Brands "
       . "ORDER BY Cars.name";
$query = $manager->createQuery($sql);

// Using aliases
$sql   = "SELECT c.name AS car_name, b.name AS brand_name "
       . "FROM Cars c "
       . "JOIN Brands b "
       . "ORDER BY c.name";
$query = $manager->createQuery($sql);

// This produces the following SQL
// SELECT c.name AS car_name, b.name AS brand_name 
// FROM sample_cars AS c 
// INNER JOIN sample_brands AS b ON c.brands_id = b.id 
// ORDER BY c.name
~~~~

Also, as part of PHQL, we added prepared parameters that automatically
escape the input data, introducing more security:

~~~~ {.sh_php}
$sql    = "SELECT c.name FROM Cars c WHERE c.id = :id:";
$params = array('id' => $someExternalId);
$query  = $manager->createQuery($sql, $params);
~~~~

Those parameters are directly transformed into PDO parameters that are
compatible various RDBMS.

**Inserting/Updating/Deleting Records** \
PHQL is not just about querying a database. It also offers methods to
manipulate data using familiar SQL instructions:

~~~~ {.sh_php}
$sql = "INSERT INTO Cars VALUES (NULL, 'Lamborghini Espada', 7, 1969, 'Grand Tourer')";

$manager->executeQuery($sql);

$sql = "INSERT INTO Cars (name, brand_id, year, style) "
     . "VALUES ('Lamborghini Espada', 7, 1969, 'Grand Tourer')";
$manager->executeQuery($sql);

$sql = "INSERT INTO Cars (name, brand_id, year, style) "
      . "VALUES (:name:, :brand_id:, :year:, :style)";

$params = array(
    'name'     => 'Lamborghini Espada',
    'brand_id' => 7,
    'year'      => 1969,
    'style'    => 'Grand Tourer',
);
$manager->executeQuery($sql, $params);
~~~~

By default, statements that manipulate data, honor the [Events
Manager](http://blog.phalconphp.com/post/29280239243/introduction-series-2-the-events-manager)
hook calls. So internally, events such as beforeSave, beforeUpdate or
beforeDelete are also executed prior to the statement. Similarly, after
the statement is executed, afterSave, afterUpdate or afterDelete are
also executed.

For example:

~~~~ {.sh_php}
$manager->executeQuery("DELETE FROM Brands WHERE name LIKE 'Lam%'");
~~~~

Is the same as:

~~~~ {.sh_php}
foreach (Brands::find("name LIKE 'Lam%'") as $brand) {
    $brand->delete();
}
~~~~

So, for every record found, the delete method will call the events
beforeDelete and afterDelete (if they are defined) giving the developer
the option to define any business rules needed or validating virtual
foreign keys as well.

This ensures the correct flow of operation throughout the framework when
using PHQL.

**Namespaces** \
PHQL also takes advantage of Namespaces, and can be used transparently
as part of a PHQL statement:

~~~~ {.sh_php}
$sql   = "SELECT Store\Products.type, SUM(Store\Products.price) AS price "
       . "FROM Store\Products "
       . "ORDER BY Store\Products.type";

$query = $manager->createQuery($sql);
~~~~

**General Operation**\
To achieve the highest performance possible, we wrote a parser that uses
the same technology as
[SQLite](http://en.wikipedia.org/wiki/Lemon_Parser_Generator). This
technology provides a small in-memory parser with a very low memory
footprint that is also thread-safe.

The parser first checks the syntax of the passed PHQL statement, then
builds an intermediate representation of the statement and finally it
converts it to the respective SQL dialect of the target RDBMS.

We are in the process of rewriting the documentation to reflect all
these changes. However if you want to check some examples, please check
our unit tests

**Conclusion**\
Phalcon provided the first ORM written purely in C for PHP developers.
We are now taking it a step further, offering a high level, object
oriented SQL dialect, which can be used in any of the supported RDBMS
for an application. The common syntax allows developers to quickly
develop ultra fast models and become more productive.

PS: We need vacations :)

