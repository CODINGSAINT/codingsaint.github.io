---
id: 385
title: Advantages and Drawbacks of Microservices
date: 2019-06-18T23:55:04+05:30
author: Coding Saint
excerpt: |
  Advantages of Microservices
  Improved fault tolerance
  Easy to understand
  No vendor or technology lock in
  Easy to add new modules  
  Drawbacks of Microservices
  Distributed systems are complex to understand
  Multiple database make it complex to maintain transactional consistency.
  Tough to test
  Could be tough to deploy
layout: post
guid: https://codingsaint.com/?p=385
permalink: /2019/06/18/advantages-and-drawbacks-of-microservices/
image: /wp-content/uploads/2019/06/Advantages_Drawbacks_Microservices.png
categories:
  - Microservices
tags:
  - Advantage
  - Microservices
---
In today&#8217;s world where there is a rapid demand to move to microservice architecture , we must not forget that Microservices are not the silver bullet. While there are scenarios where microservices can be beneficial , there are chances that it is not the correct path for your application. Microservices have shortcomings , these shortcomings should be enough for you to take decision to carry on with Monolith application.

Let&#8217;s look at the advantages and drawbacks  of Microservices.

### Advantages of Microservices

  1. Improved fault tolerance
  2. Easy to understand
  3. No vendor or technology lock in
  4. Easy to add new modules

#### Improved fault tolerance

Microservices helps you to be highly available. Since once we adopt microservices , we move towards distributed systems , In case of a monolith if a the system or network is down typically entire system is down. In Monolith as we know services are tightly coupled , error at one service will impact other one too. In Microservices , we design in a way that even if one component is down , entire service will not be impacted. We can use fault tolerance and write code for fallbacks. For example if we have fallback for some critical modules , in case of the service being down fallbacks will be invoked ,  say in a e-commerce microservice recommendation-service is down, we can have fallbacks with static recommendations. It improves our fault tolerance.

#### Easy to understand

Each module is granular. It has it&#8217;s own domain, All it has to do is to take care of itself. Obviously it is easy to understand a smaller piece than entire monolith system4

#### No vendor or technology lock in

The is no vendor lock in , Each module can have it&#8217;s own database,  a different programming language and still communicate via HTTP REST protocol , or messaging queues etc.

#### Easy to add new modules

Once a new feature is required we don&#8217;t have to write in same monolith with a fear of breaking changes. We can easily  spin up a new microservices and it doesn&#8217;t have to break existing system.

### Drawbacks of Microservices

  1. Distributed systems are complex to understand
  2. Multiple database make it complex to maintain transactional consistency.
  3. Tough to test
  4. Could be tough to deploy

&nbsp;

#### Distributed systems are complex to understand

Distributed system are complex. Tough a individual module could be very easy to understand but how it fit in entire big microservice landscape ,interacting with each other could be tough to understand.

#### Multiple database make it complex to maintain transactional consistency.

This is one of the most talked about problem of a microservice architecture . In a monolith , it is one database where all modules related tables are there . It is easy to maintain transactional consistency . For example , if one the operation fails we can easily rollback entire transaction. In microservices , all services have different databases. Many a times one operation requires interaction with multiple services. To guarantee a transaction in all databases over different servers it not possible. To avoid it we use eventual consistency but still transaction consistency is complex.We need to design fail over scenarios well in advance.

#### Tough to test

One single database , one application , single source to to test is obviously easy than to test one operation where multiple miroservices with multiple database are interacting.

#### Could be tough to deploy

So many microservices , and over that one depending on another , with so many different technology stack is challenging for sure.

&nbsp;

Now after reading above , if you are designing microservices you must ask is it required. Do I have to deal with so many transaction and incming requests that we need to decompose monolith. Will I have infrastructure  ready  at will to scale microservices  or new one. If your answer is yes, please go ahead but always remember MICROSERVICES are not silver bullet.