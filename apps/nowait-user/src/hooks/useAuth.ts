import { useQuery } from "@tanstack/react-query";

// localStorage에서 토큰 존재 여부만 확인하는 함수
const checkAuthToken = (): boolean => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};

// 로그인 상태를 TanStack Query로 관리하는 훅
export const useAuth = () => {
  const { data: isAuthenticated, refetch } = useQuery({
    queryKey: ["auth", "token"],
    queryFn: checkAuthToken,
    staleTime: 1000 * 60 * 25, // 25분간 캐시 유지
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
