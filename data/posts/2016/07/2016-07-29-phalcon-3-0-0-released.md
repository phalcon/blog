Phalcon 3.0.0 final (LTS) released
==================================

The Phalcon team is **very excited** to share some news with our community!

The last few months, we have been working hard to push 2.1 out, which contains significant enhancements as well as some API changes 
that require attention so as not to break compatibility with your application. 
On top of that we have been working in making Zephir PHP7 compatible so that you can enjoy 
Phalcon in your PHP7 application. Some news first though:

### Versioning
For any future Phalcon releases we are adopting SemVer (http://semver.org). In short:

> Given a version number MAJOR.MINOR.PATCH, increment the:
> * MAJOR version when you make incompatible API changes,
> * MINOR version when you add functionality in a backwards-compatible manner, and
> * PATCH version when you make backwards-compatible bug fixes.
> * Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

Since 2.1 has many API changes, we decided that it would be best to not release it as is and start using [SemVer](http://semver.org) to better 
communicate with the community and keep track of our releases.

### 2.1 is dead, all hail 3.0
As mentioned above, 2.1 will not be fully backwards compatible. As a result, we are changing the version number to 3.0.

### PHP version support
The Phalcon team takes security very seriously and thus have decided to provide support to PHP versions that are 
[supported](http://php.net/supported-versions.php). As of 3.0, PHP 5.3 and 5.4 will be deprecated. We are making a
 small exception to this rule and will continue to support 5.5 for a little while, but since its support has expired a 
 few days ago, it will too be deprecated in a future release.

### The goodie bag
So what does 3.0 offer? The [changelog](https://github.com/phalcon/cphalcon/blob/3.0.x/CHANGELOG.md) is extensive as you can see. 
Below are highlights of the changes as well as areas you need to concentrate.

&bull; PHP 5.3 and 5.4 are fully deprecated.
You can compile the code on your own, but we will not be able to support it nor can we guarantee that it will work as you expect it to. 
PHP 5.3 support expired mid 2014 and 5.4 expired mid 2015. We need to ensure our applications have all known vulnerabilities on the 
PHP side fixed and patched, thus we will not support any unsupported PHP version. This excludes PHP 5.5, whose support expired a few days ago. 
We will deprecate 5.5 in a future release but will make sure that you all know beforehand so that you can prepare.

> **INCOMPATIBLE**: You will need to upgrade your PHP installation to 5.6. You can always continue to use the Phalcon version you are using, 
but in 3.0 support for PHP 5.4 has been deprecated and we cannot guarantee that PHP 5.5 will be fully functional.

#### APPLICATION
&bull; `Phalcon\Cli\Console` and `Phalcon\Mvc\Application` now inherits `Phalcon\Application`. 
This change makes the interfaces more uniformed and offers additional functionality to the respective applications (cli/mvc)

#### BEANSTALK
&bull; Added `\Phalcon\Queue\Beanstalk::ignore()`. 
Removes the named tube from the watch list for the current connection.

&bull; Added `\Phalcon\Queue\Beanstalk::pauseTube()`. 
Can delay any new job being reserved for a given time.

&bull; Added `\Phalcon\Queue\Beanstalk::kick()`. 
It moves jobs into the ready queue. If there are any buried jobs, it will only kick buried jobs. Otherwise it will kick delayed jobs.
```php
// Kick the job, it should move to the ready queue again
if (false !== $job->kick()) {
    $job = $this->client->peekReady();
}
```
&bull; Added `\Phalcon\Queue\Beanstalk::listTubeUsed()`. 
Returns the tube currently being used by the client.

&bull; Added `\Phalcon\Queue\Beanstalk::listTubesWatched()`. 
Returns a list tubes currently being watched by the client.

&bull; Added `\Phalcon\Queue\Beanstalk::peekDelayed()`. 
Return the delayed job with the shortest delay left.
```php
$this->client->put('testPutInTube', ['delay' => 2]);
$job = $this->client->peekDelayed();
```
&bull; Added `\Phalcon\Queue\Beanstalk::jobPeek()`. 
Returns the next available job.
```php
$this->client->choose(self::TUBE_NAME_1);
$jobId = $this->client->put('testPutInTube');
$job   = $this->client->jobPeek($jobId);
$this->assertEquals($jobId, $job->getId());
```

#### CACHE
&bull; The cache backend adapters now return boolean when calling `Phalcon\Cache\BackendInterface::save`
```php
// Returns true/false
$result = $backendCache->save('my_key', $content);
```
&bull; Added  `Phalcon\Cache\Frontend\Msgpack`. 
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
&bull; Fixed bug of `destroy` method of `Phalcon\Session\Adapter\Libmemcached`

&bull; Added `Phalcon\Cache\Backend\Memcache::addServers` to enable pool of servers for memcache
```php
$memcache->addServers('10.4.6.10', 11000, true);
$memcache->addServers('10.4.6.11', 11000, true);
$memcache->addServers('10.4.6.12', 11000, true);
```

#### CRYPT
&bull; Mcrypt is replaced with `openssl` in `Phalcon\Crypt` [GPR:11530][GI:11486]
Due to the lack of updates for mcrypt for a number of years, its slow performance and the fact that the PHP core team decided to deprecate mcrypt [as soon as possible](https://wiki.php.net/rfc/mcrypt-viking-funeral) (version 7.1 onward), we have replaced it with the much faster and supported openssl.

&bull; Default encrypt algorithm in `Phalcon\Crypt` is now changed to `AES-256-CFB`

&bull; Removed methods `setMode()`, `getMode()`, `getAvailableModes()` in `Phalcon\CryptInterface` (no longer apply with openssl)
> **BACKWARDS INCOMPATIBLE**: Backwards compatibility from openssl to mcrypt is problematic if not impossible. We had to remove several methods that are no longer applicable. Additionally the rijndael-256 from mcrypt is no longer valid in openssl. The default encryption algorithm is AES-256-CFB
> 
> If you have data that has already been encrypted with mcrypt, you will need first to decrypt it before upgrading to 3.0 and then encrypt it again using 3.0 and therefore `openssl`. **Failure to do so will result in loss of data**. A port is available in the incubator. Please see the code [here](https://github.com/phalcon/incubator/tree/2.1.x/Library/Phalcon/Legacy)

#### DI
&bull; `Phalcon\Di` is now bound to services closures allowing use `Phalcon\Di` as `$this` to access services within them. Additionally, closures used as handlers in` Mvc\Micro` are now bound to the `$app` instance

**Old way**:
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
**New way**:
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
&bull; If an object is returned after firing the event `beforeServiceResolve` in `Phalcon\Di` it overrides the default service localization process

#### DISPATCHER
&bull; Added `Phalcon\Dispatcher::hasParam()`.
```php
public function testAction() 
{    
    if (true === $this->dispatcher->hasParam('foo')) {
        // Parameter exists
    }
}
```
&bull; Added method `getActionSuffix()` in `Phalcon\DispatcherInterface`. This allows you change the 'Action' suffix in controller actions.

&bull; Corrected behavior to fire the `dispatch:beforeException` event when there is any exception during dispatching [GI:11458]

&bull; CLI parameters are now handled consistently.

&bull; Added `Phalcon\Mvc\Controller\BindModelInterface` and associated model type hint loading through dispatcher.

&bull; Added `Phalcon\Mvc\Collection::update`, `Phalcon\Mvc\Collection::create` and `Phalcon\Mvc\Collection::createIfNotExist`
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
    $robot = Robots::findFirst(['id' => 1]);
    $robot->name = 'MyRobot';
    $robot->type = ''Droid';
    $robot->update();
}
```

#### EVENTS
&bull; Now `Phalcon\Events\Event` implements `Phalcon\Events\EventInterface`

&bull; `Phalcon\Events\Event::getCancelable` renamed to `Phalcon\Events\Event::isCancelable`
> **BACKWARDS INCOMPATIBLE**: Any references to `getCancelable` will stop working. You will need to rename the function to `isCancelable`

**Old way**:
```php
public function cancelAction()
{
    if (true === $this->eventsManager->getCancelable()) {
        // do something here
    }
}
```
**New way**:
```php
public function cancelAction()
{
    if (true === $this->eventsManager->isCancelable()) {
        // do something here
    }
}
```
&bull; Removed `Phalcon\Events\Manager::dettachAll` in favor of `Phalcon\Events\Manager::detachAll`
> **BACKWARDS INCOMPATIBLE**: Any references to `dettachAll` will stop working. You will need to rename the function to `detachAll`

**Old way**:
```php
public function destroyAction()
{
    $this->eventsManager->dettachAll()
}
```
**New way**:
```php
public function destroyAction()
{
    $this->eventsManager->detachAll()
}
```

#### FLASH
&bull; Added ability to autoescape Flash messages [GI:11448]
```php
$flash = new Phalcon\Flash\Session;
$flash->setEscaperService(new Phalcon\Escaper);

$flash->success("<script>alert('This will execute as JavaScript!')</script>");
echo $flash->output();
// <div class="successMessage">&lt;script&gt;alert(&#039;This will execute as JavaScript!&#039;)&lt;/script&gt;</div>
```
&bull; Fixed `Phalcon\Session\Flash::getMessages`. 
Now it returns an empty array in case of non existent message type request [GI:11941]

**Old result**:
```php
use Phalcon\Session\Flash as FlashSession;

$flash = new FlashSession();
$flash->error('Error Message');
var_dump($flash->getMessages('success', false));

array (size=1)
  'error' => 
    array (size=1)
      0 => string 'Error Message' (length=13)
```
**New result**:
```php
use Phalcon\Session\Flash as FlashSession;

$flash = new FlashSession();
$flash->error('Error Message');
var_dump($flash->getMessages('success', false));

array (size=0)
  empty
```

#### HTTP REQUEST/RESPONSE
&bull; Added default header: `Content-Type: "application/json; charset=UTF-8"` in method `Phalcon\Http\Response::setJsonContent`

**Old way**:
```php
use Phalcon\Http\Response;

$data     = 'Phlying with Phalcon';
$response = new Response();
$response->setContentType('application/json;');
$response->setJsonContent($data)
$response->send();
```
**New way**:
```php
$data     = 'Phlying with Phalcon';
$response = new Response();
$response->setJsonContent($data)
$response->send();
```

&bull; Added ability to spoof the HTTP request method. 
Most browsers do not support sending `PUT` and `DELETE` requests via the method attribute in an HTML form. If the `X-HTTP-Method-Override` header is set, and if the method is a `POST`, then it is used to determine the 'real' intended HTTP method. The `_method` request parameter can also be used to determine the HTTP method, but only if `setHttpMethodParameterOverride(true)` has been called. By including a `_method` parameter in the query string or parameters of an HTTP request, Phalcon will use this as the method when matching routes. Forms automatically include a hidden field for this parameter if their submission method is not GET or POST.

&bull; Added support of `CONNECT`, `TRACE` and `PURGE`  HTTP methods. 
- `CONNECT`: A variation of HTTP tunneling when the originating request is behind a HTTP proxy server. With this mechanism, the client first requests the HTTP proxy server to forward the TCP connection to the final endpoint. The HTTP proxy server then establishes the connection on behalf of the client.
- `TRACE`: A method used for debugging which echoes input back to the user. Note that this method is dangerous, since it introduces a risk whereby an attacker could steal information such as cookies and possibly server credentials.
- `PURGE`: Although not defined in the HTTP RFCs, some HTTP servers and caching systems implement this method and use it to purge cached data.

&bull; Refactored `Phalcon\Http\Request::getHttpHost`. 
Now it always returns the hostname or empty an string. Optionally validates and cleans host name [GI:2573][GPR:11921]

&bull; Renamed `Phalcon\Http\Request::isSoapRequest` to `Phalcon\Http\Request::isSoap` and `Phalcon\Http\Request::isSecureRequest` to `Phalcon\Http\Request::isSecure`. 
Left the originals functions as aliases and marked them deprecated. 
> **CAUTION**: Any references to `isSoapRequest` need to be renamed to `isSoap`. Any references to `isSecureRequest` need to be renamed to `isSecure`.

**Old way**:
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
**New way**:
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

&bull; Added `Phalcon\Http\Request::setStrictHostCheck` and `Phalcon\Http\Request::isStrictHostCheck` to manage strict validation of the host name.
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

&bull; Added `Phalcon\Http\Request::getPort`. 
Returns the port on which the request is made i.e. 80, 8080, 443 etc.

&bull; Added `setLastModified` method to `Phalcon\Http\Response`
Sets the `Last-Modified` header
```php
public function headerAction()
{
    $this->response->setLastModified(new DateTime());
}
```

&bull; Add `setContentLength` method to `Phalcon\Http\Response`
Sets the response content-length
```php
public function headerAction()
{
    $this->response->setContentLength(2048);
}
```
	 
#### LOADER
&bull; Removed support for prefixes strategy in `Phalcon\Loader`
> **BACKWARDS INCOMPATIBLE**: In Phalcon 2, you could load classes using a specific prefix. This method was very popular before namespaces were introduced. For instance:
```php
setPrefix('Shield_')
load('Sword'); // will load `Shield_Sword`
```
> This functionality is no longer supported

&bull; Added `\Phalcon\Loader::registerFiles` and `\Phalcon\Loader::getFiles`. 
`registerFiles` registers files that are "non-classes" hence need a "require". This is very useful for including files that only have functions. `getFiles` returns the files currently registered in the autoloader
```php
$loader->registerFiles(
    [
        'fuctions.php',
        'arrayFunctions.php',
    ]
);
```

#### DATABASE
&bull; Dropped support of Oracle [GI:12008][GPR:12009]
Support of Oracle has been dropped from the Phalcon Core for the following reasons:
* The lack of Oracle maintainer
* The lack of relevant experience among the Phalcon Core Team
* Weak support or interest from the community
* Incomplete implementation that creates only the illusion of support for Oracle
* Some issues hampering for the support of PHP 7 in Phalcon

Oracle components will be ported to the Phalcon Incubator. If the adapter receives support and enhancements from the community, we will consider making it part of the core again.

#### MODELS
&bull; Changed constructor of `Phalcon\Mvc\Model` to allow pass an array of initialization data
```php
$customer = new Customer(
    [
        'Name'   => 'Peter',
        'Status' => 'active',
    ]
);
$customer->save();
```
&bull; `Phalcon\Mvc\Model` now implements `JsonSerializable` making easy serialize model instances
```php
$customers = Customers::find();
echo json_encode($customers); // {['id':1,...],['id':2,...], ...}
```
&bull; `Phalcon\Mvc\Model\Criteria::getOrder` renamed to `Phalcon\Mvc\Model\Criteria::getOrderBy`
> **BACKWARDS INCOMPATIBLE**: Any references to `getOrder` will stop working. You will need to rename the function to `getOrderBy`

&bull; Added method `getOption()` in `Phalcon\Mvc\Model\RelationInterface`
Returns an option by the specified name. If the option does not exist null is returned

&bull; Added `OR` operator for `Phalcon\Mvc\Model\Query\Builder` methods: `betweenWhere`, `notBetweenWhere`, `inWhere` and `notInWhere`
```php
$builder->betweenWhere('price', 100.25, 200.50);     // Appends a BETWEEN condition
$builder->notBetweenWhere('price', 100.25, 200.50);  // Appends a NOT BETWEEN condition
$builder->inWhere('id', [1, 2, 3]);                  // Appends an IN condition
$builder->notInWhere('id', [1, 2, 3]);               // Appends an NOT IN condition
```

&bull; Added new getter `Phalcon\Mvc\Model\Query\Builder::getJoins()`
Returns the join parts from query builder

&bull; When destructing a `Mvc\Model\Manager` PHQL cache is cleaned

&bull; Added FULLTEXT index type to `Phalcon\Db\Adapter\Pdo\Mysql`

&bull; Fixed `afterFetch` event not being sent to behaviors

&bull; Fixed issue with `Model::__set` that was bypassing setters [GI:11286]

&bull; Fixed issue with `Model::__set` setting hidden attributes directly when setters are not declared [GI:11286]

&bull; `Phalcon\Mvc\Model\Manager::load()` now can load models from aliased namespaces

&bull; `Phalcon\Mvc\Model\Transaction\Manager` now correctly keeps account of transactions [GI:11554]

&bull; `Phalcon\Db\Dialect\Sqlite` now maps additional column types to SQLite columns equivalents.

&bull; Fixed `Phalcon\Mvc\Model\Resultset::update()` - Removed endless loop queries

&bull; Fixed `Phalcon\Mvc\Model\Manager::_mergeFindParameters` - Merging conditions fix

#### ROLES
&bull; Added `Phalcon\Acl\RoleAware` and `Phalcon\Acl\ResourceAware` Interfaces. Now you can pass objects to `Phalcon\Acl\AdapterInterface::isAllowed` as `roleName` and `resourceName`, also they will be automatically passed to function defined in `Phalcon\Acl\AdapterInterface::allow` or `Phalcon\Acl\AdapterInterface::deny` by type
```php
use UserRole;       // Class implementing RoleAware interface
use ModelResource;  // Class implementing ResourceAware interface

// Set access level for role into resources
$acl->allow('Guests', 'Customers', 'search');
$acl->allow('Guests', 'Customers', 'create');
$acl->deny('Guests', 'Customers', 'update');

// Create our objects providing roleName and resourceName
$customer     = new ModelResource(1, 'Customers', 2);
$designer     = new UserRole(1, 'Designers');
$guest        = new UserRole(2, 'Guests');
$anotherGuest = new UserRole(3, 'Guests');

// Check whether our user objects have access to the operation on model object
$acl->isAllowed($designer, $customer, 'search')     // Returns false
$acl->isAllowed($guest, $customer, 'search')        // Returns true
$acl->isAllowed($anotherGuest, $customer, 'search') // Returns true
```

&bull; `Phalcon\Acl\AdapterInterface::allow` and `Phalcon\Acl\AdapterInterface::deny` have 4th argument - function. It will be called when using `Phalcon\Acl\AdapterInterface::isAllowed`

&bull; `Phalcon\Acl\AdapterInterface::isAllowed` have 4th argument - parameters. You can pass arguments for a function defined in `Phalcon\Acl\AdapterInterface:allow` or `Phalcon\Acl\AdapterInterface::deny` as associative array where key is argument name
```php
// Set access level for role into resources with custom function
$acl->allow(
    'Guests', 
    'Customers', 
    'search',
    function ($a) {
        return $a % 2 == 0;
    }
);

// Check whether role has access to the operation with custom function
$acl->isAllowed('Guests', 'Customers', 'search', ['a' => 4]); // Returns true
$acl->isAllowed('Guests', 'Customers', 'search', ['a' => 3]); // Returns false
```

&bull; Fixed wildcard inheritance in `Phalcon\Acl\Adapter\Memory` [GI:12004][GPR:12006]
```php
$acl = new Memory();

$acl->setDefaultAction(Acl::DENY);

$roleGuest      = new Role("guest");
$roleUser       = new Role("user");
$roleAdmin      = new Role("admin");
$roleSuperAdmin = new Role("superadmin");

$acl->addRole($roleGuest);
$acl->addRole($roleUser, $roleGuest);
$acl->addRole($roleAdmin, $roleUser);
$acl->addRole($roleSuperAdmin, $roleAdmin);

$acl->addResource("payment", ["paypal", "facebook",]);

$acl->allow($roleGuest->getName(), "payment", "paypal");
$acl->allow($roleGuest->getName(), "payment", "facebook");

$acl->allow($roleUser->getName(), "payment", "*");

echo $acl->isAllowed($roleUser->getName(), "payment", "notSet");  // true
echo $acl->isAllowed($roleUser->getName(), "payment", "*");       // true
echo $acl->isAllowed($roleAdmin->getName(), "payment", "notSet"); // true
echo $acl->isAllowed($roleAdmin->getName(), "payment", "*");      // true
```

#### ROUTES
&bull; Routes now can have an associated callback that can override the default dispatcher + view behavior

&bull; Amended `Phalcon\Mvc\RouterInterface` and `Phalcon\Mvc\Router`. Added missed `addPurge`, `addTrace` and `addConnect` methods.
Added `addConnect` for the `CONNECT` HTTP method, `addPurge` for the `PURGE` HTTP method and `addTrace` for the `TRACE` HTTP method

&bull; Placeholders `:controller` and `:action` in `Mvc\Router` now defaults to `/([\\w0-9\\_\\-]+)` instead of `/([\\a-zA-Z0-9\\_\\-]+)`

&bull; Modifier `#u` (PCRE_UTF8) is now default in regex based routes in `Mvc\Router`

&bull; `Mvc\Router\Route` now escapes characters such as `.` or `+` to avoid unexpected behaviors

&bull; Fixed the use of the annotation router with namespaced controllers

&bull; Fixed matching host name by `Phalcon\Mvc\Route::handle` when using port on current host name [GI:2573]

#### SECURITY
&bull; Added `Phalcon\Security::hasLibreSsl` and `Phalcon\Security::getSslVersionNumber`
Mostly these are used internally but can be used to get information about `libreSsl`.

&bull; Changed default hash algorithm in `Phalcon\Security` to `CRYPT_BLOWFISH_Y`

&bull; `Phalcon\Security` is using now `Phalcon\Security\Random`

&bull; Enforced that `Phalcon\Security::getToken()` and `Phalcon\Security::getTokenKey()` return a random value per request not per call

&bull; `Phalcon\Security::getToken()` and `Phalcon\Security::getTokenKey()` are using now
`Phalcon\Security::_numberBytes` instead of passed as argument or hard coded value

&bull; `Phalcon\Security::hash()` corrected not working CRYPT_STD_DES, CRYPT_EXT_DES, MD5, CRYPT_SHA256

&bull; `Phalcon\Security::hash()` CRYPT_SHA512 fixed wrong salt length

&bull; Added missing unit-tests for `Phalcon\Security`

#### SESSION
&bull; Removed `Phalcon\Session` [GI:11340]
> **BACKWARDS INCOMPATIBLE**: Any references to `Phalcon\Session` have to be removed and replaced with the relevant adapter class

&bull; Fixed the Session write callback [GI:11733]

#### TEXT
&bull; Added ability to use custom delimiter for `Phalcon\Text::camelize` and `Phalcon\Text::uncamelize` [GI:10396]
```php
use Phalcon\Text;
        
public function displayAction()
{
    echo Text::camelize('c+a+m+e+l+i+z+e', '+'); // CAMELIZE
}
```
&bull; Fixed `Phalcon\Text:dynamic()` to allow custom separator [GI:11215]

#### VIEW
&bull; An absolute path can now be used to `Mvc\View::setLayoutsDir`
You can now use one layout path for all the landing pages of your application for instance, even from separate projects

&bull; Now `Phalcon\Mvc\View` supports many views directories at the same time

&bull; Return `false` from an action disables the view component (same as `$this->view->disable()`)
```php
public function displayAction()
{
    // Do some stuff here
    
    return false; // Same as $this->view->disable();
}
```

&bull; Return a string from an action takes it as the body of the response

&bull; Return a string from an `Mvc\Micro` handler takes it as the body of the response
```php
public function displayAction()
{
    // Do some stuff here
    
    // $this->response->setContent('<h1>Hello World</h1>');
    return '<h1>Hello World</h1>';
}
```

&bull; Fixed odd view behavior [GI:1933] related to `setLayout()` and `pick()`

#### VALIDATION
&bull; `Phalcon\Mvc\Model\Validation` is now deprecated in favor of `Phalcon\Validation`
The functionality of both components is merged into one, allowing us to reduce the codebase while offering the same functionality as before.

**Old way**:
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
&bull; Method `isSetOption` in `Phalcon\Validation\ValidatorInterface` marked as deprecated, please use `hasOption`
> **CAUTION**: Any references to `isSetOption` need to be renamed to `hasOption`

**Old way**:
```php
if (true === $validation->isSetOption('my-option')) {
    //
}
```
**New way**:
```php
if (true === $validation->hasOption('my-option')) {
    //
}
```
&bull; Added internal check `allowEmpty` before calling a validator. If it option is true and the value of empty, the validator is skipped

&bull; Added option to validate multiple fields with one validator (fix uniqueness validator as well), also removes unnecessary `model => $this` in `Phalcon\Validation\Validator\Uniqueness`.

&bull; `Phalcon\Validation\Validator\Alpha` now correctly validates non-ASCII characters [GI:11386]

&bull; Added `Phalcon\Validation\CombinedFieldsValidator`, validation will pass array of fields to this validator if needed

&bull; `Phalcon\Validation\Validator\Digit` now correctly validates digits [GI:11374]
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
&bull; Added `Phalcon\Validation\Validator\Date`
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
&bull; Fixed `Phalcon\Validation::appendMessage` to allow append message to the empty stack [GI:10405]

&bull; Added `convert` option to the `Phalcon\Validation\Validator\Uniqueness` to convert values to the database lookup [GI:12005][GPR:12030]
```php
use Phalcon\Validation\Validator\Uniqueness;

$validator->add(
    'username', 
    new Uniqueness(
        [
            'convert' => function (array $values) {
                $values['username'] = strtolower($values['username']);
                
                return $values;
            }
        ]
    )
);
```
#### INTERFACES
&bull; Removed `__construct` from all interfaces [GI:11410][GPR:11441]

&bull; Added `Phalcon\Cli\DispatcherInterface`, `Phalcon\Cli\TaskInterface`, `Phalcon\Cli\RouterInterface` and `Phalcon\Cli\Router\RouteInterface`.

#### DOCUMENTATION
&bull; Added Indonesian translation [GPR:840]

&bull; Added `Phalcon\Cli\DispatcherInterface`, `Phalcon\Cli\TaskInterface`, `Phalcon\Cli\RouterInterface` and `Phalcon\Cli\Router\RouteInterface`.

#### VARIOUS
&bull; Added `Phalcon\Assets\Manager::exists()` to check if collection exists

&bull; Fixed `Filter::add` method handler [GI:11581]

&bull; Fixed issue with radio not being checked when default value is 0 [GI:11358]

&bull; Phalcon\Tag::getTitle() shows a title depending on `prependTitle` and `appendTitle`

&bull; Using a `settable` variable for the Mongo Connection Service name instead of a hard coded string [GI:11725]

&bull; `Phalcon\Debug\Dump` skip debugging di, fix detecting private/protected properties

&bull; Added new setter `Phalcon\Escaper::setDoubleEncode()` - to allow setting/disabling double encoding

&bull; Fixed `Phalcon\Config::merge` for working with php7

### PHP7
Phalcon 3.0 supports PHP7! In subsequent releases we will focus on the development of the framework to implove the compatibility and take advantage of the performance enhancements that PHP7 offers. You can install the framework in php7 using the usual installation instructions.

### Support
Phalcon 3.0 Long Term Support (LTS) version is out, and it’s packed with new features to help you better create web applications with PHP. This version of the framework will be maintained for 3 years from now.

### Acknowledgments
We want to greatly thank everyone who has contributed to accomplish and achieve the completion of this release. Special thanks to our friends around the world that have made possible this release:

* [Andres Gutierrez](https://github.com/andresgutierrez)
* [Serghei Iakovlev](https://github.com/sergeyklay)
* [Nikolaos Dimopoulos](https://github.com/niden)
* [Sid Roberts](https://github.com/SidRoberts)
* [Wojciech Ślawski](https://github.com/Jurigag)
* [Steffen Butzer](https://github.com/steffengy)
* [Dmitry Patsura](https://github.com/ovr)
* [Rian Orie](https://github.com/rianorie)
* [Mark Johnson](https://github.com/virgofx)
* [Clay Garland](http://www.agencymatrix.com/)
* [Radek Crlík](https://github.com/CrNix)
* [Rudi Servo](https://github.com/rudiservo)
* [Bas Stottelaar](https://github.com/basilfx)
* [Renzo Peralta](https://github.com/dred86)
* [Mitchell Macpherson](https://github.com/phalcon/cphalcon/commit/5dd068d03fbe8cbea9f5f244672b93de1421c4f5)
* [Hina Chen](https://github.com/hinablue)
* [JIM](https://github.com/tembem)
* [Mariusz Łączak](https://github.com/mruz)
* [Jj](https://github.com/jdrmar)
* [Rahul Datta Roy](https://github.com/rahuldroy)
* [Cameron Hall](https://github.com/CameronHall)
* [Clément Hallet](https://github.com/challet)
* [Alexey Bobkov](https://github.com/alexprowars)
* [Vladimir Metelitsa](https://github.com/Green-Cat)
* [Aleksandr Besedin](https://github.com/phalcon/cphalcon/commit/4d79fdd63e2229311f8cafdbcedf5b64bb96e71c)
* [Skydev0h](https://github.com/Skydev0h)
* [Newbas](https://github.com/Newbas)
* [Christopher CHEN](https://github.com/Fishdrowned)
* [Alex Komrakov](https://github.com/AlexKomrakov)
* [Dan](https://github.com/googlle)
* [Marcin Butlak](https://github.com/makerlabs)
* [Aaron Imming](https://github.com/aaronimming)
* [Ragnis Armus](https://github.com/Ragnis)
* [Studentsov](https://github.com/Studentsov)
* [Bellardia](https://github.com/Bellardia)
* [Julian Molina](https://github.com/phalcondroid)
* [Dmitry Korolev](https://github.com/Chameleon-m)
* [certainlysylvia](https://github.com/certainlysylvia)
* [Jaskaran Singh](https://github.com/jaskaransingh156)
* [Gustavo Verzola](https://github.com/verzola)
* [Erik Wiesenthal](https://github.com/Surt)
* [Karolis Mačiulskis](https://github.com/DestinyMKas)
* [tmihalik](https://github.com/tmihalik)
* [Rob](https://github.com/rkeplin)
* [dzubchik](https://github.com/dzubchik)
* [Brian Moore](https://github.com/bmoore)
* [Przemysław Lazarek](https://github.com/Daredzik)
* [acwtools](https://github.com/acwtools)
* [nsossonko](https://github.com/nsossonko)
* [Takuya Arita](https://github.com/ariarijp)
* [Matthias von Bargen](https://github.com/mattvb91)
* [Renato Montagna Junior](https://github.com/renatomjr)
* [Ryo Moriwaki](https://github.com/ryomo)
* [ifsnow](https://github.com/ifsnow)
* [Zhao Yi](https://github.com/zhao5908)
* [phecho](https://github.com/phecho)
* [Decent Woo](https://github.com/mr5)
* [Dreamszhu](https://github.com/dreamsxin)
* [Eugene Smirnov](https://github.com/ashpumpkin)
* [mich-grodno](https://github.com/mich-grodno)
* [Alex Barinov](https://github.com/AlexDRiVER)
* [Kostya Kufta](https://github.com/yankos)
* [Nochum Sossonko](https://github.com/phalcon/cphalcon/commit/cd1152a6ac1f827d0109003e38104a96896c26e2)
* [Ivan Guillen](https://github.com/zeopix)
* [Stanislav Kiryukhin](https://github.com/KorsaR-ZN)
* [Patrick Zippenfenig](https://github.com/patrick-zippenfenig)
* [temuri416](https://github.com/temuri416)
* [Yajie Zhu](https://github.com/snowair)
* [michanismus](https://github.com/michanismus)
* [Caio Almeida](https://github.com/caiofralmeida)
* [jimjim2a](https://github.com/jimjim2a)
* [Olivier Monaco](https://github.com/olivier-monaco)
* [Alex Kalmikov](https://github.com/ph55)
* [Olivier.Garbé](https://github.com/ogarbe)

* Agency Matrix
* Cazamba Serviços de Internet Ltda
* AUMIX Networks
* Tecno Soft Consultoría Informática, SL
* Layer Seven Solutions INC
* PHP Wisdom Ltd
* Brainz
* Dmitri Bazilski
* Kamil Podkowka
* Chen Shih Wei
* Thomas Noack
* Jeroen Evers
* Vladimir Merkushev
* Oscar Candela Vera
* Sebastian Machuca Arias
* Rene Bravo
* Ilya Slabukarau
* Kamol Trade
* Loris Luise
* Karolis Mačiulskis
* Julian Claus
* Nikola Tesic
* Daniel Martín
* Matej Bádal
* Daniel Martín Spiridione
* Matej Bádal
* Arturo Bernal Mayordomo
* Christopher Söllinger
* Giorgio Balestrieri
* Oleg Lemeshenko
* Hristomir Kotzev
* Boris Delev
* Takahashi Kotaro
* Dave Turcotte
* Khanh Tran
* Martin Jentzsch
* Frank Vlatten
* Vicki Dahl Algot
* 川合 亮
* Larry Dennison
* Adrian Bobowicz
* Jegor Levkovskiy
* Eugene Tsura
* Yaroslava Krutskikh
* Hugo Casanova
* Gustavo Miranda
* Radoslav Kirilov
* Callum Hopkins
* Anthony Clarke
* Michael Bergman
* Hesam Bahrami Chahardah Cheriki
* Ernesto Cánovas Conesa
* Daniel Lusignan
* Stadnik Vasili
* Mekan Bashimov

### Conclusion
Phalcon 3.0 takes a step forward towards a modern framework for PHP. We'll continue
working making it more useful and performant for developers. Thank you once more to our 
wonderful community and users!

### Installation
You can install Phalcon 3.0 for either PHP 5.5/5.6/7.0 using the following instructions:

```sh
git clone --depth=5 https://github.com/phalcon/cphalcon
cd cphalcon/build
sudo ./install
```

Windows DLLs are available in the [download page](https://phalconphp.com/en/download/windows).

* [Documentation](https://docs.phalconphp.com)
* [API](https://api.phalconphp.com/)

As always, many thanks to everyone involved in this release and thanks for choosing Phalcon!

<3 Phalcon Team
