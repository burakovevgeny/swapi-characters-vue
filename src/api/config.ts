import axios, { AxiosResponse, AxiosError } from 'axios';

const baseURL = process.env.VUE_APP_API_HOSTNAME;

const api = axios.create({
  baseURL,
  timeout: 300000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error),
);

export { api, baseURL };
