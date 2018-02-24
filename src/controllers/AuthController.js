import * as authService from '../services/AuthService';

export const register = (req, res, next) => {
    authService
        .signup(req.body)
        .then(data => res.status(200).json(data))
        .catch(e => {
            next(e)
        })
};

export const authenticate = (req, res, next) => {
    authService
        .login(req.body.email, req.body.password)
        .then(data => res.status(200).json(data))
        .catch(e => next(e))
};