import axiosInstance from './axiosInstance';
import {BASE_URL} from './config';

class httpClient {
  static async callAPI(method, url, params, authorization) {
    const objLength = Object.keys(params).length;
    url = BASE_URL + url;
    const config = {
      method,
      headers: {},
      data: params,
      url,
    };
    objLength == 0 && delete config['data'];

    let response = await axiosInstance.request(config);
    console.log('LOG:: RESPS ' + JSON.stringify(response));
    return response;
  }
}

export default httpClient;
