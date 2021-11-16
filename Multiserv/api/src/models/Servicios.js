const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("servicios", {
    // id: {
    //   type:DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoincrement: true
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currency: {
      type: DataTypes.ENUM('USD', 'MXN', 'ARS', 'COP'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // uidProvider: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    // idAdress: {
    //   type: DataTypes.STRING,
    // },
  });
};