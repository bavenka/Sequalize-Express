import connect from '../database/connect';
import Product from '../models/Product';
import Category from '../models/Category';

import ErrorBase from '../server-error';
import {
  ERROR_TYPES
} from '../server-error/constants';
import OrderProduct from "../models/OrderProduct";

const {
  Sequelize,
  sequelize,
} = connect;

export const createProduct = async (product) => {
  const transaction = await sequelize.transaction();
  try {

    let category = null;

    let {categoryName, ...existingProduct} = product;

    let createdProduct = await Product.create(
      existingProduct,
      {transaction},
    );

    if (categoryName === 'all') {
      await transaction.commit();
      return createdProduct;
    } else {
      category = await Category.findOne({
        where: {
          name: categoryName,
        },
        transaction,
      });

      if (!category) {
        throw new ErrorBase(ERROR_TYPES.CATEGORY_EXISTS, 409, `Category with name = ${category.name} is not exists.`);
      }
      createdProduct = await category.addProduct(createdProduct, {
        transaction
      });
    }
    await transaction.commit();

    return createdProduct;
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      await transaction.rollback();
      throw new ErrorBase(ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with name = ${product.name} already exists.`);
    } else {
      await transaction.rollback();
      throw e;
    }
  }
};

export const editProduct = (product, productId) => {
  return Product.update(product, {
    returning: true,
    where: {
      id: productId
    }
  })
    .catch(e => {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new ErrorBase(ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with name = ${product.name} already exists.`);
      } else {
        throw e;
      }
    })
};

export const deleteProduct = (id) => {
  return Product.destroy({
    where: {
      id
    }
  })
};

export const getAllProducts = (offset, limit) => Product.findAndCountAll({
  offset,
  limit
});

export const getPopularProducts = async (limit) => {
  const Op = Sequelize.Op;
  try {
    const orderProducts = await OrderProduct.findAll({
      attributes: ['productId'],
      group: ['productId'],
      order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
      limit,
    });

    const productsIds = await orderProducts.map(product => product.productId);

    return Product.findAll({
      where: {
        id: {
          [Op.in]: [...productsIds],
        }
      },
    });

  } catch (e) {
    throw e;
  }
};

