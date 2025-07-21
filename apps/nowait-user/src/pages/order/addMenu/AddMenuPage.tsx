import { useState } from "react";
import QuantitySelector from "../../../components/common/QuantitySelector";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import type { CartType } from "../../../types/order/cart";
import { useCartStore } from "../../../stores/cartStore";
import NumberFlow from "@number-flow/react";

const AddMenuPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { id, image, name, description, price } = location.state;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const addToCartButton = () => {
    const item: CartType = {
      menuId: id,
      image,
      name,
      quantity,
      price: price * quantity,
    };
    addToCart(item);

    navigate(`/${storeId}`, { state: { added: true }, replace: true });
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto px-5">
        <h1 className="-mx-5">
          <img className="w-full" src={image} alt="음식 메뉴 이미지" />
        </h1>
        <div className="py-8">
          <h1 className="text-headline-22-bold mb-2">{name}</h1>
          <h2>{description}</h2>
        </div>
      </div>
      {/* 메뉴 가격 및 수량 컨트롤 */}
      <div className="sticky left-0 bottom-[124px] bg-white">
        <div className="w-full flex justify-between items-center px-5">
          <h1 className="text-[24px] font-semibold">
            <NumberFlow value={(price * quantity)} suffix="원"/>
            {/* {(price * quantity).toLocaleString()}원 */}
          </h1>
          <QuantitySelector
            mode="state"
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
      <PageFooterButton>
        <Button textColor="white" onClick={addToCartButton}>
          추가하기
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default AddMenuPage;
