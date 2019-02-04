---
layout: post
title: "Tutorial: Creating a Blameable behavior with Phalcon"
tags: [php, phalcon, sample, tutorial, "1.x"]
---

In this tutorial, we're going to explain how to create a behavior for the Phalcon's ORM. Its goal is keep track of data changed by users on specific models. This behavior is often known as Blameable.

A model in Phalcon triggers specific events when operations like create/update/delete are performed. These events help us to insert hook points extending the functionality according to our business needs.

<!--more-->
In our example, we're especially interested in tracking what records a user creates and what fields he/she changes.

Checking the list of events triggered by a model, the most appropriate to insert this logic are ‘afterCreate' and 'afterUpdate'. These are executed after the creating and updating operations respectively.

### Why behaviors?
The simpler way to add logic to these events is implement them as methods in the model:

```php
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
```

However, if we want to reuse that logic across several models, we could use other better alternatives. We can create a base class that implements these methods then use it as base class in the required models:

```php
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
```

Then in the model:

```php
class Products extends BlameableModel
{

}
```

This approach is very simple too, but it has some disadvantages, a class only can inherit one class at the same time, so if we want to implement more behaviors this strategy could limit us.

Recently in PHP 5.4, Traits were introduced allowing us to reuse method across classes without explicitly set a class inheritance. In our case a trait that fits our purposes looks like this:

```php
trait Blameable
{

    public function afterCreate()
    {

    }

    public function afterUpdate()
    {

    }

}
```

Then in then model:

```php
class Products extends Phalcon\Mvc\Model
{
    use Blameable;
}
```

This way also has limitations; you can't add more than one trait that has implemented the same methods because it produces collisions. Although such collisions can be resolved, we must choose which implementation to use.

Phalcon provides [behavior management](https://docs.phalconphp.com/latest/en/models#behaviors), allowing us to add several behaviors to the same model that implements the same events. A behavior can be easily added to a model in the following way:

```php
class Products extends Phalcon\Mvc\Model
{
    public function initialize()
    {
        $this->addBehavior(new MyBehavior());
    }
}
```

A behavior can respond to events produced by a model, our behavior `Blameable` initially looks like:

```php
<?php

use Phalcon\Mvc\ModelInterface;
use Phalcon\Mvc\Model\Behavior;
use Phalcon\Mvc\Model\BehaviorInterface;

class Blameable extends Behavior implements BehaviorInterface
{

    /**
     * Receives notifications from the Models Manager
     *
     * @param string $eventType
     * @param Phalcon\Mvc\ModelInterface $model
     */
    public function notify($eventType, ModelInterface $model)
    {
        // ...
    }
}
```

It simply implements a method called "notify", this method receives two parameters: the event name triggered by the models manager and the model that produced the event. As mentioned before, we're only interested in `afterCreate` and `afterUpdate`:

```php
/**
 * Receives notifications from the Models Manager
 *
 * @param string $eventType
 * @param Phalcon\Mvc\ModelInterface $model
 */
public function notify($eventType, ModelInterface $model)
{
    if ($eventType == 'afterCreate') {
        //...
    }
    if ($eventType == 'afterUpdate') {
        //...
    }
}
```

Now, returning to our idea, we're going to store the information about creating/updating operations in the following additional tables:

```sql
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
```

The respective models are:

```php
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
```

`Audit` stores general information about the operation, while `AuditDetail` stores every new value or every changed value. You can easily adapt this structure to other approaches.

Let's focus on the event "after updating", since it represents an interesting challenge. We're interested in tracking only those fields that changed with respect to original data in the record.

To achieve this, we must set up our model to store a snapshot of the original record so that we can compare it with the new and know their changes.

```php
<?php

class Products extends Phalcon\Mvc\Model
{

    public function initialize()
    {
        $this->keepSnapshots(true);
    }

}
```

Now we have everything we need to complete the behavior.

```php
public function notify($eventType, $model)
{
    // Fires 'logAfterUpdate' if the event is 'afterUpdate'
    if ($eventType == 'afterUpdate') {
        return $this->auditAfterUpdate($model);
    }
}
```

The method `auditAfterUpdate` receives the model, creates a new `Audit` together with its detail:

```php
public function auditAfterUpdate(ModelInterface $model)
{

    // Get the name of the fields that have changed
    $changedFields = $model->getChangedFields();
    if (count($changedFields)) {

        // Create a new audit
        $audit = new Audit();

        // Get the session service
        $session = $model->getDI()->getSession();

        // Get the request service
        $request = $model->getDI()->getRequest();

        // Get the username from session
        $audit->user_name = $session->get('userName');

        // The model who performed the action
        $audit->model_name = get_class($model);

        // The client IP address
        $audit->ipaddress = $request->getClientAddress();

        // Action is an update
        $audit->type = $type;

        // Current datetime
        $audit->created_at = date('Y-m-d H:i:s');

        // Get the original data before modification
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
```

Check out the complete source of the behavior on the [Incubator](https://github.com/phalcon/incubator/tree/master/Library/Phalcon/Mvc/Model/Behavior).

### Conclusion
This example will help you understand how the behaviors in the ORM, as information about the fields that have been changed with respect to the original data and code reuse accessing global services application.


<3 The Phalcon Team
