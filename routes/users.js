var express = require('express');
var router = express.Router();

const {login,profile,register, update, processRegister, processLogin,logout} = require('../controllers/usersController');

const {uploadUsers} = require('../middlewares/uploadFiles');
const userSessionCheck = require('../middlewares/userSessionCheck');
const loginValidator = require('../validations/loginValidator');
const registerValidator = require('../validations/registerValidator');

/* /users */
router
  .get('/register',register) // /users/register
  .post('/register',registerValidator, processRegister)
  .get('/login',login) // /users/login
  .post('/login',loginValidator, processLogin)
  .get('/profile',userSessionCheck, profile) // /users/profile
  .put('/update/:id',uploadUsers.single('avatar'), update)
  .get('/logout',logout)

module.exports = router;
