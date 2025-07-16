import axios from "axios";

const SERVER_URI = import.meta.env.VITE_SERVER_URI;

interface ReservationType {
  partySize: number;
}

//주점 예약하기
export const createReservation = async (
  storeId: string,
  payload: ReservationType
) => {
  const res = await axios.post(
    `${SERVER_URI}/reservations/create/${storeId}`,
    payload
  );
  return res.data;
};
