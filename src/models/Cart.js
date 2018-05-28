import connect from '../database/connect';

const {
  sequelize,
  Sequelize
} = connect;

const Cart = sequelize.define('cart', {
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, {
  timestamps:false
});

export default Cart;
