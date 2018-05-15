import Joi from 'joi';

export default {
  createReservation: {
    body: {
      date: Joi.date().required(),
      time: Joi.date().required(),
      peopleCount: Joi.number().required(),
      phoneNumber: Joi.string().required(),
    }
  },
};
