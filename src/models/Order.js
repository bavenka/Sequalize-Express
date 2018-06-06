import connect from '../database/connect';
import OrderProduct from './OrderProduct';

const {
    sequelize,
    Sequelize
} = connect;

const Order = sequelize.define('order', {
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
}, { timestamps: false });

Order.hasMany(OrderProduct, {as: 'OrderProducts'})
OrderProduct.belongsTo(Order);

export default Order;