import { Response, NextFunction } from 'express';
import CRYPTOGRAPHY from '../library/cryptography';
import Service from '../service/index';
import responseBuilder from '../library/responseBuilder';
import IRequest from '../index';
import jwt from 'jsonwebtoken';
import appConfig from '../config/application';

const ignoredPath = [
	'POST /api/v1/auth/signup',
	'POST /api/v1/auth/createData',
	'POST /api/v1/auth/login',
	'POST /api/v1/auth/entrance',
	'POST /api/v1/auth/resetPassword',
	'POST /api/v1/auth/sendActivationCode',
];

export default async (req: IRequest, res: Response, next: NextFunction) => {
	if (ignoredPath.includes(`${req.method} ${req.originalUrl}`)) {
		return next();
	}
	// console.log(new Date());
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return responseBuilder.unauthorized(res, '', '');
	}
	const token = authHeader.split(' ')[0].trim();
	if (token == null) {
		responseBuilder.unauthorized(res, '');
	}
	let username: string = '';
	jwt.verify(token, appConfig.jwt.secret, (err: any, data: any) => {
		if (err) {
			console.log(err);
			return responseBuilder.forbidden(res, '', '');
		}
		username = data.username;
	});
	try {
		const tokenData = await Service.REDIS.get(username);
		if (tokenData) {
			req.userData = JSON.parse(CRYPTOGRAPHY.base64.decode(tokenData));
		} else {
			const userData = await Service.CRUD.findById('User', username, []);
			await Service.REDIS.put(username, CRYPTOGRAPHY.base64.encode(JSON.stringify(userData)));
			req.userData = userData;
		}
		return next();
	} catch (err) {
		console.log(err);
		return responseBuilder.unauthorized(res, '');
	}
};
