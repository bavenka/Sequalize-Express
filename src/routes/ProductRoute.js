import express from 'express';
import validate from 'express-validation';

import productValidator from '../validators/ProductValidator';

import * as productController from '../controllers/ProductController';

const productRoute = express.Router();

productRoute.post('/add', validate(productValidator.createProduct), productController.saveProduct);

productRoute.put('/:productId/edit', validate(productValidator.editProduct), productController.updateProduct);

productRoute.delete('/:productId/delete', validate(productValidator.deleteProduct), productController.deleteProduct);

productRoute.get('/', productController.getAllProducts);

productRoute.get('/popular', productController.getPopularProducts);

export default productRoute;
