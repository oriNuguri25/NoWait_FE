import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

export interface Reservation {
  id: number;
  storeId: number;
  userName: string;
  requestedAt: string;
  status: "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED";
  partySize: number;
}

interface ReservationResponse {
  waitingCount: number;
  confirmedCount: number;
  cancelledCount: number;
  callingCount: number;
  reservationList: Reservation[];
}

const fetchReservations = async (
  storeId: number
): Promise<ReservationResponse> => {
  const res = await AdminApi.get(`/reservations/admin/${storeId}/completed`);
  return res.data;
};

export const useGetCompletedList = (storeId: number | null) => {
  return useQuery({
    queryKey: ["completed", storeId],
    queryFn: () => {
      if (storeId === null) throw new Error("storeId is null");
      return fetchReservations(storeId);
    },
    enabled: storeId !== null, // storeId 없으면 실행 안 함
  });
};
