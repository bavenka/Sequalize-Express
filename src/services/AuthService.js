import connect from '../connect';
import User from '../models/User';
import {
    createUser
} from '../services/UserService';
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
    Sequelize
} = connect;

export const signup = async (user) => {
    try {
        const {
            password
        } = user;
        user.password = await hash(password);

        const existingUser = await createUser(user);

        const token = await createToken(existingUser);

        return {
            token
        };
    } catch (e) {
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