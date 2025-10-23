import clsx from "clsx";
import { IButtonProps, TButtonSize, TButtonVariant } from "./Button.type";

const SIZE_MAP = new Map<TButtonSize, string>([
  ["small", "text-s"],
  ["medium", "text-m"],
  ["large", "text-l"],
]);

const VARIANT_MAP = new Map<TButtonVariant, string>([
  ["primary", "text-neutral-10 bg-primary-main"],
  ["alternative-primary", "text-neutral-90 bg-secondary-main"],
  ["outlined", "text-neutral-100 border border-neutral-40"],
  ["disabled", "text-neutral-60 bg-neutral-30 border border-neutral-40"],
]);

const Button = ({
  size = "medium",
  variant = "primary",
  children,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center gap-x-1 shadow-button font-bold py-1 px-4 rounded-lg cursor-pointer",
        props.disabled ? VARIANT_MAP.get("disabled") : VARIANT_MAP.get(variant),
        SIZE_MAP.get(size),
        props.className
      )}
      {...props}
    >
      <div></div>
      {children}
    </button>
  );
};

export default Button;
