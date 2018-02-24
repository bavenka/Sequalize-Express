import express from 'express';
import validate from 'express-validation';

import userValidator from '../validators/UserValidator';

import * as userController from '../controllers/UserController';

const userRoute = express.Router();

userRoute.post('/create', validate(userValidator.createUser), userController.saveUser);

userRoute.put('/:userId/edit', validate(userValidator.editUser), userController.updateUser);

userRoute.delete('/:userId/delete', validate(userValidator.deleteUser), userController.deleteUser);

export default userRoute;