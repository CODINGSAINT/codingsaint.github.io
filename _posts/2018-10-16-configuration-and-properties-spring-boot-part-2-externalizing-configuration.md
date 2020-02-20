---
id: 150
title: 'Configuration and Properties : Spring Boot : Part 2 &#8211; Externalizing Configuration'
date: 2018-10-16T06:00:27+05:30
author: Coding Saint
layout: post
guid: http://codingsaint.com/?p=150
permalink: /2018/10/16/configuration-and-properties-spring-boot-part-2-externalizing-configuration/
geo_public:
  - "0"
jabber_published:
  - "1539650306"
timeline_notification:
  - "1539650307"
email_notification:
  - "1539650308"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/configuration-and-properties-_-spring-boot-_-part-2-externalizing-configuration.png
categories:
  - Microservices
  - Spring
tags:
  - Java
  - Microservices
  - Spring
  - SpringBoot
---
#### Externalizing Configuration

Spring boot allows you to externalize your configuration properties. Above we saw, one way to do so using application.properties. There are various way to tell your application about properties required by your application i.e. it is not only limited to defining in application.properties .

Below are the ways you can define your properties. It is in order of preference which means , if same property is defined via two different ways , the one with higher precedence will be taken and the one with lower precedence value will be ignored.

  1. Devtools global settings properties on your home directory (~/.spring-boot-devtools.properties when devtools is active).
  2. @TestPropertySource annotations on your tests.
  3. @SpringBootTest#properties annotation attribute on your tests.
  4. **Command line arguments.**
  5. Properties from SPRING\_APPLICATION\_JSON (inline JSON embedded in an environment variable or system property)
  6. ServletConfig init parameters.
  7. ServletContext init parameters.
  8. JNDI attributes from java:comp/env.
  9. Java System properties (System.getProperties()).
 10. OS environment variables.
 11. A RandomValuePropertySource that only has properties in random.*.
 12. Profile-specific application properties outside of your packaged jar (application-{profile}.properties and YAML variants)
 13. Profile-specific application properties packaged inside your jar (application-{profile}.properties and YAML variants)
 14. Application properties outside of your packaged jar (application.properties and YAML variants).
 15. **Application properties packaged inside your jar (application.properties and YAML variants).**
 16. @PropertySource annotations on your @Configuration classes.
 17. Default properties (specified using SpringApplication.setDefaultProperties).

The above list is taken from spring documentation present at <https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html>

Tough it is good to know that there are several ways to define the properties which will be used for our application , it is hardly a chance that you will use all of them in our application . We will normally use them on need basis.

In order to verify the order of precedence , we can test it. In above list the number 4th (command line) and 15th (application.properties inside jar) are marked as bold. As per precedence order command line takes higher precedence over application.properties inside our jar file.

We already have application.properties with server.port =8081 , let’s add a command line argument of same before starting application and verify if our server starts at different port.

Currently our server starts at 8081 , say we want application to pick 8082 and ignore the value provided by application.properties (or application.yml) . We can provide command line arugument directly by invoking jar file made by build with command parameter like

<pre class="brush: java; title: ; notranslate" title="">java -jar user-service-0.0.1-SNAPSHOT.jar --server.port=8082
</pre>

Since we are developing via an IDE , we can use IDE to add it for us , in STS or Eclipse you can right click on project , go to Run As -> Run Configuration

 

<img title="" src="https://i2.wp.com/codingsaint.com/wp-content/uploads/2018/10/image6.png?resize=274%2C350&#038;ssl=1" alt="" width="274" height="350" data-recalc-dims="1" /> 

 

Inside Run Configuration , open Arguments tab and add &#8211;server.port =8082 as shown below.

You can now see our server now starting at 8082.

<img title="" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2018/10/image7.png?resize=318%2C248&#038;ssl=1" alt="" width="318" height="248" data-recalc-dims="1" /> 

 

<img title="" src="https://i0.wp.com/codingsaint.com/wp-content/uploads/2018/10/null6.png?resize=624%2C80&#038;ssl=1" alt="" width="624" height="80" data-recalc-dims="1" /> 

 

Now since we have already externalised configuration , we would see some other popular usage of configuration.
