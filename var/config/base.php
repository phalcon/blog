<?php

return [
    'debugMode'  => 0,
    'baseUri'    => '/blog/',
    'canonical'  => 'https://blog.phalconphp.com',
    'cdnUrl'     => '',
    'blog'       => [
        'title'        => 'Phalcon Framework Blog',
        'postsPerPage' => 10,
    ],
    'rss'        => [
        'title'       => 'Phalcon Framework Blog',
        'description' => 'We are an open source web framework for PHP ' .
                         'delivered as a C extension offering high ' .
                         'performance and lower resource consumption',
    ],
    'cache_data' => [
        'front' => [
            'adapter' => 'Data',
            'params'  => [
                'lifetime' => 86400
            ]
        ],
        'back'  => [
            'adapter' => 'File',
            'params'  => [
                'cacheDir' => K_PATH . '/var/data/cache'
            ]
        ]
    ],
    'cache_view' => [
        'front' => [
            'adapter' => 'Output',
            'params'  => [
                'lifetime' => 86400
            ]
        ],
        'back'  => [
            'adapter' => 'File',
            'params'  => [
                'cacheDir' => K_PATH . '/var/data/cache'
            ]
        ]
    ],
    'paths'      => [
        'controllersDir' => '',
        'viewsDir'       => '',
        'pluginsDir'     => '',
    ],
    'namespaces' => [
        'Kitsune'             => K_PATH . '/library/Kitsune',
        'Kitsune\Controllers' => K_PATH . '/app/controllers',
        'Kitsune\Plugins'     => K_PATH . '/app/plugins',
    ],
    'routes'     => [
        '/rss' => [
            'controller' => 'posts',
            'action'     => 'rss'
        ],
        '/sitemap' => [
            'controller' => 'sitemap',
            'action'     => 'index'
        ],
        '/post/{slug:[0-9a-zA-Z\-]+}' => [
            'controller' => 'posts',
            'action'     => 'view'
        ],
        '/tag/{tag:[0-9a-zA-Z\-\ \%\.]+}'  => [
            'controller' => 'posts',
            'action'     => 'tag'
        ],
        '/post/{timestamp:[0-9]+}/{slug:[0-9a-zA-Z\-]+}' => [
            'controller' => 'posts',
            'action'     => 'viewLegacy'
        ],
        '/'      => [
            'controller' => 'posts',
            'action'     => 'index'
        ],
        '/{page:[0-9]+}' => [
            'controller' => 'posts',
            'action'     => 'index'
        ],
        '/{page:[0-9]+}/{number:[0-9]+}' => [
            'controller' => 'posts',
            'action'     => 'index'
        ],
    ],
];
