const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('user', {
    id:{
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
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    typeUser: {
      type: DataTypes.ENUM('N', 'SU'),
      allowNull: false,
      validate: {
        notNull: true, 
      }
    }
  }, {timeStamps: false,
    createdAt: false,
    updatedAt: false});
};