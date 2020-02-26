---
id: 144
title: Working RESTful API in Spring Boot
date: 2018-10-14T06:00:39+05:30
author: Kumar Pallav
layout: post
guid: http://codingsaint.com/?p=144
permalink: /2018/10/14/working-restful-api-in-spring-boot/
geo_public:
  - "0"
jabber_published:
  - "1539480122"
timeline_notification:
  - "1539480124"
email_notification:
  - "1539480125"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/working-restful-api-in-spring-boot.jpg
categories:
  - Microservices
  - Spring
---
RESTful APIs have been all over the web development these days. RESTful API enables easy communication between systems using JSON/XML over age old HTTP protocols. This makes them easy and familiar to use with minimum learning curve.

With the knowledge of Basic annotation let’s make a working API . Here we will use H2 embedded database for our use and will try to perform CRUD using RESTful operations.

### Database Configuration

Let us start by configuring dataSource . As we know Spring boot has an opinionated approach , it does provide simple application properties to create a dataSource.

<table>
  <tr>
    <td>
      # H2<br /> spring.h2.console.enabled=true<br /> spring.h2.console.path=/h2<br /> # Datasource<br /> spring.datasource.url=jdbc:h2:file:~/user<br /> spring.datasource.username=sa<br /> spring.datasource.password=<br /> spring.datasource.driver-class-name=org.h2.Driver
    </td>
  </tr>
</table>

The first two properties are used for enabling H2 console. Since it is a embedded database these property allow us to use a UI to see the database and run queries. When system will start it will ensure that we can see the database at <a href="http://localhost:port_number/h2" rel="nofollow">http://localhost:port_number/h2</a>

After that we are using few default properties for creating data source. These are pretty standard properties to crete any dataSource i.e. database URL ,username ,password and driver. Here we are using H2 related configuration.

### A User RESTful API

Let’s start with creating an API for creating,updating,retrieving and deleting a User for an Application. We will keep things simple and below is our domain model for User

<pre class="brush: java; title: ; notranslate" title="">@Entity
public class User implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    public User() {
        super();
    }

   //getters and setters
}
</pre>

We are using few annotation from JPA to use it for inserting in database.

@Entity : Tells there should be a table for User object.

@Id : denotes that the field will be used as a primary key.

@GeneratedValue: Let’s decide how that primary key will be generated , in our case it is GenerationType.AUTO which means it will be automatically generated with increments.

Now once we have a full User object and Entity , let’s see how our easily and magically we will be adding a way to operate database related operation.

The Repositories

We will be creating a simple repository which will help us to talk to database and do User related operation. Using JPA we can create an interface say UserRepository and that will help us to perform CRUD operations over User table.

<pre class="brush: java; title: ; notranslate" title="">package com.codingsaint.tutorial.spring.userservice.repository;

import com.codingsaint.tutorial.spring.userservice.model.User;
@Repository
public interface UserRepository extends
JpaRepository&lt;User,Long&gt; {

}

</pre>

If you see above interface we annotated it with @Repository to make it a Spring bean and also to demote that this bean does an database related operation. Further we extented it to JPARepository enabling it to do CRUD operations. Now JPARepository has methods like save, get, getAll, delete which will be available to UserRepository by default.

Let’s autowire it to a Controller and handle incoming HTTP requests.

### Rest Controller

Now we will create a controller which will help us to communicate with clients . Let’s start with saving an object.Below is sample Rest Controller we are using.

<pre class="brush: java; title: ; notranslate" title="">@RestController
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@RequestMapping(path = { "/user" }, method = RequestMethod.POST)
	public ResponseEntity&lt;Void&gt;add(@RequestBody User user) {
		ResponseEntity&lt;Void&gt; response = null;
		try {
			userRepository.save(user);
			response = new ResponseEntity&lt;&gt;(HttpStatus.OK);
		} catch (Exception e) {
			response = new ResponseEntity&lt;&gt;(HttpStatus.EXPECTATION_FAILED);
		}
		return response;
	}
}</pre>