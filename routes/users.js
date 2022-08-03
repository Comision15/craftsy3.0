var express = require('express');
var router = express.Router();

const {login,profile,register} = require('../controllers/usersController')

/* /users */
router
  .get('/register',register) // /users/register
  .get('/login',login) // /users/login
  .get('/profile',profile) // /users/profile

module.exports = router;
