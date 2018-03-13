import connect from '../connect';

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

export default Category;