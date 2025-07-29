import UserApi from "../utils/UserApi";

interface ReservationType {
  partySize: number;
}

interface StoreResponse {
  success: boolean;
  response: {
    storeId: number;
    waitingCount: number;
    isWaiting: false;
    departmentId: number;
    departmentName: string;
    name: string;
    location: string;
    description: string;
    notice: string;
    openTime: string;
    profileImage: {
      id: number;
      storeId: number;
      imageUrl: string;
      imageType: string;
    };
    bannerImages:
      | {
          id: number;
          storeId: number;
          imageUrl: string;
          imageType: string;
        }[]
      | undefined;
    isActive: boolean;
    deleted: boolean;
    createdAt: string;
    isBookmarked: boolean;
  };
}

export interface BookmarkResponse {
  success: boolean;
  response: {
    bookmarkId: string;
    userId: string;
    storeId: string;
  };
}

// 주점 정보 가져오기
export const getStore = async (
  storeId: string | undefined
): Promise<StoreResponse> => {
  const res = await UserApi.get(`/v1/stores/${storeId}`);
  return res.data;
};

// 주점 예약하기
export const createReservation = async (
  storeId: string,
  payload: ReservationType
) => {
  const res = await UserApi.post(
    `/reservations/create/redis/${storeId}`,
    payload
  );
  return res.data;
};

// 북마크 조회
export const getBookmark = async () => {
  const res = await UserApi.get("/bookmarks");
  return res.data;
};

// 북마크 생성
export const createBookmark = async (
  storeId: string | undefined
): Promise<BookmarkResponse> => {
  const res = await UserApi.post(`/bookmarks/${storeId}`);
  return res.data;
};

// 북마크 삭제
export const deleteBookmark = async (storeId: string | undefined) => {
  const res = await UserApi.delete(`/bookmarks/${storeId}`);
  return res.data;
};
