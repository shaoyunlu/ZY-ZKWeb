// 引入axios
import axios from 'axios';
import {useRouter} from 'vue-router'

const router = useRouter()

// 创建axios实例
const http = axios.create({
  //baseURL: 'http://localhost:3100/web',
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
  withCredentials: true
});

const blobHttp = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  responseType: 'blob' // 重要：设置响应类型为blob以接收二进制数据
})

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如设置token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 任何位于2xx范围内的状态码都会触发此函数
    // 对响应数据做点什么
    const data = response.data;
    // 这里根据后端返回的数据结构来进行调整
    if(data.success) {
      return data.payLoad; // 只返回需要的数据
    } else {
      // 你可以在这里处理错误，或者抛出错误让catch语句捕获
      return Promise.reject(new Error(data.message || 'Error'));
    }
  },
  error => {
    // 任何超出2xx范围的状态码都会触发此函数
    // 对响应错误做点什么
    console.log('请求出错:', error);
    if (error.response.status == '401'){
        window.location.href = '#/login'
    }
    return Promise.reject(error);
  }
);

export default http
export {blobHttp}
