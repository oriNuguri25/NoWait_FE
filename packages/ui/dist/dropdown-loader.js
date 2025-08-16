import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
export const DropdownLoader = ({ dotColor = "bg-white", dotSize = "w-1 h-1", spacing = "space-x-1", duration = "1.4s", className = "", }) => {
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: dropDownAnimation }), _jsx("div", { className: `flex items-center justify-center ${className}`, children: _jsxs("div", { className: `flex ${spacing}`, children: [_jsx("div", { className: `${dotSize} ${dotColor} rounded-full`, style: {
                                animation: `dropDown ${duration} infinite`,
                                animationDelay: "0s",
                            } }), _jsx("div", { className: `${dotSize} ${dotColor} rounded-full`, style: {
                                animation: `dropDown ${duration} infinite`,
                                animationDelay: "0.2s",
                            } }), _jsx("div", { className: `${dotSize} ${dotColor} rounded-full`, style: {
                                animation: `dropDown ${duration} infinite`,
                                animationDelay: "0.4s",
                            } })] }) })] }));
};
