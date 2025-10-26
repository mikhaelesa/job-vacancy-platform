import PhoneNumberInput from "@/src/components/organisms/PhoneNumberInput";
import { ComponentProps } from "react";

interface IProtectedPhoneNumberInputProps
  extends ComponentProps<typeof PhoneNumberInput> {
  phoneNumberSetting?: string;
}

const ProtectedPhoneNumberInput = ({
  onChangePhoneCode,
  onChangePhoneNumber,
  phoneNumberSetting,
}: IProtectedPhoneNumberInputProps) => {
  if (!phoneNumberSetting || phoneNumberSetting === "off") return null;
  const isMandatory = phoneNumberSetting === "mandatory";
  return (
    <PhoneNumberInput
      placeholder="81XXXXXXXXX"
      label="Phone number"
      name="phoneNumber"
      isRequired={isMandatory}
      onChangePhoneCode={onChangePhoneCode}
      onChangePhoneNumber={onChangePhoneNumber}
    />
  );
};

export default ProtectedPhoneNumberInput;
