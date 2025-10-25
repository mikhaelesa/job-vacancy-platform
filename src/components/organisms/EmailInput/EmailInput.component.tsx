import InputBase from "@/src/components/molecules/InputBase";
import { ChangeEventHandler, ComponentProps, useState } from "react";

interface IEmailInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const EmailInput = ({
  onChange,
  placeholder,
  name,
  value,
  ...props
}: IEmailInputProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <InputBase isActive={isActive} {...props}>
      <input
        className="outline-none w-full text-m placeholder-neutral-60"
        type="email"
        placeholder={placeholder}
        // required={props.isRequired}
        value={value}
        onChange={onChange}
        disabled={props.isDisabled}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        name={name}
      />
    </InputBase>
  );
};

export default EmailInput;
