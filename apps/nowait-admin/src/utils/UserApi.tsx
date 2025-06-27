import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// 자유게시판 전체 데이터
const UserApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default UserApi;
