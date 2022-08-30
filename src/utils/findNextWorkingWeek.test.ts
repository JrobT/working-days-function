import {
  convertStringToDateWithTime,
  isAHoliday,
  findNextWorkingWeek,
} from "./findNextWorkingWeek";

describe("convertStringsToDatesWithTime", () => {
  test.each([
    ["2020-12-14", new Date("2020-12-14T08:30:00.000Z")],
    ["2021-01-01", new Date("2021-01-01T08:30:00.000Z")],
  ])(
    "Converts %s into a Date with time: %s",
    (dateStringInput: string, expectedResult: Date) =>
      expect(convertStringToDateWithTime(dateStringInput)).toEqual(
        expectedResult
      )
  );
});

describe("isAHoliday", () => {
  test.each([
    ["2020-12-14", false],
    ["2020-12-15", false],
    ["1997-02-10", false],
    ["2025-13-45", false],
    ["2020-12-25", true],
    ["2021-01-01", true],
  ])(
    "Returns true if the day is a holiday and false if not",
    (dateStringInput: string, expectedResult: boolean) => {
      const givenDateWithTime = convertStringToDateWithTime(dateStringInput);
      expect(isAHoliday(givenDateWithTime)).toEqual(expectedResult);
    }
  );
});

describe("findNextWorkingWeek", () => {
  test.each([
    [
      "2020-12-13",
      ["2020-12-14", "2020-12-15", "2020-12-16", "2020-12-17", "2020-12-18"],
    ],
    ["2020-12-20", ["2020-12-21", "2020-12-22", "2020-12-23", "2020-12-24"]],
    ["2020-12-28", ["2020-12-29", "2020-12-30", "2020-12-31"]],
  ])(
    "Returns correct days for %s",
    (dateStringInput: string, expectedResult: string[]) => {
      const givenDateWithTime = new Date(dateStringInput);
      const expectedResultAsDates: Date[] = expectedResult.map((string) =>
        convertStringToDateWithTime(string)
      );

      expect(findNextWorkingWeek(givenDateWithTime)).toEqual(
        expectedResultAsDates
      );
    }
  );
});
