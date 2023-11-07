import express, { Application, NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
// import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import mainRouter from './router/index';
import Middlewares from './middleware/index';
const app: Application = express();
// app.use(compression.gzip());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1', Middlewares.auth, mainRouter);

app.get('/ping', function (req: Request, res: Response) {
  res.status(200).send('success!');
});

export default app;
