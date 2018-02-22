import express from 'express';
import validate from 'express-validation';

import userValidator from '../validators/UserValidator';

import * as userController from '../controllers/UserController';

const userRoute = express.Router();

userRoute.post('/create', validate(userValidator.createUser), userController.saveUser);

export default userRoute;