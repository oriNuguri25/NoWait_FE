import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

interface UpdateStoreParams {
  storeId: number;
  name: string;
  location: string;
  description: string;
  notice: string;
  openTime: string;
}

export const useUpdateStore = () => {
  return useMutation({
    mutationFn: async ({ storeId, ...data }: UpdateStoreParams) => {
      const res = await AdminApi.patch(`/admin/stores/${storeId}`, data);
      return res.data;
    },
  });
};
