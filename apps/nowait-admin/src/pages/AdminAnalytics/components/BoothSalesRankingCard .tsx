import React from "react";
import arrowIcon from "../../../assets/keyboard_arrow_down.svg";

interface BoothRanking {
  rank: number;
  name: string;
  department: string;
  salesCount: number;
  rankChange: number;
  isCurrentBooth?: boolean;
}

interface BoothSalesRankingCardProps {
  date: string;
  data: BoothRanking[];
}

const BoothSalesRankingCard: React.FC<BoothSalesRankingCardProps> = ({
  date,
  data,
}) => {
  return (
    <div className="bg-white rounded-[12px] p-6 shadow-sm w-full h-full mt-[10px]">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-13-regular font-semibold text-black-60">
            {"통계2"}
          </h2>
          <div className="flex">
            <h5>매출 순위</h5>
            <span>
              <img src={arrowIcon} />
            </span>
          </div>
        </div>
        <span className="text-[12px] text-gray-400">{date}</span>
      </div>

      <ul className="space-y-3">
        {data.map((item) => {
          const isUp = item.rankChange > 0;
          const isDown = item.rankChange < 0;
          const isSame = item.rankChange === 0;

          return (
            <li
              key={item.rank + item.name}
              className={`flex justify-between items-center p-2 rounded ${
                item.isCurrentBooth ? "bg-[#F5F8FA]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-semibold text-gray-600">
                  {item.rank}위
                </span>
                <div className="w-6 h-6 rounded-full bg-[#5A6ACF]" />
                <div className="flex flex-col text-sm">
                  <span className="font-medium text-black">{item.name}</span>
                  <span className="text-[12px] text-gray-400">
                    {item.department}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[14px] font-medium text-black">
                  {item.salesCount}건
                </span>

                {/* 랭크 변화 표시 */}
                <div
                  className={`text-[12px] font-semibold flex items-center justify-center rounded-full w-[30px] h-[20px] ${
                    isUp
                      ? "bg-[#FFF1F0] text-[#FF5A1F]"
                      : isDown
                      ? "bg-[#EDF4FF] text-[#3A75E5]"
                      : "bg-[#F2F2F2] text-[#7E7E7E]"
                  }`}
                >
                  {isUp && <span>{item.rankChange} ↑</span>}
                  {isDown && <span>{Math.abs(item.rankChange)} ↓</span>}
                  {isSame && <span>0 -</span>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BoothSalesRankingCard;
