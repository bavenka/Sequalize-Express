import express from 'express';
import validate from 'express-validation';

import roleValidator from '../validators/RoleValidator';

import * as roleController from '../controllers/RoleController';

const roleRoute = express.Router();

roleRoute.post('/create', validate(roleValidator.createRole), roleController.saveRole);

roleRoute.put('/:roleId/edit', validate(roleValidator.editRole), roleController.updateRole);

roleRoute.delete('/:roleId/delete', validate(roleValidator.deleteRole), roleController.deleteRole);

export default roleRoute;