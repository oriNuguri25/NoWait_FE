import { useMutation } from "@tanstack/react-query";
import AdminApi from "../utils/AdminApi";
import type { OrderStatus } from "../types/order";

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: number;
      status: OrderStatus;
    }) => {
      const res = await AdminApi.patch(`/admin/orders/status/${orderId}`, {
        orderStatus: status,
      });
      return res.data;
    },
  });
};
