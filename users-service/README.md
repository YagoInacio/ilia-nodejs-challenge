<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/yagoinacio/ilia-nodejs-challenge?color=353949">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/yagoinacio/ilia-nodejs-challenge">

  <a href="https://github.com/yagoinacio/ilia-nodejs-challenge/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/yagoinacio/ilia-nodejs-challenge">
  </a>

  <a href="https://yagofaran.dev">
    <img alt="Made by Yago Faran" src="https://img.shields.io/badge/made_by-Yago_Faran-353949">
  </a>
</p>

<h1 align="center">
    <img alt="Logo Yago Faran" title="#YagoFaran" src="https://portfolio.yagofaran.dev/api/images/logo.svg" />
</h1>

<p align="center">
 <a href="#-users-microservice">About</a> •
 <a href="#-tech-stack">Tech Stack</a> • 
 <a href="#-features">Features</a> •
 <!-- <a href="#-layout">Layout</a> •  -->
 <a href="#-how-it-works">How it works</a> • 
 <!-- <a href="#-contributors">Contributors</a> •  -->
 <a href="#-author">Author</a>
</p>

## 💻 Users Microservice

This API follows the description provided at the [Ília NodeJS Challenge](https://github.com/aisdigital/ilia-nodejs-challenge). It manages the application's users.

## 🛠 Tech Stack

-   **[NestJS](https://nestjs.com)**
-   **[MongoDB](https://www.mongodb.com)**
-   **[Prisma](https://www.prisma.io)**
-   **[JestJS](https://jestjs.io)**

## ✨ Features

- [x] Users:
  - [x] Create
  - [x] List
  - [x] Get User
  - [x] Update
  - [x] Delete
  - [x] Authenticate

## 🚀 How it works

This instructions will allow you to run a functional version of the project on your local machine.

### 📋 Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
In addition, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/)

#### 🔧 Instalation

```bash
# Clone this repository
$ git clone git@github.com:yagoinacio/ilia-nodejs-challenge.git

# Access the project folder
$ cd ilia-nodejs-challenge/users-service

# install the dependencies
$ npm install
```

#### 🔧 Configuration

To be able to run the application you need to set up the environment variables.

For that, create the file ```.env``` on the wallet-service folder. You can follow the example bellow:

```bash
# .env:
MONGODB_REPLICA_SET_MODE=primary
MONGODB_REPLICA_SET_KEY=123456789
MONGODB_ROOT_USERNAME=[USERNAME]
MONGODB_ROOT_PASSWORD=[PASSWORD]
MONGODB_DATABASE=[DATABASE]
MONGO_HOST=[HOST]

DATABASE_URL="mongodb://${MONGODB_ROOT_USERNAME}:${MONGODB_ROOT_PASSWORD}@${MONGO_HOST}:27017/${MONGODB_DATABASE}?authSource=admin&readPreference=primary&ssl=false&directConnection=true"

PORT=3002

JWT_PRIVATE_KEY=[PRIVATE_KEY]

#  make sure to replace [USERNAME], [PASSWORD], [HOST], [DATABASE] and [PRIVATE_KEY] with actual values
```

You can run a containerized instance of the Database by running ```docker compose up database-users -d```.
After that you can run ```npx prisma generate``` and ```npx prisma db push``` to update the database's indexes. By doing that, you will have a fully ready MongoDB database for your app to connect. 

#### 🎲 Running the application

```bash
# Run the application in development mode
$ npm run start:dev

# The server will start at port: 3001 - go to http://localhost:3001
```

Or, if you want to run it on a container:

```bash
# Run the application on a container environment
$ docker compose up users-app -d

# The server will start at port: 3001 unless otherwise configured - go to http://localhost:3001
```

You can try out the API using its swagger documentation on http://localhost:3002/api-docs

#### ✅ Running automated tests

```bash
# Run automated tests
$ npm run test

# The test automation will run for unit tests
```

## 🦸 Author

<a href="https://yagofaran.dev">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/yagoinacio" width="100px;" alt=""/>
 <br />
 <sub><b>Yago Faran 💧</b></sub>
</a>

[![Github Badge](https://img.shields.io/badge/-YagoInacio-gray?style=flat-square&labelColor=gray&logo=github&logoColor=white&link=https://github.com/yagoinacio)](https://github.com/yagoinacio)
[![Linkedin Badge](https://img.shields.io/badge/-Yago-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/yagoinacio/)](https://www.linkedin.com/in/yagoinacio/) 
[![Gmail Badge](https://img.shields.io/badge/-yagofaran@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:yagofaran@gmail.com)](mailto:yagofaran@gmail.com)


Made with ❤️ by Yago Faran 👋🏽 [Get in touch!](https://www.linkedin.com/in/yagoinacio/)