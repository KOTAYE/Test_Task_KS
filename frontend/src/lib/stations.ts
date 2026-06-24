/**
 * Stations available for picking a train's direction. Kept in sync with the
 * backend's validation list (backend/src/common/constants/stations.ts).
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

export const STATION_OPTIONS = STATIONS.map((station) => ({
  value: station,
  label: station,
}));
