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
      name,
      quantity,
      price: price * quantity,
    };
    addToCart(item);

    navigate(`/${storeId}`, { state: { added: true }, replace: true });
  };
  return (
    <div>
      <div className="flex flex-col min-h-screen-dvh px-5">
        <h1 className="-mx-5">
          <img
            className="w-full min-h-[250px] object-cover"
            src={image}
            alt="음식 메뉴 이미지"
          />
        </h1>
        <div className="pt-7.5">
          <h1 className="text-headline-22-bold mb-2 break-keep">{name}</h1>
          <h2 className="text-16-regular text-black-70 break-keep">
            {description}
          </h2>
        </div>
      </div>
      <PageFooterButton>
        {/* 메뉴 가격 및 수량 컨트롤 */}
        <div className="w-full flex justify-between items-center mb-8">
          <h1 className="text-[24px] font-bold">
            <NumberFlow value={price * quantity} trend={0} suffix="원" />
          </h1>
          <QuantitySelector
            mode="state"
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
        <Button textColor="white" onClick={addToCartButton}>
          추가하기
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default AddMenuPage;
