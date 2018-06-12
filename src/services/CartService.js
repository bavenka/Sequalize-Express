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

    const userItem = await Cart.findOne({
      where: {
        productId,
        userId,
      },
      transaction,
    });

    if (userItem) {
        throw new ErrorBase (ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with id = ${productId} already exists in shopping cart.`)
    }

    const addedProduct = await user.addProduct(product, {
      transaction
    });

    await transaction.commit();

    return addedProduct;

  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

export const getProductsByUserId = async (userId) => {

        const info = await User.findOne({
            include: [{
                model: Product,
                as: 'Products',
                through: {
                    attributes: ['count', 'total'],
                }
            }],
            where: {
                id: userId,
            },
          attributes: [],
        });

        return info ? info.Products : [];
};

export const removeProductFromCart = async (userId, productId) => {
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

    await Cart.destroy({
      where: {
        userId,
        productId,
      },
      transaction,
    });

    await transaction.commit();

  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};

export const clearProductsCart = async (userId) => {
  await Cart.destroy({
    where: {
      userId,
    }
  })
};
