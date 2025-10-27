import { ButtonHTMLAttributes, ReactNode } from "react";

export type TButtonSize = "small" | "medium" | "large";
export type TButtonVariant =
  | "primary"
  | "alternative-primary"
  | "outlined"
  | "disabled";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TButtonSize;
  variant?: TButtonVariant;
  leftIcon?: ReactNode;
}
