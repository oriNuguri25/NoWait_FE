import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

interface UpdateStorePaymentParams {
  tossUrl: string;
  kakaoPayUrl: string;
  naverPayUrl: string;
  accountNumber: string;
}

export const useUpdateStorePayment = () => {
  return useMutation({
    mutationFn: async (paymentData: UpdateStorePaymentParams) => {
      const res = await AdminApi.patch(
        "/admin/store-payments/update",
        paymentData
      );
      return res.data;
    },
  });
};
