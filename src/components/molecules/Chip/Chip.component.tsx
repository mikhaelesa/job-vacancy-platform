import clsx from "clsx";
import { ReactNode } from "react";

interface IChipProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  isActive?: boolean;
}

const Chip = ({ leftIcon, label, rightIcon, isActive }: IChipProps) => {
  return (
    <button
      className={clsx(
        "text-m border rounded-full w-fit flex gap-x-2 px-3 py-1 items-center justify-center",
        isActive
          ? "border-primary-main text-primary-main"
          : "border-neutral-40 text-neutral-90"
      )}
    >
      {leftIcon && (
        <div
          className={clsx(isActive ? "text-primary-main" : "text-neutral-70")}
        >
          {leftIcon}
        </div>
      )}
      {label && label}
      {rightIcon && (
        <div
          className={clsx(isActive ? "text-primary-main" : "text-neutral-70")}
        >
          {rightIcon}
        </div>
      )}
    </button>
  );
};

export default Chip;
