const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "shoppingCar",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: true, createdAt: false }
  );
};