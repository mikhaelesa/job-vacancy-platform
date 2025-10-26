import IcCalendar from "@/src/components/atoms/Icons/IcCalendar.component";
import IcUniconChevronDoubleLeft from "@/src/components/atoms/Icons/IcUniconChevronDoubleLeft";
import IcUniconChevronDoubleRight from "@/src/components/atoms/Icons/IcUniconChevronDoubleRight";
import IcUniconChevronLeft from "@/src/components/atoms/Icons/IcUniconChevronLeft.component";
import IcUniconChevronRight from "@/src/components/atoms/Icons/IcUniconChevronRight.component";
import Dropdown from "@/src/components/molecules/Dropdown";
import InputBase from "@/src/components/molecules/InputBase";
import { MONTHS } from "@/src/constants/months.constant";
import { dateFormatter } from "@/src/helpers/dateFormatter.helper";
import useDatepicker from "@/src/hooks/useDatePicker";
import clsx from "clsx";
import { ComponentProps, useState } from "react";

interface IDatepickerInputProps extends ComponentProps<typeof InputBase> {
  placeholder?: string;
  name?: string;
  onChange?: (date: string) => void;
}

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const DatepickerInput = ({
  name,
  placeholder,
  onChange,
  ...props
}: IDatepickerInputProps) => {
  const [dateInstance, setDateInstance] = useState(() => new Date());
  const datepickerManager = useDatepicker({
    dateInstance,
    onDateInstanceChange: setDateInstance,
  });

  const selectedDate = datepickerManager.getSelectedDate();

  return (
    <Dropdown className="relative">
      <Dropdown.Head>
        {({ onToggleDropdown }) => (
          <InputBase
            {...props}
            onClick={onToggleDropdown}
            iconLeft={<IcCalendar width={16} height={16} />}
          >
            <input
              disabled
              placeholder={placeholder}
              name={name}
              className="w-full outline-none text-m placeholder-neutral-60 pointer-events-none"
              value={
                selectedDate &&
                dateFormatter(selectedDate?.toISOString()).toFormat(
                  "DD MMMM YYYY"
                )
              }
            />
          </InputBase>
        )}
      </Dropdown.Head>
      <Dropdown.Body>
        <div className="absolute border z-10 border-neutral-40 bg-neutral-10 shadow-modal p-6 rounded-2xl flex flex-col gap-y-6 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-1">
              <button
                type="button"
                onClick={datepickerManager.getPreviousYearHandler}
              >
                <IcUniconChevronDoubleLeft />
              </button>
              <button onClick={datepickerManager.getPreviousMonthHandler}>
                <IcUniconChevronLeft />
              </button>
            </div>
            <div className="flex items-center gap-x-4">
              <p className="text-l font-bold">
                {MONTHS[datepickerManager.getMonth()]}
              </p>
              <p className="text-l font-bold">{datepickerManager.getYear()}</p>
            </div>
            <div className="flex items-center gap-x-1">
              <button
                type="button"
                onClick={datepickerManager.getNextMonthHandler}
              >
                <IcUniconChevronRight />
              </button>
              <button
                type="button"
                onClick={datepickerManager.getNextYearHandler}
              >
                <IcUniconChevronDoubleRight />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-7 gap-x-2">
              {DAYS.map((day, i) => (
                <p key={i} className="text-m font-bold w-10 text-center">
                  {day}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {datepickerManager.getDatesOfTheMonth().map((date, i) => (
                <Dropdown.Item key={i}>
                  {({ onToggleDropdown }) => (
                    <button
                      onClick={() => {
                        onToggleDropdown();
                        datepickerManager.getSelectDateHandler(date.value);
                        onChange?.(
                          dateFormatter(date.date.toISOString()).toFormat(
                            "YYYY-MM-DD"
                          )
                        );
                      }}
                      className={clsx(
                        date.isSelected &&
                          "bg-primary-main !text-neutral-10 pointer-events-none",
                        !date.isCurrentMonth
                          ? "text-neutral-60 cursor-not-allowed"
                          : "text-neutral-90 cursor-pointer hover:bg-neutral-40"
                      )}
                      disabled={!date.isCurrentMonth}
                    >
                      <p className="text-m font-bold w-10 text-center">
                        {date.value}
                      </p>
                    </button>
                  )}
                </Dropdown.Item>
              ))}
            </div>
          </div>
        </div>
      </Dropdown.Body>
    </Dropdown>
  );
};

export default DatepickerInput;
