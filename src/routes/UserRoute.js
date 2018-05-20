import express from 'express';
import validate from 'express-validation';
import { RoleType} from '../models/enums/RoleType';

import userValidator from '../validators/UserValidator';
import reservationValidator from '../validators/ReservationValidator';

import { verifyToken  } from '../services/TokenService';
import { verifyRole  } from '../services/RoleService';
import * as userController from '../controllers/UserController';
import * as reservationController from '../controllers/ReservationController';
import reservationRoute from "./ReservationRoute";

const userRoute = express.Router();

/*verifyToken, (req, res, next) => verifyRole(req, res, next, RoleType.ADMIN)*/

userRoute.post('/create', validate(userValidator.createUser), userController.saveUser);

userRoute.post(
  '/:userId/reservation/create',
  validate(reservationValidator.createReservation),
  reservationController.saveReservation
);

userRoute.put(
  '/:userId/reservation/update',
  validate(reservationValidator.updateReservation),
  reservationController.updateReservation
);

userRoute.get(
  '/:userId/reservations',
  validate(reservationValidator.getReservations),
  reservationController.getReservations
);


userRoute.put(
  '/:userId/edit',
  validate(userValidator.editUser),
  userController.updateUser
);

userRoute.delete('/:userId/delete', validate(userValidator.deleteUser), userController.deleteUser);

export default userRoute;
