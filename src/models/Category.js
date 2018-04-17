import Product from './Product';
import connect from '../database/connect';

const {
  sequelize,
  Sequelize
} = connect;

const Category = sequelize.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {timestamps: false});

Category.hasMany(Product, {as: 'Products'})
Product.belongsTo(Category);

export default Category;
