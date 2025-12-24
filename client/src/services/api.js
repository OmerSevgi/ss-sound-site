import axios from 'axios';

// Backend API'mizin temel URL'si
// AuthContext.js ve AdminDashboardPage.jsx'de 5001 portu kullanıldığı için burada da 5001 kullanıyoruz.
const API_URL = process.env.REACT_APP_API_URL; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API isteklerine token'ı otomatik olarak ekleyen interceptor
api.interceptors.request.use(
  (config) => {
    // localStorage'dan token'ı al
    const token = localStorage.getItem('adminToken');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
