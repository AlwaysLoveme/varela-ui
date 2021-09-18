import qs from "qs";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";

export interface Interceptors {
  beforeRequest:
    | ((config: AxiosRequestConfig) => Promise<AxiosRequestConfig>)
    | null;
  afterRequest:
    | ((result: AxiosResponse) => Promise<Record<string, any>>)
    | null;
  rejectError: ((err: AxiosError) => void) | null;
}
export type RequestInstance = AxiosInstance & Interceptors;

const cancelTokenSources = new Map(); // 定义cancel队列
const request: RequestInstance = axios.create({
  timeout: 20000,
  method: "POST",
}) as RequestInstance;

const handlerRequest = async (config: AxiosRequestConfig) => {
  if (!(config.data instanceof FormData) && config.method === "POST") {
    config.data = qs.stringify(config.data);
  }
  if (request.beforeRequest !== null) {
    const configData = await request.beforeRequest(config);
    if (configData) config = configData;
  }
  if (!Object.prototype.hasOwnProperty.call(config, "cancelToken")) {
    // 排除不需要cancel的请求
    const source = axios.CancelToken.source();
    cancelTokenSources.set(source.token, source.cancel); // 加入cancel队列
    config.cancelToken = source.token;
  }
  return config;
};
const handlerResponse = async (res: AxiosResponse) => {
  let data = res.data;
  if (res.config.cancelToken) {
    cancelTokenSources.delete(res.config.cancelToken);
  }
  if (request.afterRequest !== null) {
    const result = await request.afterRequest(res);
    if (result) data = result;
  }
  return data;
};
const handlerError = (err: AxiosError) => {
  if (axios.isCancel(err)) {
    return cancelTokenSources.delete(err.message);
  }
  return err;
};

// 默认拦截器
request.interceptors.request.use(handlerRequest, handlerError);
request.interceptors.response.use(handlerResponse, handlerError);

request.beforeRequest = null;
request.afterRequest = null;
request.rejectError = null;

export default request;
export { cancelTokenSources };
