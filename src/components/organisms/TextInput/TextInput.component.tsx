import InputBase from "@/src/components/molecules/InputBase";
import { ComponentProps } from "react";

interface ITextInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
}

const TextInput = ({ placeholder, ...props }: ITextInputProps) => {
  return (
    <InputBase {...props}>
      <input
        className="outline-none w-full text-m"
        type="text"
        placeholder={placeholder}
        required={props.isRequired}
        disabled={props.isDisabled}
      />
    </InputBase>
  );
};

export default TextInput;
