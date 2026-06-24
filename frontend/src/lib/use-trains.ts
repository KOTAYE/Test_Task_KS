'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from './api';
import { Train } from './types';

const LOAD_ERROR = 'Could not load the schedule. Is the API running?';

function toMessage(err: unknown): string {
  return err instanceof ApiError ? err.message : LOAD_ERROR;
}

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

  // Manual refresh, used from event handlers after a mutation.
  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setTrains(await api.trains.list());
    } catch (err) {
      setError(toMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount. State is only updated from async callbacks so the
  // effect body stays free of synchronous re-renders.
  useEffect(() => {
    let active = true;
    api.trains
      .list()
      .then((data) => {
        if (active) setTrains(data);
      })
      .catch((err) => {
        if (active) setError(toMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { trains, loading, error, reload };
}
