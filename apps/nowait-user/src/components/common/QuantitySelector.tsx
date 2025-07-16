import React from "react";
import Minus from "../../assets/icon/minus.svg?react";
import Plus from "../../assets/icon/plus.svg?react";
import NumberFlow, { continuous } from "@number-flow/react";

interface stateProps {
  mode: "state";
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

interface storeProps {
  mode: "store";
  id: string;
  quantity: number;
  price: number;
  increaseQuantity: (id: string, price: number) => void;
  decreaseQuantity: (id: string, price: number) => void;
}

type PropsType = stateProps | storeProps;

const QuantitySelector = (props: PropsType) => {
  const isQuantityMin = props.quantity === 1;
  const isQuantityMax = props.quantity === 99;

  const increaseQuantityButton = () => {
    // 전체 주문 페이지에서 수량 컨트롤(로컬 스토리지에 바로 반영)
    if (props.mode === "store") {
      props.increaseQuantity(props.id, props.price);
      // 메뉴 추가 페이지에서 수량 컨트롤(메뉴 추가 페이지에서 추가하기 클릭 전까지 로컬 스토리지에 반영x)
    } else if (props.mode === "state") {
      props.setQuantity(props.quantity + 1);
    }
  };
  const decreaseQuantityButton = () => {
    if (props.mode === "store") {
      props.decreaseQuantity(props.id, props.price);
    } else if (props.mode === "state") {
      props.setQuantity(props.quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-end gap-0.5">
      <button
        className={`${
          isQuantityMin ? "bg-[#F5F8FA]" : "bg-[#F2F6F9]"
        } rounded-[7px] w-[28px] h-[28px] flex items-center justify-center`}
        disabled={isQuantityMin}
        onClick={decreaseQuantityButton}
      >
        <Minus fill={`${isQuantityMin ? "#DBE3E9" : "#97A7B2"}`} />
      </button>
      <p
        className={`w-[30px] text-center ${
          props.mode === "state"
            ? "text-[20px] font-semibold"
            : "text-16-semibold"
        } text-balck-80`}
      >
        <NumberFlow value={props.quantity} plugins={[continuous]} />
      </p>
      <button
        className={`${
          isQuantityMax ? "bg-[#F5F8FA]" : "bg-[#F2F6F9]"
        } rounded-[7px] w-[28px] h-[28px] flex items-center justify-center`}
        disabled={isQuantityMax}
        onClick={increaseQuantityButton}
      >
        <Plus fill={`${isQuantityMax ? "#DBE3E9" : "#97A7B2"}`} />
      </button>
    </div>
  );
};

export default QuantitySelector;
