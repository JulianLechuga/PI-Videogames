const { DataTypes, Sequelize } = require('sequelize');

let myGames = 100000
let db = 201

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: function() {
        myGames++
        return `${db}${myGames}`
      },
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING(50000),
      allowNull: true
    },
    released: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    background_image: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: "http://pm1.narvii.com/6295/29d5c8404945e4e2490e58cc03bbb1397261dad3_00.jpg"
    }
  }, {timestamps: false});
};
