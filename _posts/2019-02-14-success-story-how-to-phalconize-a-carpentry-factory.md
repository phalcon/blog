---
layout: post
title: 'Success Story: How to Phalconize a carpentry factory'
date: 2019-02-14T22:30:33.891Z
tags:
  - success story
  - phalcon
  - raspberry pi
  - websocket
  - rachetphp
---
![De Vries Houtbewerking](/assets/files/devries-factory.jpg "De Vries Houtbewerking")

In Oostzaan, a small town next to Amsterdam, [De Vries Houtbewerking](http://www.devrieshoutbewerking.nl) carpenter factory has been using Phalcon for a few years now. 

The idea was simple: with a system of TV screens and tablets, displaying the tasks that come with producing window frames and stairs, the production could be optimized. We list  the order of the tasks to be done per assignment. At every workplace a screen had to come with the tasks of that day, on a tablet employees find the working drawings and they can report tasks ready. 

We keep the jobs that have been signed off all day on the screen. It is very motivating to have a green list at the end of the day.

In general, it is assumed that one day is required for each task to complete it. If an order requires 7 steps at the factory, the product will have passed through the factory after 7 working days at the start of the order. All of this can be monitored in the planning part of the application.

### Hosting setup

The first step was to take stock of the current environment. In Microsoft Access there was already a system to register the orders, with a large amount of data.

The first step was therefore to make the Access system use a Microsoft SQL Server database. We then set up a separate server (FreeBSD) as an acceptance and production server that gained access to the Microsoft SQL database via tcp/ip. On this server we run Apache and PHP with of course the Phalcon Extension. That way we could use the data and the current order system could remain in use.

### The screens

The development started with het visualising the required data. To keep the costs low, we have chosen to control the screens (Full HD) with a Raspberry Pi. A headless browser (chromium) automatically starts up and immediately opens the web page in the internal server. Phalcon serves the web page and based on the IP it will be determined which type of screen this is and what information the screen needs to request.

The first request contains the basic layout, then javascript takes control. After initialization, we request data for the screen via an API and set up a web socket connection for receiving push messages. Since the Raspberry PIs can not be operated via a keyboard and we want to prevent accessing the devices, the page will be reloaded immediately if there is an error. If the web socket connection fails, it will be automatically restore the connection and if no connection is possible after 60 seconds, we reload the page. 

We tried to only give the needed information on the screen and using colors add additional information such as priority (orders that are red running behind according to the planning) 

![Test drive few weeks before going to production](/assets/files/devries-screens.jpg "Test drive few weeks before going to production")
_Test drive few weeks before going to production_

![](/assets/files/devries-pi.jpg "We all love pi")
_We all love pi_

### WebSocket

In order to stimulate the employees to register the finished task, we have chosen to display this on the screen as quickly as possible. One possibility was to, for example, refresh the screen every 10 seconds by doing an api call. Besides giving us lots of unnecessary lookups, we do not want to burden the Raspberry PIs too much. Websocket has the possibility of bidirectional communication and offers a solution here. At the time of development I had no experience with websocket so I decided to do only the much needed parts in websocket. Mainly 2 functions: reload the entire web page (for example a style update) or retrieve new data via the api.

To set up the websocket, I gratefully used the Phalcon CLI app in combination with Ratchet websocket for PHP. Using the following code, I was able to set up a simple websocket server.

```php
<?php

class MainTask extends \Phalcon\CLI\Task
{
    public function mainAction()
    {
        $loop    = React\EventLoop\Factory::create();
        $context = new React\ZMQ\Context($loop);
        
        // ZeroMQ push
        $pull = $context->getSocket(
            ZMQ :: SOCKET_PULL, 
            'DeVries Websocket Pusher'
        );
        $pull->bind('tcp: //127.0.0.1: 5555');
        
        // Binding to 127.0.0.1 means the only 
        // client that can connect is itself
        $devriesWebsocket = DevriesWebsocket();
        $socketServer = new React\Socket\Server($loop);
        $socketServer->listen(8080, '0.0.0.0');
        $webServer = new Ratchet\Server\IoServer(
            new Ratchet\Http\HttpServer(
                new Ratchet\WebSocket\WsServer($devriesWebsocket)
            ), 
            $socketServer
        );
        
        $pull->on('message', [$devriesWebsocket, "onPush"]);
        $loop->run();    
    }
}
```

What I did in the `DevriesWebsocket` class is simple. Clients who register are required to provide a type, for example Screen Spraying. I register these clients in an array and added a few methods to send messages to clients. For example, to all screens with type X, to all screens or to an individual screen.

In order to send messages to the screens I also connect myself as a client with the type of controller. I have built this functionality not only in the cmd-line Phalcon app, but also in the webapp. A model can therefore send a message to the specific screens to update after a save.

I also created a function via the cmd line tools that I call every minute via a cronjob. This function creates a checksum based on a number of columns and tables that are relevant to our screens. There may be changes in the Access system that causes updates on the screens. With a new checksum we send a refresh to the screens.

### Tablets

The tablets are used by the carpenters. In general, these craftsmen and woman love woodworking, computers not so much. That is why the interface had to be simple and the number of steps to change something should be as low as possible.

The tablet retrieves the interface via Phalcon and then interaction uses ajax calls on the api. We store changes such as completing tasks in the database and if necessary we send a update command to screen to mark it complete and display them on the next screen.

![](/assets/files/devries-tablet-01.png)

![](/assets/files/devries-tablet-02.jpg)

_Tablet interface and complete task by pressing your own face_

### Planning

One of the things that soon came to mind was that they also needed insight in the orders that went into the factory. The current planning system on a whiteboard was therefore quickly replaced by an extra web page with an excel-like overview where you can look in real time at the orders that are running and which order will remain.

### 

![](/assets/files/devries-planning.png "Planning overview")
_Planning overview_

### Current status

The system has been running for over 2.5 years without any major problems. A Raspberry sometimes needs a reboot, 1 tablet is sawn through and 1 screen has now been given a plastic cap because it had only a little resistant to flying wood when milling. The factory has indicated that they have made an efficiency improvement between 10 and 15 percent after the introduction of this system. But above all it has brought peace and quiet to the factory. Every month I do add some small features but always with the same approach as we started. Keep it simple.

One of the biggest problems I had was supporting the Microsoft SQL database. It is now working fine for this factory, but I often encounter problems with the extension. Microsoft SQL does not have my preference, but it is a very common database in business. Especially now that Microsoft has a developer SQL server in the docker, I think it is worth to write a good phalcon adapter. 

Phalcon is a super flexible framework and has certainly proven its strength for me on this project. I look forward to the steps that Phalcon is going to make. If you have any questions about this project, leave a message or contact me at Discord.

![](/assets/files/devries-floor.jpg "Production floor, with screens in the background")
_Production floor, with screens in the background_
