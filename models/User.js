const Sequelize = require("sequelize");
const db = require("../models/db");

const User = db.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    login: Sequelize.STRING(50),
    senha: Sequelize.STRING(50),
    role: Sequelize.INTEGER,
  },
  {
    timestamps: false,
  }
);

module.exports = User;
