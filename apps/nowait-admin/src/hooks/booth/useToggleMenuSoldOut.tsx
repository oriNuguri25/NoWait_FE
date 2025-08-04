import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface ToggleSoldOutParams {
  menuId: number;
}

export const useToggleMenuSoldOut = () => {
  return useMutation({
    mutationFn: async ({ menuId }: ToggleSoldOutParams) => {
      const res = await AdminApi.patch(`/admin/menus/toggle-soldout/${menuId}`);
      return res.data;
    },
  });
};
