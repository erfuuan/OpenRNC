import { Request, Response } from "express";
import responseBuilder from "../library/responseBuilder";
// import * as chalk from 'chalk'
// import  chalk from 'chalk'
import CRYPTOGRAPHY from "./../library/cryptography";
import Service from "../service/index";
import validation from "../validator/index";
import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();
export default {
  async create(req: Request, res: Response) {
    try {
      let data = req.body;
      const newPipeline = await Service.CRUD.create("Pipeline", data);
      return responseBuilder.success(res, newPipeline, "");
    } catch (err) {
      console.log("✖ err from catch of controller : ", err);
      
      //   console.log(chalk.red("✖ err from catch of controller : "),err );
      return responseBuilder.internalErr(res);
    }

  },
  async getAll(req: Request, res: Response) {},
  async getOne(req: Request, res: Response) {},
  async put(req: Request, res: Response) {},
  async delete(req: Request, res: Response) {},
};
