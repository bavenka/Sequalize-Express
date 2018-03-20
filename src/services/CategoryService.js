import connect from '../connect';
import Category from '../models/Category';
import Product from '../models/Product';

import ErrorBase from '../server-error';
import {
    ERROR_TYPES
} from '../server-error/constants';

const {
    Sequelize
} = connect;

export const createCategory = (category) => {
    return Category.create(category)
    .catch(e => {
        if (e.name === 'SequelizeUniqueConstraintError') {
            throw new ErrorBase(ERROR_TYPES.CATEGORY_EXISTS, 409, `Category with name = ${category.name} already exists.`);
        } else {
            throw e;
        }
    })
};

export const getRootCategories = () => Category.findAll();

export const getProductsByCategoryId = (categoryId) => {
    return Product.findAll({
        where: {
            categoryId,
        }
    })
}