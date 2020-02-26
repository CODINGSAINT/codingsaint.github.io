---
id: 119
title: Creation of jar in Spring Boot
date: 2018-10-05T23:16:11+05:30
author: Kumar Pallav
layout: post
guid: http://codingsaint.com/?p=119
permalink: /2018/10/05/creation-of-jar-in-spring-boot/
jabber_published:
  - "1538761573"
timeline_notification:
  - "1538761574"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/creating-jar-in-spring-boot.jpg
categories:
  - Microservices
  - Spring
tags:
  - embedded tomcat
  - RESTful
  - Spring
  - SpringBoot
  - tomcat
---
#### Creating a JAR

In Spring Boot application , inside pom file we have following build dependency which enables our application to create a JAR.

&nbsp;

The above plugin helps maven to build a runnable JAR. In order to do so , type maven package command from prompt and a jar will be build.

<pre class="brush: xml; title: ; notranslate" title="">&lt;build&gt;
&lt;plugins&gt;
&lt;plugin&gt;
&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
&lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
&lt;/plugin&gt;
&lt;/plugins&gt;
&lt;/build&gt;

</pre>

mvn package

<img title="" src="https://i2.wp.com/codingsaint.com/wp-content/uploads/2018/10/null3.png?resize=624%2C145&#038;ssl=1" alt="" width="624" height="145" data-recalc-dims="1" /> 

In above screenshot , we can see that a jar is build at target folder. We can run the Jar and even ship it as standalone application. It has embedded tomcat, so we don’t require a separate tomcat instance to deploy it.

To run it as standalone application run with command :-

java -jar user-service-0.0.1-SNAPSHOT.jar

<img title="" src="https://i2.wp.com/codingsaint.com/wp-content/uploads/2018/10/null4.png?resize=624%2C133&#038;ssl=1" alt="" width="624" height="133" data-recalc-dims="1" />
