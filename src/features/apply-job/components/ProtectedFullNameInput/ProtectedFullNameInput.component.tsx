import TextInput from "@/src/components/organisms/TextInput";
import { ChangeEventHandler } from "react";

interface IProtectedFullNameInputProps {
  fullNameSetting?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const ProtectedFullNameInput = ({
  value,
  fullNameSetting,
  onChange,
}: IProtectedFullNameInputProps) => {
  if (!fullNameSetting || fullNameSetting === "off") return null;

  return (
    <TextInput
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
