---
id: 97
title: 'Main class of Spring Boot @SpringBootApplication'
date: 2018-10-02T23:25:08+05:30
layout: kp_post
guid: http://codingsaint.com/?p=97
permalink: /2018/10/02/main-class-of-spring-boot-springbootapplication/
geo_public:
  - "0"
jabber_published:
  - "1538502910"
timeline_notification:
  - "1538502913"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/main-class-of-spring-boot-e28093-springbootapplication.png
categories:
  - Microservices
  - Spring
---
#### @SpringBootApplication

All Spring Boot Application have one class with main method as an entry point. Our application also has one , It’s UserServiceApplication.java under com.codingsaint.userservice package. If we look at code of this class.

<pre class="brush: java; title: ; notranslate" title="">package com.codingsaint.userservice;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class UserServiceApplication {
public static void main(String[] args) {
SpringApplication.run(UserServiceApplication.class, args);
}
}
</pre>

Here , we see the class with main as an entry point and annotated with @SpringBootApplication.

## @SpringBootApplication

A spring boot application starts from the class annotated with @SpringBootApplication ,so there must be one and at most one class with main method signature annotated with @SpringBootApplication.

@SpringBootApplication is the entry point of any Spring Boot application, This annotation is actually a combination of few other annotation, @SpringBootConfiguration , @EnableAutoConfiguration and @ComponentScan

### @SpringBootConfiguration

It tells that this class acts as a configuration class and can be used alternatively for @Configuration which is another standard annotation of Spring

### @EnableAutoConfiguration

It indicates that Spring will guess automatically the configuration classes that application will need and configure them. This is the reason Spring boot is said to have a very opinionated approach. Tough it’s opinionated approach doesn’t stop you to configure the way you wanted.EnableAutoConfiguration looks at the classpath to find the beans you would require at runtime and configure them.

### @ComponentScan

This annotation helps you to scan all Spring beans. It searches bean in packages you ask it to search, provided via value to annotation viz @ComponentScan({“my.awesome.package”}).

@SpringBootApplication with inbuilt @ComponentScan searches the packages in which main class is, and the packages below it. It means with our application structure it will search any class which is in com.codingsaint.userservice and sub packages i.e. com.codingsaint.userservice.* like com.codingsaint.userservice.vo or com.codingsaint.userservice.dao etc.

Now let’s make our application serve some web url requests . Since will start with a RESTful application , we will create controllers and map requests to its methods. We will ensure that if someone sends a URL request and it is valid , our application sends a valid response.
