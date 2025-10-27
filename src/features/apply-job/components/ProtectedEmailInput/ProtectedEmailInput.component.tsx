import EmailInput from "@/src/components/organisms/EmailInput";
import { ChangeEventHandler, ComponentProps } from "react";

interface IProtectedEmailInputProps extends ComponentProps<typeof EmailInput> {
  emailSetting?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const ProtectedEmailInput = ({
  value,
  emailSetting,
  onChange,
  ...props
}: IProtectedEmailInputProps) => {
  if (!emailSetting || emailSetting === "off") return null;

  return (
    <EmailInput
      {...props}
      name="email"
      placeholder="Enter your email address"
      label="Email"
      isRequired={emailSetting === "mandatory"}
      onChange={onChange}
      value={value}
    />
  );
};

export default ProtectedEmailInput;
