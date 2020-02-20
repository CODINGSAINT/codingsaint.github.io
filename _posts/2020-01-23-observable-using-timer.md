---
id: 649
title: Observable using timer
date: 2020-01-23T13:31:11+05:30
author: Coding Saint
layout: post
guid: https://codingsaint.com/?p=649
permalink: /2020/01/23/observable-using-timer/
image: /wp-content/uploads/2020/01/RxJava.png
categories:
  - Java
tags:
  - Java
  - Reactive
  - RxJava
  - rxjava2
series:
  - RxJava and Reactive Spring Microservices
---
Observable with timer will delay the publishing the event to the the time specified. It can be used if you want the Observable to delay the publishing of source events for some time.  
It will publish a Single element after the time specified.

{% gist 0517f3bea2da62caffef6bb4600b8d2b %}

Below logs will show that event is published after specified time of 5 seconds.

<pre>23-01-20 13:29:49 [main] [INFO ] [c.c.l.rxjava.observers.DemoObserver]- onSubscribe
23-01-20 13:29:54 [RxComputationThreadPool-1] [INFO ] [c.c.l.rxjava.observers.DemoObserver]- onNext -&gt; 0
23-01-20 13:29:54 [RxComputationThreadPool-1] [INFO ] [c.c.l.rxjava.observers.DemoObserver]- onComplete</pre>
