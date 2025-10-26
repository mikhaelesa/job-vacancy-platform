import IcChevronDown from "@/src/components/atoms/Icons/IcChevronDown.component";
import Dropdown from "@/src/components/molecules/Dropdown";
import InputBase from "@/src/components/molecules/InputBase";
import clsx from "clsx";
import { ComponentProps, useState } from "react";

export interface ISelectOption {
  label?: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ISelectInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
  options?: ISelectOption[];
  defaultSelected?: ISelectOption;
  onChange?: (selectedOption: ISelectOption) => void;
}

const SelectInput = ({
  options,
  placeholder,
  name,
  defaultSelected,
  onChange,
  ...props
}: ISelectInputProps) => {
  const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
    defaultSelected || null
  );

  const handleSelect = (option: ISelectOption) => {
    setSelectedOption(option);
    onChange?.(option);
  };

  const isSelected = (option: ISelectOption) =>
    selectedOption?.value === option.value;

  return (
    <Dropdown className="relative">
      <Dropdown.Head>
        {({ onToggleDropdown, isOpen }) => (
          <button
            type="button"
            onClick={onToggleDropdown}
            className="w-full text-left cursor-pointer"
          >
            <InputBase
              {...props}
              isActive={isOpen}
              iconRight={<IcChevronDown />}
            >
              <input
                type="text"
                className="text-m placeholder-neutral-60 w-full pointer-events-none"
                name={name}
                placeholder={placeholder}
                value={selectedOption?.label || ""}
                disabled
              />
            </InputBase>
          </button>
        )}
      </Dropdown.Head>
      <Dropdown.Body>
        <div className="absolute bg-neutral-10 left-0 right-0 shadow-modal py-2 rounded-lg border border-neutral-40 top-[92px] z-10 max-h-58 overflow-y-auto">
          {options?.map((option, i) => (
            <Dropdown.Item key={`${i}-${option.label}-${option.value}`}>
              {({ onToggleDropdown }) => (
                <button
                  type="button"
                  className={clsx(
                    "py-2 px-4 cursor-pointer hover:bg-primary-hover hover:text-neutral-10 w-full text-left",
                    isSelected(option) &&
                      "bg-primary-main text-neutral-10 pointer-events-none"
                  )}
                  onClick={() => {
                    handleSelect(option);
                    onToggleDropdown();
                  }}
                >
                  <p className="text-s font-bold">{option.label}</p>
                </button>
              )}
            </Dropdown.Item>
          ))}
        </div>
      </Dropdown.Body>
    </Dropdown>
  );
};

export default SelectInput;
