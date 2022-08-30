import Holiday from "../types/holiday";

enum MONTHS {
  JANUARY = 1,
  DECEMBER = 12,
}

/**
 * Could add more holidays to this array. No other changes needed.
 *
 * Alternatively, could use a library which holds this information.
 *
 * There also the case of holidays which don't sit on a
 * particular day, in which case the solution can be changed
 * to check things like 'the last Monday of the month'
 * instead of the specific day of the month.
 */
export const HOLIDAYS: Holiday[] = [
  { name: "New Year's Day", day: 1, month: MONTHS.JANUARY },
  { name: "Christmas day", day: 25, month: MONTHS.DECEMBER },
];
