---
id: 638
title: Observable using defer
date: 2020-01-22T21:06:50+05:30
author: Coding Saint
layout: post
guid: https://codingsaint.com/?p=638
permalink: /2020/01/22/observable-using-defer/
image: /wp-content/uploads/2020/01/RxJava.png
categories:
  - Spring
tags:
  - Java
  - Reactive
  - RxJava
series:
  - RxJava and Reactive Spring Microservices
---
Observable normally gets created once the code executes, Observable using defer , defers the creation of Observable. It waits till a subscription is done.

Below are main property of Observable using defer.

  1. <span style="font-weight: 400;">Creates new observable every time on subscription</span>
  2. <span style="font-weight: 400;">No Observable is created  until subscription</span>

Below is the code showing Observable using defer

{% gist ee75cc833bbd4072d421fa53f91b31ea %}


Here intentionally we are subscribing 2 times to show that each time Observable is created. You can also see that defer is taking _fromIterable_ to create the observable. This will stop creating defer until we subscribe. Once subscribed _Observable.fromInterable_ code will be invoked
