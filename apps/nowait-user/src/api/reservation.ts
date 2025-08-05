import type { BookmarkResponse } from "../types/wait/bookmark";
import type { StoreResponse } from "../types/wait/store";
import UserApi from "../utils/UserApi";

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

// 모든 주점 정보 가져오기
export const getAllStores = async () => {
  const response = await UserApi.get<ServerResponse>("/v1/stores/all-stores", {
    params: {
      page: 0,
      size: 50,
    },
  });
  return response.data;
};

// 모든 주점 정보 가져오기
export const getInfiniteAllStores = async (
  pageParam: number
): Promise<{ storePageReadResponses: Store[]; hasNext: boolean }> => {
  const response = await UserApi.get<ServerResponse>("/v1/stores/all-stores", {
    params: {
      page: pageParam,
      size: 5,
    },
  });
  return response.data.response;
};

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
