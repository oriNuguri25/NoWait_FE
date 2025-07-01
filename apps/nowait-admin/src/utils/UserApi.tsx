import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// 자유게시판 전체 데이터
const UserApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// UserApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken"); // 또는 context에서 가져오기
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default UserApi;
