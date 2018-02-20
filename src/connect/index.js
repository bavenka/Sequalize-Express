import Sequelize from 'sequelize';
import config from '../../config';

const { db: { uri } } = config;

const sequelize = new Sequelize(uri);

const connect = {
    sequelize,
    Sequelize,
};
export default connect;
