import { Response, NextFunction } from 'express';
import Service from '../service/index';
import responseBuilder from '../library/responseBuilder';
import IRequest from '../index';

export default async (req: IRequest, res: Response, next: NextFunction) => {
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
