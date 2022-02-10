const users = require('../users/users-model')
const posts = require('../posts/posts-model')
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()} `
  );
  next();
}

function validateUserId(req, res, next) {
  users.getById(req.params.id)
    .then(user => {
      if(!user) return res.status(404).json({message: "User is not found"})
     
    })
    .catch(() => res.status(500).json({message: "Could not retrieve user info"}))
    next()
}

function validateUser(req, res, next) {
  if(!("name" in req.body)) return res.status(400).json({message: "missing required name"})
  next()
}

function validatePost(req, res, next) {
  if(!("text" in req.body)) return res.status(400).json({message: "missing required text field"});
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}