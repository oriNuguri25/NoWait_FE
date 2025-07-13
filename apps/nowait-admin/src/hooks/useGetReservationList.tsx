import { useQuery } from "@tanstack/react-query";
import AdminApi from "../utils/AdminApi";

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

interface ApiResponse {
  success: boolean;
  response: ReservationResponse;
}

const fetchReservations = async (
  storeId: number
): Promise<ReservationResponse> => {
  const res = await AdminApi.get<ApiResponse>(`/reservations/admin/${storeId}`);
  return res.data.response;
};

export const useGetReservationList = (storeId: number | null) => {
  return useQuery({
    queryKey: ["reservations", storeId],
    queryFn: () => {
      if (storeId === null) throw new Error("storeId is null");
      return fetchReservations(storeId);
    },
    enabled: storeId !== null, // storeId 없으면 실행 안 함
  });
};
