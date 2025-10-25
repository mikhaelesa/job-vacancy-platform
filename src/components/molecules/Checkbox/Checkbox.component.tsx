import IcCheckboxChecked from "@/src/components/atoms/Icons/IcCheckboxChecked.component";
import IcCheckboxUnchecked from "@/src/components/atoms/Icons/IcCheckboxUnchecked.component";
import clsx from "clsx";
import { useRef, useState } from "react";

interface ICheckboxProps {
  defaultChecked?: boolean;
  isDisabled?: boolean;
  name?: string;
  onChange?: (value: boolean) => void;
}

const Checkbox = ({
  name,
  defaultChecked,
  isDisabled,
  onChange,
}: ICheckboxProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleClick = () => {
    if (isDisabled) return;
    const checkbox = checkboxRef.current;
    if (!checkbox) return;
    const nextValue = !checkbox.checked;
    checkbox.checked = nextValue;
    setIsChecked(nextValue);
    onChange?.(nextValue);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(isDisabled ? "cursor-not-allowed" : "cursor-pointer")}
    >
      {isChecked ? (
        <IcCheckboxChecked
          className={clsx(isDisabled ? "text-neutral-60" : "text-primary-main")}
        />
      ) : (
        <IcCheckboxUnchecked
          className={clsx(isDisabled ? "text-neutral-60" : "text-primary-main")}
        />
      )}
      <input
        ref={checkboxRef}
        type="checkbox"
        defaultChecked={defaultChecked}
        name={name}
        hidden
      />
    </button>
  );
};

export default Checkbox;
