import * as orderService from '../services/OrderService';

export const orderProducts = (req, res, next) => {
  const userId = req.params.userId;
  orderService
    .orderProducts(userId, req.body)
    .then((data) => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};

export const getOrdersByUserId = (req, res, next) => {
  const userId = req.params.userId;
  orderService
    .getOrdersByUserId(userId)
    .then((data) => res.status(200).json(data))
    .catch(e => {
      next(e)
    })
};

export const getAllOrders = (req, res, next) => {
  orderService
    .getAllOrders()
    .then((data) => res.status(200).json(data))
    .catch(e => {
      next(e)
    })
};

export const updateOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  const {date, time, status} = req.body;

  orderService
    .updateOrderById(orderId, date, time, status)
    .then((data) => res.status(200).json(data))
    .catch(e => {
      next(e)
    })
};
