import clsx from "clsx";
import { ReactNode } from "react";

interface IInputProps {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children?: ReactNode;
  helperMessage?: string;
  label?: string;
  isRequired?: boolean;
  isActive?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
}

const InputBase = ({
  iconLeft,
  iconRight,
  helperMessage,
  children,
  label,
  isRequired,
  isActive,
  isError,
  isDisabled,
}: IInputProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label>
        {label && (
          <span className="text-s">
            {label}
            {isRequired && <span className="text-danger-main">*</span>}
          </span>
        )}
        <div
          className={clsx(
            "mt-2 flex items-center gap-x-2 border-2 rounded-lg px-4 py-3",
            {
              "bg-neutral-30 border-neutral-40": isDisabled,
              "border-danger-main": !isDisabled && isError,
              "border-primary-main": !isDisabled && !isError && isActive,
              "border-neutral-40 hover:border-primary-focus/20":
                !isDisabled && !isError && !isActive,
            }
          )}
        >
          {iconLeft && iconLeft}
          {children && children}
          {iconRight && iconRight}
        </div>
      </label>
      {helperMessage && (
        <span className="text-s text-neutral-70">Error message</span>
      )}
    </div>
  );
};

export default InputBase;
