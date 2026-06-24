/**
 * Predefined list of stations the schedule supports. Used both for request
 * validation (a train's direction must be picked from this list) and to keep
 * the data consistent across the app.
 */
export const STATIONS = [
  'Kyiv',
  'Lviv',
  'Odesa',
  'Kharkiv',
  'Dnipro',
  'Vinnytsia',
  'Zaporizhzhia',
  'Ivano-Frankivsk',
] as const;

export type Station = (typeof STATIONS)[number];
