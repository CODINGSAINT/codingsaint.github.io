---
id: 580
title: 'RxJava &#8211; Reactive Revolutions'
date: 2020-01-02T16:31:53+05:30
author: Coding Saint
layout: post
guid: https://codingsaint.com/?p=580
permalink: /2020/01/02/rxjava-reactive-programming/
image: /wp-content/uploads/2020/01/RxJava.png
categories:
  - Java
tags:
  - Java
  - RxJava
series:
  - RxJava and Reactive Spring Microservices
---
Reactive is not new in Software Engineering. Within few years, we have seen increase in reactive solutions at a large scale. Let us look what reactive programming actually means.

Reactive programming is a paradigm which enables to program for streams of data in non blocking  (_asynchronous_) manner. It makes the solutions such that the _system_ reacts to the stream of events.

Reactive programming paradigm is similar on principal with Observable and Observer pattern. Observable being the emitter of events and observer observing on the emitted events with knowledge of steps to be taken with incoming data.

In real world example, let&#8217;s consider a newspaper or a Netflix show. Here the newspaper or the Netflix show is what you have subscribed too, so it is observable. It emits stream of events in form of news or show content. In order to receive receive newspaper everyday or new shows from Netflix ,the first step is too subscribe. Once subscribed whenever observer emits events (a newspaper publishing the news daily or an episode  on Netflix) you receive it. On every new events published from publisher ,i.e. the daily newspaper or the Netflix show,  you are free to act upon as a observer. In case your subscription is expired (which you can think as an exception) you should be taking an action based on your interest. Once Netflix show is finished , or you have read the newspaper and no longer wants it , it can be notification of events being completed or being unsubscribed.

Similarly, in software world we can program based on events to make more robust solution which can scale better.

The evolution of computers have had been focused on processing speed. As we have increased number of cores , we can work on multiple processes together. We have added more cores but if we keep our programming model as single threaded application, we will never be utilising processor to its full capacity. When the load will grow up , we will be scaling by adding more CPUs ,yet all the CPU will be fractionally utilised. This will increase cost while we if we had coded effectively utilising all the available cores we could have saved lot of money easily.

Consider we have a Order from a normal e-commerce website, where we need to call different services like cart service, user service and product services. We aggregate all these 3 calls to send back the response to our user.

<img class="alignnone size-full wp-image-598" src="https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_benefits.png?resize=575%2C333&#038;ssl=1" alt="reactive_benefits" width="575" height="333" srcset="https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_benefits.png?w=575&ssl=1 575w, https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_benefits.png?resize=300%2C174&ssl=1 300w" sizes="(max-width: 575px) 100vw, 575px" data-recalc-dims="1" /> 

The throughput of such a call will be time taken by cart service (x), product service (y) and user service(z) along with time taken in network calls .

_Total time taken = Network Time + (x)+(y)+z()_

If we execute these network calls in parallel and know when all of the calls return responses , we aggregate their responses and send a aggregated response , we can save time. In this case time taken will be

_Total time taken =Network time+ Max(x,y,z)_

This will save our time and response could be much faster. We can achieve it by already present Future and callbacks, then why do we need to look at reactive paradigm. With increase in network calls and callback function , slowly it will lead to complex structure and it will become _callback hell_.

Reactive paradigm works with all these functionality and yet keeps things simple. We will explore it  in this series on Reactive Programming with Java.

In next section we will look at founding principal of reactive programming which is _Reactive Manifesto_.

&nbsp;

&nbsp;

&nbsp;

&nbsp;