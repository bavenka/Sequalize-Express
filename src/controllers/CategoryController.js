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
