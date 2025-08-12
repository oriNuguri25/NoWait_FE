import { useMemo } from "react";
import type { MyWaitingStore } from "./useMyWaitingList";

// WaitingItem 타입 정의
interface WaitingItem {
  id: number;
  number: number;
  storeName: string;
  waitingCount: number;
  departmentName: string;
  category: string;
  people: number;
  date: string;
  location: string;
  imageUrl: string;
  bannerImageUrl: string[];
  departmentId: number;
}

export const useWaitingItems = (
  myWaitingList: MyWaitingStore[]
): WaitingItem[] => {
  return useMemo(
    () =>
      myWaitingList.map((store) => ({
        id: store.storeId,
        number: store.rank,
        storeName: store.storeName,
        waitingCount: store.teamsAhead,
        departmentName: store.departmentName,
        category: store.departmentName, // category는 departmentName과 동일하게 설정
        people: store.partySize,
        date: (() => {
          const date = new Date(store.registeredAt);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${year}.${month}.${day} ${hours}:${minutes}`;
        })(),
        location: store.location,
        imageUrl:
          store.bannerImageUrl && store.bannerImageUrl.length > 0
            ? store.bannerImageUrl[0]
            : store.profileImageUrl, // bannerImage가 있다면 사용, 없으면 profileImage 사용
        bannerImageUrl: Array.isArray(store.bannerImageUrl)
          ? store.bannerImageUrl
          : [], // bannerImageUrl 배열 추가
        departmentId: store.storeId, // departmentId는 storeId로 설정
      })),
    [myWaitingList]
  );
};

// WaitingItem 타입도 export
export type { WaitingItem };
