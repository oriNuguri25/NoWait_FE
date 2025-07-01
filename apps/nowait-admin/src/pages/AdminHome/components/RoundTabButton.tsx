// src/components/RoundTabButton.tsx
import React from "react";
import clsx from "clsx";

interface RoundTabButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const RoundTabButton: React.FC<RoundTabButtonProps> = ({
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 h-[33px] rounded-full text-14-medium font-semibold transition cursor-pointer",
        "whitespace-nowrap",
        active ? "text-white bg-navy-80" : "bg-white text-black"
      )}
    >
      {label}
    </button>
  );
};

export default RoundTabButton;
