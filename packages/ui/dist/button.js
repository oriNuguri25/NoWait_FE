import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const Button = ({ children, buttonType = "big", backgroundColor, textColor, borderColor, icon, iconPosition = "left", fullWidth = false, disabled = false, onClick, className = "", }) => {
    // 기본 스타일
    const baseStyles = "inline-flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none rounded-[12px]";
    // buttonType별 크기와 스타일 설정
    const getButtonConfig = () => {
        const configs = {
            big: {
                width: "100%",
                height: "60px",
                textClass: "text-15-semibold gap-2",
                defaultBg: "var(--cool-black)",
                defaultText: "var(--white-100)",
            },
            "call-status": {
                width: "158.5px",
                height: "60px",
                textClass: "text-14-semibold gap-2",
                defaultBg: "#FFF5E8",
                defaultText: "#FFA32B",
            },
            waiting: {
                width: "255px",
                height: "60px",
                textClass: "text-15-semibold gap-2",
                defaultBg: "var(--primary)",
                defaultText: "var(--white)",
            },
            icon: {
                width: "80px",
                height: "60px",
                textClass: "text-12-semibold gap-1.5",
                defaultBg: "var(--black-30)",
                defaultText: "var(--black-60)",
            },
        };
        return configs[buttonType] || configs.big;
    };
    const buttonConfig = getButtonConfig();
    // 스타일 생성 (사용자 지정이 우선, 없으면 기본값 사용)
    const customStyles = {
        backgroundColor: backgroundColor || buttonConfig.defaultBg,
        color: textColor || buttonConfig.defaultText,
        borderColor: borderColor || undefined,
        width: fullWidth ? "100%" : buttonConfig.width,
        height: buttonConfig.height,
    };
    const combinedStyles = customStyles;
    // 전체 너비 스타일
    const widthStyle = fullWidth ? "w-full" : "";
    // 최종 클래스명 조합
    const finalClassName = [
        baseStyles,
        buttonConfig.textClass,
        widthStyle,
        className,
    ]
        .filter(Boolean)
        .join(" ");
    return (_jsxs("button", { className: finalClassName, style: combinedStyles, onClick: onClick, disabled: disabled, children: [icon && iconPosition === "left" && (_jsx("span", { className: "flex items-center justify-center", children: icon })), children, icon && iconPosition === "right" && (_jsx("span", { className: "flex items-center justify-center", children: icon }))] }));
};
