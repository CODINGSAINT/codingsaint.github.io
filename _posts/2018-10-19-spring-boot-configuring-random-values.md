---
id: 164
title: 'Spring Boot : Configuring Random values'
date: 2018-10-19T00:25:41+05:30
author: Kumar Pallav
layout: post
guid: http://codingsaint.com/?p=164
permalink: /2018/10/19/spring-boot-configuring-random-values/
jabber_published:
  - "1539888946"
timeline_notification:
  - "1539888948"
email_notification:
  - "1539888948"
publicize_twitter_user:
  - codingsaint
image: /wp-content/uploads/2018/10/spring-boot-_-configuring-random-values.png
categories:
  - Microservices
  - Spring
tags:
  - Configuration
  - Java
  - Microservices
  - Random Values
  - RESTful
  - Spring
---
Many times we need to get random values ,for example you need to generate random pin for verification or a some random value for email verification. Spring provides easy way to do it.

RandomValuePropertySource is used to inject random values. RandomValuePropertySource can produce integers, longs, uuids or strings.

In application.properties we will add following :

<table>
  <tr>
    <td>
      <pre class="brush: plain; title: ; notranslate" title="">
app.random=${random.value}
my.random.integer=${random.int}
my.random.long=${random.long}
my.random.uuid=${random.uuid}
my.random.less.than.hundred=${random.int(100)}
my.random.within.range=${random.int[1000,9999]}
</pre>
    </td>
  </tr>
</table>

The above values are self explanatory . They are creating random values. In order to see if they work as expected let’s create a RequestMapping so that we access these value and display on UI /POSTMAN.

We will inject above defined properties via @Value annotation. Doing so we can also see that spring will keep the type safety in consideration. If we take a Integer value to inject an integer it will inject integer , Long for long and so on . Let’s create another controller CommonController as below with a RequestMapping.

<pre class="brush: java; title: ; notranslate" title="">@RequestMapping("v1")
public class CommonController {
	@Value("${app.random}")
	private String random;
	@Value("${app.random.integer}")
	private Integer randomInteger;
	@Value("${app.random.long}")
	private Long randomLong;
	@Value("${app.random.uuid}")
	private String randomUUID;
	@Value("${app.random.less.than.hundred}")
	private Integer randomLessThanHundred;
	@Value("${app.random.within.range}")
	private Integer randomWithinRange;

	@RequestMapping("random-values")
	protected MapgetRandomValues(){
	 Map randomValues= new LinkedHashMap();
	 randomValues.put("random",random);
	 randomValues.put("randomInteger",randomInteger);
	 randomValues.put("randomLong",randomLong);
	 randomValues.put("randomUUID",randomUUID);
	 randomValues.put("randomLessThanHundred",randomLessThanHundred);
	 randomValues.put("randomWithinRange",randomWithinRange);
	 return randomValues;
      }
  }
</pre>

Here we can observe that we are using a Map to collect all values in our method and send them back. Once we hit <a href="http://localhost:8082/v1/random-values" rel="nofollow">http://localhost:8082/v1/random-values</a> (Considering you are still giving port as command line parameter i.e.&#8211;server.port=8082) we will get following response.

{  
&#8220;random&#8221;: &#8220;2b26227a3a78bbbac96617f094b613e6&#8221;,  
&#8220;randomInteger&#8221;: 728349517,  
&#8220;randomLong&#8221;: -529828434181910766,  
&#8220;randomUUID&#8221;: &#8220;c5b8aa23-5992-48c3-9aed-f7b9e0e223c7&#8221;,  
&#8220;randomLessThanHundred&#8221;: 5,  
&#8220;randomWithinRange&#8221;: 7208  
}

With above value , we can be assured that our RandomValuePropertySource is correctly working.