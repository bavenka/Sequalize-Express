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
    createToken
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

        const token = await createToken(existingUser);

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
    try {
        const existingUser = await User.findOne({
            where: {
                email
            }
        })

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

        const token = createToken(existingUser);
        return {
            token
        };
    } catch (e) {
        throw e;
    }
};

export const isUserExists = async (email) => {
    try {
        const existingUser = await User.findOne({
            where: {
                email
            }
        })
        let token = null;
        if (existingUser) {
            token = createToken(existingUser);
            return {
                token
            };
        }
        return { token };

    } catch (e) {
        throw e;
    }
}