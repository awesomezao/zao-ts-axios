import {
  AxiosAdapter,
  AxiosInstance,
  AxiosRequestConfig,
  CancelToken,
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosResponse
} from 'axios';
import axios from 'axios';

interface IintercepterConfig {
  requestIntercepterFn: (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig | AxiosPromise<AxiosRequestConfig>;
  responseIntercepterFn: (response: AxiosResponse) => AxiosPromise;
}
interface IinterceptionFn<T> {
  (value: T): void;
}

export default class Cache {
  axios: AxiosInstance;
  cache: any[];
  config: AxiosRequestConfig & IintercepterConfig;
  defaultConfig: any;
  CancelToken?: CancelToken;
  constructor(
    axios: AxiosInstance,
    config: AxiosRequestConfig,
    interceptorConfig: IintercepterConfig
  ) {
    this.axios = axios;
    this.cache = [];
    if (!this.axios) {
      throw new Error('请传入axios实例');
    }
    this.config = { ...config, ...interceptorConfig };
    this.defaultConfig = {
      cacheMode: 'localStorage',
      cache: false,
      expire: 100 * 1000
    };
    this.CancelToken = this.config.cancelToken;
  }
  // 初始化拦截器以及设置缓存数据
  init(): void {
    this.requestInterceptor(this.config.requestIntercepterFn);
    this.responseInterceptor(this.config.responseIntercepterFn);
    window.onbeforeunload = () => {
      this.mapStorage();
    };
  }
  // 请求拦截器
  requestInterceptor(callback: any) {
    this.axios.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        let newConfig = callback && (await callback(config));
        let _config = { ...newConfig, ...this.defaultConfig };
        let { url, data, params, cacheMode, cache, expire } = _config;
        if (cache === true) {
          let getKey = data
            ? `${url}?cacheParams=${data}`
            : `${url}?cacheParams=${params}`;
          let obj = this.getStorage(cacheMode, getKey);
          if (obj) {
            let currentTime: number = this.getExpireTime();
            let source = this.CancelToken
            
          }
        }
        return Promise;
      }
    );
  }
  // 响应拦截器
  responseInterceptor(callback: AxiosInterceptorManager<AxiosResponse>): any {}
  // 设置缓存
  setStorage(mode: string = 'sessionStorage', key: string) {}
  // 获取缓存
  getStorage(cacheMode: string, getKey: string): any {}
  // 清除缓存
  removeStorage(mode: string = 'sessionStorage', key: string) {}
  // 清除未用到得缓存
  clearUnusedStorage() {}
  // 清空缓存
  clearStorage(key: string) {}

  // 获取过期时间
  getExpireTime() {
    return new Date().getTime()
  }
}
