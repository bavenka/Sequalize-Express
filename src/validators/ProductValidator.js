import Joi from 'joi';
import { ProductType } from '../models/enums/ProductType';

export default {
    createProduct: {
        body: {
            name: Joi.string().required(),
            price: Joi.number().required(),
            image: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.string().valid(...Object.values(ProductType)),
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
            status: Joi.string().valid(...Object.values(ProductType)),
        }
    },
    deleteProduct: {
        params: {
            productId: Joi.number().integer().min(1).required(),
        }
    },
};