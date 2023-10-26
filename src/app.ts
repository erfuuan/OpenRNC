import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import mainRouter from './router/index';
const app: Application = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', mainRouter);

app.get('/ping', function (req: Request, res: Response) {
  res.status(200).send('success!');
});

export default app;
