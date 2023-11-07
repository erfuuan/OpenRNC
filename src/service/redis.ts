import cache from '../connection/index';

export default {
  async put(key: string, value: string, timeout = null) {
    try {
      await cache.REDIS.set(key, JSON.stringify(value));
      if (timeout) {
        await this.setExpire(key, timeout);
      }
    } catch (e) {
      console.log(`ERROR_009 => ${e}`);
    }
  },

  async get(key: any) {
    try {
      const getData: any = await cache.REDIS.get(key);
      return JSON.parse(getData);
    } catch (e) {
      console.log(`ERROR_010 => ${e}`);
    }
  },

  async setExpire(key: string, value: number) {
    try {
      await cache.REDIS.expire(key, value);
    } catch (e) {
      console.log(`ERROR_013 => ${e}`);
    }
  },
};
