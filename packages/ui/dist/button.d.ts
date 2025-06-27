import React from "react";
interface ButtonProps {
    children?: React.ReactNode;
    buttonType?: "big" | "call-status" | "waiting" | "icon";
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}
export declare const Button: React.FC<ButtonProps>;
export type BigButtonProps = Omit<ButtonProps, "buttonType"> & {
    buttonType?: "big";
};
export type CallStatusButtonProps = Omit<ButtonProps, "buttonType"> & {
    buttonType?: "call-status";
};
export type WaitingButtonProps = Omit<ButtonProps, "buttonType"> & {
    buttonType?: "waiting";
};
export type IconButtonProps = Omit<ButtonProps, "buttonType"> & {
    buttonType?: "icon";
};
export {};
//# sourceMappingURL=button.d.ts.map