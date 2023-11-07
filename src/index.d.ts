import { NextFunction, Request, Response } from 'express';

export default interface IRequest extends Request {
	userData?: any;
	consumeData?: any;
}


// declare module 'express-serve-static-core' {
//     interface Request {
//       myField?: string
//     }
//     interface Response {
//       myField?: string
//     }
//   }
  