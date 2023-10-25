import axios from 'axios';
async function calApi(method: string, url: string, params?: any, headers?: any, payload?: any) {
  try {
    const options = {
      method: method,
      url: url,
      //   headers: headers,
      //   payload: payload
    };
    // console.table(options)
    const response = await axios(options);
    return response;
  } catch (err) {
    console.log('err webHook worker',err);
    throw err;
  }
}

export default calApi;
