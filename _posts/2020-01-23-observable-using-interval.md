---
id: 643
title: Observable using interval
date: 2020-01-23T13:21:58+05:30
author: Kumar Pallav
layout: post
guid: https://codingsaint.com/?p=643
permalink: /2020/01/23/observable-using-interval/
image: /wp-content/uploads/2020/01/RxJava.png
categories:
  - Java
tags:
  - Reactive
  - RxJava
  - rxjava2
series:
  - Reactive Spring Boot Microservices
---
Interval are timed observables. They tell to perform an event at regular basis. Intervals will help to perform a task regularly.

Below code is a way to create a Timed interval example.

{% gist ba2f2fd9d301642ec7e8c87ba8e7e89f %}


The demo Interval will keep getting invoked at regular interval of a second. We have added a sleep that that we can see the events getting logged.

Since it is observed computation thread so sleep will help us in seeing the logs.

<pre>23-01-20 13:17:53 [main] [INFO ] [c.c.l.rxjava.observers.DemoObserver]- onSubscribe
23-01-20 13:17:54 [RxComputationThreadPool-2] [INFO ] [c.c.l.rxjava.observers.DemoObserver]- onNext -&gt; 0
23-01-20 13:17:55 [RxComputationThreadPool-2] [INFO ] [c.c.l.rxjava.observers.DemoObserver]- onNext -&gt; 1
23-01-20 13:17:56 [RxComputationThreadPool-2] [INFO ] [c.c.l.rxjava.observers.DemoObserver]- onNext -&gt; 2</pre>

&nbsp;
