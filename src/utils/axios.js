import axios from 'axios';
import {message} from "antd";

// const [messageApi, contextHolder] = message.useMessage();

// const customHeaders = {
//   // 'Content-Type': 'application/x-www-form-urlencoded',     // 使用 form 数据格式
//   'Content-Type': 'application/json',     // 使用 JSON 数据格式
//   'Authorization': localStorage.getItem("accessToken") || ""
// };

export const url_head = '/nginxApi/';

const request = axios.create({
  baseURL: process.env.VUE_APP_API, // 设置API的基本URL// 统一设置超时时间
  timeout: 50000,
  // headers: customHeaders // 设置全局请求头
});

// request拦截器：在请求发送前执行的操作
request.interceptors.request.use(
  (config) => {
    // 在请求发送前可以进行一些操作，例如设置请求头
    // config.headers['X-Custom-Header'] = 'Custom Header Value';
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = localStorage.getItem("accessToken") || "";
    // config.url = config.url;
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);


request.interceptors.response.use(
  (response) => {
    // 在接收到响应后可以进行一些操作，例如处理响应数据
    const { RTN_CODE, RTN_MSG } = response.data;

    switch (RTN_CODE) {
      case 200:
        message.success(`${RTN_MSG}`);
        break;
      case 400:
        message.error(`${RTN_MSG}`);
        break;
      case 500:
        message.error(`${RTN_MSG}`);
        break;
      default:
        console.error(`请求失败，状态码：${RTN_CODE}`);
    }

    return response;
  },
  (error) => {
    // 处理响应错误
    const status = error.response.status;

    const { RTN_MSG } = error.response.data;

    switch (status) {
      case 401:
        // 处理未授权的情况，例如跳转到登录页面
        window.location.href = '/login';
        console.error(`请求失败，状态码：${status}`);
        break;
      case 403:
        // 处理禁止访问的情况
        console.error(`请求失败，状态码：${status}`);
        break;
      case 404:
        // 处理资源未找到的情况
        console.error(`请求失败，状态码：${status}`);
        break;
      case 500:
        // 处理服务器内部错误
        message.error(`${RTN_MSG}`);
        console.error(`请求失败，状态码：${status}`);
        break;
      default:
        // 处理其他状态码或一般的响应错误
        // 可以在此处添加适当的错误提示或日志记录
        console.error(`请求失败，状态码：${status}`);
        break;
    }

    return Promise.reject(error);
  }
);

export default request;
