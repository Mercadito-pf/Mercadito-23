const { DataTypes } = require('sequelize');
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
module.exports = (sequelize) => {
  sequelize.define('product', {
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true, 
      }
    },
    unit_price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      validate: {
        notNull: true, 
      }
    }, 
    state: {
        type: DataTypes.ENUM('NEW', 'USED'),
        allowNull: false,
        validate: {
          notNull: true, 
        }
    },
    QUANTITY_STOCK: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true, 
        }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {timeStamps: false,
    createdAt: false, // don't add createdAt attribute DECIMAL(20, 2)
    updatedAt: false});
};
