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

    // await queryInterface.sequelize.query(`INSERT INTO Servidor
    // (
    //   matricula, nome, cargo, chefia
    // ) VALUES(
    //   "8001906", "Bárbara", "Estagiária", 0
    // )`)
    await queryInterface.sequelize.query(`INSERT INTO Servidor
    (
      matricula, nome, cargo, chefia
    ) VALUES(
      "0000000", "Servidor Nulo", "Controle", 0
    )`)

    // await queryInterface.sequelize.query(`INSERT INTO RamalV
    // (
    //   Servidor_matricula, numero, senha
    // ) VALUES(
    //   "0000000", "3110", "3110"
    // )`)
     
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     
     
    //  return queryInterface.selequize.query(`DELETE FROM Setor;
    //  ALTER SEQUENCE Setor_id_seq RESTART WITH 1;`);
    await queryInterface.bulkDelete('Servidor', null, {});
    // await queryInterface.bulkDelete('RamalV', null, {});
    // await queryInterface.sequelize.query(`
    //   ALTER TABLE RamalV AUTO_INCREMENT = 1
    //   `);
    
  }
};
