import jwt from 'jsonwebtoken';
import md5 from 'md5';
import appConfig from '../config/application';
// import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker';

export default {
  generateAccessToken(username: any) {
    return jwt.sign(username, appConfig.jwt.secret, {
      expiresIn: appConfig.jwt.expire,
    });
  },

  tokenGenerator() {
    return faker.string.alpha(50);
  },

  randomWords() {
    return faker.string.nanoid({ min: 5, max: 10 }).replace('_', '');
  },

  //   verifyJwtToken(token: string) {
  //     // return jwt.verify(token:string, appConfig.jwt.secret)
  //     jwt.verify(token, appConfig.jwt.secret, (err: any, data: any) => {
  //       // console.log(new Date());
  //       if (!err) {
  //         return data.username.toString();
  //       }
  //       // } else {
  //       //     return { status: "success", username: data.username }
  //       // }
  //     });
  //   },
  //   usernameGenerator(firstName: string, lastName: string) {
  //     return (
  //       faker.internet.userName({ firstName: firstName, lastName: lastName }) + faker.finance.accountNumber({ length: 7 })
  //     );
  //   },
  //   // activeCodegenerator() {
  //   //   return faker.music.genre();
  //   //   faker.music.songName();
  //   // },
  //   activeCodegeneratorMusic() {
  //     // return faker.music.genre();
  //     return faker.music.songName().replaceAll(' ', '-');
  //     // .replace(/" "/g, "-")
  //   },
  //   password: {
  //     hash: async (password: number | string) => await md5(password),
  // },
  base64: {
    encode: (data: string) => {
      let buff = Buffer.from(data);
      return buff.toString('base64');
    },
    decode: (data: string) => {
      let buff = Buffer.from(data, 'base64');
      return buff.toString('utf8');
    },
  },
  md5(data: any) {
    return md5(data);
  },
};
