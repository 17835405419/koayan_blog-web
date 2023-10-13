import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:3000/api", //localhost 无网情况下测试
  timeout: 5000,
});

// // 添加请求拦截器
// instance.interceptors.request.use(
//   (config) => {
//     // 在发送请求之前做些什么
//     const { token } = store.state; //从vuex中取出token
//     //  如果用户已登录 统一给接口设置token信息
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (err) => {
//     // 对请求错误做些什么
//     console.log("请求失败", err);
//   }
// );

// // 是否正在刷新
// let isRefreshing = false;
// // 添加响应拦截器
// instance.interceptors.response.use(
//   async (res) => {
//     // 根据返回码 判断token是否过期
//     if (res.data.code === 1004) {
//       if (!isRefreshing) {
//         // 从vuex中获取旧token
//         const { token } = store.state; //从vuex中取出token
//         // 正在刷新
//         isRefreshing = true;
//         // // 用旧token换新token
//         const { data } = await refreshToken({ oldToken: token });
//         if (data.code === 0) {
//           // 更新vuex中的token
//           store.commit("setUserToken", data.token);
//         }
//       }
//       // 请求完成
//       isRefreshing = false;
//     }
//     return res;
//   },
//   (err) => {
//     // 对响应错误做点什么
//     console.log(err);
//     return Promise.reject(err);
//   }
// );

export default instance;
