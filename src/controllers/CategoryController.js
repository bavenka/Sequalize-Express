import * as categoryService from '../services/CategoryService';

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

export const getProductsByCategoryId = (req, res, next) => {
    const categoryId = req.params.categoryId;
    const { offset, limit } = req.query;
    categoryService
        .getProductsByCategoryId(categoryId, offset, limit)
        .then(data => res.status(200).json(data))
        .catch(e => {
            next(e)
        })
};
