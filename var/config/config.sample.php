<?php

return [
    'debugMode'  => 1,
    'baseUri'    => '/blog/',
    'cdnUrl'     => '',
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
                'cacheDir' => K_PATH . '/var/cache/data/'
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
                'cacheDir' => K_PATH . '/var/cache/data/'
            ]
        ]
    ],
];
