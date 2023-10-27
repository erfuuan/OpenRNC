import { Request, Response } from 'express';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';
import Service from '../service/index';
import validation from '../validator/index';
import Joi from 'joi';

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
      const destinationExist = await Service.CRUD.find('Destination', { _id: { $in: data.destinationIds } }, []);
      if (!destinationExist.length || destinationExist.length != data.destinationIds.length) {
        return responseBuilder.notFound(res, '', 'destination is not exist !');
      }
      const newPipeline = await Service.CRUD.create('Pipeline', data);
      return responseBuilder.success(res, newPipeline, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const pipelines = await Service.CRUD.find('Pipeline', {}, [], '', '');
      return responseBuilder.success(res, pipelines, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
  async getOne(req: Request, res: Response) {
    const result = validation.pipeline.oneRecord.validate(req.params);
    if (result.error) {
      return responseBuilder.badRequest(res, req.params, result.error.message);
    }
    try {
      let { id } = await Joi.attempt(result.value, validation.pipeline.oneRecord);
      const pipeline = await Service.CRUD.findById('Pipeline', id, []);
      if (!pipeline) {
        return responseBuilder.notFound(res, '', 'pipeline notFound !');
      }
      return responseBuilder.success(res, pipeline, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },

  async put(req: Request, res: Response) {
    const result = validation.pipeline.update.validate({ ...req.body, ...req.params });
    if (result.error) {
      return responseBuilder.badRequest(res, req.params, result.error.message);
    }
    try {
      let { id, pipeline } = await Joi.attempt(result.value, validation.pipeline.update);
      const updatedSource = await Service.CRUD.updateById('Pipeline', pipeline, id, [], '');
      if (!updatedSource) {
        return responseBuilder.notFound(res, '', 'pipeline notFound!');
      }
      return responseBuilder.success(res, updatedSource, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },

  async delete(req: Request, res: Response) {
    const result = validation.pipeline.oneRecord.validate(req.params);
    if (result.error) {
      return responseBuilder.badRequest(res, req.params, result.error.message);
    }
    try {
      let { id } = await Joi.attempt(result.value, validation.pipeline.oneRecord);
      await Service.CRUD.softDelete('Pipeline', id);
      return responseBuilder.success(res, '', 'deleted successfully.');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
};
