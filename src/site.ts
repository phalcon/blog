/** Site-wide values. Carried over from the Jekyll `_config.yml`. */
export const site = {
    analytics: 'G-9JGM81GDBF',
    author: 'Phalcon Team',
    description:
        'We are an open source web framework for PHP delivered as a C extension ' +
        'offering high performance and lower resource consumption',
    keywords: 'php, phalcon, phalcon php, php framework, faster php framework',
    name: 'Phalcon Blog',
    url: 'https://blog.phalcon.io',
    social: {
        email: 'team@phalcon.io',
        github: 'phalcon',
        twitter: 'phalconphp',
    },
};

/**
 * The tags the sidebar shows, in this order. Copied from `tags_override` in
 * `_config.yml`. A tag listed here that no post uses is skipped.
 */
export const tagsOverride = [
    'phalcon5',
    'phalcon4',
    'release',
    'zephir',
    'lts',
    'hangout',
    'github',
    'phalcon',
    'community',
    'update',
    'roadmap',
    'framework',
    'benchmarks',
];
