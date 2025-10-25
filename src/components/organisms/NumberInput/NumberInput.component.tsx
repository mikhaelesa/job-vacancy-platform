import { InputController } from "@/src/helpers/inputController.helper";
import { ChangeEventHandler, ComponentProps } from "react";
import InputBase from "../../molecules/InputBase";

interface ICurrencyInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
  onChange?: (value: number) => void;
  value?: number;
}

const NumberInput = ({
  onChange,
  placeholder,
  name,
  value,
  ...props
}: ICurrencyInputProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (value) onChange?.(parseInt(value));
  };
  return (
    <InputBase {...props}>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        className="text-m placeholder-neutral-60 outline-none w-full"
        onKeyDown={InputController.onlyNumber}
        onPaste={InputController.pasteOnlyNumber}
        onChange={handleChange}
        value={value}
      />
    </InputBase>
  );
};

export default NumberInput;
