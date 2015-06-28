<!--
slug: tutorial-creating-a-blameable-behavior-with
date: Wed Apr 10 2013 18:52:00 GMT-0400 (EDT)
tags: php, tutorial, phalcon
title: Tutorial: Creating a Blameable behavior with Phalcon
id: 47652831003
link: http://blog.phalconphp.com/post/47652831003/tutorial-creating-a-blameable-behavior-with
raw: {"blog_name":"phalconphp","id":47652831003,"post_url":"http://blog.phalconphp.com/post/47652831003/tutorial-creating-a-blameable-behavior-with","slug":"tutorial-creating-a-blameable-behavior-with","type":"text","date":"2013-04-10 22:52:00 GMT","timestamp":1365634320,"state":"published","format":"html","reblog_key":"5cY44ptv","tags":["php","tutorial","phalcon"],"short_url":"http://tmblr.co/Z6PumviOL7yR","highlighted":[],"note_count":3,"title":"Tutorial: Creating a Blameable behavior with Phalcon","body":"<p>In this tutorial, we&rsquo;re going to explain how to create a behavior for the Phalcon&rsquo;s ORM. Its goal is keep track of data changed by users on specific models. This behavior is often known as Blameable.</p>\n<p>A model in Phalcon triggers specific events when operations like create/update/delete are performed. These events help us to insert hook points extending the functionality according to our business needs.</p>\n<p>In our example, we&rsquo;re especially interested in tracking what records a user creates and what fields he/she changes.</p>\n<p>Checking the list of events triggered by a model, the most appropiate to insert this logic are &lsquo;afterCreate&rsquo; and 'afterUpdate&rsquo;. These are executed after the creating and updating operations respectively.</p>\n<h3>Why behaviors?</h3>\n<p>The simpler way to add logic to these events is implement them as methods in the model:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass Products extends Phalcon\\Mvc\\Model\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>However, if we want to reuse that logic across several models, we could use other better alternatives. We can create a base class that implements these methods then use it as base class in the required models:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass BlameableModel extends Phalcon\\Mvc\\Model\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>Then in the model:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends BlameableModel\n{\n\n}\n</pre>\n<p>This approach is very simple too, but it has some disadvantages, a class only can inherit one class at the same time, so if we want to implement more behaviors this strategy could limit us.</p>\n<p>Recently in PHP 5.4, Traits were introduced allowing us to reuse method across classes without explicitly set a class inheritance. In our case a trait that fits our purposes looks like this:</p>\n<pre class=\"sh_php sh_sourceCode\">trait Blameable\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>Then in then model:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\n{\n    use Blameable;\n}\n</pre>\n<p>This way also has limitations; you can&rsquo;t add more than one trait that has implemented the same methods because it produces collisions. Although such collisions can be resolved, we must choose which implementation to use.</p>\n<p>Phalcon provides <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#behaviors\">behavior management</a>, allowing us to add several behaviors to the same model that implements the same events. A behavior can be easily added to a model in the following way:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\n{\n    public function initialize()\n    {\n        $this-&gt;addBehavior(new MyBehavior());\n    }\n}\n</pre>\n<p>A behavior can respond to events produced by a model, our behavior &ldquo;Blameable&rdquo; initially looks like:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Mvc\\ModelInterface,\n    Phalcon\\Mvc\\Model\\Behavior,\n    Phalcon\\Mvc\\Model\\BehaviorInterface;\n\nclass Blameable extends Behavior implements BehaviorInterface\n{\n\n    /**\n     * Receives notifications from the Models Manager\n     *\n     * @param string $eventType\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     */\n    public function notify($eventType, $model)\n    {\n        // ...\n    }\n}\n</pre>\n<p>It simply implements a method called &ldquo;notify&rdquo;, this method receives two parameters: the event name triggered by the models manager and the model that produced the event. As mentioned before, we&rsquo;re only interested in 'afterCreate&rsquo; and 'afterUpdate&rsquo;:</p>\n<pre class=\"sh_php sh_sourceCode\">/**\n * Receives notifications from the Models Manager\n *\n * @param string $eventType\n * @param Phalcon\\Mvc\\ModelInterface $model\n */\npublic function notify($eventType, $model)\n{\n    if ($eventType == 'afterCreate') {\n        //...\n    }\n    if ($eventType == 'afterUpdate') {\n        //...\n    }\n}\n</pre>\n<p>Now, returning to our idea, we&rsquo;re going to store the information about creating/updating operations in the following additional tables:</p>\n<pre class=\"sh_sql sh_sourceCode\">CREATE TABLE audit (\n    id integer primary key auto_increment,\n    user_name varchar(32) not null,\n    model_name varchar(32) not null,\n    ipaddress char(15) not null,\n    type char(1) not null, /* C=Create/U=Update */\n    created_at datetime not null\n);\n\nCREATE TABLE audit_detail (\n    id integer primary key auto_increment,\n    audit_id integer not null,\n    field_name varchar(32) not null,\n    old_value varchar(32),\n    new_value varchar(32) not null\n)\n</pre>\n<p>The respective models are:</p>\n<pre class=\"sh_php sh_sourceCode\">class Audit extends \\Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this-&gt;hasMany('id', 'AuditDetail', 'audit_id', array(\n            'alias' =&gt; 'details'\n        ));\n    }\n\n}\n\nclass AuditDetail extends \\Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this-&gt;belongsTo('audit_id', 'Audit', 'id');\n    }\n\n}\n</pre>\n<p>&ldquo;Audit&rdquo; stores general information about the operation, while &ldquo;AuditDetail&rdquo; stores every new value or every changed value. You can easily adapt this structure to other approaches.</p>\n<p>Let&rsquo;s focus on the event &ldquo;after updating&rdquo;, since it represents an interesting challenge. We&rsquo;re interested in tracking only those fields that changed with respect to original data in the record.</p>\n<p>To achieve this, we must set up our model to store a snapshot of the original record so that we can compare it with the new and know their changes.</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass Products extends Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this-&gt;keepSnapshots(true);\n    }\n\n}\n</pre>\n<p>Now we have everything we need to complete the behavior.</p>\n<pre class=\"sh_php sh_sourceCode\">public function notify($eventType, $model)\n{\n    //Fires 'logAfterUpdate' if the event is 'afterUpdate'\n    if ($eventType == 'afterUpdate') {\n        return $this-&gt;auditAfterUpdate($model);\n    }\n}\n</pre>\n<p>The method 'auditAfterUpdate&rsquo; receives the model, creates a new &ldquo;Audit&rdquo; together with its detail:</p>\n<pre class=\"sh_php sh_sourceCode\">public function auditAfterUpdate(ModelInterface $model)\n{\n\n    //Get the name of the fields that have changed\n    $changedFields = $model-&gt;getChangedFields();\n    if (count($changedFields)) {\n\n        //Create a new audit\n        $audit = new Audit();\n\n        //Get the session service\n        $session = $model-&gt;getDI()-&gt;getSession();\n\n        //Get the request service\n        $request = $model-&gt;getDI()-&gt;getRequest();\n\n        //Get the username from session\n        $audit-&gt;user_name = $session-&gt;get('userName');\n\n        //The model who performed the action\n        $audit-&gt;model_name = get_class($model);\n\n        //The client IP address\n        $audit-&gt;ipaddress = $request-&gt;getClientAddress();\n\n        //Action is an update\n        $audit-&gt;type = $type;\n\n        //Current datetime\n        $audit-&gt;created_at = date('Y-m-d H:i:s');\n\n        //Get the original data before modification\n        $originalData = $model-&gt;getSnapshotData();\n\n        $details = array();\n        foreach ($changedFields as $field) {\n\n            $auditDetail = new AuditDetail();\n\n            $auditDetail-&gt;field_name = $field;\n            $auditDetail-&gt;old_value = $originalData[$field];\n            $auditDetail-&gt;new_value = $model-&gt;$field;\n\n            $details[] = $auditDetail;\n        }\n\n        $audit-&gt;details = $details;\n\n        return $audit-&gt;save();\n    }\n\n    return null;\n}\n</pre>\n<p>Check out the complete source of the behavior on the <a href=\"https://github.com/phalcon/incubator/tree/master/Library/Phalcon/Mvc/Model/Behavior\">Incubator</a>.</p>\n<h3>Conclusion</h3>\n<p>This example will help you understand how the behaviors in the ORM, as information about the fields that have been changed with respect to the original data and code reuse accessing global services application.</p>","reblog":{"tree_html":"","comment":"<p>In this tutorial, we&rsquo;re going to explain how to create a behavior for the Phalcon&rsquo;s ORM. Its goal is keep track of data changed by users on specific models. This behavior is often known as Blameable.</p>\n<p>A model in Phalcon triggers specific events when operations like create/update/delete are performed. These events help us to insert hook points extending the functionality according to our business needs.</p>\n<p>In our example, we&rsquo;re especially interested in tracking what records a user creates and what fields he/she changes.</p>\n<p>Checking the list of events triggered by a model, the most appropiate to insert this logic are &lsquo;afterCreate&rsquo; and 'afterUpdate&rsquo;. These are executed after the creating and updating operations respectively.</p>\n<h3>Why behaviors?</h3>\n<p>The simpler way to add logic to these events is implement them as methods in the model:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass Products extends Phalcon\\Mvc\\Model\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>However, if we want to reuse that logic across several models, we could use other better alternatives. We can create a base class that implements these methods then use it as base class in the required models:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass BlameableModel extends Phalcon\\Mvc\\Model\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>Then in the model:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends BlameableModel\n{\n\n}\n</pre>\n<p>This approach is very simple too, but it has some disadvantages, a class only can inherit one class at the same time, so if we want to implement more behaviors this strategy could limit us.</p>\n<p>Recently in PHP 5.4, Traits were introduced allowing us to reuse method across classes without explicitly set a class inheritance. In our case a trait that fits our purposes looks like this:</p>\n<pre class=\"sh_php sh_sourceCode\">trait Blameable\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>Then in then model:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\n{\n    use Blameable;\n}\n</pre>\n<p>This way also has limitations; you can&rsquo;t add more than one trait that has implemented the same methods because it produces collisions. Although such collisions can be resolved, we must choose which implementation to use.</p>\n<p>Phalcon provides <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#behaviors\">behavior management</a>, allowing us to add several behaviors to the same model that implements the same events. A behavior can be easily added to a model in the following way:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\n{\n    public function initialize()\n    {\n        $this-&gt;addBehavior(new MyBehavior());\n    }\n}\n</pre>\n<p>A behavior can respond to events produced by a model, our behavior &ldquo;Blameable&rdquo; initially looks like:</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nuse Phalcon\\Mvc\\ModelInterface,\n    Phalcon\\Mvc\\Model\\Behavior,\n    Phalcon\\Mvc\\Model\\BehaviorInterface;\n\nclass Blameable extends Behavior implements BehaviorInterface\n{\n\n    /**\n     * Receives notifications from the Models Manager\n     *\n     * @param string $eventType\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     */\n    public function notify($eventType, $model)\n    {\n        // ...\n    }\n}\n</pre>\n<p>It simply implements a method called &ldquo;notify&rdquo;, this method receives two parameters: the event name triggered by the models manager and the model that produced the event. As mentioned before, we&rsquo;re only interested in 'afterCreate&rsquo; and 'afterUpdate&rsquo;:</p>\n<pre class=\"sh_php sh_sourceCode\">/**\n * Receives notifications from the Models Manager\n *\n * @param string $eventType\n * @param Phalcon\\Mvc\\ModelInterface $model\n */\npublic function notify($eventType, $model)\n{\n    if ($eventType == 'afterCreate') {\n        //...\n    }\n    if ($eventType == 'afterUpdate') {\n        //...\n    }\n}\n</pre>\n<p>Now, returning to our idea, we&rsquo;re going to store the information about creating/updating operations in the following additional tables:</p>\n<pre class=\"sh_sql sh_sourceCode\">CREATE TABLE audit (\n    id integer primary key auto_increment,\n    user_name varchar(32) not null,\n    model_name varchar(32) not null,\n    ipaddress char(15) not null,\n    type char(1) not null, /* C=Create/U=Update */\n    created_at datetime not null\n);\n\nCREATE TABLE audit_detail (\n    id integer primary key auto_increment,\n    audit_id integer not null,\n    field_name varchar(32) not null,\n    old_value varchar(32),\n    new_value varchar(32) not null\n)\n</pre>\n<p>The respective models are:</p>\n<pre class=\"sh_php sh_sourceCode\">class Audit extends \\Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this-&gt;hasMany('id', 'AuditDetail', 'audit_id', array(\n            'alias' =&gt; 'details'\n        ));\n    }\n\n}\n\nclass AuditDetail extends \\Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this-&gt;belongsTo('audit_id', 'Audit', 'id');\n    }\n\n}\n</pre>\n<p>&ldquo;Audit&rdquo; stores general information about the operation, while &ldquo;AuditDetail&rdquo; stores every new value or every changed value. You can easily adapt this structure to other approaches.</p>\n<p>Let&rsquo;s focus on the event &ldquo;after updating&rdquo;, since it represents an interesting challenge. We&rsquo;re interested in tracking only those fields that changed with respect to original data in the record.</p>\n<p>To achieve this, we must set up our model to store a snapshot of the original record so that we can compare it with the new and know their changes.</p>\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\n\nclass Products extends Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this-&gt;keepSnapshots(true);\n    }\n\n}\n</pre>\n<p>Now we have everything we need to complete the behavior.</p>\n<pre class=\"sh_php sh_sourceCode\">public function notify($eventType, $model)\n{\n    //Fires 'logAfterUpdate' if the event is 'afterUpdate'\n    if ($eventType == 'afterUpdate') {\n        return $this-&gt;auditAfterUpdate($model);\n    }\n}\n</pre>\n<p>The method 'auditAfterUpdate&rsquo; receives the model, creates a new &ldquo;Audit&rdquo; together with its detail:</p>\n<pre class=\"sh_php sh_sourceCode\">public function auditAfterUpdate(ModelInterface $model)\n{\n\n    //Get the name of the fields that have changed\n    $changedFields = $model-&gt;getChangedFields();\n    if (count($changedFields)) {\n\n        //Create a new audit\n        $audit = new Audit();\n\n        //Get the session service\n        $session = $model-&gt;getDI()-&gt;getSession();\n\n        //Get the request service\n        $request = $model-&gt;getDI()-&gt;getRequest();\n\n        //Get the username from session\n        $audit-&gt;user_name = $session-&gt;get('userName');\n\n        //The model who performed the action\n        $audit-&gt;model_name = get_class($model);\n\n        //The client IP address\n        $audit-&gt;ipaddress = $request-&gt;getClientAddress();\n\n        //Action is an update\n        $audit-&gt;type = $type;\n\n        //Current datetime\n        $audit-&gt;created_at = date('Y-m-d H:i:s');\n\n        //Get the original data before modification\n        $originalData = $model-&gt;getSnapshotData();\n\n        $details = array();\n        foreach ($changedFields as $field) {\n\n            $auditDetail = new AuditDetail();\n\n            $auditDetail-&gt;field_name = $field;\n            $auditDetail-&gt;old_value = $originalData[$field];\n            $auditDetail-&gt;new_value = $model-&gt;$field;\n\n            $details[] = $auditDetail;\n        }\n\n        $audit-&gt;details = $details;\n\n        return $audit-&gt;save();\n    }\n\n    return null;\n}\n</pre>\n<p>Check out the complete source of the behavior on the <a href=\"https://github.com/phalcon/incubator/tree/master/Library/Phalcon/Mvc/Model/Behavior\">Incubator</a>.</p>\n<h3>Conclusion</h3>\n<p>This example will help you understand how the behaviors in the ORM, as information about the fields that have been changed with respect to the original data and code reuse accessing global services application.</p>"},"trail":[{"blog":{"name":"phalconphp","theme":{"header_full_width":1117,"header_full_height":426,"header_focus_width":758,"header_focus_height":426,"avatar_shape":"square","background_color":"#FAFAFA","body_font":"Helvetica Neue","header_bounds":"0,937,426,179","header_image":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs.jpg","header_image_focused":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/laHnn0qo9/tumblr_static_tumblr_static_28z87js742xwowwo0kco04ogs_focused_v3.jpg","header_image_scaled":"http://static.tumblr.com/be2b0380984b972b47699d457f4c0ffb/ivjir8a/815nn0qo7/tumblr_static_28z87js742xwowwo0kco04ogs_2048_v2.jpg","header_stretch":true,"link_color":"#529ECC","show_avatar":true,"show_description":true,"show_header_image":true,"show_title":true,"title_color":"#444444","title_font":"Gibson","title_font_weight":"bold"}},"post":{"id":"47652831003"},"content":"<p>In this tutorial, we’re going to explain how to create a behavior for the Phalcon’s ORM. Its goal is keep track of data changed by users on specific models. This behavior is often known as Blameable.</p>\n<p>A model in Phalcon triggers specific events when operations like create/update/delete are performed. These events help us to insert hook points extending the functionality according to our business needs.</p>\n<p>In our example, we’re especially interested in tracking what records a user creates and what fields he/she changes.</p>\n<p>Checking the list of events triggered by a model, the most appropiate to insert this logic are ‘afterCreate’ and 'afterUpdate’. These are executed after the creating and updating operations respectively.</p>\n<h3>Why behaviors?</h3>\n<p>The simpler way to add logic to these events is implement them as methods in the model:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nclass Products extends Phalcon\\Mvc\\Model\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>However, if we want to reuse that logic across several models, we could use other better alternatives. We can create a base class that implements these methods then use it as base class in the required models:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nclass BlameableModel extends Phalcon\\Mvc\\Model\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>Then in the model:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends BlameableModel\n{\n\n}\n</pre>\n<p>This approach is very simple too, but it has some disadvantages, a class only can inherit one class at the same time, so if we want to implement more behaviors this strategy could limit us.</p>\n<p>Recently in PHP 5.4, Traits were introduced allowing us to reuse method across classes without explicitly set a class inheritance. In our case a trait that fits our purposes looks like this:</p>\n<pre class=\"sh_php sh_sourceCode\">trait Blameable\n{\n\n    public function afterCreate()\n    {\n\n    }\n\n    public function afterUpdate()\n    {\n\n    }\n\n}\n</pre>\n<p>Then in then model:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\n{\n    use Blameable;\n}\n</pre>\n<p>This way also has limitations; you can’t add more than one trait that has implemented the same methods because it produces collisions. Although such collisions can be resolved, we must choose which implementation to use.</p>\n<p>Phalcon provides <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#behaviors\">behavior management</a>, allowing us to add several behaviors to the same model that implements the same events. A behavior can be easily added to a model in the following way:</p>\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\n{\n    public function initialize()\n    {\n        $this->addBehavior(new MyBehavior());\n    }\n}\n</pre>\n<p>A behavior can respond to events produced by a model, our behavior "Blameable" initially looks like:</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nuse Phalcon\\Mvc\\ModelInterface,\n    Phalcon\\Mvc\\Model\\Behavior,\n    Phalcon\\Mvc\\Model\\BehaviorInterface;\n\nclass Blameable extends Behavior implements BehaviorInterface\n{\n\n    /**\n     * Receives notifications from the Models Manager\n     *\n     * @param string $eventType\n     * @param Phalcon\\Mvc\\ModelInterface $model\n     */\n    public function notify($eventType, $model)\n    {\n        // ...\n    }\n}\n</pre>\n<p>It simply implements a method called "notify", this method receives two parameters: the event name triggered by the models manager and the model that produced the event. As mentioned before, we’re only interested in 'afterCreate’ and 'afterUpdate’:</p>\n<pre class=\"sh_php sh_sourceCode\">/**\n * Receives notifications from the Models Manager\n *\n * @param string $eventType\n * @param Phalcon\\Mvc\\ModelInterface $model\n */\npublic function notify($eventType, $model)\n{\n    if ($eventType == 'afterCreate') {\n        //...\n    }\n    if ($eventType == 'afterUpdate') {\n        //...\n    }\n}\n</pre>\n<p>Now, returning to our idea, we’re going to store the information about creating/updating operations in the following additional tables:</p>\n<pre class=\"sh_sql sh_sourceCode\">CREATE TABLE audit (\n    id integer primary key auto_increment,\n    user_name varchar(32) not null,\n    model_name varchar(32) not null,\n    ipaddress char(15) not null,\n    type char(1) not null, /* C=Create/U=Update */\n    created_at datetime not null\n);\n\nCREATE TABLE audit_detail (\n    id integer primary key auto_increment,\n    audit_id integer not null,\n    field_name varchar(32) not null,\n    old_value varchar(32),\n    new_value varchar(32) not null\n)\n</pre>\n<p>The respective models are:</p>\n<pre class=\"sh_php sh_sourceCode\">class Audit extends \\Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this->hasMany('id', 'AuditDetail', 'audit_id', array(\n            'alias' => 'details'\n        ));\n    }\n\n}\n\nclass AuditDetail extends \\Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this->belongsTo('audit_id', 'Audit', 'id');\n    }\n\n}\n</pre>\n<p>"Audit" stores general information about the operation, while "AuditDetail" stores every new value or every changed value. You can easily adapt this structure to other approaches.</p>\n<p>Let’s focus on the event "after updating", since it represents an interesting challenge. We’re interested in tracking only those fields that changed with respect to original data in the record.</p>\n<p>To achieve this, we must set up our model to store a snapshot of the original record so that we can compare it with the new and know their changes.</p>\n<pre class=\"sh_php sh_sourceCode\"><?php\n\nclass Products extends Phalcon\\Mvc\\Model\n{\n\n    public function initialize()\n    {\n        $this->keepSnapshots(true);\n    }\n\n}\n</pre>\n<p>Now we have everything we need to complete the behavior.</p>\n<pre class=\"sh_php sh_sourceCode\">public function notify($eventType, $model)\n{\n    //Fires 'logAfterUpdate' if the event is 'afterUpdate'\n    if ($eventType == 'afterUpdate') {\n        return $this->auditAfterUpdate($model);\n    }\n}\n</pre>\n<p>The method 'auditAfterUpdate’ receives the model, creates a new "Audit" together with its detail:</p>\n<pre class=\"sh_php sh_sourceCode\">public function auditAfterUpdate(ModelInterface $model)\n{\n\n    //Get the name of the fields that have changed\n    $changedFields = $model->getChangedFields();\n    if (count($changedFields)) {\n\n        //Create a new audit\n        $audit = new Audit();\n\n        //Get the session service\n        $session = $model->getDI()->getSession();\n\n        //Get the request service\n        $request = $model->getDI()->getRequest();\n\n        //Get the username from session\n        $audit->user_name = $session->get('userName');\n\n        //The model who performed the action\n        $audit->model_name = get_class($model);\n\n        //The client IP address\n        $audit->ipaddress = $request->getClientAddress();\n\n        //Action is an update\n        $audit->type = $type;\n\n        //Current datetime\n        $audit->created_at = date('Y-m-d H:i:s');\n\n        //Get the original data before modification\n        $originalData = $model->getSnapshotData();\n\n        $details = array();\n        foreach ($changedFields as $field) {\n\n            $auditDetail = new AuditDetail();\n\n            $auditDetail->field_name = $field;\n            $auditDetail->old_value = $originalData[$field];\n            $auditDetail->new_value = $model->$field;\n\n            $details[] = $auditDetail;\n        }\n\n        $audit->details = $details;\n\n        return $audit->save();\n    }\n\n    return null;\n}\n</pre>\n<p>Check out the complete source of the behavior on the <a href=\"https://github.com/phalcon/incubator/tree/master/Library/Phalcon/Mvc/Model/Behavior\">Incubator</a>.</p>\n<h3>Conclusion</h3>\n<p>This example will help you understand how the behaviors in the ORM, as information about the fields that have been changed with respect to the original data and code reuse accessing global services application.</p>","content_raw":"<p>In this tutorial, we're going to explain how to create a behavior for the Phalcon's ORM. Its goal is keep track of data changed by users on specific models. This behavior is often known as Blameable.</p>\r\n<p>A model in Phalcon triggers specific events when operations like create/update/delete are performed. These events help us to insert hook points extending the functionality according to our business needs.</p>\r\n<p>In our example, we're especially interested in tracking what records a user creates and what fields he/she changes.</p>\r\n<p>Checking the list of events triggered by a model, the most appropiate to insert this logic are 'afterCreate' and 'afterUpdate'. These are executed after the creating and updating operations respectively.</p>\r\n<h3>Why behaviors?</h3>\r\n<p>The simpler way to add logic to these events is implement them as methods in the model:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nclass Products extends Phalcon\\Mvc\\Model\r\n{\r\n\r\n    public function afterCreate()\r\n    {\r\n\r\n    }\r\n\r\n    public function afterUpdate()\r\n    {\r\n\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>However, if we want to reuse that logic across several models, we could use other better alternatives. We can create a base class that implements these methods then use it as base class in the required models:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nclass BlameableModel extends Phalcon\\Mvc\\Model\r\n{\r\n\r\n    public function afterCreate()\r\n    {\r\n\r\n    }\r\n\r\n    public function afterUpdate()\r\n    {\r\n\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Then in the model:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Products extends BlameableModel\r\n{\r\n\r\n}\r\n</pre>\r\n<p>This approach is very simple too, but it has some disadvantages, a class only can inherit one class at the same time, so if we want to implement more behaviors this strategy could limit us.</p>\r\n<p>Recently in PHP 5.4, Traits were introduced allowing us to reuse method across classes without explicitly set a class inheritance. In our case a trait that fits our purposes looks like this:</p>\r\n<pre class=\"sh_php sh_sourceCode\">trait Blameable\r\n{\r\n\r\n    public function afterCreate()\r\n    {\r\n\r\n    }\r\n\r\n    public function afterUpdate()\r\n    {\r\n\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Then in then model:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\r\n{\r\n    use Blameable;\r\n}\r\n</pre>\r\n<p>This way also has limitations; you can't add more than one trait that has implemented the same methods because it produces collisions. Although such collisions can be resolved, we must choose which implementation to use.</p>\r\n<p>Phalcon provides <a href=\"http://docs.phalconphp.com/en/latest/reference/models.html#behaviors\">behavior management</a>, allowing us to add several behaviors to the same model that implements the same events. A behavior can be easily added to a model in the following way:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Products extends Phalcon\\Mvc\\Model\r\n{\r\n    public function initialize()\r\n    {\r\n        $this-&gt;addBehavior(new MyBehavior());\r\n    }\r\n}\r\n</pre>\r\n<p>A behavior can respond to events produced by a model, our behavior \"Blameable\" initially looks like:</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nuse Phalcon\\Mvc\\ModelInterface,\r\n    Phalcon\\Mvc\\Model\\Behavior,\r\n    Phalcon\\Mvc\\Model\\BehaviorInterface;\r\n\r\nclass Blameable extends Behavior implements BehaviorInterface\r\n{\r\n\r\n    /**\r\n     * Receives notifications from the Models Manager\r\n     *\r\n     * @param string $eventType\r\n     * @param Phalcon\\Mvc\\ModelInterface $model\r\n     */\r\n    public function notify($eventType, $model)\r\n    {\r\n        // ...\r\n    }\r\n}\r\n</pre>\r\n<p>It simply implements a method called \"notify\", this method receives two parameters: the event name triggered by the models manager and the model that produced the event. As mentioned before, we're only interested in 'afterCreate' and 'afterUpdate':</p>\r\n<pre class=\"sh_php sh_sourceCode\">/**\r\n * Receives notifications from the Models Manager\r\n *\r\n * @param string $eventType\r\n * @param Phalcon\\Mvc\\ModelInterface $model\r\n */\r\npublic function notify($eventType, $model)\r\n{\r\n    if ($eventType == 'afterCreate') {\r\n        //...\r\n    }\r\n    if ($eventType == 'afterUpdate') {\r\n        //...\r\n    }\r\n}\r\n</pre>\r\n<p>Now, returning to our idea, we're going to store the information about creating/updating operations in the following additional tables:</p>\r\n<pre class=\"sh_sql sh_sourceCode\">CREATE TABLE audit (\r\n    id integer primary key auto_increment,\r\n    user_name varchar(32) not null,\r\n    model_name varchar(32) not null,\r\n    ipaddress char(15) not null,\r\n    type char(1) not null, /* C=Create/U=Update */\r\n    created_at datetime not null\r\n);\r\n\r\nCREATE TABLE audit_detail (\r\n    id integer primary key auto_increment,\r\n    audit_id integer not null,\r\n    field_name varchar(32) not null,\r\n    old_value varchar(32),\r\n    new_value varchar(32) not null\r\n)\r\n</pre>\r\n<p>The respective models are:</p>\r\n<pre class=\"sh_php sh_sourceCode\">class Audit extends \\Phalcon\\Mvc\\Model\r\n{\r\n\r\n    public function initialize()\r\n    {\r\n        $this-&gt;hasMany('id', 'AuditDetail', 'audit_id', array(\r\n            'alias' =&gt; 'details'\r\n        ));\r\n    }\r\n\r\n}\r\n\r\nclass AuditDetail extends \\Phalcon\\Mvc\\Model\r\n{\r\n\r\n    public function initialize()\r\n    {\r\n        $this-&gt;belongsTo('audit_id', 'Audit', 'id');\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>\"Audit\" stores general information about the operation, while \"AuditDetail\" stores every new value or every changed value. You can easily adapt this structure to other approaches.</p>\r\n<p>Let's focus on the event \"after updating\", since it represents an interesting challenge. We're interested in tracking only those fields that changed with respect to original data in the record.</p>\r\n<p>To achieve this, we must set up our model to store a snapshot of the original record so that we can compare it with the new and know their changes.</p>\r\n<pre class=\"sh_php sh_sourceCode\">&lt;?php\r\n\r\nclass Products extends Phalcon\\Mvc\\Model\r\n{\r\n\r\n    public function initialize()\r\n    {\r\n        $this-&gt;keepSnapshots(true);\r\n    }\r\n\r\n}\r\n</pre>\r\n<p>Now we have everything we need to complete the behavior.</p>\r\n<pre class=\"sh_php sh_sourceCode\">public function notify($eventType, $model)\r\n{\r\n    //Fires 'logAfterUpdate' if the event is 'afterUpdate'\r\n    if ($eventType == 'afterUpdate') {\r\n        return $this-&gt;auditAfterUpdate($model);\r\n    }\r\n}\r\n</pre>\r\n<p>The method 'auditAfterUpdate' receives the model, creates a new \"Audit\" together with its detail:</p>\r\n<pre class=\"sh_php sh_sourceCode\">public function auditAfterUpdate(ModelInterface $model)\r\n{\r\n\r\n    //Get the name of the fields that have changed\r\n    $changedFields = $model-&gt;getChangedFields();\r\n    if (count($changedFields)) {\r\n\r\n        //Create a new audit\r\n        $audit = new Audit();\r\n\r\n        //Get the session service\r\n        $session = $model-&gt;getDI()-&gt;getSession();\r\n\r\n        //Get the request service\r\n        $request = $model-&gt;getDI()-&gt;getRequest();\r\n\r\n        //Get the username from session\r\n        $audit-&gt;user_name = $session-&gt;get('userName');\r\n\r\n        //The model who performed the action\r\n        $audit-&gt;model_name = get_class($model);\r\n\r\n        //The client IP address\r\n        $audit-&gt;ipaddress = $request-&gt;getClientAddress();\r\n\r\n        //Action is an update\r\n        $audit-&gt;type = $type;\r\n\r\n        //Current datetime\r\n        $audit-&gt;created_at = date('Y-m-d H:i:s');\r\n\r\n        //Get the original data before modification\r\n        $originalData = $model-&gt;getSnapshotData();\r\n\r\n        $details = array();\r\n        foreach ($changedFields as $field) {\r\n\r\n            $auditDetail = new AuditDetail();\r\n\r\n            $auditDetail-&gt;field_name = $field;\r\n            $auditDetail-&gt;old_value = $originalData[$field];\r\n            $auditDetail-&gt;new_value = $model-&gt;$field;\r\n\r\n            $details[] = $auditDetail;\r\n        }\r\n\r\n        $audit-&gt;details = $details;\r\n\r\n        return $audit-&gt;save();\r\n    }\r\n\r\n    return null;\r\n}\r\n</pre>\r\n<p>Check out the complete source of the behavior on the <a href=\"https://github.com/phalcon/incubator/tree/master/Library/Phalcon/Mvc/Model/Behavior\">Incubator</a>.</p>\r\n<h3>Conclusion</h3>\r\n<p>This example will help you understand how the behaviors in the ORM, as information about the fields that have been changed with respect to the original data and code reuse accessing global services application.</p>","is_current_item":true,"is_root_item":true}]}
publish: 2013-04-010
-->


Tutorial: Creating a Blameable behavior with Phalcon
====================================================

In this tutorial, we’re going to explain how to create a behavior for
the Phalcon’s ORM. Its goal is keep track of data changed by users on
specific models. This behavior is often known as Blameable.

A model in Phalcon triggers specific events when operations like
create/update/delete are performed. These events help us to insert hook
points extending the functionality according to our business needs.

In our example, we’re especially interested in tracking what records a
user creates and what fields he/she changes.

Checking the list of events triggered by a model, the most appropiate to
insert this logic are ‘afterCreate’ and 'afterUpdate’. These are
executed after the creating and updating operations respectively.

### Why behaviors?

The simpler way to add logic to these events is implement them as
methods in the model:

~~~~ {.sh_php .sh_sourceCode}
<?php

class Products extends Phalcon\Mvc\Model
{

    public function afterCreate()
    {

    }

    public function afterUpdate()
    {

    }

}
~~~~

However, if we want to reuse that logic across several models, we could
use other better alternatives. We can create a base class that
implements these methods then use it as base class in the required
models:

~~~~ {.sh_php .sh_sourceCode}
<?php

class BlameableModel extends Phalcon\Mvc\Model
{

    public function afterCreate()
    {

    }

    public function afterUpdate()
    {

    }

}
~~~~

Then in the model:

~~~~ {.sh_php .sh_sourceCode}
class Products extends BlameableModel
{

}
~~~~

This approach is very simple too, but it has some disadvantages, a class
only can inherit one class at the same time, so if we want to implement
more behaviors this strategy could limit us.

Recently in PHP 5.4, Traits were introduced allowing us to reuse method
across classes without explicitly set a class inheritance. In our case a
trait that fits our purposes looks like this:

~~~~ {.sh_php .sh_sourceCode}
trait Blameable
{

    public function afterCreate()
    {

    }

    public function afterUpdate()
    {

    }

}
~~~~

Then in then model:

~~~~ {.sh_php .sh_sourceCode}
class Products extends Phalcon\Mvc\Model
{
    use Blameable;
}
~~~~

This way also has limitations; you can’t add more than one trait that
has implemented the same methods because it produces collisions.
Although such collisions can be resolved, we must choose which
implementation to use.

Phalcon provides [behavior
management](http://docs.phalconphp.com/en/latest/reference/models.html#behaviors),
allowing us to add several behaviors to the same model that implements
the same events. A behavior can be easily added to a model in the
following way:

~~~~ {.sh_php .sh_sourceCode}
class Products extends Phalcon\Mvc\Model
{
    public function initialize()
    {
        $this->addBehavior(new MyBehavior());
    }
}
~~~~

A behavior can respond to events produced by a model, our behavior
"Blameable" initially looks like:

~~~~ {.sh_php .sh_sourceCode}
<?php

use Phalcon\Mvc\ModelInterface,
    Phalcon\Mvc\Model\Behavior,
    Phalcon\Mvc\Model\BehaviorInterface;

class Blameable extends Behavior implements BehaviorInterface
{

    /**
     * Receives notifications from the Models Manager
     *
     * @param string $eventType
     * @param Phalcon\Mvc\ModelInterface $model
     */
    public function notify($eventType, $model)
    {
        // ...
    }
}
~~~~

It simply implements a method called "notify", this method receives two
parameters: the event name triggered by the models manager and the model
that produced the event. As mentioned before, we’re only interested in
'afterCreate’ and 'afterUpdate’:

~~~~ {.sh_php .sh_sourceCode}
/**
 * Receives notifications from the Models Manager
 *
 * @param string $eventType
 * @param Phalcon\Mvc\ModelInterface $model
 */
public function notify($eventType, $model)
{
    if ($eventType == 'afterCreate') {
        //...
    }
    if ($eventType == 'afterUpdate') {
        //...
    }
}
~~~~

Now, returning to our idea, we’re going to store the information about
creating/updating operations in the following additional tables:

~~~~ {.sh_sql .sh_sourceCode}
CREATE TABLE audit (
    id integer primary key auto_increment,
    user_name varchar(32) not null,
    model_name varchar(32) not null,
    ipaddress char(15) not null,
    type char(1) not null, /* C=Create/U=Update */
    created_at datetime not null
);

CREATE TABLE audit_detail (
    id integer primary key auto_increment,
    audit_id integer not null,
    field_name varchar(32) not null,
    old_value varchar(32),
    new_value varchar(32) not null
)
~~~~

The respective models are:

~~~~ {.sh_php .sh_sourceCode}
class Audit extends \Phalcon\Mvc\Model
{

    public function initialize()
    {
        $this->hasMany('id', 'AuditDetail', 'audit_id', array(
            'alias' => 'details'
        ));
    }

}

class AuditDetail extends \Phalcon\Mvc\Model
{

    public function initialize()
    {
        $this->belongsTo('audit_id', 'Audit', 'id');
    }

}
~~~~

"Audit" stores general information about the operation, while
"AuditDetail" stores every new value or every changed value. You can
easily adapt this structure to other approaches.

Let’s focus on the event "after updating", since it represents an
interesting challenge. We’re interested in tracking only those fields
that changed with respect to original data in the record.

To achieve this, we must set up our model to store a snapshot of the
original record so that we can compare it with the new and know their
changes.

~~~~ {.sh_php .sh_sourceCode}
<?php

class Products extends Phalcon\Mvc\Model
{

    public function initialize()
    {
        $this->keepSnapshots(true);
    }

}
~~~~

Now we have everything we need to complete the behavior.

~~~~ {.sh_php .sh_sourceCode}
public function notify($eventType, $model)
{
    //Fires 'logAfterUpdate' if the event is 'afterUpdate'
    if ($eventType == 'afterUpdate') {
        return $this->auditAfterUpdate($model);
    }
}
~~~~

The method 'auditAfterUpdate’ receives the model, creates a new "Audit"
together with its detail:

~~~~ {.sh_php .sh_sourceCode}
public function auditAfterUpdate(ModelInterface $model)
{

    //Get the name of the fields that have changed
    $changedFields = $model->getChangedFields();
    if (count($changedFields)) {

        //Create a new audit
        $audit = new Audit();

        //Get the session service
        $session = $model->getDI()->getSession();

        //Get the request service
        $request = $model->getDI()->getRequest();

        //Get the username from session
        $audit->user_name = $session->get('userName');

        //The model who performed the action
        $audit->model_name = get_class($model);

        //The client IP address
        $audit->ipaddress = $request->getClientAddress();

        //Action is an update
        $audit->type = $type;

        //Current datetime
        $audit->created_at = date('Y-m-d H:i:s');

        //Get the original data before modification
        $originalData = $model->getSnapshotData();

        $details = array();
        foreach ($changedFields as $field) {

            $auditDetail = new AuditDetail();

            $auditDetail->field_name = $field;
            $auditDetail->old_value = $originalData[$field];
            $auditDetail->new_value = $model->$field;

            $details[] = $auditDetail;
        }

        $audit->details = $details;

        return $audit->save();
    }

    return null;
}
~~~~

Check out the complete source of the behavior on the
[Incubator](https://github.com/phalcon/incubator/tree/master/Library/Phalcon/Mvc/Model/Behavior).

### Conclusion

This example will help you understand how the behaviors in the ORM, as
information about the fields that have been changed with respect to the
original data and code reuse accessing global services application.

