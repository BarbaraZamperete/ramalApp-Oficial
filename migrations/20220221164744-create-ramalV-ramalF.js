"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("ramaisV", {
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      senha: Sequelize.STRING(50),
    });
    await queryInterface.createTable("ramaisF", {
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      bastidor: Sequelize.INTEGER,
      slot: Sequelize.INTEGER,
      terminacao: Sequelize.INTEGER,
      tipo: Sequelize.STRING(15),
      grupo: Sequelize.STRING(30),
      categoria: Sequelize.STRING(15),
      observacao: Sequelize.STRING(250),
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("ramaisV");
    await queryInterface.dropTable("ramaisF");
  },
};
