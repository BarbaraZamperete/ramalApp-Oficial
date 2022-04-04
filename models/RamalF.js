const Sequelize = require("sequelize");
const db = require("../models/db");

const RamalF = db.define(
  "RamalF",
  {
    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    bastidor: Sequelize.STRING(5),
    slot: Sequelize.STRING(5),
    terminacao: Sequelize.STRING(5),
    tipo: Sequelize.STRING(15),
    grupo: Sequelize.STRING(30),
    categoria: Sequelize.STRING(15),
    observacao: Sequelize.STRING(250),
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = RamalF;
