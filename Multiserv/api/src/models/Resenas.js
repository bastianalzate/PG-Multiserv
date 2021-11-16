const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        },
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    uidClient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idService: {
        type: DataTypes.STRING,
        allowNull: false
    },
  });
};