import { useQuery } from "@tanstack/react-query";
import userApi from "../utils/UserApi";

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
  const token = localStorage.getItem("adminToken");
  const res = await userApi.get<ApiResponse>(`/reservations/admin/${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.response;
};

export const useGetReservationList = (storeId: number | null) => {
  return useQuery({
    queryKey: ["reservations", storeId],
    queryFn: () => {
      if (storeId === null) throw new Error("storeId is null");
      return fetchReservations(storeId);
    },
    enabled: storeId !== null,
  });
};
