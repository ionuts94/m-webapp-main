import React, { useState, useEffect } from 'react'

export function useFetchEmployee(api) {
  console.log(api);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchEmployees();
  }, [api])

  async function fetchEmployees() {
    console.log('fetching employee')
    setLoading(true);

    try {
      console.log('before fetch')
      const response = await fetch(api);
      console.log(response);
      const data = await response.json();
      console.log(data);
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
