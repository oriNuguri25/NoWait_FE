import React from "react";

interface TotalSalesCardProps {
  title: string; // 예: "누적매출"
  date: string; // 예: "2025. 07.18 - 07.19"
  amount: number; // 예: 1800000
  percent: number; // 예: -0.6
}

const TotalSalesCard: React.FC<TotalSalesCardProps> = ({
  title,
  date,
  amount,
  percent,
}) => {
  const percentColor =
    percent > 0
      ? "text-[#FF5A1F]" // 상승: 주황
      : percent < 0
      ? "text-[#3A75E5]" // 하락: 파랑
      : "text-gray-500"; // 변동 없음

  return (
    <div className="bg-white rounded-[12px] p-6 shadow-sm w-full h-full flex flex-col justify-between">
      {/* 상단 제목 + 날짜 */}
      <div>
        <p className="text-title-18-bold text-black">{title}</p>
        <p className="text-13-regular text-gray-400 mt-1">{date}</p>
      </div>

      {/* 금액 + 퍼센트 변화 */}
      <div className="flex items-baseline gap-2 mt-4">
        <p className="text-headline-22-bold text-[#1C1C1C]">
          {amount.toLocaleString()}원
        </p>
        <span className={`text-14-regular ${percentColor}`}>
          {percent > 0 ? `+${percent}%` : `${percent}%`}
        </span>
      </div>
    </div>
  );
};

export default TotalSalesCard;
