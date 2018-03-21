import Joi from 'joi';

export default {
    createCategory: {
        body: {
            name: Joi.string().required(),
        }
    },
    getProductsByCategoryId: {
        params: {
            categoryId: Joi.number().integer().min(1).required(),
        }
    },
};


