import connect from '../database/connect';
import User from "./User";
import Product from "./Product";

const {
  sequelize,
} = connect;

const WishList = sequelize.define('wish_list', {
}, {
  timestamps:false
});

User.belongsToMany(Product, { as: 'WishProducts', through:'wish_list', foreignKey: 'userId', timestamps: false });
Product.belongsToMany(User, { as: 'WishProductUsers', through:'wish_list', foreignKey: 'productId', timestamps: false });


export default WishList;

