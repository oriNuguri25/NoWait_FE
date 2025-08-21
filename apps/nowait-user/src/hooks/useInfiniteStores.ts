import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import UserApi from "../utils/UserApi";
import { useApiErrorHandler } from "./useApiErrorHandler";

interface Store {
  storeId: number;
  bannerImages: {
    id: number;
    imageType: string;
    imageUrl: string;
    storeId: number;
  }[];
  departmentName: string;
  name: string;
  location: string;
  description: string;
  profileImage: {
    id: number;
    storeId: number;
    imageUrl: string;
    imageType: string;
  } | null;
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
  waitingCount: number;
}

// 실제 서버 응답 구조
interface ServerResponse {
  success: boolean;
  response: {
    hasNext: boolean;
    storePageReadResponses: Store[];
  };
  error: null;
}

// 서버에서 주점 데이터를 가져오는 함수
const fetchStores = async ({
  pageParam = 0,
}): Promise<{ stores: Store[]; hasNext: boolean }> => {
  try {
    // UserApi 사용으로 헤더 설정 자동화 (인터셉터에서 최신 토큰 처리)
    const response = await UserApi.get<ServerResponse>(
      "/v1/stores/all-stores",
      {
        params: {
          page: pageParam,
          size: 5,
        },
      }
    );

    console.log("서버 응답 전체:", response.data);
    console.log("페이지 파라미터:", pageParam);

    // 서버 응답 구조에 맞게 데이터 추출
    if (
      response.data.success &&
      response.data.response?.storePageReadResponses
    ) {
      const storeArray = response.data.response.storePageReadResponses;
      const hasNext = response.data.response.hasNext;

      console.log("추출된 주점 배열:", storeArray);
      console.log("hasNext:", hasNext);
      console.log("현재 페이지:", pageParam, "| 주점 수:", storeArray.length);

      // 삭제된 주점 필터링하고 실제 서버 데이터 그대로 반환
      const stores: Store[] = storeArray
        .filter((store: Store) => store && !store.deleted)
        .map((store: Store) => ({
          ...store,
        }));

      console.log("필터링된 주점 데이터:", stores);
      return { stores, hasNext };
    } else {
      console.warn(
        "서버 응답이 성공하지 못했거나 데이터가 없습니다:",
        response.data
      );
      return { stores: [], hasNext: false };
    }
  } catch (error) {
    console.error("주점 데이터 로딩 실패:", error);
    // UserApi는 axios 기반이므로 axios 에러 체크 유지
    if (error && typeof error === "object" && "response" in error) {
      console.error("응답 상태:", (error as any).response?.status);
      console.error("응답 데이터:", (error as any).response?.data);
    }
    return { stores: [], hasNext: false };
  }
};

export const useInfiniteStores = () => {
  const { handleApiError } = useApiErrorHandler();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 서버에서 받은 hasNext를 기준으로 다음 페이지 여부 결정
      if (!lastPage.hasNext) {
        return undefined;
      }
      // 다음 페이지 번호 반환 (0부터 시작)
      return allPages?.length || 0;
    },
    retry: 3, // 실패 시 3번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 5, // 5분간 데이터를 fresh로 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 refetch 비활성화
  });

  // 모든 페이지의 stores를 하나의 배열로 합치기
  const stores = useMemo(() => {
    return data?.pages.flatMap((page) => page.stores) ?? [];
  }, [data?.pages]);

  // 에러 로깅 및 토스트 표시
  useEffect(() => {
    if (error) {
      console.error("주점 데이터 로딩 에러:", error);
      handleApiError(error);
    }
  }, [error, handleApiError]);

  return {
    stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};

// Store 타입도 export
export type { Store };
