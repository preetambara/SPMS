import { useState, useCallback } from "react";

/**
 * Custom hook to handle asynchronous API calls with loading, error, and data states.
 */
export function useAsync(asyncFunction, immediate = false) {
  const [loading, setLoading] = useState(immediate);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...params) => {
      setLoading(true);
      setError(null);
      try {
        const response = await asyncFunction(...params);
        setData(response);
        return { data: response, error: null };
      } catch (err) {
        setError(err);
        return { data: null, error: err };
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  return { execute, loading, data, error, setData };
}

export default useAsync;
