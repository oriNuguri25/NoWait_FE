// 주문 상태 타입
export type OrderStatus = "WAITING_FOR_PAYMENT" | "COOKING" | "COOKED";

// 메뉴 수량 타입
export type MenuNamesAndQuantities = Record<string, number>;

// 주문 데이터 타입
export interface Order {
  id: number;
  tableId: number;
  depositorName: string;
  totalPrice: number | null;
  status: OrderStatus;
  menuNamesAndQuantities: MenuNamesAndQuantities;
  createdAt: string;
}
