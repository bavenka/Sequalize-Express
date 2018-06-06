import connect from '../database/connect';
import User from '../models/User';

import ErrorBase from '../server-error';
import {
    ERROR_TYPES
} from '../server-error/constants';

const {
    Sequelize
} = connect;

export const createUser = (user, transaction) => {
        return User.create(user, { transaction} )
        .catch(e => {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new ErrorBase(ERROR_TYPES.EMAIL_EXISTS, 409, `User with email = ${user.email} already exists.`);
            } else {
                throw e;
            }
        })
};

export const editUser = (user, userId) => {
        return User.update(user, {
            returning: true,
            where: {
                id: userId
            }
        })
        .catch(e => {
            if (e.name === 'SequelizeUniqueConstraintError') {
                throw new ErrorBase(ERROR_TYPES.EMAIL_EXISTS, 409, `User with email = ${user.email} already exists.`);
            } else {
                throw e;
            }
        })
};

export const deleteUser = (id) => {
        return User.destroy({
            where: {
                id
            }
        })
}