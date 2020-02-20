---
id: 108
title: 'Mapping a URL request in Spring Boot : @RequestMapping'
date: 2018-10-03T23:54:50+05:30
author: Coding Saint
layout: post
guid: http://codingsaint.com/?p=108
permalink: /2018/10/03/mapping-a-url-request-in-spring-boot-requestmapping/
geo_public:
  - "0"
jabber_published:
  - "1538591100"
timeline_notification:
  - "1538591103"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/mapping-a-url-request-in-spring-boot-requestmapping.png
categories:
  - Microservices
  - Spring
tags:
  - RequestMapping
  - RESTAPI
  - RESTful
  - Spring
  - SpringBoot
---
#### @RestController

To start let’s make a Controller , Spring gives a specific controller i.e. @RestController to ensure that all methods within it , returns a REST enabled response. It automatically marshalls and unmarshal incoming JSON/XML request to Java object and sends response of Java objects as JSON/XML output.

We will create a class UserController under package com.codingsaint.userservice.controller and annotate it with @RestController.

<table>
  <tr>
    <td>
      <pre class="brush: java; title: ; notranslate" title="">
package com.codingsaint.userservice.controller;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class UserController {
}
</pre>
    </td>
  </tr>
</table>

Here RestController is denotes that this class has to act as a Controller and server incoming requests. The method within it , will be mapped with @RequestMapping to map the requests.

## @RequestMapping

@RequestMapping is used for mapping incoming requests to specific method. Obviously for each request , we should have a dedicated unique method. In web application , a request is made of URL path , HTTP verbs like GET , PUT ,POST ,DELETE etc and headers . Each URL with combination of these verb and headers(if added) is unique and for each unique request we must have a unique method handling it.

For example , let’s consider a URL as “_/v1/user/{id}”_ . Here v1 is our api version , and id is the unique it of the user, If we use GET HTTP verb along with the URL to hit the server , it should be considered as request for getting user information with the provided id. At the same time if we use DELETE , it should be considered as deleting the details of user with same id. In both cases we should have a dedicated method annotated with @RequestMapping the handling incoming request.

@RequestMapping can be used at class level as well as on method level. Once used on class level , it is appended to all the method level request mappings. For example , in above method created UserController class we are supposed to map requests for user where version of our API will be v1 , so if we map v1 at class level , we don’t have to map it at all methods inside the class used for mapping URLs.

Let is create a mapping for getting all users but before that we need a user object. We will create a simple POJO class with id , first name, last name and email. We will create User.java inside com.codingsaint.userservice.models , where models denoting package for our model classes.

<table>
  <tr>
    <td>
      <pre class="brush: java; title: ; notranslate" title="">
package com.codingsaint.userservice.models;
public class User{
private Long id;
private String firstName;
private String lastName;
private String email;
//Getters and setters : Do add them
}

</pre>
    </td>
  </tr>
</table>

In above class we have removed getters and setters for readability , please add them.

Now we will add @RequestMapping at class and methods levels to handle incoming request.

<table>
  <tr>
    <td>
      <pre class="brush: java; title: ; notranslate" title="">

@RestController
@RequestMapping("v1")
public class UserController {
private List users = new ArrayList();
@RequestMapping(value = "users", method = RequestMethod.GET)
protected List getUsers() {
User user = new User();
user.setId(1L);
user.setEmail("user@unknown.com");
user.setFirstName("Ray");
user.setLastName("McFallen");
users.add(user);
return users;
}
}

</pre>
    </td>
  </tr>
</table>

Here we don’t have a database yet, so we have taken a List and initialize it with a dummy user. Now after running UserServiceApplication.java (as a java program/ as spring boot app),with POSTMAN ,ARC (chrome plugins) or with a CURL request , we can see a valid response. Currently if we run it , the application will be up at <a href="http://localhost:8080/" rel="nofollow">http://localhost:8080/</a> and with URL request mapped at <a href="http://localhost:8080/v1/users" rel="nofollow">http://localhost:8080/v1/users</a> , we get following result.

<table>
  <tr>
    <td>
      [<br /> {<br /> &#8220;id&#8221;: 1,<br /> &#8220;firstName&#8221;: &#8220;Ray&#8221;,<br /> &#8220;lastName&#8221;: &#8220;McFallen&#8221;,<br /> &#8220;email&#8221;: &#8220;user@unknown.com&#8221;<br /> }<br /> ]
    </td>
  </tr>
</table>

Following is a screenshot from POSTMAN

<img class="aligncenter" title="" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2018/10/null2.png?resize=601%2C261&#038;ssl=1" alt="" width="601" height="261" data-recalc-dims="1" /> 

RequestMapping annotation by default works as explained but it can be used with more parameters like consumes, produces, path, name ,headers and params ,path and value are alias of each other. We can have two different methods handing same signature based on URL ,HTTP Verb but different acceptance header.

Let’s add another method as below

<table>
  <tr>
    <td>
      <pre class="brush: java; title: ; notranslate" title="">

@RequestMapping(value = "users", method = RequestMethod.GET ,
headers = "app-id=my-awesome-app")
protected List getUsersWithAppIdHeader() {
return new ArrayList();
}

</pre>
    </td>
  </tr>
</table>

With addition of this method we can send one request as above and one with header value , app-id=my-awesome-app and both will be resolved separately. Below is the screenshot of same , sending empty list as response.<img class="aligncenter" title="" src="https://i0.wp.com/codingsaint.com/wp-content/uploads/2018/10/image4.png?resize=586%2C245&#038;ssl=1" alt="" width="586" height="245" data-recalc-dims="1" />

It is also interesting to note that value, header, consumes ,accepts all accept array , so we can send multiple values to it , which means we can map multiple URL signature to one method but not exactly same URL signature to multiple method which will confuse application to hit which method in case of incoming request.
