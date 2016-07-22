Phalcon 3.0.0 released
=======================

The Phalcon team is excited to share some news with our community!

The last few months, we have been working hard to push 2.1 out, which contains significant enhancements as well as some API changes that require attention so as not to break compatibility with your application. On top of that we have been working in making Zephir PHP7 compatible so that you can enjoy Phalcon in your PHP7 application. Some news first though:

### Versioning
For any future Phalcon releases we are adopting SemVer (http://semver.org). In short:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> * MAJOR version when you make incompatible API changes,
> * MINOR version when you add functionality in a backwards-compatible manner, and
> * PATCH version when you make backwards-compatible bug fixes.
> * Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

Since 2.1 has many API changes, we decided that it would be best to not release it as is and start using [SemVer](http://semver.org) to better communicate with the community and keep track of our releases.

### 2.1 is dead, all hail 3.0
As mentioned above, 2.1 will not be fully backwards compatible. As a result, we are changing the version number to 3.0.

### PHP version support
The Phalcon team takes security very seriously and thus have decided to provide support to PHP versions that are [supported](http://php.net/supported-versions.php). As of 3.0, PHP 5.3 and 5.4 will be deprecated. We are making a small exception to this rule and will continue to support 5.5 for a little while, but since its support has expired a few days ago, it will too be deprecated in a future release.

### The goodie bag
So what does 3.0 offer? The [changelog](https://github.com/phalcon/cphalcon/blob/2.1.x/CHANGELOG.md) is extensive as you can see. Below are highlights of the changes as well as areas you need to concentrate.

##### PHP 5.3 and 5.4 are fully deprecated.
You can compile the code on your own, but we will not be able to support it nor can we guarantee that it will work as you expect it to. PHP 5.3 support expired mid 2014 and 5.4 expired mid 2015. We need to ensure our applications have all known vulnerabilities on the PHP side fixed and patched, thus we will not support any unsupported PHP version. This excludes PHP 5.5, whose support expired a few days ago. We will deprecate 5.5 in a future release but will make sure that you all know beforehand so that you can prepare.

> **INCOMPATIBLE**: You will need to upgrade your PHP installation to 5.6. You can always continue to use the Phalcon version you are using, but in 3.0 support for PHP 5.4 has been deprecated and we cannot guarantee that PHP 5.5 will be fully functional

#### APPLICATION
##### `Phalcon\Cli\Console` and `Phalcon\Mvc\Application` now inherits `Phalcon\Application`. 
This change makes the interfaces more uniformed and offers additional functionality to the respective applications (cli/mvc)

#### BEANSTALK
##### Added `\Phalcon\Queue\Beanstalk::ignore()`. 
Removes the named tube from the watch list for the current connection.
##### Added `\Phalcon\Queue\Beanstalk::pauseTube()`. 
Can delay any new job being reserved for a given time.
##### Added `\Phalcon\Queue\Beanstalk::kick()`. 
It moves jobs into the ready queue. If there are any buried jobs, it will only kick buried jobs. Otherwise it will kick delayed jobs.
```php
// Kick the job, it should move to the ready queue again
if (false !== $job->kick()) {
    $job = $this->client->peekReady();
}
```
##### Added `\Phalcon\Queue\Beanstalk::listTubeUsed()`. 
Returns the tube currently being used by the client.
##### Added `\Phalcon\Queue\Beanstalk::listTubesWatched()`. 
Returns a list tubes currently being watched by the client.
##### Added `\Phalcon\Queue\Beanstalk::peekDelayed()`. 
Return the delayed job with the shortest delay left.
```php
$this->client->put('testPutInTube', ['delay' => 2]);
$job = $this->client->peekDelayed();
```
- Added `\Phalcon\Queue\Beanstalk::jobPeek()`. Returns the next available job.
```php
$this->client->choose(self::TUBE_NAME_1);
$jobId = $this->client->put('testPutInTube');
$job   = $this->client->jobPeek($jobId);
$this->assertEquals($jobId, $job->getId());
```

#### CACHE
##### The cache backend adapters now return boolean when calling `Phalcon\Cache\BackendInterface::save`
```php
// Returns true/false
$result = $backendCache->save(‘my_key’, $content);
```
##### Added  `Phalcon\Cache\Frontend\Msgpack`. 
[MsgPack](http://msgpack.org) is a new frontend cache. It is an efficient binary serialization format, which allows exchanging data among multiple languages like JSON. 
```php
use Phalcon\Cache\Backend\File;
use Phalcon\Cache\Frontend\Msgpack;

// Cache the files for 2 days using Msgpack frontend
$frontCache = new Msgpack(
    [
        'lifetime' => 172800,
    ]
);

// Create the component that will cache 'Msgpack' to a 'File' backend
// Set the cache file directory - important to keep the '/' at the end of
// of the value for the folder
$cache = new File(
    $frontCache, 
    [
        'cacheDir' => '../app/cache/',
    ]
);

// Try to get cached records
$cacheKey = 'robots_order_id.cache';
$robots   = $cache->get($cacheKey);

if ($robots === null) {
    // $robots is null due to cache expiration or data do not exist
    // Make the database call and populate the variable
    $robots = Robots::find(['order' => 'id']);

    // Store it in the cache
    $cache->save($cacheKey, $robots);
}

// Use $robots
foreach ($robots as $robot) {
    echo $robot->name, "\n";
}
```
##### Fixed bug of `destroy` method of `Phalcon\Session\Adapter\Libmemcached`
##### Added `Phalcon\Cache\Backend\Memcache::addServers` to enable pool of servers for memcache
```php
$memcache->addServers(‘10.4.6.10’, 11000, true);
$memcache->addServers(‘10.4.6.11’, 11000, true);
$memcache->addServers(‘10.4.6.12’, 11000, true);
```

#### CRYPT
##### Mcrypt is replaced with `openssl` in `Phalcon\Crypt` [GPR:11530][GI:11486]
Due to the lack of updates for mcrypt for a number of years, its slow performance and the fact that the PHP core team decided to deprecate mcrypt [as soon as possible](https://wiki.php.net/rfc/mcrypt-viking-funeral) (version 7.1 onward), we have replaced it with the much faster and supported openssl.
##### Default encrypt algorithm in `Phalcon\Crypt` is now changed to `AES-256-CFB`
##### Removed methods `setMode()`, `getMode()`, `getAvailableModes()` in `Phalcon\CryptInterface` (no longer apply with openssl)

> **BACKWARDS INCOMPATIBLE**: Backwards compatibility from openssl to mcrypt is problematic if not impossible. We had to remove several methods that are no longer applicable. Additionally the rijndael-256 from mcrypt is no longer valid in openssl. The default encryption algorithm is AES-256-CFB
> 
> If you have data that has already been encrypted with mcrypt, you will need first to decrypt it before upgrading to 3.0 and then encrypt it again using 3.0 and therefore `openssl`. **Failure to do so will result in loss of data**. A port is available in the incubator. Please see the code [here](https://github.com/phalcon/incubator/tree/2.1.x/Library/Phalcon/Legacy)

#### DI
##### `Phalcon\Di` is now bound to services closures allowing use `Phalcon\Di` as `$this` to access services within them. Additionally, closures used as handlers in` Mvc\Micro` are now bound to the `$app` instance

Old way:
```php
$diContainer->setShared(
    'modelsCache',
    function () use ($config) {
        $frontend = '\Phalcon\Cache\Frontend\\' . $config->get('modelsCache')->frontend;
        $frontend = new $frontend(
            [
                'lifetime' => $config->get('modelsCache')->lifetime,
            ]
        );
        $config   = $config->get('modelsCache')->toArray();
        $backend  = '\Phalcon\Cache\Backend\\' . $config['backend'];

        return new $backend($frontend, $config);
    }
);
```
New way:
```php
$diContainer->setShared(
    'modelsCache',
    function () {
        $frontend = '\Phalcon\Cache\Frontend\\' . $this->config->get('modelsCache')->frontend;
        $frontend = new $frontend(
            [
                'lifetime' => $this->config->get('modelsCache')->lifetime,
            ]
        );
        $config   = $this->config->get('modelsCache')->toArray();
        $backend  = '\Phalcon\Cache\Backend\\' . $config['backend'];

        return new $backend($frontend, $config);
    }
);
```
Also note the nested DI behavior:
```php
$foo = function() {
    get_class($this); // DI
    $bar = function () {
        get_class($this); // DI
        $baz = function () {
            // etc
        }
    }
}
```
##### If an object is returned after firing the event `beforeServiceResolve` in `Phalcon\Di` this overrides the default service localization process

#### DISPATCHER
##### Added method `getActionSuffix()` in `Phalcon\DispatcherInterface`
```php
public function testAction() 
{
    $dispatcher = $this->dispatcher;
    $dispatcher->setActionSuffix(‘my’);
    var_dump($dispatcher->getActionSuffix()); // my
}
```
##### Added `Phalcon\Dispatcher::hasParam()`.
```php
public function testAction() 
{
    $dispatcher = $this->dispatcher;
    if (true === $dispatcher->hasParam(‘foo’)) {
        // Parameter exists
    }
}
```
##### Corrected behavior to fire the `dispatch:beforeException` event when there is any exception during dispatching [GI:11458]
##### CLI parameters are now handled consistently.
##### Added `Phalcon\Mvc\Controller\BindModelInterface` and associated model type hint loading through dispatcher.
##### Added `Phalcon\Mvc\Collection::update`, `Phalcon\Mvc\Collection::create` and `Phalcon\Mvc\Collection::createIfNotExist`
```php
public function createAction() 
{
    /**
     * Creates a document based on the values in the attributes, if not found by criteria
     */
    $robot = new Robot();
    $robot->name = 'MyRobot';
    $robot->type = 'Droid';
    $robot->create();
}

public function createOverrideAction() 
{
    /**
     * Create a document
     */
    $robot = new Robot();
    $robot->name = 'MyRobot';
    $robot->type = 'Droid';
    //create only if robot with same name and type does not exist
    $robot->createIfNotExist( array( 'name', 'type' ) );
}

public function updateAction() 
{
    /**
     * Update a document
     */
    $robot = Robots::findFirst([‘id’ => 1]);
    $robot->name = 'MyRobot';
    $robot->type = ''Droid';
    $robot->update();
}
```

#### EVENTS
##### Now `Phalcon\Events\Event` implements `Phalcon\Events\EventInterface`
##### `Phalcon\Events\Event::getCancelable` renamed to `Phalcon\Events\Event::isCancelable`
> **BACKWARDS INCOMPATIBLE**: Any references to `getCancelable` will stop working. You will need to rename the function to `isCancelable`

Old way:
```php
public function cancelAction()
{
    if (true === $this->di->get(‘eventsManager’)->getCancelable()) {
        // do something here
    }
}
```
New way:
```php
public function cancelAction()
{
    if (true === $this->di->get(‘eventsManager’)->isCancelable()) {
        // do something here
    }
}
```
##### Removed `Phalcon\Events\Manager::dettachAll` in favor of `Phalcon\Events\Manager::detachAll`
> **BACKWARDS INCOMPATIBLE**: Any references to `dettachAll` will stop working. You will need to rename the function to `detachAll`

Old way:
```php
public function destroyAction()
{
    $this->di->get(‘eventsManager’)->dettachAll()
}
```
New way:
```php
public function destroyAction()
{
    $this->di->get(‘eventsManager’)->detachAll()
}
```

#### FLASH
##### Added ability to autoescape Flash messages [GI:11448]
```php
$flash = new Phalcon\Flash\Session;
$flash->setEscaperService(new Phalcon\Escaper);

$flash->success("<script>alert('This will execute as JavaScript!')</script>");
echo $flash->output();
// <div class="successMessage">&lt;script&gt;alert(&#039;This will execute as JavaScript!&#039;)&lt;/script&gt;</div>
```
##### Fixed `Phalcon\Session\Flash::getMessages`. 
Now it returns an empty array in case of non existent message type request [GI:11941]

Old result:
```php
$flash = new \Phalcon\Session\Flash();
$flash->error('Error Message');
var_dump($flash->getMessages('success', false));

array (size=1)
  'error' => 
    array (size=1)
      0 => string 'Error Message' (length=13)
```
New result:
```php
$flash = new \Phalcon\Session\Flash();
$flash->error('Error Message');
var_dump($flash->getMessages('success', false));

array (size=0)
  empty
```

#### HTTP REQUEST/RESPONSE
##### Added default header: `Content-Type: "application/json; charset=UTF-8"` in method `Phalcon\Http\Response::setJsonContent`

Old way:
```php
use Phalcon\Http\Response;

$data     = 'Phlying with Phalcon';
$response = new Response();
$response->setContentType(‘application/json;’);
$response->setJsonContent($data)
$response->send();
```
New way:
```php
$data     = 'Phlying with Phalcon';
$response = new Response();
$response->setJsonContent($data)
$response->send();
```

##### Added ability to spoof the HTTP request method. 
Most browsers do not support sending `PUT` and `DELETE` requests via the method attribute in an HTML form. If the `X-HTTP-Method-Override` header is set, and if the method is a `POST`, then it is used to determine the 'real' intended HTTP method. The `_method` request parameter can also be used to determine the HTTP method, but only if `setHttpMethodParameterOverride(true)` has been called. By including a `_method` parameter in the query string or parameters of an HTTP request, Phalcon will use this as the method when matching routes. Forms automatically include a hidden field for this parameter if their submission method is not GET or POST.

##### Added support of `CONNECT`, `TRACE` and `PURGE`  HTTP methods. 
- `CONNECT`: A variation of HTTP tunneling when the originating request is behind a HTTP proxy server. With this mechanism, the client first requests the HTTP proxy server to forward the TCP connection to the final endpoint. The HTTP proxy server then establishes the connection on behalf of the client.
- `TRACE`: A method used for debugging which echoes input back to the user. Note that this method is dangerous, since it introduces a risk whereby an attacker could steal information such as cookies and possibly server credentials.
- `PURGE`: Although not defined in the HTTP RFCs, some HTTP servers and caching systems implement this method and use it to purge cached data.

##### Refactored `Phalcon\Http\Request::getHttpHost`. 
Now it always returns the hostname or empty an string. Optionally validates and cleans host name [GI:2573][GPR:11921]
##### Renamed `Phalcon\Http\Request::isSoapRequest` to `Phalcon\Http\Request::isSoap` and `Phalcon\Http\Request::isSecureRequest` to `Phalcon\Http\Request::isSecure`. 
Left the originals functions as aliases and marked them deprecated. 

> **CAUTION**: Any references to `isSoapRequest` need to be renamed to `isSoap`. Any references to `isSecureRequest` need to be renamed to `isSecure`.

Old way:
```php
public function testAction()
{
    if (true === $this->request->isSoapRequest()) {
        //
    }

    if (true === $this->request->isSecureRequest()) {
        //
    }
}
```
New way:
```php
public function testAction()
{
    if (true === $this->request->isSoap()) {
        //
    }

    if (true === $this->request->isSecure()) {
        //
    }
}
```
##### Added `Phalcon\Http\Request::setStrictHostCheck` and `Phalcon\Http\Request::isStrictHostCheck` to manage strict validation of the host name.
```php
use Phalcon\Http\Request;

$request = new Request;

$_SERVER['HTTP_HOST'] = 'example.com';
$request->getHttpHost(); // example.com

$_SERVER['HTTP_HOST'] = 'example.com:8080';
$request->getHttpHost(); // example.com:8080

$request->setStrictHostCheck(true);
$_SERVER['HTTP_HOST'] = 'ex=am~ple.com';
$request->getHttpHost(); // UnexpectedValueException

$_SERVER['HTTP_HOST'] = 'ExAmPlE.com';
$request->getHttpHost(); // example.com
```

##### Added `Phalcon\Http\Request::getPort`. 
Returns the port on which the request is made i.e. 80, 8080, 443 etc.
##### Added `setLastModified` method to `Phalcon\Http\Response`
Sets the `Last-Modified` header
```php
public function headerAction()
{
    $this->response->setLastModified(new DateTime());
}
```

##### Add `setContentLength` method to `Phalcon\Http\Response`
Sets the response content-length
```php
public function headerAction()
{
    $this->response->setContentLength(2048);
}
```
	 
#### LOADER
##### Removed support for prefixes strategy in `Phalcon\Loader`
> **BACKWARDS INCOMPATIBLE**: In Phalcon 2, you could load classes using a specific prefix. This method was very popular before namespaces were introduced. For instance:
> ```
> setPrefix('Shield_')
> load('Sword'); // will load `Shield_Sword`
>```
> This functionality is no longer supported

##### Added '\Phalcon\Loader::registerFiles' and '\Phalcon\Loader::getFiles'. 
`registerFiles` registers files that are "non-classes" hence need a "require". This is very useful for including files that only have functions. `getFiles` returns the files currently registered in the autoloader
```php
$loader->registerFiles(
    [
        'fuctions.php',
        'arrayFunctions.php',
    ]
);
```

#### MODELS
##### Changed constructor of `Phalcon\Mvc\Model` to allow pass an array of initialization data
```php
$customer = new Customer(
    [
        'Name'   => 'Peter',
        'Status' => 'active',
    ]
);
```
##### `Phalcon\Mvc\Model` now implements `JsonSerializable` making easy serialize model instances
```php
$customers = Customers::find();

echo json_encode($customers); // {['id':1,...],['id':2,...], ...}
```
##### `Phalcon\Mvc\Model\Criteria::getOrder` renamed to `Phalcon\Mvc\Model\Criteria::getOrderBy`
##### Added method `getOption()` in `Phalcon\Mvc\Model\RelationInterface`
##### Added `OR` operator for `Phalcon\Mvc\Model\Query\Builder` methods: `betweenWhere`, `notBetweenWhere`, `inWhere` and `notInWhere`
##### Added new getter `Phalcon\Mvc\Model\Query\Builder::getJoins()` - to get join parts from query builder
##### When destructing a `Mvc\Model\Manager` PHQL cache is cleaned
##### Added FULLTEXT index type to `Phalcon\Db\Adapter\Pdo\Mysql`
##### Fixed `afterFetch` event not being sent to behaviors
##### Fixed issue with `Model::__set` that was bypassing setters [GI:11286]
##### Fixed issue with `Model::__set` that was setting hidden attributes directly when setters are not declared [GI:11286]
##### `Phalcon\Mvc\Model\Manager::load()` now can load models from aliased namespaces
##### `Phalcon\Mvc\Model\Transaction\Manager` now correctly keeps account of transactions [GI:11554]
##### `Phalcon\Db\Dialect\Sqlite` now maps additional column types to SQLite columns equivalents.
##### Fixed `Phalcon\Db\Dialect\Oracle::prepareTable()` to correctly generate SQL for table aliases [GI:11799]
##### Fixed `Phalcon\Mvc\Model\Resultset::update()` - removed endless loop queries
##### Fixed `Phalcon\Mvc\Model\Manager::_mergeFindParameters` - Merging conditions

#### ROLES
##### Added `Phalcon\Acl\RoleAware` and `Phalcon\Acl\ResourceAware` Interfaces.
Now you can pass objects to `Phalcon\Acl\AdapterInterface::isAllowed` as `roleName` and `resourceName`, also they will be automatically passed to function defined in `Phalcon\Acl\AdapterInterface::allow` or `Phalcon\Acl\AdapterInterface::deny` by type
##### `Phalcon\Acl\AdapterInterface::allow` and `Phalcon\Acl\AdapterInterface::deny` have 4th argument - function.
It will be called when using `Phalcon\Acl\AdapterInterface::isAllowed`
##### `Phalcon\Acl\AdapterInterface::isAllowed` have 4th argument - parameters.
You can pass arguments for function defined in `Phalcon\Acl\AdapterInterface:allow` or `Phalcon\Acl\AdapterInterface::deny` as associative array where key is argument name

#### ROUTES
##### Placeholders `:controller` and `:action` in `Mvc\Router` now defaults to `/([\\w0-9\\_\\-]+)` instead of `/([\\a-zA-Z0-9\\_\\-]+)`
##### Modifier `#u` (PCRE_UTF8) is now default in regex based routes in `Mvc\Router`
##### `Mvc\Router\Route` now escapes characters such as `.` or `+` to avoid unexpected behaviors
##### Routes now can have an associated callback that can override the default dispatcher + view behavior
##### Fixed the use of the annotation router with namespaced controllers
##### Fixed matching host name by `Phalcon\Mvc\Route::handle` when using port on current host name [GI:2573]
##### Amended `Phalcon\Mvc\RouterInterface` and `Phalcon\Mvc\Router`. Added missed `addPurge`, `addTrace` and `addConnect` methods

#### SECURITY
##### Added `Phalcon\Security::hasLibreSsl` and `Phalcon\Security::getSslVersionNumber`
##### Changed default hash algorithm in `Phalcon\Security` to `CRYPT_BLOWFISH_Y`
##### `Phalcon\Security` is using now `Phalcon\Security\Random`
##### Enforced that `Phalcon\Security::getToken()` and `Phalcon\Security::getTokenKey()` return a random value per request not per call
##### `Phalcon\Security::getToken()` and `Phalcon\Security::getTokenKey()` are using now `Phalcon\Security::_numberBytes` instead of passed as argument or hard coded value
##### `Phalcon\Security::hash()` corrected not working CRYPT_STD_DES, CRYPT_EXT_DES, MD5, CRYPT_SHA256
##### `Phalcon\Security::hash()` CRYPT_SHA512 fixed wrong salt length
##### Added missing unit-tests for `Phalcon\Security`

#### SESSION
##### Removed `Phalcon\Session` [GI:11340]
> **BACKWARDS INCOMPATIBLE**: Any references to `Phalcon\Session` have to be removed and replaced with the relevant adapter class
##### Fixed the Session write callback [GI:11733]

#### TEXT
##### Added ability to use custom delimiter for `Phalcon\Text::camelize` and `Phalcon\Text::uncamelize` [GI:10396]
##### Fixed `Phalcon\Text:dynamic()` to allow custom separator [GI:11215]

#### VIEW
##### An absolute path can now be used to `Mvc\View::setLayoutsDir`
##### Fixed odd view behavior [GI:1933] related to `setLayout()` and `pick()`
##### Return `false` from an action disables the view component (same as `$this->view->disable()`)
##### Return a string from an action takes it as the body of the response (same as return `$this->response->setContent('Hello world')`)
##### Return a string from an `Mvc\Micro` handler takes it as the body of the response
##### Now `Phalcon\Mvc\View` supports many views directories at the same time

#### VALIDATION
##### `Phalcon\Mvc\Model\Validation` is now deprecated in favor of `Phalcon\Validation`
The functionality of both components is merged into one, allowing us to reduce the codebase while offering the same functionality as before.

Old way:
```php
namespace Invo\Models;

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;
use Phalcon\Mvc\Model\Validator\Uniqueness as UniquenessValidator;

class Users extends Model
{
    public function validation()
    {
        $this->validate(
            new EmailValidator(
                [
                    'field' => 'email',
                ]
            )
        );

        $this->validate(
            new UniquenessValidator(
                [
                    'field'   => 'username',
                    'message' => 'Sorry, That username is already taken',
                ]
            )
        );

        if ($this->validationHasFailed() == true) {
            return false;
        }
    }
}
```
New way:
```php
namespace Invo\Models;

use Phalcon\Mvc\Model;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Email as EmailValidator;
use Phalcon\Validation\Validator\Uniqueness as UniquenessValidator;

class Users extends Model
{
    public function validation()
    {
        $validator = new Validation();

        $validator->add(
            'email', //your field name
            new EmailValidator([
                'model' => $this,
                'message' => 'Please enter a correct email address'
            ])
        );

        $validator->add(
            'username',
            new UniquenessValidator([
                'model' => $this,
                'message' => 'Sorry, That username is already taken',
            ])
        );

        return $this->validate($validator);
    }
}
```
##### Method `isSetOption` in `Phalcon\Validation\ValidatorInterface` marked as deprecated, please use `hasOption`
> **CAUTION**: Any references to `isSetOption` need to be renamed to `hasOption`

Old way:
```php
if (true === $validation->isSetOption(‘my-option’)) {
    //
}
```
New way:
```php
if (true === $validation->hasOption(‘my-option’)) {
    //
}
```
##### Added internal check "allowEmpty" before calling a validator. If it option is true and the value of empty, the validator is skipped
##### Added option to validate multiple fields with one validator (fix uniqueness validator as well), also removes unnecessary `model => $this` in `Phalcon\Validation\Validator\Uniqueness`.
##### `Phalcon\Validation\Validator\Alpha` now correctly validates non-ASCII characters [GI:11386]
##### Added `Phalcon\Validation\CombinedFieldsValidator`, validation will pass array of fields to this validator if needed
##### `Phalcon\Validation\Validator\Digit` now correctly validates digits [GI:11374]
```php
use Phalcon\Validation\Validator\Digit as DigitValidator;

$validator->add(
    'height', 
    new DigitValidator(
        [
            'message' => ':field must be numeric',
        ]
    )
);

$validator->add(
    [
        'height', 
        'width',
    ], 
    new DigitValidator(
        [
            'message' => [
                'height' => 'height must be numeric',
                'width'  => 'width must be numeric',
            ]
        ]
    )
);
```
##### Added `Phalcon\Validation\Validator\Date`
```php
use Phalcon\Validation\Validator\Date as DateValidator;

$validator->add(
    'date', 
    new DateValidator(
        [
            'format'  => 'd-m-Y',
            'message' => 'The date is not valid',
        ]
    )
);

$validator->add(
    [
        'date',
        'anotherDate',
    ], 
    new DateValidator(
        [
            'format'  => [
                'date'        => 'd-m-Y',
                'anotherDate' => 'Y-m-d',
            ],
            'message' => [
                'date'        => 'The date is invalid',
                'anotherDate' => 'The another date is invalid',
            ]
        ]
    )
);
```
##### Fixed `Phalcon\Validation::appendMessage` to allow append message to the empty stack [GI:10405]

#### INTERFACES
##### Removed `__construct` from all interfaces [GI:11410][GPR:11441]
##### Added `Phalcon\Cli\DispatcherInterface`, `Phalcon\Cli\TaskInterface`, `Phalcon\Cli\RouterInterface` and `Phalcon\Cli\Router\RouteInterface`.

#### VARIOUS
##### Added `Phalcon\Assets\Manager::exists()` to check if collection exists
##### Fixed `Filter::add` method handler [GI:11581]
##### Fixed issue with radio not being checked when default value is 0 [GI:11358]
##### Phalcon\Tag::getTitle() shows a title depending on `prependTitle` and `appendTitle`
##### Using a `settable` variable for the Mongo Connection Service name instead of a hard coded string [GI:11725]
##### `Phalcon\Debug\Dump` skip debugging di, fix detecting private/protected properties
##### Added new setter `Phalcon\Escaper::setDoubleEncode()` - to allow setting/disabling double encoding
##### Fixed `Phalcon\Config::merge` for working with php7

### Conclusion
Thank you to everyone

### Installation
If you want to try it out install it from the 2.1.x branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd cphalcon
git checkout 2.1.x
zephir build --backend=ZendEngine3
```

As always, many thanks to everyone involved in this release and thanks for choosing Phalcon!

<3 Phalcon Team
