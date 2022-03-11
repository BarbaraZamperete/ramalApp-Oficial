const Sequelize = require("sequelize");
const db = require("../models/db");

const Setor = db.define(
  "Setor",
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
    freezeTableName: true,
  }
);

Setor.associate = models => {
  Setor.hasMany(models.RamalF);
  Setor.belongsToMany(models.Servidor, {through: 'Setor_Servidor'});
}

module.exports = Setor;
