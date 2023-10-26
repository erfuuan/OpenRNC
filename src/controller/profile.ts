import { Request, Response } from 'express';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';
import CRYPTOGRAPHY from './../library/cryptography';
import Service from '../service/index';
import validation from '../validator/index';

export default {
  async get(req: any, res: Response) {
    try {
      const user = await Service.CRUD.findById('User', req.userData._id, [], { password: 0, workspaceId: 0 });
      return responseBuilder.success(res, user);
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
  async update(req: Request, res: Response) {},
};
