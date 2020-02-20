---
id: 478
title: Components of Microservices
date: 2019-09-19T07:04:37+05:30
author: Coding Saint
layout: post
guid: https://codingsaint.com/?p=478
permalink: /2019/09/19/components-of-microservices/
categories:
  - Microservices
  - Spring
tags:
  - Microservices
  - Microservices architecture
  - Spring Boot Microservices
  - Spring Microservices
  - Todo microservices
---
#### Components of Microservices {#markdown-header-modules}

Let us look at components of Microservices , which we will be learning, We will be creating

Below is the diagram of the components we will be building.

<img class="alignnone size-full wp-image-491" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/09/SpringBootMicroservicesComponents.png?resize=750%2C422&#038;ssl=1" alt="SpringBootMicroservicesComponents" width="750" height="422" srcset="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/09/SpringBootMicroservicesComponents.png?w=1366&ssl=1 1366w, https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/09/SpringBootMicroservicesComponents.png?resize=300%2C169&ssl=1 300w, https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/09/SpringBootMicroservicesComponents.png?resize=768%2C432&ssl=1 768w, https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/09/SpringBootMicroservicesComponents.png?resize=1024%2C576&ssl=1 1024w" sizes="(max-width: 750px) 100vw, 750px" data-recalc-dims="1" /> 

  * **Microservices :** user-service and todo-services.
  * **Config Server:** All Microservices on startup will refer to config server for their configurations.
  * **Api Gateway:** A centralized way to access all the microservices , A front facing unit for all the clients. Also responsible for common services via Filters viz. Authentication , capturing user info in log before hitting services and many other.
  * **Feign Client** Helps to remove boilerplate restTemplate code
  * **Ribbon** Along with feign client helps to load balance the application
  * **Naming Server: Eureka:** All of the microservices on startup will let naming server know about their existence. Naming server will know their address /location/ ip . Whenever one microservices calls another via ribbon/feign , it will check naming server for existence on another service and return correct one. Because there can be multiple instances of any microservice it helps as in load balancing .
  * **Spring Cloud Sleuth** As the name suggests ,sleuth is a detective, To every incoming request it adds tracing mechanism , i.e. traceid . With all logs printing this trace id. We can track over which microservice instance request has traveled.
  * **Rabbit MQ** Just to keep track of all traces coming of incoming request. It keeps all these traces at one centralized place.
  * **Zipkin** UI for looking tracing the entire journey of request.
  * **Hystrix** A fallback mechanism for any failing services.

Note: All of the above Microservices are created as a part of tutorial , You can find entire tutorial at [Spring Boot REST API and Microservices](https://www.udemy.com/course/spring-boot-and-rest-api/?couponCode=SPRING50) .

The source code of the above microservice architecture is present at [Github.](https://github.com/CODINGSAINT/microservices) 

<!-- Created with Elementor -->

<!-- Created with Elementor -->
