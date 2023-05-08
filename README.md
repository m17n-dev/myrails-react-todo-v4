# myrails-react-todo-v4

![gif](https://github.com/m17n-dev/myrails-react-todo-v4/blob/main/image/myrails-react-todo-v4.gif)


web site: https://m17n.dev

## Overview

This is a SPA(Single Page Application) that performs simple CRUD operations by Rails API + React × TypeScript.


## Requirement

- macOS Catalina
- Docker version 20.10.11


## Usag

https://github.com/m17n-dev/myrails-react-todo-v4.git  
  
In the development environment, command as follows. Start docker on each of the backend and frontend. You can perform a health check to see if the boot was successful. And go to http://localhost:3001 in your browser.  

```shell:command line
# Backend - Development Case
$ cd myrails-react-todo-v4
$ docker compose run --service-ports rails-api-v4-dev
/app# rbenv install --list
/app# rbenv versions
/app# rbenv install 2.6.6
/app# rbenv rehash
/app# rbenv global 2.6.6
/app# rbenv versions
/app# gem install bundler -v 2.2.26
/app# bundler -v
/app# bundle install
/app# yarn install
/app# bin/rails db:migrate
/app# bin/rails s -b 0.0.0.0

# Frontend - Development Case
$ cd myrails-react-todo-v4
$ docker compose run --service-ports front-react-v4-dev

# Health Check
$ curl -X GET http://localhost:3000/api/v4/health_check
{"head":200,"message":"Completed 200"}
  
# Get Request
$ curl -X GET http://localhost:3001

```

## AWS Architecture Diagrams

![png](https://github.com/m17n-dev/myrails-react-todo-v4/blob/main/image/aws-architecture-diagrams.png)


## Licence

MIT License