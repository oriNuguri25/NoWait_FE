import { useMutation } from "@tanstack/react-query";
import AdminApi from "../utils/AdminApi";
export const useUpdateReservationStatus = () => {
  const token = localStorage.getItem("adminToken");

  return useMutation({
    mutationFn: async ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED" | "NO_SHOW";
    }) => {
      const res = await AdminApi.patch(
        `/reservations/admin/updates/${reservationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });
};
