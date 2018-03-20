import Joi from 'joi';

export default {
    createProduct: {
        body: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
        }
    },
    editProduct: {
        params: {
            productId: Joi.number().integer().min(1).required(),
        },
        body: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
        }
    },
    deleteProduct: {
        params: {
            productId: Joi.number().integer().min(1).required(),
        }
    },
};