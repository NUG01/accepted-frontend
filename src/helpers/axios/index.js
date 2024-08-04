import axios from "axios";
const BasicAxios = axios.create({
  // baseURL: "http://localhost:8000/api/",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

BasicAxios.defaults.withCredentials = true;

const setCsrfToken = async () => {
  try {
    const response = await BasicAxios.get('/csrf-token');
    const csrfToken = response.data.csrfToken;
    BasicAxios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

// Fetch and set CSRF token when the application initializes
setCsrfToken();

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
