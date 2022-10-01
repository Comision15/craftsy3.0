'use strict';

const sectionsJson = require('../../data/sections.json');

const sections = sectionsJson.map(section => {
    return {
        name : section,
        createdAt : new Date()
    }
})


module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Sections', sections, {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Sections', null, {});
    
  }
};
