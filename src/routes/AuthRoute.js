import express from 'express';
import validate from 'express-validation';

import userValidator from '../validators/UserValidator';

import * as authController  from '../controllers/AuthController';

const authRoute = express.Router();

authRoute.post('/signup', validate(userValidator.createUser), authController.register);

authRoute.post('/login', validate(userValidator.authUser), authController.authenticate);

export default authRoute;