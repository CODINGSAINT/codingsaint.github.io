---
id: 503
title: Creating Reactive REST API with Spring Boot and MongoDB
date: 2019-09-28T06:40:22+05:30
author: Kumar Pallav
layout: post
guid: https://codingsaint.com/?p=503
permalink: /2019/09/28/creating-reactive-rest-api-with-spring-boot-and-mongodb/
categories:
  - Spring
tags:
  - Mongodb
  - Reactive Spring
  - Spring Microservices
  - SpringBoot
series:
  - Reactive Spring Boot Microservices
---
#### Introduction

&nbsp;

### Meta

> Author :Kumar Pallav
> 
> Audience : Who knows Spring Boot and want to learn Reactive Spring
> 
> Source code: <https://github.com/CODINGSAINT/springboot-rective-microservices-with-reactjs/tree/1_user-service>

## 

Reactive Spring Boot is new paradigm shift in the way we have worked with Spring and traditional approach.While we have always been treating the web api calls as a thread based model where the request is made and response is received as one single transaction (not Database transaction) , Reactive approach further breaks it to multiple segments , where clients creates a request and doesn&#8217;t wait for response immediately , whenever server has response ,it will be forwarded to client.

### Why Reactive

Let&#8217;s look at the impact it makes over regular approach.  
While in regular web calls with each request a new thread is created at server, it complete it job and then terminate (read kills). In case when we interact with blocking operation thread waits, for example if we try to retrive lots of data from database , the thread will wait till database gives us the information, once it receives it will give us data back.

Reactive approach doesn&#8217;t wait, say if we have to retrieve data from database it just notifies that client requires data after that the thread is free to serve another request. On the reactive database side once the data is ready it will send back to intended client using another thread.  
This approach will allow us to scale. Tomcat or any server as a limit of handling concurrent requests say 200 requests per second. What if all of them are waiting for blocking operations. Server will have slow down. Reactive approach helps here.

### Creating Simple Reactive API with Spring Boot

Let&#8217;s create a Reactive API with Spring boot and Mongo in new Functional approach  
Though we can use traditional style of programming using @Controller or @RestController , here we will create a CRUD api with Functional approach and will keep refining our approach in subsequent lectures.

**Step 1:**  
Download the project from <a href="http://start.spring.io" rel="nofollow">http://start.spring.io</a>  
Choose following dependencies  
1. spring-boot-starter-webflux (Spring Web Reactive)  
2. spring-boot-starter-data-mongodb-reactive (Reactive Mongo database)  
3. spring-boot-devtools (Devtool)  
4. org.projectlombok (Lombok)

We are using group id as: com.codingsaint.learning.microservices.reactive and artifact-id : user-service.

You can also [click here](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.1.8.RELEASE&packaging=jar&jvmVersion=1.8&groupId=com.codingsaint.learning.microservices.reactive&artifactId=user-service&name=user-service&description=Demo%20project%20for%20Spring%20Boot&packageName=com.codingsaint.learning.microservices.reactive.user-service&dependencies=webflux,data-mongodb-reactive,devtools,lombok) to download all dependencies  
<img class="alignnone size-full wp-image-510" src="https://i2.wp.com/codingsaint.com/wp-content/uploads/2019/09/ScreenshotReactiveSpringDependencies.png?resize=750%2C424&#038;ssl=1" alt="ScreenshotReactiveSpringDependencies" width="750" height="424" srcset="https://i2.wp.com/codingsaint.com/wp-content/uploads/2019/09/ScreenshotReactiveSpringDependencies.png?w=1342&ssl=1 1342w, https://i2.wp.com/codingsaint.com/wp-content/uploads/2019/09/ScreenshotReactiveSpringDependencies.png?resize=300%2C170&ssl=1 300w, https://i2.wp.com/codingsaint.com/wp-content/uploads/2019/09/ScreenshotReactiveSpringDependencies.png?resize=768%2C434&ssl=1 768w, https://i2.wp.com/codingsaint.com/wp-content/uploads/2019/09/ScreenshotReactiveSpringDependencies.png?resize=1024%2C579&ssl=1 1024w" sizes="(max-width: 750px) 100vw, 750px" data-recalc-dims="1" /> 

**Step 2**:  
Create a User bean (Mongodb document)  
package com.codingsaint.learning.microservices.reactive.userservice.model;

<pre class="prettyprint linenums java">import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class User {
private String id;
private String name;
private String email;
}
</pre>

**Step 3:** Create a UserRepository bean for reactive mongo db

<pre class="prettyprint linenums java">package com.codingsaint.learning.microservices.reactive.userservice.repository;

import com.codingsaint.learning.microservices.reactive.userservice.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends ReactiveMongoRepository&lt;User,String&gt; {
}
</pre>

**Step 4:** Instead of  Controller we will use a Router Function , It is just simple bean which will act as Router for us, here we can use functional style of mapping to create different routes.

<pre class="prettyprint linenums java">package com.codingsaint.learning.microservices.reactive.userservice;

import com.codingsaint.learning.microservices.reactive.userservice.model.User;
import com.codingsaint.learning.microservices.reactive.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Configuration
@RequiredArgsConstructor
public class UserRouteConfiguration {
    private final UserRepository userRepository;

    @Bean
    public RouterFunction userRoutes() {
        return RouterFunctions.route(
                RequestPredicates.GET("/users"), serverRequest -&gt;
                        ServerResponse.ok()
                                .body(BodyInserters.fromPublisher(
                                        userRepository.findAll(), User.class))
        ).andRoute(RequestPredicates.POST("/user"), serverRequest -&gt; {
            Mono user = serverRequest.bodyToMono(User.class);
            return ServerResponse.status(HttpStatus.CREATED)
                    .body(BodyInserters.fromPublisher(
                            user.flatMap(userRepository::save), User.class)
                    );
        }).andRoute(RequestPredicates.PUT("/user"), serverRequest -&gt; {
            Mono user = serverRequest.bodyToMono(User.class);
            return ServerResponse.status(HttpStatus.OK)
                    .body(BodyInserters.fromPublisher(
                            user.flatMap(userRepository::save), User.class)
                    );
        }).andRoute(RequestPredicates.GET("/user/{id}"), serverRequest -&gt; {
            String _id = serverRequest.pathVariable("id");
            return ServerResponse.ok()
                    .body(BodyInserters.fromPublisher(
                            userRepository.findById(_id), User.class));
        }).andRoute(RequestPredicates.DELETE("/user/{id}"), serverRequest -&gt; {
            String _id = serverRequest.pathVariable("id");
            return ServerResponse.noContent().build(userRepository.deleteById(_id));
        });
    }
}
</pre>

Step 5:  
add mongodb information to application.properties

<pre class="prettyprint linenums java">spring.data.mongodb.uri=mongodb://localhost/users</pre>

<.pre>

Start the application and you will be able to perform CRUD operation is Spring Reactive Mongodb User application.

<pre class="prettyprint linenums java"></pre>
