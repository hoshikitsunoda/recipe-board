# recipe board

A web app to record recipes

## How to use
Create a database in MongoDB(atlas) and get database URL, usename and password

```
git clone this_repo

// create .env file and add env variable like so:
// USERNAME=xxx
// PASSWORD=xxxx1234
//
// Replace URL in app.ts with your own URL

// run server side
cd server

npm install

nodemon app.ts

// run client side
cd client

npm install

npm start

go to localhost:3000
```

## Technologies used:

- TypeScript
- React
- Tailwind
- GraphQL
- Apollo
- Express
- MongoDB
- Mongoose
