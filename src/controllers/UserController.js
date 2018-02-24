import * as userService from '../services/UserService';


export const saveUser = (req, res, next) => {
    userService
        .createUser(req.body)
        .then(data => res.status(201).json(data))
        .catch(e => {
            next(e)
        })
};

export const updateUser = (req, res, next) => {
    const userId = req.params.userId;
    userService
        .editUser(req.body, userId)
        .then(([rowsUpdate, [data]]) => data ? res.status(200).json(data) : res.status(204).end())
        .catch(e => {
            next(e)
        })
};

export const deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    userService
        .deleteUser(userId)
        .then(data => res.status(data ? 200 : 204).end())
        .catch(e => {
            next(e)
        })
};