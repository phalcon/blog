<!doctype html>
<!--[if IE 8]> <html lang="en-US" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en-US" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en-US" class="no-js">
<!--<![endif]-->

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# blog: http://ogp.me/ns/blog#">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>{{ title is defined ? title|e ~ " - Phalcon Framework" : "Phalcon Framework Blog" }}</title>

    <meta name="author" content="Phalcon Framework Team">
    <meta name="generator" content="Phalcon Blog">
    <meta name="application-name" content="Phalcon Framework Blog">
    <meta name="keywords" content="php, phalcon, phalcon php, php framework, faster php framework, zephir, phalcon2, phalcon3, release">
    <meta name="description" content="We are an open source web framework for PHP delivered as a C extension offering high performance and lower resource consumption">

    <meta http-equiv="x-dns-prefetch-control" content="off">

    <meta property="og:url" content="{{ canonical is defined ? canonical : 'https://blog.phalconphp.com/' }}">
    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="object">
    <meta property="og:title" content="{{ title is defined ? title|e : "Phalcon Framework Blog" }}">
    <meta property="og:description" content="News regarding Phalcon, the next-generation PHP Framework.">
    <meta property="og:site_name" content="Phalcon Blog">
    <meta property="og:image" content="{{ cdnUrl }}/images/logo.png">

    <meta name="twitter:image:alt" content="Phalcon Blog">
    <meta name="twitter:title" content="{{ title is defined ? title|e : "Phalcon Framework Blog" }}">
    <meta name="twitter:description" content="News regarding Phalcon, the next-generation PHP Framework.">
    <meta name="twitter:image" content="{{ cdnUrl }}/images/logo.png">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@phalconphp">

    <link rel="canonical" href="{{ canonical is defined ? canonical : 'https://blog.phalconphp.com/' }}">
    <link rel="publisher" href="https://blog.phalconphp.com/">
    <link rel="author" href="https://phalconphp.com/en/team">

    <meta name="msapplication-TileColor" content="#FFFFFF">
    <meta name="msapplication-square70x70logo" content="{{ cdnUrl }}/images/favicon/mstile-70x70.png">
    <meta name="msapplication-TileImage" content="{{ cdnUrl }}/images/favicon/mstile-144x144.png">
    <meta name="msapplication-square150x150logo" content="{{ cdnUrl }}/images/favicon/mstile-150x150.png">
    <meta name="msapplication-wide310x150logo" content="{{ cdnUrl }}/images/favicon/mstile-310x150.png">
    <meta name="msapplication-square310x310logo" content="{{ cdnUrl }}/images/favicon/mstile-310x310.png">

    <meta name="text:Disqus Shortname" content="phalconphp">

    <link rel="apple-touch-icon" href="{{ cdnUrl }}/images/favicon/apple-touch-icon.png">

    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon-precomposed" sizes="60x60" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon-precomposed" sizes="76x76" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon-precomposed" sizes="120x120" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon-precomposed" sizes="152x152" href="{{ cdnUrl }}/images/favicon/apple-touch-icon-152x152.png">

    <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-128x128.png" sizes="128x128">
    <link rel="icon" type="image/png" href="{{ cdnUrl }}/images/favicon/favicon-196x196.png" sizes="196x196">

    <link rel="alternate" type="application/rss+xml" href="http://blog.phalconphp.com/rss">

    {{- stylesheet_link("//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css", false) -}}
    {{- stylesheet_link("//netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css", false) -}}
    {{- stylesheet_link("//static.phalconphp.com/www/css/phalcon.min.css", false) -}}
    {{- stylesheet_link("//fonts.googleapis.com/css?family=Open+Sans:700,400", false) -}}
    {{- stylesheet_link("//cdn.jsdelivr.net/prettify/1.1/prettify.css", false) -}}
    {{- stylesheet_link("//phosphorum-1618.kxcdn.com/css/theme.css?v=" ~ version, false) -}}
    {{- stylesheet_link(cdnUrl ~ "/css/style.css?v=" ~ version, false) -}}

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    {{ javascript_include("//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js", false) }}
    {{ javascript_include("//oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js", false) }}
    <![endif]-->
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
                        <span itemprop="name" class="sr-only">Phalcon Framework</span>
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
                <h2>Blog and News</h2>
            </div>
        </div>
    </div>

    <section>
        <div id="wrapper" class="container">
            <div id="content" class="row">
                <div class="col-md-9 content-body">
                    <div id="articles">
                        {{ content() }}
                    </div>
                </div>
                <div class="col-md-3 content-sidebar">
                    <div id="sidebar">
                        {{ partial("partials/carbonads") }}

                        <br>

                        <div id="description">
                            We are an open source web framework for PHP delivered as a C extension
                            offering high performance and lower resource consumption
                        </div>

                        <br>

                        <div class="tag-cloud">
                            {% for tag, class in tagCloud %}
                                <span style="font-size: {{ class }}">
                                    <a href='/tag/{{ tag }}'>{{ tag }}</a>
                                </span>
                            {% endfor %}
                        </div>
                    </div>
                </div>
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

    {{ javascript_include("//cdn.jsdelivr.net/g/jquery@2.1,bootstrap@3.3.7,prettify@1.1(prettify.js+lang-css.js+lang-sql.js)", false) }}

    <script type="text/javascript">prettyPrint();</script>

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-90300500-3', 'auto');
        ga('send', 'pageview');
    </script>
</body>
</html>
