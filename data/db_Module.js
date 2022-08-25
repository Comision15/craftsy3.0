const fs = require('fs');
const path = require('path');

const loadProducts = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'),'utf-8'))
}

const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname,'products.json'), JSON.stringify(products, null, 3),'utf8')
}

const loadBrands = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'brands.json'),'utf-8'))
}

const loadCategories = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'),'utf-8'))
}

const loadSections = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'sections.json'),'utf-8'))
}

module.exports = {
    loadProducts,
    loadBrands,
    loadCategories,
    loadSections,
    storeProducts,
}