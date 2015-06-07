<?php

return [
    'debugMode' => 0,
    'baseUri'   => '/',
    'paths'     => [
        'controllersDir' => K_PATH . '/app/controllers',
        'viewsDir'       => K_PATH . '/app/views',
        'pluginsDir'     => K_PATH . '/app/plugins',
        'libraryDir'     => K_PATH . '/library',
        'logsDir'        => K_PATH . '/var/logs',
    ],
    'loader'    => [
        'namespaces' => [
            'Kitsune'             => K_PATH . '/library/Kitsune',
            'Kitsune\Controllers' => K_PATH . '/app/controllers',
            'Kitsune\Plugins'     => K_PATH . '/app/plugins'
        ],
        'dirs'       => [
        ]
    ],
    'routes'    => [
        '/sitemap' => [
            'controller' => 'sitemap',
            'action'     => 'index',
        ],
        '/'        => [
            'controller' => 'posts',
            'action'     => 'index'
        ],
    ],
    'cache' => [
        'data' => [
            'front' => [
                'adapter' => 'Data',
                'options' => ['lifetime' => 3600]
            ],
            'back' => [
                'servers' => [
                    [
                        'host'   => 'localhost',
                        'port'   => 11211,
                        'weight' => 1
                    ],
                ],
                'client' => [
                    \Memcached::OPT_HASH       => \Memcached::HASH_MD5,
                    \Memcached::OPT_PREFIX_KEY => 'fuseos.',
                ],
            ],
        ],
        'view' => [
            'front' => [
                'adapter' => 'Output',
                'options' => ['lifetime' => 3600]
            ],
            'back' => [
                'servers' => [
                    [
                        'host'   => 'localhost',
                        'port'   => 11211,
                        'weight' => 1
                    ],
                ],
                'client' => [
                    \Memcached::OPT_HASH       => \Memcached::HASH_MD5,
                    \Memcached::OPT_PREFIX_KEY => 'fuseos.view.',
                ],
            ],
        ],
    ],
];
