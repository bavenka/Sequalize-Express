import connect from '../connect';
import Product from '../models/Product';

import ErrorBase from '../server-error';
import {
    ERROR_TYPES
} from '../server-error/constants';

const {
    Sequelize
} = connect;

export const createProduct = (product) => {
    return Product.create(product)
        .catch(e => {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new ErrorBase(ERROR_TYPES.PRODUCT_EXISTS, 409, `Product with name = ${product.name} already exists.`);
            } else {
                throw e;
            }
        })
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

export const getAllProducts = (limit, offset) => Product.findAll({
    offset,
    limit
});