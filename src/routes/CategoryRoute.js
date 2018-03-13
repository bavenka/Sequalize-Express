import express from 'express';
import validate from 'express-validation';

import * as categoryValidator from '../validators/categoryValidator';

import * as categoryController  from '../controllers/CategoryController';

const categoryRoute = express.Router();

categoryRoute.post('/add', validate(categoryValidator.createCategory), categoryController.createCategory);
categoryRoute.get('/', categoryController.getRootCategories);

export default categoryRoute;