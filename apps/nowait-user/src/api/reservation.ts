import UserApi from "../utils/UserApi";

const SERVER_URI = import.meta.env.VITE_SERVER_URI;

interface ReservationType {
  partySize: number;
}

// 주점 정보 가져오기
export const getStore = async (storeId: string | undefined) => {
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
export const createBookmark = async (storeId: string | undefined) => {
  const res = await UserApi.post(`/bookmarks/${storeId}`);
  return res.data;
};

// 북마크 삭제
export const deleteBookmark = async (bookmarkId: string) => {
  const res = await UserApi.delete(`/bookmarks/${bookmarkId}`);
  return res.data;
};
