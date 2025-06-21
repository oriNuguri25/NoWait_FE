import React from "react";
import PageFooterButton from "../../components/order/PageFooterButton";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-full">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <img
          className="mb-2.5 w-[210px] h-[210px] bg-amber-300"
          src=""
          alt=""
        />
        <h1 className="text-headline-24-bold mb-2">주문이 접수되었어요!</h1>
        <h2 className="text-text-16-regular text-black-70">
          입금 확인 후 조리를 진행할게요.
          <br />
          조금만 기다려 주세요.
        </h2>{" "}
        {/* 16px regular */}
      </div>
      <PageFooterButton onClick={() => navigate("/")}>확인</PageFooterButton>
    </div>
  );
};

export default OrderSuccessPage;
