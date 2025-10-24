import InputBase from "@/src/components/molecules/InputBase";
import { ComponentProps, useState } from "react";

interface IEmailInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
}

const EmailInput = ({ placeholder, ...props }: IEmailInputProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <InputBase isActive={isActive} {...props}>
      <input
        className="outline-none w-full text-m"
        type="email"
        placeholder={placeholder}
        required={props.isRequired}
        disabled={props.isDisabled}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </InputBase>
  );
};

export default EmailInput;
