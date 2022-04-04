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
     await queryInterface.sequelize.query(`INSERT INTO Setor
     (
       nome, andar
     ) VALUES(
       "Setor Nulo","0"
     )`)
    //  await queryInterface.sequelize.query(`INSERT INTO Setor
    //  (
    //    nome, andar
    //  ) VALUES(
    //    "NTI","segundo"
    //  )`)
     
    //  await queryInterface.sequelize.query(`INSERT INTO RamalF
    // (
    //   numero, tipo, Setor_id
    // ) VALUES(
    //   "4711","analógico", 2
    // )`)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Setor', null, {});
    //  await queryInterface.bulkDelete('RamalF', null, {});
     await queryInterface.sequelize.query(`
       ALTER TABLE Setor AUTO_INCREMENT = 1
       `);
    //  await queryInterface.sequelize.query(`
    //  ALTER TABLE RamalF AUTO_INCREMENT = 1
    //  `)
  }
};
