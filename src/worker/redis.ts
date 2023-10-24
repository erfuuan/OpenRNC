import appConfig from '../config/application';
import Redis from 'ioredis';
import chalk from 'chalk';

async function connectAndPut(credential, key, value) {
  try {
    const redis = new Redis(credential);
    redis.on('connect', () => {
      console.log('✔  [success] redis connected successfully :', JSON.stringify(appConfig.redis));
    });
    // Log Redis errors
    redis.on('error', (error) => {
      console.log(chalk.red(`Redis Client error ${error}`));
    });
    await redis.set(key, JSON.stringify(value));
  } catch (err) {
    console.log('err redis worker');
    throw err;
  }
}

export default connectAndPut;
