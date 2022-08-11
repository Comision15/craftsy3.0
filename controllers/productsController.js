const products = require('../data/db_Module').loadProducts();
const brands = require('../data/db_Module').loadBrands();
const {storeProducts} = require('../data/db_Module')

module.exports = {
    add : (req,res) => {
        return res.render('productAdd',{
            brands: brands.sort()
        })
    },
    store : (req,res) => {

        const {name,price,discount} = req.body;
        const id = products[products.length - 1].id;

        const newProduct = {
            id : id + 1,
            ...req.body,
            name: name.trim(),
            price : +price,
            discount : +discount,
            image : "img-phone-01.jpg"
        }

        const productsNew = [...products,newProduct];

        storeProducts(productsNew)

        return res.redirect('/')

    },
    detail : (req,res) => {

        const product = products.find(product => product.id === +req.params.id);

        return res.render('productDetail', {
            product
        })
    },
    filter : (req,res) => {
        const productsFilter = products.filter(product => product.section === req.query.section)
        return res.render('products', {
            products : productsFilter
        })
    },
    search : (req,res) => {
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('products', {
            products : result,
            keywords : req.query.keywords
        })
    }
}