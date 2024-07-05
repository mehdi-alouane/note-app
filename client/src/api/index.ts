import axios from "axios";

const apiURL = `http://localhost:3000/api/`

const api = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add an interceptor to set the authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;