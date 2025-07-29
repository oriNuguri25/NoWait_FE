import { useQuery } from "@tanstack/react-query";
import UserApi from "../utils/UserApi";

// 대기 중인 주점 데이터 타입
interface WaitingStore {
  bannerImageUrl: string | null;
  departmentName: string;
  storeId: string;
  storeName: string;
  waitingCount: number;
}

// 서버 응답 구조
interface WaitingStoresResponse {
  success: boolean;
  response: WaitingStore[];
  error: null;
}

// 대기 중인 주점 데이터를 가져오는 함수
const fetchWaitingStores = async (
  order: "asc" | "desc" = "desc"
): Promise<WaitingStore[]> => {
  try {
    const response = await UserApi.get<WaitingStoresResponse>(
      "/v1/stores/waiting-list",
      {
        params: {
          order,
        },
      }
    );

    console.log("대기 중인 주점 서버 응답:", response.data);

    if (response.data.success && response.data.response) {
      return response.data.response;
    } else {
      console.warn("대기 중인 주점 응답이 성공하지 못했습니다:", response.data);
      return [];
    }
  } catch (error) {
    console.error("대기 중인 주점 데이터 로딩 실패:", error);
    if (error && typeof error === "object" && "response" in error) {
      console.error("응답 상태:", (error as any).response?.status);
      console.error("응답 데이터:", (error as any).response?.data);
    }
    return [];
  }
};

export const useWaitingStores = (order: "asc" | "desc" = "asc") => {
  const {
    data: waitingStores = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["waitingStores", order],
    queryFn: () => fetchWaitingStores(order),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    waitingStores,
    isLoading,
    error,
  };
};

// WaitingStore 타입도 export
export type { WaitingStore };
