import Joi from 'joi';
import { OrderType } from "../models/enums/OrderType";

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
  updateReservation: {
    params: {
      userId: Joi.number().integer().min(1).required(),
    },
    body: {
      id: Joi.number().integer().min(1).required(),
      status: Joi.string().valid(...Object.values(OrderType))
    }
  },
  getReservations: {
    params: {
      userId: Joi.number().integer().min(1).required(),
    }
  }
};
