import React, { useState, useEffect } from 'react'

// The above hook is used as a generic fetcher
export function useFetchEndpoint(endpoint) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    if (endpoint) {
      fetchEndpoint();
    }
  }, [endpoint])

  async function fetchEndpoint() {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(data);

      if (data) {
        setData(data);
      } else {
        throw new Error('Could not fetch endpoint: ', endpoint);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error }
}
