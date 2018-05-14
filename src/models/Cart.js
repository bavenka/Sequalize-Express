import connect from '../database/connect';
import User from './User';
import Product from './Product';

const {
  sequelize,
  Sequelize
} = connect;

const Cart = sequelize.define('cart', {
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps:false
});

User.belongsToMany(Role, { as: 'Roles', through:'user_role', foreignKey: 'userId', timestamps: false });
Role.belongsToMany(User, { as: 'Users', through:'user_role', foreignKey: 'roleId', timestamps: false });

export default Cart;
