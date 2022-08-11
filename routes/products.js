const express = require('express');
const router = express.Router();

const {detail, filter, search} = require('../controllers/productsController');

/* /products */

router
    .get('/detail/:id',detail)
    .get('/filter',filter)
    .get('/search',search)



module.exports = router;