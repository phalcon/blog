Phalcon 1.3 beta 1 released!
============================

We are happy to announce the release of our first beta of Phalcon 1.3​!

In this version we have introduced several new features and performance improvements. The intend of this beta release is get input from the community, test the new functionality making sure everything works fine once production environments are updated to 1.3.

1.3.0 includes several performance improvements, new components like `Phalon\Image`, bug fixes, stability and performance improvements.​

- Code cleanup: get rid of compiler warnings, dead code elimination, code deduplication, use static code analysers to eliminate possible bugs ([GI:801], [GI:802], [GI:810], [GI:825], [GI:827], [GI:838], [GI:849], [GI:942], [GI:968], [GI:1001], [GI:1093], [GI:1169], [GI:1214], [GI:1223], [GI:1224], [GI:1375], [GI:1430])
- Fixed various memory leaks ([GI:469], [GI:860], [GI:910], [GI:914], [GI:916], [GI:1031], [GI:1067], [GI:1249], [GI:1273], [GI:1291], [GI:1309], [GI:1345], [GI:1455], [GI:1470])
- Fixed memory access violations / segmentation faults / etc. ([GI:469], [GI:849], [GI:851], [GI:852], [GI:858], [GI:860], [GI:861], [GI:895], [GI:911], [GI:918], [GI:927], [GI:928], [GI:1000], [GI:1077], [GI:1112], [GI:1113], [GI:1131], [GI:1149], [GI:1173], [GI:1272], [GI:1284], [GI:1302], [GI:1340], [GI:1343], [GI:1368], [GI:1369], [GI:1371], [GI:1376], [GI:1379], [GI:1392], [GI:1451], [GI:1466], [GI:1485], [GI:1494], [GI:1501], [GI:1504], [GI:1509], [GI:1567], [GI:1607])
- Fixed PHP notices, warnings and other incompatibilities ([GI:894], [GI:1222], [GI:1315], [GI:1413], [GI:1427], [GI:1428], [GI:1529])
- Security fixes:
  - Hardening fixes ([GI:1044])
  - Interface validation ([GI:1043], [GI:1048])
  - Thorough data validation in `__wakeup()` ([GI:1043], [GI:1634], [GI:1635])
  - Fixed XSS vulnerabilities ([GI:1216], [GI:1190])
  - `Phalcon\Security::checkHash()` allows to restrict the length of the password to avoid attacks like [https://www.djangoproject.com/weblog/2013/sep/15/security/](https://www.djangoproject.com/weblog/2013/sep/15/security/) ([GI:1261])
  - Fixed crash while rendering element's label ([GI:1210])
  - Prevent MongoDB Request Injection Attacks ([GI:1265])
  - Do not allow to override superglobals in views ([GI:1617])
- Phalcon Kernel:
  - 32 and 64 bit hashes can be computed on the same CPU architecture ([GI:817])
  - Reduced overall memory usage ([GI:834], [GI:891], [GI:893])
  - Memory allocation optimizations ([GI:912], [GI:1220])
  - Faster internal array and string manipulation ([GI:822], [GI:823], [GI:830], [GI:833], [GI:837], [GI:890])
  - Camelize does not ignore the last character of a string anymore ([GI:1436])
  - Fixed bug in `phalcon_fix_path()` ([GI:1601])
  - Use native counterparts for `memory_get_usage()`, `gettype()`, `json_encode()`, `json_decode()`, `session_XXX()`, `header()`, `headers_sent()`, `debug_backtrace()`, `lcfirst()`, `ob_XXX()`, `array_unshift()`, `array_values()`, `array_keys()`, `htmlentities()` ([GI:836], [GI:847], [GI:936], [GI:945], [GI:1099])
  - Hash functions tailored for object handlers ([GI:842])
  - Optimization of calls to userland functions and methods ([GI:843], [GI:954])
  - Read/modify/update optimization on properties ([GI:848])
  - Added support for self/parent/static scopes in static properties ([GI:943])
  - Scope lookup optimizations ([GI:948])
  - Do not restore memory frames from kernel functions ([GI:960], [GI:976])
  - Diagnostic messages when Phalcon is compiled in dev mode ([GI:1009], [GI:1054], [GI:1097])
  - Return Value Optimization ([GI:1046], [GI:1047], [GI:1075])
  - Fixed locale issue ([GI:1095])
  - Added support for interned strings (PHP 5.4+)
  - Static property fetch/update optimization ([GI:1293])
  - Fix misleading diagnostics on exception ([GI:1297])
  - Use preallocated permanent zvals instead of null, true, false, 0 and 1 ([GI:1302])
  - Bug fix in `phalcon_fix_path()` ([GI:1591])
- `Phalcon\Acl`:
  - Fixed broken ACL inheritance ([GI:905])
  - Bug fix when ACL allowed access to forbidden resources ([GI:1303])
  - Fixed bug with ACL * wildcard ([GI:1409])
  - Fixed bug with numeric resources ([GI:1513])
- `Phalcon\Annotations`:
  - Fixed `getProperty()` bug in AnnotationsAdapter ([GI:996])
  - `Phalcon\Annotations` optimizations ([GI:1141])
  - Fixed parsing of annotations containing / ([GI:1480])
- `Phalcon\Assets`:
  - Fixed bugs when minifier produced no output at all ([GI:811], [GI:821])
  - Fixed joining issue ([GI:951])
  - Added support for UTF-8 characters in jsmin
  - Fixed chaining of CSS/JS filters ([GI:1198])
  - `Phalcon\Assets\Filters\CssMin` and `Phalcon\Assets\Filters\JsMin` implement `Phalcon\Assets\FilterInterface` ([GI:1539])
  - Added `Phalcon\Assets\Collection::setTargetLocal()` ([GI:1532])
- `Phalcon\Cache`:
  - Added Libmemcached cache backend ([GI:913])
  - Added support for APCu 4.0.2+ ([GI:1234])
  - Implemented `Phalcon\Cache\Backend\Memory::queryKeys()` ([GI:1093])
  - Bug fixes in `Phalcon\Cache\Backend\Xcache` ([GI:1406])
  - `Phalcon\Cache\Frontend\Data` optimizations ([GI:1093])
  - `Phalcon\Cache\Frontend\None` optimizations ([GI:1093])
  - `Phalcon\Cache\Frontend\Base64` optimizations ([GI:1093])
  - `Phalcon\Cache\Frontend\Igbinary` optimizations ([GI:1093])
  - `Phalcon\Cache\Frontend\Output` optimizations ([GI:1093])
  - `Phalcon\Cache\Frontend\Json` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend\Memory` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend\File` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend\Apc` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend\Xcache` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend\Memcache` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend\Mongo` optimizations ([GI:1093])
  - `Phalcon\Cache\Backend\Libmemcached` optimizations and bug fixes ([GI:1093])
  - Added `increment()` and `decrement()` methods ([GI:1374])
  - Added `flush()` method ([GI:1352])
- `Phalcon\Config`:
  - Faster `Phalcon\Config` implementation using object handlers ([GI:837], [GI:1277])
  - `Phalcon\Config` now support numeric properties as well ([GI:837])
- Implemented `Phalcon\Config::offsetUnset()` ([GI:732])
  - `Phalcon\Config\Adapter\Ini` correctly handles empty sections and INI files without any sections ([GI:829], [GI:837])
  - Added `Phalcon\Adapter\Config\Json` class to read JSON configs ([GI:844])
  - `Phalcon\Config::merge` now works with derived classes ([GI:1024])
  - Dot-delimited directives in INI-files are now parsed correctly ([GI:872])
  - Support for PHP arrays as config files ([GI:1439])
- `Phalcon\Crypt`:
  - Added support for various padding schemes (PKCS7, ANSI X.923, ISO 10126, ISO/IEC 7816-4, zero padding, space padding) to `Phalcon\Crypt` ([GI:864], [GI:887])
  - Reduced peak memory usage ([GI:1237])
  - `encryptBase64()` and `decryptBase64()` can optionally use RFC 4648 flavor of BASE64 ([GI:1353])
- `Phalcon\Db`:
  - Added support for `DECIMAL` scale ([GI:940])
  - Fixed invalid sequence names for PostgreSQL ([GI:1022])
  - Added support for MySQL `DOUBLE` type ([GI:1128])
  - Database dialects now support `BOOLEAN` data type ([GI:816])
  - Added support for `POINT` type in MySQL ([GI:1536])
  - Fixed issue with `RawValue('default')` on composite primary key ([GI:1534])
- `Phalcon\Debug`:
  - Added support for UTF-8 to `\Phalcon\Debug` ([GI:1099])
  - `Phalcon\Debug::uri` now supports both http and https ([GI:987])
  - Fixed array to string conversion notice ([GI:1534])
  - Add support for `xdebug.file_link_format` ([GI:1401])
- `Phalcon\DI`:
  - `Phalcon\Di` optimizations ([GI:1014])
  - Added `Phalcon\Di\Service::isResolved()` method ([GI:1242])
  - Make sure that 'persistent' is resolved only when accessed for the first time ([GI:1637])
  - Faster DI implementation by using object handlers ([GI:1473])
- `Phalcon\Dispatcher`:
  - Dispatching parameters now can be modified in `beforeExecuteRoute` events
  - `beforeException` events can now handle exceptions occurred when executing actions ([GI:140])
  - Added `Phalcon\Dispatcher::getHandlerClass` and `Phalcon\Dispatcher::getActionMethod`
  - Implemented `afterInitialize` event ([GI:782])
  - `Phalcon\Dispatcher` optimizations ([GI:782])
  - Added `getPreviousControllerName()`, `getPreviousActionName()` ([GI:1462])
- `Phalcon\Element`:
  - `Phalcon\Element::addFilter()` incorrectly prepends NULL as the first element ([GI:1019])
- `Phalcon\Escaper`:
  - Fixed bugs in `Phalcon\Escaper` ([GI:917])
  - `Phalcon\Escaper` optimizations ([GI:1015])
- `Phalcon\Events`:
  - Added support for weak references ([GI:663])
  - Bug fix in `Phalcon\Events\manager::attach()` ([GI:1331], [GI:1337])
- `Phalcon\Forms`:
  - `Phalcon\Forms\Element\*` classes now implement `Phalcon\Form\ElementInterface`
  - Added support for HTML attributes to `Phalcon\Forms\Form::label()` ([GI:1029])
  - `Phalcon\Forms\Form::getMessages()` does not generate a fatal error if the form is valid ([GI:1349])
  - Improvements to `Phalcon\Forms\Form::add()` ([GI:1386])
- `Phalcon\Http`:
  - `Phalcon\Http\Cookie` can be used without sessions ([GI:875])
  - `Phalcon\Http\Cookie` does not ignore expire time ([GI:897])
  - `Phalcon\Http\Request` fully supports file arrays ([GI:884], [GI:888])
  - `Phalcon\Http\Request` optimizations ([GI:889])
  - Added `getKey()`, `getError()`, `isUploadedFile()` methods to `Phalcon\Http\Request\File` ([GI:878], [GI:888])
  - Fixed regression in `\Phalcon\Http\Request::getRawBody()` ([GI:1091])
  - Bug fix in `Phalcon\Http\Request::getQuery()` ([GI:1226])
  - Fixed broken `Phalcon\Http\Response::setFileToSend()` method ([GI:831], [GI:832])
  - Redirects use status descriptions from RFC 2616 ([GI:1175])
  - `Phalcon\Http\Response::setFileToSend()` can now show the file in the browser instead of offering to download it ([GI:853])
  - Added `Phalcon\Http\Response\Headers::toArray()` ([GI:1008])
  - `getJsonRawBody()` may return an associative array ([GI:1241])
  - Added `getURI()`, `getBasicAuth()`, `getDigestAuth()` methods to `Phalcon\Http\Request` ([GI:1250])
  - Added `getPut()`/`hasPut()` methods to `Phalcon\Http\Request` ([GI:680], [GI:1403])
  - Implemented `Phalcon\Http\Request\File::getRealType` ([GI:1442], [GI:1444])
- `Phalcon\Image`:
  - Added `Phalcon\Image\Adapter`, `Phalcon\Image\Adapter\Gd`, `Phalcon\Image\Adapter\Imagick` ([GI:902], [GI:1025], [GI:1030], [GI:1041], [GI:1050], [GI:1063], [GI:1076], [GI:1081], [GI:1114], [GI:1120], [GI:1158], [GI:1195], [GI:1206], [GI:1214], [GI:1370])
- `Phalcon\Logger`:
  - Added FirePHP Log Adapter and Formatter ([GI:845], [GI:1333])
  - Implemented `Phalcon\Logger\Adapter::isTransaction()` ([GI:1238])
  - Fixed a bug preventing the `EMERGENCY` log type from being displayed correctly ([GI:1498])
  - Added `Phalcon\Logger\Adapter\File::getPath()` ([GI:1495], [GI:1508])
- `Phalcon\Mvc`:
  - `Phalcon\Mvc\Application::handle()` now checks whether the class exists before include()'ing its file ([GI:812], [GI:818])
  - `Phalcon\Mvc\Model\Criteria::fromInput()` now sets` _modelName` ([GI:866], [GI:873])
  - `Phalcon\Mvc\Model\Query\Builder` may now use both integer and string placeholders ([GI:701])
  - `Mvc\Model\getMessages()` is filterable now ([GI:885])
  - Fixed hasManyToMany relation implementation ([GI:938])
  - Fixed regular expression in `\Phalcon\Mvc\Model\Validator\Email` ([GI:1243])
  - `Phalcon\Mvc\Model::hasOne`/`hasMany`/`belongsTo`/`hasManyToMany`/`addBehavior()` are now public methods ([GI:1166])
  - Added `Phalcon\Mvc\Model\Row::toArray()` method ([GI:1506])
  - `Phalcon\Mvc\Model\Validator::getOption()` returns `NULL` if the option does not exist ([GI:1530])
  - Bug with a custom Events Manager in `Phalcon\Mvc\Models` ([GI:1314])
  - `Phalcon\Mvc\Model\Query\Builder::__construct()` does not ignore joins anymore ([GI:1327])
  - Fixed `HAVING` handling in `Phalcon\Mvc\Model\Query\Builder` ([GI:1396])
  - Micro Collections return `Phalcon\Mvc\Micro\CollectionInterface` ([GI:1130])
  - `Phalcon\Mvc\Url::get()` can append query params ([GI:723], [GI:877])
  - Regular Expression Optimization for `Phalcon\Mvc\Router` ([GI:977])
  - PHQL: added placeholders support to `LIMIT` ([GI:1023])
  - Added `Phalcon\Mvc\Router::getDefautXXX()` methods ([GI:1087])
  - Allow `HAVING` without `GROUP BY` in query builder ([GI:1115])
  - mvc/model/query.c optimizations ([GI:1129], [GI:1132])
  - Added support for array(limit, offset]) as a 'limit' constructor key in Query Builder ([GI:1208])
  - Added support for 'conditions' in `Phalcon\Mvc\Model\Query\Builder::__construct()` ([GI:1236])
  - Added `Phalcon\Mvc\View::isDisabled()`, `Phalcon\Mvc\View::getRenderLevel()`, `Phalcon\Mvc\View::getDisabledLevels()` ([GI:907], [GI:1320])
  - Added `Phalcon\Mvc\View::getCurrentRenderLevel()` ([GI:907], [GI:1326])
  - Bug fix in `Phalcon\Mvc\Model\Resultset\Simple::toArray()` ([GI:1377])
  - Bug fixes in Volt compiler ([GI:1387])
  - `Phalcon\Mvc\Model\Query\Builder` optimizations ([GI:1414])
  - Allow to set dirs without trailing slashes in `Phalcon\Mvc\View` ([GI:406], [GI:1440])
  - `Phalcon\Mvc\Model\Validator::getOption()` returns null if option does not exists ([GI:1531])
  - Added `Phalcon\Mvc\Model::selectWriteConnection()` ([GI:1519])
  - Added `Phalcon\Mvc\Router\Group::convert()`/`getConverters()` ([GI:1555], [GI:1572])
  - Faster `Phalcon\Mvc\Model\Row` ([GI:1606])
- `Phalcon\Flash`:
  - `Phalcon\Flash\Session::getMessage('key')` returns now an empty array if the key is not found ([GI:908], [GI:920])
  - `Phalcon\Flash\Session::getMessages()` incorrectly removed all messages ([GI:1575])
  - Implemented `Phalcon\Flash\Session::isset()` ([GI:1342])
- `Phalcon\Paginator`:
  - `Phalcon\Paginator\Adapter\Model` returns correct results even when page number is incorrect ([GI:1654])
  - Optimized `Phalcon\Paginator\Adapter\QueryBuilder` ([GI:1632])
  - `setCurrentPage()` returns $this for all adapters ([GI:1633])
  - Optimized `Phalcon\Paginator\Adapter\NativeArray` ([GI:1653])
- `Phalcon\Queue`:
  - Fixed bug in `Phalcon\Queue\Beanstalk::read()` ([GI:1348], [GI:1612])
  - Bug fixes in beanstalkd protocol implementation
  - Optimizations ([GI:1621])
- `Phalcon\Security`:
  - `Phalcon\Security\Exception` inherits from `Phalcon\Exception`, not from `\Phalcon\DI\Exception`
  - Added `Phalcon\Security::computeHmac()` (
    [GI:1347])
  - Bug fixes ([GI:1347])
- `Phalcon\Session`:
  - Fix `Phalcon\Session\Bag::remove()` ([GI:1637])
  - `Phalcon\Session\Adapter::get()` may optionally remove the data from session ([GI:1358])
- `Phalcon\Tag`:
  - Fixed bugs ([GI:903])
  - Fixed radio button generation ([GI:947])
  - Fixed inconsistent behavior of `setAutoescape()` ([GI:1263])
  - Added missing HTML5 input types ([GI:824, [GI:1323])
  - Added `Phalcon\Tag::setTitleSeparator()` ([GI:1365])
  - Added support for  ([GI:1422])
  - Fixed inconsistency in `Tag::stylesheetLink`/`javascriptInclude` w.r.t. local URLs ([GI:1486])
- `Phalcon\Validation`:
  - Added support for error codes ([GI:1171])
  - Bug fixes ([GI:1399])
  - Optimized `Phalcon\Validation\Message\Group` by using native iterators ([GI:1657])
- Unit tests:
  - Travis CI improvements ([GI:819], [GI:846], [GI:949])
  - Use markTestSkipped(]) instead of echo ([GI:862])
  - Do not run APC tests under CLI when apc.enable_cli is 0 ([GI:1449])
  - Added new tests ([GI:865], [GI:1256], [GI:1260], [GI:1339], [GI:1560], [GI:1563])
  - Skip database tests when the DBMS is not available ([GI:970])
  - Support for optional RVO ([GI:1147])
  - Added support for test coverage visualization ([GI:1307], [GI:1361])
  - Bug fixes in tests ([GI:1313], [GI:1334], [GI:1335], [GI:1449], [GI:1467])
- Documentation bug fixes ([GI:1069], [GI:1070], [GI:1072], [GI:1145], [GI:1146], [GI:1205], [GI:1372], [GI:1397], [GI:1521], [GI:1523], [GI:1586], lots of them])
- Refactored, improved and optimized build script ([GI:1218])
- Other bug fixes ([GI:1051], [GI:1131], [GI:1040], [GI:1275], [GI:1392], [GI:1396], [GI:1399], [GI:1425], [GI:1426]...)

Help with Testing
-----------------

This version can be installed from the 1.3.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 1.3.0
sudo ./install
```

We welcome your comments regarding this new release. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.

Thanks!


<3 Phalcon Team