import clsx from "clsx";
import { ReactNode } from "react";

interface IChipProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  isActive?: boolean;
  isDisabled?: boolean;
}

const Chip = ({
  leftIcon,
  isDisabled,
  label,
  rightIcon,
  isActive,
}: IChipProps) => {
  return (
    <div
      className={clsx(
        "text-m border rounded-full w-fit flex gap-x-2 px-3 py-1 items-center justify-center",
        {
          "bg-neutral-30 text-neutral-60 border-neutral-40 cursor-not-allowed":
            isDisabled,
          "border-primary-main text-primary-main cursor-pointer": isActive,
          "border-neutral-40 text-neutral-90 cursor-pointer":
            !isDisabled && !isActive,
        }
      )}
    >
      {leftIcon && (
        <div
          className={clsx({
            "text-neutral-60": isDisabled,
            "text-primary-main": isActive,
            "text-neutral-70": !isDisabled && !isActive,
          })}
        >
          {leftIcon}
        </div>
      )}
      {label && label}
      {rightIcon && (
        <div
          className={clsx({
            "text-neutral-60": isDisabled,
            "text-primary-main": isActive,
            "text-neutral-70": !isDisabled && !isActive,
          })}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default Chip;
