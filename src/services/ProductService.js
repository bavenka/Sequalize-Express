import connect from '../database/connect';
import Product from '../models/Product';
import Category from '../models/Category';

import ErrorBase from '../server-error';
import {
  ERROR_TYPES
} from '../server-error/constants';

const {
  sequelize,
  Sequelize
} = connect;

export const createProduct = async (product) => {
  try {

    let category = null;
    let {categoryName, ...existingProduct} = product;

    const transaction = await sequelize.transaction();

    if (categoryName === 'all') {
      category = await Category.findOne({
        where: {
          name: categoryName,
        },
        transaction,
      });

      if (!category) {
        throw new ErrorBase(ERROR_TYPES.CATEGORY_EXISTS, 409, `Category with name = ${category.name} is not exists.`);
      }
    }

    let createdProduct = await Product.create(
      existingProduct,
      {transaction},
    );

    if (category) {
      createdProduct = await category.addProduct(createdProduct, {
        transaction
      });
    }
    await transaction.commit();

    return createdProduct;
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      throw new ErrorBase(ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with name = ${product.name} already exists.`);
    } else {
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
}

export const getAllProducts = (offset, limit) => Product.findAndCountAll({
  offset,
  limit
});

