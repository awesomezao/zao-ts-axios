import axios from './axios';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

interface IextendConfig {
  cache: boolean;
  isJson?: boolean;
  cacheMode?: 'localStorage' | 'sessionStorage';
  expire?: number;
}

export const get = (
  url: string,
  data?: any,
  extend: IextendConfig = { cache: false }
) => {
  let defaultConfig = {
    url,
    method: 'GET',
    params: data
  };
  let config = { ...defaultConfig, ...extend };
  return new Promise((resolve, reject) => {
    axios(config as AxiosRequestConfig)
      .then((res: any) => {
        if (res.status) {
          resolve(res.data);
        } else {
          resolve(res.result);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const post = (
  url: string,
  data?: any,
  extend: IextendConfig = { isJson: true, cache: false }
) => {
  let defaultConfig = {
    url,
    method: 'POST',
    data: extend.isJson ? data : qs.stringify(data)
  };
  let config = { ...defaultConfig, ...extend };
  return new Promise((resolve, reject) => {
    axios(config as AxiosRequestConfig)
      .then((res: any) => {
        if (res.status) {
          resolve(res.data);
        } else {
          resolve(res.result);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
