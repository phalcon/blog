<?php

return [
    'app'           => [
        'version'         => '3.0.4',
        'timezone'        => getenv('APP_TIMEZONE'),
        'debug'           => getenv('APP_DEBUG'),
        'env'             => getenv('APP_ENV'),
        'url'             => getenv('APP_URL'),
        'name'            => getenv('APP_NAME'),
        'project'         => getenv('APP_PROJECT'),
        'description'     => getenv('APP_DESCRIPTION'),
        'keywords'        => getenv('APP_KEYWORDS'),
        'repo'            => getenv('APP_REPO'),
        'docs'            => getenv('APP_DOCS'),
        'baseUri'         => getenv('APP_BASE_URI'),
        'staticUrl'       => getenv('APP_STATIC_URL'),
        'lang'            => getenv('APP_LANG'),
        'supportEmail'    => getenv('APP_SUPPORT_EMAIL'),
    ],
    'cache'         => [
        'driver'          => getenv('CACHE_DRIVER'),
        'viewDriver'      => getenv('VIEW_CACHE_DRIVER'),
        'prefix'          => getenv('CACHE_PREFIX'),
        'lifetime'        => getenv('CACHE_LIFETIME'),
    ],
    'logger'        => [
        'defaultFilename' => getenv('LOGGER_DEFAULT_FILENAME'),
        'format'          => getenv('LOGGER_FORMAT'),
        'level'           => getenv('LOGGER_LEVEL'),
    ],
    'google'        => [
        'analytics'       => getenv('GOOGLE_ANALYTICS'),
    ],
    'routes'        => [
        [
            'class'   => Kitsune\Controllers\PagesController::class,
            'methods' => [
                'get'      => [
                    '/'                              => 'mainAction',
                    '/{page:[0-9]+}'                 => 'mainAction',
                    '/{page:[0-9]+}/{number:[0-9]+}' => 'mainAction',
                ],
            ],
        ],
        [
            'class'   => Kitsune\Controllers\PostsController::class,
            'methods' => [
                'get'      => [
                    '/post/{slug:[0-9a-zA-Z\-]+}' => 'mainAction',
                ],
            ],
        ],
        [
            'class'   => Kitsune\Controllers\TagsController::class,
            'methods' => [
                'get'      => [
                    '/tag/{tag:[0-9a-zA-Z\-\ \%\.]+}' => 'mainAction',
                ],
            ],
        ],
        [
            'class'   => Kitsune\Controllers\UtilsController::class,
            'methods' => [
                'get'      => [
                    '/rss'     => 'rssAction',
                    '/sitemap' => 'sitemapAction',
                ],
            ],
        ],
//        '/post/{timestamp:[0-9]+}/{slug:[0-9a-zA-Z\-]+}' => [
//            'controller' => 'posts',
//            'action'     => 'viewLegacy'
//        ],
    ],
];
