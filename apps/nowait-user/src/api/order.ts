import axios from "axios";
import type {
  CreateOrderServerResponse,
  OrderDetailsServerResponse,
  OrderType,
} from "../types/order/order";

export const api = axios.create({
  withCredentials: true,
});

//주문 생성
export const createOrder = async (
  storeId: string,
  tableId: string,
  payload: OrderType
): Promise<CreateOrderServerResponse> => {
  const res = await api.post(`/orders/create/${storeId}/${tableId}`, payload);
  return res.data;
};

//주문 내역 조회
export const getOrderDetails = async (
  storeId: string | undefined,
  tableId: string
): Promise<OrderDetailsServerResponse> => {
  const res = await api.get(`/orders/items/${storeId}/${tableId}`);
  return res.data;
};
