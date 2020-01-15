import axios from './axios';
import Cache from './cache';
import Config from './config';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

export const get = (url: string, data?: any, extend = { cache: true }) => {
  let defaultConfig = {
    url,
    method: 'GET',
    params: data
  };
  let config = { ...defaultConfig, ...extend };
  return new Promise((resolve, reject) => {
    axios(config as AxiosRequestConfig).then(
      res => {
      resolve(res)  
      }
    ).catch(err => {
      reject(err)
    })
  })
};
