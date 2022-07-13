const { DataTypes } = require("sequelize");
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize
 */
module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      dni: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      profile_picture: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      typeUser: {
        type: DataTypes.ENUM("N", "SU"),
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timeStamps: false, createdAt: false, updatedAt: false }
  );
};
