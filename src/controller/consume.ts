import { Request, Response } from "express";
import responseBuilder from "../library/responseBuilder";
// import * as chalk from 'chalk'
// import  chalk from 'chalk'
import CRYPTOGRAPHY from "./../library/cryptography";
import Service from "../service/index";
import validation from "../validator/index";
import Ajv, { JSONSchemaType } from "ajv";
import { pipeline } from "stream";
const ajv = new Ajv();

export default {
  async create(req: any, res: Response) {
    let data = req.body;
    const consumeData = {
      data: data,
      pipelineId: req.consumeData.pipeline._id,
    };
    const pipelineId = await Service.CRUD.create("Consume", consumeData);

    return responseBuilder.success(res,"","")
  },
  async getAll(req: Request, res: Response) {},
  async getOne(req: Request, res: Response) {},
  async put(req: Request, res: Response) {},
  async delete(req: Request, res: Response) {},
};
