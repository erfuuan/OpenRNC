import dotenv from 'dotenv';
dotenv.config();
const appConfig = {
  jwt: {
    secret: 'secret',
    expire: '2d',
  },
  development: {
    salt: 'ffdfvdfdfdg_P:)P_:L(OLIKUJ',
    port: process.env.DEV_PORT,
    redis: {
      port: 6379,
      host: '127.0.0.1',
      connectTimeout: 4000,
      lazyConnect: true,
      // connectTimeout: 1000,
      // maxRetriesPerRequest: 3,
    },
    dbConnection: process.env.DEV_DB_CONNECTION,
    jwt: {
      secret: 'secret',
      expire: '1d',
    },
  },
  // staging: {
  //   serviceName: 'CONTENT',
  //   port: process.env.STAGE_PORT,

  //   redis: {
  //     connections: [
  //       {
  //         host: process.env.STAGE_REDIS_HOST_1,
  //         port: process.env.STAGE_REDIS_PORT_1,
  //         // password: process.env.REDIS_PASSWORD_1
  //       },
  //       {
  //         host: process.env.STAGE_REDIS_HOST_2,
  //         port: process.env.STAGE_REDIS_PORT_2,
  //         // password: process.env.REDIS_PASSWORD_2
  //       },
  //       {
  //         host: process.env.STAGE_REDIS_HOST_3,
  //         port: process.env.STAGE_REDIS_PORT_3,
  //         // password: process.env.REDIS_PASSWORD_3
  //       },
  //       {
  //         host: process.env.STAGE_REDIS_HOST_4,
  //         port: process.env.STAGE_REDIS_PORT_4,
  //         // password: process.env.REDIS_PASSWORD_4
  //       },
  //       {
  //         host: process.env.STAGE_REDIS_HOST_5,
  //         port: process.env.STAGE_REDIS_PORT_5,
  //         // password: process.env.REDIS_PASSWORD_5
  //       },
  //       {
  //         host: process.env.STAGE_REDIS_HOST_6,
  //         port: process.env.STAGE_REDIS_PORT_6,
  //         // password: process.env.REDIS_PASSWORD_6
  //       }
  //     ],
  //     password: process.env.STAGE_REDIS_PASSWORD
  //   },

  //   kafka: {
  //     host: process.env.STAGE_KAFKA_HOST,
  //     topic_prefix: process.env.STAGE_KAFKA_TOPIC_PREFIX,
  //   },

  //   jwt: {
  //     secret: 'secret',
  //     expire: '1m'
  //   },
  //   salt: 'Segment!n0'
  // },
  // production: {
  //   serviceName: 'CONTENT',
  //   port: process.env.PORT,

  //   redis: {
  //     host: process.env.REDIS_HOST,
  //     port: process.env.REDIS_PORT,
  //     password: process.env.REDIS_PASSWORD
  //   },

  //   kafka: {
  //     host: process.env.KAFKA_HOST,
  //     topic_prefix: process.env.KAFKA_TOPIC_PREFIX,
  //   },
  //   dbConnection: process.env.DB_CONNECTION,

  //   jwt: {
  //     secret: 'secret',
  //     expire: '1m'
  //   },
  //   salt: 'Segment!n0'
  // }
};

export default appConfig[process.env.NODE_ENV || 'production'];

// export appConfig['development']
// export default appConfig
