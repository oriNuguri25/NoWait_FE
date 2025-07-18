import { useLocation } from "react-router-dom";
import type { MenuType } from "../../../types/order/menu";

const StoreMenuDetailPage = () => {
  const location = useLocation();
  const { image, name, description } = location.state as MenuType;

  return (
    <div>
      <div className="flex-1 overflow-y-auto px-5">
        <h1 className="-mx-5 h-[375px] bg-black-25">
          <img className="w-full" src={image} alt="음식 메뉴 이미지" />
        </h1>
        <div className="py-8">
          <h1 className="text-headline-22-bold mb-2">{name}</h1>
          <h2>{description}</h2>
        </div>
      </div>
    </div>
  );
};

export default StoreMenuDetailPage;
