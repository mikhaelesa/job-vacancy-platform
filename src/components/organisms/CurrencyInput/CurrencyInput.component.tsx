import InputBase from "@/src/components/molecules/InputBase";
import { currencyFormatter } from "@/src/helpers/currencyFormatter.helper";
import { InputController } from "@/src/helpers/inputController.helper";
import { sanitizePriceInput } from "@/src/helpers/sanitizePriceInput.helper";
import { ChangeEventHandler, ComponentProps, useState } from "react";

interface ICurrencyInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
  onChange?: (value: number) => void;
}

const CurrencyInput = ({
  placeholder,
  name,
  onChange,
  ...props
}: ICurrencyInputProps) => {
  const [value, setValue] = useState<number>();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const parsedValue = sanitizePriceInput(value);
    setValue(parsedValue || undefined);
    onChange?.(parsedValue);
  };

  return (
    <InputBase
      {...props}
      iconLeft={<span className="font-bold text-m">Rp</span>}
    >
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        className="text-m placeholder-neutral-60 outline-none w-full"
        onKeyDown={InputController.onlyNumber}
        onPaste={InputController.pasteOnlyNumber}
        onChange={handleChange}
        value={value ? currencyFormatter(value).toIDR().replace("Rp", "") : ""}
      />
    </InputBase>
  );
};

export default CurrencyInput;
