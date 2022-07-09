const { DataTypes } = require('sequelize');
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
module.exports = (sequelize) => {
  sequelize.define('qualification', {
    qualification: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true, 
        }
    }
  }, {timeStamps: false,
    createdAt: false,
    updatedAt: false});
};