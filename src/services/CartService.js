import User from '../models/User';
import Cart from '../models/Cart';
import Product from '../models/Product';
import {ERROR_TYPES} from "../server-error/constants";
import ErrorBase from "../server-error";
import connect from "../database/connect";


const {
  sequelize,
} = connect;

export const addProductToCart = async (userId, productId) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      transaction,
    });

    if (!user) {
      throw new ErrorBase(ERROR_TYPES.USER_IS_NOT_EXISTS, 409, `User with id = ${userId} is not exists.`);
    }

    const product = await Product.findOne({
      where: {
        id: productId,
      },
      transaction,
    });

    if (!product) {
      throw new ErrorBase(ERROR_TYPES.PRODUCT_IS_NOT_EXISTS, 409, `Product with id = ${productId} is not exists.`);
    }

    const userCarts = await user.getCarts();

    if (userCarts.length > 0) {
      const currentCart = userCarts.find(cart => cart.productId === Number(productId));
      if (currentCart) {
        throw new ErrorBase (ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with id = ${productId} already exists in shopping cart.`)
      }
    }

      const cart = await Cart.create({ total: product.price}, {transaction});

      await user.addCart(cart, {
        transaction
      });

      const createdCart = await product.addCart(cart, {
        transaction
      });

      await transaction.commit();

      return createdCart;

  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

export const getCartProductsByUserId = async (userId) => {
  const transaction = await sequelize.transaction();

  try {
    const user = await User.findOne({
      where: {
        id:userId,
      },
      transaction,
    });

    if (!user) {
      throw new ErrorBase(ERROR_TYPES.USER_IS_NOT_EXISTS, 409, `User with id = ${userId} is not exists.`);
    }

    const products = await Product.findAll({
      include: [{
        model: Cart, as: 'carts',
        include: [
          {
           model:User,
          }
        ]
      }]
    });

    await transaction.commit();

    return products
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};
