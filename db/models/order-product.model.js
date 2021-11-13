const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');
const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    allowNull: false,
    field: 'order_id',
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    allowNull: false,
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'updated_at',
  },
};

class OrderProduct extends Model {
  static associate() {
    // this.belongsToManygsTo(models.Order, { as: 'order' });
    // this.belongsToManygsTo(models.Product, { as: 'product' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'OrderProduct',
      timestamp: false,
    };
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
