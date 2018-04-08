import jwt from 'jsonwebtoken';

import config from '../../config';
import {ERROR_TYPES} from "../server-error/constants";
import ErrorBase from "../server-error";

export const signToken = (user, roles) => {
    const { secret, options } = config.jwt;

    return jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
    }, secret, options);
};

export const verifyToken = (req, res, next) => {
  const { secret } = config.jwt;
  const token = req.headers['token'];

  return jwt.verify(token, secret,
    (e, encoded)=> {
      if(e) {
        throw new ErrorBase(ERROR_TYPES.AUTH_ERROR, 401, e.message);
      }
      const { roles } = encoded;
      req.roles = roles;
      next();
    })
};

