const express = require('express');
const middleware = require('./middleware/middleware')
const server = express();
const userRouter = require('./users/users-router')

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
// global middlewares and the user's router need to be connected here
server.use(middleware.logger)
server.use('/api/users' , userRouter)


module.exports = server;
