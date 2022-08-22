var express = require('express');
var router = express.Router();

const {login,profile,register, update} = require('../controllers/usersController');

const {uploadUsers} = require('../middlewares/uploadFiles')

/* /users */
router
  .get('/register',register) // /users/register
  .get('/login',login) // /users/login
  .get('/profile',profile) // /users/profile
  .put('/update/:id',uploadUsers.single('avatar'), update)

module.exports = router;
