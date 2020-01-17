import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cache, { IcacheConfig } from './cache';
import presetConfig from './config';

process.env.BASE_URL = 'http://localhost:3001/api';

const baseUrl: string =
  process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/api';

const statusMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['content-type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;
axios.defaults.timeout = 50000;

function handleErrorStatus(err: AxiosError) {
  switch (err.response?.status) {
    case 404:
      console.log('page not found');

      break;
    case 401:
      console.log('status 401')
      
    case 403:
      console.log('status 403')
      
    default:
      break;
  }
}

let cacheAxios = new Cache(axios, presetConfig, {
  requestIntercepterFn: (config: IcacheConfig) => {
    return Promise.resolve(config);
  },
  responseIntercepterFn: (response: AxiosResponse) => {
    return Promise.resolve(response);
  }
});

cacheAxios.init();

axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.status) {
      console.log(response.config);
    }
    return Promise.resolve(response);
  },
  (err: AxiosError) => {
    handleErrorStatus(err);
    return Promise.reject(err);
  }
);

export default axios;
