import axios from "axios";

const PORT = process.env.NEXT_PUBLIC_API_BASE_URL

const axiosInstance = axios.create({
    baseURL: PORT,  
    timeout: 10000,
    headers: {
    "Content-Type": "application/json",
    },
})

// Add request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export default axiosInstance