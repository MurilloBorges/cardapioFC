import axios from 'axios';
import { getToken } from './authentication';

const api = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
});

api.interceptors.request.use(async (config) => {
  const configuration = config;
  const token = getToken();
  if (token) {
    configuration.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
