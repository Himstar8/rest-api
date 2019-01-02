# Getting started

I have a live API server running at https://nearby-shops-backend.herokuapp.com/api

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Create a `.env` file and add MONGO_URI and SECRET_KEY variables
- `npm run dev` to start the local server

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [passport-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator) - For handling unique validation errors in Mongoose. Mongoose only handles validation at the document level, so a unique index across a collection will throw an exception at the driver level. The `mongoose-unique-validator` plugin helps us by formatting the error like a normal mongoose `ValidationError`.
- [joi](https://github.com/hapijs/joi) - Object schema description language and validator for JavaScript objects.
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `src/config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `src/api/ressources` - This folder contains the route definitions for our API and the schema definitions for our Mongoose models.
- `src/api/ressources/user` - This folder contains user shema model, routes and controller
- `src/api/ressources/shop` - This folder contains shop shema model, routes and controller
- `src/api/middlewares` - This folder contains configuration for passport
- `src/api/helpers` - This folder contains jwt token generator function

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define an express middleware in `src/api/middlewares/passport-jwt.js` that can be used to authenticate requests.

<br />
