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
import cluster from 'cluster';
import os from 'os'
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

//?==========================
let workers:any = [];
const setupWorkerProcesses = () => {
  // to read number of cores on system
  let numCores = os.cpus().length;
  console.log('Master cluster setting up ' + numCores + ' workers');
  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for(let i = 0; i < numCores; i++) {
      // creating workers and pushing reference in an array
      // these references can be used to receive messages from workers
      workers.push(cluster.fork());
      // to receive messages from worker process
      workers[i].on('message', function(message) {
          console.log(message);
      });
  }
  // process is clustered on a core and process id is assigned
  cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is listening');
  });
  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      workers.push(cluster.fork());
      // to receive messages from worker process
      workers[workers.length-1].on('message', function(message) {
          console.log(message);
      });
  });
};
const setupServer = (isClusterRequired) => {
  // if it is a master process then call setting up worker process
  if(isClusterRequired && cluster.isMaster) {
      setupWorkerProcesses();
  } else {
      // to setup server configurations and share port address for incoming requests
      createServer();
      workerV2();
  }
};

//?==========================

setupServer(true)
// setTimeout(() => {
//   setupServer(true);
// }, 4000);

// bootstrap();
// setup.createSource()
// setup.createDestination()
// setup.createPipleine()



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
  console.log({ message: err.message, stack: err.stack });
  // server.close();
  // return createServer();
});

// // Handle uncaughtException errors globally
// process.on('uncaughtException', (err) => {
//   console.log({ message: err.message, stack: err.stack });
//   console.log('Uncaught Exception!  Shutting down...');
//   // Shutdown application
//   server.close();
//   return createServer()
//   process.exit(1);
// });
