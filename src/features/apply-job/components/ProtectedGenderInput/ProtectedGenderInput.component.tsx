import RadioButton from "@/src/components/molecules/RadioButton/RadioButton.component";
import { ChangeEventHandler } from "react";

interface IProtectedGenderInputProps {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  genderSetting?: string;
  isError?: boolean;
  helperMessage?: string;
}

const ProtectedGenderInput = ({
  value,
  onChange,
  genderSetting,
  helperMessage,
}: IProtectedGenderInputProps) => {
  if (!genderSetting || genderSetting === "off") return null;
  const isMandatory = genderSetting === "mandatory";

  return (
    <div className="flex flex-col gap-y-2">
      <p className="text-s">
        Pronoun (gender)
        {isMandatory && <span className="text-danger-main">*</span>}
      </p>
      <div className="flex items-center gap-x-6">
        <div className="flex items-center gap-x-2">
          <RadioButton
            value="male"
            id="male"
            name="gender"
            onChange={onChange}
            checked={value === "male"}
          />
          <p>He/him (male)</p>
        </div>
        <div className="flex items-center gap-x-2">
          <RadioButton
            value="female"
            id="female"
            name="gender"
            onChange={onChange}
            checked={value === "female"}
          />
          <p>She/her (female)</p>
        </div>
      </div>
      <span className="text-danger-main text-s">{helperMessage}</span>
    </div>
  );
};

export default ProtectedGenderInput;
