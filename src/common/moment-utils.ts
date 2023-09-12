import * as moment from 'moment';

export function formatDate(date: string | Date, format: string): string {
  if (date instanceof Date) {
    return moment(date).format(format);
  } else {
    return moment(date, format).format(format);
  }
}
