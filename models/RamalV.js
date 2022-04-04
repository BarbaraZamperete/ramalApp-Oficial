const Sequelize = require("sequelize");
const db = require("../models/db");

const RamalV = db.define(
  "RamalV",
  {
    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    senha: Sequelize.STRING(50),
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = RamalV;
