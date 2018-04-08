import Joi from 'joi';

export default {
  createUser: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    }
  },
  editUser: {
    params: {
      userId: Joi.number().integer().min(1).required(),
    },
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
    }
  },
  deleteUser: {
    params: {
      userId: Joi.number().integer().min(1).required(),
    }
  },
  isUserExists: {
    params: {
      email: Joi.string().required(),
    }
  },
  authUser: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  }
};