import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
  CancelTokenStatic,
  AxiosError
} from 'axios';
export declare var window: {
  [key: string]: any; // missing index defintion
  prototype: Window;
  new (): Window;
};

// 定义IcacheConfig,包括了cacheMode,cache,expire
export declare interface IcacheConfig extends AxiosRequestConfig {
  cacheMode: string;
  cache: boolean;
  expire: number;
}

// 定义了两个拦截器的配置
export declare interface IintercepterConfig extends AxiosRequestConfig {
  requestIntercepterFn: IinterceptionFn<IcacheConfig>;
  responseIntercepterFn: IinterceptionFn<AxiosResponse>;
}

// 定义了拦截器函数
export declare interface IinterceptionFn<T> {
  (value: T): T | Promise<T> | any;
}

// 定义了缓存类
export default class Cache {
  axios: AxiosStatic; // axios静态实例
  caches: any[]; // 缓存
  config?: AxiosRequestConfig; // 外部定义的axios配置
  interceptorConfig: IintercepterConfig; // 外部定义的拦截器配置
  defaultConfig: any; // 默认配置，设置了cacheMode,cache,expire
  CancelToken?: CancelTokenStatic; // 取消请求

  constructor(
    axios: AxiosStatic,
    presetConfig: AxiosRequestConfig,
    interceptorConfig: IintercepterConfig
  ) {
    this.axios = axios;
    this.caches = [];
    if (!this.axios) {
      throw new Error('请传入axios实例');
    }
    this.interceptorConfig = interceptorConfig;
    this.defaultConfig = {
      cacheMode: 'localStorage',
      cache: false,
      expire: 100 * 1000,
      ...presetConfig
    };
    this.CancelToken = this.axios?.CancelToken;
  }

  // 初始化拦截器以及设置缓存数据
  init(): void {
    this.requestInterceptor(this.interceptorConfig.requestIntercepterFn);
    this.responseInterceptor(this.interceptorConfig.responseIntercepterFn);
    // 再页面关闭前的操作
    window.onbeforeunload = () => {
      this.clearUnusedStorage();
    };
  }

  // 请求拦截器
  requestInterceptor(callback: IinterceptionFn<IcacheConfig>) {
    this.axios.interceptors.request.use(
      // 这里的config是用户请求发过来的config
      async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        // newConfig为经过拦截器包装后的config
        let newConfig: AxiosRequestConfig =
          callback && (await callback(config as IcacheConfig));
        config = {
          ...this.defaultConfig,
          ...newConfig
        };
        let {
          url,
          data,
          params,
          cacheMode,
          cache,
          expire
        } = config as IcacheConfig;
        if (cache === true) {
          let getKey = data
            ? `${url}?cacheParams=${JSON.stringify(data)}`
            : `${url}?cacheParams=${params}`;

          let obj = this.getStorage(cacheMode, getKey);

          if (obj) {
            let currentTime: number = this.getExpireTime();
            let source = this.CancelToken?.source();
            config.cancelToken = source?.token;
            if (currentTime - obj.expire < expire) {
              source?.cancel(obj);
            } else {
              this.removeStorage(cacheMode, url as string);
            }
          }
        } else {
          this.clearStorage(url as string);
        }
        return Promise.resolve(config);
      },
      (err: AxiosError) => Promise.reject(err)
    );
  }

  // 响应拦截器
  responseInterceptor(callback: IinterceptionFn<AxiosResponse>): any {
    this.axios.interceptors.response.use(
      async (response: AxiosResponse): Promise<AxiosResponse> => { 
        let newResponse: AxiosResponse =
          callback && (await callback(response));
        response = newResponse || response;
        if (response.status !== 200) {
          return response.data;
        }
        let {
          url,
          data,
          params,
          cache,
          cacheMode
        } = response.config as IcacheConfig;
        if (cache === true) {
          let obj = {
            expire: this.getExpireTime(),
            params,
            data,
            result: response.data
          };
          let setKey = data
            ? `${url}?cacheParams=${data}`
            : `${url}?cacheParams=${params}`;

          this.caches.push(setKey);
          this.setStorage(cacheMode, setKey, obj);
        }
        return Promise.resolve(response);
      },
      (err: AxiosError) => {
        if (this.axios.isCancel(err)) {
          return Promise.resolve(err.message);
        }
        return Promise.reject(err);
      }
    );
  }

  // 设置缓存
  setStorage(cacheMode: string = 'sessionStorage', key: string, obj: any) {
    (window[cacheMode] as Storage).setItem(key, JSON.stringify(obj));
  }

  // 获取缓存
  getStorage(cacheMode: string, key: string): any {
    let data: any = (window[cacheMode] as Storage).getItem(key);
    return JSON.parse(data);
  }

  // 清除缓存
  removeStorage(cacheMode: string = 'cacheStorage', key: string) {
    (window[cacheMode] as Storage).removeItem(key);
  }

  // 清除未用到得缓存
  clearUnusedStorage() {
    let length = window.localStorage.length;
    if (length) {
      for (let i = 0; i < length; i++) {
        let key = window.localStorage.key(i);
        if (!this.caches.includes(key) && key.includes('?cacheParams=')) {
          window.localStorage.removeItem(key);
        }
      }
    }
  }

  // 清空缓存
  clearStorage(key: string) {
    if (window.localStorage.getItem(key)) {
      window.localStorage.removeItem(key);
    } else {
      window.sessionStorage.removeItem(key);
    }
  }

  // 获取过期时间
  getExpireTime() {
    return new Date().getTime();
  }
}
