import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface CreateMenuParams {
  storeId: number;
  name: string;
  description: string;
  price: number;
}

export const useCreateMenu = () => {
  return useMutation({
    mutationFn: async (menuData: CreateMenuParams) => {
      const res = await AdminApi.post("/admin/menus/create", menuData);
      return res.data;
    },
  });
};
