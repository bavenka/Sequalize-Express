import connect from '../connect';

const { sequelize, Sequelize } = connect;

const Account = sequelize.define('account', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    providerId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
});