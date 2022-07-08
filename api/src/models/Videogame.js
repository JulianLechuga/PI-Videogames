const { DataTypes, Sequelize } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      }
    },
    metacritic: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100,
      }
    },
    playtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdInDatabase: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    background_image: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: "http://pm1.narvii.com/6295/29d5c8404945e4e2490e58cc03bbb1397261dad3_00.jpg"
    }
  }, {timestamps: false});
};
