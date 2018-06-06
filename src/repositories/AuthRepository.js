import connect from '../database/connect';
import {
    RoleType
} from '../models/enums/RoleType';
import User from '../models/User';
import {
    createUser
} from '../services/UserService';
import {
    getRoleByName,
} from '../services/RoleService';
import {
    signToken
} from '../services/TokenService';

import {
    hash,
    compare,
} from '../utils/PasswordUtils';
import ErrorBase from '../server-error';
import {
    ERROR_TYPES
} from '../server-error/constants';

const {
    Sequelize,
    sequelize
} = connect;

export const signup = async (user) => {
    const transaction = await sequelize.transaction();
    try {
        const {
            password
        } = user;

        const role = await getRoleByName(RoleType.USER, transaction);
        user.password = await hash(password);

        const existingUser = await createUser(user, transaction);

        await existingUser.addRole(role, {
            transaction
        });


        const token = await signToken(existingUser, [role]);

        await transaction.commit();

        return {
            token
        };
    } catch (e) {
        await transaction.rollback();
        throw e;
    }
};

export const login = async (email, password) => {
    const transaction = await sequelize.transaction();
    try {
        const existingUser = await User.findOne({
            where: {
                email
            },
            transaction,
        });

        if (!existingUser) {
            throw new ErrorBase(ERROR_TYPES.AUTH_ERROR, 401, 'Invalid credentials.');
        }

        const {
            password: hashedPassword
        } = existingUser;

        const isValid = await compare(password, hashedPassword);
        if (!isValid) {
            throw new ErrorBase(ERROR_TYPES.AUTH_ERROR, 401, 'Invalid credentials.');
        }

        const userRoles = await existingUser.getRoles({
            transaction
        });

        const token = await signToken(existingUser, userRoles);

        await transaction.commit();

        return {
            token
        };
    } catch (e) {
        await transaction.rollback();
        throw e;
    }
};

export const isUserExists = async (email) => {
    const transaction = await sequelize.transaction();
    try {
        const existingUser = await User.findOne({
            where: {
                email
            },
            transaction,
        })
        let token = null;
        if (existingUser) {
            const userRoles = await existingUser.getRoles({
                transaction
            });
            token = signToken(existingUser, userRoles);
            return {
                token
            };
        }
        await transaction.commit();

        return {
            token
        };
    } catch (e) {
        await transaction.rollback();
        throw e;
    }
}
