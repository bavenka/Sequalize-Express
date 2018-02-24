import bcrypt from 'bcrypt';

export const compare = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

export const hash = (password, saltRounds) => bcrypt.hash(password, saltRounds = 10);