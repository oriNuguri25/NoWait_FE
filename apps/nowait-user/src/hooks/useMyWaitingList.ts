import { useQuery } from "@tanstack/react-query";
import UserApi from "../utils/UserApi";

// 내 대기 목록 데이터 타입
interface MyWaitingStore {
  storeId: number;
  storeName: string;
  departmentName: string;
  rank: number;
  teamsAhead: number;
  partySize: number;
  status: string;
  registeredAt: string;
  location: string;
  profileImageUrl: string;
  bannerImageUrl?: string;
}

// 서버 응답 구조
interface MyWaitingResponse {
  success: boolean;
  response: MyWaitingStore[];
  error: null;
}

// 내 대기 목록 데이터를 가져오는 함수
const fetchMyWaitingList = async (): Promise<MyWaitingStore[]> => {
  try {
    const response = await UserApi.get<MyWaitingResponse>(
      "/reservations/my/waitings"
    );

    console.log("내 대기 목록 서버 응답:", response.data);

    if (response.data.success && response.data.response) {
      return response.data.response;
    } else {
      console.warn("내 대기 목록 응답이 성공하지 못했습니다:", response.data);
      return [];
    }
  } catch (error) {
    console.error("내 대기 목록 데이터 로딩 실패:", error);
    if (error && typeof error === "object" && "response" in error) {
      console.error("응답 상태:", (error as any).response?.status);
      console.error("응답 데이터:", (error as any).response?.data);
    }
    return [];
  }
};

export const useMyWaitingList = () => {
  const {
    data: myWaitingList = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myWaitingList"],
    queryFn: fetchMyWaitingList,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    myWaitingList,
    isLoading,
    error,
    refetch,
  };
};

// MyWaitingStore 타입도 export
export type { MyWaitingStore };
