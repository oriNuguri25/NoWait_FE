import React from "react";
import QuantitySelector from "../../components/common/QuantitySelector";
import { useLocation, useParams } from "react-router-dom";
import PageFooterButton from "../../components/order/PageFooterButton";

const AddMenuPage = () => {
  const params = useParams();
  const location = useLocation();
  const { id, image, menu, price } = location.state;

  const addToCartButton = () => {};
  return (
    <div>
      <div className="px-5">
        <h1 className="-mx-5 h-[375px] bg-amber-400">
          <img className="w-full" src={image} alt="음식 메뉴 이미지" />
        </h1>
        <div className="my-[30px]">
          <h1 className="text-title-24-semibold mb-2">{menu}</h1>
          <h2 className="text-16-regular text-black-70">
            메뉴
            설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명
          </h2>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-title-26-semibold">{price}</h1>
          <QuantitySelector />
        </div>
        <PageFooterButton onClick={addToCartButton}>추가하기</PageFooterButton>
      </div>
    </div>
  );
};

export default AddMenuPage;
