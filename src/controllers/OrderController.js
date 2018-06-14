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
