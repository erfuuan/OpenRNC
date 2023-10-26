import { Request, Response } from 'express';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';
import CRYPTOGRAPHY from './../library/cryptography';
import Service from '../service/index';
import validation from '../validator/index';
import Joi from 'joi';
import source from './source';

export default {
  async create(req: Request, res: Response) {
    const result = validation.pipeline.create.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      let data = await Joi.attempt(result.value, validation.pipeline.create);

      const sourceExist = await Service.CRUD.findById('Source', data.sourceId, []);
      if (!sourceExist) {
        return responseBuilder.notFound(res, '', 'source is not exist !');
      }
      console.log( data.destinationIds)
      const destinationExist = await Service.CRUD.find('Destination', { _id: { $all: data.destinationIds } }, []);
      console.log(destinationExist)
      if (!destinationExist.length) {
        return responseBuilder.notFound(res, '', 'destination is not exist !');
      }
      const newPipeline = await Service.CRUD.create('Pipeline', data);
      return responseBuilder.success(res, newPipeline, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
  async getAll(req: Request, res: Response) {},
  async getOne(req: Request, res: Response) {},
  async put(req: Request, res: Response) {},
  async delete(req: Request, res: Response) {},
};
