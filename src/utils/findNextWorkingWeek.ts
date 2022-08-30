import dayjs from "dayjs";
import { HOLIDAYS } from "../constants/holidays";
import Holiday from "../types/holiday";

export const convertStringToDateWithTime = (string: string) =>
  dayjs(string).set("hour", 8).set("minute", 30).toDate();

const isDateEqualToHoliday = (date: Date, holiday: Holiday): boolean =>
  holiday.day === date.getDate() && holiday.month === date.getMonth() + 1;

export const isAHoliday = (date: Date): boolean =>
  HOLIDAYS.filter((holiday: Holiday) => isDateEqualToHoliday(date, holiday))
    .length > 0;

const fridayIndex = 5;
const numberOfDaysInNextWorkingWeek = 5;
export const findNextWorkingWeek = (today: Date): Date[] => {
  let result: Date[] = [];

  const date: Date = convertStringToDateWithTime(today.toString());

  // keep moving to the next day until we hit the weekend
  // or 5 days have passed
  let daysPassed = 0;
  do {
    const nextDay: number = date.getDate() + 1;
    date.setDate(nextDay);

    // don't return holidays as working days
    if (!isAHoliday(date)) {
      result.push(dayjs(+date).toDate());
    }

    daysPassed++;
  } while (
    date.getDay() % fridayIndex &&
    daysPassed < numberOfDaysInNextWorkingWeek
    // 'next 5 working days' strictly could be done with:
    // result.length < numberOfDaysInNextWorkingWeek
  );

  return result;
};
