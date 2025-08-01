import axios from "axios";
import type {
  CreateOrderServerResponse,
  OrderDetailsServerResponse,
  OrderType,
  StorePaymentsResponse,
} from "../types/order/order";

const API_URI = import.meta.env.VITE_SERVER_URI;

export const api = axios.create({
  baseURL: "/",
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
  console.log(res, "주문내역");
  return res.data;
};

//주점 QR, 계좌번호 조회
export const getStorePayments = async (
  storeId: string | undefined
): Promise<StorePaymentsResponse> => {
  try {
    const res = await api.get(`/v1/store-payments/${storeId}`);
    console.log(res, "계좌번호 조회------------------------------");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
