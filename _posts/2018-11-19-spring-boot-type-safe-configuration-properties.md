---
id: 218
title: Spring Boot :Type Safe Configuration Properties
date: 2018-11-19T00:21:44+05:30
author: Kumar Pallav
layout: post
guid: https://codingsaint.com/?p=218
permalink: /2018/11/19/spring-boot-type-safe-configuration-properties/
image: /wp-content/uploads/2018/11/Spring-Boot-_Type-Safe-Configuration-Properties.png
categories:
  - Microservices
  - Spring
tags:
  - Configuration
  - Microservices
  - RESTful
  - SpringBoot
---
property to be read from yaml or properties file. The number of variable we will be declaring would be way too many.  
This problem looks more ugly in case if we require similar kind (read group) of properties. For example in case of properties related to Database or Security related configurations. Below is such a example :

<pre><pre class="brush: java; title: ; notranslate" title="">
# application.properties
#For using @ConfigurationProperties
application.name=User Application
application.version=1.0.0
application.description = ${app.name} - ${app.version} is an application to store user details
.application.security.enabled=true
application.security.user=admin
application.security.email= unk@unk.com
application.security.roles[0]=USER
application.security.roles[1]=ADMIN

</pre>


<p>
  Here if we try to read variables , tough all variables are related to app(which is at top level of hierarchy ), we will end up creating many variable to read each property from YAML , this might even make our class look ugly if number of properties increases significantly.<br />
  Spring provides a simple way to help us. We can create a class and bind all the properties from configuration files like YAML or properties . We can create a class with
</p>


<p>
  @ConfigurationProperties<br />
  For above configuration let’s create a class and verify that it works.
</p>


<pre><pre class="brush: java; title: ; notranslate" title="">

@ConfigurationProperties(prefix = "application")
@Component
public class AppConfig {
private String name;
private String version;
private String description;
private Security security;
//getters and setters
}

</pre>


<p>
  We can create a security class and use it inside AppSecurity , values corresponding to app.security will be set inside it.
</p>


<p>
  Security.java
</p>


<pre><pre class="brush: java; title: ; notranslate" title="">
public class Security {
private String user;
private String email;
private String [] roles;
//getters and setters
}

</pre>


<p>
  Now let’s autowire AppConfig class in our CommonController and create a request mapping to see that it works.
</p>


<p>
  Inside CommonController.java
</p>


<p>
  Add a Autowired variable for AppConfig
</p>


<pre><pre class="brush: java; title: ; notranslate" title="">

@Autowired
private AppConfig appConfig;
</pre>


<p>
  And then add a request mapping which returns AppConfig. If bindings are correct ,it will return all the values.
</p>


<pre><pre class="brush: java; title: ; notranslate" title="">

@RequestMapping("app-config")
protected AppConfig appConfig(){
return appConfig;
}

</pre>


<p>
  Once done , lets verify if the entire code is working well . Just hit URL : <a href="http://localhost:8081/v1/app-config" rel="nofollow">http://localhost:8081/v1/app-config</a><br />
  You should be getting following response.
</p>


<pre>

{
"name": "User Application",
"version": "1.0.0",
"description": "User Application - 1.0.0 is an application to store user details",
"security": {
"user": "admin",
"email": "unk@unk.com",
"roles": [
"USER",
"ADMIN"
]
}
}

</pre>


<p>
  This shows how easily we can have a type safe and less verbose property file reading using , @ConfigurationProperties.
</p>