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
    .getProductsByUserId(userId)
    .then(data => res.status(200).json(data))
    .catch(e => {
      next(e)
    })
};

export const deleteProductFromCart = (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  cartService
    .removeProductFromCart(userId, productId)
    .then(data => res.status(data ? 200 : 204).end())
    .catch(e => {
      next(e)
    })
};

export const clearProductsCart = (req, res, next) => {
  const userId = req.params.userId;

  cartService
    .clearProductsCart(userId)
    .then(data => res.status(data ? 200 : 204).end())
    .catch(e => {
      next(e)
    })
};
