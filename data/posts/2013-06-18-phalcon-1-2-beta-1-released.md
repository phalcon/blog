We are happy to announce the release of our first beta of Phalcon 1.2​!

In this version we have introduced several new features and performance improvements. The intend of this beta release is get input from the community, test the new functionality making sure everything works fine once production environments are updated to 1.2.

This post is extensive but we have a lot of new features, so bare with us!

### Dynamic compile path in Volt
Now `compiledPath` option in [Volt](https://docs.phalconphp.com/en/latest/reference/volt.html) accepts a closure allowing the developer to dynamically create the compilation path for templates:

```php
// Just append the .php extension to the template path
$volt->setOptions(
    [
        'compiledPath' => function ($templatePath) {      
            return $templatePath . '.php';
        }
    ]
);

// ​ ​Recursively create the same structure in another directory
$volt->setOptions(
    [
        'compiledPath' => function ($templatePath) {
               $dirName = dirname($templatePath);
               if (!is_dir(CACHE_DIR . $dirName)) {
                      mkdir(CACHE_DIR . $dirName);
               }
               return CACHE_DIR . $dirName . '/'. $templatePath . '.php';
        }
    ]
);
```

### Volt extensions
With extensions the developer has more flexibility to extend the template engine, and override the compilation of a​ specific instruction, change the behavior of an expression or operator, add functions/filters, and more. The class below allows to use any PHP function in [Volt](https://docs.phalconphp.com/en/latest/reference/volt.html):

```php
class PhpFunctionExtension
{
    public function compileFunction($name, $arguments)
    {
          if (function_exists($name)) {
              return $name . '('. $arguments . ')';
          }          
    }
}
```

Load the extension in Volt:

```php
$volt->getCompiler()->addExtension(new PHPFunctionExtension());
```

### `Phalcon\Mvc\Url` static/dynamic paths
With this separation ​the developer can change the base uri for static resources and define a different one for dynamic resources. This is particularly handy if a CDN or a different domain serving static resources​ are used:

```php
$di['url'] = function () {
    $url = new Phalcon\Mvc\Url();

    // ​ ​Dynamic URIs without mod-rewrite
    $url->setBaseUri('/index.php?_url=');

    // ​ ​Static URI for CSS/Javascript/Images
    $url->setStaticUri('/static/');

    return $url;
};
```

### `Phalcon\Mvc\View\Simple`
This component is an alternative component similar to `Phalcon\Mvc\View` but lacks of a render hierarchy. It is particularly useful for [micro applications](https://docs.phalconphp.com/en/latest/reference/micro.html) or obtaining​ the content of an arbitrary view as an string. Due to the lack of the rendering hierarchy it's more suitable to be used together with the [template inheritance](https://docs.phalconphp.com/en/latest/reference/volt.html#template-inheritance) provided by Volt.

```php
//  ​View service
$di['view'] = function () {

    $view = new Phalcon\Mvc\View\Simple();

    $view->setViewsDir(APP_PATH . '/views/');

    return $view;
};
```

Using in micro-apps:

```php
$app->map('/login', function () use ($app) {

    echo $app->view->render('security/login', array(
        'form' => new LoginForm(),       
    ));

});
```

It supports multiple render engines and also have automatic caching capabilities.

### Improved support for JSON
Now it's easier get input as JSON and return responses in the same format. ​Returned instances of [Phalcon\Http\Response](https://docs.phalconphp.com/en/latest/reference/response.html) in micro applications are automatically sent by the application:

```php
$app->post(
    '/api/robots', 
    function () use ($app) {

        $data = $app->request->getJsonRawBody();
    
        $robot       = new Robots();
        $robot->name = $data->name;
        $robot->type = $data->type;        
    
        $response = new Phalcon\Http\Response();
    
        // Check if the insertion was successful
        if ($robot->success() == true) {
    
            $response->setJsonContent(
                [
                    'status' => 'OK', 
                    'id'     => $robot->id
                ]
            );
    
        } else {
    
            // Change the HTTP status
            $response->setStatusCode(500, "Internal Error");
    
            $response->setJsonContent(
                [
                    'status'   => 'ERROR', 
                    'messages' => $status->getMessages()
                ]
            );
    
        }
    
        return $response;
    }
);
```

### Support for Many-To-Many in the ORM
Finally Many-to-Many relations are supported in the [ORM](https://docs.phalconphp.com/en/latest/reference/models.html)! Direct relationships between two models using an intermediate model can now be defined:

```php
class Artists extends Phalcon\Mvc\Model
{
    public $id;

    public $name;

    public function initialize()
    {
        $this->hasManyToMany(
            'id', 
            'ArtistsSongs', 
            'artists_id', 'songs_id', 
            'Songs', 
            'id'
        );
    }
}
```

​The songs from an artist can be retrieved by accessing the relationship alias:

```php
$artist = Artists::findFirst();

// Get all artist's songs
foreach ($artist->songs as $song) {
    echo $song->name;
}
```

Many-to-Many relations can be joined in PHQL:

```php
$phql   = 'SELECT Artists.name, Songs.name '
        . 'FROM Artists '
        . 'JOIN Songs '
        . 'WHERE Artists.genre = "Trip-Hop"';
$result = $this->modelsManager->query($phql);
```

Many-to-Many related instances can be directly added to a model, the intermediate instances are automatically created in the sav​e process:

```php
$songs = array()

$song       = new Song();
$song->name = 'Get Lucky';
$songs[]    = $song;

$song       = new Song();
$song->name = 'Instant Crush';
$songs[]    = $song;

$artist        = new Artists();
$artist->name  = 'Daft Punk';
$artist->songs = $songs; // Assign the n-m relation
$artist->save();
```

### Cascade/Restrict actions in Virtual Foreign Keys

​[Virtual foreign keys](https://docs.phalconphp.com/en/latest/reference/models.html#virtual-foreign-keys) can ​now be set up to delete all the referenced records if the master record is deleted:

```php
use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Relation;

class Artists extends Model
{
    public $id;

    public $name;

    public function initialize()
    {
        $this->hasMany(
            'id', 
            'Songs', 
            'artists_id', 
            [
                'foreignKey' => [
                    'action' => Relation::ACTION_CASCADE 
                ]
            ]
        );
    }
}
```

When a record in Artists is deleted all the related songs are deleted too:

```php
$artist = Artists::findFirst();

$artist->delete(); // Deleting also its songs
```

### Assets Minification
[Phalcon\Assets](https://docs.phalconphp.com/en/latest/reference/assets.html) provides built-in minification of Javascript and CSS resources. The developer can create a collection of resources instructing the Assets Manager which ones must be filtered and which ones must be​left as they are. In addition to the above, [Jsmin](https://github.com/douglascrockford/JSMin/blob/master/jsmin.c) by Douglas Crockford is now part of the extension offering minification of javascript files for maximum performance. In the CSS land, [CSSMin](https://github.com/soldair/cssmin/blob/master/cssmin.c) by Ryan Day is also available to minify css files.

```php
$manager = new Phalcon\Assets\Manager(
    [
        'sourceBasePath' => './js/',
        'targetBasePath' => './js/production/'
    ]
);

$manager

    // These Javascripts are located in the page's bottom
    ->collection('jsFooter')

    // The name of the final output
    ->setTargetPath('final.js')

    // The script tag is generated with this URI
    ->setTargetUri('production/final.js')

    // This a remote resource that does not need filtering
    ->addJs('code.jquery.com/jquery-1.10.0.min.js', true, false)

    // These are local resources that must be filtered
    ->addJs('common-functions.js')
    ->addJs('page-functions.js')

    // Join all the resources in a single file
    ->join(true)

    // Use the built-in Jsmin filter
    ->addFilter(new Phalcon\Assets\Filters\Jsmin())

    // Use a custom filter
    ->addFilter(new MyApp\Assets\Filters\LicenseStamper());

$manager->outputJs();
```

This component still needs a bit more of work​,​ adding caching, versioning and detection ​of changes to reduce processing. These changes will be available in the next beta.

### Disallow literals in PHQL
[PHQL](https://docs.phalconphp.com/en/latest/reference/phql.html) provides a set of features that aids the developer to secure his/her applications. Comparing to straight SQL, PHQL now has a new feature that increases even more security, thus avoiding a large number of potential [SQL injection](http://en.wikipedia.org/wiki/SQL_injection) scenarios. The developer can now disable literals in PHQL. This means that directly using strings, numbers and boolean values in PHQL strings will be disallowed. If by mistake a developer​ writes:

```php
$artist = Artists::findFirst("name = '$name'");
```

An exception will be thrown forcing the developer to use bound parameters.

### Own Scope for Partials
​A developer can now pass an array of variables to a [partial](https://docs.phalconphp.com/en/latest/reference/views.html#using-partials) that only exists in the scope of the partial:

```php
<?php $this->partial('footer', ['links' => $myLinks]);
```

In Volt:

```php
{{ partial('footer', ['links': myLinks]) }}
{% include 'footer' with ['links': myLinks] %}
```

### Use `Phalcon\Tag` as Service

`Phalcon\Tag` is now a service in `DI\FactoryDefault`​. So instead of doing this:

```php
Phalcon\Tag::setDefault('name', $robot->name);
```

You can ​do one better and write:

```php
$this->tag->setDefault('name', $robot->name);
```

From now both syntax's are supported, but in further releases, the former will be deprecated. ​ There will be ample time for developers to migrate their applications to the new format. Using `Phalcon\Tag` as a service allow​s the developer to extend the component without affecting application stability.

### Macros in Volt
Initial support for macros in Volt is implemented in this version:

```php
{%- macro input_text(name, attributes=null) -%}
   {{- '<input type="' ~ name ~ '" ' -}}
   {%- for key, value in attributes -%}
       {{- key ~ '="' ~ value|e '"' -}}
   {%- endfor -%}
   {{- '/>' -}}
{%- endmacro -%}

{{ input_text("telephone", ['placeholder': 'Type telephone']) }}
```

### `BadMethodCallException` instead of warnings
Before 1.1.0 if a wrong number of parameters was passed to a method a warning was raised. Starting from 1.2.0 `BadMethodCallException` exceptions will be thrown so you can see a complete trace ​ where the problem is generated.

```php
$e = new Phalcon\Escaper();
$e->escapeCss('a {}', 1, 2, 3);
```

Shows:

```php
Fatal error: Uncaught exception 'BadMethodCallException' with message 
'Wrong number of parameters' in test.php:4
Stack trace:
#0 test.php(4): Phalcon\Escaper->escapeCss('a {}', 1, 2, 3)
#1 {main}
```

### Debug Component
`Phalcon\Debug` ​offers the call stack to the developer, with a pretty presentation format. This helps with debugging and identifying errors.

To use this component just remove any try/catch from your bootstrap. Add the following at the beginning of ​your script:

```php
(new Phalcon\Debug)->listen();
```

A backtrace like this is showed when an exception is generated:

1.2.0 includes other minor changes, bug fixes, stability and performance improvements.​ The complete [CHANGELOG](https://github.com/phalcon/cphalcon/blob/1.2.0/CHANGELOG)​ is​ here.

### Help with Testing
This version can be installed from the 1.2.0 branch:

```sh
git clone http://github.com/phalcon/cphalcon
cd build
git checkout 1.2.0
sudo ./install
```

Windows users can download a DLL from the [download page](https://phalconphp.com/download).

We welcome your comments regarding this new release in [Phosphorum](https://forum.phalconphp.com/) and [Stack Overflow](http://stackoverflow.com/questions/tagged/phalcon). If you discover any bugs, please (if possible) create a failing test and submit a pull request, alongside with an issue on Github.

Thanks!


<3 The Phalcon Team
