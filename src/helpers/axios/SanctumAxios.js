import axios from "axios";
const BasicAxios = axios.create({
  // baseURL: "http://localhost:8000/",
  baseURL: import.meta.env.VITE_API_SANCTUM_URL,

  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",

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
//       const authStore = useAuthStore();
//       authStore.authenticated = false;
//       router.push({name: 'forbidden'});
//     }
//     return Promise.reject(error);
//   }
// );

export default BasicAxios;
