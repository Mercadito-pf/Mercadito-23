const { DataTypes } = require('sequelize');
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
module.exports = (sequelize) => {
  sequelize.define('Order', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true, 
        }
    },
    total:{
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: true, 
        }
      },
    state: {
        type: DataTypes.ENUM('approved', 'inclined', 'pending'),
        allowNull: false,
        validate: {
          notNull: true, 
        }
    },
    transaction_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true, 
        }
      }
  }, {timeStamps: false,
    createdAt: false,
    updatedAt: false});
};
