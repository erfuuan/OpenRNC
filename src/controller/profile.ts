import {  Response } from 'express';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';
import Service from '../service/index';
import validation from '../validator/index';
import Joi from 'joi';
import IRequest  from '../index';

export default {
  async get(req: IRequest, res: Response) {
    try {
      const user = await Service.CRUD.findById('User', req.userData._id, [], { password: 0, workspaceId: 0 });
      return responseBuilder.success(res, user);
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },

  async update(req: IRequest, res: Response) {
    try {
      const result = validation.profile.update.validate(req.body);
      if (result.error) {
        return responseBuilder.badRequest(res, req.body, result.error.message);
      }
      let data = await Joi.attempt(result.value, validation.profile.update);
      if (data.email) {
        const emailExist = await Service.CRUD.find('User', { email: data.email });
        if (emailExist) {
          return responseBuilder.conflict(res, '', 'email is exist!');
        }
      }
    const updatedUser = await Service.CRUD.updateById('User', { data }, req.userData._id, [], { password: 0, workspaceId: 0 });
      return responseBuilder.success(res, updatedUser);
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
};
