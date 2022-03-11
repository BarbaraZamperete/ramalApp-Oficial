'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.sequelize.query(`INSERT INTO User
     (
       login, senha, adm
     ) VALUES(
       "barbara", "barbara", 2
     )`)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('User', null, {});
     await queryInterface.sequelize.query(`
       ALTER TABLE User AUTO_INCREMENT = 1
       `);
  }
};
