---
layout: post
title:  "Quarkus IO"
date:   2020-02-17 20:39:11 +0530
categories: [quarkus,java]
---



Quarkus IO is a microservices based java framework. According to QuarkusIO website , Quarkus is "_A Kubernetes Native Java stack tailored for OpenJDK HotSpot & GraalVM, crafted from the best of breed Java libraries and standards_". This course will talks about creating microservices based on Quarkus. We will be going through

1.  Installing required software for understanding full features of Quarkus
2.  Building Todo and User Microservices using Quarkus
3.  Building superfast native images
4.  Writing test cases
5.  Using Hibernate and Mongodb database as backend
6.  Creating microservices architecture using Fallbacks and distributed logginh
7.  deploying them in cloud

Installing Software
===================

In this section we will look at installing software required for this course. This is a prerequisite if you want to follow along this course. We will be installing . We will be installing on Linux based system but you can install on your desired operation system

1.  JDK 1.8+
2.  Maven 3.6.X
3.  GraalVM
4.  Docker

JDK
---

To install JDK go to official website and download the latest version for your operating system.On a linux laptop with Ubuntu you can follow the steps as well

1.  Open terminal
2.  write following commands

    
                sudo add-apt-repository ppa:openjdk-r/ppa
                sudo apt update
                sudo apt install open-jdk-8-jdk
                export JAVA_HOME=/usr/lib/jvm/java-8-openjdk
                export PATH=$PATH:$JAVA_HOME/bin
            

Check the installed version

    java -version

Maven 3.6.X
-----------

Maven is a build tool it will help us to create builds effectively. To install maven visit maven website and download latest maven. Unzip it and add to path. JAVA\_HOME must be set to use maven

    unzip apache-maven-3.6.3-bin.zip
                export PATH=/opt/apache-maven-3.6.3/bin:$PATH

GraalVM
-------

GraalVM is a virtual machine by oracle which enables user to create native images. Native images are faster and has lower memory footprint. GraamVM enable local executables and the binary created by it is independent of JVM it runs faster. It must be noticed that while creating native builds GraalVM do analyse all the classes your code will use at its entire life cycle and the compiles to byte code , the entire process is a bit slow. Run below commands to install GraalVM on linux (ubuntu)

    
                sudo apt-get install build-essential libz-dev zlib1g-dev
            

You can install GraamVM community edition or can download enterprise edition from oracle website. If you have a enterprise edition tar file downloaded

    
                tar -xvf graalvm-ee-java11-linux-amd64-19.3.1.tar.gz
                export GRAALVM_HOME=/home/coding/Documents/Softwares/graalvm-ee-java11-19.3.1/
            

If you have enterprise edition installed download native jar and run following command

    
                ${GRAALVM_HOME}/bin/gu install native-image --filr native-image-installable-svm-svmee-java11-linux-amd64-19.3.1.jar
            

Docker
------

To install docker at Ubuntu we can use following commands

    
             sudo apt install apt-transport-https ca-certificates curl software-properties-common
             curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
             sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic test"
             sudo apt update
             sudo apt install docker-ce
            

For detailed documentation of installation on any platform https://docs.docker.com/

Creating User Microservices
===========================

In this section we will create our first microservice. We will create user-service which will help us to perform crud operations on user. User service will have mogodb as back end . We will create it using maven command ,Alternatively we can also use generator site i.e [https://code.quarkus.io](https://code.quarkus.io)

Creating user-service using maven
---------------------------------

Open terminal and type following command.

    
    		mvn io.quarkus:quarkus-maven-plugin:1.2.0.Final:create \
                -DprojectGroupId=com.codingsaint.learning.quarkus \
                -DprojectArtifactId=user-service \
                -DclassName="com.codingsaint.learning.quarkus.UserResource" \
                -Dpath="/user"

> While the above command will only a bare project which you can run using simple maven command. We will be adding the dependencies later , just to understand how can we use quarkus maven extension to add dependencies ,Obviously both steps can be combined together.

    
             cd user-service
             mvn quarkus:dev
            

Running application in dev mode
-------------------------------

The command to run in dev mode is

    
             mvn quarkus:dev
            

This will start the server in dev mode.In dev mode if you edit the code and do a change it will stop quarkus (not JVM), recompile and start quarkus . This works as live reload and is very helpful in dev mode

building native image
---------------------

Quarkus comes with integrated support for building native images , you can build bare metal or docker based images.To create a image run the below command

    mvn package -Pnative

It must be noted that this is a maven profile for building native images and to support this GraalVM must be installed with native jar as mentioned above.   To build native for docker image add

    -Dnative-image.docker-build=true

Adding dependencies
-------------------

We will be using below command to add dependecies

    mvn quarkus:add-extension -Dextensions=hibernate-validator,mongodb-panache,resteasy-jsonb

It must be noted that we could have added extensions while creating the project itself adding -D extension , this is just to show , how to add dependencies using maven. You can find list of all the available dependencies at [https://quarkus.io/extensions/](https://quarkus.io/extensions/)

Creating User entity
--------------------

            `package com.codingsaint.learning.quarkus;

        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;

        import javax.validation.Valid;
        import javax.ws.rs.*;
        import javax.ws.rs.core.MediaType;
        import javax.ws.rs.core.Response;
        import java.util.UUID;

        @Path("/users")
        public class UserResource {

            private static final Logger LOGGER = LoggerFactory.getLogger(UserResource.class);

            /**
             * Get all of the users
             *
             * @return Response> users
             */
            @GET
            @Produces(MediaType.APPLICATION_JSON)
            public Response users() {
                return Response.ok(User.listAll()).build();
            }

            /**
             * Create the user
             *
             * @param user
             * @return
             */
            @POST
            @Produces(MediaType.APPLICATION_JSON)
            @Consumes(MediaType.APPLICATION_JSON)
            public Response users(final @Valid User user) {
                user.setUserId(UUID.randomUUID().toString());
                user.setActive(true);
                User.persist(user);
                return Response.ok().build();
            }

            /**
             * Update the user
             *
             * @param user
             * @return
             */
            @PUT
            @Produces(MediaType.APPLICATION_JSON)
            @Consumes(MediaType.APPLICATION_JSON)
            public Response update(final @Valid User user) {
                user.update();
                return Response.ok(user).build();
            }

            /**
             * retrieve user based on userId
             *
             * @param userId
             * @return Response */
            @GET
            @Produces(MediaType.APPLICATION_JSON)
            @Consumes(MediaType.APPLICATION_JSON)
            @Path("id/{id}")
            public Response getUserByUserId(@PathParam("id") String userId) {
                User user = User.findByUserId(userId);
                LOGGER.info(" finding user based on userId {}", userId);
                return Response.ok(user).build();
            }

            /**
             * delete user based on userId
             * @param userId
             * @return
             */
            @DELETE
            @Path("id/{id}")
            public Response deleteUser(@PathParam("id") String userId) {
                LOGGER.info(" delete user based on userId {}", userId);
                User.delete("userId",userId);
                return Response.noContent().build();
            }

        }` 

Adding UserResource

    
                package com.codingsaint.learning.quarkus;
    
                import javax.validation.Valid;
                import javax.ws.rs.*;
                import javax.ws.rs.core.MediaType;
                import javax.ws.rs.core.Response;
                import java.util.UUID;
    
                @Path("/user")
                public class UserResource {
    
                @GET
                @Path("/all")
                @Produces(MediaType.APPLICATION_JSON)
                public Response users() {
                return Response.ok(User.findAll().list()).build();
                }
                @POST
                @Produces(MediaType.APPLICATION_JSON)
                @Consumes(MediaType.APPLICATION_JSON)
                public Response users(final @Valid User user) {
                user.setUserId(UUID.randomUUID().toString());
                user.setActive(true);
                User.persist(user);
                return Response.ok().build();
                }
                }
            

Adding application properties
-----------------------------

    
                quarkus.mongodb.connection-string = mongodb://localhost:27017
                quarkus.mongodb.database=todo-users
            

Running the server
------------------

Run the server using below command

    
                mvn quarkus:dev
            

Add a user
----------

Add following curl command or use postman or other software to do a post

    curl -X POST \
                http://localhost:8080/user \
                -H 'Content-Type: application/json' \
                -d '{
                "firstName":"Kumar",
                "lastName":"Pallav",
                "dateOfBirth":"1987-08-05",
                "email":"codingsaint@gmail.com"

}'

Retrieve all users
------------------

Use a get request http://localhost:8080/user/all or do a curl as below

    
                curl -X GET \
                http://localhost:8080/user/all \
            

You will get a response like

    
                [{
    
                "id": "5e430af58cd12948d22faa9a",
    
                "active": true,
    
                "dateOfBirth": "1987-08-05",
    
                "email": "codingsaint@gmail.com",
    
                "firstName": "Kumar",
    
                "lastName": "Pallav",
    
                "userId": "10905021-e7c5-43e2-a29e-8a42f69d4fb2"
    
                }]
