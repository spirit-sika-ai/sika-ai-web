import type {AxiosRequestConfig} from 'axios';
import axios from 'axios';
import type {InternalAxiosRequestConfig} from 'axios';
import type {R} from '@/type/BaseType'

/**
 * 默认所有接口都需要鉴权, 不需要鉴权方法request提供notAuth参数值为true即可
 * 鉴权不通过强制跳转登录页重新登录
 */
interface SikaRequestConfig extends AxiosRequestConfig {
  notAuth?: boolean;
}

const instance = axios.create({
  baseURL: '/api',
  timeout: 3600000
});
instance.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

instance.interceptors.request.use((config: SikaRequestConfig) => {
  // 需要鉴权接口处理, 校验用户是否已登录
  if (config.notAuth === undefined || !config.notAuth) {
    // 优先依赖js-cookie进行cookie处理, 无js-cookie时手动处理cookie
  }
  return config as InternalAxiosRequestConfig;
});

export const request = async <T = any>(config: SikaRequestConfig): Promise<R<T>> => {
  try {
    const response = await instance.request<R<T>>(config);
    // 服务器层面错误
    const {data} = response;
    return data;
  } catch (error) {
    // 网络层面错误
    return {
      code: 500,
      message: '请求失败',
      result: {} as T
    }
  } finally {
  }
};