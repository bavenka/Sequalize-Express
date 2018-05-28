import * as cartService from '../services/CartService';

export const addProductToCart = (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  cartService
    .addProductToCart(userId, productId)
    .then(data => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};

export const getCartProductsByUserId = (req, res, next) => {
  const userId = req.params.userId;
  cartService
    .getCartProductsByUserId(userId)
    .then(data => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};
