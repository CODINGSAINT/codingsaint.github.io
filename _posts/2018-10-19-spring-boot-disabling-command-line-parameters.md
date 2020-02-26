---
id: 166
title: 'Spring Boot: Disabling Command Line Parameters'
date: 2018-10-19T00:30:49+05:30
author: Kumar Pallav
layout: post
guid: http://codingsaint.com/?p=166
permalink: /2018/10/19/spring-boot-disabling-command-line-parameters/
jabber_published:
  - "1539889251"
timeline_notification:
  - "1539889253"
email_notification:
  - "1539889254"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/spring-boot-disabling-command-line-parameters.png
categories:
  - Microservices
  - Spring
tags:
  - Java
  - Microservices
  - SpringBoot
---
Property via command line

In previous example we have seen how to send command line parameter as &#8211;server.port , We can pass any parameter via command line. The parameters which are sent via command line can be accessed using @Value annotation ,using Environment variable provided by Spring as discussed above. Interestingly you might want to disable your application taking command line arguments. There could be compelling reasons to do so, one of them could be security . If so, go ahead adding following line in Main class and no more command line parameters will be considered.

<pre class="brush: java; title: ; notranslate" title="">SpringApplication.setAddCommandLineProperties(false);
</pre>