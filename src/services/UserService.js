import connect from '../connect';
import User from '../models/User';

import ErrorBase from '../server-error';
import {
    ERROR_TYPES
} from '../server-error/constants';

const {
    Sequelize
} = connect;

export const createUser = async (user) => {
    try {
        return await User.create(user);
    } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            throw new ErrorBase(ERROR_TYPES.EMAIL_EXISTS, 409, `User with email = ${user.email} already exists.`);
        }
    }
};

export const editUser = async (user, userId) => {
    try {
        return await User.update(user, {
            returning: true,
            where: {
                id: userId
            }
        });
    } catch (e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            throw new ErrorBase(ERROR_TYPES.EMAIL_EXISTS, 409, `User with email = ${user.email} already exists.`);
        }
    }
};