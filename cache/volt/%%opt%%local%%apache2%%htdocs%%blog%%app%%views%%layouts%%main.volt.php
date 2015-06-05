<!DOCTYPE html>
<html lang="en">
    <style type="text/css">figure {margin: 0;}</style>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# blog: http://ogp.me/ns/blog#">
    <meta charset="utf-8">

    <meta name="twitter:site" content="@phalconphp" />
    <meta name="twitter:card" content="summary" />

    <meta property="og:site_name" content="Phalcon" />
    <meta property="og:type" content="website" /> <!-- article or subpages-->

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link href="//static.phalconphp.com/images/favicon.ico" rel="icon" type="image/x-ico"/>

    <meta name="keywords" content="php, phalcon, phalcon php, php framework, faster php framework">
    <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="//static.phalconphp.com/css/phalcon.min.css" />
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:700,400' rel='stylesheet' type='text/css'>
    <!--
    EUROPE <link href='https://fonts.googleapis.com/css?family=Open+Sans:700,400&subset=latin-ext' rel='stylesheet' type='text/css'>
    GREEK <link href='https://fonts.googleapis.com/css?family=Open+Sans:700,400&subset=greek-ext' rel='stylesheet' type='text/css'>
    RUSSIA <link href='https://fonts.googleapis.com/css?family=Open+Sans:700,400&subset=cyrillic-ext,latin' rel='stylesheet' type='text/css'>
    -->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <meta http-equiv="x-dns-prefetch-control" content="off"/>
    <meta name="keywords" content="phalcon,php,zephir,phalcon2,release" />

    <meta property="og:title" content="Phalcon Framework" />
    <meta property="og:url" content="http://blog.phalconphp.com/?og=1" />
    <meta property="og:description" content="We are an open source web framework for PHP delivered as a C extension offering high performance and..." />
    <meta property="og:type" content="tumblr-feed:tumblelog" />

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="description" content="We are an open source web framework for PHP delivered as a C extension offering high performance and lower resource consumption" />
    <link rel="alternate" type="application/rss+xml" href="http://blog.phalconphp.com/rss" />
    <meta name="text:Disqus Shortname" content="phalconphp"/>

    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/prettify/0.1/prettify.css"/>
    <link rel="stylesheet" type="text/css" href="https://phosphorum-1618.kxcdn.com/css/theme.css?v=2.1.1"/>

    <?php echo $this->tag->stylesheetLink('css/style.css'); ?>

</head>
<body>
<header class="page-header">
    <nav class="navbar" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu-container">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand phalcon-logo" href="https://phalconphp.com/">
                    <span itemprop="name" class="sr-only">Phalcon PHP</span>
                </a>
            </div>

            <div class="collapse navbar-collapse navbar-right" id="main-menu-container">
                <ul class="nav navbar-nav main-menu">
                    <li class="first"><a href="https://phalconphp.com/en/download" class="header-nav-link">Download</a></li>
                    <li><a href="https://docs.phalconphp.com/en/latest/index.html" class="header-nav-link" target="_blank">Documentation</a></li>
                    <li><a href="https://forum.phalconphp.com/" class="header-nav-link" target="_blank">Forum</a></li>
                    <li><a href="https://blog.phalconphp.com/" class="header-nav-link" target="_blank">Blog</a></li>
                    <li><a href="https://phalconphp.com/en/about">About</a></li>
                    <li class="visible-lg"><a href="https://twitter.com/phalconphp" class="twitter">&nbsp;</a></li>
                    <li class="visible-lg"><a href="https://github.com/phalcon/cphalcon/" class="github">&nbsp;</a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>

<div class="heading">
    <div class="container">
        <div class="row">
            <h2>Blog and News</h2>
        </div>
    </div>
</div>

<section>
<div id="wrapper">
    <div id="content">

        <table>
            <tr>
                <td>
            <div class="post">

                    <!--<div class="title">Phalcon 2.0.2 released</div>
                    <div class="copy"><p>The development of Phalcon has been accelerated since we released 2.0.0. More and more contributors find <a href="http://zephir-lang.com/">Zephir</a> very easy to understand and work with, and as a result it is time to release Phalcon 2.0.2. This version includes many features, bug fixes and improvements in terms of performance:</p>

<ul><li>Added `stats()` methods to Beanstalk</li>
 <li>Fixed segfault when a docblock does not have annotations #10301
 </li><li>Fixed wrong number of parameters passed when triggering an event in Mvc\Collection</li>
 <li>Now Mvc\Model checks if an attribute has a default value associated in the database and ignores it from the insert/update generated SQL</li>
 <li>Readded Http\Request::hasPut() (#10283)</li>
 <li>Phalcon\Text: Added method reduceSlashes() - Reduces multiple slashes in a string to single slashes</li>
 <li>Phalcon\Text: Added method concat() - Concatenates strings using the separator only once without duplication in places concatenation</li>
 <li>Added conditional on Session adapter start() to check if the session has already been started</li>
 <li>Added status() function in Session adapter to return the status of the session (disabled/none/started)</li>
 <li>Implementation of subqueries as expressions in PHQL</li>
 <li>Performance improvements focused on PHP 5.6</li>
</ul><h3>Subqueries</h3>
<p>One of the most requested requests by the community is now available in Phalcon 2.0.2. Now, you can take advantage of subqueries as shown below:</p>

<pre>
$phql = "SELECT c.* FROM Shop\Cars c
WHERE c.brandId IN (SELECT id FROM Shop\Brands)
ORDER BY c.name";
$cars = $this-&gt;modelsManager-&gt;executeQuery($phql);
</pre>

<p>Models must belong to the same database in order to be used as source in a subquery.</p>

<h3>Default Database Values</h3>
<p>Now in the case that a column has a &lsquo;default&rsquo; value declared in the field of the mapped table, this 'default&rsquo; value will be used instead of inserting 'NULL&rsquo;:</p>

<pre>
$robots = new Robots();
$robots-&gt;save(); // use all `default` values
</pre>

<h3>Update/Upgrade</h3>
<p>This version can be installed from the master branch, if you don&rsquo;t have Zephir installed follow these instructions:</p>

<pre class="sh_sh sh_sourceCode">
git clone <a href="http://github.com/phalcon/cphalcon">http://github.com/phalcon/cphalcon</a>
git checkout master
cd ext
sudo ./install
</pre>

<p>The standard installation method also works:</p>

<pre class="sh_sh sh_sourceCode">
git clone <a href="http://github.com/phalcon/cphalcon">http://github.com/phalcon/cphalcon</a>
git checkout master
cd build
sudo ./install
</pre>

<p>If you have Zephir installed:</p>

<pre class="sh_sh sh_sourceCode">
git clone <a href="http://github.com/phalcon/cphalcon">http://github.com/phalcon/cphalcon</a>
git checkout master
zephir fullclean
zephir build
</pre>

<p>Note that running the installation script will replace any version of Phalcon installed before.</p>

<p>Windows DLLs are available in the <a href="http://phalconphp.com/en/download/windows">download page</a>.</p>

<p>See the <a href="http://blog.phalconphp.com/post/115773676765/guide-upgrading-to-phalcon-2">upgrading guide</a> for more information about upgrading to Phalcon 2.0.x from 1.3.x.</p>

<h3>Comming soon</h3>
<p>In the future 2.0.x series, we will be concentrating our efforts on requests from the community:</p>

<ul><li>Eager-Loading in PHQL</li>
  <li>Optional string empty values in the ORM</li>
  <li>PHQL custom functions</li>
  <li>Case Statements in PHQL</li>
  <li>Aliases for namespaces in PHQL</li>
</ul><p>Later on, we will be planning the features to include in Phalcon 2.1, for now:</p>

<ul><li>Complete deprecation of PHP 5.3</li>
  <li>Unification of Phalcon\Mvc\Model\Validation and Phalcon\Validation</li>
</ul><h3>Thanks</h3>
<p>Thanks to everyone involved in making this version as well to the community for their continuous input and feedback!</p></div>


                        <a href="http://blog.phalconphp.com/post/119885725880/phalcon-2-0-2-released">
                            <div class="footer for_permalink">
                                <div class="date">
                                    Posted 1 week ago
                                </div>
                                <div class="notes">2 notes &bull; <a href="http://blog.phalconphp.com/post/119885725880/phalcon-2-0-2-released#disqus_thread">View comments</a></div>
                                <div class="clear"></div>
                            </div>
                        </a>


                    <div class="footer " style="display:none;">
                        <div class="clear"></div>
                    </div>

                </div>-->
                <?php echo $something; ?>

                <div class="bottom"></div>

                <div id="navigation">
                    <a href="/page/2">Next page &rarr;</a>
                </div>
        </div>
</td>
<td valign="top">
        <div xid="sidebar">
            <div id="top">

                <div align="center" style="padding:5px;padding-bottom:5px">
                    <span style="font-size:9px;font-weight:bold;color:#333333">advertisement</span>
                    <div id="carbonads-container"><div class="carbonad"><div id="azcarbon"></div>
                    <script type="text/javascript">var z = document.createElement("script"); z.type = "text/javascript";
                    z.async = true; z.src = "http://engine.carbonads.com/z/56496/azcarbon_2_1_0_HORIZ";
                    var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(z, s);</script>
                    </div></div>
                </div>

                <br/>

                <div id="description">
                    We are an open source web framework for PHP delivered as a C extension
                    offering high performance and lower resource consumption
                </div>

                <!--<div id="search">
                    <form action="/search" method="get" id="search-form">
                        <input type="hidden" name="t" value="phalconphp" />
                        <input type="hidden" name="scope" value="all_of_tumblr" />
                        <input type="text" name="q" class="query" value="" />
                        <input type="submit" value="Search" class="submit" />
                        <div class="clear"></div>
                    </form>
                </div>

                <div align="center">
                    <div id="buttons">
                        <div class="row">
                            <div class="button" id="button-rss"><a href="http://blog.phalconphp.com/rss">RSS feed</a></div>
                            <div class="button" id="button-random"><a href="/random">Random</a></div>
                        </div>
                        <div class="clear"></div>
                        <div class="row">
                            <div class="button" id="button-archive"><a href="/archive">Archive</a></div>
                            <div class="button" id="button-mobile"><a href="/mobile">Mobile</a></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>-->

            </div>
        </div>
    </div>
    </tr>
</table>

</div>
</section>

    <script type="text/javascript">
        //<![CDATA[
        (function() {
            var links = document.getElementsByTagName('a');
            var query = '?';
            for(var i = 0; i < links.length; i++) {
                if(links[i].href.indexOf('#disqus_thread') >= 0) {
                    query += 'url' + i + '=' + encodeURIComponent(links[i].href) + '&';
                }
            }
            document.write('<script charset="utf-8" type="text/javascript" src="http://disqus.com/forums/phalconphp/get_num_replies.js' + query + '"></' + 'script>');
        })();
        //]]>
    </script>

    <script type="text/javascript" src="//cdn.jsdelivr.net/g/jquery@2.1,bootstrap@3.1,prettify@0.1(prettify.js+lang-css.js+lang-sql.js)"></script>
    <script type="text/javascript">prettyPrint();</script>
    </body>
</html>
