/// <reference types="axios"/>
import * as axios from 'axios'
// 为window对象声明索引签名
export declare var window: {
  [key: string]: any; // missing index defintion
  prototype: Window;
  new (): Window;
};

// 定义Iconfig,包括了cacheMode,cache,expire
export declare interface Iconfig extends axios.AxiosRequestConfig {
  cacheMode: string;
  cache: boolean;
  expire: number;
}

// 定义了两个拦截器的配置
export declare interface IintercepterConfig extends axios.AxiosRequestConfig {
  requestIntercepterFn: IinterceptionFn<axios.AxiosRequestConfig>;
  responseIntercepterFn: IinterceptionFn<axios.AxiosResponse>;
}

// 定义了拦截器函数
export declare interface IinterceptionFn<T> {
  (value: T): T | Promise<T>;
}
