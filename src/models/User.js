import connect from '../database/connect';
import Role from './Role';
import Reservation from './Reservation';
import Cart from "./Cart";

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
    timestamps:false
});

User.belongsToMany(Role, { as: 'Roles', through:'user_role', foreignKey: 'userId', timestamps: false });
Role.belongsToMany(User, { as: 'Users', through:'user_role', foreignKey: 'roleId', timestamps: false });

User.hasMany(Reservation, {as: 'reservations'});
Reservation.belongsTo(User);

User.hasMany(Cart, {as: 'carts'});
Cart.belongsTo(User);


export default User;
