import axios from "axios";

const API_URI = import.meta.env.VITE_SERVER_URI;

const UserApi = axios.create({
  baseURL: API_URI,
});

// 요청 인터셉터를 추가하여 매 요청마다 최신 토큰을 헤더에 설정
UserApi.interceptors.request.use(
  (config) => {
    const currentToken = localStorage.getItem("accessToken");
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default UserApi;
