import React from "react";

const formatDateWithDay = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = days[date.getDay()];

  return `${year}.${month}.${day} ${dayName}`;
};

interface BoothRanking {
  rank: number;
  name: string;
  department: string;
  salesCount: number;
  rankChange: number;
  isCurrentBooth?: boolean;
  profileImageUrl: string;
}

interface BoothSalesRankingCardProps {
  date: string;
  data: BoothRanking[];
  disabled: boolean;
  isTablet: boolean;
}

const BoothSalesRankingCard: React.FC<BoothSalesRankingCardProps> = ({
  date,
  data,
  disabled,
  isTablet,
}) => {
  return (
    <div
      className={`bg-white  rounded-[16px] mt-[10px] ${
        disabled ? "flex flex-col justify-center items-center relative" : ""
      } ${
        isTablet
          ? "h-[364px] max-h-[50%] p-6 w-[754px]"
          : "w-[335px] h-[410px] p-[22px]"
      }`}
    >
      <div
        className={`flex justify-between mb-4 ${
          disabled ? "absolute left-[22px] top-[22px] w-[710px]" : ""
        }`}
      >
        <div className="flex items-center">
          <h2 className="text-title-18-bold text-navy-80">부스별 판매순위</h2>
        </div>
        <span className="flex text-[12px] text-gray-400 items-center">
          {formatDateWithDay(date)}
        </span>
      </div>
      {disabled && (
        <div className="flex flex-col justify-center items-center text-black-60 text-13-regular">
          <p>집계된 데이터가 없어요.</p>
          <p>축제가 시작되면 순위를 표시할게요.</p>
        </div>
      )}

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
              <div className="flex items-center w-1/2">
                <span className="text-14-semibold text-gray-600 w-[30px] h-[23px]">
                  {item.rank}
                </span>
                <div className="w-9 h-9 rounded-full overflow-hidden mr-[10px]">
                  <img
                    src={item.profileImageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center text-sm gap-2">
                  <span className="text-16-semibold text-black">
                    {item.name}
                  </span>
                  <span className="text-[12px] text-gray-400">
                    {item.department}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-1/2 gap-3">
                <div></div>
                <span className="flex text-16-medium text-black">
                  {item.salesCount}건
                </span>

                {/* 랭크 변화 표시 */}
                <div
                  className={`text-14-semibold w-[40px] h-[29px] py-[5px] flex items-center justify-center rounded-[8px] ${
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
