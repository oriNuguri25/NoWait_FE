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
  disabled: boolean;
}

const SalesCard: React.FC<SalesCardProps> = ({ today, previous, disabled }) => {
  const [showToday, setShowToday] = useState(true);
  // const [isHoverBack, setIsHoverBack] = useState(false);
  // const [isHoverForward, setIsHoverForward] = useState(false);

  const formatDate = (date: String) => {
    if (!date) return "";
    return `${date.replace(/-/g, ".")}`;
  };

  return (
    <div className="bg-white rounded-[12px] p-6 w-full h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <span>
          <p className="text-title-18-bold text-navy-80">오늘 매출</p>
          <p className="text-13-regular text-black-60 mt-1">
            {formatDate(today.date)}
          </p>
        </span>

        <span className="flex">
          {/* 이전 버튼 */}
          <img
            src={showToday ? (disabled ? backIcon : activeBackIcon) : backIcon}
            className={`h-5 w-5 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => showToday && setShowToday(false)}
          />
          {/* 다음 버튼 */}
          <img
            src={
              !showToday
                ? disabled
                  ? forwardIcon
                  : activeForwardIcon
                : forwardIcon
            }
            className={`h-5 w-5 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !showToday && setShowToday(true)}
          />
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline">
          <p className="text-headline-22-bold text-navy-80">
            {today.amount.toLocaleString()}원
          </p>

          {!disabled && showToday && (
            <span>
              {today.percent > 0 ? "+" : ""}
              {today.percent > 0 ? today.percent + "%" : ""}
            </span>
          )}
        </div>

        {!disabled && showToday && (
          <p className="text-13-regular text-black-80">
            {today.diffAmount > 0
              ? `어제보다 ${today.diffAmount.toLocaleString()}원{" "}더 벌었어요!`
              : ""}
          </p>
        )}
        {disabled && showToday && <></>}
      </div>
    </div>
  );
};

export default SalesCard;
