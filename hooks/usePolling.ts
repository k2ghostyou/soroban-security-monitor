"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { FetchState } from "@/lib/types";

/**
 * Polls `fetcher` every `intervalMs` milliseconds.
 * TODO: Replace `fetcher` calls with real API fetches when endpoints are available.
 */
export function usePolling<T>(
  fetcher: () => Promise<T>,
  intervalMs: number = 10_000
): FetchState<T> & { refresh: () => void } {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const run = useCallback(async () => {
    try {
      const data = await fetcherRef.current();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, []);

  useEffect(() => {
    run();
    const id = setInterval(run, intervalMs);
    return () => clearInterval(id);
  }, [run, intervalMs]);

  return { ...state, refresh: run };
}
