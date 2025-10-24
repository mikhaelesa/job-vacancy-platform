import { ComponentProps, useState } from "react";
import IcEye from "../../atoms/Icons/IcEye.component";
import IcEyeSlash from "../../atoms/Icons/IcEyeSlash.component";
import InputBase from "../../molecules/InputBase";

interface IPasswordInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
}

const PasswordInput = ({ placeholder, ...props }: IPasswordInputProps) => {
  const [isActive, setIsActive] = useState(false);
  const [isShown, setIsShown] = useState(false);
  return (
    <InputBase
      isActive={isActive}
      {...props}
      iconRight={
        <button
          className="cursor-pointer"
          onClick={() => setIsShown((prev) => !prev)}
        >
          <span className="text-sm text-primary-main">
            {isShown ? (
              <IcEyeSlash width={16} height={16} />
            ) : (
              <IcEye width={16} height={16} />
            )}
          </span>
        </button>
      }
    >
      <input
        placeholder={placeholder}
        className="outline-none w-full text-m"
        type={isShown ? "text" : "password"}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
    </InputBase>
  );
};

export default PasswordInput;
