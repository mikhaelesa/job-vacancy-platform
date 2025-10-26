import TextInput from "@/src/components/organisms/TextInput";
import { ChangeEventHandler } from "react";

interface IProtectedLinkedinInputProps {
  linkedinSetting?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const ProtectedLinkedinInput = ({
  value,
  linkedinSetting,
  onChange,
}: IProtectedLinkedinInputProps) => {
  if (!linkedinSetting || linkedinSetting === "off") return null;

  return (
    <TextInput
      placeholder="https://linkedin.com/in/username"
      label="Linkedin link"
      name="linkedin"
      isRequired={linkedinSetting === "mandatory"}
      onChange={onChange}
      value={value}
    />
  );
};

export default ProtectedLinkedinInput;
