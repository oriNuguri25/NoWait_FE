//음식 메뉴 타입
export interface MenuType {
  menuId: string;
  images: { id: string; imageUrl: string }[];
  name: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  deleted: boolean;
}
