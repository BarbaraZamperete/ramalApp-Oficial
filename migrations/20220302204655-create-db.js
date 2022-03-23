'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS User (
      id INT NOT NULL AUTO_INCREMENT,
      login VARCHAR(45) NOT NULL,
      senha VARCHAR(45) NOT NULL,
      adm INT NOT NULL,
      PRIMARY KEY (id))
    ENGINE = InnoDB;`)

    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS Servidor (
      matricula VARCHAR(45) NOT NULL,
      nome VARCHAR(45) NOT NULL,
      cargo VARCHAR(45) NULL,
      chefia TINYINT NULL,
      PRIMARY KEY (matricula))
    ENGINE = InnoDB;`)

    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS RamalV (
      id INT NOT NULL AUTO_INCREMENT,
      Servidor_matricula VARCHAR(45) NOT NULL,
      numero VARCHAR(45) NOT NULL,
      senha VARCHAR(45) NOT NULL,
      PRIMARY KEY (id, Servidor_matricula),
      
      CONSTRAINT fk_RamalV_Servidor
        FOREIGN KEY (Servidor_matricula)
        REFERENCES Servidor (matricula)
        ON DELETE CASCADE
        ON UPDATE CASCADE)
    ENGINE = InnoDB;`)


    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS Setor (
      id INT NOT NULL AUTO_INCREMENT,
      nome VARCHAR(45) NOT NULL,
      andar VARCHAR(45) NULL,
      PRIMARY KEY (id))
    ENGINE = InnoDB;`)


    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS RamalF (
      id INT NOT NULL AUTO_INCREMENT,
      Setor_id INT NOT NULL,
      numero VARCHAR(45) NOT NULL,
      bastidor VARCHAR(3) NULL,
      slot VARCHAR(3) NULL,
      terminacao VARCHAR(3) NULL,
      tipo VARCHAR(45) NOT NULL,
      grupo VARCHAR(45) NULL,
      categoria VARCHAR(45) NULL,
      observacao VARCHAR(45) NULL,
      PRIMARY KEY (id, Setor_id),
      INDEX fk_RamalF_Setor (Setor_id ASC) VISIBLE,
      CONSTRAINT fk_RamalF_Setor
        FOREIGN KEY (Setor_id)
        REFERENCES Setor (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE)
    ENGINE = InnoDB;`)



    await queryInterface.sequelize.query(`CREATE TABLE IF NOT EXISTS Setor_Servidor (
      Setor_id INT NOT NULL,
      Servidor_matricula VARCHAR(45) NOT NULL,
      PRIMARY KEY (Setor_id, Servidor_matricula),
      INDEX fk_Setor_Servidor_Servidor (Servidor_matricula ASC) VISIBLE,
      INDEX fk_Setor_Servidor_Setor (Setor_id ASC) VISIBLE,
      CONSTRAINT fk_Setor_Servidor_Setor
        FOREIGN KEY (Setor_id)
        REFERENCES Setor (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_Setor_Servidor_Servidor
        FOREIGN KEY (Servidor_matricula)
        REFERENCES Servidor (matricula)
        ON DELETE CASCADE
        ON UPDATE CASCADE)
    ENGINE = InnoDB;`)
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.sequelize.query(`DROP TABLE User`);
    await queryInterface.sequelize.query(`DROP TABLE RamalV`);
    await queryInterface.sequelize.query(`DROP TABLE RamalF`);
    await queryInterface.sequelize.query(`DROP TABLE Setor_Servidor`);
    await queryInterface.sequelize.query(`DROP TABLE Servidor`);
    await queryInterface.sequelize.query(`DROP TABLE Setor`);
    
  }
};
