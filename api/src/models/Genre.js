const { DataTypes, Sequelize } = require('sequelize');
const { API_KEY } = process.env;
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    games_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {timestamps: false});
};