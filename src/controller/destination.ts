import { Request, Response } from 'express';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';
import Service from '../service/index';
import validation from '../validator/index';
import Joi from 'joi';

export default {
  async create(req: Request, res: Response) {
    const result = validation.destination.create.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      let data = await Joi.attempt(result.value, validation.destination.create);
      const newDestination = await Service.CRUD.create('Destination', data);
      return responseBuilder.success(res, newDestination, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const destinations = await Service.CRUD.find('Destination', {}, [], '', '');
      return responseBuilder.success(res, destinations, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
  
  async getOne(req: Request, res: Response) {
    const result = validation.destination.oneRecord.validate(req.params);
    if (result.error) {
      return responseBuilder.badRequest(res, req.params, result.error.message);
    }
    try {
      let { id } = await Joi.attempt(result.value, validation.destination.oneRecord);
      const destination = await Service.CRUD.findById('Destination', id, []);
      if (!destination) {
        return responseBuilder.notFound(res, '', 'destination notFound !');
      }
      return responseBuilder.success(res, destination, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },

  async put(req: Request, res: Response) {
    const result = validation.destination.update.validate({ ...req.body, ...req.params });
    if (result.error) {
      return responseBuilder.badRequest(res, req.params, result.error.message);
    }
    try {
      let { id, destination } = await Joi.attempt(result.value, validation.destination.update);
      const updatedSource = await Service.CRUD.updateById('Destination', destination, id, [], '');
      if (!updatedSource) {
        return responseBuilder.notFound(res, '', 'destination notFound!');
      }
      return responseBuilder.success(res, updatedSource, '');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },

  async delete(req: Request, res: Response) {
    const result = validation.destination.oneRecord.validate(req.params);
    if (result.error) {
      return responseBuilder.badRequest(res, req.params, result.error.message);
    }
    try {
      let { id } = await Joi.attempt(result.value, validation.destination.oneRecord);
      await Service.CRUD.hardDelete('Destination', id);
      return responseBuilder.success(res, '', 'deleted successfully.');
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },
};
