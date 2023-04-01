import axios from "axios";
// import { useAuthStore } from "@/stores/AuthStore.js";
// import router from "@/router/index";

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  timeout: 15000,
});

// axiosInstance.defaults.withCredentials = true;

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response.status === 401) {
//       const authStore = useAuthStore();
//       authStore.authenticated = false;
//       router.push({name: 'forbidden'});
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
