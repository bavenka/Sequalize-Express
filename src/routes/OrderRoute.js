import express from 'express';

import * as orderController  from '../controllers/OrderController';

const orderRoute = express.Router();

orderRoute.get('/', orderController.getAllOrders);

orderRoute.put('/:orderId/update', orderController.updateOrder);

export default orderRoute;
