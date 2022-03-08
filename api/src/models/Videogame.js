const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID, //  de apiduda min 20
        defaultValue: DataTypes.UUIDV4, // si no le pasamos un id se genera automaticamente
        allowNull: false, // no puede ser null
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      released: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      platform: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      genre: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
      },
      createdDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
