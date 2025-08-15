import { useToastStore } from "../stores/toastStore";

/**
 * API 에러를 전역적으로 처리하는 훅
 */
export const useApiErrorHandler = () => {
  const { showErrorToast } = useToastStore();

  /**
   * API 에러를 처리하고 적절한 에러 메시지를 표시하는 함수
   * @param error - 에러 객체
   * @param customMessage - 커스텀 에러 메시지 (선택사항)
   */
  const handleApiError = (error: any, customMessage?: string) => {
    let errorMessage = "현재 네트워크가 불안정합니다.";

    if (customMessage) {
      errorMessage = customMessage;
    } else if (error?.response?.status) {
      // HTTP 상태 코드에 따른 에러 메시지
      switch (error.response.status) {
        case 400:
          errorMessage = "잘못된 요청입니다.";
          break;
        case 401:
          errorMessage = "인증이 필요합니다.";
          break;
        case 403:
          errorMessage = "접근 권한이 없습니다.";
          break;
        case 404:
          errorMessage = "요청한 리소스를 찾을 수 없습니다.";
          break;
        case 500:
          errorMessage = "서버 오류가 발생했습니다.";
          break;
        case 502:
        case 503:
        case 504:
          errorMessage = "현재 네트워크가 불안정합니다.";
          break;
        default:
          errorMessage = "현재 네트워크가 불안정합니다.";
      }
    } else if (error?.message) {
      // 네트워크 에러 등
      if (
        error.message.includes("Network Error") ||
        error.message.includes("timeout")
      ) {
        errorMessage = "현재 네트워크가 불안정합니다.";
      } else {
        errorMessage = error.message;
      }
    }

    showErrorToast(errorMessage);
  };

  /**
   * 네트워크 에러 전용 처리 함수
   */
  const handleNetworkError = () => {
    showErrorToast("현재 네트워크가 불안정합니다.");
  };

  return {
    handleApiError,
    handleNetworkError,
  };
};
