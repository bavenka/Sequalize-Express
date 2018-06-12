import User from '../models/User';
import Cart from '../models/Cart';
import WishList from '../models/WishList';
import Product from '../models/Product';
import {ERROR_TYPES} from "../server-error/constants";
import ErrorBase from "../server-error";
import connect from "../database/connect";


const {
  sequelize,
} = connect;

export const addProductToWishList = async (userId, productId) => {
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

    const userItem = await WishList.findOne({
      where: {
        productId,
        userId,
      },
      transaction,
    });

    if (userItem) {
      throw new ErrorBase (ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with id = ${productId} already exists in wish list.`)
    }

    const addedProduct = await user.addWishProduct(product, {
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
      as: 'WishProducts',
      through: {
        attributes: [],
      }
    }],
    where: {
      id: userId,
    },
    attributes: [],
  });

  return info ? info.WishProducts : [];
};

export const removeProductFromWishList = async (userId, productId) => {
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

    await WishList.destroy({
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

export const clearWishList = async (userId) => {
  await WishList.destroy({
    where: {
      userId,
    }
  })
};

export const moveProductToCart = async (userId, productId) => {
  const transaction = await sequelize.transaction();
  try {
    const user = await
    User.findOne({
      where: {
        id: userId,
      },
      transaction,
    });

    if (!user) {
      throw new ErrorBase(ERROR_TYPES.USER_IS_NOT_EXISTS, 409, `User with id = ${userId} is not exists.`);
    }

    const product = await
    Product.findOne({
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

    await user.addProduct(product, {
      transaction
    });

    await WishList.destroy({
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
