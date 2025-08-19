import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

export const useDeleteBannerImage = () => {
  return useMutation({
    mutationFn: async (storeImageId: number) => {
      const response = await AdminApi.delete(
        `/admin/stores/store-images/${storeImageId}`
      );
      return response.data;
    },
    onSuccess: () => {
      console.log("이미지가 성공적으로 삭제되었습니다.");
    },
    onError: (error: any) => {
      console.log(`이미지 삭제 실패!${error}`);
    },
  });
};
