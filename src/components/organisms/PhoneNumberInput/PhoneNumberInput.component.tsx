import Flag from "@/src/components/atoms/Flag";
import IcChevronDown from "@/src/components/atoms/Icons/IcChevronDown.component";
import Dropdown from "@/src/components/molecules/Dropdown";
import InputBase from "@/src/components/molecules/InputBase";
import { IPhoneCodesSuccessResponse } from "@/src/dto/phoneCodes.dto";
import { InputController } from "@/src/helpers/inputController.helper";
import useGetPhoneCodesQuery from "@/src/hooks/queries/useGetPhoneCodesQuery.hook";
import clsx from "clsx";
import { ChangeEventHandler, ComponentProps, useState } from "react";

export type TPhoneCode = IPhoneCodesSuccessResponse["data"][0];
interface IPhoneNumberInputProps extends ComponentProps<typeof InputBase> {
  name?: string;
  onChangePhoneCode?: (phoneCode: TPhoneCode) => void;
  onChangePhoneNumber?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const PhoneNumberInput = ({
  name,
  onChangePhoneCode,
  onChangePhoneNumber,
  placeholder,
  ...props
}: IPhoneNumberInputProps) => {
  const phoneCodesQuery = useGetPhoneCodesQuery();
  const phoneCodes = phoneCodesQuery.data?.data.data;
  const [selectedPhoneCode, setSelectedPhoneCode] = useState<TPhoneCode>({
    id: 1,
    alpha_2_code: "ID",
    code: "+62",
    name: "Indonesia",
  });
  const [isFocused, setIsFocused] = useState(false);

  const getSelectPhoneCodeHandler = (phoneCode: TPhoneCode) => {
    setSelectedPhoneCode(phoneCode);
    onChangePhoneCode?.(phoneCode);
  };
  const isSelected = (phoneCode: TPhoneCode) =>
    selectedPhoneCode.id === phoneCode.id;

  return (
    <Dropdown className="relative">
      <Dropdown.Head>
        {({ onToggleDropdown, isOpen }) => (
          <InputBase isActive={isOpen || isFocused} {...props}>
            <button
              onClick={onToggleDropdown}
              className="flex items-center gap-x-1 cursor-pointer"
            >
              <Flag
                width={16}
                height={16}
                code={selectedPhoneCode.alpha_2_code.toLowerCase()}
              />
              <IcChevronDown width={16} height={16} />
            </button>
            <div className="h-6 border border-neutral-40" />
            <span className="text-m">{selectedPhoneCode.code}</span>
            <input
              name={name}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="text-m placeholder-neutral-60 w-full outline-none"
              onChange={onChangePhoneNumber}
              onKeyDown={InputController.onlyNumber}
              onPaste={InputController.pasteOnlyNumber}
            />
          </InputBase>
        )}
      </Dropdown.Head>
      <Dropdown.Body>
        <div className="absolute shadow-modal bg-neutral-10 border border-neutral-40 rounded-lg max-w-[346px] left-0 right-0 mt-2">
          <div className="flex flex-col max-h-58 overflow-y-auto py-2">
            {phoneCodes?.map((phoneCode) => (
              <Dropdown.Item key={phoneCode.id}>
                {({ onToggleDropdown }) => (
                  <button
                    className={clsx(
                      "px-4 py-2 flex items-center justify-between hover:text-primary-main cursor-pointer",
                      isSelected(phoneCode) &&
                        "bg-[#01959F0A] text-primary-main pointer-events-none"
                    )}
                    onClick={() => {
                      getSelectPhoneCodeHandler(phoneCode);
                      onToggleDropdown();
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      <Flag
                        width={16}
                        height={16}
                        code={phoneCode.alpha_2_code.toLowerCase()}
                      />
                      <span className="text-s font-bold">{phoneCode.name}</span>
                    </div>
                    <span className="text-s">{phoneCode.code}</span>
                  </button>
                )}
              </Dropdown.Item>
            ))}
          </div>
        </div>
      </Dropdown.Body>
    </Dropdown>
  );
};

export default PhoneNumberInput;
