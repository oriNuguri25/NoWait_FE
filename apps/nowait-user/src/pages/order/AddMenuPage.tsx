import React, { useState } from "react";
import QuantitySelector from "../../components/common/QuantitySelector";
import { useLocation, useNavigate } from "react-router-dom";
import PageFooterButton from "../../components/order/PageFooterButton";
import { addToCart } from "../../utils/cartStorage";
import type { CartItem } from "../../types/order/cart";

const AddMenuPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, image, name, description, price } = location.state;
  const [quantity, setQuantity] = useState(1);

  const addToCartButton = () => {
    const item: CartItem = {
      itemId: id,
      name,
      quantity,
      price: price * quantity,
    };

    addToCart(item);
    navigate(-1);
  };

  return (
    <div>
      <div className="px-5">
        <h1 className="-mx-5 h-[375px] bg-amber-400">
          <img className="w-full" src={image} alt="음식 메뉴 이미지" />
        </h1>
        <h1>{name}</h1>
        <h2>{description}</h2>
        <div>
          <h1>{(price * quantity).toLocaleString()}원</h1>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>
        <PageFooterButton onClick={addToCartButton}>주문하기</PageFooterButton>
      </div>
    </div>
  );
};

export default AddMenuPage;
