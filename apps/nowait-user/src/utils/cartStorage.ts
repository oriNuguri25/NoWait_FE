import type { CartType } from "../types/order/cart";

const CART_KEY = "cart";

export const getTableId = (): string => {
  const tableId = localStorage.getItem("tableId");
  return tableId || "";
};


//주문 시 세션 아이디, 입금자명 로컬스토리지에 저장
export const setSessionData = (sessionId: string, depositorName: string) => {
  localStorage.setItem("sessionId", sessionId);
  localStorage.setItem("depositorName", depositorName);
};


export const getcart = (): CartType[] => {
  const cartString = localStorage.getItem(CART_KEY);
  try {
    const parsedCart = cartString ? JSON.parse(cartString) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

export const addToCart = (newItem: CartType) => {
  const cart = getcart();
  const existingItem = cart.find((item) => item.menuId === newItem.menuId);
  if (existingItem) {
    existingItem.quantity += newItem.quantity;
    existingItem.price += newItem.price;
  } else {
    cart.push(newItem);
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
