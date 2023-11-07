#!/usr/bin/env node
import http from 'http';
import mongoose from 'mongoose';
import chalk from 'chalk';
import dotenv from 'dotenv';
import Connection from './connection/index';
import appConfig from './config/application';
import app from './app';
import workerV2 from './worker/index';
import setup from './setupData';
dotenv.config();
const port: string = appConfig.port;
app.set('port', port);
let server: any;

async function createServer(): Promise<any> {
  const DBconnectionSuccessfully = await Connection.DB();
  if (DBconnectionSuccessfully) {
    server = http.createServer(app);
    return server.listen(port, () => {
      console.log(chalk.green.underline('✔ [success] server listen to', port, new Date(),'💥'));
    });
  } else {
    server.close();
  }
}

createServer();
// setTimeout(() => {
//   workerV2();
// }, 4000);

// bootstrap();
// setup.createSource()
// setup.createDestination()
// setup.createPipleine()
// setup.createConsumeData()


mongoose.connection.on('connecting', function () {
  console.log(chalk.blue('trying to establish a connection to mongo'));
});
mongoose.connection.on('connected', function () {
  console.log(chalk.greenBright('✔ [connected] mongo connected successfully '));
  // return bootstrap()
});
mongoose.connection.on('disconnected', async (err) => {
  console.log(chalk.red("mongoose 'disconnected !!  server closed "));
  server.close();
  // return setTimeout(createServer, 4000);
  return setTimeout(Connection.DB, 4000);
});
// mongoose.connection.on('reconnected', function () {
//   console.log('++Reconnected to MongoDB++');
// });

// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     console.log('Force to close the MongoDB conection');
//     process.exit(0);
//   });
// });
process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! ');
  // console.log({ message: err.message, stack: err.stack });
  server.close();
  return createServer();
});

// Handle uncaughtException errors globally
process.on('uncaughtException', (err) => {
  console.log({ message: err.message, stack: err.stack });
  console.log('Uncaught Exception!  Shutting down...');
  // Shutdown application
  return createServer()
  process.exit(1);
});
