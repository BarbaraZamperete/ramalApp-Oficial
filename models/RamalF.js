const Sequelize = require("sequelize");
const db = require("../models/db");

const RamalF = db.define(
  "ramaisF",
  {
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
  },
  {
    timestamps: false,
  }
);

module.exports = RamalF;
