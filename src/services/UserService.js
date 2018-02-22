import User from '../models/User';

import ErrorBase from '../server-error';
import { ERROR_TYPES } from '../server-error/constants';

export const createUser = async (user) => {
    const existingUser = await User.findOne({ where: { email: user.email } });

    if (existingUser) {
        throw new ErrorBase(ERROR_TYPES.EMAIL_EXISTS, 409, `User with email = ${user.email} already exists.`);
    }

    return User.create(user);
};
