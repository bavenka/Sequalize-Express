import express from 'express';
import validate from 'express-validation';

import categoryValidator from '../validators/CategoryValidator';

import * as categoryController from '../controllers/CategoryController';

const categoryRoute = express.Router();

categoryRoute.post('/add', validate(categoryValidator.createCategory), categoryController.createCategory);
categoryRoute.put('/:categoryId/edit', validate(categoryValidator.editCategory), categoryController.updateCategory);
categoryRoute.delete('/:categoryId/delete', validate(categoryValidator.deleteCategory), categoryController.deleteCategory);
categoryRoute.get('/:categoryName/products', validate(categoryValidator.getProductsByCategoryName), categoryController.getProductsByCategoryName);
categoryRoute.get('/', categoryController.getRootCategories);

export default categoryRoute;
