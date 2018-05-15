import express from 'express';
import validate from 'express-validation';

import reservationValidator from '../validators/ReservationValidator';

import * as reservationController from '../controllers/ReservationController';

const reservationRoute = express.Router();

reservationRoute.post('/create', validate(reservationValidator.createReservation), reservationController.saveReservation);


export default reservationRoute;
