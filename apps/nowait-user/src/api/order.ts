import axios from "axios";

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

//음식 주문하기
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

//주문내역 가져오기
export const getOrderDetails = async (
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
