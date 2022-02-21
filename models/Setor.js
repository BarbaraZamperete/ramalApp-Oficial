const Sequelize = require("sequelize");
const db = require("../models/db");

const Setor = db.define(
  "setores",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: Sequelize.STRING(150),
    andar: Sequelize.STRING(10),
  },
  {
    timestamps: false,
  }
);

Setor.associate = models => {
  Setor.hasMany(models.RamalF);
}

module.exports = Setor;
