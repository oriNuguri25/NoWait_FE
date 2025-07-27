import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface MenuDetailParams {
  storeId: number;
  menuId: number;
}

interface MenuDetailResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  imageUrl?: string;
}

export const useGetMenuDetail = ({ storeId, menuId }: MenuDetailParams) => {
  return useQuery<MenuDetailResponse>({
    queryKey: ["menu-detail", storeId, menuId],
    queryFn: async () => {
      const res = await AdminApi.get(`/admin/menus/${storeId}/${menuId}`);
      return res.data;
    },
    enabled: !!storeId && !!menuId, // 유효한 ID일 때만 fetch
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
