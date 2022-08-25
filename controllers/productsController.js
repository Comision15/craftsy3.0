const {loadProducts, loadBrands,loadCategories, loadSections, storeProducts} = require('../data/db_Module');
const {validationResult} = require('express-validator')

module.exports = {
    add : (req,res) => {
        const brands = loadBrands();
        return res.render('productAdd',{
            brands: brands.sort(),
            categories : loadCategories().sort(),
            sections : loadSections().sort()
        })
    },
    store : (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            const products = loadProducts();
            const {name,price,discount, brand, section, category, description} = req.body;
            const id = products[products.length - 1].id;
            let images;
            if(req.files.length > 0){
                images = req.files.map(image => image.filename)
            }

            const newProduct = {
                id : id + 1,
                ...req.body,
                name: name.trim(),
                price : +price,
                discount : +discount,
                description : description.trim(),
                images : images ? images : ['default-image.png']
            }

            const productsNew = [...products,newProduct];

        storeProducts(productsNew)

        return res.redirect('/');

        }else{
            const brands = loadBrands();
            return res.render('productAdd',{
                brands: brands.sort(),
                categories : loadCategories().sort(),
                sections : loadSections().sort(),
                errors : errors.mapped(),
                old : req.body
            })
        }
     

    },
    edit : (req,res) => {
        const products = loadProducts();
        const brands = loadBrands();
        const product = products.find(product => product.id === +req.params.id);

        return res.render('productEdit',{
            brands,
            product
        })
    },
    update : (req,res) => {

        const products = loadProducts();
        const {id} = req.params;
        const {name,price,discount,brand, category, section} = req.body;

        const productsModify = products.map(product => {
            if (product.id === +id ){
                return {
                    ...product,
                    name : name.trim(),
                    price : +price,
                    discount : +discount,
                    brand,
                    category,
                    section 
                }
            }
            return product
        })

        storeProducts(productsModify)
        return res.redirect('/products/detail/' + req.params.id)

       
    },
    detail : (req,res) => {
        
        const products = loadProducts();
        const product = products.find(product => product.id === +req.params.id);

        return res.render('productDetail', {
            product
        })
    },
    filter : (req,res) => {

        const products = loadProducts();
        const productsFilter = products.filter(product => product.section === req.query.section)
        return res.render('products', {
            products : productsFilter
        })
    },
    search : (req,res) => {

        const products = loadProducts();
        const result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase()))
        return res.render('products', {
            products : result,
            keywords : req.query.keywords
        })
    },
    remove : (req,res) => {
        const products = loadProducts();

        const productsModify = products.filter(product => product.id !== +req.params.id )
        storeProducts(productsModify);
        
        return res.redirect('/')

    }
}