import DatepickerInput from "@/src/components/organisms/DatepickerInput";

interface IProtectedDatepickerInputProps {
  dateOfBirthSetting?: string;
}

const ProtectedDatepickerInput = ({
  dateOfBirthSetting,
}: IProtectedDatepickerInputProps) => {
  if (!dateOfBirthSetting || dateOfBirthSetting === "off") return null;
  const isMandatory = dateOfBirthSetting === "mandatory";

  return (
    <DatepickerInput
      onChange={console.log}
      placeholder="Select date of birth"
      name="dateOfBirth"
      label="Date of birth"
      isRequired={isMandatory}
    />
  );
};

export default ProtectedDatepickerInput;
