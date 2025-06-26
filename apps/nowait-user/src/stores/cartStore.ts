import { create } from "zustand";
import type { CartItem } from "../types/order/cart";
import { persist } from "zustand/middleware";

interface CartState {
  cart: CartItem[];
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      increaseQuantity: (id) =>
        set(({ cart }) => ({
          cart: cart.map((item) => {
            return item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
        })),
      decreaseQuantity: (id) =>
        set(({ cart }) => ({
          cart: cart.map((item) => {
            return item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item;
          }),
        })),
      addToCart: (item) =>
        set(({ cart }) => {
          const existingIndex = cart.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          if (existingIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingIndex] = {
              ...updatedCart[existingIndex],
              quantity: updatedCart[existingIndex].quantity + item.quantity,
            };
            return { cart: updatedCart }; // 수량 변경
          } else {
            return { cart: [...cart, item] }; // 새 메뉴 추가
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" }
  )
);
