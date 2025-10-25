import { StringFormatter } from "./stringFormatter.helper";

export const DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateFormatter = (date: string) => {
  return {
    toFormat(format: string = "DD MMMM YYYY HH:mm WIB") {
      if (!date) return "";

      const dateObject = new Date(date);

      const dayIndex = dateObject.getDay();
      const dayName = StringFormatter.capitalize(DAYS[dayIndex]);
      const dateData = dateObject.getDate();
      const month = dateObject.getMonth();
      const fullMonth = MONTHS[month];
      const fullYear = dateObject.getFullYear();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const seconds = dateObject.getSeconds();

      const finalFormat = format
        .replace("DDDD", dayName)
        .replace("DDD", dayName.substring(0, 3))
        .replace("DD", dateData.toString().padStart(2, "0"))
        .replace("MMMM", fullMonth)
        .replace("MMM", fullMonth.substring(0, 3))
        .replace("MM", (month + 1).toString().padStart(2, "0"))
        .replace("YYYY", fullYear.toString())
        .replace("HH", hours.toString().padStart(2, "0"))
        .replace("mm", minutes.toString().padStart(2, "0"))
        .replace("ss", seconds.toString().padStart(2, "0"));

      return finalFormat;
    },
  };
};
