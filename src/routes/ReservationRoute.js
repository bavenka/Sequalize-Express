import express from 'express';
import validate from 'express-validation';

import reservationValidator from '../validators/ReservationValidator';

import * as reservationController from '../controllers/ReservationController';

const reservationRoute = express.Router();

reservationRoute.get(
    '/',
    reservationController.getAllReservations
  );

reservationRoute.delete(
  '/:reservationId',
  reservationController.deleteReservation
);



export default reservationRoute;
