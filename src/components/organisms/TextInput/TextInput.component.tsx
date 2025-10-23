import InputBase from "@/src/components/molecules/InputBase";
import { ComponentProps, useState } from "react";

interface ITextInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
}

const TextInput = ({ placeholder, ...props }: ITextInputProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <InputBase isActive={isActive} {...props}>
      <input
        className="outline-none w-full text-m"
        type="text"
        placeholder={placeholder}
        required={props.isRequired}
        disabled={props.isDisabled}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </InputBase>
  );
};

export default TextInput;
