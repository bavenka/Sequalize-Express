import connect from '../database/connect';
import Role from './Role';

const {
    sequelize,
    Sequelize
} = connect;

const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});

User.belongsToMany(Role, { as: 'Roles', through:'user_role', timestamps: false });

export default User;