import express from 'express';
import validate from 'express-validation';

import * as categoryValidator from '../validators/CategoryValidator';

import * as categoryController from '../controllers/CategoryController';

const categoryRoute = express.Router();

categoryRoute.post('/add', validate(categoryValidator.createCategory), categoryController.createCategory);
categoryRoute.get('/:categoryId/products', validate(categoryValidator.getProductsByCategoryId), categoryController.getProductsByCategoryId);
categoryRoute.get('/', categoryController.getRootCategories);

export default categoryRoute;