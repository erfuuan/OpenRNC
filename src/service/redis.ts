import cache from '../connection/redis';

export default {
  async put(key: string, value: string, timeout = null) {
    try {
      await cache.set(key, JSON.stringify(value));
      if (timeout) {
        await this.setExpire(key, timeout);
      }
    } catch (e) {
      console.log(`ERROR_009 => ${e}`);
    }
  },

  async get(key: any) {
    try {
      const getData: any = await cache.get(key);
      return JSON.parse(getData);
    } catch (e) {
      console.log(`ERROR_010 => ${e}`);
    }
  },

  async setExpire(key: string, value: number) {
    try {
      await cache.expire(key, value);
    } catch (e) {
      console.log(`ERROR_013 => ${e}`);
    }
  },
};
