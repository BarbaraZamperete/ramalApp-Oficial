const Sequelize = require("sequelize");
const db = require("../models/db");

const Servidor = db.define(
  "servidores",
  {
    matricula: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    nome: Sequelize.STRING(150),
    cargo: Sequelize.STRING(50),
    chefia: Sequelize.INTEGER(1),
  },
  {
    timestamps: false,
  }
);

Servidor.associate = models => {
  Servidor.hasOne(models.RamalV);
};

module.exports = Servidor;
