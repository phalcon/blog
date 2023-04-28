---
layout: post
title: "Phalcon 1.3 beta 1 released!"
tags: [php, phalcon, "1.3", beta, release, "1.x"]
---
We are happy to announce the release of our first beta of Phalcon 1.3!

In this version we have introduced several new features and performance improvements. The intend of this beta release is get input from the community, test the new functionality making sure everything works fine once production environments are updated to 1.3.

<!--more-->
1.3.0 includes several performance improvements, new components like `Phalon\Image`, bug fixes, stability and performance improvements.

- Code cleanup: get rid of compiler warnings, dead code elimination, code deduplication, use static code analysers to eliminate possible bugs ([801](https://github.com/phalcon/cphalcon/issues/801), [802](https://github.com/phalcon/cphalcon/issues/802), [810](https://github.com/phalcon/cphalcon/issues/810), [825](https://github.com/phalcon/cphalcon/issues/825), [827](https://github.com/phalcon/cphalcon/issues/827), [838](https://github.com/phalcon/cphalcon/issues/838), [849](https://github.com/phalcon/cphalcon/issues/849), [942](https://github.com/phalcon/cphalcon/issues/942), [968](https://github.com/phalcon/cphalcon/issues/968), [1001](https://github.com/phalcon/cphalcon/issues/1001), [1093](https://github.com/phalcon/cphalcon/issues/1093), [1169](https://github.com/phalcon/cphalcon/issues/1169), [1214](https://github.com/phalcon/cphalcon/issues/1214), [1223](https://github.com/phalcon/cphalcon/issues/1223), [1224](https://github.com/phalcon/cphalcon/issues/1224), [1375](https://github.com/phalcon/cphalcon/issues/1375), [1430](https://github.com/phalcon/cphalcon/issues/1430))
- Fixed various memory leaks ([469](https://github.com/phalcon/cphalcon/issues/469), [860](https://github.com/phalcon/cphalcon/issues/860), [910](https://github.com/phalcon/cphalcon/issues/910), [914](https://github.com/phalcon/cphalcon/issues/914), [916](https://github.com/phalcon/cphalcon/issues/916), [1031](https://github.com/phalcon/cphalcon/issues/1031), [1067](https://github.com/phalcon/cphalcon/issues/1067), [1249](https://github.com/phalcon/cphalcon/issues/1249), [1273](https://github.com/phalcon/cphalcon/issues/1273), [1291](https://github.com/phalcon/cphalcon/issues/1291), [1309](https://github.com/phalcon/cphalcon/issues/1309), [1345](https://github.com/phalcon/cphalcon/issues/1345), [1455](https://github.com/phalcon/cphalcon/issues/1455), [1470](https://github.com/phalcon/cphalcon/issues/1470))
- Fixed memory access violations / segmentation faults / etc. ([469](https://github.com/phalcon/cphalcon/issues/469), [849](https://github.com/phalcon/cphalcon/issues/849), [851](https://github.com/phalcon/cphalcon/issues/851), [852](https://github.com/phalcon/cphalcon/issues/852), [858](https://github.com/phalcon/cphalcon/issues/858), [860](https://github.com/phalcon/cphalcon/issues/860), [861](https://github.com/phalcon/cphalcon/issues/861), [895](https://github.com/phalcon/cphalcon/issues/895), [911](https://github.com/phalcon/cphalcon/issues/911), [918](https://github.com/phalcon/cphalcon/issues/918), [927](https://github.com/phalcon/cphalcon/issues/927), [928](https://github.com/phalcon/cphalcon/issues/928), [1000](https://github.com/phalcon/cphalcon/issues/1000), [1077](https://github.com/phalcon/cphalcon/issues/1077), [1112](https://github.com/phalcon/cphalcon/issues/1112), [1113](https://github.com/phalcon/cphalcon/issues/1113), [1131](https://github.com/phalcon/cphalcon/issues/1131), [1149](https://github.com/phalcon/cphalcon/issues/1149), [1173](https://github.com/phalcon/cphalcon/issues/1173), [1272](https://github.com/phalcon/cphalcon/issues/1272), [1284](https://github.com/phalcon/cphalcon/issues/1284), [1302](https://github.com/phalcon/cphalcon/issues/1302), [1340](https://github.com/phalcon/cphalcon/issues/1340), [1343](https://github.com/phalcon/cphalcon/issues/1343), [1368](https://github.com/phalcon/cphalcon/issues/1368), [1369](https://github.com/phalcon/cphalcon/issues/1369), [1371](https://github.com/phalcon/cphalcon/issues/1371), [1376](https://github.com/phalcon/cphalcon/issues/1376), [1379](https://github.com/phalcon/cphalcon/issues/1379), [1392](https://github.com/phalcon/cphalcon/issues/1392), [1451](https://github.com/phalcon/cphalcon/issues/1451), [1466](https://github.com/phalcon/cphalcon/issues/1466), [1485](https://github.com/phalcon/cphalcon/issues/1485), [1494](https://github.com/phalcon/cphalcon/issues/1494), [1501](https://github.com/phalcon/cphalcon/issues/1501), [1504](https://github.com/phalcon/cphalcon/issues/1504), [1509](https://github.com/phalcon/cphalcon/issues/1509), [1567](https://github.com/phalcon/cphalcon/issues/1567), [1607](https://github.com/phalcon/cphalcon/issues/1607))
- Fixed PHP notices, warnings and other incompatibilities ([894](https://github.com/phalcon/cphalcon/issues/894), [1222](https://github.com/phalcon/cphalcon/issues/1222), [1315](https://github.com/phalcon/cphalcon/issues/1315), [1413](https://github.com/phalcon/cphalcon/issues/1413), [1427](https://github.com/phalcon/cphalcon/issues/1427), [1428](https://github.com/phalcon/cphalcon/issues/1428), [1529](https://github.com/phalcon/cphalcon/issues/1529))
- Security fixes:
  - Hardening fixes ([1044](https://github.com/phalcon/cphalcon/issues/1044))
  - Interface validation ([1043](https://github.com/phalcon/cphalcon/issues/1043), [1048](https://github.com/phalcon/cphalcon/issues/1048))
  - Thorough data validation in `__wakeup()` ([1043](https://github.com/phalcon/cphalcon/issues/1043), [1634](https://github.com/phalcon/cphalcon/issues/1634), [1635](https://github.com/phalcon/cphalcon/issues/1635))
  - Fixed XSS vulnerabilities ([1216](https://github.com/phalcon/cphalcon/issues/1216), [1190](https://github.com/phalcon/cphalcon/issues/1190))
  - `Phalcon\Security::checkHash()` allows to restrict the length of the password to avoid attacks like [https://www.djangoproject.com/weblog/2013/sep/15/security/](https://www.djangoproject.com/weblog/2013/sep/15/security/) ([1261](https://github.com/phalcon/cphalcon/issues/1261))
  - Fixed crash while rendering element's label ([1210](https://github.com/phalcon/cphalcon/issues/1210))
  - Prevent MongoDB Request Injection Attacks ([1265](https://github.com/phalcon/cphalcon/issues/1265))
  - Do not allow to override superglobals in views ([1617](https://github.com/phalcon/cphalcon/issues/1617))
- Phalcon Kernel:
  - 32 and 64 bit hashes can be computed on the same CPU architecture ([817](https://github.com/phalcon/cphalcon/issues/817))
  - Reduced overall memory usage ([834](https://github.com/phalcon/cphalcon/issues/834), [891](https://github.com/phalcon/cphalcon/issues/891), [893](https://github.com/phalcon/cphalcon/issues/893))
  - Memory allocation optimizations ([912](https://github.com/phalcon/cphalcon/issues/912), [1220](https://github.com/phalcon/cphalcon/issues/1220))
  - Faster internal array and string manipulation ([822](https://github.com/phalcon/cphalcon/issues/822), [823](https://github.com/phalcon/cphalcon/issues/823), [830](https://github.com/phalcon/cphalcon/issues/830), [833](https://github.com/phalcon/cphalcon/issues/833), [837](https://github.com/phalcon/cphalcon/issues/837), [890](https://github.com/phalcon/cphalcon/issues/890))
  - Camelize does not ignore the last character of a string anymore ([1436](https://github.com/phalcon/cphalcon/issues/1436))
  - Fixed bug in `phalcon_fix_path()` ([1601](https://github.com/phalcon/cphalcon/issues/1601))
  - Use native counterparts for `memory_get_usage()`, `gettype()`, `json_encode()`, `json_decode()`, `session_XXX()`, `header()`, `headers_sent()`, `debug_backtrace()`, `lcfirst()`, `ob_XXX()`, `array_unshift()`, `array_values()`, `array_keys()`, `htmlentities()` ([836](https://github.com/phalcon/cphalcon/issues/836), [847](https://github.com/phalcon/cphalcon/issues/847), [936](https://github.com/phalcon/cphalcon/issues/936), [945](https://github.com/phalcon/cphalcon/issues/945), [1099](https://github.com/phalcon/cphalcon/issues/1099))
  - Hash functions tailored for object handlers ([842](https://github.com/phalcon/cphalcon/issues/842))
  - Optimization of calls to userland functions and methods ([843](https://github.com/phalcon/cphalcon/issues/843), [954](https://github.com/phalcon/cphalcon/issues/954))
  - Read/modify/update optimization on properties ([848](https://github.com/phalcon/cphalcon/issues/848))
  - Added support for self/parent/static scopes in static properties ([943](https://github.com/phalcon/cphalcon/issues/943))
  - Scope lookup optimizations ([948](https://github.com/phalcon/cphalcon/issues/948))
  - Do not restore memory frames from kernel functions ([960](https://github.com/phalcon/cphalcon/issues/960), [976](https://github.com/phalcon/cphalcon/issues/976))
  - Diagnostic messages when Phalcon is compiled in dev mode ([1009](https://github.com/phalcon/cphalcon/issues/1009), [1054](https://github.com/phalcon/cphalcon/issues/1054), [1097](https://github.com/phalcon/cphalcon/issues/1097))
  - Return Value Optimization ([1046](https://github.com/phalcon/cphalcon/issues/1046), [1047](https://github.com/phalcon/cphalcon/issues/1047), [1075](https://github.com/phalcon/cphalcon/issues/1075))
  - Fixed locale issue ([1095](https://github.com/phalcon/cphalcon/issues/1095))
  - Added support for interned strings (PHP 5.4+)
  - Static property fetch/update optimization ([1293](https://github.com/phalcon/cphalcon/issues/1293))
  - Fix misleading diagnostics on exception ([1297](https://github.com/phalcon/cphalcon/issues/1297))
  - Use preallocated permanent zvals instead of null, true, false, 0 and 1 ([1302](https://github.com/phalcon/cphalcon/issues/1302))
  - Bug fix in `phalcon_fix_path()` ([1591](https://github.com/phalcon/cphalcon/issues/1591))
- `Phalcon\Acl`:
  - Fixed broken ACL inheritance ([905](https://github.com/phalcon/cphalcon/issues/905))
  - Bug fix when ACL allowed access to forbidden resources ([1303](https://github.com/phalcon/cphalcon/issues/1303))
  - Fixed bug with ACL * wildcard ([1409](https://github.com/phalcon/cphalcon/issues/1409))
  - Fixed bug with numeric resources ([1513](https://github.com/phalcon/cphalcon/issues/1513))
- `Phalcon\Annotations`:
  - Fixed `getProperty()` bug in AnnotationsAdapter ([996](https://github.com/phalcon/cphalcon/issues/996))
  - `Phalcon\Annotations` optimizations ([1141](https://github.com/phalcon/cphalcon/issues/1141))
  - Fixed parsing of annotations containing / ([1480](https://github.com/phalcon/cphalcon/issues/1480))
- `Phalcon\Assets`:
  - Fixed bugs when minifier produced no output at all ([811](https://github.com/phalcon/cphalcon/issues/811), [821](https://github.com/phalcon/cphalcon/issues/821))
  - Fixed joining issue ([951](https://github.com/phalcon/cphalcon/issues/951))
  - Added support for UTF-8 characters in jsmin
  - Fixed chaining of CSS/JS filters ([1198](https://github.com/phalcon/cphalcon/issues/1198))
  - `Phalcon\Assets\Filters\CssMin` and `Phalcon\Assets\Filters\JsMin` implement `Phalcon\Assets\FilterInterface` ([1539](https://github.com/phalcon/cphalcon/issues/1539))
  - Added `Phalcon\Assets\Collection::setTargetLocal()` ([1532](https://github.com/phalcon/cphalcon/issues/1532))
- `Phalcon\Cache`:
  - Added Libmemcached cache backend ([913](https://github.com/phalcon/cphalcon/issues/913))
  - Added support for APCu 4.0.2+ ([1234](https://github.com/phalcon/cphalcon/issues/1234))
  - Implemented `Phalcon\Cache\Backend\Memory::queryKeys()` ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - Bug fixes in `Phalcon\Cache\Backend\Xcache` ([1406](https://github.com/phalcon/cphalcon/issues/1406))
  - `Phalcon\Cache\Frontend\Data` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Frontend\None` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Frontend\Base64` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Frontend\Igbinary` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Frontend\Output` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Frontend\Json` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend\Memory` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend\File` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend\Apc` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend\Xcache` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend\Memcache` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend\Mongo` optimizations ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - `Phalcon\Cache\Backend\Libmemcached` optimizations and bug fixes ([1093](https://github.com/phalcon/cphalcon/issues/1093))
  - Added `increment()` and `decrement()` methods ([1374](https://github.com/phalcon/cphalcon/issues/1374))
  - Added `flush()` method ([1352](https://github.com/phalcon/cphalcon/issues/1352))
- `Phalcon\Config`:
  - Faster `Phalcon\Config` implementation using object handlers ([837](https://github.com/phalcon/cphalcon/issues/837), [1277](https://github.com/phalcon/cphalcon/issues/1277))
  - `Phalcon\Config` now support numeric properties as well ([837](https://github.com/phalcon/cphalcon/issues/837))
- Implemented `Phalcon\Config::offsetUnset()` ([732](https://github.com/phalcon/cphalcon/issues/732))
  - `Phalcon\Config\Adapter\Ini` correctly handles empty sections and INI files without any sections ([829](https://github.com/phalcon/cphalcon/issues/829), [837](https://github.com/phalcon/cphalcon/issues/837))
  - Added `Phalcon\Adapter\Config\Json` class to read JSON configs ([844](https://github.com/phalcon/cphalcon/issues/844))
  - `Phalcon\Config::merge` now works with derived classes ([1024](https://github.com/phalcon/cphalcon/issues/1024))
  - Dot-delimited directives in INI-files are now parsed correctly ([872](https://github.com/phalcon/cphalcon/issues/872))
  - Support for PHP arrays as config files ([1439](https://github.com/phalcon/cphalcon/issues/1439))
- `Phalcon\Crypt`:
  - Added support for various padding schemes (PKCS7, ANSI X.923, ISO 10126, ISO/IEC 7816-4, zero padding, space padding) to `Phalcon\Crypt` ([864](https://github.com/phalcon/cphalcon/issues/864), [887](https://github.com/phalcon/cphalcon/issues/887))
  - Reduced peak memory usage ([1237](https://github.com/phalcon/cphalcon/issues/1237))
  - `encryptBase64()` and `decryptBase64()` can optionally use RFC 4648 flavor of BASE64 ([1353](https://github.com/phalcon/cphalcon/issues/1353))
- `Phalcon\Db`:
  - Added support for `DECIMAL` scale ([940](https://github.com/phalcon/cphalcon/issues/940))
  - Fixed invalid sequence names for PostgreSQL ([1022](https://github.com/phalcon/cphalcon/issues/1022))
  - Added support for MySQL `DOUBLE` type ([1128](https://github.com/phalcon/cphalcon/issues/1128))
  - Database dialects now support `BOOLEAN` data type ([816](https://github.com/phalcon/cphalcon/issues/816))
  - Added support for `POINT` type in MySQL ([1536](https://github.com/phalcon/cphalcon/issues/1536))
  - Fixed issue with `RawValue('default')` on composite primary key ([1534](https://github.com/phalcon/cphalcon/issues/1534))
- `Phalcon\Debug`:
  - Added support for UTF-8 to `\Phalcon\Debug` ([1099](https://github.com/phalcon/cphalcon/issues/1099))
  - `Phalcon\Debug::uri` now supports both http and https ([987](https://github.com/phalcon/cphalcon/issues/987))
  - Fixed array to string conversion notice ([1534](https://github.com/phalcon/cphalcon/issues/1534))
  - Add support for `xdebug.file_link_format` ([1401](https://github.com/phalcon/cphalcon/issues/1401))
- `Phalcon\DI`:
  - `Phalcon\Di` optimizations ([1014](https://github.com/phalcon/cphalcon/issues/1014))
  - Added `Phalcon\Di\Service::isResolved()` method ([1242](https://github.com/phalcon/cphalcon/issues/1242))
  - Make sure that 'persistent' is resolved only when accessed for the first time ([1637](https://github.com/phalcon/cphalcon/issues/1637))
  - Faster DI implementation by using object handlers ([1473](https://github.com/phalcon/cphalcon/issues/1473))
- `Phalcon\Dispatcher`:
  - Dispatching parameters now can be modified in `beforeExecuteRoute` events
  - `beforeException` events can now handle exceptions occurred when executing actions ([140](https://github.com/phalcon/cphalcon/issues/140))
  - Added `Phalcon\Dispatcher::getHandlerClass` and `Phalcon\Dispatcher::getActionMethod`
  - Implemented `afterInitialize` event ([782](https://github.com/phalcon/cphalcon/issues/782))
  - `Phalcon\Dispatcher` optimizations ([782](https://github.com/phalcon/cphalcon/issues/782))
  - Added `getPreviousControllerName()`, `getPreviousActionName()` ([1462](https://github.com/phalcon/cphalcon/issues/1462))
- `Phalcon\Element`:
  - `Phalcon\Element::addFilter()` incorrectly prepends NULL as the first element ([1019](https://github.com/phalcon/cphalcon/issues/1019))
- `Phalcon\Escaper`:
  - Fixed bugs in `Phalcon\Escaper` ([917](https://github.com/phalcon/cphalcon/issues/917))
  - `Phalcon\Escaper` optimizations ([1015](https://github.com/phalcon/cphalcon/issues/1015))
- `Phalcon\Events`:
  - Added support for weak references ([663](https://github.com/phalcon/cphalcon/issues/663))
  - Bug fix in `Phalcon\Events\manager::attach()` ([1331](https://github.com/phalcon/cphalcon/issues/1331), [1337](https://github.com/phalcon/cphalcon/issues/1337))
- `Phalcon\Forms`:
  - `Phalcon\Forms\Element\*` classes now implement `Phalcon\Form\ElementInterface`
  - Added support for HTML attributes to `Phalcon\Forms\Form::label()` ([1029](https://github.com/phalcon/cphalcon/issues/1029))
  - `Phalcon\Forms\Form::getMessages()` does not generate a fatal error if the form is valid ([1349](https://github.com/phalcon/cphalcon/issues/1349))
  - Improvements to `Phalcon\Forms\Form::add()` ([1386](https://github.com/phalcon/cphalcon/issues/1386))
- `Phalcon\Http`:
  - `Phalcon\Http\Cookie` can be used without sessions ([875](https://github.com/phalcon/cphalcon/issues/875))
  - `Phalcon\Http\Cookie` does not ignore expire time ([897](https://github.com/phalcon/cphalcon/issues/897))
  - `Phalcon\Http\Request` fully supports file arrays ([884](https://github.com/phalcon/cphalcon/issues/884), [888](https://github.com/phalcon/cphalcon/issues/888))
  - `Phalcon\Http\Request` optimizations ([889](https://github.com/phalcon/cphalcon/issues/889))
  - Added `getKey()`, `getError()`, `isUploadedFile()` methods to `Phalcon\Http\Request\File` ([878](https://github.com/phalcon/cphalcon/issues/878), [888](https://github.com/phalcon/cphalcon/issues/888))
  - Fixed regression in `\Phalcon\Http\Request::getRawBody()` ([1091](https://github.com/phalcon/cphalcon/issues/1091))
  - Bug fix in `Phalcon\Http\Request::getQuery()` ([1226](https://github.com/phalcon/cphalcon/issues/1226))
  - Fixed broken `Phalcon\Http\Response::setFileToSend()` method ([831](https://github.com/phalcon/cphalcon/issues/831), [832](https://github.com/phalcon/cphalcon/issues/832))
  - Redirects use status descriptions from RFC 2616 ([1175](https://github.com/phalcon/cphalcon/issues/1175))
  - `Phalcon\Http\Response::setFileToSend()` can now show the file in the browser instead of offering to download it ([853](https://github.com/phalcon/cphalcon/issues/853))
  - Added `Phalcon\Http\Response\Headers::toArray()` ([1008](https://github.com/phalcon/cphalcon/issues/1008))
  - `getJsonRawBody()` may return an associative array ([1241](https://github.com/phalcon/cphalcon/issues/1241))
  - Added `getURI()`, `getBasicAuth()`, `getDigestAuth()` methods to `Phalcon\Http\Request` ([1250](https://github.com/phalcon/cphalcon/issues/1250))
  - Added `getPut()`/`hasPut()` methods to `Phalcon\Http\Request` ([680](https://github.com/phalcon/cphalcon/issues/680), [1403](https://github.com/phalcon/cphalcon/issues/1403))
  - Implemented `Phalcon\Http\Request\File::getRealType` ([1442](https://github.com/phalcon/cphalcon/issues/1442), [1444](https://github.com/phalcon/cphalcon/issues/1444))
- `Phalcon\Image`:
  - Added `Phalcon\Image\Adapter`, `Phalcon\Image\Adapter\Gd`, `Phalcon\Image\Adapter\Imagick` ([902](https://github.com/phalcon/cphalcon/issues/902), [1025](https://github.com/phalcon/cphalcon/issues/1025), [1030](https://github.com/phalcon/cphalcon/issues/1030), [1041](https://github.com/phalcon/cphalcon/issues/1041), [1050](https://github.com/phalcon/cphalcon/issues/1050), [1063](https://github.com/phalcon/cphalcon/issues/1063), [1076](https://github.com/phalcon/cphalcon/issues/1076), [1081](https://github.com/phalcon/cphalcon/issues/1081), [1114](https://github.com/phalcon/cphalcon/issues/1114), [1120](https://github.com/phalcon/cphalcon/issues/1120), [1158](https://github.com/phalcon/cphalcon/issues/1158), [1195](https://github.com/phalcon/cphalcon/issues/1195), [1206](https://github.com/phalcon/cphalcon/issues/1206), [1214](https://github.com/phalcon/cphalcon/issues/1214), [1370](https://github.com/phalcon/cphalcon/issues/1370))
- `Phalcon\Logger`:
  - Added FirePHP Log Adapter and Formatter ([845](https://github.com/phalcon/cphalcon/issues/845), [1333](https://github.com/phalcon/cphalcon/issues/1333))
  - Implemented `Phalcon\Logger\Adapter::isTransaction()` ([1238](https://github.com/phalcon/cphalcon/issues/1238))
  - Fixed a bug preventing the `EMERGENCY` log type from being displayed correctly ([1498](https://github.com/phalcon/cphalcon/issues/1498))
  - Added `Phalcon\Logger\Adapter\File::getPath()` ([1495](https://github.com/phalcon/cphalcon/issues/1495), [1508](https://github.com/phalcon/cphalcon/issues/1508))
- `Phalcon\Mvc`:
  - `Phalcon\Mvc\Application::handle()` now checks whether the class exists before include()'ing its file ([812](https://github.com/phalcon/cphalcon/issues/812), [818](https://github.com/phalcon/cphalcon/issues/818))
  - `Phalcon\Mvc\Model\Criteria::fromInput()` now sets` _modelName` ([866](https://github.com/phalcon/cphalcon/issues/816), [873](https://github.com/phalcon/cphalcon/issues/873))
  - `Phalcon\Mvc\Model\Query\Builder` may now use both integer and string placeholders ([701](https://github.com/phalcon/cphalcon/issues/701))
  - `Mvc\Model\getMessages()` is filterable now ([885](https://github.com/phalcon/cphalcon/issues/885))
  - Fixed hasManyToMany relation implementation ([938](https://github.com/phalcon/cphalcon/issues/938))
  - Fixed regular expression in `\Phalcon\Mvc\Model\Validator\Email` ([1243](https://github.com/phalcon/cphalcon/issues/1243))
  - `Phalcon\Mvc\Model::hasOne`/`hasMany`/`belongsTo`/`hasManyToMany`/`addBehavior()` are now public methods ([1166](https://github.com/phalcon/cphalcon/issues/1166))
  - Added `Phalcon\Mvc\Model\Row::toArray()` method ([1506](https://github.com/phalcon/cphalcon/issues/1506))
  - `Phalcon\Mvc\Model\Validator::getOption()` returns `NULL` if the option does not exist ([1530](https://github.com/phalcon/cphalcon/issues/1530))
  - Bug with a custom Events Manager in `Phalcon\Mvc\Models` ([1314](https://github.com/phalcon/cphalcon/issues/1314))
  - `Phalcon\Mvc\Model\Query\Builder::__construct()` does not ignore joins anymore ([1327](https://github.com/phalcon/cphalcon/issues/1327))
  - Fixed `HAVING` handling in `Phalcon\Mvc\Model\Query\Builder` ([1396](https://github.com/phalcon/cphalcon/issues/1396))
  - Micro Collections return `Phalcon\Mvc\Micro\CollectionInterface` ([1130](https://github.com/phalcon/cphalcon/issues/1130))
  - `Phalcon\Mvc\Url::get()` can append query params ([723](https://github.com/phalcon/cphalcon/issues/723), [877](https://github.com/phalcon/cphalcon/issues/877))
  - Regular Expression Optimization for `Phalcon\Mvc\Router` ([977](https://github.com/phalcon/cphalcon/issues/977))
  - PHQL: added placeholders support to `LIMIT` ([1023](https://github.com/phalcon/cphalcon/issues/1023))
  - Added `Phalcon\Mvc\Router::getDefautXXX()` methods ([1087](https://github.com/phalcon/cphalcon/issues/1087))
  - Allow `HAVING` without `GROUP BY` in query builder ([1115](https://github.com/phalcon/cphalcon/issues/1115))
  - mvc/model/query.c optimizations ([1129](https://github.com/phalcon/cphalcon/issues/1129), [1132](https://github.com/phalcon/cphalcon/issues/1132))
  - Added support for array(limit, offset]) as a 'limit' constructor key in Query Builder ([1208](https://github.com/phalcon/cphalcon/issues/1208))
  - Added support for 'conditions' in `Phalcon\Mvc\Model\Query\Builder::__construct()` ([1236](https://github.com/phalcon/cphalcon/issues/1236))
  - Added `Phalcon\Mvc\View::isDisabled()`, `Phalcon\Mvc\View::getRenderLevel()`, `Phalcon\Mvc\View::getDisabledLevels()` ([907](https://github.com/phalcon/cphalcon/issues/907), [1320](https://github.com/phalcon/cphalcon/issues/1320))
  - Added `Phalcon\Mvc\View::getCurrentRenderLevel()` ([907](https://github.com/phalcon/cphalcon/issues/907), [1326](https://github.com/phalcon/cphalcon/issues/1326))
  - Bug fix in `Phalcon\Mvc\Model\Resultset\Simple::toArray()` ([1377](https://github.com/phalcon/cphalcon/issues/1377))
  - Bug fixes in Volt compiler ([1387](https://github.com/phalcon/cphalcon/issues/1387))
  - `Phalcon\Mvc\Model\Query\Builder` optimizations ([1414](https://github.com/phalcon/cphalcon/issues/1414))
  - Allow to set dirs without trailing slashes in `Phalcon\Mvc\View` ([406](https://github.com/phalcon/cphalcon/issues/406), [1440](https://github.com/phalcon/cphalcon/issues/1440))
  - `Phalcon\Mvc\Model\Validator::getOption()` returns null if option does not exists ([1531](https://github.com/phalcon/cphalcon/issues/1531))
  - Added `Phalcon\Mvc\Model::selectWriteConnection()` ([1519](https://github.com/phalcon/cphalcon/issues/1519))
  - Added `Phalcon\Mvc\Router\Group::convert()`/`getConverters()` ([1555](https://github.com/phalcon/cphalcon/issues/1555), [1572](https://github.com/phalcon/cphalcon/issues/1572))
  - Faster `Phalcon\Mvc\Model\Row` ([1606](https://github.com/phalcon/cphalcon/issues/1606))
- `Phalcon\Flash`:
  - `Phalcon\Flash\Session::getMessage('key')` returns now an empty array if the key is not found ([908](https://github.com/phalcon/cphalcon/issues/908), [920](https://github.com/phalcon/cphalcon/issues/920))
  - `Phalcon\Flash\Session::getMessages()` incorrectly removed all messages ([1575](https://github.com/phalcon/cphalcon/issues/1575))
  - Implemented `Phalcon\Flash\Session::isset()` ([1342](https://github.com/phalcon/cphalcon/issues/1342))
- `Phalcon\Paginator`:
  - `Phalcon\Paginator\Adapter\Model` returns correct results even when page number is incorrect ([1654](https://github.com/phalcon/cphalcon/issues/1654))
  - Optimized `Phalcon\Paginator\Adapter\QueryBuilder` ([1632](https://github.com/phalcon/cphalcon/issues/1632))
  - `setCurrentPage()` returns $this for all adapters ([1633](https://github.com/phalcon/cphalcon/issues/1633))
  - Optimized `Phalcon\Paginator\Adapter\NativeArray` ([1653](https://github.com/phalcon/cphalcon/issues/1653))
- `Phalcon\Queue`:
  - Fixed bug in `Phalcon\Queue\Beanstalk::read()` ([1348](https://github.com/phalcon/cphalcon/issues/1348), [1612](https://github.com/phalcon/cphalcon/issues/1612))
  - Bug fixes in beanstalkd protocol implementation
  - Optimizations ([1621](https://github.com/phalcon/cphalcon/issues/1621))
- `Phalcon\Security`:
  - `Phalcon\Security\Exception` inherits from `Phalcon\Exception`, not from `\Phalcon\DI\Exception`
  - Added `Phalcon\Security::computeHmac()` (
    [1347](https://github.com/phalcon/cphalcon/issues/1347))
  - Bug fixes ([1347](https://github.com/phalcon/cphalcon/issues/1347))
- `Phalcon\Session`:
  - Fix `Phalcon\Session\Bag::remove()` ([1637](https://github.com/phalcon/cphalcon/issues/1637))
  - `Phalcon\Session\Adapter::get()` may optionally remove the data from session ([1358](https://github.com/phalcon/cphalcon/issues/1358))
- `Phalcon\Tag`:
  - Fixed bugs ([903](https://github.com/phalcon/cphalcon/issues/903))
  - Fixed radio button generation ([947](https://github.com/phalcon/cphalcon/issues/947))
  - Fixed inconsistent behavior of `setAutoescape()` ([1263](https://github.com/phalcon/cphalcon/issues/1263))
  - Added missing HTML5 input types ([824](https://github.com/phalcon/cphalcon/issues/824), [1323](https://github.com/phalcon/cphalcon/issues/1323))
  - Added `Phalcon\Tag::setTitleSeparator()` ([1365](https://github.com/phalcon/cphalcon/issues/1365))
  - Added support for  ([1422](https://github.com/phalcon/cphalcon/issues/1422))
  - Fixed inconsistency in `Tag::stylesheetLink`/`javascriptInclude` w.r.t. local URLs ([1486](https://github.com/phalcon/cphalcon/issues/1486))
- `Phalcon\Validation`:
  - Added support for error codes ([1171](https://github.com/phalcon/cphalcon/issues/1171))
  - Bug fixes ([1399](https://github.com/phalcon/cphalcon/issues/1399))
  - Optimized `Phalcon\Validation\Message\Group` by using native iterators ([1657](https://github.com/phalcon/cphalcon/issues/1657))
- Unit tests:
  - Travis CI improvements ([819](https://github.com/phalcon/cphalcon/issues/819), [846](https://github.com/phalcon/cphalcon/issues/846), [949](https://github.com/phalcon/cphalcon/issues/949))
  - Use markTestSkipped(]) instead of echo ([862](https://github.com/phalcon/cphalcon/issues/862))
  - Do not run APC tests under CLI when apc.enable_cli is 0 
  - Added new tests ([865](https://github.com/phalcon/cphalcon/issues/865), [1256](https://github.com/phalcon/cphalcon/issues/1256), [1260](https://github.com/phalcon/cphalcon/issues/1260), [1339](https://github.com/phalcon/cphalcon/issues/1339), [1560](https://github.com/phalcon/cphalcon/issues/1560), [1563](https://github.com/phalcon/cphalcon/issues/1563))
  - Skip database tests when the DBMS is not available ([970](https://github.com/phalcon/cphalcon/issues/970))
  - Support for optional RVO ([1147](https://github.com/phalcon/cphalcon/issues/1147))
  - Added support for test coverage visualization ([1307](https://github.com/phalcon/cphalcon/issues/1307), [1361](https://github.com/phalcon/cphalcon/issues/1361))
  - Bug fixes in tests ([1313](https://github.com/phalcon/cphalcon/issues/1313), [1334](https://github.com/phalcon/cphalcon/issues/1334), [1335](https://github.com/phalcon/cphalcon/issues/1335), 1449, [1467](https://github.com/phalcon/cphalcon/issues/1467))
- Documentation bug fixes ([1069](https://github.com/phalcon/cphalcon/issues/1069), [1070](https://github.com/phalcon/cphalcon/issues/1070), [1072](https://github.com/phalcon/cphalcon/issues/1072), [1145](https://github.com/phalcon/cphalcon/issues/1145), [1146](https://github.com/phalcon/cphalcon/issues/1146), [1205](https://github.com/phalcon/cphalcon/issues/1205), [1372](https://github.com/phalcon/cphalcon/issues/1372), [1397](https://github.com/phalcon/cphalcon/issues/1397), [1521](https://github.com/phalcon/cphalcon/issues/1521), [1523](https://github.com/phalcon/cphalcon/issues/1523), [1586](https://github.com/phalcon/cphalcon/issues/1586), lots of them])
- Refactored, improved and optimized build script ([1218](https://github.com/phalcon/cphalcon/issues/1218))
- Other bug fixes ([1051](https://github.com/phalcon/cphalcon/issues/1051), [1131](https://github.com/phalcon/cphalcon/issues/1131), [1040](https://github.com/phalcon/cphalcon/issues/1040), [1275](https://github.com/phalcon/cphalcon/issues/1275), [1392](https://github.com/phalcon/cphalcon/issues/1392), [1396](https://github.com/phalcon/cphalcon/issues/1396), [1399](https://github.com/phalcon/cphalcon/issues/1399), 1425, 1426...)

Help with Testing
-----------------
This version can be installed from the 1.3.0 branch:

```sh
git clone https://github.com/phalcon/cphalcon
cd build
git checkout 1.3.0
sudo ./install
```

We welcome your comments regarding this new release. If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.

Thanks!
