export const formatDate = (date: Date, opts?: Intl.DateTimeFormatOptions) => {
  return date.toLocaleString("cs-CZ", opts);
};
