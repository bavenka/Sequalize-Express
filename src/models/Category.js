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
}, { timestamps: false });   

Category.hasMany(Product, {as: 'Products'})

export default Category;