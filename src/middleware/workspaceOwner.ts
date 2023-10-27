import { Request, Response, NextFunction } from 'express';
import CRYPTOGRAPHY from '../library/cryptography';
import Service from '../service/index';
import responseBuilder from '../library/responseBuilder';
import jwt from 'jsonwebtoken';
import appConfig from '../config/application';

export default async (req: any, res: Response, next: NextFunction) => {
  try {
    const workspace = await Service.CRUD.findById('Workspace', req.userData.workspaceId);
    if (req.userData._id != workspace.ownerId) {
      return responseBuilder.forbidden(res, '', 'You do not have permission to edit this Workspace. ');
    }
    return next();
  } catch (err) {
    console.log(err);
    return responseBuilder.unauthorized(res, '');
  }
};
