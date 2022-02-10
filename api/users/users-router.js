const express = require('express');
const middleware = require('../middleware/middleware')
const users = require('./users-model')
const posts = require('../posts/posts-model')
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  users.get().then(allUsers => res.json(allUsers))
});

router.get('/:id', middleware.validateUserId, (req, res) => {
  users.getById(req.params.id).then(user => res.json(user))
});

router.post('/', middleware.validateUser, (req, res) => {
  users.insert(req.body).then(user => res.json(user))
});

router.put('/:id', middleware.validateUserId, middleware.validateUser, (req, res) => {
  users.update(req.params.id, req.body).then(user => res.status(201).json(user))
});

router.delete('/:id', middleware.validateUserId, (req, res) => {
  users.getById(req.params.id).then(user => {
    users.remove(req.params.id).then(res.json(user))
  })
});

router.get('/:id/posts',middleware.validateUserId, (req, res) => {
  users.getUserPosts(req.params.id).then(allPosts => res.json(allPosts))
});

router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id - Done
  // and another middleware to check that the request body is valid - Done
  posts.insert(req.body).then(post => res.json(post))
});

// do not forget to export the router
module.exports = router;