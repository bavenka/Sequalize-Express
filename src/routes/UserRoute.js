import express from 'express';
import validate from 'express-validation';
import { RoleType} from '../models/enums/RoleType';

import userValidator from '../validators/UserValidator';

import { verifyToken  } from '../services/TokenService';
import { verifyRole  } from '../services/RoleService';
import * as userController from '../controllers/UserController';

const userRoute = express.Router();

/*verifyToken, (req, res, next) => verifyRole(req, res, next, RoleType.ADMIN)*/

userRoute.post('/create', validate(userValidator.createUser), userController.saveUser);

userRoute.put(
  '/:userId/edit',
  validate(userValidator.editUser),
  userController.updateUser
);

userRoute.delete('/:userId/delete', validate(userValidator.deleteUser), userController.deleteUser);

export default userRoute;
