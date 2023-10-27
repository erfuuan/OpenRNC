import { Request, Response } from 'express';
import responseBuilder from '../library/responseBuilder';
import chalk from 'chalk';
import CRYPTOGRAPHY from './../library/cryptography';
import Service from '../service/index';
import validation from '../validator/index';
import Joi from 'joi';

export default {
  async signup(req: Request, res: Response) {
    const result = validation.auth.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      let data = await Joi.attempt(result.value, validation.auth);
      if (data.email == data.password) {
        return responseBuilder.badRequest(res, '', 'email and password doen not same.');
      }
      const userExist: any = await Service.CRUD.findOneRecord('User', { email: data.email, role: 'user' }, []);
      if (userExist) {
        return responseBuilder.conflict(
          res,
          '',
          'The entered email is already in use. Please use a different email address or, if you have registered before, use the password recovery option.'
        );
      }
      data.password = CRYPTOGRAPHY.md5(data.password);
      data.role = 'user';
      const user = await Service.CRUD.create('User', data);
      const workspace = await Service.CRUD.create('Workspace', {
        name: data.workspaceName + '-' + CRYPTOGRAPHY.randomWords(),
        token: CRYPTOGRAPHY.tokenGenerator(),
        ownerId: user.id,
      });
      await Service.CRUD.updateById('User', { workspaceId: workspace._id }, user._id, [], '');
      return responseBuilder.success(
        res,
        {
          token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
          name: user.name,
          username: user.username,
          role: user.role,
        },
        'Signup successful! Welcome to our platform. Your account has been created.'
      );
    } catch (err) {
      console.log(chalk.red('✖ err from catch of controller : '), err);
      return responseBuilder.internalErr(res);
    }
  },

  async login(req: Request, res: Response) {
    const result = validation.auth.validate(req.body);
    if (result.error) {
      return responseBuilder.badRequest(res, req.body, result.error.message);
    }
    try {
      const data = await Joi.attempt(result.value, validation.auth);
      const user = await Service.CRUD.findOneRecord(
        'User',
        {
          email: data.email,
          password: CRYPTOGRAPHY.md5(data.password),
          role: 'user',
        },
        []
      );
      if (!user) {
        return responseBuilder.notFound(res, '', ' Sorry, no user with these credentials exists in our system.');
      }
      await Service.REDIS.put(user._id, CRYPTOGRAPHY.base64.encode(JSON.stringify(user)));
      const responseData = {
        token: CRYPTOGRAPHY.generateAccessToken({ username: user._id }),
        role: user.role,
      };
      return responseBuilder.success(res, responseData);
    } catch (err) {
      console.log('✖ err from catch of controller : ', err);
      return responseBuilder.internalErr(res);
    }
  },
};
