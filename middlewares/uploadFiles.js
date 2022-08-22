const multer = require('multer');
const path = require('path');

const storageProducts = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './public/images/celulares' )
    },
    filename : (req,file,callback) => {
        callback(null, `product-${Date.now()}${path.extname(file.originalname)}` )
    }
})

const storageUsers = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './public/images/users' )
    },
    filename : (req,file,callback) => {
        callback(null, `avatar-${Date.now()}${path.extname(file.originalname)}` )
    }
})

const uploadProducts = multer({
    storage : storageProducts
});

const uploadUsers = multer({
    storage : storageUsers
});

module.exports = {
    uploadProducts,
    uploadUsers
}