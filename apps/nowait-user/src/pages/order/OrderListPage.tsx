import React from "react";
import MenuItem from "../../components/order/MenuItem";
import PageFooterButton from "../../components/order/PageFooterButton";

const OrderListPage = () => {
  const order = () => {};
  <div>
    <div className="mx-5"></div>
  </div>;
  return (
    <div>
      <div className="py-8 px-5">
        <h1 className="text-headline-24-bold mb-5">총 주문 3건</h1>
        <ul>
          {Array.from({ length: 8 }).map((_, i) => {
            return <MenuItem key={i} />;
          })}
        </ul>
        <div className="w-full fixed left-0 bottom-[124px] bg-white">
          <div className="flex justify-between items-center px-5">
            <p className="text-title-18-medium text-[#363d4a]">합계</p>
            <h2 className="text-[26px] font-semibold">36,000원</h2>
          </div>
        </div>
        <PageFooterButton onClick={order}>주문하기</PageFooterButton>
      </div>
    </div>
  );
};

export default OrderListPage;
