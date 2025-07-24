import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface UpdateReservationArgs {
  storeId: number;
  reservationId: string; // ← userId 자리
  status: "CALLING" | "CONFIRMED" | "CANCELLED" | "NO_SHOW";
}

export const useUpdateReservationStatus = () => {
  return useMutation({
    mutationFn: async ({
      storeId,
      reservationId,
      status,
    }: UpdateReservationArgs) => {
      const res = await AdminApi.post(
        `/reservations/admin/update/${storeId}/${reservationId}/${status}`
      );
      return res.data;
    },
  });
};
