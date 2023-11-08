import { Response, NextFunction } from 'express';
import CRYPTOGRAPHY from '../library/cryptography';
import Service from '../service/index';
import responseBuilder from '../library/responseBuilder';
import IRequest from '../index';
export default async (req: IRequest, res: Response, next: NextFunction) => {
	const sourceToken = req.headers['authorization'];
	if (!sourceToken) {
		return responseBuilder.unauthorized(res, '', '');
	}
	try {
		const sourceTokenData = await Service.REDIS.get(sourceToken);
		if (sourceTokenData) {
			req.consumeData = JSON.parse(CRYPTOGRAPHY.base64.decode(sourceTokenData));
		} else {
			const sourceExist = await Service.CRUD.findOneRecord('Source', { sourceToken: sourceToken }, []);
			if (!sourceExist) {
				console.log('source notExist');
				return responseBuilder.unauthorized(res, '', '');
			}
			const sourceID = sourceExist._id.toString();

			const pipeline = await Service.CRUD.findOneRecord('Pipeline', { sourceId: sourceID }, '');
			const cusomerData = { pipeline };
			await Service.REDIS.put(sourceToken, CRYPTOGRAPHY.base64.encode(JSON.stringify(cusomerData)));
			req.consumeData = cusomerData;
		}
		return next();
	} catch (err) {
		console.log(err);
		return responseBuilder.unauthorized(res, '');
	}
};
