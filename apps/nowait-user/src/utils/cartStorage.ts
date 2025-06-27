import type { CartItem } from "../types/order/cart";

const CART_KEY = "cart";

export const getcart = (): CartItem[] => {
  const cartString = localStorage.getItem(CART_KEY);
  try {
    const parsedCart = cartString ? JSON.parse(cartString) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

export const addToCart = (newItem: CartItem) => {
  const cart = getcart();
  const existingItem = cart.find((item) => item.id === newItem.id);
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
