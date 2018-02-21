import User from '../models/User';

import ServerError from '../server-error';
import { ERROR_TYPES } from '../server-error/constants';

export const createUser = async (user) => {
    const existingUser = await User.findOne({ where: { email: user.email } });

    if (existingUser) {
        throw new ServerError(`User with email = ${user.email} already exists.`, ERROR_TYPES.EMAIL_EXISTS, 409);
    }

    return User.create(user);
} 
