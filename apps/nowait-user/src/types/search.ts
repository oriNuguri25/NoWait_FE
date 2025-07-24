export interface SearchStore {
  storeId: number;
  departmentId: number;
  departmentName: string;
  name: string;
  location: string;
  description: string;
  profileImage: string | null;
  bannerImages: any[];
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
}

export interface SearchResponse {
  success: boolean;
  response: SearchStore[];
}
