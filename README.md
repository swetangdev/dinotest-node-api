# Dinotest WPEngine API with JWT Auth guard

Node.js api application to perform login using static username and password, generate Token.
Using token communicate to api e.g. /posts, /posts/41

## Installation

clone this repository and perform npm install operation

```bash
npm install
```
**Server running on port 3000**

## Usage
After complete installation use following command to start app

```
npm start
```

**Login Username / password** : admin / admin123

## Once server started, Use Postman to access following api

> **Login** : http://localhost:3000/login

> **All Post** : http://localhost:3000/posts

> **Get Single Post** : http://localhost:3000/posts/41