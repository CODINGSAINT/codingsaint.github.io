---
id: 614
title: 'Creating Observable RxJava'
date: 2020-01-09T07:50:25+05:30
author: Coding Saint
layout: post
guid: https://codingsaint.com/?p=614
permalink: /2020/01/09/creating-observable-rxjava/
hestia_layout_select:
  - sidebar-right
image: /wp-content/uploads/2020/01/RxJava.png
categories:
  - Java
tags:
  - Reactive
  - RxJava
series:
  - RxJava and Reactive Spring Microservices
---
Observable being the most important block of reactive programming , it is important to understand different methods of creating Observable.

Observable can be created be created by following methods.

  1. just
  2. create
  3. defer
  4. range
  5. interval
  6. repeat
  7. timer
  8. from

<li style="list-style-type: none;">
  <ul>
    <li>
      fromCallable
    </li>
    <li>
      fromIterable
    </li>
    <li>
      fromArray
    </li>
    <li>
      fromPublisher
    </li>
  </ul>
</li>

Observables emits events on which Observer subscribes too. So let us start by creating a DemoObserver which will be subscribing to our Observables.


{% gist 05daebcdb02f09ed0be22814e095f02d %}
The above DemoObserver will be subscribing to our Observable. This will let the code be more clear and understandable. The DemoObservable is simple and logs events as subscription , errors and completion. It also adds logs each element the observable emits with onNext method.

Let&#8217;s look at the methods of creating an Observable.

### just

just is used to create Observable with maximum of 10 elements.  It comes handy when we have events limited to maximum of 10 events.

{% gist 27ce3572b4607e19f54c1547981ca061 %}


The above code will create an Observable with list of alphabets from a to j . Below is the logs which will be published.

<pre>08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onSubscribe
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; a
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; b
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; c
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; d
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; e
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; f
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; g
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; h
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; i
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onNext -&gt; j
08-01-20 12:51:37 [main] [INFO ] [c.c.l.rxjava.observable.CsObservable]- onComplete</pre>

&nbsp;

The above log confirms onSubscribe , followed by onNext with elements from &#8220;a&#8221; to &#8220;j&#8221; and completed by an onComplete.

&nbsp;

The  above code can also be written using our own DemoObserver in a simple and cleaner way.

<pre>Observable.just("a","b","c","d","e","f","g","h","i","j")
        .subscribe(new DemoObserver());</pre>

For further example we&#8217;ll be using our DemoObserver for readability.

In next post we will see creating observables with other methods.
