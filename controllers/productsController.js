const products = require('../data/productsModule').loadProducts();

module.exports = {
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