import backIcon from "../../../assets/analytics/arrow_back.svg";
import forwardIcon from "../../../assets/analytics/arrow_forward.svg";
import activeBackIcon from "../../../assets/analytics/arrow_back_active.svg";
import activeForwardIcon from "../../../assets/analytics/arrow_forward_active.svg";
import { useState } from "react";

interface SalesCardProps {
  today: {
    date: string;
    amount: number;
    diffAmount: number;
    percent: number;
  };
  previous: {
    date: string;
    amount: number;
  };
}

const SalesCard: React.FC<SalesCardProps> = ({ today, previous }) => {
  const [showToday, setShowToday] = useState(true);
  const [isHoverBack, setIsHoverBack] = useState(false);
  const [isHoverForward, setIsHoverForward] = useState(false);

  return (
    <div className="bg-white rounded-[12px] p-6 w-full h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <span>
          <p className="text-title-18-bold text-navy-80">
            {showToday ? "오늘 매출" : "이전 매출"}
          </p>
          <p className="text-13-regular text-black-60 mt-1">
            {showToday ? today.date : previous.date}
          </p>
        </span>
        {/* 이전,다음 이동 버튼 */}
        <span className="flex">
          {/* 이전 버튼: 오늘 매출일 때만 활성화 */}
          <img
            src={
              showToday ? activeBackIcon : backIcon // 비활성 이미지로 고정
            }
            className={`h-5 w-5 cursor-pointer`}
            onMouseEnter={() => showToday && setIsHoverBack(true)}
            onMouseLeave={() => showToday && setIsHoverBack(false)}
            onClick={() => showToday && setShowToday(false)}
          />

          {/* 다음 버튼: 이전 매출일 때만 활성화 */}
          <img
            src={!showToday ? activeForwardIcon : forwardIcon}
            className={`h-5 w-5 cursor-pointer `}
            onMouseEnter={() => !showToday && setIsHoverForward(true)}
            onMouseLeave={() => !showToday && setIsHoverForward(false)}
            onClick={() => !showToday && setShowToday(true)}
          />
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <p className="text-headline-22-bold text-navy-80">
            {(showToday ? today.amount : previous.amount).toLocaleString()}원
          </p>

          {showToday && (
            <>
              <span
                className={`text-14-regular gap-[4px] ${
                  today.percent > 0
                    ? "text-primary" // 상승
                    : today.percent < 0
                    ? "text-[#3A75E5]" // 하락
                    : "text-gray-500" // 변동 없음
                }`}
              >
                {today.percent >= 0 ? "+" : ""}
                {today.percent}%
              </span>
            </>
          )}
        </div>
        {showToday && (
          <p className="text-13-regular text-black-80">
            어제보다 {today.diffAmount.toLocaleString()}원{" "}
            {today.diffAmount >= 0 ? "더 벌었어요!" : "덜 벌었어요!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesCard;
