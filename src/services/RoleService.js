import connect from '../database/connect';
import Role from '../models/Role';

import ErrorBase from '../server-error';
import {
  ERROR_TYPES
} from '../server-error/constants';

const {
  Sequelize
} = connect;

export const createRole = (role) => {
  return Role.create(role)
    .catch(e => {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new ErrorBase(ERROR_TYPES.ROLE_EXISTS, 409, `Role with name = ${role.name} already exists.`);
      } else {
        throw e;
      }
    })
};

export const editRole = (role, roleId) => {
  return Role.update(role, {
    returning: true,
    where: {
      id: roleId
    }
  })
    .catch(e => {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new ErrorBase(ERROR_TYPES.ROLE_EXISTS, 409, `Role with name = ${role.name} already exists.`);
      } else {
        throw e;
      }
    })
};

export const deleteRole = (id) => {
  return Role.destroy({
    where: {
      id
    }
  })
}

export const getRoleByName = (name, transaction) => {
  return Role.findOrCreate({
    where: {
      name
    },
    transaction,
  })
}

export const verifyRole = (req, res, next, authority) => {
  const {roles} = req;
  if (!roles.find(role => role.name === authority)) {
    throw new ErrorBase(ERROR_TYPES.FORBIDDEN_ERROR, 403, 'Forbidden')
  }
  next();
}
