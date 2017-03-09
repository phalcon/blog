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

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/dracula.min.css" />
    <link rel="stylesheet" type="text/css" href="https://static.phalconphp.com/www/css/phalcon.min.css" />
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans:700,400" />
    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-90300500-3', 'auto');
        ga('send', 'pageview');
    </script>
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
                        <li class="first">
                            <a href="https://phalcon.link/download"
                               class="header-nav-link">
                                Download
                            </a>
                        </li>
                        <li>
                            <a href="https://phalcon.link/docs"
                               class="header-nav-link"
                               target="_blank">
                                Documentation
                            </a>
                        </li>
                        <li class="dropdown">
                            <a href="javascript:;"
                               class="dropdown-toggle"
                               data-toggle="dropdown"
                               role="button"
                               aria-haspopup="true"
                               aria-expanded="false">
                                Community <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="https://phalcon.link/forum" target="_blank">
                                        Forum
                                    </a>
                                </li>
                                <li>
                                    <a href="https://phalcon.link/blog" target="_blank">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="https://phalcon.link/api" target="_blank">
                                        API
                                    </a>
                                </li>
                                <li>
                                    <a href="https://phalcon.link/resources" target="_blank">
                                        Resources
                                    </a>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <a href="https://phalcon.link/f" target="_blank">
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://phalcon.link/t" target="_blank">
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="https://phalcon.link/g+" target="_blank">
                                        Google+
                                    </a>
                                </li>
                                <li>
                                    <a href="https://phalcon.link/gab" target="_blank">
                                        Gab.ai
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="https://phalcon.link/about" class="header-nav-link">
                                Contribute
                            </a>
                        </li>
                        <li>
                            <a href="https://phalconphp.com/en/sponsors" class="header-nav-link">
                                Sponsors
                            </a>
                        </li>
                        <li>
                            <a href="https://phalcon.link/fund" class="header-nav-link">
                                Support Us
                            </a>
                        </li>
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
                        {% block contents %}{% endblock %}
                    </div>
                </div>
                <div class="col-md-3 content-sidebar">
                    <div id="sidebar">
                        {{ partial("partials/carbonads") }}
                        <div class="hr"></div>
                        {{ partial("partials/patreon") }}
                        <div class="hr"></div>
                        {{ partial("partials/description") }}
                        <div class="hr"></div>
                        {#{{ partial("partials/tags", ["tags": tagCloud]) }}#}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script type="text/javascript" data-rocketsrc="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" data-rocketsrc="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" data-rocketsrc="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/highlight.min.js"></script>
    <script type="text/javascript">hljs.initHighlightingOnLoad();</script>

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
            document.write('<script charset="utf-8" type="text/javascript" src="https://disqus.com/forums/phalconphp/get_num_replies.js' + query + '"></' + 'script>');
        })();
        //]]>
    </script>

</body>
</html>
