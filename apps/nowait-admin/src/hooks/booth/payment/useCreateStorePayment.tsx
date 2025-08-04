import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

interface CreateStorePaymentParams {
  tossUrl: string;
  kakaoPayUrl: string;
  naverPayUrl: string;
  accountNumber: string;
}

export const useCreateStorePayment = () => {
  return useMutation({
    mutationFn: async (paymentData: CreateStorePaymentParams) => {
      const res = await AdminApi.post(
        "/admin/store-payments/create",
        paymentData
      );
      return res.data;
    },
  });
};
