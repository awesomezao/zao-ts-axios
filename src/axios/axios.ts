import axios from 'axios';
import Cache from './cache';

const baseUrl: string =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.timeout = 50000;

let cache = new Cache(axios,{}, {
  requestIntercepterFn: (config: any) => {
    return Promise.resolve(config);
  },
  responseIntercepterFn: (response: any) => {
    return Promise.resolve(response);
  }
});
cache.init();
export default axios;
