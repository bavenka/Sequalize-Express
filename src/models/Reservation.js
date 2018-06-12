import connect from '../database/connect';
import Role from './Role';
import {OrderType} from "./enums/OrderType";
import Product from "./Product";
import OrderProduct from "./OrderProduct";

const {
  sequelize,
  Sequelize
} = connect;

const Reservation = sequelize.define('reservation', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  time: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  peopleCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: OrderType.IN_PROCESSING,
  }
}, {
  timestamps:false
});

Reservation.hasMany(OrderProduct);

OrderProduct.belongsTo(Reservation);

export default Reservation;
