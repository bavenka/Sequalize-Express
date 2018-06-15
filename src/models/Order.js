import connect from '../database/connect';
import OrderProduct from './OrderProduct';
import {OrderType} from './enums/OrderType';

const {
  sequelize,
  Sequelize
} = connect;

const Order = sequelize.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: OrderType.IN_PROCESSING,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {timestamps: false});

Order.hasMany(OrderProduct, {as: 'OrderProducts'});
OrderProduct.belongsTo(Order);

export default Order;
