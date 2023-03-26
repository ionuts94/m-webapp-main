import React, { useState, useEffect } from 'react'

export function useFetchEmployees(api) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchEmployees();
  }, [])

  async function fetchEmployees() {
    setLoading(true);

    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data) {
        setData(data);
      } else {
        throw new Error('Could not fetch employees');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error }
}
