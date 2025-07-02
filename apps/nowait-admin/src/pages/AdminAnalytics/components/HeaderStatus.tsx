import React from "react";
import SalesCard from "./SalesCard";

const HeaderStatus = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] h-[352px]">
      <div className="flex flex-col gap-[10px]">
        {/* 오늘 매출 */}
        <SalesCard
          title="오늘 매출"
          date="2025.07.18 금"
          amount={800000}
          diffAmount={12000}
          percent={13.6}
        />
        {/* 누적 매출 */}
        <SalesCard
          title="누적 매출"
          date="2025.07.18 금"
          amount={6400000}
          diffAmount={40000}
          percent={0.63}
        />
      </div>
      {/* 인기 메뉴 TOP 5 */}
      <div className="flex flex-col justify-between bg-white rounded-xl p-6 shadow h-full">
        <div className="flex flex-col mb-2">
          <p className="text-title-18-bold text-navy-80">인기 메뉴 TOP 5</p>
          <span className="text-13-regular text-black-60">2025.07.18 금</span>
        </div>
        <ul className="space-y-2">
          {[1, 2, 3, 4, 5].map((rank) => (
            <li key={rank} className="flex justify-between">
              <span>{rank}위 참치마요주먹밥</span>
              <span className="font-medium">100개</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderStatus;
