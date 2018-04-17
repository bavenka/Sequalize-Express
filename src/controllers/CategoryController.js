import * as categoryService from '../services/CategoryService';
import * as productService from "../services/ProductService";

export const createCategory = (req, res, next) => {
    categoryService
        .createCategory(req.body)
        .then(data => res.status(201).json(data))
        .catch(e => next(e))
};

export const getRootCategories = (req, res, next) => {
    categoryService
        .getRootCategories()
        .then(data => res.status(200).json(data))
        .catch(e => {
            next(e)
        })
};

export const getProductsByCategoryName = (req, res, next) => {
    const categoryName = req.params.categoryName;
    const { offset, limit } = req.query;
    categoryService
        .getProductsByCategoryName(categoryName, offset, limit)
        .then(data => res.status(200).json(data))
        .catch(e => {
            next(e)
        })
};

export const updateCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  categoryService
    .editCategory(req.body, categoryId)
    .then(([rowsUpdate, [data]]) => data ? res.status(200).json(data) : res.status(204).end())
    .catch(e => {
      next(e)
    })
};

export const deleteCategory = (req, res, next) => {
  const categoryId = req.params.categoryId;
  categoryService
    .deleteCategory(categoryId)
    .then(data => res.status(data ? 200 : 204).end())
    .catch(e => {
      next(e)
    })
};
