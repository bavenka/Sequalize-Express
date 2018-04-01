import * as roleService from '../services/RoleService';


export const saveRole = (req, res, next) => {
    roleService
        .createRole(req.body)
        .then(data => res.status(201).json(data))
        .catch(e => {
            next(e)
        })
};

export const updateRole = (req, res, next) => {
    const roleId = req.params.roleId;
    roleService
        .editRole(req.body, roleId)
        .then(([rowsUpdate, [data]]) => data ? res.status(200).json(data) : res.status(204).end())
        .catch(e => {
            next(e)
        })
};

export const deleteRole = (req, res, next) => {
    const roleId = req.params.roleId;
    roleService
        .deleteRole(roleId)
        .then(data => res.status(data ? 200 : 204).end())
        .catch(e => {
            next(e)
        })
};