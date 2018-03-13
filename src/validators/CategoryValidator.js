import Joi from 'joi';

export const createCategory = {
    body: {
        name: Joi.string().required(),
    },
};