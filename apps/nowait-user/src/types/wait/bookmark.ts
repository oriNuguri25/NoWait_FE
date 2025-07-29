// 북마크 생성 시 응답 데이터 타입
export interface BookmarkResponse {
  success: boolean;
  response: {
    bookmarkId: string;
    userId: string;
    storeId: string;
  };
}