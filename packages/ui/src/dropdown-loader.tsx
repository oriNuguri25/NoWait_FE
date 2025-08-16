// 로딩 ... 애니메이션
import React from "react";

// CSS 애니메이션 스타일
const dropDownAnimation = `
  @keyframes dropDown {
    0%, 20% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-6px);
    }
    60%, 100% {
      transform: translateY(0);
    }
  }
`;

export interface DropdownLoaderProps {
  /** 로딩 점의 색상 클래스 (기본값: "bg-black-60") */
  dotColor?: string;
  /** 로딩 점의 크기 클래스 (기본값: "w-1 h-1") */
  dotSize?: string;
  /** 점들 사이의 간격 클래스 (기본값: "space-x-1") */
  spacing?: string;
  /** 애니메이션 지속 시간 (기본값: "1.4s") */
  duration?: string;
  /** 컨테이너에 적용할 추가 클래스 */
  className?: string;
}

export const DropdownLoader: React.FC<DropdownLoaderProps> = ({
  dotColor = "bg-white",
  dotSize = "w-1 h-1",
  spacing = "space-x-1",
  duration = "1.4s",
  className = "",
}) => {
  return (
    <>
      <style>{dropDownAnimation}</style>
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`flex ${spacing}`}>
          <div
            className={`${dotSize} ${dotColor} rounded-full`}
            style={{
              animation: `dropDown ${duration} infinite`,
              animationDelay: "0s",
            }}
          ></div>
          <div
            className={`${dotSize} ${dotColor} rounded-full`}
            style={{
              animation: `dropDown ${duration} infinite`,
              animationDelay: "0.2s",
            }}
          ></div>
          <div
            className={`${dotSize} ${dotColor} rounded-full`}
            style={{
              animation: `dropDown ${duration} infinite`,
              animationDelay: "0.4s",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
