import type { CartType } from "../types/order/cart";

export const sumQuantity = <T, K extends keyof T>(
  items: T[],
  key: K
): number => {
  return items.reduce((acc, cur) => acc + Number(cur[key]), 0);
};

export const sumTotalPrice = (items: CartType[]) => {
  const totalPrice = items.reduce(
    (acc, cur) => acc + cur.price,
    0
  );
  return totalPrice;
};
