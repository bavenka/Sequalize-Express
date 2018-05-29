import * as wishListService from '../services/WishListService';

export const moveProductToCartFromWishList = (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  wishListService
    .moveProductToCart(userId, productId)
    .then(data => res.status(200).json(data))
    .catch(e => {
      next(e)
    })
};

export const addProductToWishList = (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  wishListService
    .addProductToWishList(userId, productId)
    .then(data => res.status(201).json(data))
    .catch(e => {
      next(e)
    })
};

export const getWishListByUserId = (req, res, next) => {
  const userId = req.params.userId;
  wishListService
    .getProductsByUserId(userId)
    .then(data => res.status(200).json(data))
    .catch(e => {
      next(e)
    })
};

export const deleteProductFromWishList = (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  wishListService
    .removeProductFromWishList(userId, productId)
    .then(data => res.status(data ? 200 : 204).end())
    .catch(e => {
      next(e)
    })
};

export const clearWishList = (req, res, next) => {
  const userId = req.params.userId;

  wishListService
    .clearWishList(userId)
    .then(data => res.status(data ? 200 : 204).end())
    .catch(e => {
      next(e)
    })
};
