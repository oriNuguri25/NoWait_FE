import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface MenuItem {
  menuId: number;
  name: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  imageUrl?: string;
  // 필요한 경우 필드를 더 추가하세요
}

export const useGetAllMenus = (storeId: number) => {
  return useQuery<MenuItem[]>({
    queryKey: ["all-menus", storeId],
    queryFn: async () => {
      const res = await AdminApi.get(
        `/admin/menus/all-menus/stores/${storeId}`
      );
      return res.data;
    },
    enabled: !!storeId,
    staleTime: 1000 * 60, // 1분 캐싱
  });
};
