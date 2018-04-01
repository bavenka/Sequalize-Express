import Joi from 'joi';
import { RoleType } from '../models/enums/RoleType';
import { PermissionType } from '../models/enums/PermissionType';

export default {
  createRole: {
    body: {
      name: Joi.string().valid(...Object.values(RoleType)).required(),
      permissions: Joi.string().valid(...Object.values(PermissionType)),
    }
  },
  editRole: {
    params: {
      roleId: Joi.number().integer().min(1).required(),
    },
    body: {
        name: Joi.string().valid(...Object.values(RoleType)).required(),
        permissions: Joi.string().valid(...Object.values(PermissionType)),
    }
  },
  deleteRole: {
    params: {
      roleId: Joi.number().integer().min(1).required(),
    }
  },
};