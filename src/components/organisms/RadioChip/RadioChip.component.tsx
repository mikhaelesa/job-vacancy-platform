import { ChangeEventHandler, ComponentProps, useRef } from "react";
import Chip from "../../molecules/Chip";

interface IRadioChipProps extends ComponentProps<typeof Chip> {
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const RadioChip = ({ name, value, onChange, ...props }: IRadioChipProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const radioButton = inputRef.current;
    if (!radioButton) return;
    radioButton.click();
  };

  return (
    <button type="button" onClick={handleClick}>
      <input
        name={name}
        value={value}
        ref={inputRef}
        onChange={onChange}
        type="radio"
        hidden
      />
      <Chip {...props} />
    </button>
  );
};

export default RadioChip;
