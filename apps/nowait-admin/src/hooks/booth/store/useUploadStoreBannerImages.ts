import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

export const useUploadStoreBannerImages = () => {
  return useMutation({
    mutationFn: async ({
      storeId,
      images,
    }: {
      storeId: number;
      images: File[];
    }) => {
      const formData = new FormData();

      images.forEach((img) => {
        formData.append("files", img); // 백엔드에서 files[] 로 받을 수 있도록
      });

      const res = await AdminApi.post(
        `/admin/stores/banner-images/${storeId}`,
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
