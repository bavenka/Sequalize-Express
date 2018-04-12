import Joi from 'joi';

export default {
    createCategory: {
        body: {
            name: Joi.string().required(),
        }
    },
    getProductsByCategoryName: {
        params: {
            categoryName: Joi.string().required(),
        }
    },
};


