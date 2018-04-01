import connect from '../database/connect';
import User from './User';
import { RoleType } from './enums/RoleType';
import { PermissionType } from './enums/PermissionType';

const {
    sequelize,
    Sequelize
} = connect;

const Role = sequelize.define('role', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: RoleType.USER,
    },
    permissions: {
        type: Sequelize.ENUM,
        values: Object.values(PermissionType),
        defaultValue: PermissionType.ALL,
    }
}, {
    timestamps: false
});

export default Role;