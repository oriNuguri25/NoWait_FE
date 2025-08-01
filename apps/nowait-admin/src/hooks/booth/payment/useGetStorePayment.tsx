import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

export const useGetStorePayment = () => {
  return useQuery({
    queryKey: ["storePayment"],
    queryFn: async () => {
      try {
        const res = await AdminApi.get("/admin/store-payments");
        return res.data;
      } catch (err: any) {
        if (err.response?.status === 403) {
          // 결제 정보 없음으로 처리
          return null;
        }
      }
    },
  });
};
