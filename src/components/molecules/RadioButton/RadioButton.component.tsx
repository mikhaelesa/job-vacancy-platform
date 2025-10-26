import IcRadioButtonActive from "@/src/components/atoms/Icons/IcRadioButtonActive.component";
import IcRadioButtonInactive from "@/src/components/atoms/Icons/IcRadioButtonInactive.component";
import { InputHTMLAttributes, useRef } from "react";

interface IRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  isActive?: boolean;
}

const RadioButton = ({
  isActive,
  checked,
  id,
  ...props
}: IRadioButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    const radioButton = inputRef.current;
    if (!radioButton) return;
    radioButton.click();
  };
  return (
    <label htmlFor={id} onClick={handleClick}>
      <input
        ref={inputRef}
        type="radio"
        defaultChecked={isActive}
        className="sr-only appearance-none"
        id={id}
        checked={checked}
        {...props}
      />
      <div>{checked ? <IcRadioButtonActive /> : <IcRadioButtonInactive />}</div>
    </label>
  );
};

export default RadioButton;
