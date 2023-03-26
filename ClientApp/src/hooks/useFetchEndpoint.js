import React, { useState, useEffect } from 'react'

export function useFetchEndpoint(endpoint) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchEmployees();
  }, [endpoint])

  async function fetchEmployees() {
    console.log('fetching employee')
    setLoading(true);

    try {
      console.log('before fetch')
      const response = await fetch(endpoint);
      const data = await response.json();
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
