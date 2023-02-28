import { format, intervalToDuration, parse } from "date-fns";

export const calculateFullAge = (dob: Date) => {
  const dateString = format(new Date(dob), "dd/MM/yyyy");
  const birthDate = parse(dateString, "dd/MM/yyyy", new Date());

  const { years, months, days } = intervalToDuration({ start: birthDate, end: new Date() });
  return { years, months, days };
};
