import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

export type UpdateSortBody = { menuId: number; sortOrder: number }[];
type UpdateSortRes = { success: boolean; response: boolean };

export const useUpdateMenuSort = () =>
  useMutation<UpdateSortRes, unknown, UpdateSortBody>({
    mutationFn: async (body) => {
      const { data } = await AdminApi.patch("/admin/menus/update-sort", body);
      return data;
    },
  });
