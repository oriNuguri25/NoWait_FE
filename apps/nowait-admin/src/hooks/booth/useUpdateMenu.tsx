import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface UpdateMenuParams {
  menuId: number;
  name: string;
  description: string;
  price: number;
}

export const useUpdateMenu = () => {
  return useMutation({
    mutationFn: async ({ menuId, ...data }: UpdateMenuParams) => {
      const res = await AdminApi.patch(`/admin/menus/update/${menuId}`, data);
      return res.data;
    },
  });
};
