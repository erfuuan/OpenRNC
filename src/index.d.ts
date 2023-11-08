import { NextFunction, Request, Response } from 'express';
export default interface IRequest extends Request {
	userData?: any;
	consumeData?: any;
}
