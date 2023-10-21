import { Request, Response } from "express";
import responseBuilder from "../library/responseBuilder";
// import * as chalk from 'chalk'
// import  chalk from 'chalk'
import CRYPTOGRAPHY from './../library/cryptography';
import Service from "../service/index";
import validation from "../validator/index";
import Ajv, { JSONSchemaType } from "ajv";
import { da } from "@faker-js/faker";
const ajv = new Ajv();

export default {
  async signup(req: Request, res: Response) {
    try {
      const validate: any = ajv.compile(validation.auth)
      const data=validate(req.body)
      if (data.errors) {
        return responseBuilder.badRequest(res, "", "");
      }
      console.log(req.body)
      const userExist: any = await Service.CRUD.findOneRecord(
        "User",
        {
          email: data.email,
          password: data.password,
          role: "user",
        },
        []
      );
      console.log(userExist)
      if (userExist) {
        return responseBuilder.conflict(
          res,
          "",
          ".کاربری با این ایمیل وارده در سیستم وجود دارد "
        );
      }

      console.log(data)
      const user = await Service.CRUD.create('User', {
        password: CRYPTOGRAPHY.md5(data.password),
        email: data.email,
        role: 'user',
      });
      console.log(user)
      return responseBuilder.success(
        res,
        {
          token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
          name: user.name,
          username: user.username,
          role: user.role,
        },
        'حساب کاربری شما با موفقیت ایجاد شد'
      );


    } catch (err) {
      console.log("✖ err from catch of controller : ", err);
      //   console.log(chalk.red("✖ err from catch of controller : "),err );
      return responseBuilder.internalErr(res);
    }
  },

  async login(req: Request, res: Response) {},
};
