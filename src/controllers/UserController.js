import * as userService from '../services/UserService';


export const saveUser = (req, res, next) => {
    userService
        .createUser(req.body)
        .then(data => res.status(201).json(data))
        .catch(e => {
            console.log(e);
            next(e)
        })
};