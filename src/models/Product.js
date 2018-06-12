import connect from '../database/connect';
import { ProductType } from './enums/ProductType';
import OrderProduct from "./OrderProduct";

const {
    sequelize,
    Sequelize
} = connect;

const Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ProductType.NEW,
    }
}, { timestamps: false });

Product.hasMany(OrderProduct);

OrderProduct.belongsTo(Product);

export default Product;
