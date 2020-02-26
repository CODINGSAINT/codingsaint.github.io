---
id: 539
title: Adding Test Cases to Reactive Spring
date: 2019-10-16T06:53:42+05:30
author: Kumar Pallav
layout: post
guid: https://codingsaint.com/?p=539
permalink: /2019/10/16/adding-test-cases-to-reactive-spring/
image: /wp-content/uploads/2019/10/Spring-Boot-_Type-Safe-Configuration-Properties.png
categories:
  - Microservices
  - Spring
tags:
  - Reactive Spring
  - Spring Boot Microservices
  - SpringBoot
series:
  - Reactive Spring Boot Microservices
---
> Github source code :  
> <a href="https://github.com/CODINGSAINT/springboot-rective-microservices-with-reactjs" rel="nofollow">https://github.com/CODINGSAINT/springboot-rective-microservices-with-reactjs</a>

In last 2 lectures, we have seen how to create a Reactive Web API and adding a separate Handler class to keep logic simpler and code organised. In this Lecture we will look at writing test cases for Reactive API.

Writing test cases for imperative programming is  simpler as we know it executes line by line. Let us look how to we write Reactive API test case.

Here we have created different test cases for all of the API. We have autowired WebTestClient which act as test restTemplate. It will help us to call a reactive API with GET/PUT/POST/DELETE.

We have also created a static id field which we will be initialising at init method (which is only called while testing POST) . The initialized variable will be used at other test methods ,it will help us to create a user with unique id, update , retrieve and delete same user.

Now , look at the different test cases the first one is for create i.e. addUserTest

<pre class="prettyprint linenums java">@Test
    public void addUserTest() {
        init();
        User user= new User();
        user.setId(id);
        user.setName("Namish");
        user.setEmail("namish@codingsaint.com");

       webTestClient.post()
                .uri("/user")
                .body(Mono.just(user), User.class)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isCreated()
                .expectBody()
                .jsonPath("$.id").isNotEmpty()
                .jsonPath("$.name").isEqualTo("Namish");


    }
</pre>

Here we create User with unique id. We use webTestClient to post . It also help us to post a user as we do with restTemplate. We have configured that it accepts JSON with UTF-8. Once we call exchange it will call the rest endpoint. This endpoint is excepted to send HTTP status as 201 ,it has a body with ID field present and name equals to Namish.

<pre class="prettyprint linenums java">@Test
    public void getAllUsers(){
        webTestClient.get().uri("/users")
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(MediaType.APPLICATION_JSON_UTF8)
                .expectBodyList(User.class);
    }

</pre>

With User been already intersted, Let&#8217;s verify if list of users can be tested. Here we expect &#8220;users&#8221; endpoint to return HTTP status as OK (200) with Json output and List should contain Users as body.

<pre class="prettyprint linenums java">@Test
    public  void  getUser (){
        webTestClient.get().uri("/user/{id}" , Collections.singletonMap("id" ,id))
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .exchange()
                .expectStatus().isOk()
                .expectBody()
                .jsonPath("$.id").isEqualTo(id);

    }
</pre>

Now we can test getting User based on ID, In above test case we are verifying getting the user we inserted with id. This ID we can access as we made it static and initialized it while testing save user.

<pre class="prettyprint linenum java">@Test
    public  void  deleteUser (){
        webTestClient.delete().uri("/user/{id}" , Collections.singletonMap("id" ,id))
                .exchange()
                .expectStatus().isNoContent();
    }
}

</pre>

At last let&#8217;s delete the user. We expect no content.

The full source of Test class is below.

<div class="gist-oembed" data-gist="9f74943e83fa55533d6ac526a3713586.json" data-ts="8">
</div>