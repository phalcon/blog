<!DOCTYPE html>
<html lang="en">
    <style type="text/css">figure {margin: 0;}</style>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

    <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# blog: http://ogp.me/ns/blog#">
        <meta charset="utf-8" />

        <meta name="application-name" content="Phalcon Framework Blog" />
        <meta name="keywords" content="php, phalcon, phalcon php, php framework, faster php framework,zephir,phalcon2,release" />

        <meta name="twitter:site" content="@phalconphp" />
        <meta name="twitter:card" content="summary" />

        <meta property="og:site_name" content="Phalcon" />
        <meta property="og:type" content="website" /> <!-- article or subpages-->
        <meta property="og:title" content="{{ title is defined ? title|e : "Phalcon Framework Blog" }}" />
        <meta property="og:url" content="http://blog.phalconphp.com/?og=1" />
        <meta property="og:description" content="We are an open source web framework for PHP delivered as a C extension offering high performance and..." />

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="We are an open source web framework for PHP delivered as a C extension offering high performance and lower resource consumption" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="{{ cdnUrl }}/images/favicon/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="{{ cdnUrl }}/images/favicon/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="{{ cdnUrl }}/images/favicon/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="{{ cdnUrl }}/images/favicon/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="{{ cdnUrl }}/images/favicon/mstile-310x310.png" />

        <meta name="text:Disqus Shortname" content="phalconphp"/>

        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-128.png" sizes="128x128" />

        <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="//static.phalconphp.com/www/css/phalcon.min.css" />
        <link href='//fonts.googleapis.com/css?family=Open+Sans:700,400' rel='stylesheet' type='text/css'>
        <!--
        EUROPE <link href='//fonts.googleapis.com/css?family=Open+Sans:700,400&subset=latin-ext' rel='stylesheet' type='text/css'>
        GREEK <link href='//fonts.googleapis.com/css?family=Open+Sans:700,400&subset=greek-ext' rel='stylesheet' type='text/css'>
        RUSSIA <link href='//fonts.googleapis.com/css?family=Open+Sans:700,400&subset=cyrillic-ext,latin' rel='stylesheet' type='text/css'>
        -->

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="//oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

        <meta http-equiv="x-dns-prefetch-control" content="off"/>

        <link rel="alternate" type="application/rss+xml" href="http://blog.phalconphp.com/rss" />

        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/prettify/0.1/prettify.css"/>
        <link rel="stylesheet" type="text/css" href="https://phosphorum-1618.kxcdn.com/css/theme.css?v=2.1.1"/>
        <link rel="stylesheet" type="text/css" href="{{ cdnUrl }}/css/style.css"/>

        <title>{{ title is defined ? title|e ~ " - Phalcon Framework" : "Phalcon Framework Blog" }}</title>

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
                            <li><a href="https://api.phalconphp.com" class="header-nav-link" target="_blank">API</a></li>
                            <li><a href="https://forum.phalconphp.com/" class="header-nav-link" target="_blank">Forum</a></li>
                            <li><a href="https://blog.phalconphp.com/" class="header-nav-link" target="_blank">Blog</a></li>
                            <li><a href="http://phalconist.com/" class="header-nav-link" target="_blank">Resources</a></li>
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
                    <h2><a href="/">Blog and News</a></h2>
                </div>
            </div>
        </div>

        <section>
            <div id="wrapper">
                <div id="content">

                    <table align="center">
                        <tr>
                            <td width="80%" valign="top">
                                <div id="articles">
                                    {{ content() }}
                                </div>
                            </td>
                            <td valign="top">
                                <div id="sidebar">
                                    <div id="top">
                                        <div align="center" style="padding:5px;padding-bottom:5px">
                                            <div id="carbonads-container">
                                                <div class="carbonad">
                                                    <div id="azcarbon"></div>
                                                    <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=phalconphpcom" id="_carbonads_js"></script>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br/>

                                    <div id="description">
                                        We are an open source web framework for PHP delivered as a C extension
                                        offering high performance and lower resource consumption
                                    </div>

                                    <br/>

                                    <div class="tag-cloud">
                                        {% for tag, class in tagCloud %}
                                        <span style="font-size: {{ class }}">
                                            <a href='/tag/{{ tag }}'>{{ tag }}</a>
                                        </span>
                                        {% endfor %}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>

        <script type="text/javascript">
            //<![CDATA[
            (function () {
                var links = document.getElementsByTagName('a');
                var query = '?';
                for(var i = 0; i < links.length; i++) {
                    if(links[i].href.indexOf('#disqus_thread') >= 0) {
                        query += 'url' + i + '=' + encodeURIComponent(links[i].href) + '&';
                    }
                }
                document.write('<script charset="utf-8" type="text/javascript" src="//disqus.com/forums/phalconphp/get_num_replies.js' + query + '"></' + 'script>');
            })();
            //]]>
        </script>

        <script type="text/javascript" src="//cdn.jsdelivr.net/g/jquery@2.1,bootstrap@3.1,prettify@0.1(prettify.js+lang-css.js+lang-sql.js)"></script>
        <script type="text/javascript">prettyPrint();</script>
    </body>
</html>
