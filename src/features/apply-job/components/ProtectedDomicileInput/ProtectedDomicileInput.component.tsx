import SelectInput from "@/src/components/organisms/SelectInput";
import { ComponentProps } from "react";

interface IProtectedDomicileInputProps
  extends ComponentProps<typeof SelectInput> {
  domicileSetting?: string;
}

const ProtectedDomicileInput = ({
  domicileSetting,
  ...props
}: IProtectedDomicileInputProps) => {
  if (!domicileSetting || domicileSetting === "off") return null;
  const isMandatory = domicileSetting === "mandatory";

  return (
    <SelectInput
      label="Domicile"
      placeholder="Choose your domicile"
      isRequired={isMandatory}
      {...props}
    />
  );
};

export default ProtectedDomicileInput;
