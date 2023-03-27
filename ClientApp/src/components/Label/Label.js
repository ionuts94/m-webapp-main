import React from 'react';
import { STATES } from 'constants';
import './Label.css';

export function Label({ state }) {
  return (
    <div
      className='label-container'
      style={{
        color: STATES[state].textColor,
        backgroundColor: STATES[state].backgroundColor,
        borderColor: STATES[state].borderColor
      }}
    >
      {state}
    </div>
  )
}
