import connect from '../connect';

const { sequelize, Sequelize } = connect;

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
    providerId: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
});

export default User;
