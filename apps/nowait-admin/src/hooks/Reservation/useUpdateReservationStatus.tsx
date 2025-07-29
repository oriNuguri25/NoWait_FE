import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface UpdateReservationParams {
  storeId: number;
  userId: number;
  status: "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED" | "NO_SHOW";
}

export const useUpdateReservationStatus = () => {
  return useMutation({
    mutationFn: async ({
      storeId,
      userId,
      status,
    }: UpdateReservationParams) => {
      const res = await AdminApi.patch(
        `/reservations/admin/update/${storeId}/${userId}/${status}`
      );
      return res.data;
    },
  });
};
