import { format as dateFnsFormat, isDate, parseISO } from 'date-fns';

export const formatDateWithDateFns = (
  date: string | Date | undefined,
  format: string,
): string | undefined => {
  if (!date) return undefined;

  if (isDate(date)) {
    const newDate = date as Date;
    return dateFnsFormat(newDate, format);
  }

  const str = date as string;
  const parseableString = str.split('T')[0];

  return dateFnsFormat(parseISO(parseableString), format);
};
