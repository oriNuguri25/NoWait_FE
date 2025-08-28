// src/components/RedBadge.tsx
import React from "react";

interface RedBadgeProps {
  label: string;
  small?: boolean; // 굳이 null 필요 없으면 선택값으로
  changeColor?: boolean; // same
}

const RedBadge: React.FC<RedBadgeProps> = ({
  label,
  small = false,
  changeColor = false,
}) => {
  const sizeClasses = small
    ? label === "필수"
      ? "rounded-[6px] px-[7px] py-[6px]"
      : "h-[15.55px] w-[38px] py-[3.78px] px-[4px] rounded-[3px]"
    : "h-[32px] rounded-[8px]";

  const colorClasses = changeColor
    ? "bg-[#16191E] text-white"
    : "bg-[#FFECE6] text-[#ff4103]";

  const textSizeClasses = small
    ? label === "필수"
      ? "text-12-bold"
      : "text-8-bold"
    : "text-16-semibold py-[5px] px-[10px]";

  return (
    <div
      className={`inline-block ${sizeClasses} ${colorClasses} flex items-center justify-center`}
    >
      <p className={`flex items-center justify-center ${textSizeClasses}`}>
        {label}
      </p>
    </div>
  );
};

export default RedBadge;
