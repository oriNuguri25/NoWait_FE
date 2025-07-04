import axios from "axios";
import type { CartType } from "../types/order/cart";

const SERVER_URI = import.meta.env.VITE_SERVER_URI;

interface OrderType {
  depositorName: string;
  items: { menuId: string; quantity: number }[];
}

interface ServerResponse {
  success: boolean;
  response: {
    orderId: number;
    storeId: number;
    storeName: string;
    sessionId: string;
    depositorName: string;
    orderItems: { menuId: string; quantity: number }[];
    status: string;
    totalPrice: number;
  };
}

export const createOrder = async (
  storeId: string,
  tableId: string,
  payload: OrderType
) => {
  try {
    const res = await axios.post<ServerResponse>(
      `${SERVER_URI}/orders/create/${storeId}/${tableId}`,
      payload
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMyOrderList = async (
  storeId: string | undefined,
  tableId: string
) => {
  try {
    const res = await axios.get(
      `${SERVER_URI}/orders/items/${storeId}/${tableId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
