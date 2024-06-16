---
layout: post
title: Phalcon + Swoole in High Load Micro Service
image: /assets/files/2024-05-17-phalcon-5.7.0-release.png
date: 2024-05-17T00:01:02.699Z
tags:
  - phalcon
  - phalcon5
  - release
---

## Introduction

This journey took me four years in total. Four years of meticulous planning, incremental steps, and countless hours of coding and debugging to migrate everything related to this service.

In this post, I will share our experience of rewriting a high-load microservice using Phalcon with Swoole, why we decided to make this shift, the obstacles we encountered, and how we overcame them. Whether you’re a PHP enthusiast or someone who has dismissed it as a language suited only for small-time projects, our story will provide insights and maybe offer even a few laughs.

Let’s dive into how we turned PHP into a high-performance powerhouse!

Let's be honest: PHP often gets a bad rap. It's the go-to language for setting up quick-and-dirty blog sites on platforms like WordPress or Drupal or some corporate CRM with any well known framework. It’s the Swiss Army knife of web development - versatile and everywhere, but often underestimated in serious, high-performance or even enterprise applications.

But what if I told you that PHP could easily compete with the big guns in the world of high-load applications? Enter the powerful combination of Phalcon and Swoole. Imagine supercharging your trusty old PHP setup, giving it the boost it needs to handle thousands of requests per second with ease.

When our team embarked on the journey to rewrite our high-load microservice, we were already well-versed in the capabilities of PHP, particularly with Phalcon. As a core developer of Phalcon, I was familiar with its potential for high performance and efficiency. However, the classic PHP setup: PHP-FPM with Nginx - just wasn't cutting it for our needs.


## Project history and background

Our project began as a legacy codebase, originally written in PHP 5.6 and later upgraded to PHP 7.0. This monolithic application was running in a private datacenter, deployed across multiple Proxmox virtual machines. The infrastructure was substantial, boasting 50-100 CPUs and hundreds of gigabytes of RAM. Despite this considerable hardware, the classic stack of nginx and PHP-FPM wasn't delivering the performance and scalability we needed.

![htop](/assets/files/2024-06-16-phalcon-swoole-htop.png)

The application served a critical role in our operations, but as traffic and data volumes grew, the limitations of our setup became increasingly apparent. The traditional PHP-FPM model, which spawns a separate process for each request, was struggling under the load, leading to high latency and inefficient resource utilization.

## Planning and Design

Initially, we considered rewriting the entire codebase in Golang, as we had successfully done with a similar application. Golang’s performance and concurrency model made it an attractive option for high-load applications. However, the project’s complexity presented a significant challenge: there were thousands of hard-coded business logic rules embedded throughout the code. Migrating all that logic to Golang in a single iteration was impractical.

We needed a solution that allowed us to proceed in very small, manageable steps, minimizing disruption while gradually improving performance and scalability. This led us to explore alternative approaches within the PHP ecosystem that could leverage our existing knowledge and infrastructure, while providing the performance boost we needed.

Phalcon, combined with Swoole, offered a compelling path forward. However, Phalcon wasn't originally designed to work in tandem with Swoole. There were no existing libraries or guidelines on how to integrate the two. So, I decided to implement a [bridge](https://github.com/phalcon/bridge-swoole) that allows Swoole's Request and Response to be passed to Phalcon, processed inside Phalcon's MVC, and then the output returned back to Swoole to be sent to the client.

## Implementation

During this implementation, we encountered several technical challenges, the most significant being memory management issues. Since the service is started once and everything stays in memory, our logic needed to manage memory efficiently to ensure stability and prevent memory leaks. These leaks started to appear frequently, which is a common issue in such setups but required meticulous attention to resolve.

![infra-history](/assets/files/2024-06-16-phalcon-swoole-infra-history.jpg)

Our application functions as a data input validator, processing incoming data and asynchronously sending it to Kafka. In the new version we implemented an internal hot cache using `Swoole\Table`, which updates data from S3 every hour via `Swoole\Tick`. It stores data inside memory so there is minimal latency to fetch data and parameters.

## Challenges and Solutions

There were additionally several problems within Phalcon itself that contributed to the memory leaks. I spent a significant amount of time identifying, debugging, and fixing these issues. This process was crucial to ensure that our new architecture would be stable and performant in the long run.

This approach allowed us to incrementally refactor our application, maintaining the business logic in PHP, while significantly enhancing performance with Swoole's asynchronous capabilities. This strategy provided the balance between continuity and improvement that we needed to tackle the complex, step-by-step migration.

Choosing a Kafka client that works reliably with AWS MSK (Managed Kafka broker inside AWS) and connects once during server bootstrap was crucial. The client needed to handle the specifics of AWS MSK, including authentication and maintaining a persistent connection.

After adapting Swoole's Kafka client and implementing missing features such as [authentication to AWS MSK](https://github.com/Jeckerson/phpkafka/commit/c2badad88559dde68e9aefa0e2ed067aba401e50) (Managed Kafka broker inside AWS), we have achieved a stable system with no memory leaks.

## Results and Outcomes

The journey was challenging, but the results have been highly rewarding...

![ingress](/assets/files/2024-06-16-phalcon-swoole-ingress.png)
<small>Daily ingress of one of geos</small>

### Stability and Performance

![cpu](/assets/files/2024-06-16-phalcon-swoole-cpu.png)

One of the primary goals of our migration was to achieve stability and improve performance. This was a significant accomplishment given the previous issues we faced with memory management.

### Efficient Memory Usage

![cpu](/assets/files/2024-06-16-phalcon-swoole-ram.png)

Through rigorous debugging and optimization, we managed to eliminate memory leaks that had previously plagued our application. The continuous running nature of the service, with everything in memory, required careful handling of memory allocation and deallocation. Our efforts paid off, resulting in a highly stable system that can handle sustained high loads without degradation in performance.

### Improved Response Times

![cpu](/assets/files/2024-06-16-phalcon-swoole-response-time.png)

The combination of Phalcon’s efficiency and Swoole’s asynchronous capabilities has led to significant improvements in response times. Our average response time is now consistently stable, even under heavy loads. This has greatly enhanced the user experience, providing faster and more reliable service.

### Enhanced Scalability

![cpu](/assets/files/2024-06-16-phalcon-swoole-pods.png)

The new architecture has dramatically improved the scalability of our microservice. We can now handle a much larger volume of requests with the same hardware resources, thanks to the efficient handling of concurrent connections and resource management provided by Swoole.

### Simplified Maintenance

By maintaining the business logic in PHP and leveraging Phalcon’s MVC framework, we have made the application easier to maintain and extend. The clear separation of concerns and modular design allowed us to introduce new features and make changes without disrupting the existing functionality.

### Integration with AWS MSK

Implementing the missing features for Swoole’s Kafka client, such as authentication to AWS MSK, has allowed us to seamlessly integrate with AWS’s managed Kafka service. This has provided us with a reliable and scalable messaging solution that further enhances the robustness of our microservice.

### Ease of Deployment

Example of `Dockerfile`:

```dockerfile
FROM php:8.1-cli

COPY . /srv
WORKDIR /srv

RUN pecl install phalcon swoole

EXPOSE 9501

ENTRYPOINT ["php", "/srv/server.php"]
```

## Conclusion

Rewriting our high-load microservice with Phalcon and Swoole has been a transformative process. We have not only achieved our goals of improved stability and performance but also set a strong foundation for future growth and scalability. This project demonstrates that with the right tools and approach, PHP can power high-performance applications capable of handling significant workloads efficiently.
