import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

export const useDeleteMenu = () => {
  return useMutation({
    mutationFn: async (menuId: number) => {
      const res = await AdminApi.delete(`/admin/menus/delete/${menuId}`);
      return res.data;
    },
  });
};
