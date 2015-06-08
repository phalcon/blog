<?php

return [
    'debugMode'  => 0,
    'baseUri'    => '/',
    'paths'      => [
        'controllersDir' => '',
        'viewsDir'       => '',
        'pluginsDir'     => '',
    ],
    'namespaces' => [
        'Kitsune'               => K_PATH . '/library/Kitsune',
        'Kitsune\Controllers'   => K_PATH . '/app/controllers',
        'Kitsune\Plugins'       => K_PATH . '/app/plugins',
    ],
    'routes'     => [
        '/sitemap' => [
            'controller' => 'sitemap',
            'action'     => 'index'
        ],
        '/'        => [
            'controller' => 'posts',
            'action'     => 'index'
        ],
    ],
];
