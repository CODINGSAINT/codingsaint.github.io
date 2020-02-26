---
id: 606
title: Building blocks of Reactive Systems
date: 2020-01-03T15:22:12+05:30
author: Kumar Pallav
layout: post
guid: https://codingsaint.com/?p=606
permalink: /2020/01/03/building-blocks-of-reactive-systems/
categories:
  - Java
tags:
  - Reactive
  - RxJava
series:
  - RxJava and Reactive Spring Microservices
---
Reactive Systems consists of 2 major components.

  1. Observable
  2. Observer

### Observable

Think of an example of watching movie , The movie is being played and it keeps emitting events in form of stream of screens and voice. Here in this example , we can say that Movie is an Observable type.

Similarly if you log in to twitter it has streams of incoming tweets. In Facebook it is stream of posts.

If we take a more traditional approach of programming for streaming events , we will be choking our systems. The traditional mode of approach will also result in losing states of data or else it will be too overwhelming for it to keep all the state and work on it.

Let&#8217;s think an example of a shopping cart. If you add an item or update its quantity , each of your action is an event. In traditional approach you don&#8217;t track all the events but the final value of cart. If we keep the states of all of the events in real time using traditional approach with database at backend , we will be making lot of database related operations which will lead to memory and performance issues.

###<img class="alignnone size-full wp-image-611" src="https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_building_blocks.png?resize=750%2C431&#038;ssl=1" alt="reactive_building_blocks.png" width="750" height="431" srcset="https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_building_blocks.png?w=898&ssl=1 898w, https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_building_blocks.png?resize=300%2C172&ssl=1 300w, https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_building_blocks.png?resize=768%2C441&ssl=1 768w, https://i0.wp.com/codingsaint.com/wp-content/uploads/2020/01/reactive_building_blocks.png?resize=600%2C345&ssl=1 600w" sizes="(max-width: 750px) 100vw, 750px" data-recalc-dims="1" /> Observer

Observer is one who observe observable. If you are watching movie you are the observer. In order to observer we have same basic rules, which in reactive methodology are translated as methods.

To watch movie , we need ticket i.e. subscription (onSubscribe) , as the move starts we observer streams of events (onNext ) , once movie compleats (onCompleate) we know the movies is finished we stop observing it or if there is an error (onError) viz. power failure, we still stop observing.

Similarly while designing reactive streams and systems we keep in mind of reactive manifesto . By adhering those principals above methods help us to keep things simple yet effective.

In next section we will see how to create Observable and observer.