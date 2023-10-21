import appConfig from '../config/application';
import Redis from 'ioredis';
import chalk from 'chalk';

const redis = new Redis(appConfig.redis);

redis.on('connect', () => {
  console.log('✔  [success] redis connected successfully :', JSON.stringify(appConfig.redis));
});

// Log Redis errors
redis.on('error', (error) => {
  // console.log(chalk.red(`Redis Client error ${error}`));
  console.log(`Redis Client error ${error}`);
});

export default redis;
