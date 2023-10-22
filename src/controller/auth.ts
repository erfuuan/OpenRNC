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
  async signup(req: Request, res: Response) {
    try {
      //?=======
      const validate = ajv.compile(validation.auth);
      const result = validate(req.body);
      if (!result) {
        return responseBuilder.badRequest(
          res,
          req.body,
          ajv.errorsText(validate.errors)
        );
      }
      //?=======
      const data: any = req.body;
      const userExist: any = await Service.CRUD.findOneRecord(
        "User",
        {
          email: data.email,
          role: "user",
        },
        []
      );
      console.log(userExist);
      if (userExist) {
        return responseBuilder.conflict(
          res,
          "",
          ".کاربری با این ایمیل وارده در سیستم وجود دارد "
        );
      }

      const user = await Service.CRUD.create("User", {
        password: CRYPTOGRAPHY.md5(data.password),
        email: data.email,
        role: "user",
      });
      return responseBuilder.success(
        res,
        {
          token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
          name: user.name,
          username: user.username,
          role: user.role,
        },
        "حساب کاربری شما با موفقیت ایجاد شد"
      );
    } catch (err) {
      console.log("✖ err from catch of controller : ", err);
      //   console.log(chalk.red("✖ err from catch of controller : "),err );
      return responseBuilder.internalErr(res);
    }
  },

  async login(req: Request, res: Response) {
    const validate = ajv.compile(validation.auth);
    const result = validate(req.body);
    if (!result) {
      return responseBuilder.badRequest(
        res,
        req.body,
        ajv.errorsText(validate.errors)
      );
    }
    try {
      // const data = await Joi.attempt(result.value, Schema.auth.login);
      const data = req.body;
      const user = await Service.CRUD.findOneRecord(
        "User",
        {
          email: data.email,
          password: CRYPTOGRAPHY.md5(data.password),
          role: "user",
        },
        []
      );
      if (!user) {
        return responseBuilder.notFound(
          res,
          "",
          "کاربری با این مشخصات در سبستم وجود ندارد"
        );
      }
      await Service.REDIS.put(
        user._id,
        CRYPTOGRAPHY.base64.encode(JSON.stringify(user))
      );
      const responseData = {
        token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
        role: user.role,
      };
      return responseBuilder.success(res, responseData);
    } catch (err) {
      console.log("✖ err from catch of controller : ", err);
      return responseBuilder.internalErr(res);
    }
  },
};
