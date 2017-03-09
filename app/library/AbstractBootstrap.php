<?php

namespace Kitsune;

use Dotenv\Dotenv;
use Phalcon\Cache\Frontend\Data as PhCacheFrontData;
use Phalcon\Cache\Frontend\Output as PhCacheFrontOutput;
use Phalcon\Config as PhConfig;
use Phalcon\Cli\Console as PhCliConsole;
use Phalcon\Di as PhDI;
use Phalcon\Di\FactoryDefault as PhFactoryDefault;
use Phalcon\Logger\Adapter\File as PhFileLogger;
use Phalcon\Logger\Formatter\Line as PhLoggerFormatter;
use Phalcon\Mvc\Application as PhApplication;
use Phalcon\Mvc\Micro as PhMicro;
use Phalcon\Mvc\Micro\Collection as PhMicroCollection;
use Phalcon\Mvc\View\Simple as PhViewSimple;
use Phalcon\Mvc\View\Engine\Volt as PhVolt;

use ParsedownExtra as PParseDown;
use Kitsune\Utils;

/**
 * AbstractBootstrap
 *
 * @property PhDI $diContainer
 */
abstract class AbstractBootstrap
{
    /**
     * @var null|PhMicro|PhCliConsole
     */
    protected $application = null;

    /**
     * @var null|PhDI
     */
    protected $diContainer = null;

    /**
     * @var array
     */
    protected $options = [];

    private $memory        = 0;
    private $executionTime = 0;
    private $mode          = 'development';

    public function __construct()
    {
        $this->memory        = memory_get_usage();
        $this->executionTime = microtime(true);
    }

    /**
     * Runs the application
     *
     * @return PhApplication
     */
    public function run()
    {
        $this->initOptions();
        $this->initDi();
        $this->initLoader();
        $this->initEnvironment();
        $this->initApplication();
        $this->initUtils();
        $this->initConfig();
        $this->initDataCache();
        $this->initDispatcher();
        $this->initLogger();
        $this->initErrorHandler();
        $this->initRoutes();
        $this->initView();
        $this->initViewCache();
        $this->initAssets();
        $this->initParsedown();

        return $this->runApplication();
    }

    /**
     * Initializes the application
     */
    protected function initApplication()
    {
        $this->application = new PhMicro($this->diContainer);
    }

    /**
     * Initializes the Assets manager
     */
    protected function initAssets()
    {
        /** @var \Kitsune\Utils $utils */
        $utils  = $this->diContainer->getShared('utils');
        $assets = $this->diContainer->getShared('assets');

        /**
         * Collections
         */
        $assets->collection("header_js");
        $assets
            ->collection('header_css')
            ->addCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', false)
            ->addCss('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css', false)
            ->addCss('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/dracula.min.css', false)
            ->addCss('https://static.phalconphp.com/www/css/phalcon.min.css', false)
            ->addCss('https://fonts.googleapis.com/css?family=Open+Sans:700,400', false)
            ->addCss($utils->getAsset('css/style.css'));

        $assets
            ->collection('footer_js')
            ->addJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js', false)
            ->addJs('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js', false)
            ->addJs('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/highlight.min.js', false);
    }

    /**
     * Initializes the Config container
     *
     * @throws \Exception
     */
    protected function initConfig()
    {
        $fileName = APP_PATH . '/app/config/config.php';
        if (true !== file_exists($fileName)) {
            throw new \Exception('Configuration file not found');
        }

        $configArray = require_once($fileName);
        $config = new PhConfig($configArray);

        $this->diContainer->setShared('config', $config);
    }

    /**
     * Initializes the Data Cache
     */
    protected function initDataCache()
    {
        /**
         * cacheData
         */
        $config   = $this->diContainer->getShared('config');
        $lifetime = $config->get('cache')->get('lifetime', 3600);
        $driver   = $config->get('cache')->get('viewDriver', 'file');
        $frontEnd = new PhCacheFrontData(['lifetime' => $lifetime]);
        $backEnd  = ['cacheDir' => APP_PATH . '/storage/cache/data/'];
        $class    = sprintf('\Phalcon\Cache\Backend\%s', ucfirst($driver));
        $cache    = new $class($frontEnd, $backEnd);

        $this->diContainer->setShared('cacheData', $cache);
    }

    /**
     * Initializes the Di container
     */
    protected function initDi()
    {
        $this->diContainer = new PhFactoryDefault();
        PhDI::setDefault($this->diContainer);
    }

    /**
     * Initializes the Dispatcher
     */
    protected function initDispatcher()
    {
    }

    /**
     * Initializes the environment
     */
    protected function initEnvironment()
    {
        (new Dotenv(APP_PATH))->load();

        $mode = getenv('APP_ENV');
        $mode = (false !== $mode) ? $mode : 'development';

        $this->mode          = $mode;
    }

    /**
     * Initializes the error handlers
     */
    protected function initErrorHandler()
    {
        $logger = $this->diContainer->getShared('logger');
        $utils  = $this->diContainer->getShared('utils');

        ini_set(
            'display_errors',
            boolval('development' === $this->mode)
        );
        error_reporting(E_ALL);

        set_error_handler(
            function ($errorNumber, $errorString, $errorFile, $errorLine) use ($logger) {
                if (0 === $errorNumber & 0 === error_reporting()) {
                    return;
                }

                $logger->error(
                    sprintf(
                        "[%s] [%s] %s - %s",
                        $errorNumber,
                        $errorLine,
                        $errorString,
                        $errorFile
                    )
                );
            }
        );

        set_exception_handler(
            function () use ($logger) {
                $logger->error(json_encode(debug_backtrace()));
            }
        );

        register_shutdown_function(
            function () use ($logger, $utils) {
                $memory    = memory_get_usage() - $this->memory;
                $execution = (microtime(true) - $this->executionTime) * 1000;

                if ('development' === $this->mode) {
                    $logger->info(
                        sprintf(
                            'Shutdown completed [%s ms] - [%s]',
                            $execution,
                            $utils->bytesToHuman($memory)
                        )
                    );
                }
            }
        );
    }

    /**
     * Initializes the autoloader
     */
    protected function initLoader()
    {
        /**
         * Use the composer autoloader
         */
        require_once APP_PATH . '/vendor/autoload.php';
    }

    /**
     * Initializes the loggers
     */
    protected function initLogger()
    {
        /** @var \Phalcon\Config $config */
        $config   = $this->diContainer->getShared('config');
        $fileName = $config->get('logger')
                           ->get('defaultFilename', 'application');
        $format   = $config->get('logger')
                           ->get('format', '[%date%][%type%] %message%');

        $logFile   = sprintf(
            '%s/storage/logs/%s-%s.log',
            APP_PATH,
            date('Ymd'),
            $fileName
        );
        $formatter = new PhLoggerFormatter($format);
        $logger    = new PhFileLogger($logFile);
        $logger->setFormatter($formatter);

        $this->diContainer->setShared('logger', $logger);
    }

    /**
     * Initializes the options
     */
    protected function initOptions()
    {
    }

    /**
     * Initializes Parserdown
     */
    protected function initParsedown()
    {
        $parsedown = new PParseDown();
        $this->diContainer->setShared('parsedown', $parsedown);
    }

    /**
     * Initializes the routes
     */
    protected function initRoutes()
    {
        /** @var PhConfig $config */
        $config        = $this->diContainer->getShared('config');
        $routes        = $config->get('routes')->toArray();
        $eventsManager = $this->diContainer->getShared('eventsManager');

        foreach ($routes as $route) {
            $collection = new PhMicroCollection();
            $collection->setHandler($route['class'], true);
            if (true !== empty($route['prefix'])) {
                $collection->setPrefix($route['prefix']);
            }

            foreach ($route['methods'] as $verb => $methods) {
                foreach ($methods as $endpoint => $action) {
                    $collection->$verb($endpoint, $action);
                }
            }
            $this->application->mount($collection);
        }
        $this->application->setEventsManager($eventsManager);
    }

    /**
     * Initializes the utils service and stores it in the DI
     */
    protected function initUtils()
    {
        $this->diContainer->setShared('utils', new Utils());
    }

    /**
     * Initializes the View services and Volt
     */
    protected function initView()
    {
        $options  = [
            'compiledPath'      => APP_PATH . '/storage/cache/volt/',
            'compiledSeparator' => '_',
            'compiledExtension' => '.php',
            'compileAlways'     => boolval('development' === $this->mode),
            'stat'              => true,
        ];

        $view  = new PhViewSimple();
        $view->setViewsDir(APP_PATH . '/app/views/');
        $view->registerEngines(
            [
                '.volt' => function ($view) use ($options) {
                    $volt  = new PhVolt($view, $this->diContainer);
                    $volt->setOptions($options);

                    return $volt;
                },
            ]
        );

        $this->diContainer->setShared('viewSimple', $view);
    }

    /**
     * Initializes the View Cache
     */
    protected function initViewCache()
    {
        /**
         * viewCache
         */
        /** @var \Phalcon\Config $config */
        $config   = $this->diContainer->getShared('config');
        $lifetime = $config->get('cache')->get('lifetime', 3600);
        $driver   = $config->get('cache')->get('viewDriver', 'file');
        $frontEnd = new PhCacheFrontOutput(['lifetime' => $lifetime]);
        $backEnd  = ['cacheDir' => APP_PATH . '/storage/cache/view/'];
        $class    = sprintf('\Phalcon\Cache\Backend\%s', ucfirst($driver));
        $cache    = new $class($frontEnd, $backEnd);

        $this->diContainer->set('viewCache', $cache);
    }

    /**
     * Runs the main application
     *
     * @return PhApplication
     */
    protected function runApplication()
    {
        return $this->application->handle();
    }
}
