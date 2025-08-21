import { useMutation } from "@tanstack/react-query";
import AdminApi from "../utils/AdminApi";

export const useToggleStoreActive = () => {
  return useMutation({
    mutationFn: async (storeId: number) => {
      const res = await AdminApi.patch(
        `/admin/stores/toggle-active/${storeId}`
      );
      return res.data.response;
    },
  });
};
