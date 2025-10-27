import TextInput from "@/src/components/organisms/TextInput";
import { ChangeEventHandler, ComponentProps } from "react";

interface IProtectedLinkedinInputProps
  extends ComponentProps<typeof TextInput> {
  linkedinSetting?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

const ProtectedLinkedinInput = ({
  value,
  linkedinSetting,
  onChange,
  ...props
}: IProtectedLinkedinInputProps) => {
  if (!linkedinSetting || linkedinSetting === "off") return null;

  return (
    <TextInput
      {...props}
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
