import dayjs from 'dayjs';

/** Human-friendly date + time, e.g. "01 Jul 2026, 08:00". */
export function formatDateTime(value: string): string {
  return dayjs(value).format('DD MMM YYYY, HH:mm');
}

/** Duration between two timestamps, e.g. "5h 30m". */
export function formatDuration(from: string, to: string): string {
  const minutes = dayjs(to).diff(dayjs(from), 'minute');
  if (minutes <= 0) return '—';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return [hours ? `${hours}h` : '', mins ? `${mins}m` : '']
    .filter(Boolean)
    .join(' ');
}
