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
This success story has been submitted by our community member Ruud ([ruudboon](https://github.com/ruudboon)).

<!--more-->

![De Vries Houtbewerking](/assets/files/devries-factory.jpg "De Vries Houtbewerking")

In Oostzaan, a small town next to Amsterdam, [De Vries Houtbewerking](http://www.devrieshoutbewerking.nl) carpenter factory has been using Phalcon for a few years now. 

The company wanted to increase productivity and streamline the production line by ensuring that at any given point, all workers are aware of the tasks of the day.

The idea was simple: with a system of TV screens and tablets, displaying the tasks that are required to produce window frames and stairs, the production could be optimized. We list the order of the tasks to be done per assignment. At every workplace, a screen has to display the tasks of that day, while on a tablet employees can find the working drawings and they can report whether a task has been completed or not. 

We keep the jobs that have been signed off all day on the screen. It is very motivating to have a green list at the end of the day.

In general, it is assumed that one day is required for each task to complete it. If an order requires 7 steps at the factory, the product will have passed through the factory after 7 working days at the start of the order. All of this can be monitored in the planning part of the application.

### Hosting setup

The first step was to identify the current environment. In Microsoft Access there was already a system to register the orders, that contained a large amount of historical data.

The first step was to upgrade the Access database by migrating it to Microsoft SQL Server, so as to allow better scaling. We then set up a separate server (FreeBSD) as an acceptance and production server that federated with Microsoft SQL Server using TCP/IP. On this server we run Apache and PHP with of course the Phalcon Extension. With this approach we could use the existing data without interfering with the current system in place.

### The screens

The development began with an analysis of existing data and identifying what is required for the new system. We started by displaying such data on screens to visualize the whole concept and to get instant feedback from the client as to what works and what doesn't. 

To keep the costs low, we have chosen to control the screens (Full HD) with a Raspberry Pi. A headless browser (chromium) automatically starts up and immediately opens the web page in the internal server. Phalcon serves the web page and based on the IP it will be determined which type of screen this is and what information the screen needs to have.

The initial request contains the basic layout and then JavaScript takes over. After initialization, we request data for the screen via an API and set up a web socket connection for receiving push messages. Since the Raspberry PIs can not be operated via a keyboard and we want to prevent access to them, the page will be reloaded immediately, even if there is an error. For instance if the socket connection fails, the system will automatically restore the connection, and if it cannot, it will force reloading the page after 60 seconds. 

After discussions with the client, we refined the presentation of the information on screens, to only what is needed and presenting additional information where needed. We also introduced specific color coding on screen, to define the priority and status of the task being worked on, so as to offer _status at a glance_ (on time, running behind etc.).

![Test drive few weeks before going to production](/assets/files/devries-screens.jpg "Test drive few weeks before going to production")
_Test drive few weeks before going to production_

![](/assets/files/devries-pi.jpg "We all love pi")
_We all love pi_

### WebSocket

In order to stimulate the employees to register the finished task, we have chosen to display the status of the task on screen as quickly as possible. One option for instance, was to refresh the screen every 10 seconds by doing an API call. This approach was feasible but it was increasing the traffic by a lot, and we had to consider the burden on the Rasberry PIs. 

The other option was to use Websockets, which offer bidirectional communication. At the time of development I had no experience with websocket, so I decided to use only what was needed for my task. Mainly those are two functions: reload the entire web page (for example a style update) or retrieve new data via the API.

To set up the websocket, I used the Phalcon CLI app in combination with Ratchet websocket for PHP. Using the following code, I was able to set up a simple websocket server.

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

What I did in the `DevriesWebsocket` class is simple. Clients who register, are required to provide a type, for example `Screen Spraying`. I register all these these clients in an array and also added helper methods to send messages to those clients. For example, to all screens with type X, to all screens or to an individual screen.

In order to send messages to the screens, I also connected the application itself as a client, with the type `Controller`. This functionality was implemented in the Phalcon command line application as well as the web application. This allows for sending a message to any screens to update after a save.

A method was also created by the command line tools, that is called every minute using a cronjob. This method creates a checksum based on a number of data that is relevant to each screen. There may be changes in the parent system's data that can affect one or more of the screens. Using this checksum, we are able to send the update to whatever screen is needed.

### Tablets

The tablets are used by the carpenters. In general, these craftsmen and women love woodworking, computers... not so much. That is why the interface had to be very simple and the number of steps to change/report something had to be as few as possible.

The tablet retrieves the interface via Phalcon and any interaction uses AJAX calls to the API. We store changes, such as completing tasks in the database, and, if necessary, we send a update command to the screen to mark the task complete, update any relevant screens with this change and load the next task.

![](/assets/files/devries-tablet-01.png)

![](/assets/files/devries-tablet-02.jpg)

_Tablet interface and complete task by pressing your own face_

### Planning

One of the things that immediately became obvious is that there was a need for information regarding the tasks that went to the floor. The current planning system on a whiteboard was therefore quickly replaced by an additional web page with an excel-like overview, where anyone can see real time, what the status of each task/order is.

![](/assets/files/devries-planning.png "Planning overview")
_Planning overview_

### Current status

![](/assets/files/devries-floor.jpg "Production floor, with screens in the background")
_Production floor, with screens in the background_

The system has been running for over 2.5 years, without any major problems. From time to time, we needed to reboot one or more of the Raspberry Pis, one tablet was sawn through and one screen had to have a plastic protective shield because TV screens do not have a lot of tolerance to flying wood when milling. The factory has indicated that they have made an efficiency improvement between 10 and 15 percent after the introduction of this system. But above all it has brought peace and quiet to the factory. Every month, I do add some small features but always with the same approach as we started. Keep it simple.

One of the biggest problems I had was supporting the Microsoft SQL database. It is now working fine for this factory, but I often encounter problems with the extension. Microsoft SQL is not my preferred RDBMS, but it is a very common database in business environments. Now that Microsoft has introduced a MS SQL Server Developer Edition docker image, I think it is worth to write a Phalcon adapter for it :) 

Phalcon is a super flexible framework and has certainly proven its strength on this project. I look forward to the steps that Phalcon is going to take in the future. 

If you have any questions about this project, leave a message or contact me at Discord.

Ruud

### Submissions
If you have a success story that you wish to share with the community, we would be happy to post it in our blog. Feel free to contact us at team@phalconphp.com or our [Discord](https://phalcon.link/discord) server.

<3 The Phalcon Team
