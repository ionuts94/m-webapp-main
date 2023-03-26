import React from 'react';
import { Link } from 'react-router-dom';
import './DisplayError.css';

export function DisplayError({ error, redirectTo }) {
  return (
    <div className='display-error'>
      <h1>{error.toString()}</h1>
      {redirectTo &&
        <Link
          className="goBack"
          to={redirectTo}
        >
          Go to safe area
        </Link>
      }
    </div>
  )
}
