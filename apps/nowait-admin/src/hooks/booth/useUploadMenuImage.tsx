// src/hooks/menu/useUploadMenuImage.ts
import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

export const useUploadMenuImage = () => {
  return useMutation({
    mutationFn: async ({ menuId, image }: { menuId: number; image: File }) => {
      const formData = new FormData();
      formData.append("file", image);

      const res = await AdminApi.post(
        `/admin/menus/images/${menuId}`,
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
