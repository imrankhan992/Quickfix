// axios_url.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  // baseURL: 'https://quickfix-8pw7.onrender.com',
  // baseURL: 'https://noahai.ai',
  withCredentials:true
});

export default axiosInstance;
