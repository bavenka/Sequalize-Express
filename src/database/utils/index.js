import connect from '../connect';

const {sequelize} = connect;

export const initTables = () => sequelize.sync();