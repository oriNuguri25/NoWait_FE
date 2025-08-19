// src/components/RedBadge.tsx
import React from "react";

interface RedBadgeProps {
  label: string;
  small: boolean | null;
}

const RedBadge: React.FC<RedBadgeProps> = ({ label, small }) => {
  return (
    <div
      className={`inline-block ${
        small
          ? label == "필수"
            ? "rounded-[6px] px-[7px] py-[6px]"
            : "h-[15.55px] w-[38px] py-[3.78px] px-[4px] rounded-[3px]"
          : "h-[32px] rounded-[8px]"
      } bg-[#FFECE6] flex items-center justify-center`}
    >
      <p
        className={`flex  items-center justify-center ${
          small
            ? label == "필수"
              ? "text-12-bold"
              : "text-8-bold"
            : "text-16-medium py-[5px] px-[10px]"
        } text-[#ff4103]`}
      >
        {label}
      </p>
    </div>
  );
};

export default RedBadge;
