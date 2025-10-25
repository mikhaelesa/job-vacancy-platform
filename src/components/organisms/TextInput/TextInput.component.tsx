import InputBase from "@/src/components/molecules/InputBase";
import { ComponentProps, useState } from "react";

interface ITextInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
}

const TextInput = ({ placeholder, name, ...props }: ITextInputProps) => {
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
        name={name}
      />
    </InputBase>
  );
};

export default TextInput;
