import { useState } from "react";
import eye from "../../../assets/eye.svg";
import eyeOff from "../../../assets/eye-off.svg";

export const HalfLabelInput = ({
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}) => {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPw ? "text" : type;
  const floating = focused || value.length > 0; // 포커스되었거나 값이 있으면 라벨/텍스트 분할
  const showToggle = isPassword && focused && value.length > 0;

  return (
    <div
      className="
        relative w-[330px] h-[60px] rounded-[12px] overflow-hidden
        border-[1.5px] border-black/20 focus-within:border-[#16191E]
        transition-colors
      "
    >
      {/* 라벨: 위 절반의 맨 아래(반분 상태에서만 보임) */}
      <span
        className={`absolute left-4 bottom-[30px] text-12-regular text-black-40 leading-none
                    transition-opacity duration-150
                    ${
                      floating ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
      >
        {label}
      </span>

      {/* 같은 input 노드를 계속 유지 */}
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={floating ? "" : label}
        className={`absolute left-0 w-full px-4 bg-transparent outline-none text-16-regular text-black appearance-none
        ${
          floating
            ? "top-[20px] h-[30px] leading-[14px] pt-0 pb-0 align-top"
            : "top-0 h-[60px] leading-[60px]"
        }                
      `}
      />
      {showToggle && (
        <button
          type="button"
          aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowPw((v) => !v)}
        >
          <img
            src={showPw ? eye : eyeOff}
            alt=""
            className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
          />
        </button>
      )}
    </div>
  );
};
