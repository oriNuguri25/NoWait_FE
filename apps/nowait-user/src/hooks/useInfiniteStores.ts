import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Store 데이터 타입 정의
interface Store {
  id: number;
  storeName: string;
  department: string;
  status: "open" | "closed";
  waitingCount: number;
  imageUrl?: string;
}

// 가상의 주점 데이터를 가져오는 함수
const fetchStores = async ({ pageParam = 1 }): Promise<Store[]> => {
  // 로딩 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 300));

  const stores: Store[] = Array.from({ length: 20 }, (_, index) => {
    const globalIndex = (pageParam - 1) * 20 + index;
    return {
      id: globalIndex + 1,
      storeName: `주점${globalIndex + 1}`,
      department: globalIndex % 2 === 0 ? "컴퓨터공학과" : "경영학과",
      status: globalIndex % 3 === 0 ? "closed" : "open",
      waitingCount: Math.floor(Math.random() * 10) + 1,
    };
  });

  return stores;
};

export const useInfiniteStores = () => {
  // 무한 스크롤을 위한 useInfiniteQuery
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["stores"],
      queryFn: fetchStores,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) =>
        allPages.length < 10 ? allPages.length + 1 : undefined,
    });

  // 모든 페이지의 stores를 하나의 배열로 합치기
  const stores = data?.pages.flat() ?? [];

  // 초기 로딩 시 자동으로 두 번째 페이지도 로딩
  useEffect(() => {
    if (stores.length === 20 && hasNextPage && !isFetchingNextPage) {
      console.log("초기 로딩: 두 번째 페이지 자동 로딩");
      fetchNextPage();
    }
  }, [stores.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

// Store 타입도 export
export type { Store };
