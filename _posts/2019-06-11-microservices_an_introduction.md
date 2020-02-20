---
id: 374
title: 'Microservices &#8211; An Introduction'
date: 2019-06-11T16:21:50+05:30
author: Coding Saint
excerpt: 'Microservices as certainly a buzz word all around. We have been in an era where distributed and scaleable systems have need of the hour. '
layout: post
guid: https://codingsaint.com/?p=374
permalink: /2019/06/11/microservices_an_introduction/
image: /wp-content/uploads/2019/06/MicroservicesIntroduction.png
categories:
  - Microservices
  - Spring
---
Before we start learning about microservices we need to understand , why this new architecture is gaining popularity. From inception of software design what needed to be improved which brought this new concept . We need to understand a work &#8220;**Monolith**&#8221;

### Monolith

<img class="alignnone size-full wp-image-380" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/Monolith.png?resize=284%2C371&#038;ssl=1" alt="Monolith" width="284" height="371" srcset="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/Monolith.png?w=284&ssl=1 284w, https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/Monolith.png?resize=230%2C300&ssl=1 230w" sizes="(max-width: 284px) 100vw, 284px" data-recalc-dims="1" /> 

**Monolith** refers a kind of software which keeps all the component required by it within itself. Say we have to create a E Commerce we need to have User authentication, product services, cart management, payment integration ,recommendation service etc. A monolith is one application which has all of them embedded to it.

### Microservices

Microservices as certainly a buzz word all around. We have been in an era where distributed and scaleable systems have need of the hour. As the business grows the number the pressure on systems also increases. In order to keep up with increased load we scale our application. In this process we end up scaling entire monolith. In monolith we have all modules added to single application. While our load will be for certain modules ,we still end up scaling entire application.

#### Scaling Monolith

<img class="alignnone size-full wp-image-381" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/SCALING_MONOLITH.png?resize=681%2C332&#038;ssl=1" alt="SCALING_MONOLITH" width="681" height="332" srcset="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/SCALING_MONOLITH.png?w=681&ssl=1 681w, https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/SCALING_MONOLITH.png?resize=300%2C146&ssl=1 300w" sizes="(max-width: 681px) 100vw, 681px" data-recalc-dims="1" /> 

In above example , if we have a E commerce service as monolith, it is expected to have more hits at product and search modules rather cart and delivery tracking modules but when we scale up we will end up scaling all of the modules. This will increase memory and heap size and will require unnecessary resources.  
Microservices solves exact same problem. In microservices we have well defined modules as a separate service all of them talking independently via HTTP/MQ or any protocol. Now once we notice increase in product services and search module, we will scale only that component.

#### Microservices scaling

<img class="alignnone size-full wp-image-382" src="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/SCALING_MICROSERVICES.png?resize=726%2C234&#038;ssl=1" alt="SCALING_MICROSERVICES" width="726" height="234" srcset="https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/SCALING_MICROSERVICES.png?w=726&ssl=1 726w, https://i1.wp.com/codingsaint.com/wp-content/uploads/2019/06/SCALING_MICROSERVICES.png?resize=300%2C97&ssl=1 300w" sizes="(max-width: 726px) 100vw, 726px" data-recalc-dims="1" />  
While microservices have obvious benefits , it is not the silver bullet to solve all of the problems. We need to think before breaking a monolith to microservices or designing a new mocroservices architecture that do we really need it.

We will decide if we require Microservices by understanding the advantages and drawbacks of microservices. We will look it in next section.