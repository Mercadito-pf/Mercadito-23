const { DataTypes } = require('sequelize');
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