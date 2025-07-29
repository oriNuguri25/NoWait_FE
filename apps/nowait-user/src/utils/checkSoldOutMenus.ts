import type { CartType } from "../types/order/cart";
import type { MenuType } from "../types/order/menu";

// cart : 장바구니, menus: 최신 데이터
export const getSoldOutMenusInCart = (cart: CartType[], menus: MenuType[]) => {
  // 솔드아웃된 메뉴 아이디들만 모아놓은 배열
  const soldOutMenuIds = menus
    ?.filter((menu) => menu.isSoldOut)
    .map((menu) => menu.menuId);
  // 장바구니와 비교하여 솔드아웃된 메뉴 배열
  return cart.filter((cartItem) => soldOutMenuIds?.includes(cartItem.menuId));
};
