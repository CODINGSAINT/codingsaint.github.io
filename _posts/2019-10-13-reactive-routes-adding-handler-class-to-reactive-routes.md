---
id: 525
title: 'Reactive Routes : Adding Handler class to Reactive Routes'
date: 2019-10-13T04:54:25+05:30
author: Kumar Pallav
layout: post
guid: https://codingsaint.com/?p=525
permalink: /2019/10/13/reactive-routes-adding-handler-class-to-reactive-routes/
categories:
  - Microservices
  - Spring
tags:
  - Reactive Spring
series:
  - Reactive Spring Boot Microservices
---
In [Last lecture](https://codingsaint.com/2019/09/28/creating-reactive-rest-api-with-spring-boot-and-mongodb/) we created Spring Boot endpoints using Reactive Webflux . While writing code we added all the Handler method as a part of our Route Mapping . While it is fine, we programmers have a responsibility to write clean and maintainable code.

Let&#8217;s create a separate Handler class and use its reference at routes to make code look  simpler and readable.

Step 1: Create a Handler Class:

<pre>package com.codingsaint.learning.microservices.reactive.userservice.handler;

import com.codingsaint.learning.microservices.reactive.userservice.model.User;
import com.codingsaint.learning.microservices.reactive.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserHandler {
    private final UserRepository userRepository;

    public Mono getAll(ServerRequest serverRequest) {
        Mono user = serverRequest.bodyToMono(User.class);
        return ServerResponse.ok()
                .body(BodyInserters.fromPublisher(
                        userRepository.findAll(), User.class));
    }

    public Mono add(ServerRequest serverRequest) {
        Mono user = serverRequest.bodyToMono(User.class);
        return ServerResponse.status(HttpStatus.OK)
                .body(BodyInserters.fromPublisher(
                        user.flatMap(userRepository::save), User.class));
    }

    public Mono update(ServerRequest serverRequest) {
        Mono user = serverRequest.bodyToMono(User.class);
        return ServerResponse.status(HttpStatus.OK)
                .body(BodyInserters.fromPublisher(
                        user.flatMap(userRepository::save), User.class));
    }

    public Mono delete(ServerRequest serverRequest) {
        String _id = serverRequest.pathVariable("id");
        return ServerResponse.noContent().build(userRepository.deleteById(_id));
    }

    public Mono get(ServerRequest serverRequest) {
        String _id = serverRequest.pathVariable("id");
        return ServerResponse.ok()
                .body(BodyInserters.fromPublisher(
                        userRepository.findById(_id), User.class));
    }
}
</pre>

Step 2:  Autowire the Handler in Route class and use it&#8217;s reference

<pre>package com.codingsaint.learning.microservices.reactive.userservice.routes;

import com.codingsaint.learning.microservices.reactive.userservice.handler.UserHandler;
import com.codingsaint.learning.microservices.reactive.userservice.model.User;
import com.codingsaint.learning.microservices.reactive.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.*;
import reactor.core.publisher.Mono;

@Configuration
@RequiredArgsConstructor
public class UserRouteConfiguration {
    private final UserRepository userRepository;
    private final UserHandler userHandler;

    @Bean
    public RouterFunction userRoutes() {
        return RouterFunctions.route(
                RequestPredicates.GET("/users"), userHandler::getAll)
                .andRoute(RequestPredicates.POST("/user"), userHandler::add)
                .andRoute(RequestPredicates.PUT("/user"), userHandler::update)
                .andRoute(RequestPredicates.GET("/user/{id}"), userHandler::get)
                .andRoute(RequestPredicates.DELETE("/user/{id}"), userHandler::delete);
    }

}
</pre>

You can see that the Route class now looks much cleaner with Handler methods references. We also achieved some degree of separation on concern.  
In next lecture let&#8217;s look at writing test cases for our API.