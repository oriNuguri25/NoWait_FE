export interface WaitingItem {
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
  bannerImageUrl?: string[]; // 배너 이미지 URL 배열 추가
  departmentId?: number; // 홈페이지에서 사용하는 departmentId 추가
}
