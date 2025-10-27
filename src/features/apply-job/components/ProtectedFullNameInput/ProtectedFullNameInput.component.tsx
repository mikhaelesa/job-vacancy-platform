import TextInput from "@/src/components/organisms/TextInput";
import { ChangeEventHandler, ComponentProps } from "react";

interface IProtectedFullNameInputProps
  extends ComponentProps<typeof TextInput> {
  fullNameSetting?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const ProtectedFullNameInput = ({
  value,
  fullNameSetting,
  onChange,
  ...props
}: IProtectedFullNameInputProps) => {
  if (!fullNameSetting || fullNameSetting === "off") return null;

  return (
    <TextInput
      {...props}
      name="fullName"
      placeholder="Enter your full name"
      label="Full name"
      isRequired={fullNameSetting === "mandatory"}
      onChange={onChange}
      value={value}
    />
  );
};

export default ProtectedFullNameInput;
