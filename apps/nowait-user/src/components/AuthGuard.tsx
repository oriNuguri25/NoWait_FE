import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // 현재 경로가 /login이고 토큰이 있는 경우 홈으로 리다이렉트
    if (window.location.pathname === "/login" && token) {
      navigate("/", { replace: true });
      return;
    }

    // 토큰이 있지만 인증 상태가 false인 경우 (토큰이 유효하지 않음)
    if (token && !isAuthenticated) {
      // 유효하지 않은 토큰 삭제
      localStorage.removeItem("accessToken");
      navigate("/login", { replace: true });
      window.scrollTo(0, 0);
      return;
    }

    // 토큰이 명확히 없는 경우에만 로그인 페이지로 이동
    if (!token && !isAuthenticated) {
      navigate("/login", { replace: true });
      window.scrollTo(0, 0); // 화면을 맨 위로 스크롤
    }
  }, [isAuthenticated, navigate]);

  // localStorage에서 직접 토큰 확인 (더 즉각적인 체크)
  const hasToken = localStorage.getItem("accessToken");

  // 토큰이 있거나 인증 상태가 true면 children 렌더링
  if (hasToken || isAuthenticated) {
    return <>{children}</>;
  }

  // 로딩 상태 표시
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">인증 확인 중...</p>
      </div>
    </div>
  );
};

export default AuthGuard;
