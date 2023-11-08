import { Request, Response } from 'express';
import  IRequest  from '../index';
import responseBuilder from '../library/responseBuilder';
import  chalk from 'chalk'
import Service from '../service/index';


export default {
  async create(req: IRequest, res: Response) {
    let data = req.body;
    const consumeData = {
      data: data,
      pipelineId: req.consumeData.pipeline._id,
    };
    const pipelineId = await Service.CRUD.create('Consume', consumeData);

    return responseBuilder.success(res, '', '');
  },
  async getAll(req: Request, res: Response) {},
  async getOne(req: Request, res: Response) {},
  async put(req: Request, res: Response) {},
  async delete(req: Request, res: Response) {},
};
