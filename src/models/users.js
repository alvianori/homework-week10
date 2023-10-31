const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const { DataTypes } = Sequelize;

const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
    schema: "public",
    timestamps: false,
  }
);

module.exports = users;
