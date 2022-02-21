"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("servidores", {
      matricula: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nome: Sequelize.STRING(150),
      cargo: Sequelize.STRING(50),
      chefia: Sequelize.INTEGER(1),
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('sevidores');
  },
};
