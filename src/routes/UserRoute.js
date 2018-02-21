import express from 'express';

import * as userController from '../controllers/UserController';

const userRoute = express.Router();

userRoute.post('/create', userController.saveUser);

export default userRoute;