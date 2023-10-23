import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
// import * as Sentry from '@sentry/node';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
// import Middlewares from './middlewares/index';
import mainRouter from "./router/index";
const app: Application = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1",mainRouter);

app.get("/health", (req: Request, res: Response) => {
  return res.send("ok");
});

// Sentry.init({
//   dsn: 'https://5f23820fb9a338adcd42a4e10c6c5329@o4505693895786496.ingest.sentry.io/4505693899456512',
//   integrations: [
//     // enable HTTP calls tracing
//     new Sentry.Integrations.Http({ tracing: true }),
//     // enable Express.js middleware tracing
//     new Sentry.Integrations.Express({ app }),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
// });
// // Trace incoming requests
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

// All your controllers should live here
app.get("/ping", function rootHandler(req: Request, res: Response) {
  res.status(200).send("success!");
});

// app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err: any, req: Request, res: any, next: NextFunction) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

export default app;