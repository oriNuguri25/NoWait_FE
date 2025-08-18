import React from "react";

interface SaveButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`w-full py-4 rounded-[8px] text-14-semibold transition-colors
        ${
          disabled
            ? "bg-black-25 text-black-55 cursor-not-allowed"
            : "bg-[#16191E] text-white cursor-pointer"
        }`}
    >
      저장하기
    </button>
  );
};

export default SaveButton;
