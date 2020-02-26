---
id: 169
title: Spring Boot :Profile Specific Properties and Placeholders in properties
date: 2018-11-12T22:50:49+05:30
author: Kumar Pallav
layout: post
guid: http://codingsaint.com/?p=169
permalink: /2018/11/12/spring-boot-profile-specific-properties-and-placeholders-in-properties/
image: /wp-content/uploads/2018/11/Spring-Boot-_Profile-Specific-Properties-and-Placeholders-in-properties.png
categories:
  - Microservices
  - Spring
tags:
  - Microservices
  - RESTful
  - Spring
  - SpringBoot
---
Profile Specific Properties

Spring provides profiles for environment based properties. For example Database related properties will change for Development , QA and Production environment. For such cases we can create property file like

application-{profile}.properties

Like application-dev.properties , application-qa.properties or application-prod.properties .By default , if not specified profile is “default”, You can see this happening in logs as well. Below is the screenshot of same :

<img title="" src="https://i2.wp.com/codingsaint.com/wp-content/uploads/2018/10/null7.png?resize=624%2C86&#038;ssl=1" alt="" width="624" height="86" data-recalc-dims="1" /> 

Consider a property like app.name defiled in application.properties and as well as application-{profile}.properties like application-dev.properties. If the profile is set to dev , the value for app.name in.properties will be considered. It will override the default one.

We will see profile in details in next chapter.

Placeholder in properties

Placeholders could be of great use when defining any properties file specially a long one with references from other properties. For example , see below properties

<pre class="brush: plain; title: ; notranslate" title="">app.name=User Application
app.version= 1.0.0
app.description = ${app.name} - ${app.version} is an application to store user details.
</pre>

If we add above properties in application.properties file , and try to fetch app.description property, It will refer app.name and app.version to create value for app.description. Let’s test it

We will add a Simple request mapping in our common controller and return these values via a map.

<pre class="brush: java; title: ; notranslate" title="">@Autowired

private Environment env;

@RequestMapping("app-info")

protected Map&lt;String,String&gt;appInfo(){

Map&lt;String,String&gt;appInfo= new LinkedHashMap&lt;String,String&gt;();

appInfo.put("name", env.getProperty("app.name"));

appInfo.put("version", env.getProperty("app.version"));

appInfo.put("description", env.getProperty("app.description"));

return appInfo;

}

</pre>

Now if we hit the URL <a href="http://localhost:8081/v1/app-info" rel="nofollow">http://localhost:8081/v1/app-info</a> , we will get following response validation that placeholders are working. (_It can be noted that we have removed command line parameter of &#8211;server.port, that’s why it is running on 8081 picking from properties file_ )

<pre class="brush: jscript; title: ; notranslate" title="">{
    "name": "User Application",
    "version": "1.0.0",
    "description": "User Application - 1.0.0 is an application to store user details."
}

</pre>

Here name and versions are replaced in description.