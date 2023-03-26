import React from 'react';
import './Buttons.css';

export function Button({ children, className, ...rest }) {
  return (
    <button
      className={`button ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function AddEmployeeButton({ children, ...rest }) {
  return (
    <Button
      {...rest}
    >
      {children}
    </Button>
  )
}