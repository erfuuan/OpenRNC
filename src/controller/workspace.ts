import { Response } from 'express';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';
import Service from '../service/index';
import validation from '../validator/index';
import Joi from 'joi';

export default {
  async get(req: any, res: Response) {
    try {
      const workspace = await Service.CRUD.findById('Workspace', req.userData.workspaceId, [], { ownerId: 0 });
      return responseBuilder.success(res, workspace);
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
  async update(req: any, res: Response) {
    try {
      const result = validation.workspace.update.validate(req.body);
      if (result.error) {
        return responseBuilder.badRequest(res, req.body, result.error.message);
      }
      let data = await Joi.attempt(result.value, validation.workspace.update);

      const workspace = await Service.CRUD.findById('Workspace', req.userData.workspaceId);
      if (req.userData._id != workspace.ownerId) {
        return responseBuilder.forbidden(res, '', 'You do not have permission to edit this Workspace. ');
      }
      if (data.name) {
        const nameExist = await Service.CRUD.find('Workspace', { name: data.name });
        if (nameExist.length) {
          return responseBuilder.badRequest(res, '', 'this name is already exist!.');
        }
      }
      const updatedWorkspace = await Service.CRUD.updateById('Workspace', data, req.userData.workspaceId, [], { ownerId: 0 });
      return responseBuilder.success(res, updatedWorkspace);
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
};
