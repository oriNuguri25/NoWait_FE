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
    <div className="bg-white max-h-[364px] rounded-[12px] p-6 shadow-sm w-full h-full mt-[10px]">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h2 className="text-title-18-bold text-navy-80">부스별 판매순위</h2>
        </div>
        <span className="text-[12px] text-gray-400">{date}</span>
      </div>

      <ul>
        {data.map((item) => {
          const isUp = item.rankChange > 0;
          const isDown = item.rankChange < 0;
          const isSame = item.rankChange === 0;

          return (
            <li
              key={item.rank + item.name}
              className={`flex h-[54px] justify-between items-center p-2 rounded relative ${
                item.isCurrentBooth
                  ? "bg-[#F5F8FA] w-[103%] left-1/2 -translate-x-1/2 rounded-[10px] px-[2.5%]"
                  : ""
              }`}
            >
              <div className="flex items-center w-[710px]">
                <span className="text-[14px] font-semibold text-gray-600 w-[30px] h-[23px]">
                  {item.rank}
                </span>
                <div className="w-6 h-6 rounded-full bg-[#5A6ACF] mr-[10px]" />
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
