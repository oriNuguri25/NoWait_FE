import backIcon from "../../../assets/analytics/arrow_back.svg";
import forwardIcon from "../../../assets/analytics/arrow_forward.svg";
import activeBackIcon from "../../../assets/analytics/arrow_back_active.svg";
import activeForwardIcon from "../../../assets/analytics/arrow_forward_active.svg";
import { useState } from "react";
interface SalesCardProps {
  title: string; // 예: "오늘 매출" 또는 "누적 매출"
  date: string;
  amount: number;
  diffAmount: number;
  percent: number;
}

const SalesCard: React.FC<SalesCardProps> = ({
  title,
  date,
  amount,
  diffAmount,
  percent,
}) => {
  const [isHoverBack, setIsHoverBack] = useState(false);
  const [isHoverForward, setIsHoverForward] = useState(false);
  return (
    <div className="bg-white rounded-[12px] p-6 shadow-sm w-full h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <span>
          <p className="text-title-18-bold text-navy-80">{title}</p>
          <p className="text-13-regular text-black-60 mt-1">{date}</p>
        </span>
        <span className="flex">
          <img
            src={isHoverBack ? activeBackIcon : backIcon}
            className="h-5 w-5"
            onMouseEnter={() => setIsHoverBack(true)}
            onMouseLeave={() => setIsHoverBack(false)}
          />
          <img
            src={isHoverForward ? activeForwardIcon : forwardIcon}
            className="h-5 w-5"
            onMouseEnter={() => setIsHoverForward(true)}
            onMouseLeave={() => setIsHoverForward(false)}
          />
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <p className="text-headline-22-bold text-navy-80">
            {amount.toLocaleString()}원
          </p>
          <span className="text-14-regular text-primary">+{percent}%</span>
        </div>
        <p className="text-13-regular text-black-80 mt-1">
          어제보다 {diffAmount.toLocaleString()}원 더 벌었어요!
        </p>
      </div>
    </div>
  );
};
export default SalesCard;
