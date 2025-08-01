import type { BookmarkResponse } from "../types/wait/bookmark";
import type { StoreResponse } from "../types/wait/store";
import UserApi from "../utils/UserApi";

// interface Store {
//   storeId: number;
//   bannerImages: {
//     id: number;
//     imageType: string;
//     imageUrl: string;
//     storeId: number;
//   }[];
//   departmentName: string;
//   name: string;
//   location: string;
//   description: string;
//   profileImage: {
//     id: number;
//     storeId: number;
//     imageUrl: string;
//     imageType: string;
//   } | null;
//   isActive: boolean;
//   deleted: boolean;
//   createdAt: string;
//   waitingCount: number;
// }

// 실제 서버 응답 구조
// interface ServerResponse {
//   success: boolean;
//   response: {
//     hasNext: boolean;
//     storePageReadResponses: Store[];
//   };
//   error: null;
// }

// 모든 주점 정보 가져오기
export const getAllStores = async() => {
  try {
    // UserApi 사용으로 헤더 설정 자동화 (인터셉터에서 최신 토큰 처리)
    const response = await UserApi.get<any[]>(
      "/v1/stores/all-stores",
      {
        params: {
          page: 5,
          size: 5,
        },
      }
    );
    console.log("스토어 데이터 모든 데이터=======>",response)
    return response.data
    // console.log("서버 응답 전체:", response.data);

    // // 서버 응답 구조에 맞게 데이터 추출
    // if (
    //   response.data.success &&
    //   response.data.response?.storePageReadResponses
    // ) {
    //   const storeArray = response.data.response.storePageReadResponses;
    //   const hasNext = response.data.response.hasNext;

    //   console.log("추출된 주점 배열:", storeArray);
    //   console.log("hasNext:", hasNext);

    //   // 삭제된 주점 필터링하고 실제 서버 데이터 그대로 반환
    //   const stores: Store[] = storeArray
    //     .filter((store: Store) => store && !store.deleted)
    //     .map((store: Store) => ({
    //       ...store,
    //     }));

    //   console.log("필터링된 주점 데이터:", stores);
    //   return { stores, hasNext };
    // } else {
    //   console.warn(
    //     "서버 응답이 성공하지 못했거나 데이터가 없습니다:",
    //     response.data
    //   );
    //   return { stores: [], hasNext: false };
    // }
  } catch (error) {
    console.error("주점 데이터 로딩 실패:", error);
    // UserApi는 axios 기반이므로 axios 에러 체크 유지
    if (error && typeof error === "object" && "response" in error) {
      console.error("응답 상태:", (error as any).response?.status);
      console.error("응답 데이터:", (error as any).response?.data);
    }
    return { stores: [], hasNext: false };
  }
}

// 주점 상세 정보 가져오기
export const getStore = async (
  storeId: string | undefined
): Promise<StoreResponse> => {
  const res = await UserApi.get(`/v1/stores/${storeId}`);
  return res.data;
};

// 주점 예약하기
export const createReservation = async (
  storeId: string,
  payload: { partySize: number }
) => {
  const res = await UserApi.post(
    `/reservations/create/redis/${storeId}`,
    payload
  );
  return res.data;
};

// 북마크 조회
export const getBookmark = async (): Promise<BookmarkResponse> => {
  const res = await UserApi.get("/bookmarks");
  return res.data;
};

// 북마크 생성
export const createBookmark = async (storeId: string | undefined) => {
  await UserApi.post(`/bookmarks/${storeId}`);
};

// 북마크 삭제
export const deleteBookmark = async (storeId: string | undefined) => {
  const res = await UserApi.delete(`/bookmarks/${storeId}`);
  return res.data;
};
