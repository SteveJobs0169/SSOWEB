import axios from 'axios';
import {message} from "antd";
import {isRefreshRequest, refreshToken} from "../api/refreshToken";

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
        // config.headers['Authorization'] = localStorage.getItem("authenticationToken");
        // config.url = config.url;
        if (!isRefreshRequest(config)) {
            config.headers.Authorization = localStorage.getItem("authenticationToken") || "";
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        return Promise.reject(error);
    }
);


request.interceptors.response.use(
    async (response) => {
        // 在接收到响应后可以进行一些操作，例如处理响应数据
        const {code, msg} = response.data;

        // if (code === 200) {
        //     message.success(msg);
        // }

        if(response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken)
        }

        if (response.data.authenticationToken) {
            localStorage.setItem('authenticationToken', response.data.authenticationToken)
        }

        if (code === 401 && !isRefreshRequest(response.config)){
            const isSuccess = await refreshToken();

            if (isSuccess) {

                response.config.headers.Authorization = localStorage.getItem("authenticationToken") || "";

                return await axios.request(response.config);
            } else {
                console.log('无权限');
                window.location.href = '/login';
                return response.data;
            }
        }

        return response;
    },
    (error) => {
        // 处理响应错误
        return Promise.reject(error);
    }
);

export default request;