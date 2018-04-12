import express from 'express';
import validate from 'express-validation';

import categoryValidator from '../validators/CategoryValidator';

import * as categoryController from '../controllers/CategoryController';

const categoryRoute = express.Router();

categoryRoute.post('/add', validate(categoryValidator.createCategory), categoryController.createCategory);
categoryRoute.get('/:categoryName/products', validate(categoryValidator.getProductsByCategoryName), categoryController.getProductsByCategoryName);
categoryRoute.get('/', categoryController.getRootCategories);

export default categoryRoute;
