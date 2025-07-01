import axios from "axios";
import type { CartType } from "../types/order/cart";

const SERVER_URI = import.meta.env.VITE_SERVER_URI;

interface OrderType {
  depositorName: string;
  items: { menuId: string; quantity: number }[];
}

// interface ServerResponse {
//   success: boolean;
//   response: {
//     hasNext: boolean;
//     storeReadDtos: Store[];
//   };
// }

export const createOrder = async (
  storeId: string | undefined,
  tableId: string,
  payload: OrderType
) => {
  try {
    const res = await axios.post(
      `${SERVER_URI}/orders/create/${storeId}/${tableId}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
