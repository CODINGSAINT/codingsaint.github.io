---
id: 630
title: Observable using create
date: 2020-01-18T00:31:40+05:30
author: Coding Saint
layout: post
guid: https://codingsaint.com/?p=630
permalink: /2020/01/18/observable-using-create/
categories:
  - Java
tags:
  - Reactive
  - RxJava
series:
  - RxJava and Reactive Spring Microservices
---
create is an important method to create Observable. Below are few points which make Observable using create interesting

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Creates from scratch</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">observer methods are programmatically written</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">emitter method is provided for interfaces to use</span>
</li>

Below is the code which can help you to understand creating Observable using create method.


{% gist 97f69898c3d3dcf6e1cf1669ebb1bdee %}

Here we are trying to create Observable using create method where we get 15 different shapes. The create method provides a subscribe method where we are iterating each elements from list and emitting one by one. The emitted events are listened on DemoSubscriber.

For RxUtil.java class and DemoSubscriber and for full code you can refer git library : <a href="https://github.com/CODINGSAINT/rxJava-tutorial" rel="nofollow">https://github.com/CODINGSAINT/rxJava-tutorial</a>

Now once you run it you will get following output

<div class="gist-oembed" data-gist="7b3541ea2b1831d78921819e9d521339.json" data-ts="8">
</div>

&nbsp;

&nbsp;
