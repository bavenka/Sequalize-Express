import Joi from 'joi';

export default {
  createCategory: {
    body: {
      name: Joi.string().required(),
      order: Joi.number().integer().required(),
    }
  },
  getProductsByCategoryName: {
    params: {
      categoryName: Joi.string().required(),
    }
  },
  editCategory: {
    params: {
      categoryId: Joi.number().integer().min(1).required(),
    },
    body: {
      name: Joi.string().required(),
      order: Joi.number().integer().required(),
    }
  },
  deleteCategory: {
    params: {
      categoryId: Joi.number().integer().min(1).required(),
    }
  },
};


