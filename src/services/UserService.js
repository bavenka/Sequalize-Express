import User from '../models/User';

export const createUser = (user) => User.create(user);
