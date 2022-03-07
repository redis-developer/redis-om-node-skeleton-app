# Redis OM + Express Skeleton Application

Do you want to build an API using Express and Redis OM but just don't have the time? Well, this repo is the repo for you! Just clone it, get some Redis, and modify to taste.

What is this repo? It's a small, fully functional API written in Express that uses Redis as it's primary database and uses Redis OM as a convenient way to access that primary database. It's chock full of examples that you can learn from, modify, and use in your own applications.

Did I mention that it's fully functional? Yep. So let's get this thing a-functioning!

## Prerequisites

Before we can get this application up and running, we need to install a few things. Nothing major, just a recent version of Node.js and some sweet, sweet Redis.

## Node.js

This is an Express application that uses Redis OM for Node.js. So—as you might imagine—it needs Node.js. However, I also took advantage of the [top-level await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await) feature in newer versions of JavaScript. So, you'll need to use a newer version of Node.js, Specifically 14.8 or later. I used version 16.3, which is listed in the `.nvmrc` file.

Speaking of an `.nvmrc` file, I like to use [`nvm`](https://github.com/nvm-sh/nvm). It's a tidy way to manage various Node.js versions on my machine. And, if you use `nvm` you can just enter...

    $ nvm install `cat .nvmrc`

...to install that version of Node.js and...

    $ nvm use

...to enable it.

But you don't have to do that. Install Node.js however you want as long as it's version 14.8 or later. Don't let me tell you how to live your life.

### Redis

We're using Redis as the database so you need some Redis. And not just any old Redis. You need Redis with some modules loaded. And maybe with a nice GUI that lets you interact with that data. By far the easiest way to do that is to install Redis Stack. So [go get some of that](https://hub.docker.com/repository/docker/redislabs/redis-stack).

## Up and Running

### Clone and Configure

Find a nice place on your computer and clone this repo:

    $ git clone git@github.com:redis-developer/redis-om-node-skeleton-app.git

In the root of the folder there's a `sample.env` file. Copy that file to `.env` in the same place and you should be ready to go:

    $ cp sample.env .env

This file has configuration for the Redis URL for your Redis and the port the application listens on. The defaults are `redis://localhost:6379` and `8080` and these should be just fine. But, if you want to run Redis elsewhere or you want to change the port the API listens on, feel free to mess with them.

You also need to install all the Node.js packages the application uses. Packages like Redis OM and Express. You know, the things this sample applciation is showing you how to use.

You probably know what happens next, but just in case:

    $ npm install

You have Redis and Node.js. You have the code. Everything is configured and installed. Now, you should be able to run the application. So let's do that:

    $ npm start

And it's running! Now what?



npm start

## Load Some Data

## Check Out the API

http://localhost:8080 and enjoy the Swagger goodness!

## Change Away
