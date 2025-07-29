import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

interface StoreResponse {
  storeId: number;
  departmentId: number;
  name: string;
  location: string;
  description: string;
  notice: string;
  openTime: string;
  profileImage: string | null;
  bannerImages: { id: number; imageUrl: string }[];
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
}

export const useGetStore = (storeId: number) => {
  return useQuery<StoreResponse>({
    queryKey: ["store", storeId],
    queryFn: async () => {
      const res = await AdminApi.get(`/admin/stores/${storeId}`);
      return res.data.response;
    },
    enabled: !!storeId, // storeId 있을 때만 실행
    staleTime: 1000 * 60, // 캐싱 1분
  });
};
