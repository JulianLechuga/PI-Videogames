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
      type: DataTypes.CHAR,
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
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:`https://cdn.pixabay.com/photo/2020/05/02/07/32/gaming-5120169_960_720.jpg`
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {timestamps: false});
};
