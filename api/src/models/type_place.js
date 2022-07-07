const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('type_place', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('STATE', 'CITY', 'COUNTRY'),
        allowNull: false,
        validate: {
          notNull: true, 
        }
    }
  }, {timeStamps: false,
    createdAt: false,
    updatedAt: false});
};