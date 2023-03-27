import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { HANDLE_ENPLOYEE_INPUT } from 'constants';

// This hook is used to for both add and update employee
export function useEmployeeActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Action type could be either 'POST', 'PUT', 'DELETE'
  // Based on the action type it will display the 
  // right message after it does the request
  async function handleEmployeeAction(endpoint, employeeData, actionType) {
    console.log(endpoint);
    console.log(employeeData);
    console.log(actionType);

    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: actionType,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(employeeData),
      });
      const jsonRes = await response.json();
      if (jsonRes) {
        toast.success(HANDLE_ENPLOYEE_INPUT[actionType].success);
        return true;
      } else {
        toast.error(HANDLE_ENPLOYEE_INPUT[actionType].failed);
        return false;
      }
    } catch (err) {
      setError(err.toString());
      toast.error(HANDLE_ENPLOYEE_INPUT[actionType].failed);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, handleEmployeeAction };
}
