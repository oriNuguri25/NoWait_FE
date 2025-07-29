//장바구니 메뉴 타입
export interface CartType {
  menuId: string;
  name: string;
  image: string;
  originPrice: number;
  price: number;
  quantity: number;
}
