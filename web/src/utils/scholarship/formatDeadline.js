import { format } from 'date-fns';
import locale from 'date-fns/locale/es';

export function formatDeadline(date) {
  const FORMAT = `d 'de' MMMM 'de' yyyy`;
  return format(new Date(date), FORMAT, { locale });
}
