import InputBase from "@/src/components/molecules/InputBase";
import { ChangeEventHandler, ComponentProps, useState } from "react";

interface ITextInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const TextInput = ({
  placeholder,
  name,
  onChange,
  value,
  ...props
}: ITextInputProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <InputBase isActive={isActive} {...props}>
      <input
        className="outline-none w-full text-m placeholder-neutral-60"
        type="text"
        placeholder={placeholder}
        required={props.isRequired}
        disabled={props.isDisabled}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        onChange={onChange}
        value={value}
        name={name}
      />
    </InputBase>
  );
};

export default TextInput;
