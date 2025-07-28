import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

export const useUploadStoreProfileImage = () => {
  return useMutation({
    mutationFn: async ({
      storeId,
      image,
    }: {
      storeId: number;
      image: File;
    }) => {
      const formData = new FormData();
      formData.append("file", image);

      const res = await AdminApi.post(
        `/admin/stores/profile-images/${storeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data;
    },
  });
};
