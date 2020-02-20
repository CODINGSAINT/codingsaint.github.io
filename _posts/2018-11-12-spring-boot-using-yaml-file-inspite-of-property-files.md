---
id: 172
title: 'Spring Boot: Using YAML file inspite of Property files'
date: 2018-11-12T06:30:23+05:30
author: Coding Saint
layout: post
guid: http://codingsaint.com/?p=172
permalink: /2018/11/12/spring-boot-using-yaml-file-inspite-of-property-files/
categories:
  - Microservices
  - Spring
tags:
  - '#Microser'
  - Microservices
  - Spring
  - SpringBoot
---
Using YAML file

Yaml as they are called Yet Another Markup Language is an alternative to properties file. It has extension of **“.yml”.** We can create application.yml file instead of application.properties.

Following it table for equivalent properties and YAML

**application.properties**

<pre class="brush: plain; title: ; notranslate" title="">app.name=User Application
app.version: 1.0.0
app.description = ${app.name} - ${app.version} is an application to store user details.&amp;amp;amp;gt;
app.developers.name[0]=Ray McFallen
app.developers.name[1]=John Smith
</pre>

**application.yml**

<pre class="brush: plain; title: ; notranslate" title="">app:
  name : User Application
  Version: 1.0.0
  description: ${app.name} - ${app.version} is an application to store user details.
  developers:
    name:
      - Ray McFallen
      - John Smith
</pre>

As we can see yaml file is less repetitive than properties file in term of key namings. The another difference to be noticed is in list of elements (Array in above case) .

Yaml file is lot cleaner approach. With properties file we are creating profile specific properties file i.e. application-{profile}.properties . Which means for each profile there will be separate properties file. With yml , we can use three “-” like &#8212; and write profile specific values in same file.

<pre class="brush: plain; title: ; notranslate" title="">app:

  name : User Application

  Version: 1.0.0

---

spring:

  profiles: development

  Version: 1.0.40

---

spring:

  profiles: production

  Version: 1.0.3

</pre>

Here version will change if application is started with profiles as development and production but by default (if no profile is given) it will pick 1.0.0 .

The biggest shortcoming of YAML is that you can’t use it with @PropertySource annotation. This annotation is used to load property files other named other than application*properties . PropertySource annotation is used for externalizing properties.