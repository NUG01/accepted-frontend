import axios from "axios";
const BasicAxios = axios.create({
  baseURL: "http://localhost:8000/api/",
  // baseURL: import.meta.env.API_BASE_URL,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

BasicAxios.defaults.withCredentials = true;

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response.status === 401) {
//       // const authStore = useAuthStore();
//       // authStore.authenticated = false;
//       // router.push({name: 'll'});
//     }
//     return Promise.reject(error);
//   }
// );

export default BasicAxios;
