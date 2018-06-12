import connect from '../database/connect';
import User from "./User";
import Product from "./Product";

const {
  sequelize,
} = connect;

const Cart = sequelize.define('cart', {},
  {
    timestamps: false
  });

User.belongsToMany(Product, {as: 'Products', through: Cart, foreignKey: 'userId', timestamps: false});
Product.belongsToMany(User, {as: 'Users', through: Cart, foreignKey: 'productId', timestamps: false});

export default Cart;
