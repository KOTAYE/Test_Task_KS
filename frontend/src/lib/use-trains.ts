'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from './api';
import { Train } from './types';

interface UseTrainsResult {
  trains: Train[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useTrains(): UseTrainsResult {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTrains(await api.trains.list());
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Could not load the schedule. Is the API running?',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { trains, loading, error, reload };
}
