import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let accessToken = null;
export const setAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config; //failed request inside
    const isLoginOrRefreshRequest =
      originalRequest?.url === "/auth/login" ||
      originalRequest?.url === "/auth/refresh";

    if (
      error.response?.status !== 401 ||
      !originalRequest || //request has already been retried.
      originalRequest._retry || //prevent infinite loop
      isLoginOrRefreshRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await api.post("/auth/refresh");
      const refreshedToken = response.data.data.accessToken;

      setAccessToken(refreshedToken);
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;

      return api(originalRequest);

    } catch (refreshError) {
      setAccessToken(null);
      return Promise.reject(refreshError);
    }
  },
);

export default api;
