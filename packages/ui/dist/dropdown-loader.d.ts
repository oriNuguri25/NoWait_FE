import React from "react";
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
export declare const DropdownLoader: React.FC<DropdownLoaderProps>;
//# sourceMappingURL=dropdown-loader.d.ts.map