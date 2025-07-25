//음식 메뉴 타입
export interface MenuType {
  menuId: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isSoldOut : boolean;
  deleted: boolean;
}
