import React from 'react';
import './Buttons.css';

// I chose to use components composition approach to
// improve readability and reusability
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

export function AddButton({ children, ...rest }) {
  return (
    <Button
      {...rest}
    >
      {children}
    </Button>
  )
}

export function SaveButton({ children, ...rest }) {
  return (
    <Button
      className='save-btn'
      {...rest}
    >
      {children}
    </Button>
  )
}

export function DeleteButton({ children, ...rest }) {
  return (
    <Button
      className='delete-btn'
      {...rest}
    >
      {children}
    </Button>
  )
}