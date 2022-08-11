const express = require('express');
const router = express.Router();

const {detail, filter, search, add, store} = require('../controllers/productsController');

/* /products */

router
    .get('/add',add)
    .post('/add',store)
    .get('/detail/:id',detail)
    .get('/filter',filter)
    .get('/search',search)



module.exports = router;