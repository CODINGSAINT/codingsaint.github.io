---
id: 80
title: Developing First spring boot application
date: 2018-10-01T23:52:12+05:30
author: Coding Saint
layout: post
guid: http://codingsaint.com/?p=80
permalink: /2018/10/01/developing-first-spring-boot-application/
jabber_published:
  - "1538418133"
timeline_notification:
  - "1538418135"
image: /wp-content/uploads/2018/10/developing-first-spring-boot-application1.jpg
categories:
  - Microservices
  - Spring
---
Spring Boot currently support Java, Kotlin and Groovy as language preference to create an application. You can also choose Maven or Gradle as a build automation tool. You can choose your favourite IDE ranging from Netbeans, IntelliJ ,Eclipse or Spring Tool Suite.

We will be using Java and Maven with Spring Tool Suite.

We can create a Spring Boot application in different ways.

  * Creating a maven project and adding dependencies
  * Using Spring Tool Suite (STS )/IntelliJ built in feature
  * Using Spring Initializr : <https://start.spring.io>

We will be using STS built in feature and will also look at Spring Initializr. In order to create first spring boot application using STS , click on File → New → Spring Starter Project.<img title="" src="https://i2.wp.com/codingsaint.com/wp-content/uploads/2018/10/null.png?resize=624%2C84&#038;ssl=1" alt="" width="624" height="84" data-recalc-dims="1" />

<img title="" src="https://i2.wp.com/codingsaint.com/wp-content/uploads/2018/10/image.png?resize=329%2C428&#038;ssl=1" alt="" width="329" height="428" data-recalc-dims="1" /> 

It will open a popup , where default values can be modified.

We have modified name, group ,artifact and package default values.

Once modified as per your requirement ,click “Next”.

Now select Web from web stack and Devtools from Core stack.<img title="" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2018/10/image1.png?resize=286%2C369&#038;ssl=1" alt="" width="286" height="369" data-recalc-dims="1" />

Selecting Dev Tool is optional. It is just because of personal choice of not starting application again and again on saving the files. We will learn about DevTool later.

Web is an obvious choice as we are going to learn a web based Spring Boot application.

Click Finish. Now we have a sample Spring boot application ready to go.

<img title="" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2018/10/image2.png?resize=324%2C342&#038;ssl=1" alt="" width="324" height="342" data-recalc-dims="1" /> 

After clicking on finish , we will have project structure as shown in figure below.

Here UserServiceApplication.java inside com.codingsaint.userservice is the main class and entry point to our application.

Every Spring Boot Application has a main class, which acts as the entry point to application.

Let’s run it and see if Spring Boot application is really this easy to start and run. You can run it as a Java Application by right clicking on file and selecting Run as from menu and selecting “ Java Application” or “Spring Boot App” as an option.

Once you run it , you can see output as below on console ,where it does tell that application is running on port 8080.

<img title="" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2018/10/null1.png?resize=624%2C104&#038;ssl=1" alt="" width="624" height="104" data-recalc-dims="1" /> 

In browser open <a href="http://localhost:8080/" rel="nofollow">http://localhost:8080/</a> and verify if server is up. Following output with 404 (default 404 of Spring Boot application) tells that server is up and running and obviously we have nothing mapped to be displayed for base URL so we are seeing this 404 error page.

In Next section , we will see how to handle incoming requests properly. We will also dive in Spring Boot Basics.<img title="" src="https://i0.wp.com/codingsaint.com/wp-content/uploads/2018/10/image3.png?resize=364%2C152&#038;ssl=1" alt="" width="364" height="152" data-recalc-dims="1" />

##