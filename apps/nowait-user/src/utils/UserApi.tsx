import axios from "axios";

const API_URI = import.meta.env.VITE_SERVER_URI;

const UserApi = axios.create({
  baseURL: API_URI,
});

// 토큰 갱신 함수 (순환 참조 방지를 위해 여기서 직접 구현)
const refreshToken = async (): Promise<string | null> => {
  try {
    console.log("🔄 토큰 갱신 시도 중...");
    console.log("API_URI:", API_URI);

    const response = await axios.post(
      `${API_URI}/api/refresh-token`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ 토큰 갱신 응답:", response.data);
    console.log("응답 상태:", response.status);
    console.log("응답 헤더:", response.headers);

    // 서버 응답 구조에 맞게 access_token 추출
    const newAccessToken = response.data?.access_token;

    if (newAccessToken && typeof newAccessToken === "string") {
      console.log(
        "✅ 새로운 access_token 저장:",
        newAccessToken.substring(0, 20) + "..."
      );
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }

    console.warn("⚠️ 응답에서 유효한 토큰을 찾을 수 없음:", response.data);
    return null;
  } catch (error) {
    console.error("❌ 토큰 갱신 실패:", error);

    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as any;
      console.error("응답 상태:", axiosError.response?.status);
      console.error("응답 데이터:", axiosError.response?.data);
      console.error("응답 헤더:", axiosError.response?.headers);
    }

    // 네트워크 에러인 경우 토큰을 삭제하지 않음
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      (error as any).code === "NETWORK_ERROR"
    ) {
      console.log("네트워크 에러로 인한 실패 - 토큰 유지");
      return null;
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("recentSearches");
    return null;
  }
};

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

// 응답 인터셉터를 추가하여 토큰 만료 시 자동 갱신
UserApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰 갱신 조건: access token 만료이지만 refresh token은 정상일 때만
    const isAccessTokenExpired =
      error.response?.data &&
      (error.response.data.includes?.("access token expired") ||
        error.response.data.message?.includes?.("access token expired") ||
        error.response.data === "access token expired");

    // refresh token 문제가 있는 경우 토큰 갱신하지 않음
    const isRefreshTokenInvalid =
      error.response?.data &&
      (error.response.data.includes?.("expired refresh token") ||
        error.response.data.message?.includes?.("expired refresh token") ||
        error.response.data.includes?.("invalid refresh token") ||
        error.response.data.message?.includes?.("invalid refresh token") ||
        error.response.data.includes?.("Invalid or expired refresh token") ||
        error.response.data.message?.includes?.(
          "Invalid or expired refresh token"
        ));

    // refresh token에 문제가 있으면 바로 로그인 페이지로 이동
    if (isRefreshTokenInvalid) {
      console.log("Refresh token 문제 감지 - 재로그인 필요");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("recentSearches");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // access token만 만료된 경우에만 토큰 갱신 시도
    if (isAccessTokenExpired) {
      // 이미 재시도한 요청이면 더 이상 재시도하지 않음
      if (originalRequest._retry) {
        console.log("토큰 갱신 재시도 실패, 로그인 페이지로 이동");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      console.log("토큰 만료 감지, 갱신 시도");

      try {
        const newToken = await refreshToken();

        if (newToken) {
          console.log("토큰 갱신 성공, 원래 요청 재시도");
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return UserApi(originalRequest);
        } else {
          console.log("토큰 갱신 실패, 로그인 페이지로 이동");
          window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.log("토큰 갱신 중 오류 발생:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("recentSearches");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default UserApi;
