---
id: 146
title: 'Configuration and Properties : Spring Boot : Part 1'
date: 2018-10-15T06:00:14+05:30
author: Kumar Pallav
layout: post
guid: http://codingsaint.com/?p=146
permalink: /2018/10/15/configuration-and-properties-spring-boot-part-1/
geo_public:
  - "0"
jabber_published:
  - "1539566597"
timeline_notification:
  - "1539566599"
email_notification:
  - "1539566600"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/configuration-and-properties-spring-boot-part-1.png
categories:
  - Microservices
  - Spring
---
#### Configuration and Properties

Spring Boot as said is having an opinionated approach. It comes up with range of pre configuration options. Once we initialize application we have application.properties file available in our application. Since application.properties is already at classpath , Spring Boot allows you to use it for any configuration, be it yours or overriding existing spring boot configuration.

Let’s see one simple example , In our last chapter we created a sample spring boot application. It has a embedded tomcat server. Spring Boot has an opinion that tomcat server should use 8080 as default port. In reality it will not be always possible to run our application on 8080 , there could be cases where 8080 is already occupied by some other application or we by some reason want it to run on some port other than 8080. We have file application.properties which we can make use of , spring boot provides a property called “server.port” if added to application.properties file will override Spring boot opinion of 8080.

Let’s add server.port in application.properties file.

server.port=8081

<img title="" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2018/10/image5.png?resize=484%2C149&#038;ssl=1" alt="" width="484" height="149" data-recalc-dims="1" /> 

Once you add above property in spring boot application properties and server starts, you can see it running at 8081 now. In above figure you can also see , Spring Tool Suite suggesting extra possible value. These are defaults which come with spring boot application and spring has given us the chance to override these defaults. We can find the list of all defaults at

<https://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html>

We can simply configure from server port to database settings (like dataSource) by adding values in application.properties. We can add even custom property and use it. We will be using many of the available properties as we go along this book.

Let us also have a look on how can we use application.properties further and can get the values from properties file to our java classes.

### @Value

As we have seen that we can define our properties at application.properties , there should be a easy way to get this values at our java files. @Value is the annotation to help us.

Let’s see how can we use it. Let’s define one property spring.application.name , this is a default Spring boot property ( already given by Spring Boot) , we will try to access it in our controller using @Value annotation.

We will add the line below at application.properties file

spring.application.name=user-service

Once added let’s add a string named applicationName to our controller , We will also also add a method to access it , say applicationName which will only return us the application name.We will use existing UserController to test, Add following code snippet insite UserController.

<pre class="brush: java; title: ; notranslate" title="">@Value("${spring.application.name}")
private String applicationName;
@RequestMapping("app-name")
protected String getApplicationName() {
return applicationName;
}
</pre>

In above code we are not initializing applicationName variable , yet we will be able to get the value which we have added in application.properties via @Value annotation.

If we hit URL we will get the value for spring.application.name bound to applicationName variable

<img title="" src="https://i0.wp.com/codingsaint.com/wp-content/uploads/2018/10/null5.png?resize=324%2C117&#038;ssl=1" alt="" width="324" height="117" data-recalc-dims="1" /> 

 
