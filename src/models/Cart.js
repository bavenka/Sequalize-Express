import connect from '../database/connect';
import User from "./User";
import Product from "./Product";

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

User.belongsToMany(Product, { as: 'Products', through: Cart, foreignKey: 'userId', timestamps: false });
Product.belongsToMany(User, { as: 'Users', through: Cart, foreignKey: 'productId', timestamps: false });

export default Cart;
