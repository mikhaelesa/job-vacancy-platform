import { useRef } from "react";

interface IDate {
  date: Date;
  /** Determine if the date is a part of current month */
  isCurrentMonth: boolean;
  /** Check if current date object is the selected date */
  isSelected: boolean;
  /** Represents the date */
  isYesterday: boolean;
  /** Represents the date */
  value: number;
}

interface IUseDatePickerParams {
  /** The date instance.*/
  dateInstance: Date;
  /** Function to handle changes to the date instance. */
  onDateInstanceChange(date: Date): void;
  selectTodaysDate?: boolean;
}

interface IDatepickerRef {
  /** Stored selected date value when selecting a date */
  selectedDate?: Date;
}

/**
 * A hook to manage date-related operations and state.
 * @returns An object containing functions for date operations.
 * @example
 * const [dateInstance, setDateInstance] = useState(new Date());
 * const { getDatesOfTheMonth } = useDatepicker({
 *   dateInstance,
 *   onDateInstanceChange: setDateInstance
 * })
 *
 * return (
 *   <div>
 *    {getDatesOfTheMonth().map(date => <p key={date}>{date}</p>)}
 *   </div>
 * )
 */
const useDatepicker = ({
  dateInstance,
  onDateInstanceChange,
  selectTodaysDate,
}: IUseDatePickerParams) => {
  const datepickerRef = useRef<IDatepickerRef>({
    ...(selectTodaysDate && { selectedDate: dateInstance }),
  });

  /**
   * Get the day of the week of the first day of the month.
   * @returns The day of the week (0-6, where 0 is Sunday).
   */
  const getFirstDayOfTheMonth = (
    year = dateInstance.getFullYear(),
    monthIndex = dateInstance.getMonth()
  ) => {
    const newDate = new Date(year, monthIndex, 1);
    return newDate.getDay();
  };
  /**
   * Get the day of the week of the last day of the month.
   * @returns The day of the week (0-6, where 0 is Sunday).
   */
  const getLastDayOfTheMonth = (
    year = dateInstance.getFullYear(),
    monthIndex = dateInstance.getMonth() + 1
  ) => {
    const newDate = new Date(year, monthIndex, 0);
    return newDate.getDay();
  };
  /**
   * Get the date of the week of the last date of the month.
   * @returns The date of the week.
   */
  const getLastDateOfTheMonth = (
    year: number = dateInstance.getFullYear(),
    monthIndex: number = dateInstance.getMonth() + 1
  ) => {
    const newDate = new Date(year, monthIndex, 0);
    return newDate.getDate();
  };

  /**
   * Get an array of all the dates of the month along with the days of previous and next month based on the `dateInstance`.
   * @returns An array containing dates of the month.
   */
  const getDatesOfTheMonth = () => {
    const dates: IDate[] = [];
    const firstDayOfTheMonth = getFirstDayOfTheMonth();
    const lastDateOfTheMonth = getLastDateOfTheMonth();
    const lastDateOfThePreviousMonth = getLastDateOfTheMonth(
      dateInstance.getFullYear(),
      dateInstance.getMonth()
    );

    for (let i = firstDayOfTheMonth - 1; i >= 0; i--) {
      const date = new Date(
        dateInstance.getFullYear(),
        dateInstance.getMonth() - 1,
        lastDateOfThePreviousMonth - i
      );
      dates.push({
        date,
        isCurrentMonth: false,
        isSelected: getIsDateSelected(date),
        isYesterday: getIsDateYesterday(date),
        value: lastDateOfThePreviousMonth - i,
      });
    }
    for (let i = 1; i <= lastDateOfTheMonth; i++) {
      const date = new Date(
        dateInstance.getFullYear(),
        dateInstance.getMonth(),
        i
      );
      dates.push({
        date,
        isCurrentMonth: true,
        isSelected: getIsDateSelected(date),
        isYesterday: getIsDateYesterday(date),
        value: i,
      });
    }

    if (dates.length < 42) {
      const remaining = 35 - dates.length;
      for (let i = 1; i <= remaining; i++) {
        const date = new Date(
          dateInstance.getFullYear(),
          dateInstance.getMonth() + 1,
          i
        );
        dates.push({
          date,
          isCurrentMonth: false,
          isSelected: getIsDateSelected(date),
          isYesterday: getIsDateYesterday(date),
          value: i,
        });
      }
    }
    return dates;
  };
  /**
   * Get an array of years within a given range.
   * @param start - The starting year of the range.
   * @param end - The ending year of the range.
   * @returns An array containing years within the specified range.
   */
  const getYearsArray = (
    start = dateInstance.getFullYear() - 100,
    end = new Date().getFullYear() + 100
  ) => {
    const years: number[] = [];
    for (let year = start; year <= end; year++) years.push(year);
    return years;
  };
  /**
   * Get the date of the current date instance.
   * @returns The date.
   */
  const getDate = (): number => dateInstance.getDate();
  /**
   * Get the month of the current date instance.
   * @returns The month.
   */
  const getMonth = (): number => dateInstance.getMonth();
  /**
   * Get the year of the current date instance.
   * @returns The year.
   */
  const getYear = (): number => dateInstance.getFullYear();

  /**
   * Handler to navigate to the next month.
   */
  const getNextMonthHandler = () => {
    const currentMonth = dateInstance.getMonth();
    const newDate = new Date(dateInstance);
    newDate.setMonth(currentMonth + 1);
    newDate.setDate(1);
    // datepickerRef.current.selectedDate = newDate;
    onDateInstanceChange(newDate);
  };
  /**
   * Handler to navigate to the previous month.
   */
  const getPreviousMonthHandler = () => {
    const currentMonth = dateInstance.getMonth();
    const newDate = new Date(dateInstance);
    newDate.setMonth(currentMonth - 1);
    newDate.setDate(1);
    // datepickerRef.current.selectedDate = newDate;
    onDateInstanceChange(newDate);
  };
  /**
   * Handler to select a specific month.
   * @param month - The month to select.
   */
  const getSelectMonthHandler = (month: number) => {
    if (month === dateInstance.getMonth()) return;
    const newDate = new Date(dateInstance);
    newDate.setMonth(month);
    newDate.setDate(1);
    // datepickerRef.current.selectedDate = newDate;
    onDateInstanceChange(newDate);
  };

  /**
   * Handler to navigate to the next year.
   */
  const getNextYearHandler = () => {
    const currentYear = dateInstance.getFullYear();
    const newDate = new Date(dateInstance);
    newDate.setFullYear(currentYear + 1);
    newDate.setDate(1);
    // datepickerRef.current.selectedDate = newDate;
    onDateInstanceChange(newDate);
  };
  /**
   * Handler to navigate to the previous year.
   */
  const getPreviousYearHandler = () => {
    const currentYear = dateInstance.getFullYear();
    const newDate = new Date(dateInstance);
    newDate.setFullYear(currentYear - 1);
    newDate.setDate(1);
    // datepickerRef.current.selectedDate = newDate;
    onDateInstanceChange(newDate);
  };
  /**
   * Handler to select a specific year.
   * @param year - The year to select.
   */
  const getSelectYearHandler = (year: number) => {
    if (year === dateInstance.getFullYear()) return;
    const newDate = new Date(dateInstance);
    newDate.setFullYear(year);
    newDate.setDate(1);
    // datepickerRef.current.selectedDate = newDate;
    onDateInstanceChange(newDate);
  };

  /**
   * Handler to select a specific date.
   * @param date - The date to select.
   */
  const getSelectDateHandler = (date: number) => {
    // if (date === dateInstance.getUTCDate()) return;
    const newDate = new Date(dateInstance);
    newDate.setDate(date);
    newDate.setHours(0, 0, 0, 0);
    datepickerRef.current.selectedDate = newDate;
    onDateInstanceChange(newDate);
  };

  /**
   * Handler to reset the date to the current date.
   */
  const getResetDateHandler = () => {
    const newDate = new Date();
    datepickerRef.current.selectedDate = undefined;
    onDateInstanceChange(newDate);
  };

  /**
   *
   * @returns The selected date
   */
  const getSelectedDate = () => datepickerRef.current.selectedDate;

  const getIsDateSelected = (date: Date) => {
    if (!datepickerRef.current.selectedDate) return false;
    const newSelected = new Date(datepickerRef.current.selectedDate);
    newSelected.setHours(0, 0, 0, 0);
    return newSelected.toISOString() === date.toISOString();
  };

  const getIsDateYesterday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  return {
    getDate,
    getDatesOfTheMonth,
    getFirstDayOfTheMonth,
    getIsDateSelected,
    getIsDateYesterday,
    getLastDateOfTheMonth,
    getLastDayOfTheMonth,
    getMonth,
    getNextMonthHandler,
    getNextYearHandler,
    getPreviousMonthHandler,
    getPreviousYearHandler,
    getResetDateHandler,
    getSelectDateHandler,
    getSelectMonthHandler,
    getSelectYearHandler,
    getSelectedDate,
    getYear,
    getYearsArray,
  };
};

export default useDatepicker;
