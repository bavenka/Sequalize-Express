import connect from '../database/connect';

const {
  sequelize,
  Sequelize,
} = connect;

const OrderProduct = sequelize.define('order_product', {
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
}, {
  timestamps:false
});


export default OrderProduct;
