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
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "text-14-semibold rounded-full transition-colors",
        "px-4 py-2", // pill spacing
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30",
        active
          ? "bg-black text-white"
          : "bg-transparent text-black-60 hover:bg-black-5 hover:text-black-80"
      )}
    >
      {label}
      {count !== undefined && count > 0 && <span>&nbsp;{`(${count})`}</span>}
    </button>
  );
};

export default RoundTabButton;
