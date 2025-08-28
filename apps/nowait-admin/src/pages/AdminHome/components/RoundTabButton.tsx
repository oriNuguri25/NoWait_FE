// src/components/RoundTabButton.tsx
import React from "react";
import clsx from "clsx";

interface RoundTabButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

const RoundTabButton: React.FC<RoundTabButtonProps> = ({
  label,
  active = false,
  onClick,
  count,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 h-[33px] rounded-full text-14-semibold transition cursor-pointer mr-[6px]",
        "whitespace-nowrap",
        active ? "bg-black text-white" : "bg-white text-black-60"
      )}
    >
      {label}
      {count !== undefined && count > 0 && <span>&nbsp;{`${count}`}</span>}
    </button>
  );
};

export default RoundTabButton;
