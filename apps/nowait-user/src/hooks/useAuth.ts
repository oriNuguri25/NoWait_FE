import { useQuery } from "@tanstack/react-query";
import UserApi from "../utils/UserApi";

// 토큰 갱신 함수
export const refreshToken = async (): Promise<string | null> => {
  try {
    const currentToken = localStorage.getItem("accessToken");

    if (!currentToken) {
      return null;
    }

    // UserApi 사용으로 헤더 설정 자동화
    const response = await UserApi.post(
      "/api/refresh-token",
      {},
      {
        withCredentials: true, // HttpOnly 쿠키 포함
      }
    );

    const newAccessToken =
      response.data.accessToken || response.data.token || response.data;

    if (newAccessToken) {
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }

    return null;
  } catch (error) {
    console.log("Token refresh failed:", error);
    // 갱신 실패 시 기존 토큰 제거
    localStorage.removeItem("accessToken");
    return null;
  }
};

// localStorage에서 토큰을 확인하는 함수
const checkAuthToken = (): boolean => {
  return !!localStorage.getItem("accessToken");
};

// 로그인 상태를 TanStack Query로 관리하는 훅
export const useAuth = () => {
  const { data: isAuthenticated, refetch } = useQuery({
    queryKey: ["auth", "token"],
    queryFn: checkAuthToken,
    staleTime: 1000 * 60 * 25, // 25분간 캐시 유지 (토큰 만료 5분 전까지)
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    initialData: checkAuthToken(), // 초기 데이터로 현재 토큰 상태 설정
    retry: false,
  });

  return {
    isAuthenticated: !!isAuthenticated,
    refetch,
  };
};
