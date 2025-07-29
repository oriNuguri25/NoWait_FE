import React from "react";
import SalesCard from "./SalesCard";
import TotalSalesCard from "./TotalSalesCard";

const HeaderStatus = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] w-[754px] max-h-[50%]">
      <div className="flex flex-col gap-[10px]">
        {/* 오늘 매출 */}
        <SalesCard
          today={{
            date: "2025.07.18 금",
            amount: 920000,
            diffAmount: 120000,
            percent: 13.6,
          }}
          previous={{
            date: "2025.07.17 목",
            amount: 800000,
          }}
        />

        {/* 누적 매출 */}
        <TotalSalesCard
          title="누적매출"
          date="2025. 07.18 - 07.19"
          amount={1800000}
          percent={-0.6}
        />
      </div>
      {/* 인기 메뉴 TOP 5 */}
      <div className="flex flex-col bg-white rounded-xl p-6 shadow max-h-[352px]">
        <div className="flex flex-col mb-[25px]">
          <p className="text-title-18-bold text-navy-80">인기 메뉴 TOP 5</p>
          <span className="text-13-regular text-black-60">2025.07.18 금</span>
        </div>
        <ul>
          {[1, 2, 3, 4, 5].map((rank) => (
            <li key={rank} className="flex justify-between h-[52px]">
              <span className="flex text-16-bold gap-[10px]">
                {rank} <p className="text-16-semibold">참치마요주먹밥</p>
              </span>
              <span className="text-16-medium">100개</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderStatus;
