import Joi from 'joi';

export default {
  createReservation: {
    params: {
      userId: Joi.number().integer().min(1).required(),
    },
    body: {
      date: Joi.date().required(),
      time: Joi.date().required(),
      peopleCount: Joi.number().required(),
      phoneNumber: Joi.string().required(),
    }
  },
};
