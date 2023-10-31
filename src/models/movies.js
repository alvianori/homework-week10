const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
const { DataTypes } = Sequelize;

const movies = sequelize.define(
  "movies",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    genres: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    year: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    photo: {
      type: '"CHAR"',
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "movies",
    schema: "public",
    timestamps: false,
  }
);

module.exports = movies;
