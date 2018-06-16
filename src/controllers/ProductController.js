import * as productService from '../services/ProductService';


export const saveProduct = (req, res, next) => {
    productService
        .createProduct(req.body)
        .then(data => res.status(201).json(data))
        .catch(e => {
            next(e)
        })
};

export const updateProduct = (req, res, next) => {
    const productId = req.params.productId;
    productService
        .editProduct(req.body, productId)
        .then(([rowsUpdate, [data]]) => data ? res.status(200).json(data) : res.status(204).end())
        .catch(e => {
            next(e)
        })
};

export const deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    productService
        .deleteProduct(productId)
        .then(data => res.status(data ? 200 : 204).end())
        .catch(e => {
            next(e)
        })
};

export const getAllProducts = (req, res, next) => {
    const { offset, limit } = req.query;
    productService
        .getAllProducts(offset, limit)
        .then(data => res.status(200).json(data))
        .catch(e => {
            next(e)
        })
};

export const getPopularProducts = (req, res, next) => {
  const { limit } = req.query;
  productService.getPopularProducts(limit)
    .then(data => res.status(200).json(data))
    .catch(e => {
      next(e)
    })
};
