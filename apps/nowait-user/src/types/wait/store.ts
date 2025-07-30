// 주점 디테일 데이터 타입
export interface StoreResponse {
  success: boolean;
  response: {
    storeId: string;
    waitingCount: number;
    isWaiting: false;
    departmentId: number;
    departmentName: string;
    name: string;
    location: string;
    description: string;
    noticeTitle: string;
    noticeContent: string;
    openTime: string;
    profileImage: {
      id: number;
      storeId: string;
      imageUrl: string;
      imageType: string;
    };
    bannerImages:
      | {
          id: number;
          storeId: string;
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

// 주점 대표 이미지 타입
export interface BannerImages {
  id: number;
  imageType: string;
  imageUrl: string;
  storeId: string;
}

// 학과 대표 이미지 타입
export interface ProfileImage {
  id: number;
  imageType: string;
  imageUrl: string;
  storeId: string;
}
export interface StoreType {
  bannerImages: BannerImages[];
  bookmarkId: number;
  departmentId: number;
  departmentName: string;
  description: string;
  isActive: boolean;
  isBookmark: boolean;
  location: string;
  name: string;
  noticeTitle: string | null;
  noticeContent: string | null;
  openTime: string;
  profileImage: ProfileImage;
  storeId: string;
  waitingCount: number;
}

export interface BookmarkListType {
  bannerImages: BannerImages[];
  bookmarkId: number;
  departmentId: number;
  departmentName: string;
  description: string;
  isActive: boolean;
  isBookmark: boolean;
  location: string;
  name: string;
  noticeTitle: string | null;
  noticeContent: string | null;
  openTime: string;
  profileImage: ProfileImage;
  storeId: string;
  waitingCount: number;
}
