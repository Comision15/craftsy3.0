'use strict';

const productsJson = require('../../data/products.json');

const brandsJson = require('../../data/brands.json');

const categoriesJson = require('../../data/categories.json');

const sectionsJson = require('../../data/sections.json');


const products = productsJson.map(({name, brand,price,discount,section,category}) => {
  console.log(+brandsJson.indexOf(brand) + 1)
    return {
        name,
        price,
        discount,
        description : 'lorem ipsum dolor amet sit',
        brandId : brandsJson.indexOf(brand) + 1,
        categoryId : categoriesJson.indexOf(category) + 1,
        sectionId : sectionsJson.indexOf(section) + 1,
        createdAt : new Date()
    }
})


module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Products', products, {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Products', null, {});
    
  }
};
