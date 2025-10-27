import DatepickerInput from "@/src/components/organisms/DatepickerInput";
import { ComponentProps } from "react";

interface IProtectedDatepickerInputProps
  extends ComponentProps<typeof DatepickerInput> {
  dateOfBirthSetting?: string;
}

const ProtectedDatepickerInput = ({
  dateOfBirthSetting,

  ...props
}: IProtectedDatepickerInputProps) => {
  if (!dateOfBirthSetting || dateOfBirthSetting === "off") return null;
  const isMandatory = dateOfBirthSetting === "mandatory";

  return (
    <DatepickerInput
      {...props}
      placeholder="Select date of birth"
      name="dateOfBirth"
      label="Date of birth"
      isRequired={isMandatory}
    />
  );
};

export default ProtectedDatepickerInput;
