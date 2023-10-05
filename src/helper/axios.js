import axios from 'axios';

import { isTokenExpired, refreshAccessToken } from './TokenService';

const axiosAdmin = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_ADMIN,
  headers: { "Content-Type": "application/json" },
});

const axiosAdminUpFile = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_ADMIN,
  headers: { "Content-Type": "multipart/form-data" },
});

// const axiosClient = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL_USER,
//   headers: { "Content-Type": "application/json" },
// });

axiosAdmin.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("TOKEN");
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");

  if (refreshToken && isTokenExpired(refreshToken)) {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");

    window.location.href = '/login';

    return;
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (token && isTokenExpired(token)) {
    const newToken = await refreshAccessToken(refreshToken);

    if (newToken) {
      localStorage.setItem("TOKEN", newToken);
      config.headers['Authorization'] = `Bearer ${newToken}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosAdminUpFile.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("TOKEN");
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");

  if (refreshToken && isTokenExpired(refreshToken)) {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");

    window.location.href = '/login';

    return;
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (token && isTokenExpired(token)) {
    const newToken = await refreshAccessToken(refreshToken);

    if (newToken) {
      localStorage.setItem("TOKEN", newToken);
      config.headers['Authorization'] = `Bearer ${newToken}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export {
  axiosAdmin,
  axiosAdminUpFile,
  // axiosClient,
}
