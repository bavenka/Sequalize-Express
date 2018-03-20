import connect from '../connect';

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
    }
}, { timestamps: false });   

export default Product;