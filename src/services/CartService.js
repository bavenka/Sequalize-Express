import User from '../models/User';
import Cart from '../models/Cart';
import Product from '../models/Product';
import {ERROR_TYPES} from "../server-error/constants";
import ErrorBase from "../server-error";
import connect from "../database/connect";
import Category from "../models/Category";


const {
    sequelize,
} = connect;

export const addProductToCart = async (userId, productId) => {
    const transaction = await sequelize.transaction();
    try {

        const product = await Product.findOne({
            include: [{
                model: User,
                as: 'Users',
                through: {
                    where: {
                        userId,
                    }
                }
            }],
            where: {
                id: productId,
            },
            transaction,
        });
        return product;

        if (product.Users.length > 0) {
                throw new ErrorBase(ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with id = ${productId} already exists in shopping cart.`)
        }

        const cart = await Cart.create({total: product.price}, {transaction});

        await user.addCart(cart, {
            transaction
        });

        const addedProduct = await product.addCart(cart, {
            transaction
        });

        await transaction.commit();

        return createdCart;

    } catch (e) {
        await transaction.rollback();
        throw e;
    }
};

export const getProductsByUserId = async (userId) => {

        const users = await User.findAll({
            include: [{
                model: Product,
                as: 'Products',
                through: {
                    attributes: [],
                }
            }],
            where: {
                id: userId,
            },
        });

        return users.length === 0 ? users : users[0].Products;
};
