import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { MarketListing, User } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});

export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
};

export const marketAPI = {
  getAll: (): Promise<{data: MarketListing[]}> => api.get('/market/'),
  create: (data: any) => api.post('/market/', data),
};

export default api;