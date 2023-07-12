type Division = {
  amount: number;
  name: Intl.RelativeTimeFormatUnit;
};

export const formatDate = (
  date: Date,
  opts?: Intl.DateTimeFormatOptions,
  relative = false
) => {
  if (relative) {
    return getRelativeDate(date);
  }

  return date.toLocaleString("en-US", opts);
};

const DIVISIONS: Division[] = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

const formatter = new Intl.RelativeTimeFormat("en-US", {
  style: "long",
  numeric: "auto",
});

const getRelativeDate = (date: Date) => {
  let duration = (date.valueOf() - new Date().valueOf()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i] as Division;
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};
