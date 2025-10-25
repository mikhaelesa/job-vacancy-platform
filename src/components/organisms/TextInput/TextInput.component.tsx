import InputBase from "@/src/components/molecules/InputBase";
import {
  ChangeEventHandler,
  ComponentProps,
  forwardRef,
  useState,
} from "react";

interface ITextInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  function TextInput(
    { placeholder, name, onChange, value, defaultValue, ...props },
    ref
  ) {
    const [isActive, setIsActive] = useState(false);

    return (
      <InputBase isActive={isActive} {...props}>
        <input
          className="outline-none w-full text-m placeholder-neutral-60"
          type="text"
          placeholder={placeholder}
          required={props.isRequired}
          disabled={props.isDisabled}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          name={name}
          ref={ref}
        />
      </InputBase>
    );
  }
);

export default TextInput;
