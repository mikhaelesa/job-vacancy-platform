import clsx from "clsx";
import { ReactNode } from "react";

type TSize = "small" | "big";
type TColor = "success" | "danger" | "warning";
type TType = "filled" | "outline";

interface ITag {
  size?: TSize;
  color?: TColor;
  type?: TType;
  label?: string;
  leftIcon?: ReactNode;
}

const Tag = ({
  label,
  color = "success",
  size = "small",
  type = "outline",
  leftIcon,
}: ITag) => {
  return (
    <div
      className={clsx(
        "p-y-0.5 px-2 flex items-center justify-center gap-x-1 w-fit rounded-sm",
        {
          "bg-success-surface border border-success-border":
            type === "outline" && color === "success",
          "bg-danger-surface border border-danger-border":
            type === "outline" && color === "danger",
          "bg-secondary-surface border border-secondary-border":
            type === "outline" && color === "warning",
          "bg-success-main": type === "filled" && color === "success",
          "bg-danger-main": type === "filled" && color === "danger",
          "bg-secondary-main": type === "filled" && color === "warning",
          "text-success-main": type === "outline" && color === "success",
          "text-danger-main": type === "outline" && color === "danger",
          "text-secondary-pressed": type === "outline" && color === "warning",
          "text-neutral-10":
            type === "filled" && (color === "success" || color === "danger"),
          "text-neutral-90": type === "filled" && color === "warning",
        }
      )}
    >
      {leftIcon && (
        <div
          className={clsx({
            "w-4 h-4": size === "big",
            "w-3 h-3": size === "small",
          })}
        >
          {leftIcon}
        </div>
      )}
      {label && (
        <p
          className={clsx("font-bold", {
            "text-s": size === "small",
            "text-m": size === "big",
          })}
        >
          {label}
        </p>
      )}
    </div>
  );
};

export default Tag;
